import { Link, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import React, { useMemo } from 'react';
import { type Moh270Patient } from '../../types';
import { formatIndicatorName } from '../../shared/utils/format-indicator';
import styles from './moh-270-permanent-register.scss';
interface Moh270DailyRegisterProps {
  moh270PatientList: Moh270Patient[];
  indicator: string;
}
const Moh270DailyRegister: React.FC<Moh270DailyRegisterProps> = ({ moh270PatientList, indicator }) => {
  const pageTitle = useMemo(() => formatIndicatorName(indicator ?? ''), [indicator]);

  ;
  if (!moh270PatientList) {
    return <>No Data to display</>;
  }
  return (
    <>
      <div className={styles.registerLayout}>
        <div className={styles.registerHeader}>
          <h4 className={styles.pageTitle}>{pageTitle}</h4>
        </div>
        <div className={styles.content}>

          <Table>
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
                    <Link href={`${window.spaBase}/patient/${p.patient_uuid}/chart/`}>
                      {p.person_name}
                    </Link>
                  </TableCell>
                  <TableCell>{p.birthdate}</TableCell>
                  <TableCell>{p.gender}</TableCell>
                  <TableCell>{p.phone_number}</TableCell>
                  <TableCell>{p.sub_county}</TableCell>
                  <TableCell>{p.ward}</TableCell>
                  <TableCell>{p.landmark}</TableCell>
                  <TableCell>{p.contact_of_the_treatment_supporter_and_relationship ?? ''}</TableCell>
                  <TableCell>{p.diagnosis_at_enrolment ?? ''}</TableCell>
                  <TableCell>{p.year_of_diagnosis ?? ''}</TableCell>
                  <TableCell>{p.complications_at_enrollment ?? ''}</TableCell>
                  <TableCell>{p.covered_by_shif ? 'Y' : 'N'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </div>

      </div>

    </>
  );
};
export default Moh270DailyRegister;
