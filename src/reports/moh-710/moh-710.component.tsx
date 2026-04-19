import React, { useState } from 'react';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';

import styles from './moh-710.scss';
import classNames from 'classnames';
import { useSession } from '@openmrs/esm-framework';
import { getMoh710 } from '../../resources/moh-710.resource';
import { Loading } from '@carbon/react';

const Moh710Report: React.FC = () => {
  let errorMessage: string = '';
  const [moh710Data, setMoh710Data] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;

  const fetchMoh710ReportData = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
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
      locationUuids: locationUuids || '',
      startDate,
      endDate,
    };
    try {
      const data = await getMoh710(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh710Data(flatData);
      setIsLoading(false);
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : String(error);
      setIsLoading(false);
      throw new Error(`Failed to fetch MOH-710 report data: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-710 Report"
        mode="monthly"
        onGenerate={fetchMoh710ReportData}
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
      <h3>KHIS Aggregate</h3>
      <div className={styles.container}>
        <p className={styles.title}>A. Child Immunization</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>&lt;1 Years</th>
                <th>&gt;1 Years</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BCG doses Administered</td>
                <td>{moh710Data.bcg_vaccine_age_less_than_1yr}</td>
                <td>{moh710Data.bcg_vaccine_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>OPV Birth doses Administered</td>
                <td>{moh710Data.opv_vaccine_age_less_than_1yr}</td>
                <td>{moh710Data.opv_vaccine_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>OPV1 doses Administered</td>
                <td>{moh710Data.opv1_vaccine_age_less_than_1yr}</td>
                <td>{moh710Data.opv1_vaccine_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>OPV2 doses Administered</td>
                <td>{moh710Data.opv2_vaccine_age_less_than_1yr}</td>
                <td>{moh710Data.opv2_vaccine_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>OPV3 doses Administered</td>
                <td>{moh710Data.opv3_vaccine_age_less_than_1yr}</td>
                <td>{moh710Data.opv3_vaccine_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>IPV 1 doses Administered</td>
                <td>{moh710Data.ipv1_vaccine_age_less_than_1yr}</td>
                <td>{moh710Data.ipv1_vaccine_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>IPV 2 doses Administered</td>
                <td>{moh710Data.ipv2_vaccine_age_less_than_1yr}</td>
                <td>{moh710Data.ipv2_vaccine_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>DPT/Hep+HiB 1 doses Administered</td>
                <td>{moh710Data.dpt_hep_vaccine1_age_less_than_1yr}</td>
                <td>{moh710Data.dpt_hep_vaccine1_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>DPT/Hep+HiB2 doses Administered</td>
                <td>{moh710Data.dpt_hep_vaccine2_age_less_than_1yr}</td>
                <td>{moh710Data.dpt_hep_vaccine2_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>DPT/Hep+HiB3 doses Administered</td>
                <td>{moh710Data.dpt_hep_vaccine3_age_less_than_1yr}</td>
                <td>{moh710Data.dpt_hep_vaccine3_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>Pneumococal 1 doses Administered</td>
                <td>{moh710Data.pneumococal_vaccine1_age_less_than_1yr}</td>
                <td>{moh710Data.pneumococal_vaccine1_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>Pneumococal 2 doses Administered</td>
                <td>{moh710Data.pneumococal_vaccine2_age_less_than_1yr}</td>
                <td>{moh710Data.pneumococal_vaccine2_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>Pneumococal 3 doses Administered</td>
                <td>{moh710Data.pneumococal_vaccine3_age_less_than_1yr}</td>
                <td>{moh710Data.pneumococal_vaccine3_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>Rotavirus 1 doses Administered</td>
                <td>{moh710Data.rotavirus_vaccine1_age_less_than_1yr}</td>
                <td>{moh710Data.rotavirus_vaccine1_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>Rotavirus 2 doses Administered</td>
                <td>{moh710Data.rotavirus_vaccine2_age_less_than_1yr}</td>
                <td>{moh710Data.rotavirus_vaccine2_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>Rotavirus 3 doses Administered</td>
                <td>{moh710Data.rotavirus_vaccine3_age_less_than_1yr}</td>
                <td>{moh710Data.rotavirus_vaccine3_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>Vitamin A at 6 - 11 months(100, 000 IU)</td>
                <td>{moh710Data.vitaminA_vaccine_age_less_than_1yr}</td>
                <td>{moh710Data.vitaminA_vaccine_age_greater_than_1yr}</td>
              </tr>
              <tr>
                <td>Yellow fever doses Administered</td>
                <td>{moh710Data.yellow_fever_vaccine_age_greater_than_1yr}</td>
                <td>{moh710Data.yellow_fever_vaccine_age_less_than_1yr}</td>
              </tr>
              <tr>
                <td>Measles-Rubella 1 doses Administered</td>
                <td>{moh710Data.measles_vaccine_age_greater_than_1yr}</td>
                <td>{moh710Data.measles_vaccine_age_less_than_1yr}</td>
              </tr>
              <tr>
                <td>Typhoid Conjugate Vaccine (TCV) doses Administered</td>
                <td>{moh710Data.typhoid_conjugate_vaccine_age_greater_than_1yr}</td>
                <td>{moh710Data.typhoid_conjugate_vaccine_age_less_than_1yr}</td>
              </tr>
              <tr>
                <td>Fully Immunized Children(FIC) under 1 year</td>
                <td>{moh710Data.fully_immunized_children}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>B. Vitamin A and Measles Rubella</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vitamin A at 12 to 59 months (200, 000 IU)</td>
                <td>{moh710Data.vitaminA_12_59_months}</td>
              </tr>
              <tr>
                <td>Measles-Rubella 2 DoseAdm (at 1 1/2-2years)</td>
                <td>{moh710Data.measles_rubella_1_2_years}</td>
              </tr>
              <tr>
                <td>Measles-Rubella 2 Dose Administered &gt;2 yrs</td>
                <td>{moh710Data.measles_rubella_greater_2_years}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>C. Tetanus Toxoid</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tetanus Toxoid Containing Vaccine for Trauma</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>1st Dose</th>
                <th>2nd Dose</th>
                <th>3rd Dose</th>
                <th>4th Dose</th>
                <th>5th Dose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tetanus Toxoid for Pregnant women</td>
                <td>{moh710Data.tetanus_toxoid1}</td>
                <td>{moh710Data.tetanus_toxoid2}</td>
                <td>{moh710Data.tetanus_toxoid3}</td>
                <td>{moh710Data.tetanus_toxoid4}</td>
                <td>{moh710Data.tetanus_toxoid5}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>D. HPV</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HPV Vaccine Dose1(10-14years)</td>
                <td>{moh710Data.hpv_vaccine1_10_14_years}</td>
              </tr>
              <tr>
                <td>HPV Vaccine Dose 2</td>
                <td>{moh710Data.hpv_vaccine2}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>At 10 years</th>
                <th>Above 10 years</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>HPV Vaccine 1</td>
                <td>{moh710Data.hpv_vaccine1_10_years}</td>
                <td>{moh710Data.hpv_vaccine1_greater_10_years}</td>
              </tr>
              <tr>
                <td>HPV Vaccine 2</td>
                <td>{moh710Data.hpv_vaccine2_10_years}</td>
                <td>{moh710Data.hpv_vaccine2_greater_10_years}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>E. Adverse Events</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Squint/White Eye reflection Under 1 year</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>&lt;1 Years</th>
                <th>&gt;1 Years</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adverse Events Following Immunization(AEFI)</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>F. Special Clinics COVID 19</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>12 -17 Yrs</th>
                <th>18 - 59 Yrs</th>
                <th>60+ Yrs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>COVID 19 Reporting</td>
                <td>{moh710Data.covid_19_vaccine_12_17}</td>
                <td>{moh710Data.covid_19_vaccine_18_59}</td>
                <td>{moh710Data.covid_19_vaccine_60_above}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Section B Logistics Dose Balance</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BCG doses in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>BCG doses received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>BCG doses remaining at the end Month</td>
                <td></td>
              </tr>

              <tr>
                <td>OPV doses in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>OPV doses received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>OPV doses remaining at the end Month</td>
                <td></td>
              </tr>
              <tr>
                <td>IPV doses in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>IPV doses received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>IPV doses remaining at the end Month</td>
                <td></td>
              </tr>

              <tr>
                <td>DPT+HIB+HEP B doses in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>DPT+HIB+HEP B doses received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>DPT+HIB+HEP B doses remaining at the end Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Pneumococal doses in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Pneumococal doses received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Pneumococal doses remaining at the end Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Rotavirus doses in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Rotavirus doses received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Rotavirus doses remaining at the end Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Measles doses in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Measles doses received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Measles doses remaining at the end Month</td>
                <td></td>
              </tr>
              <tr>
                <td>TCV doses in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>TCV doses received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>TCV doses remaining at the end Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Yellow Fever doses in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Yellow Fever doses received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Yellow Fever doses remaining at the end Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Tetanus Toxoid doses in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Tetanus Toxoid doses received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Tetanus Toxoid doses remaining at the end Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Vitamin A 100,000 IU caps in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Vitamin A 100,000 IU caps received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Vitamin A 100,000 IU caps remaining at the end Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Vitamin A 200,000 IU caps in stock at the beginning of the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Vitamin A 200,000 IU caps received within the Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Vitamin A 200,000 IU caps remaining at the end Month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total BCG doses stocked in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total Tetanus Toxoid doses used in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total BCG doses wasted in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>BCG Wastage Rate (WR)</td>
                <td></td>
              </tr>
              <tr>
                <td>Total OPV doses stocked in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total OPV Toxoid doses used in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total OPV doses wasted in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>OPV Wastage Rate (WR)</td>
                <td></td>
              </tr>
              <tr>
                <td>Total IPV doses stocked in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total IPV Toxoid doses used in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total IPV doses wasted in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>IPV Wastage Rate (WR)</td>
                <td></td>
              </tr>
              <tr>
                <td>Total DPT+HiB+HEP B doses stocked in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total DPT+HiB+HEP B Toxoid doses used in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total DPT+HiB+HEP B doses wasted in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>DPT+HiB+HEP B Wastage Rate (WR)</td>
                <td></td>
              </tr>
              <tr>
                <td>Total Pneumococal doses stocked in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total Pneumococal Toxoid doses used in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total Pneumococal doses wasted in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Pneumococal Wastage Rate (WR)</td>
                <td></td>
              </tr>
              <tr>
                <td>Total TCV doses stocked in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total TCV Toxoid doses used in the month</td>
                <td></td>
              </tr>
              <tr>
                <td>Total TCV doses wasted in the month</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Section B: HPV Logistics Dose Balance</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>[A]Doses in stock at the beginning of the month</td>
                <td></td>
              </tr>
              <tr>
                <td>[E]Doses used in the month[C-D]</td>
                <td></td>
              </tr>
              <tr>
                <td>[D]Doses remaining at the end of the month</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Moh710Report;
