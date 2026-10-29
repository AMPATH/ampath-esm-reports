import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { downloadSheetsPdf } from '../../common/report-page';
import { showReportError } from '../../common/report-error';
import { ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { ReportSkeleton } from '../../common/report-skeleton';
import { getMoh267 } from '../../resources/moh-267.resource';
import { registerFileName } from '../register-file-name';
import Moh267Register from './moh-267-register.component';
import { type Moh267Row } from './moh-267.types';
import styles from './moh-267-register.scss';

/**
 * MOH 267 PrEP Daily Activity Register, opened from the landing page's
 * Registers tab, with the reports' filter bar. Its visits are MOH 731's PrEP
 * visits (1.3 to 1.5), so the register and the report agree.
 */
const Moh267RegisterPage: React.FC = () => {
  const [rows, setRows] = useState<Moh267Row[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  /* TOTAL this Month: the visits in the calendar month of the period's end,
     whatever range the register itself covers */
  const [monthVisits, setMonthVisits] = useState(0);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  /* Only a register for the current location counts */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh267Location');
  const isGenerated = rows !== null && isForCurrentLocation;

  const generate = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setPeriod({ startDate, endDate });
    try {
      const monthStart = dayjs(endDate).startOf('month').format('YYYY-MM-DD');
      const monthEnd = dayjs(endDate).endOf('month').format('YYYY-MM-DD');
      const isWholeMonth = startDate === monthStart && endDate === monthEnd;
      const [visits, month] = await Promise.all([
        getMoh267({ locationUuids, startDate, endDate }),
        isWholeMonth ? null : getMoh267({ locationUuids, startDate: monthStart, endDate: monthEnd }),
      ]);
      setRows(visits);
      setMonthVisits((month ?? visits).length);
      markGenerated(locationUuids);
    } catch (error) {
      showReportError('the MOH 267 register', error);
    } finally {
      setIsLoading(false);
    }
  };

  useRestorePeriod(generate);

  /* Download PDF saves every page as an A4 landscape page, made from copies,
     so the pages on screen are left as they are */
  const sheetsRef = useRef<HTMLDivElement>(null);
  const downloadPdf = async () => {
    const pages = Array.from(sheetsRef.current?.querySelectorAll<HTMLElement>('[data-register-page]') ?? []);
    const name = registerFileName('MOH-267', session?.sessionLocation?.display ?? '', period);
    /* styled by its own stylesheets in Arial only, and may run to many pages */
    await downloadSheetsPdf(pages, name, { orientation: 'landscape', stylesheetsOnly: true, image: 'jpeg' });
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH 267 PrEP Daily Activity Register"
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
        <ReportPlaceholder reportName="MOH 267 register" isLocationChanged={rows !== null && hasLocationChanged} />
      )}
      {!isLoading && isGenerated && (
        <div className={styles.reportFrame} ref={sheetsRef}>
          <Moh267Register rows={rows} endDate={period.endDate} monthVisits={monthVisits} />
        </div>
      )}
    </>
  );
};

export default Moh267RegisterPage;
