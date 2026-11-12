import React, { useEffect, useState } from 'react';
import SectionABCComponent from './sections/section-a-b-c.component';
import SectionDComponent from './sections/section-d.component';

import styles from './moh-713.component.scss';
import { showReportError } from '../../common/report-error';
import { ReportFiltersComponent, type ReportPeriod } from '../../common/report-filters';
import dayjs from 'dayjs';
import { useSession } from '@openmrs/esm-framework';
import { hasReportData, ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { getMoh713 } from '../../resources/moh-713.resource';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';

const MOH713Component: React.FC = () => {
  const [moh713Data, setMoh713Data] = useState<any>(() => {
    const saved = sessionStorage.getItem('moh711Data');
    return saved ? JSON.parse(saved) : [];
  });

  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh711Location');
  const isReportGenerated = hasReportData(moh713Data) && isForCurrentLocation;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(() => {
    return sessionStorage.getItem('moh711StartDate') || '';
  });

  const [endDate, setEndDate] = useState<string>(() => {
    return sessionStorage.getItem('moh711EndDate') || '';
  });
  useEffect(() => {
    sessionStorage.setItem('moh711Data', JSON.stringify(moh713Data));
  }, [moh713Data]);

  useEffect(() => {
    sessionStorage.setItem('moh711StartDate', startDate);
  }, [startDate]);

  useEffect(() => {
    sessionStorage.setItem('moh711EndDate', endDate);
  }, [endDate]);

  const session = useSession();
  const locationUuid = session?.sessionLocation?.uuid;

  const facility = session?.sessionLocation?.display ?? moh713Data?.facility ?? '';
  const county = moh713Data?.county ?? '';
  const subCounty = moh713Data?.sub_county ?? '';
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
      const data = await getMoh713(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh713Data(flatData);
      markGenerated(params.locationUuids);
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
      {!isLoading && !isReportGenerated && (
        <ReportPlaceholder reportName="MOH-711" isLocationChanged={hasReportData(moh713Data) && hasLocationChanged} />
      )}
      {!isLoading && isReportGenerated && (
        <ReportPage>
          <div className={styles.headerContainer}>
            <div className={styles.mainTitleBox}>
              <h5>
                INTEGRATED MANAGEMENT OF ACUTE MALNUTRITION (IMAM) <br /> SUMMARY TOOL <br /> MOH 713
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
          <SectionABCComponent />
          <SectionDComponent />
        </ReportPage>
      )}
    </>
  );
};

export default MOH713Component;
