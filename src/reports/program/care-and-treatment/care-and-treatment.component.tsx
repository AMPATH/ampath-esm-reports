import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Button, Layer } from '@carbon/react';
import { Download } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../../common/report-filters';
import { downloadSheetsPdf } from '../../../common/report-page';
import { showReportError } from '../../../common/report-error';
import { columnsToCsv, downloadCsv, type RegisterColumn } from '../../../common/report-register';
import { ReportPlaceholder, useGeneratedLocation } from '../../../common/report-placeholder';
import { ReportSkeleton } from '../../../common/report-skeleton';
import { useFacilityName } from '../../../common/report-header';
import { type ReportDefinition } from '../../../dashboard/report-catalog';
import { getCareAndTreatment, type CareAndTreatmentGroup } from '../../../resources/care-and-treatment.resource';
import { AGE_BANDS, CARE_AND_TREATMENT_SECTIONS, isMchRow, rowTitle, SEXES } from './care-and-treatment.config';
import CareAndTreatmentTable, { SEX_LABEL, type CellQuery } from './care-and-treatment-table.component';
import styles from './care-and-treatment.scss';

interface CareAndTreatmentReportProps {
  report: ReportDefinition;
}

export const CARE_AND_TREATMENT_LINELIST_PATH = '/program/care-and-treatment-linelist';

/** The linelist's parameters for a cell: its figures, age band, sex and whether MCH/PMTCT only */
export function cellParams({ section, row, band, sex }: CellQuery) {
  const params = new URLSearchParams();
  row.indicators.forEach((indicator) => params.append('i', indicator));
  if (band) params.set('ageBand', band.id);
  if (sex) params.set('gender', sex);
  if (isMchRow(section, row)) params.set('mch', '1');
  return params;
}

/**
 * Care & Treatment and ARV Management (Program reports → HIV), sections 1.1
 * to 1.4: Starting on ART, Current on ART, months of ARVs dispensed and
 * TX_PVLS, by age band and sex, for the session location's whole facility in
 * the month chosen -- one table, laid out as the reporting form.
 *
 * The ETL adds the figures up by age band, sex and MCH/PMTCT (a few dozen rows
 * whatever the facility's size); each cell is the sum of its groups, and opens
 * the linelist of its clients, fetched only then.
 */
const CareAndTreatmentReport: React.FC<CareAndTreatmentReportProps> = ({ report }) => {
  const [groups, setGroups] = useState<CareAndTreatmentGroup[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
  const sheetRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  /* the figures cover the session location's whole facility, so it is named by its parent location (MTRH) */
  const facility = useFacilityName(locationUuids, session?.sessionLocation?.display ?? '');
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('careAndTreatmentLocation');
  const isReportGenerated = groups !== null && isForCurrentLocation;

  const generate = useCallback(
    async ({ startDate, endDate }: ReportPeriod) => {
      setIsLoading(true);
      setPeriod({ startDate, endDate });
      try {
        setGroups(await getCareAndTreatment({ locationUuids, endDate }));
        markGenerated(locationUuids);
      } catch (error) {
        showReportError('the Care & Treatment report', error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locationUuids],
  );

  useRestorePeriod(generate);

  /** A cell: the sum of its figures over the groups it takes in */
  const count = ({ section, row, band, sex }: CellQuery) => {
    const mchOnly = isMchRow(section, row);
    return (groups ?? [])
      .filter(
        (group) =>
          (!band || group.age_band === band.id) &&
          (!sex || group.gender === sex) &&
          (!mchOnly || Number(group.mch) === 1),
      )
      .reduce((total, group) => total + row.indicators.reduce((sum, key) => sum + Number(group[key] ?? 0), 0), 0);
  };

  const open = (cell: CellQuery) => {
    const params = cellParams(cell);
    const where = [cell.band ? `Age ${cell.band.label}` : 'All ages', cell.sex && SEX_LABEL[cell.sex]];
    params.set('label', [rowTitle(cell.group, cell.row), ...where].filter(Boolean).join(' · '));
    params.set('startDate', period.startDate);
    params.set('endDate', period.endDate);
    params.set('locationUuids', locationUuids);
    navigate(`${CARE_AND_TREATMENT_LINELIST_PATH}?${params}`);
  };

  /* A section link brings the table up under the pinned header, then its
     section's first row up under the table's heading */
  const scrollTo = (id: string) => {
    const row = document.getElementById(`ct-${id}`)?.querySelector('tr');
    const table = row?.closest('table');
    const box = table?.parentElement;
    const head = headRef.current;
    if (!row || !table || !box || !head) {
      return;
    }
    let page = box.parentElement;
    while (page && !(page.scrollHeight > page.clientHeight && /(auto|scroll)/.test(getComputedStyle(page).overflowY))) {
      page = page.parentElement;
    }
    /* the header pins to the top of the page's scrolling area, its own height tall */
    const scroller = page ?? document.scrollingElement;
    const pinnedBottom = (page ? page.getBoundingClientRect().top : 0) + head.offsetHeight;
    scroller?.scrollBy({ top: box.getBoundingClientRect().top - pinnedBottom, behavior: 'smooth' });
    box.scrollTo({ top: row.offsetTop - (table.tHead?.offsetHeight ?? 0), behavior: 'smooth' });
  };

  /* Download PDF saves the report as one landscape A3 page. The table scrolls
     sideways on screen, so while it is captured it is laid out at full width. */
  const downloadPdf = async () => {
    const sheet = sheetRef.current;
    if (!sheet) {
      return;
    }
    sheet.dataset.capturing = 'true';
    try {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await downloadSheetsPdf([sheet], `${fileName}.pdf`, { paperSize: 'a3', orientation: 'landscape', image: 'jpeg' });
    } finally {
      delete sheet.dataset.capturing;
    }
  };

  const periodLabel = period.endDate ? dayjs(period.endDate).format('MMMM YYYY') : '';
  const fileName = ['Care-and-Treatment', facility, period.endDate.slice(0, 7)]
    .filter(Boolean)
    .join('_')
    .replace(/[^a-z0-9_-]+/gi, '-');

  /* Download CSV: the table as it is laid out -- the age bands across the top
     with F and M under each, then the Total; each section's and group's name
     once, at its first row, as the merged cells read -- under the report's
     title, facility and period, with its notes after. Cells that do not apply
     are left empty. */
  const exportCsv = () => {
    const lines = CARE_AND_TREATMENT_SECTIONS.flatMap((section) =>
      section.groups.flatMap((group, groupIndex) =>
        group.rows.map((row, rowIndex) => ({
          section,
          group,
          row,
          firstInSection: groupIndex === 0 && rowIndex === 0,
          firstInGroup: rowIndex === 0,
        })),
      ),
    );
    const columns: RegisterColumn[] = [
      {
        header: 'Section',
        value: (line) => (line.firstInSection ? `${line.section.number} ${line.section.title}` : ''),
      },
      { header: 'Group', value: (line) => (line.firstInGroup ? (line.group.title ?? '') : '') },
      { header: 'Indicator', value: (line) => line.row.label },
      ...AGE_BANDS.flatMap((band) =>
        SEXES.map(
          (sex, index): RegisterColumn => ({
            /* the band over its F and M, as the table's heading */
            header: index === 0 ? band.label : '',
            value: (line) =>
              isMchRow(line.section, line.row) && (sex === 'M' || band.child)
                ? ''
                : count({ ...(line as CellQuery), band, sex }),
          }),
        ),
      ),
      { header: 'Total', value: (line) => count(line as CellQuery) },
    ];
    const subHeaderRow = ['', '', '', ...AGE_BANDS.flatMap(() => SEXES), ''];
    const quoted = (text: string) => `"${text.replace(/"/g, '""')}"`;
    const title = [
      'Monthly Reporting Summary - 1.0 Care & Treatment and ARV Management',
      `Facility: ${facility}`,
      `Period: ${periodLabel}`,
    ].map(quoted);
    const notes = [
      ...CARE_AND_TREATMENT_SECTIONS.filter((section) => section.note).map((section) => section.note ?? ''),
      'Not categorized rows are clients whose detail is not recorded, shown so each part adds up to its total (for data cleanup); empty cells do not apply.',
    ].map(quoted);
    downloadCsv(
      [...title, '', columnsToCsv(lines, columns, { subHeaderRow }), '', 'Notes', ...notes].join('\n'),
      `${fileName}.csv`,
    );
  };

  return (
    <>
      <ReportFiltersComponent
        reportName={`${report.name} (${report.code})`}
        mode="monthly"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={period}
        onDownloadPdf={downloadPdf}
        backLink={{ label: 'Program reports', to: '/?group=program' }}
      />
      {isLoading && <ReportSkeleton blocks={3} />}
      {!isLoading && !isReportGenerated && (
        <ReportPlaceholder reportName={report.name} isLocationChanged={groups !== null && hasLocationChanged} />
      )}
      {!isLoading && isReportGenerated && (
        <div className={styles.report}>
          <Layer as="section" className={styles.sheet} ref={sheetRef}>
            {/* the title, facility and period, with the section links and the CSV
                download under them, stay in view as the report scrolls */}
            <div className={styles.stickyHead} ref={headRef}>
              <header className={styles.masthead}>
                <div>
                  <p className={styles.kicker}>Monthly Reporting Summary</p>
                  <h4 className={styles.reportTitle}>1.0 Care &amp; Treatment and ARV Management</h4>
                </div>
                <dl className={styles.meta}>
                  <div>
                    <dt>Facility</dt>
                    <dd>{facility}</dd>
                  </div>
                  <div>
                    <dt>Period</dt>
                    <dd>{periodLabel}</dd>
                  </div>
                </dl>
              </header>
              <div className={styles.toolbar}>
                <nav className={styles.sectionNav} aria-label="Sections">
                  {CARE_AND_TREATMENT_SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      className={styles.sectionLink}
                      onClick={() => scrollTo(section.id)}
                    >
                      <span className={styles.sectionNumber}>{section.number}</span>
                      {section.shortTitle}
                    </button>
                  ))}
                </nav>
                <Button kind="tertiary" size="sm" renderIcon={Download} onClick={exportCsv}>
                  Download CSV
                </Button>
              </div>
            </div>
            {/* the notes follow the last row inside the table's box, so the page
                ends with the table and its heading never passes behind the header */}
            <CareAndTreatmentTable
              count={count}
              open={open}
              footer={
                <ul className={styles.notes}>
                  {CARE_AND_TREATMENT_SECTIONS.filter((section) => section.note).map((section) => (
                    <li key={section.id}>{section.note}</li>
                  ))}
                  <li>
                    Rows in <em className={styles.notRecordedSample}>grey italics</em> are clients whose detail is not
                    recorded, shown so each part adds up to its total (for data cleanup). A dot is 0; shaded cells do
                    not apply.
                  </li>
                </ul>
              }
            />
          </Layer>
        </div>
      )}
    </>
  );
};

export default CareAndTreatmentReport;
