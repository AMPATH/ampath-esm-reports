import React, { useRef, useState } from 'react';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { downloadSheetsPdf } from '../../common/report-page';
import { showReportError } from '../../common/report-error';
import { ReportSkeleton } from '../../common/report-skeleton';
import { getPresumptiveTb } from '../../resources/presumptive-tb.resource';
import { registerFileName } from '../register-file-name';
import { ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import PresumptiveTbRegister from './presumptive-tb-register.component';
import { type PresumptiveTbRow } from './presumptive-tb.types';
import styles from './presumptive-tb-register.scss';

/**
 * Presumptive TB Register (MOH/REG/DNTLDP/02), opened from the landing page's
 * Registers tab, with the reports' filter bar.
 *
 * The cases are the TB encounters (331) in the period, for the whole facility,
 * already in the register's columns (/presumptive-tb-register).
 */
const PresumptiveTbRegisterPage: React.FC = () => {
  const [rows, setRows] = useState<PresumptiveTbRow[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  /* Only a register for the current location counts */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('presumptiveTbLocation');
  const isGenerated = rows !== null && isForCurrentLocation;

  const generate = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setPeriod({ startDate, endDate });
    try {
      setRows((await getPresumptiveTb({ locationUuids, startDate, endDate })) as PresumptiveTbRow[]);
      markGenerated(locationUuids);
    } catch (error) {
      showReportError('the Presumptive TB register', error);
    } finally {
      setIsLoading(false);
    }
  };

  useRestorePeriod(generate);

  /* Download PDF saves every page of the register as an A3 landscape page,
     made from copies, so the pages on screen are left as they are */
  const sheetsRef = useRef<HTMLDivElement>(null);
  const downloadPdf = async () => {
    const pages = Array.from(sheetsRef.current?.querySelectorAll<HTMLElement>('[data-register-page]') ?? []);
    const name = registerFileName('Presumptive-TB-Register', session?.sessionLocation?.display ?? '', period);
    /* styled by its own stylesheets in Arial only, and may run to many pages */
    await downloadSheetsPdf(pages, name, {
      paperSize: 'a3',
      orientation: 'landscape',
      stylesheetsOnly: true,
      image: 'jpeg',
    });
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="Presumptive TB Register"
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
        <ReportPlaceholder
          reportName="Presumptive TB Register"
          isLocationChanged={rows !== null && hasLocationChanged}
        />
      )}
      {!isLoading && isGenerated && (
        <div className={styles.reportFrame} ref={sheetsRef}>
          <PresumptiveTbRegister rows={rows} />
        </div>
      )}
    </>
  );
};

export default PresumptiveTbRegisterPage;
