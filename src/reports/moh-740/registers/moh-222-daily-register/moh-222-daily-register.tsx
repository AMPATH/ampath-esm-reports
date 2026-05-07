import React, { useMemo } from 'react';
import styles from './moh-222-daily-register.scss';
import { type Moh222Patient } from '../../types';
import { formatIndicatorName } from '../../shared/utils/format-indicator';
import { Link, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
interface Moh222DailyRegisterProps {
  moh222PatientList: Moh222Patient[];
  indicator: string;
}
const Moh222DailyRegister: React.FC<Moh222DailyRegisterProps> = ({ moh222PatientList, indicator }) => {
  const pageTitle = useMemo(() => formatIndicatorName(indicator ?? ''), [indicator]);
  const reportTitle = 'Daily Activity Register - MOH 222';
  if (!moh222PatientList) {
    return <>No Data to display</>;
  }
  return (
    <>
      <div className={styles.registerLayout}>
        <div className={styles.registerHeader}>
          <h4 className={styles.pageTitle}>{reportTitle}</h4>
          <h6 className={styles.pageTitle}>{pageTitle}</h6>
        </div>
        <div className={styles.content}>

          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>No</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Patient No</TableHeader>
                <TableHeader>Patient Name</TableHeader>
                <TableHeader>Age</TableHeader>
                <TableHeader>D.O.B</TableHeader>
                <TableHeader>Sex(M/F)</TableHeader>
                <TableHeader>Visit for the month</TableHeader>
                <TableHeader>Weight(Kg)</TableHeader>
                <TableHeader>Height(cm)</TableHeader>
                <TableHeader>BMI</TableHeader>
                <TableHeader>Waist Circumference</TableHeader>
                <TableHeader>BP(mmHg)</TableHeader>
                <TableHeader>HTN</TableHeader>
                <TableHeader>Diabetes</TableHeader>
                <TableHeader>Both Diabetes and Hypetention(HTN)</TableHeader>
                <TableHeader>RBS(mmol/L)</TableHeader>
                <TableHeader>FBS(mmol/L)</TableHeader>
                <TableHeader>HbA1C(%) within 3 months</TableHeader>
                <TableHeader>Complications/Co-morbidities at enrollment(2)</TableHeader>
                <TableHeader>Treatment</TableHeader>
                <TableHeader>Diabetic Foot Screening</TableHeader>
                <TableHeader>Diabetic Foot(New,Known,Nill)</TableHeader>
                <TableHeader>Foot Risk Assessment</TableHeader>
                <TableHeader>Footcare Outcome</TableHeader>
                <TableHeader>Screened for TB</TableHeader>
                <TableHeader>TB Status after Screening</TableHeader>
                <TableHeader>Active NHIF(Y/N)</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {moh222PatientList.map((p, index) => (
                <TableRow key={p.patient_uuid}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{p.encounter_date}</TableCell>
                  <TableCell>{p.amrs_universal_id}</TableCell>
                  <TableCell>
                    <Link href={`${window.spaBase}/patient/${p.patient_uuid}/chart/`}>
                      {p.person_name}
                    </Link>
                  </TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{p.birthdate}</TableCell>
                  <TableCell>{p.gender}</TableCell>
                  <TableCell>{p.visit_for_the_month}</TableCell>
                  <TableCell>{p.weight}</TableCell>
                  <TableCell>{p.height}</TableCell>
                  <TableCell>{p.bmi}</TableCell>
                  <TableCell>{p.waist_circumference}</TableCell>
                  <TableCell>{p.bp}</TableCell>
                  <TableCell>{p.htn}</TableCell>
                  <TableCell>{p.diabetes}</TableCell>
                  <TableCell>{p.both_htn_and_diabetic}</TableCell>
                  <TableCell>{p.rbs}</TableCell>
                  <TableCell>{p.fbs}</TableCell>
                  <TableCell>{p.hba1c}</TableCell>
                  <TableCell>{p.complications_at_enrollment}</TableCell>
                  <TableCell>{p.treatment}</TableCell>
                  <TableCell>{p.diabetic_foot_screening}</TableCell>
                  <TableCell>{p.diabetic_foot}</TableCell>
                  <TableCell>{p.foot_risk_assessment}</TableCell>
                  <TableCell>{p.footcare_outcome}</TableCell>
                  <TableCell>{p.screened_for_tb}</TableCell>
                  <TableCell>{p.tbs_status}</TableCell>
                  <TableCell>{p.covered_by_shif ? 'Y' : 'N'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </div>

      </div>

    </>)
};
export default Moh222DailyRegister;
