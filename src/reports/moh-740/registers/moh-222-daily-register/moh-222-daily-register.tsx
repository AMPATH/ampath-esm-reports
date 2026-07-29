import React from 'react';
import { type Moh222Patient } from '../../types';
import styles from '../../../../common/report-register/register-table.scss';
import classNames from 'classnames';
import { Link, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
interface Moh222DailyRegisterProps {
  moh222PatientList: Moh222Patient[];
}
const Moh222DailyRegister: React.FC<Moh222DailyRegisterProps> = ({ moh222PatientList }) => {
  return (
    <div className={styles.tableContainer}>
      <Table className={classNames(styles.table, styles.tableBordered, styles.tableStriped)}>
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
                <Link href={`${window.spaBase}/patient/${p.patient_uuid}/chart/`}>{p.person_name}</Link>
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
  );
};
export default Moh222DailyRegister;
