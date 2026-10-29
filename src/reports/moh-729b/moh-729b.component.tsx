import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { downloadSheetsPdf } from '../../common/report-page';
import { showReportError } from '../../common/report-error';
import { ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { ReportSkeleton } from '../../common/report-skeleton';
import { registerFileName } from '../../registers/register-file-name';
import { getMoh729b } from '../../resources/moh-729b.resource';
import Moh729bForm, { type Moh729bCounts } from './moh-729b-form.component';
import Moh729bSummary from './moh-729b-summary.component';
import { encodeCell, inCell, inCells, type Moh729bCell, type Moh729bRow } from './moh-729b.types';
import styles from './moh-729b.scss';
import reportStyles from '../moh-731/moh-731.scss';

/**
 * MoH 729B Facility Monthly ARV Patient Summary (F-MAPS), opened from the
 * landing page's Reports tab, with the reports' filter bar.
 *
 * The clients active on ART in the month come back one row each with their
 * regimen code (/moh-729b), so every count on the form is a count of those
 * rows and opens the linelist of exactly those clients. As MOH 731, the form
 * has a Summary tab beside it that regroups the counts into tables with totals.
 */
const Moh729bReport: React.FC = () => {
  const [rows, setRows] = useState<Moh729bRow[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });

  const navigate = useNavigate();

  /* The form tab is the default; the selected tab and the Summary's section
     are kept in the URL, so a linelist opened from them comes back to them */
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') === 'summary' ? 'summary' : undefined;
  const section = searchParams.get('section') ?? '';
  const setParam = (key: string, value?: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };
  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  const facility = session?.sessionLocation?.display ?? '';
  /* Only a report for the current location counts */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh729bLocation');
  const isReportGenerated = rows !== null && isForCurrentLocation;

  const generate = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setPeriod({ startDate, endDate });
    try {
      setRows((await getMoh729b({ locationUuids, endDate })) as unknown as Moh729bRow[]);
      markGenerated(locationUuids);
    } catch (error) {
      showReportError('the MOH 729B report', error);
    } finally {
      setIsLoading(false);
    }
  };

  useRestorePeriod(generate);

  /** Opens the linelist of one count or, under a heading, of several */
  const openLinelist = (cells: Moh729bCell[], label?: string) => {
    const params = new URLSearchParams({ ...period, locationUuids, from: 'moh-729b' });
    cells.forEach((cell) => params.append('f', encodeCell(cell)));
    if (label) params.set('label', label);
    if (view) params.set('view', view);
    if (view && section) params.set('section', section);
    navigate(`/moh-729b-linelist?${params}`);
  };

  const counts = useMemo<Moh729bCounts>(
    () => ({
      count: (cell) => (rows ?? []).filter((row) => inCell(row, cell)).length,
      open: (cell) => openLinelist([cell]),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows, period, locationUuids, view, section],
  );
  const countClients = (cells: Moh729bCell[]) => (rows ?? []).filter((row) => inCells(row, cells)).length;

  /* Download PDF saves the form as one A3 portrait page, made from a copy, so
     the page on screen is left as it is */
  const sheetRef = useRef<HTMLDivElement>(null);
  const downloadPdf = async () => {
    const pages = Array.from(sheetRef.current?.querySelectorAll<HTMLElement>('[data-register-page]') ?? []);
    await downloadSheetsPdf(pages, registerFileName('MOH-729B', facility, period), {
      paperSize: 'a3',
      orientation: 'portrait',
      stylesheetsOnly: true,
    });
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH 729B F-MAPS Report"
        mode="monthly"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={period}
        onDownloadPdf={downloadPdf}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && (
        <ReportPlaceholder reportName="MOH 729B" isLocationChanged={rows !== null && hasLocationChanged} />
      )}
      {!isLoading && isReportGenerated && (
        <Tabs
          selectedIndex={view === 'summary' ? 1 : 0}
          onChange={({ selectedIndex }) => setParam('view', selectedIndex === 1 ? 'summary' : undefined)}
        >
          <TabList aria-label="MOH 729B views" className={reportStyles.tabList}>
            <Tab>MOH 729B Form</Tab>
            <Tab>Summary</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className={reportStyles.formPanel}>
              {/* Download PDF saves the form whichever tab is open */}
              <div className={styles.reportFrame} ref={sheetRef}>
                <Moh729bForm
                  facility={facility}
                  startDate={period.startDate}
                  endDate={period.endDate}
                  counts={counts}
                />
              </div>
            </TabPanel>
            <TabPanel className={reportStyles.summaryPanel}>
              <div className={reportStyles.reportFrame}>
                <Moh729bSummary
                  count={countClients}
                  openLinelist={openLinelist}
                  sectionId={section}
                  onSectionChange={(id) => setParam('section', id)}
                  period={period.endDate.slice(0, 7)}
                />
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
};

export default Moh729bReport;
