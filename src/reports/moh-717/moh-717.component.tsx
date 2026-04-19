import React, { useState } from 'react';
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

const Moh717Report: React.FC = () => {
  let errorMessage: string = '';
  const [moh717ReportData, setMoh717ReportData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();
  const locationUuid = session?.sessionLocation?.uuid;
  const fetchMoh717ReportData = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
    setIsLoading(true);
    let startDate = filters.startDate;
    let endDate = filters.endDate;

    if (filters.month) {
      const [year, monthIndex] = filters.month.split('-').map(Number);

      const start = new Date(year, monthIndex - 1, 1);
      const end = new Date(year, monthIndex, 0);

      const formatLocalDate = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      startDate = formatLocalDate(start);
      endDate = formatLocalDate(end);
    }

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
      <h3>Monthly Service Workload Report for Health Facilities</h3>
      <div className={styles.location}>
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
      <div className={styles.location}>
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
      <div className={styles.container}>
        <div className={styles.section}>
          <OutpatientComponent moh717ReportData={moh717ReportData} />
        </div>
        <InpatientComponent moh717ReportData={moh717ReportData} />
        <div className={styles.sectionContainer}>
          <div className={styles.left}>
            <MaternityComponent moh717ReportData={moh717ReportData} />
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
