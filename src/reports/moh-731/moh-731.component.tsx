import React, { useEffect, useRef, useState } from 'react';

import styles from './moh-731.scss';
import { ReportFiltersComponent, type ReportPeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { hasReportData, ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { formatDate, useSession } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { getMoh731 } from '../../resources/moh-731.resource';
import HivTestingandPreExposusreProphylaxis from './sections/hiv-testing-and-pre-exposure.component';
import PmtctComponent from './sections/pmtct.component';
import HivAndTBTreatmentComponent from './sections/hiv-and-tb-treatment.component';
import { ReportSkeleton } from '../../common/report-skeleton';
import { downloadSheetPdf, usePageScale } from '../../common/report-page';
import Moh731Summary from './summary/moh-731-summary.component';
import { useOpenMoh731Linelist } from './linelist/use-open-moh-731-linelist';

interface Moh731Props {}

/** The sheet's on-screen width: A4 less its 8mm margins (`.form` in moh-731.scss) */
const SHEET_WIDTH_MM = 210 - 2 * 8;

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

  /* The form tab is the default; the selected tab is kept in the URL so a
     linelist opened from the Summary tab comes back to it. */
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get('view') === 'summary' ? 1 : 0;
  const selectTab = ({ selectedIndex }: { selectedIndex: number }) => {
    const next = new URLSearchParams(searchParams);
    if (selectedIndex === 1) {
      next.set('view', 'summary');
    } else {
      next.delete('view');
    }
    setSearchParams(next, { replace: true });
  };
  /* the Summary's section tab, kept in the URL the same way */
  const summarySection = searchParams.get('section') ?? '';
  const selectSummarySection = (section: string) => {
    const next = new URLSearchParams(searchParams);
    next.set('section', section);
    setSearchParams(next, { replace: true });
  };

  /* Only a report for the current location counts: after switching location the
     old figures would otherwise be shown, and labelled, as the new location's. */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh731Location');
  const isReportGenerated = hasReportData(moh731Data) && isForCurrentLocation;
  const openSummaryLinelist = useOpenMoh731Linelist(startDate, endDate, locationUuids ?? '', 'summary', summarySection);

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
  const { ref: viewportRef, scale } = usePageScale<HTMLDivElement>(SHEET_WIDTH_MM);

  /* Download PDF saves the form whichever tab is open; the file is made from a
     copy, so the sheet on screen is left as it is */
  const formRef = useRef<HTMLDivElement>(null);
  const downloadPdf = async () => {
    if (!formRef.current) {
      return;
    }
    const name = ['MOH-731', facility, startDate ? dayjs(startDate).format('YYYY-MM') : '']
      .filter(Boolean)
      .join('_')
      .replace(/[^a-z0-9_-]+/gi, '-');
    await downloadSheetPdf(formRef.current, `${name}.pdf`);
  };

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
      markGenerated(params.locationUuids);
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
        onDownloadPdf={downloadPdf}
      />
      {isLoading && <ReportSkeleton blocks={3} />}
      {!isLoading && !isReportGenerated && (
        <ReportPlaceholder reportName="MOH-731" isLocationChanged={hasReportData(moh731Data) && hasLocationChanged} />
      )}
      {!isLoading && isReportGenerated && (
        <Tabs selectedIndex={selectedTab} onChange={selectTab}>
          <TabList aria-label="MOH 731 views" className={styles.tabList}>
            <Tab>MOH 731 Form</Tab>
            <Tab>Summary</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className={styles.formPanel}>
              {/* The sheet is a fixed A4 page, so it scrolls inside this viewport
              rather than forcing the whole app to scroll sideways. */}
              <div className={styles.reportFrame}>
                <div className={styles.viewport} ref={viewportRef}>
                  {/* The scale is a custom property rather than an inline `zoom`, so
                the print stylesheet can still reset it to 1 */}
                  <div className={styles.form} ref={formRef} style={{ '--page-zoom': scale } as React.CSSProperties}>
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
              </div>
            </TabPanel>
            <TabPanel className={styles.summaryPanel}>
              <Moh731Summary
                data={moh731Data}
                openLinelist={openSummaryLinelist}
                sectionId={summarySection}
                onSectionChange={selectSummarySection}
                period={`${startDate}-${endDate}`}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </>
  );
};

export default Moh731Report;
