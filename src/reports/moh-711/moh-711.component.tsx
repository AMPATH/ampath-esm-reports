import React, { useState } from 'react';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';

import styles from './moh711.scss';
import classNames from 'classnames';
import { useSession } from '@openmrs/esm-framework';
import { getMoh711 } from '../../resources/moh-711.resource';
import { Loading } from '@carbon/react';
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

const Moh711Report: React.FC = () => {
  let errorMessage: string = '';
  const [moh711Data, setMoh711Data] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();
  const locationUuid = session?.sessionLocation?.uuid;
  const fetchMoh711ReportData = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
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
      const data = await getMoh711(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh711Data(flatData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch MOH-711 report data: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-711 Report"
        mode="monthly"
        onGenerate={fetchMoh711ReportData}
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
      <h5>
        INTEGRATED PROGRAM SUMMARY REPORT FORM: REPRODUCTIVE AND CHILD HEALTH, MEDICAL AND REHABILITATION SERVICES
      </h5>
      <div className={styles.container}>
        <div className={styles.left}>
          <ANCComponent moh711Data={moh711Data} />
          <GBVComponent moh711Data={moh711Data} />
          <FamilyPlanningComponent moh711Data={moh711Data} />
          <CervicalCancerComponent moh711Data={moh711Data} />
          <PNCComponent moh711Data={moh711Data} />
          <RehabilitationComponent moh711Data={moh711Data} />
          <MedicalSocialWorkComponent moh711Data={moh711Data} />
          <ReportCompiledByComponent />
        </div>
        <div className={styles.right}>
          <MaternityComponent moh711Data={moh711Data} />
          <PostAbortion moh711Data={moh711Data} />
          <ChanisComponent moh711Data={moh711Data} />
          <PhysiotherapyComponent moh711Data={moh711Data} />
          <OtherComponent moh711Data={MaternityComponent} />
          <TBScreeningComponent moh711Data={moh711Data} />
        </div>
      </div>
    </>
  );
};

export default Moh711Report;
