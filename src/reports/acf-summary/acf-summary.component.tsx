import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { downloadSheetsPdf } from '../../common/report-page';
import { ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { showReportError } from '../../common/report-error';
import { ReportSkeleton } from '../../common/report-skeleton';
import { registerFileName } from '../../registers/register-file-name';
import { getPresumptiveTb } from '../../resources/presumptive-tb.resource';
import { acfCounts, type AcfCase } from './acf-summary.counts';
import AcfSummaryForm from './acf-summary-form.component';
import styles from './acf-summary.scss';

/**
 * Summary Tool for Facility-Based Active Case Finding (MOH/F/DNTLDP/02),
 * opened from the landing page's Reports tab, with the reports' filter bar.
 *
 * Indicators 4 to 8 are counted from the Presumptive TB Register's cases for
 * the month (/presumptive-tb-register), so the two always agree.
 */
const AcfSummaryReport: React.FC = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });

  const navigate = useNavigate();
  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  const facility = session?.sessionLocation?.display ?? '';
  /* Only a report for the current location counts */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('acfSummaryLocation');
  const isReportGenerated = isGenerated && isForCurrentLocation;

  const generate = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setPeriod({ startDate, endDate });
    try {
      setCounts(acfCounts((await getPresumptiveTb({ locationUuids, startDate, endDate })) as AcfCase[]));
      setIsGenerated(true);
      markGenerated(locationUuids);
    } catch (error) {
      showReportError('the ACF Facility Summary Tool', error);
    } finally {
      setIsLoading(false);
    }
  };

  useRestorePeriod(generate);

  /* Each count opens the register cases it counts */
  const openLinelist = (indicator: number) => {
    const params = new URLSearchParams({ ...period, locationUuids, indicator: String(indicator), from: 'acf-summary' });
    navigate(`/acf-summary-linelist?${params}`);
  };

  /* Download PDF saves the form as one A4 landscape page, made from a copy, so
     the page on screen is left as it is */
  const sheetRef = useRef<HTMLDivElement>(null);
  const downloadPdf = async () => {
    const pages = Array.from(sheetRef.current?.querySelectorAll<HTMLElement>('[data-register-page]') ?? []);
    await downloadSheetsPdf(pages, registerFileName('ACF-Facility-Summary', facility, period), {
      orientation: 'landscape',
      stylesheetsOnly: true,
    });
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="ACF Facility Summary Tool"
        mode="monthly"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={period}
        onDownloadPdf={downloadPdf}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && (
        <ReportPlaceholder
          reportName="ACF Facility Summary Tool"
          isLocationChanged={isGenerated && hasLocationChanged}
        />
      )}
      {!isLoading && isReportGenerated && (
        <div className={styles.reportFrame} ref={sheetRef}>
          <AcfSummaryForm facility={facility} month={period.startDate} counts={counts} onOpen={openLinelist} />
        </div>
      )}
    </>
  );
};

export default AcfSummaryReport;
