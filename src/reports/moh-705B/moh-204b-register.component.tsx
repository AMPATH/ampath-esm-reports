import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import React from 'react';

import styles from '../../common/report-register/register-table.scss';
import classNames from 'classnames';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getMoh705bPatientList } from '../../resources/moh-705.resource';
import { moh204bExportColumns } from './moh-204b.columns';
import { RegisterLayout, usePatientList } from '../../common/report-register';

const Moh204BRegisterComponent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator');

  const {
    rows: patientlist,
    total,
    isTotalExact,
    isLoading,
    page,
    pageSize,
    onPageChange,
    fetchAll,
  } = usePatientList(
    ({ startIndex, limit }) =>
      getMoh705bPatientList({
        startDate: startDate!,
        endDate: endDate!,
        locationUuids: locationUuids!,
        indicator: indicator!,
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicator],
  );

  return (
    <RegisterLayout
      parentLabel="MOH-705B Report"
      parentPath="/moh-705b"
      title="MOH 204B Over-5 Outpatient Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={moh204bExportColumns}
    >
      <div className={styles.tableContainer}>
        <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <TableHead>
            <TableRow>
              <TableHeader>Date (DD/MM/YYYY)</TableHeader>
              <TableHeader>
                OPD No.
                <br />
                (New)
              </TableHeader>
              <TableHeader>
                OPD No.
                <br />
                (Revisit)
              </TableHeader>
              <TableHeader>
                Referred
                <br />
                From 1=CU,
                <br />
                2=From Other
                <br />
                facility, 3=
                <br />
                Within 4=N/A
              </TableHeader>
              <TableHeader>Full Names (THREE names)</TableHeader>
              <TableHeader>
                Age in <br />
                Years
              </TableHeader>
              <TableHeader>Sex</TableHeader>
              <TableHeader>
                Countu/Sub-
                <br />
                county
              </TableHeader>
              <TableHeader>
                Village /Estate / <br />
                Landmark
              </TableHeader>
              <TableHeader>
                Patient/
                <br />
                Parent/Caregivers's
                <br />
                Telephone
                <br />
                No.
              </TableHeader>
              <TableHeader>Weight</TableHeader>
              <TableHeader>Height</TableHeader>
              <TableHeader>
                BMI
                <br />
                (Kg/m2)
              </TableHeader>
              <TableHeader>
                Temp
                <br />
                (oC)
              </TableHeader>
              <TableHeader>BP</TableHeader>
              <TableHeader>
                Visual
                <br />
                Aquity <br />
                "RE
                <br />
                (Right
                <br />
                Eye)"LE
                <br />
                (Left
                <br />
                Eye)
              </TableHeader>
              <TableHeader>
                TB Screening 1. <br />
                presumed TB 2. <br />
                No signs 3. On <br /> TB Treatment <br />
                4. Not done
              </TableHeader>
              <TableHeader>
                Malaria
                <br />
                1.Presenting with symptoms NOT
                <br />
                Tested
                <br />
                2.RDT Tested (-ve)
                <br />
                3.Microscopy
                <br />
                Tested (-ve)
                <br />
                4.RDT Tested (+ve)
                <br />
                5. Microscopy
                <br />
                Tested (+ve)
              </TableHeader>
              <TableHeader>Diagnosis</TableHeader>
              <TableHeader>Treatment/Prescription</TableHeader>
              <TableHeader>
                Referred to (1=CU, 2= to <br />
                other H/F, 3=within the <br />
                facility/ 4=N/A)
              </TableHeader>
              <TableHeader>REMARKS/ Outcome</TableHeader>
            </TableRow>
            <TableRow>
              <TableHeader>A</TableHeader>
              <TableHeader>B</TableHeader>
              <TableHeader>C</TableHeader>
              <TableHeader>D</TableHeader>
              <TableHeader>E</TableHeader>
              <TableHeader>F</TableHeader>
              <TableHeader>G</TableHeader>
              <TableHeader>H</TableHeader>
              <TableHeader>I</TableHeader>
              <TableHeader>J</TableHeader>
              <TableHeader>K</TableHeader>
              <TableHeader>L</TableHeader>
              <TableHeader>M</TableHeader>
              <TableHeader>N</TableHeader>
              <TableHeader>O</TableHeader>
              <TableHeader>P</TableHeader>
              <TableHeader>Q</TableHeader>
              <TableHeader>R</TableHeader>
              <TableHeader>S</TableHeader>
              <TableHeader>T</TableHeader>
              <TableHeader>V</TableHeader>
              <TableHeader>W</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientlist?.length > 0 ? (
              patientlist?.map((patient, index) => (
                <TableRow key={patient.person_id || index}>
                  <TableCell>{patient.date}</TableCell>
                  <TableCell>{patient.opd_number_new_visit}</TableCell>
                  <TableCell>{patient.opd_number_return_visit}</TableCell>
                  <TableCell>{patient.referred_from}</TableCell>
                  <TableCell>{patient.full_names}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.sex}</TableCell>
                  <TableCell>{patient.county_sub_county}</TableCell>
                  <TableCell>{patient.village_estate_landmark}</TableCell>
                  <TableCell>{patient.phone_number}</TableCell>
                  <TableCell>{patient.weight}</TableCell>
                  <TableCell>{patient.height}</TableCell>
                  <TableCell>{patient.bmi}</TableCell>
                  <TableCell>{patient.temp}</TableCell>
                  <TableCell>
                    {patient.systolic} / {patient.diastolic}
                  </TableCell>
                  <TableCell>
                    {patient.visual_aquity_re} / {patient.visual_aquity_le}
                  </TableCell>
                  <TableCell>{patient.tb_screening}</TableCell>
                  <TableCell>{patient.malaria}</TableCell>
                  <TableCell>{patient.diagnosis}</TableCell>
                  <TableCell>{patient.treatment_prescription}</TableCell>
                  <TableCell>{patient.referred_to}</TableCell>
                  <TableCell>{patient.remarks}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={22}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </RegisterLayout>
  );
};

export default Moh204BRegisterComponent;
