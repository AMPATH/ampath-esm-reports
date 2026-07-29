import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';

import styles from '../../../common/report-register/register-table.scss';
import classNames from 'classnames';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getMoh705aPatientList } from '../../../resources/moh-705.resource';
import { moh204aExportColumns } from './moh-204a.columns';
import { RegisterLayout, usePatientList } from '../../../common/report-register';

interface Moh204ARegisterComponentProps {}

const Moh204ARegisterComponent: React.FC<Moh204ARegisterComponentProps> = () => {
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
      getMoh705aPatientList({
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
      parentLabel="MOH-705A Report"
      parentPath="/moh-705a"
      title="MOH 204A Under-5 Outpatient Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={moh204aExportColumns}
    >
      <div className={styles.tableContainer}>
        <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <TableHead>
            <TableRow>
              <TableHeader>
                Date <br /> (DD/MM/YYYY)
              </TableHeader>
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
              <TableHeader>Age</TableHeader>
              <TableHeader>Sex</TableHeader>
              <TableHeader>Countu/Sub-county</TableHeader>
              <TableHeader>
                Village /Estate / <br />
                Landmark
              </TableHeader>
              <TableHeader>
                Parent/Caregivers's
                <br />
                Telephone
                <br />
                No.
              </TableHeader>
              <TableHeader>Weight(kg)</TableHeader>
              <TableHeader>
                Height
                <br />
                /Length
                <br />
                (cm)
              </TableHeader>
              <TableHeader>
                MUAC
                <br />
                1.Green
                <br />
                2.Yellow
                <br />
                3.Red
              </TableHeader>
              <TableHeader>
                Temp
                <br />
                (oC)
              </TableHeader>
              <TableHeader>
                Respiratory
                <br />
                Rate
              </TableHeader>
              <TableHeader>
                Oxygen Saturation
                <br />
                Reading <br />
                (SPO2)
              </TableHeader>
              <TableHeader>
                Pulse
                <br />
                Rate
              </TableHeader>
              <TableHeader>
                DANGER SIGNS
                <br />
                1.Unable to drink or <br />
                breastfeed
                <br />
                2.Vomits everything
                <br />
                3.Had convulsions
                <br />
                in this illness
                <br />
                4.Is lethargic or <br />
                unconscious
                <br />
                5.Is convulsing now
              </TableHeader>
              <TableHeader>
                Duration
                <br />
                of Current
                <br />
                Illness
                <br />
                (in hours/
                <br />
                days)
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
              <TableHeader>
                IMNCI Classification or <br />
                Diagnosis
              </TableHeader>
              <TableHeader>
                TRACER DRUGS <br />
                PRESCRIBED
                <br />
                1. ORS & Zinc <br />
                (Co-pack)
                <br />
                2.Zinc Only
                <br />
                3. ORS Only 4.
                <br />
                Amoxicillin DT
                <br />
                5. Vitamin A <br />
                6.Oxygen <br />
                7. Albendazole <br />
                8.IV Fluids
              </TableHeader>
              <TableHeader>
                Other <br />
                ALL <br />
                Treatments <br />
                Prescribed 1. <br />
                CPAP 2.
                <br />
                Other
              </TableHeader>
              <TableHeader>
                Immunization
                <br />
                Status Up to <br />
                Date (Y/N)
              </TableHeader>
              <TableHeader>
                TB Screening 1. <br />
                presumed TB 2. <br />
                Referred
              </TableHeader>
              <TableHeader>
                Nutrition and diatetics <br />
                Interventions 1=Nutrition
                <br />
                counselling 2=Nutrition
                <br />
                therapeutic supplements 3<br />
                =. Diatetics
              </TableHeader>
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
              <TableHeader>U</TableHeader>
              <TableHeader>V</TableHeader>
              <TableHeader>W</TableHeader>
              <TableHeader>X</TableHeader>
              <TableHeader>Y</TableHeader>
              <TableHeader>Z</TableHeader>
              <TableHeader>AA</TableHeader>
              <TableHeader>AB</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientlist?.length > 0 ? (
              patientlist?.map((patient) => (
                <TableRow key={patient.person_id || patient.id}>
                  <TableCell>{patient.date}</TableCell>
                  <TableCell>{patient.opd_number_new_visit}</TableCell>
                  <TableCell>{patient.opd_number_return_visit}</TableCell>
                  <TableCell>{patient.referred_from}</TableCell>
                  <TableCell>{patient.full_names}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.sex}</TableCell>
                  <TableCell>{patient.county_sub_county}</TableCell>
                  <TableCell>{patient.village_estate_landmark}</TableCell>
                  <TableCell>{patient.caregiver_phone_number}</TableCell>
                  <TableCell>{patient.weight}</TableCell>
                  <TableCell>{patient.height}</TableCell>
                  <TableCell>{patient.muac}</TableCell>
                  <TableCell>{patient.temp}</TableCell>
                  <TableCell>{patient.respiratory_rate}</TableCell>
                  <TableCell>{patient.oxygen_saturation}</TableCell>
                  <TableCell>{patient.pulse_rate}</TableCell>
                  <TableCell>{patient.danger_signs}</TableCell>
                  <TableCell>{patient.duration_of_illness}</TableCell>
                  <TableCell>{patient.suspected_malaria_cases}</TableCell>
                  <TableCell>{patient.diagnosis}</TableCell>
                  <TableCell>{patient.tracer_drugs_prescribed}</TableCell>
                  <TableCell>{patient.all_other_treatments_prescribed}</TableCell>
                  <TableCell>{patient.immunization_status_up_to_date}</TableCell>
                  <TableCell>{patient.tb_screening}</TableCell>
                  <TableCell>{patient.nutrition_dietetics}</TableCell>
                  <TableCell>{patient.referred_to}</TableCell>
                  <TableCell>{patient.remarks}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={28}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </RegisterLayout>
  );
};

export default Moh204ARegisterComponent;
