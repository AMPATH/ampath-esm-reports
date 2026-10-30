import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { downloadSheetsPdf } from '../../common/report-page';
import { ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { registerFileName } from '../register-file-name';
import Tb4PatientSheet from './tb4-patient-sheet.component';
import Tb4TreatmentSheet from './tb4-treatment-sheet.component';
import { type Tb4Row } from './tb4.types';
import styles from './tb4-register.scss';

/**
 * TB4 Notification and Treatment Register (MOH/REG/DLTLDP/01), opened from the
 * landing page's Registers tab, with the reports' filter bar. Each spread of
 * the paper register is two facing pages, shown as tabs: the patient,
 * diagnosis and investigations (A–T), and treatment and follow-up (U–AH).
 *
 * The template only for now: its queries are still to be written, so
 * generating it shows the form ruled and blank for the period. Once the
 * backend is in, `generate` fetches the patients (`Tb4Row`) instead.
 */
const Tb4RegisterPage: React.FC = () => {
  const [rows, setRows] = useState<Tb4Row[] | null>(null);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  /* Only a register for the current location counts */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('tb4Location');
  const isGenerated = rows !== null && isForCurrentLocation;

  const generate = async ({ startDate, endDate }: ReportPeriod) => {
    setPeriod({ startDate, endDate });
    // no backend yet: the register is drawn blank
    setRows([]);
    markGenerated(locationUuids);
  };

  useRestorePeriod(generate);

  /* Download PDF saves the register as the paper book runs, whichever tab is
     open: each left-hand page followed by its right-hand page, as A3
     landscape pages made from copies, so the pages on screen are left as
     they are */
  const sheetsRef = useRef<HTMLDivElement>(null);
  const downloadPdf = async () => {
    const panels = Array.from(sheetsRef.current?.querySelectorAll<HTMLElement>('[data-tb4-side]') ?? []);
    const [left, right] = panels.map((panel) =>
      Array.from(panel.querySelectorAll<HTMLElement>('[data-register-page]')),
    );
    const pages = (left ?? []).flatMap((page, index) => [page, right?.[index]].filter(Boolean));
    const name = registerFileName('TB4-Register', session?.sessionLocation?.display ?? '', period);
    /* styled by its own stylesheets in Arial only, and may run to many pages */
    await downloadSheetsPdf(pages, name, {
      paperSize: 'a3',
      orientation: 'landscape',
      stylesheetsOnly: true,
      image: 'jpeg',
    });
  };

  /* the open side is kept in the URL */
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSide = searchParams.get('side') === 'treatment' ? 1 : 0;
  const selectSide = ({ selectedIndex }: { selectedIndex: number }) => {
    const next = new URLSearchParams(searchParams);
    if (selectedIndex === 1) {
      next.set('side', 'treatment');
    } else {
      next.delete('side');
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="TB4 Notification and Treatment Register"
        mode="both"
        onGenerate={generate}
        isLoading={false}
        isReportGenerated={isGenerated}
        generatedPeriod={period}
        defaultTab="custom"
        backLink={{ label: 'All registers', to: '/?tab=registers' }}
        onDownloadPdf={downloadPdf}
      />
      {!isGenerated && (
        <ReportPlaceholder reportName="TB4 register" isLocationChanged={rows !== null && hasLocationChanged} />
      )}
      {isGenerated && (
        <div ref={sheetsRef}>
          <Tabs selectedIndex={selectedSide} onChange={selectSide}>
            <TabList aria-label="TB4 register pages" className={styles.sheetTabs}>
              <Tab>Patient, diagnosis &amp; investigations (A–T)</Tab>
              <Tab>Treatment &amp; follow-up (U–AH)</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className={styles.sheetPanel}>
                <div className={styles.reportFrame} data-tb4-side>
                  <Tb4PatientSheet rows={rows} />
                </div>
              </TabPanel>
              <TabPanel className={styles.sheetPanel}>
                <div className={styles.reportFrame} data-tb4-side>
                  <Tb4TreatmentSheet rows={rows} />
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Tb4RegisterPage;
