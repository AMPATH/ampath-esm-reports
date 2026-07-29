import React, { useEffect, useState } from 'react';
import { ReportFiltersComponent, type ReportPeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { hasReportData, ReportPlaceholder } from '../../common/report-placeholder';

import styles from './moh717.scss';
import classNames from 'classnames';
import { useSession } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { getMoh717 } from '../../resources/moh-717.resource';
import OutpatientComponent from './sections/outpatient.component';
import InpatientComponent from './sections/inpatient.component';
import MaternityComponent from './sections/maternity.component';
import OperationsComponent from './sections/operations.component';
import OrthopaedicTraumaComponent from './sections/orthopaedic-trauma.component';
import SpecialServicesComponent from './sections/special-services.component';
import PharmacyComponent from './sections/pharmacy.component';
import MortuaryComponent from './sections/mortuary.component';
import MedicalRecordsComponent from './sections/medical-records.component';
import FinanceComponent from './sections/finance.component';
import PreparedbyComponent from './sections/preparedby.component';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';

const Moh717Report: React.FC = () => {
  const [moh717ReportData, setMoh717ReportData] = useState<any>(() => {
    const saved = sessionStorage.getItem('moh717ReportData');
    return saved ? JSON.parse(saved) : [];
  });
  const isReportGenerated = hasReportData(moh717ReportData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(() => {
    return sessionStorage.getItem('moh717StartDate') || '';
  });

  const [endDate, setEndDate] = useState<string>(() => {
    return sessionStorage.getItem('moh717EndDate') || '';
  });
  useEffect(() => {
    sessionStorage.setItem('moh717ReportData', JSON.stringify(moh717ReportData));
  }, [moh717ReportData]);

  useEffect(() => {
    sessionStorage.setItem('moh717StartDate', startDate);
  }, [startDate]);

  useEffect(() => {
    sessionStorage.setItem('moh717EndDate', endDate);
  }, [endDate]);

  const session = useSession();
  const locationUuid = session?.sessionLocation?.uuid;

  /* The masthead fills itself in, as on the other reports */
  const facility = session?.sessionLocation?.display ?? '';
  const reportMonth = startDate ? dayjs(startDate).format('MMMM') : '';
  const reportYear = startDate ? dayjs(startDate).format('YYYY') : '';

  const fetchMoh717ReportData = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setStartDate(startDate);
    setEndDate(endDate);

    const params = {
      locationUuids: locationUuid || '',
      startDate,
      endDate,
    };
    try {
      const data = await getMoh717(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh717ReportData(flatData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showReportError('the MOH-717 report', error);
    }
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-717 Report"
        mode="both"
        onGenerate={fetchMoh717ReportData}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={{ startDate, endDate }}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && <ReportPlaceholder reportName="MOH-717" />}
      {!isLoading && isReportGenerated && (
        <ReportPage>
          <div className={styles.headerContainer}>
            <div className={styles.mainTitleBox}>
              <h2 className={styles.mainTitle}>Ministry of Health</h2>
              <h3 className={styles.subTitle}>Monthly Service Workload Report for Health Facilities</h3>
              <div className={styles.locationContainer}>
                <span>
                  County: <span className={styles.shortLine}></span>
                </span>
                <span>
                  Sub-County: <span className={styles.shortLine}></span>
                </span>
                <span>
                  Health Facility: <span className={styles.line}>{facility}</span>
                </span>
              </div>
              <div className={styles.locationContainer}>
                <span>
                  Month: <span className={styles.shortLine}>{reportMonth}</span>
                </span>
                <span>
                  Year: <span className={styles.shortLine}>{reportYear}</span>
                </span>
                <span>
                  KMHFL Code: <span className={styles.shortLine}></span>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.section}>
              <OutpatientComponent
                moh717ReportData={moh717ReportData}
                startDate={startDate}
                endDate={endDate}
                locationUuids={locationUuid!}
              />
            </div>
            <div className={styles.section}>
              <InpatientComponent moh717ReportData={moh717ReportData} />
            </div>
            <div className={styles.sectionContainer}>
              <div className={styles.left}>
                <MaternityComponent
                  moh717ReportData={moh717ReportData}
                  startDate={startDate}
                  endDate={endDate}
                  locationUuids={locationUuid!}
                />
              </div>
              <div className={styles.right}>
                <div className={styles.section}>
                  <OperationsComponent moh717ReportData={moh717ReportData} />
                </div>
                <div className={styles.section}>
                  <OrthopaedicTraumaComponent moh717ReportData={moh717ReportData} />
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <SpecialServicesComponent moh717ReportData={moh717ReportData} />
            </div>
            <div className={styles.sectionTwoContainer}>
              <div className={styles.one}>
                <PharmacyComponent moh717ReportData={moh717ReportData} />
              </div>
              <div className={styles.two}>
                <MortuaryComponent moh717ReportData={moh717ReportData} />
              </div>
              <div className={styles.three}>
                <MedicalRecordsComponent moh717ReportData={moh717ReportData} />
              </div>
            </div>
            <div className={styles.section}>
              <FinanceComponent moh717ReportData={moh717ReportData} />
            </div>
            <div className={styles.preparedByContainer}>
              <PreparedbyComponent />
            </div>
          </div>
        </ReportPage>
      )}
    </>
  );
};

export default Moh717Report;
