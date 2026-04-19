import React, { useState } from 'react';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';

import styles from './moh-745.scss';
import classNames from 'classnames';
import { useSession } from '@openmrs/esm-framework';
import { Loading } from '@carbon/react';
import { getMoh745 } from '../../resources/moh-745.resource';

const Moh745Component: React.FC = () => {
  let errorMessage: string = '';
  const [moh745Data, setMoh745Data] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;

  const fetchMoh745ReportData = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
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
      const data = await getMoh745(params);
      const flatData = Object.assign({}, ...data.result);
      // eslint-disable-next-line no-console
      console.log('MOH-745 Report Data:', flatData);
      setMoh745Data(flatData);
      setIsLoading(false);
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : String(error);
      setIsLoading(false);
      throw new Error(`Failed to fetch MOH-745 report data: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-745 Report"
        mode="monthly"
        onGenerate={fetchMoh745ReportData}
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
      <h3>CANCER SCREENING MONTHLY SUMMARY FORM</h3>
      <div className={styles.location}>
        <span>
          Facility Name: <span className={styles.line}></span>
        </span>
        <span>
          Facility Code: <span className={styles.line}></span>
        </span>
        <span>
          County: <span className={styles.shortLine}></span>
        </span>
        <span>
          Sub-County: <span className={styles.shortLine}></span>
        </span>
        <span>
          Month: <span className={styles.shortLine}></span>
        </span>
        <span>
          Year: <span className={styles.shortLine}></span>
        </span>
      </div>
      <div className={styles.tableContainer}>
        <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <thead>
            <tr>
              <th colSpan={14}>CERVICAL CANCER SCREENING SUMMARY</th>
            </tr>
            <tr>
              <th rowSpan={2}>
                INDICATORS
                <br />
                <span>
                  (Use the page Tally/Summary from the Cancer Screening Register
                  <br /> to complete the report)
                </span>
              </th>
              <th colSpan={4}>1) Initial Screening</th>
              <th colSpan={4}>2) Routine Screening</th>
              <th colSpan={4}>3) Post-treatment Screening</th>
              <th rowSpan={2} className={styles.rotateUp}>
                Total no. of Clients <br />
                <span>
                  (Initial + Routine <br />+<br /> Post Treatment)
                </span>
              </th>
            </tr>
            <tr>
              <td className={styles.rotateUp}>&lt;25 years</td>
              <td className={styles.rotateUp}>25 - 49 years</td>
              <td className={styles.rotateUp}>
                50 years and <br />
                above
              </td>
              <td className={styles.rotateUp}>
                Total (Initial <br /> screening)
              </td>
              <td className={styles.rotateUp}>&lt;25 years</td>
              <td className={styles.rotateUp}>25 - 49 years</td>
              <td className={styles.rotateUp}>
                50 years and <br />
                above
              </td>
              <td className={styles.rotateUp}>
                Total (Routine <br /> screening)
              </td>
              <td className={styles.rotateUp}>&lt;25 years</td>
              <td className={styles.rotateUp}>25 - 49 years</td>
              <td className={styles.rotateUp}>
                50 years and <br />
                above
              </td>
              <td className={styles.rotateUp}>
                Total (Post- <br />
                treatment <br /> screening)
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 a) Number of clients who received VIA or VIA/VILLI Screening</td>
              <td>{moh745Data.via_villi_less_25_initial_screening}</td>
              <td>{moh745Data.via_villi_25_49_initial_screening}</td>
              <td>{moh745Data.via_villi_50_above_initial_screening}</td>
              <td></td>
              <td>{moh745Data.via_villi_less_25_routine_screening}</td>
              <td>{moh745Data.via_villi_25_49_routine_screening}</td>
              <td>{moh745Data.via_villi_50_above_routine_screening}</td>
              <td></td>
              <td>{moh745Data.via_villi_less_25_post_treatment_screening}</td>
              <td>{moh745Data.via_villi_25_49_post_treatment_screening}</td>
              <td>{moh745Data.via_villi_50_above_post_treatment_screening}</td>
              <td></td>
              <td>{moh745Data.via_villi_total}</td>
            </tr>
            <tr>
              <td> b) Number of clients who received Pap smear</td>
              <td>{moh745Data.pap_smear_less_25_initial_screening}</td>
              <td>{moh745Data.pap_smear_25_49_initial_screening}</td>
              <td>{moh745Data.pap_smear_50_above_initial_screening}</td>
              <td></td>
              <td>{moh745Data.pap_smear_less_25_routine_screening}</td>
              <td>{moh745Data.pap_smear_25_49_routine_screening}</td>
              <td>{moh745Data.pap_smear_50_above_routine_screening}</td>
              <td></td>
              <td>{moh745Data.pap_smear_less_25_post_treatment_screening}</td>
              <td>{moh745Data.pap_smear_25_49_post_treatment_screening}</td>
              <td>{moh745Data.pap_smear_50_above_post_treatment_screening}</td>
              <td></td>
              <td>{moh745Data.pap_smear_total}</td>
            </tr>
            <tr>
              <td> c) Number of clients who received HPV Test</td>
              <td>{moh745Data.hpv_test_less_25_initial_screening}</td>
              <td>{moh745Data.hpv_test_25_49_initial_screening}</td>
              <td>{moh745Data.hpv_test_50_above_initial_screening}</td>
              <td></td>
              <td>{moh745Data.hpv_test_less_25_routine_screening}</td>
              <td>{moh745Data.hpv_test_25_49_routine_screening}</td>
              <td>{moh745Data.hpv_test_50_above_routine_screening}</td>
              <td></td>
              <td>{moh745Data.hpv_test_less_25_post_treatment_screening}</td>
              <td>{moh745Data.hpv_test_25_49_post_treatment_screening}</td>
              <td>{moh745Data.hpv_test_50_above_post_treatment_screening}</td>
              <td></td>
              <td>{moh745Data.hpv_test_total}</td>
            </tr>
            <tr>
              <td>Total Clients Screened (1 a, b &c Above)</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>2 a) Number of clients with Positive VIA or VIA/VILLI result</td>
              <td>{moh745Data.positive_via_villi_less_25_initial_screening}</td>
              <td>{moh745Data.positive_via_villi_25_49_initial_screening}</td>
              <td>{moh745Data.positive_via_villi_50_above_initial_screening}</td>
              <td></td>
              <td>{moh745Data.positive_via_villi_less_25_routine_screening}</td>
              <td>{moh745Data.positive_via_villi_25_49_routine_screening}</td>
              <td>{moh745Data.positive_via_villi_50_above_routine_screening}</td>
              <td></td>
              <td>{moh745Data.positive_via_villi_less_25_post_treatment_screening}</td>
              <td>{moh745Data.positive_via_villi_25_49_post_treatment_screening}</td>
              <td>{moh745Data.positive_via_villi_50_above_post_treatment_screening}</td>
              <td></td>
              <td>{moh745Data.positive_via_villi_total}</td>
            </tr>
            <tr>
              <td> b) Number of clients with Positive Cytology result</td>
              <td>{moh745Data.positive_cytology_less_25_initial_screening}</td>
              <td>{moh745Data.positive_cytology_25_49_initial_screening}</td>
              <td>{moh745Data.positive_cytology_50_above_initial_screening}</td>
              <td></td>
              <td>{moh745Data.positive_cytology_less_25_routine_screening}</td>
              <td>{moh745Data.positive_cytology_25_49_routine_screening}</td>
              <td>{moh745Data.positive_cytology_50_above_routine_screening}</td>
              <td></td>
              <td>{moh745Data.positive_cytology_less_25_post_treatment_screening}</td>
              <td>{moh745Data.positive_cytology_25_49_post_treatment_screening}</td>
              <td>{moh745Data.positive_cytology_50_above_post_treatment_screening}</td>
              <td></td>
              <td>{moh745Data.positive_cytology_total}</td>
            </tr>
            <tr>
              <td> c) Number of clients with Positive HPV result</td>
              <td>{moh745Data.positive_hpv_less_25_initial_screening}</td>
              <td>{moh745Data.positive_hpv_25_49_initial_screening}</td>
              <td>{moh745Data.positive_hpv_50_above_initial_screening}</td>
              <td></td>
              <td>{moh745Data.positive_hpv_less_25_routine_screening}</td>
              <td>{moh745Data.positive_hpv_25_49_routine_screening}</td>
              <td>{moh745Data.positive_hpv_50_above_routine_screening}</td>
              <td></td>
              <td>{moh745Data.positive_hpv_less_25_post_treatment_screening}</td>
              <td>{moh745Data.positive_hpv_25_49_post_treatment_screening}</td>
              <td>{moh745Data.positive_hpv_50_above_post_treatment_screening}</td>
              <td></td>
              <td>{moh745Data.positive_hpv_total}</td>
            </tr>
            <tr>
              <td>Total Clients Screened positive (2 a, b &c Above)</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>3) Number of clients with suspicios cancer lessions </td>
              <td>{moh745Data.suspicious_cancer_lessions_less_25_initial_screening}</td>
              <td>{moh745Data.suspicious_cancer_lessions_25_49_initial_screening}</td>
              <td>{moh745Data.suspicious_cancer_lessions_50_above_initial_screening}</td>
              <td>{}</td>
              <td>{moh745Data.suspicious_cancer_lessions_less_25_routine_screening}</td>
              <td>{moh745Data.suspicious_cancer_lessions_25_49_routine_screening}</td>
              <td>{moh745Data.suspicious_cancer_lessions_50_above_routine_screening}</td>
              <td>{}</td>
              <td>{moh745Data.suspicious_cancer_lessions_less_25_post_treatment_screening}</td>
              <td>{moh745Data.suspicious_cancer_lessions_25_49_post_treatment_screening}</td>
              <td>{moh745Data.suspicious_cancer_lessions_50_above_post_treatment_screening}</td>
              <td>{}</td>
              <td>{moh745Data.suspicious_cancer_lessions_total}</td>
            </tr>
            <tr>
              <td>4) Number of clients treated using Cryotherapy</td>
              <td>{moh745Data.cryotherapy_treatment_less_25_initial_screening}</td>
              <td>{moh745Data.cryotherapy_treatment_25_49_initial_screening}</td>
              <td>{moh745Data.cryotherapy_treatment_50_above_initial_screening}</td>
              <td>{}</td>
              <td>{moh745Data.cryotherapy_treatment_less_25_routine_screening}</td>
              <td>{moh745Data.cryotherapy_treatment_25_49_routine_screening}</td>
              <td>{moh745Data.cryotherapy_treatment_50_above_routine_screening}</td>
              <td>{}</td>
              <td>{moh745Data.cryotherapy_treatment_less_25_post_treatment_screening}</td>
              <td>{moh745Data.cryotherapy_treatment_25_49_post_treatment_screening}</td>
              <td>{moh745Data.cryotherapy_treatment_50_above_post_treatment_screening}</td>
              <td>{}</td>
              <td>{moh745Data.cryotherapy_treatment_total}</td>
            </tr>
            <tr>
              <td>5) Number of clients treated using Thermocoagulation</td>
              <td>{moh745Data.thermocoagulation_treatment_less_25_initial_screening}</td>
              <td>{moh745Data.thermocoagulation_treatment_25_49_initial_screening}</td>
              <td>{moh745Data.thermocoagulation_treatment_50_above_initial_screening}</td>
              <td>{}</td>
              <td>{moh745Data.thermocoagulation_treatment_less_25_routine_screening}</td>
              <td>{moh745Data.thermocoagulation_treatment_25_49_routine_screening}</td>
              <td>{moh745Data.thermocoagulation_treatment_50_above_routine_screening}</td>
              <td>{}</td>
              <td>{moh745Data.thermocoagulation_treatment_less_25_post_treatment_screening}</td>
              <td>{moh745Data.thermocoagulation_treatment_25_49_post_treatment_screening}</td>
              <td>{moh745Data.thermocoagulation_treatment_50_above_post_treatment_screening}</td>
              <td>{}</td>
              <td>{moh745Data.thermocoagulation_treatment_total}</td>
            </tr>
            <tr>
              <td>6) Number of clients treated using LEEP</td>
              <td>{moh745Data.leep_treatment_less_25_initial_screening}</td>
              <td>{moh745Data.leep_treatment_25_49_initial_screening}</td>
              <td>{moh745Data.leep_treatment_50_above_initial_screening}</td>
              <td>{}</td>
              <td>{moh745Data.leep_treatment_less_25_routine_screening}</td>
              <td>{moh745Data.leep_treatment_25_49_routine_screening}</td>
              <td>{moh745Data.leep_treatment_50_above_routine_screening}</td>
              <td>{}</td>
              <td>{moh745Data.leep_treatment_less_25_post_treatment_screening}</td>
              <td>{moh745Data.leep_treatment_25_49_post_treatment_screening}</td>
              <td>{moh745Data.leep_treatment_50_above_post_treatment_screening}</td>
              <td>{}</td>
              <td>{moh745Data.leep_treatment_total}</td>
            </tr>
            <tr>
              <td>7) Numeber of other treatment given (e.g Hysterectomy, cone)</td>
              <td>{moh745Data.other_treatment_less_25_initial_screening}</td>
              <td>{moh745Data.other_treatment_25_49_initial_screening}</td>
              <td>{moh745Data.other_treatment_50_above_initial_screening}</td>
              <td>{}</td>
              <td>{moh745Data.other_treatment_less_25_routine_screening}</td>
              <td>{moh745Data.other_treatment_25_49_routine_screening}</td>
              <td>{moh745Data.other_treatment_50_above_routine_screening}</td>
              <td>{}</td>
              <td>{moh745Data.other_treatment_less_25_post_treatment_screening}</td>
              <td>{moh745Data.other_treatment_25_49_post_treatment_screening}</td>
              <td>{moh745Data.other_treatment_50_above_post_treatment_screening}</td>
              <td>{}</td>
              <td>{moh745Data.other_treatment_total}</td>
            </tr>
            <tr>
              <td>8) Number of HIV positive clients screened</td>
              <td>{moh745Data.hiv_positive_screened_cervical_cancer_less_25_initial_screening}</td>
              <td>{moh745Data.hiv_positive_screened_cervical_cancer_25_49_initial_screening}</td>
              <td>{moh745Data.hiv_positive_screened_cervical_cancer_50_above_initial_screening}</td>
              <td>{}</td>
              <td>{moh745Data.hiv_positive_screened_cervical_cancer_less_25_routine_screening}</td>
              <td>{moh745Data.hiv_positive_screened_cervical_cancer_25_49_routine_screening}</td>
              <td>{moh745Data.hiv_positive_screened_cervical_cancer_50_above_routine_screening}</td>
              <td>{}</td>
              <td>{moh745Data.hiv_positive_screened_cervical_cancer_less_25_post_treatment_screening}</td>
              <td>{moh745Data.hiv_positive_screened_cervical_cancer_25_49_post_treatment_screening}</td>
              <td>{moh745Data.hiv_positive_screened_cervical_cancer_50_above_post_treatment_screening}</td>
              <td>{}</td>
              <td>{moh745Data.hiv_positive_screened_cervical_cancer_total}</td>
            </tr>
            <tr>
              <td>9) Number of HIV positive with positive screening</td>
              <td>{moh745Data.hiv_positive_cervical_cancer_positive_less_25_initial_screening}</td>
              <td>{moh745Data.hiv_positive_cervical_cancer_positive_25_49_initial_screening}</td>
              <td>{moh745Data.hiv_positive_cervical_cancer_positive_50_above_initial_screening}</td>
              <td>{}</td>
              <td>{moh745Data.hiv_positive_cervical_cancer_positive_less_25_routine_screening}</td>
              <td>{moh745Data.hiv_positive_cervical_cancer_positive_25_49_routine_screening}</td>
              <td>{moh745Data.hiv_positive_cervical_cancer_positive_50_above_routine_screening}</td>
              <td>{}</td>
              <td>{moh745Data.hiv_positive_cervical_cancer_positive_less_25_post_treatment_screening}</td>
              <td>{moh745Data.hiv_positive_cervical_cancer_positive_25_49_post_treatment_screening}</td>
              <td>{moh745Data.hiv_positive_cervical_cancer_positive_50_above_post_treatment_screening}</td>
              <td>{}</td>
              <td>{moh745Data.hiv_positive_cervical_cancer_positive_total}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.tableContainer}>
        <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <thead>
            <tr>
              <th rowSpan={2}>BREAST CANCER SCREENING SUMMARY</th>
              <th colSpan={13}>Screening Type and Results</th>
              <th rowSpan={2} colSpan={2}>
                FOLLOW UP AND REFERRAL
              </th>
            </tr>
            <tr>
              <th colSpan={3}>CBE</th>
              <th colSpan={5}>Ultrasound - BIRADS</th>
              <th colSpan={5}>Mammogram - BIRADS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Client Age</td>
              <td>Normal</td>
              <td>Abnormal</td>
              <td>Total CBEs</td>
              <td>0 to 3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>Total Ultrasounds Done</td>
              <td>0 to 3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>Total Mammograms Done</td>
              <td>No. Followed up</td>
              <td>No. referred out</td>
            </tr>
            <tr>
              <td>25-34 yrs</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>35-39 yrs</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>40-55 yrs</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>56-74 yrs</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>&gt; 75 yrs</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.tableContainer}>
        <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <thead>
            <tr>
              <th rowSpan={2}>COLORECTAL CANCER SCREENING SUMMARY</th>
              <th colSpan={8}>Screening Type and Results</th>
            </tr>
            <tr>
              <th colSpan={3}>FORBT</th>
              <th colSpan={5}>Colonoscopy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Client Age</td>
              <td>Positive</td>
              <td>Negative</td>
              <td>Total FORBT Done</td>
              <td>Total No abnormality</td>
              <td>No. With Polyps</td>
              <td>No. With Cancer</td>
              <td>Total No. with other abnormalities</td>
              <td>Total Colonoscopies Done</td>
            </tr>
            <tr>
              <td>45-54 yrs</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>55-64 yrs</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
            <tr>
              <td>65-75 yrs</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
              <td>{}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.location}>
        <span>
          Compiled by: Name <span className={styles.line}></span>
        </span>
        <span>
          Signature <span className={styles.line}></span>
        </span>
        <span>
          Phone no <span className={styles.shortLine}></span>
        </span>
        <span>
          Date <span className={styles.shortLine}></span>
        </span>
      </div>
    </>
  );
};

export default Moh745Component;
