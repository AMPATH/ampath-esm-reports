import React, { useEffect, useState } from 'react';
import { ReportFiltersComponent, type ReportPeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { hasReportData, ReportPlaceholder } from '../../common/report-placeholder';

import styles from './moh711.scss';
import classNames from 'classnames';
import { useSession } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { getMoh711 } from '../../resources/moh-711.resource';
import TBScreeningComponent from './sections/tb-screening.component';
import ANCComponent from './sections/anc.component';
import MaternityComponent from './sections/maternity.component';
import GBVComponent from './sections/gbv.component';
import FamilyPlanningComponent from './sections/family-planning.component';
import CervicalCancerComponent from './sections/cervical-cancer.component';
import PostAbortion from './sections/post-abortion.component';
import ChanisComponent from './sections/chanis.component';
import PNCComponent from './sections/pnc.component';
import RehabilitationComponent from './sections/rehabilitation.component';
import MedicalSocialWorkComponent from './sections/medical-social-work.component';
import PhysiotherapyComponent from './sections/physiotherapy.component';
import OtherComponent from './sections/other.component';
import ReportCompiledByComponent from './sections/report-compiled-by.component';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';

const Moh711Report: React.FC = () => {
  const [moh711Data, setMoh711Data] = useState<any>(() => {
    const saved = sessionStorage.getItem('moh711Data');
    return saved ? JSON.parse(saved) : [];
  });
  const isReportGenerated = hasReportData(moh711Data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(() => {
    return sessionStorage.getItem('moh711StartDate') || '';
  });

  const [endDate, setEndDate] = useState<string>(() => {
    return sessionStorage.getItem('moh711EndDate') || '';
  });
  useEffect(() => {
    sessionStorage.setItem('moh711Data', JSON.stringify(moh711Data));
  }, [moh711Data]);

  useEffect(() => {
    sessionStorage.setItem('moh711StartDate', startDate);
  }, [startDate]);

  useEffect(() => {
    sessionStorage.setItem('moh711EndDate', endDate);
  }, [endDate]);

  const session = useSession();
  const locationUuid = session?.sessionLocation?.uuid;

  /* The masthead names the location the report was generated from; county and
     sub-county come from the response where the ETL supplies them. Month and
     year follow the period generated, not today. */
  const facility = session?.sessionLocation?.display ?? moh711Data?.facility ?? '';
  const county = moh711Data?.county ?? '';
  const subCounty = moh711Data?.sub_county ?? '';
  const reportMonth = startDate ? dayjs(startDate).format('MMMM') : '';
  const reportYear = startDate ? dayjs(startDate).format('YYYY') : '';

  const fetchMoh711ReportData = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setStartDate(startDate);
    setEndDate(endDate);

    const params = {
      locationUuids: locationUuid || '',
      startDate,
      endDate,
    };
    try {
      const data = await getMoh711(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh711Data(flatData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsLoading(false);
      showReportError('the MOH-711 report', error);
    }
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-711 Report"
        mode="both"
        onGenerate={fetchMoh711ReportData}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={{ startDate, endDate }}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && <ReportPlaceholder reportName="MOH-711" />}
      {!isLoading && isReportGenerated && (
        <ReportPage>
          <div className={styles.headerContainer}>
            <div className={styles.mainTitleBox}>
              <h5>
                INTEGRATED PROGRAM SUMMARY REPORT FORM: REPRODUCTIVE AND CHILD HEALTH, MEDICAL AND REHABILITATION
                SERVICES
              </h5>
              <div className={styles.locationContainer}>
                <span>
                  Facility Name: <span className={styles.line}>{facility}</span>
                </span>
                <span>
                  County: <span className={styles.line}>{county}</span>
                </span>
                <span>
                  Sub County: <span className={styles.line}>{subCounty}</span>
                </span>
                <span>
                  Month: <span className={styles.shortLine}>{reportMonth}</span>
                </span>
                <span>
                  Year: <span className={styles.shortLine}>{reportYear}</span>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.left}>
              <ANCComponent
                moh711Data={moh711Data}
                startDate={startDate}
                endDate={endDate}
                locationUuids={locationUuid!}
              />
              <GBVComponent moh711Data={moh711Data} />
              <FamilyPlanningComponent moh711Data={moh711Data} />
              <CervicalCancerComponent
                moh711Data={moh711Data}
                startDate={startDate}
                endDate={endDate}
                locationUuids={locationUuid!}
              />
              <PNCComponent
                moh711Data={moh711Data}
                startDate={startDate}
                endDate={endDate}
                locationUuids={locationUuid!}
              />
              <RehabilitationComponent moh711Data={moh711Data} />
              <MedicalSocialWorkComponent moh711Data={moh711Data} />
              <ReportCompiledByComponent />
            </div>
            <div className={styles.right}>
              <MaternityComponent
                moh711Data={moh711Data}
                startDate={startDate}
                endDate={endDate}
                locationUuids={locationUuid!}
              />
              <PostAbortion moh711Data={moh711Data} />
              <ChanisComponent moh711Data={moh711Data} />
              <PhysiotherapyComponent moh711Data={moh711Data} />
              <OtherComponent moh711Data={MaternityComponent} />
              <TBScreeningComponent moh711Data={moh711Data} />
            </div>
          </div>
        </ReportPage>
      )}
    </>
  );
};

export default Moh711Report;
