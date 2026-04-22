import React, { useState } from 'react';
import { InlineLoading } from '@carbon/react';
import styles from './moh-740.component.scss';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';
import { type Moh740Data, type Moh740Dto, type ReportFilters } from './types';
import { showSnackbar, useSession } from '@openmrs/esm-framework';
import { fetchMoh740Report } from './moh-740.resource';
import dayjs from 'dayjs';
interface Moh740ReportProps {}
const Moh740Report: React.FC<Moh740ReportProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [moh740Data, setMoh740Data] = useState<Moh740Data>();
  const session = useSession();
  const locationUuid = session.sessionLocation.uuid;
  const getMoh740ReportData = async (filters: ReportFilters) => {
    setIsLoading(true);
    try {
      const reportFilters = generateFilterPayload(filters);
      const resp = await fetchMoh740Report(reportFilters);
      if (resp) {
        setMoh740Data(resp);
      } else {
        setMoh740Data(null);
      }
    } catch (error) {
      showSnackbar({
        kind: 'error',
        title: 'Error Fetching MOH-740 Report',
        subtitle: error.message ?? 'An error occurred while fetching the MOH-740 Report. Try again or contact support',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const generateFilterPayload = (filters: ReportFilters): Moh740Dto => {
    const lastDay = dayjs(`${filters.month}-01`).endOf('month').format('YYYY-MM-DD');
    return {
      endDate: lastDay,
      locationUuid: locationUuid,
    };
  };
  return (
    <>
      <div className={styles.reportLayout}>
        <div className={styles.reportHeader}>
          <div className={styles.reportFilters}>
            <ReportFiltersComponent
              reportName="MOH-740 Report"
              mode="monthly"
              onGenerate={getMoh740ReportData}
              isLoding={isLoading}
            />
          </div>
        </div>
        <div className={styles.reportContent}>
          {isLoading ? (
            <InlineLoading description="Fetching report..please wait" />
          ) : (
            <>
              {moh740Data ? (
                <>
                  <div className={styles.headerContainer}>
                    <div className={styles.mainTitleBox}>
                      <h2 className={styles.mainTitle}>Ministry of Health</h2>
                      <h3 className={styles.subTitle}>
                        Diabetes and Hypertension Comprehensive Care: Monthly Summary Form
                      </h3>
                    </div>
                  </div>

                  <table className={styles.topMeta}>
                    <tr>
                      <td>Name of the facility: _________________________</td>
                      <td>MFL code: __________</td>
                      <td>County: ______________</td>
                      <td>Sub County: ____________</td>
                      <td>Month/Year: _________</td>
                    </tr>
                  </table>

                  <table>
                    <thead>
                      <tr className={styles.sectionHeader}>
                        <th className={styles.dataElement}>Data Element</th>
                        <th className={styles.otherElement}>Male</th>
                        <th className={styles.otherElement}>Female</th>
                        <th className={styles.otherElement}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={styles.sectionHeader}>
                        <td colSpan={4}>DIABETES</td>
                      </tr>
                      <tr>
                        <td>Cumulative no. of diabetes patients in care</td>
                        <td>{moh740Data.dc__gender__M__cumulative_diabetes_patients_in_care ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__cumulative_diabetes_patients_in_care ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. of newly diagnosed diabetes cases</td>
                        <td>{moh740Data.dc__gender__M__newly_diagnosed_diabetes ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__newly_diagnosed_diabetes ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Revisit to clinic/Known DM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr className={styles.subHeader}>
                        <td colSpan={4}>Total No. with Type 1</td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>0-5 years</td>
                        <td>{moh740Data.dc__gender__M__age_range__0_to_5__type_1_diabetes_mellitus ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__age_range__0_to_5__type_1_diabetes_mellitus ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>6-9 years</td>
                        <td>{moh740Data.dc__gender__M__age_range__6_to_9__type_1_diabetes_mellitus ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__age_range__6_to_9__type_1_diabetes_mellitus ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>10-19 years</td>
                        <td>{moh740Data.dc__gender__M__age_range__10_to_19__type_1_diabetes_mellitus ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__age_range__10_to_19__type_1_diabetes_mellitus ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>20-35 years</td>
                        <td>{moh740Data.dc__gender__M__age_range__20_to_35__type_1_diabetes_mellitus ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__age_range__20_to_35__type_1_diabetes_mellitus ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>{'>'} 35 years</td>
                        <td>{moh740Data.dc__gender__M__age_range__35_and_above__type_1_diabetes_mellitus ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__age_range__35_and_above__type_1_diabetes_mellitus ?? 0}</td>
                        <td></td>
                      </tr>

                      <tr className={styles.subHeader}>
                        <td colSpan={4}>Total No. with Type 2</td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>0-18 years</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>19-35 years</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>36-60 years</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>{'>'} 60 years</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td>No. diagnosed for Gestational Diabetes Mellitus</td>
                        <td className={styles.bgGrey}>N/A</td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. of Diabetes secondary to other causes</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr className={styles.sectionHeader}>
                        <td colSpan={4}>HYPERTENSION</td>
                      </tr>
                      <tr>
                        <td>Cumulative no. of hypertension patients in care</td>
                        <td>{moh740Data.dc__gender__M__cumulative_htn_patient ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__cumulative_htn_patient ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. of newly diagnosed hypertension cases</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Revisit to clinic/Known HTN</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr className={styles.subHeader}>
                        <td colSpan={4}>No. with hypertension</td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>0-18 years</td>
                        <td>{moh740Data.dc__gender__M__age_range__10_to_19__has_htn ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__age_range__10_to_19__has_htn ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>19-35 years</td>
                        <td>{moh740Data.dc__gender__M__age_range__19_to_35__has_htn ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__age_range__19_to_35__has_htn ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>36-60 years</td>
                        <td>{moh740Data.dc__gender__M__age_range__36_to_60__has_htn ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__age_range__36_to_60__has_htn ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>{'>'} 60 years</td>
                        <td>{moh740Data.dc__gender__M__age_range__60_and_above__has_htn ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__age_range__60_and_above__has_htn ?? 0}</td>
                        <td></td>
                      </tr>

                      <tr className={styles.sectionHeader}>
                        <td colSpan={4}>CO-MORBID WITH BOTH DIABETES AND HTN PATIENTS</td>
                      </tr>
                      <tr>
                        <td>Cumulative no. of co-morbid both DM+HTN patients in care</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Newly diagnosed co-morbid with both DM and HTN cases</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Revisit to clinic/Known co-morbid DM and HTN</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr className={styles.sectionHeader}>
                        <td colSpan={4}>DIABETES TREATMENT AND FOLLOW UP</td>
                      </tr>
                      <tr>
                        <td>No. of patients on insulin</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. of patients on OGLAs</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. of patients on both (Insulin and OGLAs)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. of patients on diet and exercise only (DM and HTN)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. of patients done HbA1c</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. that met HbA1c target ({'<'} 7%)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr className={styles.sectionHeader}>
                        <td colSpan={4}>HYPERTENSION TREATMENT</td>
                      </tr>
                      <tr>
                        <td>No. of patients on antihypertensives</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. with high BP ({'>='} 140/90) at clinic visit</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr className={styles.sectionHeader}>
                        <td colSpan={4}>New Diagnosis of Complications/Comorbidities</td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>Stroke</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>Ischemic heart disease</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>Heart failure</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. of Patients with neuropathies (new diagnosis)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr className={styles.sectionHeader}>
                        <td colSpan={4}>DIABETIC FOOT</td>
                      </tr>
                      <tr>
                        <td>No. of patients screened for diabetic foot</td>
                        <td>{moh740Data.dc__gender__M__screened_for_diabetic_foot_this_month ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__screened_for_diabetic_foot_this_month ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. of patients with diabetic foot (new diagnosis)</td>
                        <td>{moh740Data.dc__gender__M__has_diabetic_foot ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__has_diabetic_foot ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. of Amputation due to diabetic foot</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr className={styles.sectionHeader}>
                        <td colSpan={4}>OTHER INDICATORS</td>
                      </tr>
                      <tr>
                        <td>No. with kidney complications (new diagnosis)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. with diabetic retinopathy (new diagnosis)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. Screened for Tuberculosis</td>
                        <td>{moh740Data.dc__gender__M__screened_for_tb_this_month ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__screened_for_tb_this_month ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. Screened Positive for Tuberculosis</td>
                        <td>{moh740Data.dc__gender__M__screened_postive_for_tb_this_month ?? 0}</td>
                        <td>{moh740Data.dc__gender__M__screened_postive_for_tb_this_month ?? 0}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>No. enrolled with NHIF</td>
                        <td>{moh740Data.dc__gender__M__covered_by_shif ?? 0}</td>
                        <td>{moh740Data.dc__gender__F__covered_by_shif ?? 0}</td>
                        <td></td>
                      </tr>

                      <tr className={styles.subHeader}>
                        <td>Total No. admitted (for only inpatients)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>No. admitted with DKA</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>No. admitted with Hypoglycemia</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>No. admitted with Stroke</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td className={styles.indent}>No. admitted with hypertension urgency/emergency</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td>Total deaths due to diabetes complications</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>Total deaths due to hypertension complications</td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>

                  <div className={styles.signOff}>
                    <p>
                      Compiled by: Name: ___________________________________ Designation:
                      ___________________________________
                    </p>
                    <p>Signature: ___________________________________ Date: ___________________________________</p>
                  </div>
                </>
              ) : (
                <>No Data to display</>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Moh740Report;
