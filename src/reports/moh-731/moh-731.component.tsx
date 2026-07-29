import React, { useEffect, useState } from 'react';

import styles from './moh-731.scss';
import { ReportFiltersComponent, type ReportPeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { hasReportData, ReportPlaceholder } from '../../common/report-placeholder';
import { formatDate, useSession } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { getMoh731 } from '../../resources/moh-731.resource';
import HivTestingandPreExposusreProphylaxis from './sections/hiv-testing-and-pre-exposure.component';
import PmtctComponent from './sections/pmtct.component';
import HivAndTBTreatmentComponent from './sections/hiv-and-tb-treatment.component';
import { ReportSkeleton } from '../../common/report-skeleton';
import { usePageScale } from '../../common/report-page';

interface Moh731Props {}

const Moh731Report: React.FC<Moh731Props> = () => {
  const [moh731Data, setMoh731Data] = useState<any>(() => {
    const saved = sessionStorage.getItem('moh731Data');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(() => {
    return sessionStorage.getItem('moh731StartDate') || '';
  });

  const [endDate, setEndDate] = useState<string>(() => {
    return sessionStorage.getItem('moh731EndDate') || '';
  });
  useEffect(() => {
    sessionStorage.setItem('moh731Data', JSON.stringify(moh731Data));
  }, [moh731Data]);

  useEffect(() => {
    sessionStorage.setItem('moh731StartDate', startDate);
  }, [startDate]);

  useEffect(() => {
    sessionStorage.setItem('moh731EndDate', endDate);
  }, [endDate]);

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;
  const navigate = useNavigate();

  const isReportGenerated = hasReportData(moh731Data);

  /* The sign-off records who produced the return and when. Designation and
     signature stay blank -- those are filled in by hand on the printed sheet. */
  /* The masthead names the location the report was generated from, so the
     session location leads and the ETL's own facility field is the fallback.
     County, sub-county and MFL come from the response where the ETL supplies
     them (the same keys MOH-740 returns). Month and year come from the period
     the report was actually generated for, not from today. */
  const facility = session?.sessionLocation?.display ?? moh731Data?.facility ?? '';
  const county = moh731Data?.county ?? '';
  const subCounty = moh731Data?.sub_county ?? '';
  const mflCode = moh731Data?.mfl_code ?? '';
  const reportMonth = startDate ? dayjs(startDate).format('MMMM') : '';
  const reportYear = startDate ? dayjs(startDate).format('YYYY') : '';

  const generatedBy = session?.user?.person?.display ?? session?.user?.display ?? '';
  const generatedOn = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

  /** Fills the available width, never rendering below A4 */
  const { ref: viewportRef, scale } = usePageScale<HTMLDivElement>();

  const fetchMoh731ReportData = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setStartDate(startDate);
    setEndDate(endDate);

    const params = {
      locationUuids: locationUuids || '',
      startDate,
      endDate,
    };
    try {
      const data = await getMoh731(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh731Data(flatData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      showReportError('the MOH-731 report', error);
    }
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-731 Report"
        mode="monthly"
        onGenerate={fetchMoh731ReportData}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={{ startDate, endDate }}
      />
      {isLoading && <ReportSkeleton blocks={3} />}
      {!isLoading && !isReportGenerated && <ReportPlaceholder reportName="MOH-731" />}
      {!isLoading && isReportGenerated && (
        <>
          {/* The sheet is a fixed A4 page, so it scrolls inside this viewport
              rather than forcing the whole app to scroll sideways. */}
          <div className={styles.viewport} ref={viewportRef}>
            {/* The scale is a custom property rather than an inline `zoom`, so
                the print stylesheet can still reset it to 1 */}
            <div className={styles.form} style={{ '--page-zoom': scale } as React.CSSProperties}>
              {/* Ministry line sits above the ruled sheet, as on the printed form */}
              <div className={styles.ministryLine}>
                <span>Ministry of Health</span>
                <span>Ver. July 2023</span>
              </div>

              <div className={styles.sheet}>
                <div className={styles.formHeader}>
                  <div className={styles.formTitle}>
                    <strong>National AIDS &amp; STI Control Program- NASCOP</strong>
                    <strong>Comprehensive HIV/ AIDS reporting form</strong>
                  </div>
                  <span className={styles.formVersion}>(MOH 731-Ver. July 2023)</span>
                </div>

                {/* Each label and its rule is one flex item, so the six pairs stay
                  on a single centred line and cannot run together. */}
                <p className={styles.locationContainer}>
                  <span>
                    County<span className={styles.line}>{county}</span>
                  </span>
                  <span>
                    Sub County<span className={styles.line}>{subCounty}</span>
                  </span>
                  <span>
                    Facility<span className={styles.line}>{facility}</span>
                  </span>
                  <span>
                    MFL<span className={styles.shortLine}>{mflCode}</span>
                  </span>
                  <span>
                    Month<span className={styles.shortLine}>{reportMonth}</span>
                  </span>
                  <span>
                    year<span className={styles.shortLine}>{reportYear}</span>
                  </span>
                </p>

                <h5 className={styles.sectionHeader}>1. HIV Testing Services &amp; Pre exposure Prophylaxis</h5>
                <HivTestingandPreExposusreProphylaxis
                  MOH731Data={moh731Data}
                  startDate={startDate}
                  endDate={endDate}
                  locationUuids={locationUuids!}
                />

                <h5 className={styles.sectionHeader}>2. Elimination of Mother-to-Child Transmission (EMTCT)</h5>
                <PmtctComponent
                  MOH731Data={moh731Data}
                  startDate={startDate}
                  endDate={endDate}
                  locationUuids={locationUuids!}
                />

                {/* The sign-off is the bottom band of columns 1 and 2 on the printed
                sheet, with section 5 continuing beside it, so it is handed to
                section 3 rather than rendered after it. */}
                <HivAndTBTreatmentComponent
                  MOH731Data={moh731Data}
                  startDate={startDate}
                  endDate={endDate}
                  locationUuids={locationUuids!}
                  footer={
                    <div className={styles.reviewSection}>
                      <span className={styles.reviewLabel}>Reviewed by:</span>
                      <span>Name</span>
                      <span>Designation</span>
                      <span>Signature</span>
                      <span>Date</span>

                      <span />
                      <span className={styles.reviewRule}>{generatedBy}</span>
                      <span className={styles.reviewRule} />
                      <span className={styles.reviewRule} />
                      <span className={styles.reviewRule}>{generatedOn}</span>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Moh731Report;
