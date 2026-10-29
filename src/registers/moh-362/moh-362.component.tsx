import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { downloadSheetsPdf } from '../../common/report-page';
import { registerFileName } from '../register-file-name';
import { ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { ReportSkeleton } from '../../common/report-skeleton';
import { getMoh362 } from '../../resources/moh-362.resource';
import Moh362LabRegister from './moh-362-lab-register.component';
import Moh362LinkageRegister from './moh-362-linkage-register.component';
import { isLinked, type Moh362Row } from './moh-362.types';
import styles from './moh-362.scss';

/**
 * MOH 362 HTS Lab, Referral & Linkage Register, opened from the landing page's
 * Registers tab. It shares the reports' filter bar. Unlike the other registers
 * the form holds two sheets, shown as tabs: the HTS lab register (every test,
 * the same tests as MOH 731 1.1 HIV Tests) and the referral and linkage
 * register (those who tested positive and were linked to care, i.e. have an ART
 * start date).
 */
const Moh362Register: React.FC = () => {
  const [rows, setRows] = useState<Moh362Row[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  /* Only a register for the current location counts */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh362Location');
  const isGenerated = rows !== null && isForCurrentLocation;

  const generate = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setPeriod({ startDate, endDate });
    try {
      setRows(await getMoh362({ locationUuids, startDate, endDate }));
      markGenerated(locationUuids);
    } catch (error) {
      showReportError('the MOH 362 register', error);
    } finally {
      setIsLoading(false);
    }
  };

  useRestorePeriod(generate);

  /* Download PDF saves the whole register, whichever sheet is open: the HTS lab
     register's pages, then the referral and linkage register's, each an A4
     landscape page. The file is made from copies, so the pages on screen are
     left as they are. */
  const sheetsRef = useRef<HTMLDivElement>(null);
  const downloadPdf = async () => {
    const pages = Array.from(sheetsRef.current?.querySelectorAll<HTMLElement>('[data-register-page]') ?? []);
    const name = registerFileName('MOH-362', session?.sessionLocation?.display ?? '', period);
    /* the register is styled by its own stylesheets in Arial and Georgia only,
       and runs to many pages */
    await downloadSheetsPdf(pages, name, { orientation: 'landscape', stylesheetsOnly: true, image: 'jpeg' });
  };

  /* the open sheet is kept in the URL */
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSheet = searchParams.get('sheet') === 'linkage' ? 1 : 0;
  const selectSheet = ({ selectedIndex }: { selectedIndex: number }) => {
    const next = new URLSearchParams(searchParams);
    if (selectedIndex === 1) {
      next.set('sheet', 'linkage');
    } else {
      next.delete('sheet');
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH 362 HTS Lab, Referral & Linkage Register"
        mode="both"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={isGenerated}
        generatedPeriod={period}
        defaultTab="custom"
        backLink={{ label: 'All registers', to: '/?tab=registers' }}
        onDownloadPdf={downloadPdf}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isGenerated && (
        <ReportPlaceholder reportName="MOH 362 register" isLocationChanged={rows !== null && hasLocationChanged} />
      )}
      {!isLoading && isGenerated && (
        <div ref={sheetsRef}>
          <Tabs selectedIndex={selectedSheet} onChange={selectSheet}>
            <TabList aria-label="MOH 362 registers" className={styles.sheetTabs}>
              <Tab>HTS Lab Register</Tab>
              <Tab>Referral and Linkage Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className={styles.sheetPanel}>
                <Moh362LabRegister rows={rows} />
              </TabPanel>
              <TabPanel className={styles.sheetPanel}>
                <Moh362LinkageRegister rows={rows.filter(isLinked)} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Moh362Register;
