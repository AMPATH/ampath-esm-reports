import React, { useState } from 'react';
import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, InlineLoading } from '@carbon/react';
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
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeader>Data Element</TableHeader>
                        <TableHeader>Male</TableHeader>
                        <TableHeader>Female</TableHeader>
                        <TableHeader>Total</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Cumulative no. of diabetes patients in care</TableCell>
                        <TableCell>{moh740Data.dc__gender__M__cumulative_diabetes_patients_in_care ?? 0}</TableCell>
                        <TableCell>{moh740Data.dc__gender__F__cumulative_diabetes_patients_in_care ?? 0}</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of newly diagnosed diabetes cases </TableCell>
                        <TableCell>{moh740Data.dc__gender__M__newly_diagnosed_diabetes ?? 0}</TableCell>
                        <TableCell>{moh740Data.dc__gender__F__newly_diagnosed_diabetes ?? 0}</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Re-visit to clinic Known DM</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total no. with Type 1 Diabetes</TableCell>
                        <TableCell>{moh740Data.dc__gender__M__total_type_1_diabetes ?? 0}</TableCell>
                        <TableCell>{moh740Data.dc__gender__F__total_type_1_diabetes ?? 0}</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>0-5 years</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total no. with Type 2 Diabetes</TableCell>
                        <TableCell>{moh740Data.dc__gender__M__total_type_2_diabetes ?? 0}</TableCell>
                        <TableCell>{moh740Data.dc__gender__M__total_type_2_diabetes ?? 0}</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. diagnosed for Gestational Diabetes Mellitus </TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of Diabetes secondary to other causes</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cumulative no. of hypertension patients in care</TableCell>
                        <TableCell>{moh740Data.dc__gender__M__cumulative_htn_patient ?? 0}</TableCell>
                        <TableCell>{moh740Data.dc__gender__F__cumulative_htn_patient ?? 0}</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of newly diagnosed hypertension cases</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Re-visit to clinic/Known HTN</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. with hypertension</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cumulative no. of co-morbid both DM+HTN patients in care</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Newly diagnosed co-morbid with both DM and HTN cases</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Revisits to clinic/Known co-morbid DM and HTN</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of patients on insulin</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of patients on OGLAs</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of patients on both (Insulin and OGLAs)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of patients on diet and exercise only (DM and HTN)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of patients done HbA1c</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. that met HbA1c target (less than 7%)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of patients on antihypertensives</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. with high BP (≥140/90) at clinic visit</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>New Diagnosis of Complications/Comorbidities(Stroke)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>New Diagnosis of Complications/Comorbidities(Ischemic heart disease)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>New Diagnosis of Complications/Comorbidities(Heart failure)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of Patients with neuropathies (new diagnosis)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of patients screened for diabetic foot</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of patients with diabetic foot (new diagnosis)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. of Amputation due to diabetic foot</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. with kidney complications (new diagnosis)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. with diabetic retinopathy (new diagnosis)</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. Screened for Tuberculosis</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. Screened Positive for Tuberculosis</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. enrolled with NHIF</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total No. admitted (for only inpatients)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. admitted with DKA</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. admitted with Hypoglycemia</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. admitted with stroke</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>No. admitted with hypertension urgency/emergency</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total deaths due to diabetes complications</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total deaths due to hypertension complications</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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
