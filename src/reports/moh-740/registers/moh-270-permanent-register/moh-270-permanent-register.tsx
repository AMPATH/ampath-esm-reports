import { Link, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import React from 'react';
import { type Moh270Patient } from '../../types';
import styles from '../../../../common/report-register/register-table.scss';
import classNames from 'classnames';
interface Moh270DailyRegisterProps {
  moh270PatientList: Moh270Patient[];
}
const Moh270DailyRegister: React.FC<Moh270DailyRegisterProps> = ({ moh270PatientList }) => {
  return (
    <div className={styles.tableContainer}>
      <Table className={classNames(styles.table, styles.tableBordered, styles.tableStriped)}>
        <TableHead>
          <TableRow>
            <TableHeader>No</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Patient No</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>D.O.B</TableHeader>
            <TableHeader>Sex(M/F)</TableHeader>
            <TableHeader>Telephone No</TableHeader>
            <TableHeader>Sub County</TableHeader>
            <TableHeader>Village/Estate</TableHeader>
            <TableHeader>Landmark</TableHeader>
            <TableHeader>Treatment supporter</TableHeader>
            <TableHeader>Diagnosis at enrolment</TableHeader>
            <TableHeader>Year of diagnosis</TableHeader>
            <TableHeader>Complications/Co-morbidities at enrollment(2)</TableHeader>
            <TableHeader>NHIF(Y/N)</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {moh270PatientList.map((p, index) => (
            <TableRow key={p.patient_uuid}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{p.encounter_date}</TableCell>
              <TableCell>{p.amrs_universal_id}</TableCell>
              <TableCell>
                <Link href={`${window.spaBase}/patient/${p.patient_uuid}/chart/`}>{p.person_name}</Link>
              </TableCell>
              <TableCell>{p.birthdate}</TableCell>
              <TableCell>{p.gender}</TableCell>
              <TableCell>{p.phone_number}</TableCell>
              <TableCell>{p.sub_county}</TableCell>
              <TableCell>{p.ward}</TableCell>
              <TableCell>{p.landmark}</TableCell>
              <TableCell>{p.contact_of_the_treatment_supporter_and_relationship ?? ''}</TableCell>
              <TableCell>{p.diagnosis_at_enrolment ?? ''}</TableCell>
              <TableCell>{p.diagnosis_year ?? ''}</TableCell>
              <TableCell>{p.complications_at_enrollment ?? ''}</TableCell>
              <TableCell>{p.covered_by_shif ? 'Y' : 'N'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Moh270DailyRegister;
