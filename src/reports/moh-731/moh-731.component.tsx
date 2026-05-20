import React, { useEffect, useState } from 'react';

import styles from './moh-731.scss';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';
import { type ReportFilters } from '../moh-705a/type';
import { useSession } from '@openmrs/esm-framework';
import { useNavigate } from 'react-router-dom';
import { getMoh731 } from '../../resources/moh-731.resource';
import HivTestingandPreExposusreProphylaxis from './sections/hiv-testing-and-pre-exposure.component';
import PmtctComponent from './sections/pmtct.component';
import HivAndTBTreatmentComponent from './sections/hiv-and-tb-treatment.component';
import classNames from 'classnames';
import { Loading } from '@carbon/react';

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
  const [errorMessage, setErrorMessage] = useState<any>();

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;
  const navigate = useNavigate();

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

  const fetchMoh731ReportData = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
    setIsLoading(true);

    const { startDate, endDate } = getReportParams(filters);

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
      setErrorMessage(error.message);
      setIsLoading(false);
      throw new Error(`Failed to fetch MOH-710 report data: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const navigateToRegister = (indicator: string) => {
    navigate(
      `/moh-405-register?startDate=${startDate}&endDate=${endDate}&locationUuids=${locationUuids}&indicator=${indicator}`,
    );
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-731 Report"
        mode="monthly"
        onGenerate={fetchMoh731ReportData}
        isLoding={isLoading}
      />
      <div
        className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.border}`, `${styles.border2}`)}
      >
        <table style={{ width: '100%' }}>
          <tr>
            <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
              National AIDS & STI Control Program- NASCOP <br />
              Comprehensive HIV/ AIDS reporting form
              <div style={{ textAlign: 'right', marginBottom: '1%' }}>
                <span style={{ textAlign: 'right', border: '2px dotted #000' }}>(MOH 731-Ver. July 2023)</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <table className={styles.locationContainer} style={{ marginTop: '0.5%' }}>
        <tr>
          <td style={{ paddingLeft: '5rem', paddingBottom: '1%' }}>
            County______________________SubCounty___________________Facility___________________MFL_______Month______year______
          </td>
        </tr>
      </table>
      <table className={styles.table} style={{ marginTop: '1%' }}>
        <thead>
          <tr>
            <th className={styles.border}>1. HIV Testing & Pre exposure Prophylaxis</th>
          </tr>
        </thead>
        <HivTestingandPreExposusreProphylaxis
          MOH731Data={moh731Data}
          startDate={startDate}
          endDate={endDate}
          locationUuids={locationUuids!}
        />
        <thead>
          <tr>
            <th className={styles.border2}>2. Elimination of Mother-to-Child Transmission(EMTCT)</th>
          </tr>
        </thead>
        <PmtctComponent
          MOH731Data={moh731Data}
          startDate={startDate}
          endDate={endDate}
          locationUuids={locationUuids!}
        />

        <HivAndTBTreatmentComponent
          MOH731Data={moh731Data}
          startDate={startDate}
          endDate={endDate}
          locationUuids={locationUuids!}
        />
        <thead>
          <div className={classNames(styles.reviewSection, styles.border3)}>
            <div>Reviewed by:</div>
            <div>Name</div>
            <div>Designation</div>
            <div>Signature</div>
            <div>Date</div>

            <div></div>
            <div>_______________________________________</div>
            <div>______________________</div>
            <div>_____________</div>
            <div>____________</div>
          </div>
        </thead>
      </table>
      {isLoading && <Loading />}
    </>
  );
};

export default Moh731Report;
