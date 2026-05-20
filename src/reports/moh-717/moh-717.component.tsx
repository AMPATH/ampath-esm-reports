import React, { useEffect, useState } from 'react';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';

import styles from './moh717.scss';
import classNames from 'classnames';
import { useSession } from '@openmrs/esm-framework';
import { getMoh717 } from '../../resources/moh-717.resource';
import { Loading } from '@carbon/react';
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
import { type ReportFilters } from '../moh-705a/type';

const Moh717Report: React.FC = () => {
  let errorMessage: string = '';
  const [moh717ReportData, setMoh717ReportData] = useState<any>(() => {
    const saved = sessionStorage.getItem('moh717ReportData');
    return saved ? JSON.parse(saved) : [];
  });
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

  const getReportParams = (filters: ReportFilters) => {
    let { startDate: sDate, endDate: eDate } = filters;

    if (filters.month) {
      const [year, monthIndex] = filters.month.split('-').map(Number);

      const start = new Date(year, monthIndex - 1, 1);
      const end = new Date(year, monthIndex, 0);

      const formatLocalDate = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      };

      sDate = formatLocalDate(start);
      eDate = formatLocalDate(end);
    }

    setStartDate(sDate || '');
    setEndDate(eDate || '');

    return { startDate: sDate, endDate: eDate };
  };

  const fetchMoh717ReportData = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
    setIsLoading(true);

    const { startDate, endDate } = getReportParams(filters);

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
      errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch MOH-717 report data: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-717 Report"
        mode="monthly"
        onGenerate={fetchMoh717ReportData}
        isLoding={isLoading}
      />
      {isLoading && <Loading description="Fetching data...." />}
      {!isLoading && errorMessage && (
        <div>
          <a href="#" className="close" data-dismiss="alert">
            &times;
          </a>
          <h4>
            <strong>
              <span className="glyphicon glyphicon-warning-sign"></span>{' '}
            </strong>{' '}
            An error occurred while trying to load the report. Please try again.
          </h4>
          <p>
            <small>{errorMessage}</small>
          </p>
        </div>
      )}
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
              Health Facility: <span className={styles.shortLine}></span>
            </span>
          </div>
          <div className={styles.locationContainer}>
            <span>
              Month: <span className={styles.shortLine}></span>
            </span>
            <span>
              Year: <span className={styles.shortLine}></span>
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
        <InpatientComponent moh717ReportData={moh717ReportData} />
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
            <OperationsComponent moh717ReportData={moh717ReportData} />
            <div className={styles.section}>
              <OrthopaedicTraumaComponent moh717ReportData={moh717ReportData} />
            </div>
          </div>
        </div>
        <SpecialServicesComponent moh717ReportData={moh717ReportData} />
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

        <FinanceComponent moh717ReportData={moh717ReportData} />
        <div className={styles.preparedByContainer}>
          <PreparedbyComponent />
        </div>
      </div>
    </>
  );
};

export default Moh717Report;
