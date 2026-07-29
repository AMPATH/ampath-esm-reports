import { TableCell, TableRow } from '@carbon/react';
import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import styles from '../../../common/report-register/register-table.scss';
import classNames from 'classnames';
import { getMoh405PatientList } from '../../../resources/moh-711.resource';
import { moh405Columns } from './type';
import { moh405ExportColumns } from './moh-405.columns';
import { RegisterLayout, usePatientList } from '../../../common/report-register';

const Moh405Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator');
  const reportName = location.state?.reportName || '';

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
      getMoh405PatientList({
        startDate,
        endDate,
        locationUuids,
        indicator,
        reportName,
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicator, reportName],
  );
  return (
    <RegisterLayout
      parentLabel="MOH-711 Report"
      parentPath="/moh-711"
      title="MOH 405 ANC Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={moh405ExportColumns}
    >
      <div className={styles.tableContainer}>
        <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <thead>
            <tr>
              <th rowSpan={7}>Date of visit</th>
              <th>(New Client)</th>
              <th rowSpan={7}>
                ANC <br />
                Number/NUPI
                <br />
                (Re Visit)
              </th>
              <th rowSpan={7}>AMRSID</th>
              <th rowSpan={7}>
                Number of <br />
                Visits <br />
                (1st,2nd,3rd,
                <br />
                4th ….)
              </th>
              <th rowSpan={7}>
                Full Name
                <br />
                (First, Middle, Surname)
              </th>
              <th rowSpan={1}>
                Date of Birth
                <br />
                (DD/MM/YYYY)
              </th>
              <th rowSpan={7}>Subcounty/ County</th>
              <th rowSpan={1}>Village/Estate/ Landmark</th>
              <th rowSpan={7}>
                <u>Marital Status</u>
                <br />
                NM=Never <br />
                Married/Single
                <br />
                MM=Married <br />
                Monogamous
                <br />
                MP=Married
                <br />
                Polygamous
                <br />
                W=Widowed
                <br />
                D=Divorced
                <br />
                S=Separated
              </th>
              <th rowSpan={7}>Parity</th>
              <th rowSpan={7}>Gravidae</th>
              <th rowSpan={1}>
                Date of Last Menstrual <br />
                Period (LMP)
              </th>
              <th rowSpan={1}>Expected Date of Delivery (EDD)</th>
              <th rowSpan={7}>
                Gestation in
                <br />
                Weeks
              </th>
              <th rowSpan={7}>
                MUAC <br />
                1= Green, <br />
                2=Yellow, <br />
                3=Red
              </th>
              <th rowSpan={7}>Height (cm)</th>
              <th rowSpan={7}>Weight (kg)</th>
              <th rowSpan={7}>Blood Pressure</th>
              <th rowSpan={7}>
                Breast Exam
                <br />
                1=normal <br />
                2=abnormal
              </th>
              <th rowSpan={1}>FGM (Y/N)</th>
              <th rowSpan={1} colSpan={12}>
                Laboratory
              </th>
              <th rowSpan={1}>Maternal HAART</th>
              <th rowSpan={1}>Infant Prophylaxis</th>
              <th rowSpan={1}>Partner HIV Testing</th>
              <th rowSpan={1}>Other Conditions and Treatment</th>
              <th rowSpan={1}>Deworming</th>
              <th rowSpan={1}>IPT 1-3</th>
              <th rowSpan={1}>TT Dose</th>
              <th rowSpan={1}>Supplementation</th>
              <th rowSpan={1}>LLITNs</th>
              <th rowSpan={1} colSpan={3}>
                Referrrals
              </th>
              <th rowSpan={7}>Remarks</th>
            </tr>
            <tr>
              <th>ANC Number</th>
              <th rowSpan={6}>Age</th>
              <th rowSpan={6}>Phone Number</th>
              <th rowSpan={6}>(dd/mm/yyyy)</th>
              <th rowSpan={6}>(dd/mm/yyyy)</th>
              <th rowSpan={6}>
                FGM associated <br />
                complications:
                <br />
                1=Scarring
                <br />
                2=Keloids
                <br />
                3=Dyspaneuria
                <br />
                4=UTI 5 = NA
              </th>
              <th rowSpan={6}>
                Haemoglobin <br />
                (Level/ ND/NA)
              </th>
              <th rowSpan={6}>
                Blood Sugar Testing <br />
                for Diabetes: <br />
                1=RBS&lt; 11.1 <br />
                mmol/L, No <br />
                Diabetes,
                <br />
                2=RBS&gt;11.1
                <br />
                mmol/L, Has <br />
                Diabetes,
                <br />
                3=No RBS done
              </th>
              <th rowSpan={6}>
                Blood group <br />
                and rhesus <br />
                (Y/N)
              </th>
              <th rowSpan={6}>
                Urinalysis
                <br />
                (Y/N)
              </th>
              <th rowSpan={1}>
                Type of Test <br />
                RPR/ VDRL/ <br />
                Duo Test/ NA
              </th>
              <th rowSpan={1}>
                Hepatitis B virus <br />
                Sceening Result
                <br />
                (P/N/ND)
              </th>
              <th rowSpan={1}>
                TB Screening:
                <br />
                Codes (1-5)
              </th>
              <th rowSpan={1} colSpan={5}></th>
              <th rowSpan={6}>
                N = New on ART.
                <br />
                OA = On ART
                <br />
                NA = Not
                <br />
                Applicable
              </th>
              <th rowSpan={6}>
                AN = AZT&NVP <br />
                A = AZT
                <br />
                N = NVP
                <br />
                NA
              </th>
              <th rowSpan={6}>N/P/KP/NA</th>
              <th rowSpan={1}>
                1=Hypertension; <br />
                2=Diabetes; <br />
                3=Epilepsy; <br />
                4=Malaria in Pregnancy; <br />
                5=STIs/RTI; <br />
                6=Others (Specify) <br />
                7=None <br />
                Record all that apply
              </th>
              <th rowSpan={6}>(Y/N/NA)</th>
              <th rowSpan={6}>(1,2,3,N,NA)</th>
              <th rowSpan={6}>
                1=TT Dose 1st <br />
                dose 2=2nd dose <br />
                3=3rd dose <br />
                4=4th dose <br />
                5=5th dose <br />
                NA=None
              </th>
              <th rowSpan={6}>
                Given
                <br />
                Supplementation <br />
                1=Combined IFAs
                <br />
                2=Iron <br />
                3=Folate <br />
                4=Iron+Folate <br />
                Separately <br />
                5=Calcium
              </th>
              <th rowSpan={6}>
                Received
                <br />
                LLITNs <br />
                (Y/N)
              </th>
              <th rowSpan={1}>From</th>
              <th rowSpan={1}>To</th>
              <th rowSpan={6}>
                Reason for referral
                <br />
                (specify)
              </th>
            </tr>
            <tr>
              <th rowSpan={5}>NUPI</th>
              <th rowSpan={5}>
                Test Results <br />
                (P/N/NA)
              </th>
              <th rowSpan={5}>
                Treatment
                <br />
                (Y/N/NA)
              </th>
              <th rowSpan={5}>
                1=Presumed TB <br />
                2=No Signs <br />
                3=On TB <br />
                Treatment <br />
                4=On TPT
                <br />
                5=Not Done
              </th>
              <th rowSpan={1}>
                HIV Testing <br />
                (Initial or Retest,
                <br />
                Known Poitive or <br />
                Revisit)
              </th>
              <th rowSpan={1}>HIV Test 1</th>
              <th rowSpan={1}>HIV Test 2</th>
              <th rowSpan={1}>HIV Test 3</th>
              <th rowSpan={1}>HIV Results</th>
              <th rowSpan={5}>Treatment (Y/N/NA)</th>
              <th rowSpan={5}>
                1=From <br />
                Community Unit <br />
                2=Another
                <br />
                Health Facility <br />
                3=Not Applicable
              </th>
              <th rowSpan={5}>
                1=To Community <br />
                Unit <br />
                2=HIV preventive <br />
                services
                <br />
                3=Another Health <br />
                Facility 4=Not <br />
                Applicable
              </th>
            </tr>
            <tr>
              <th rowSpan={5}>(I/R/KP/ND/Rev)</th>
              <th rowSpan={1}>Kit Name</th>
              <th rowSpan={1}>Kit Name</th>
              <th rowSpan={1}>Kit Name</th>
              <th rowSpan={5}>(N/P/Ic/U/N A)</th>
            </tr>
            <tr>
              <th rowSpan={1}>Expiry / /</th>
              <th rowSpan={1}>Expiry / /</th>
              <th rowSpan={1}>Expiry / /</th>
            </tr>
            <tr>
              <th rowSpan={1}>(N/P/I/NA)</th>
              <th rowSpan={1}>(N/P/I/NA)</th>
              <th rowSpan={1}>(N/P/I/NA)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.textCentre}>(a)</td>
              <td className={styles.textCentre}>(b)</td>
              <td className={styles.textCentre}>(c)</td>
              <td className={styles.textCentre}>(d)</td>
              <td className={styles.textCentre}>(e)</td>
              <td className={styles.textCentre}>(f)</td>
              <td className={styles.textCentre}>(g)</td>
              <td className={styles.textCentre}>(h)</td>
              <td className={styles.textCentre}>(i)</td>
              <td className={styles.textCentre}>(j)</td>
              <td className={styles.textCentre}>(k)</td>
              <td className={styles.textCentre}>(l)</td>
              <td className={styles.textCentre}>(m)</td>
              <td className={styles.textCentre}>(n)</td>
              <td className={styles.textCentre}>(o)</td>
              <td className={styles.textCentre}>(p)</td>
              <td className={styles.textCentre}>(q)</td>
              <td className={styles.textCentre}>(r)</td>
              <td className={styles.textCentre}>(s)</td>
              <td className={styles.textCentre}>(t)</td>
              <td className={styles.textCentre}>(u)</td>
              <td className={styles.textCentre}>(v)</td>
              <td className={styles.textCentre}>(w)</td>
              <td className={styles.textCentre}>(x)</td>
              <td className={styles.textCentre}>(y)</td>
              <td className={styles.textCentre}>(z)</td>
              <td className={styles.textCentre}>(aa)</td>
              <td className={styles.textCentre}>(ab)</td>
              <td className={styles.textCentre}>(ac)</td>
              <td className={styles.textCentre}>(ad)</td>
              <td className={styles.textCentre}>(ae)</td>
              <td className={styles.textCentre}>(af)</td>
              <td className={styles.textCentre}>(ag)</td>
              <td className={styles.textCentre}>(ah)</td>
              <td className={styles.textCentre}>(ai)</td>
              <td className={styles.textCentre}>(aj)</td>
              <td className={styles.textCentre}>(ak)</td>
              <td className={styles.textCentre}>(al)</td>
              <td className={styles.textCentre}>(am)</td>
              <td className={styles.textCentre}>(an)</td>
              <td className={styles.textCentre}>(ao)</td>
              <td className={styles.textCentre}>(ap)</td>
              <td className={styles.textCentre}>(aq)</td>
              <td className={styles.textCentre}>(ar)</td>
              <td className={styles.textCentre}>(as)</td>
              <td className={styles.textCentre}>(at)</td>
            </tr>
            {patientlist?.length > 0 ? (
              patientlist.map((patient, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr>
                    <td rowSpan={2}>
                      {patient.date_of_visit ? new Date(patient.date_of_visit).toLocaleDateString('en-GB') : ''}
                    </td>
                    <td>{patient.anc_number}</td>
                    <td rowSpan={2}>{patient.anc_number_NUPI}</td>
                    <td rowSpan={2}>{patient.amrsID}</td>
                    <td rowSpan={2}>{patient.number_of_anc_visits}</td>
                    <td rowSpan={2}>{patient.full_names}</td>
                    <td>{patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString('en-GB') : ''}</td>
                    <td rowSpan={2}>{patient.subcounty_county}</td>
                    <td>{patient.village_estate_landmark}</td>
                    <td rowSpan={2}>{patient.marital_status}</td>
                    <td rowSpan={2}>{patient.parity}</td>
                    <td rowSpan={2}>{patient.gravidae}</td>
                    <td rowSpan={2}>
                      {patient.last_lmp_date ? new Date(patient.last_lmp_date).toLocaleDateString('en-GB') : ''}
                    </td>
                    <td rowSpan={2}>{patient.edd ? new Date(patient.edd).toLocaleDateString('en-GB') : ''}</td>
                    <td rowSpan={2}>{patient.gestation_in_weeks}</td>
                    <td rowSpan={2}>{patient.muac}</td>
                    <td rowSpan={2}>{patient.height}</td>
                    <td rowSpan={2}>{patient.weight}</td>
                    <td rowSpan={2}>{patient.blood_pressure}</td>
                    <td rowSpan={2}>{patient.breast_exam}</td>
                    <td>{patient.fgm}</td>
                    <td rowSpan={2}>{patient.haemoglobin}</td>
                    <td rowSpan={2}>{patient.blood_sugar_test}</td>
                    <td rowSpan={2}>{patient.blood_group_rhesus}</td>
                    <td rowSpan={2}>{patient.urinalysis}</td>
                    <td>{patient.rpr_vdrl_duo}</td>
                    <td>{patient.hepatitisB}</td>
                    <td rowSpan={2}>{patient.tb_screening}</td>
                    <td rowSpan={2}>{patient.hiv_test_type}</td>

                    <td>
                      {patient.hiv_test_1_kit_name} / {patient.hiv_test_1_lot_no} /{' '}
                      {patient.hiv_test_1_expiry_date
                        ? new Date(patient.hiv_test_1_expiry_date).toLocaleDateString('en-GB')
                        : ''}{' '}
                      / {patient.hiv_test_1_test_result}
                    </td>

                    <td>
                      {patient.hiv_test_2_kit_name} / {patient.hiv_test_2_lot_number} /{' '}
                      {patient.hiv_test_2_expiry_date
                        ? new Date(patient.hiv_test_2_expiry_date).toLocaleDateString('en-GB')
                        : ''}{' '}
                      / {patient.hiv_test_2_test_result}
                    </td>

                    <td>
                      {patient.hiv_test_3_kit_name} / {patient.hiv_test_3_lot_number} /{' '}
                      {patient.hiv_test_3_expiry_date
                        ? new Date(patient.hiv_test_3_expiry_date).toLocaleDateString('en-GB')
                        : ''}{' '}
                      / {patient.hiv_test_3_test_result}
                    </td>

                    <td rowSpan={2}>{patient.hiv_results}</td>
                    <td rowSpan={2}>{patient.maternal_haart}</td>
                    <td rowSpan={2}>{patient.infant_prophylaxis}</td>
                    <td rowSpan={2}>{patient.partner_hiv_testing}</td>
                    <td>{patient.other_conditions}</td>
                    <td rowSpan={2}>{patient.deworming}</td>
                    <td rowSpan={2}>{patient.ipt_1_3}</td>
                    <td rowSpan={2}>{patient.tt_dose}</td>
                    <td rowSpan={2}>{patient.supplementation}</td>
                    <td rowSpan={2}>{patient.llitns}</td>
                    <td rowSpan={2}>{patient.referrals_from}</td>
                    <td rowSpan={2}>{patient.referrals_to}</td>
                    <td rowSpan={2}>{patient.reason_for_referral}</td>
                    <td rowSpan={2}>{patient.remarks}</td>
                  </tr>

                  <tr>
                    <td>{patient.NUPI}</td>
                    <td>{patient.age}</td>
                    <td>{patient.phone_number}</td>
                    <td>{patient.fgm_complications}</td>
                    <td>{patient.rpr_vdrl_duo_results}</td>
                    <td>{patient.hepatitisB_treatment}</td>

                    <td>
                      {patient.hiv_test_1_expiry_date
                        ? new Date(patient.hiv_test_1_expiry_date).toLocaleDateString('en-GB')
                        : ''}
                    </td>

                    <td>
                      {patient.hiv_test_2_expiry_date
                        ? new Date(patient.hiv_test_2_expiry_date).toLocaleDateString('en-GB')
                        : ''}
                    </td>

                    <td>
                      {patient.hiv_test_3_expiry_date
                        ? new Date(patient.hiv_test_3_expiry_date).toLocaleDateString('en-GB')
                        : ''}
                    </td>

                    <td>{patient.other_conditions_treatment}</td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={moh405Columns.length}>No data available</TableCell>
              </TableRow>
            )}
          </tbody>
        </table>
      </div>
    </RegisterLayout>
  );
};

export default Moh405Register;
