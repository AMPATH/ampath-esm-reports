import React, { useEffect, useState } from 'react';
import ClientCategoryComponent from './sections/client-category.component';

import styles from './moh-733.scss';
import NutritionStatusComponent from './sections/nutrition-status.component';
import NutritionStatusWeightComponent from './sections/nutrition-status-weight.component';
import NutritionInterventionComponent from './sections/nutrition-intervention.component';
import NutritionInterventionPregnantBrestfeedingComponent from './sections/nutrition-intervention-pregnant-breastfeeding.component';
import { showReportError } from '../../common/report-error';
import dayjs from 'dayjs';
import { ReportFiltersComponent, type ReportPeriod } from '../../common/report-filters';
import { formatDate, useSession } from '@openmrs/esm-framework';
import { hasReportData, ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { getMoh733 } from '../../resources/moh-733.resource';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';

const Moh733Component: React.FC = () => {
  const [moh733Data, setMoh733Data] = useState<any>(() => {
    const saved = sessionStorage.getItem('moh733Data');
    return saved ? JSON.parse(saved) : [];
  });
  /* Only a report for the current location counts: after switching location the
       old figures would otherwise be shown, and labelled, as the new location's. */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh733Location');
  const isReportGenerated = hasReportData(moh733Data) && isForCurrentLocation;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(() => {
    return sessionStorage.getItem('moh733StartDate') || '';
  });

  const [endDate, setEndDate] = useState<string>(() => {
    return sessionStorage.getItem('moh733EndDate') || '';
  });
  useEffect(() => {
    sessionStorage.setItem('moh733Data', JSON.stringify(moh733Data));
  }, [moh733Data]);

  useEffect(() => {
    sessionStorage.setItem('moh733StartDate', startDate);
  }, [startDate]);

  useEffect(() => {
    sessionStorage.setItem('moh733EndDate', endDate);
  }, [endDate]);

  const session = useSession();
  const locationUuid = session?.sessionLocation?.uuid;

  /* The masthead names the location the report was generated from; county and
       sub-county come from the response where the ETL supplies them. Month and
       year follow the period generated, not today. */
  const facility = session?.sessionLocation?.display ?? moh733Data?.facility ?? '';
  const county = moh733Data?.county ?? '';
  const subCounty = moh733Data?.sub_county ?? '';
  const reportMonth = startDate ? dayjs(startDate).format('MMMM') : '';
  const reportYear = startDate ? dayjs(startDate).format('YYYY') : '';
  const compiledBy = session?.user?.person?.display ?? session?.user?.display ?? '';
  const compiledOn = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

  const fetchMoh733ReportData = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setStartDate(startDate);
    setEndDate(endDate);

    const params = {
      locationUuids: locationUuid || '',
      startDate,
      endDate,
    };
    try {
      const data = await getMoh733(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh733Data(flatData);
      markGenerated(params.locationUuids);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsLoading(false);
      showReportError('the MOH-733 report', error);
    }
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-733 Report"
        mode="both"
        onGenerate={fetchMoh733ReportData}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={{ startDate, endDate }}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && (
        <ReportPlaceholder reportName="MOH-733" isLocationChanged={hasReportData(moh733Data) && hasLocationChanged} />
      )}
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
          <div>
            <p>CLIENT CATEGORY</p>
            <ClientCategoryComponent
              moh733Data={moh733Data}
              startDate={startDate}
              endDate={endDate}
              locationUuids={locationUuid || ''}
            />
            <p>NUTRITION STATUS</p>
            <NutritionStatusComponent
              moh733Data={moh733Data}
              startDate={startDate}
              endDate={endDate}
              locationUuids={locationUuid || ''}
            />
            <p>NUTRITION STATUS</p>
            <NutritionStatusWeightComponent
              moh733Data={moh733Data}
              startDate={startDate}
              endDate={endDate}
              locationUuids={locationUuid || ''}
            />
            <p>NUTRITION INTERVENTION</p>
            <NutritionInterventionComponent
              moh733Data={moh733Data}
              startDate={startDate}
              endDate={endDate}
              locationUuids={locationUuid || ''}
            />
            <p>NUTRITION INTERVENTION</p>
            <NutritionInterventionPregnantBrestfeedingComponent
              moh733Data={moh733Data}
              startDate={startDate}
              endDate={endDate}
              locationUuids={locationUuid || ''}
            />
          </div>
          <div className={styles.signOff}>
            <span>
              Compiled by:<span className={styles.line}>{compiledBy}</span>
            </span>
            <span>
              Signature:
              <span className={styles.line} />
            </span>
            <span>
              Date:<span className={styles.shortLine}>{compiledOn}</span>
            </span>
          </div>
        </ReportPage>
      )}
    </>
  );
};

export default Moh733Component;
