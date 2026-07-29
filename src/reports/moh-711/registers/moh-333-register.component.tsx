import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import styles from '../../../common/report-register/register-table.scss';
import classNames from 'classnames';
import { getMoh333PatientList } from '../../../resources/moh-711.resource';
import { moh333Columns } from './type';
import { moh333ExportColumns } from './moh-333.columns';
import { RegisterLayout, usePatientList } from '../../../common/report-register';

const Moh333Register: React.FC = () => {
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
      getMoh333PatientList({
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
      title="MOH 333 Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={moh333ExportColumns}
    >
      {' '}
      <div className={styles.tableContainer}>
        <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <thead>
            <tr>
              <th rowSpan={6}>
                Date of
                <br />
                Admission <br />
                (dd/mm/yyyy)
              </th>
              <th rowSpan={6}>AMRSID</th>
              <th>Admission number (yyyy-mm-nnnn)</th>
              <th rowSpan={6}>
                Full Name
                <br />
                (First, Middle, surname)
              </th>
              <th>
                Date of Birth <br />
                (dd/mm/yyyy)
              </th>
              <th rowSpan={6}>
                County/ <br />
                Subcounty
              </th>
              <th>
                Village/
                <br />
                Estate/
                <br />
                Land mark
              </th>
              <th rowSpan={6}>
                Marital Status <br />
                1 = Married
                <br />
                2 = Widowed <br />
                3 = Single
                <br />
                4 = Divorced
                <br />5 = Separated
              </th>
              <th rowSpan={6}>
                Parity
                <br />
                (X+Y)
              </th>
              <th rowSpan={6}>Gravidae</th>
              <th rowSpan={6}>
                No. of <br />
                ANC <br />
                visits
              </th>
              <th rowSpan={6}>
                Date of Last
                <br />
                Menstrual
                <br />
                Period (LMP) <br />
                (dd/mm/yyyy)
              </th>
              <th rowSpan={6}>
                Estimated Date <br />
                of Delivery
                <br />
                (EDD)
                <br />
                (dd/mm/yyyy)
              </th>
              <th rowSpan={6}>Diagnosis</th>
              <th colSpan={13}>Delivery</th>
              <th colSpan={9}></th>
              <th>
                VDRL/
                <br />
                RPR
                <br />
                Results
                <br />
                (Specify
                <br />
                1-VDRL
                <br />
                2-RPR
                <br />
                3-Duo
                <br />
                testing)
              </th>
              <th colSpan={4}>Baby</th>
              <th>
                Maternal <br />
                HAART
              </th>
              <th>
                Infant <br />
                Prophylaxis
              </th>
              <th>
                Partner <br />
                Tested for <br />
                HIV
              </th>
              <th rowSpan={6}>
                Counselled <br />
                on infant <br />
                feeding <br />
                (Y/N/NA)
              </th>
              <th rowSpan={6}>
                Delivery <br />
                Conducted by <br />
                (Enter Name)
              </th>
              <th rowSpan={6}>
                Birth <br />
                Notification <br />
                Number
              </th>
              <th colSpan={2}>Discharge</th>
              <th colSpan={3}>Referral</th>
              <th rowSpan={6}>Comments</th>
            </tr>
            <tr>
              <th rowSpan={5}>NUPI</th>
              <th rowSpan={5}>Age</th>
              <th rowSpan={5}>Phone number</th>
              <th rowSpan={5}>
                Duration of <br />
                labour
                <br />
                (hours)
              </th>
              <th rowSpan={5}>
                Date of
                <br />
                Delivery <br />
                (dd/mm/yyyy)
              </th>
              <th rowSpan={5}>
                Time of
                <br />
                Delivery
              </th>
              <th rowSpan={5}>
                Gestation
                <br />
                at Birth
                <br />
                (wks)
              </th>
              <th rowSpan={5}>
                Mode of <br />
                Delivery <br />
                1) SVD
                <br />
                2) CS
                <br />
                3) Breech
                <br />
                4) AVD
              </th>
              <th rowSpan={5}>
                No.of babies <br />
                delivered
              </th>
              <th rowSpan={5}>
                Placenta
                <br />
                Complete <br />
                1=Yes
                <br />
                2=No
                <br />
                3=BBA
              </th>
              <th rowSpan={5}>
                Uterotonic <br />
                given <br />
                1=oxytocin <br />
                2=Carbetocin <br />
                3=Others <br />
                Specify
                <br />
                4= None
              </th>
              <th rowSpan={5}>
                Vaginal
                <br />
                Examination
                <br />
                1= Normal
                <br />
                2=Episiotomy
                <br />
                3=Vaginal tear
                <br />
                4=FGM
                <br />
                5=Vaginal warts
              </th>
              <th rowSpan={5}>
                Blood
                <br />
                loss
                <br />
                (mls)
              </th>
              <th rowSpan={5}>
                Mother's <br />
                status after <br />
                Delivery
                <br />
                (Alive/ <br />
                Dead)
              </th>
              <th>
                Maternal deaths <br />
                Notified <br />
                (Y/N/NA)
              </th>
              <th rowSpan={5}>
                Delivery
                <br />
                Complications
                <br />
                1=A.P.H. (Ante Partum <br />
                Haemorrhage); <br />
                2=P.P.H. (Post Partum <br />
                Haemorrhage); <br />
                3= Eclampsia; <br />
                4=Ruptured Uterus;
                <br />
                5=Obstructed labour; <br />
                6=Sepsis <br />
                7= NA
              </th>
              <th rowSpan={5}>
                APGAR <br />
                Score
              </th>
              <th rowSpan={5}>
                Birth
                <br />
                Outcome
                <br />
                (LB/FSB/ <br />
                MSB)
              </th>
              <th rowSpan={5}>
                Birth <br />
                Weight
                <br />
                (grams)
              </th>
              <th rowSpan={5}>
                Sex <br />
                (M/F)
              </th>
              <th>
                Initiated on <br />
                BF in
                <br />
                &lt; 1hr
                <br />
                (Y/N)
              </th>
              <th rowSpan={5}>
                TEO
                <br />
                given at
                <br />
                birth? <br />
                (Y/N)
              </th>
              <th rowSpan={5}>
                Chlorhexidine <br />
                applied on <br />
                cord stump
                <br />
                (Y/N)
              </th>
              <th>
                Birth with <br />
                deformity <br />
                (Y/N)
              </th>
              <th rowSpan={5}>
                Given
                <br />
                Vitamin <br />
                K <br />
                (Y/N)
              </th>
              <th rowSpan={5}>(P/N/ND)</th>
              <th>HIV Test 1</th>
              <th>HIV Test 2</th>
              <th>HIV Test 3</th>
              <th>
                HIV Result <br />
                Maternity <br />
                (N/P/Inc/U/NA)
              </th>
              <th>
                Start at <br />
                Maternity
              </th>
              <th rowSpan={5}>(Y/N/NA)</th>
              <th rowSpan={5}>(Y/N/NA)</th>
              <th rowSpan={5}>
                Date <br />
                (dd/mm/yyyy)
              </th>
              <th rowSpan={5}>
                Status of <br />
                Baby
                <br />
                A= Alive
                <br />
                D= Dead
              </th>
              <th>From</th>
              <th>To</th>
              <th rowSpan={5}>Reason for referral</th>
            </tr>
            <tr>
              <th rowSpan={4}>
                Date Death <br />
                notified
              </th>
              <th rowSpan={4}>
                Kangaroo <br />
                Mother <br />
                Care <br />
                (Y/N)
              </th>
              <th rowSpan={4}>
                1- congenital <br />
                syphilis.
                <br />
                2- spina bifida, <br />
                3- Hydrocephalus,
                <br />
                4- Talipes
              </th>
              <th>Kit Name:</th>
              <th>Kit Name:</th>
              <th>Kit Name:</th>
              <th rowSpan={4}>
                Initial/Retest/
                <br />
                NA
              </th>
              <th rowSpan={4}>(Y/N/NA)</th>
              <th rowSpan={4}>
                1= From Community <br />
                Unit,
                <br />
                2= From Another
                <br />
                Health Facility, <br />
                3=Not Applicable
              </th>
              <th rowSpan={4}>
                1= To Community
                <br />
                Unit, <br />
                2=Referred to HIV <br />
                preventive services
                <br />
                3=Another Health <br />
                Facility,
                <br />
                4=Not Applicable
              </th>
            </tr>
            <tr>
              <th>Lot No.</th>
              <th>Lot No.</th>
              <th>Lot No.</th>
            </tr>
            <tr>
              <th>Expiry / /</th>
              <th>Expiry / /</th>
              <th>Expiry / /</th>
            </tr>
            <tr>
              <th>(N/P/I/NA)</th>
              <th>(N/P/I/NA)</th>
              <th>(N/P/I/NA)</th>
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
              <td colSpan={3} className={styles.textCentre}>
                (ak)
              </td>
              <td className={styles.textCentre}>(al)</td>
              <td className={styles.textCentre}>(am)</td>
              <td className={styles.textCentre}>(an)</td>
              <td className={styles.textCentre}>(ao)</td>
              <td className={styles.textCentre}>(ap)</td>
              <td className={styles.textCentre}>(aq)</td>
              <td className={styles.textCentre}>(ar)</td>
              <td className={styles.textCentre}>(as)</td>
              <td className={styles.textCentre}>(at)</td>
              <td className={styles.textCentre}>(au)</td>
              <td className={styles.textCentre}>(av)</td>
              <td className={styles.textCentre}>(aw)</td>
              <td className={styles.textCentre}>(ax)</td>
              <td className={styles.textCentre}>(ay)</td>
            </tr>
            {patientlist?.length > 0 ? (
              patientlist.map((row, i) => (
                <React.Fragment key={i}>
                  <tr>
                    <td rowSpan={2}>
                      {row.date_of_admission ? new Date(row.date_of_admission).toLocaleDateString('en-GB') : ''}
                    </td>
                    <td rowSpan={2}>{row.amrsID}</td>
                    <td>{row.admission_number}</td>
                    <td rowSpan={2}>{row.full_names}</td>

                    <td>{row.date_of_birth ? new Date(row.date_of_birth).toLocaleDateString('en-GB') : ''}</td>

                    <td rowSpan={2}>{row.subcounty_county}</td>
                    <td>{row.village_estate_landmark}</td>
                    <td rowSpan={2}>{row.marital_status}</td>
                    <td rowSpan={2}>{row.parity}</td>
                    <td rowSpan={2}>{row.gravidae}</td>
                    <td rowSpan={2}>{row.no_of_anc_visits}</td>

                    <td rowSpan={2}>{row.lmp ? new Date(row.lmp).toLocaleDateString('en-GB') : ''}</td>

                    <td rowSpan={2}>{row.edd ? new Date(row.edd).toLocaleDateString('en-GB') : ''}</td>

                    <td rowSpan={2}>{row.diagnosis}</td>
                    <td rowSpan={2}>{row.duration_of_labour}</td>

                    <td rowSpan={2}>
                      {row.date_of_delivery ? new Date(row.date_of_delivery).toLocaleDateString('en-GB') : ''}
                    </td>

                    <td rowSpan={2}>{row.time_of_delivery}</td>
                    <td rowSpan={2}>{row.gestation_at_birth}</td>
                    <td rowSpan={2}>{row.mode_of_delivery}</td>
                    <td rowSpan={2}>{row.no_of_babies_delivered}</td>
                    <td rowSpan={2}>{row.placenta_complete}</td>
                    <td rowSpan={2}>{row.uterotonic_given}</td>
                    <td rowSpan={2}>{row.vaginal_examination}</td>
                    <td rowSpan={2}>{row.blood_loss}</td>
                    <td rowSpan={2}>{row.mother_status_after_delivery}</td>

                    <td>{row.maternal_deaths_notified}</td>

                    <td rowSpan={2}>{row.delivery_complications}</td>
                    <td rowSpan={2}>{row.apgar_score}</td>
                    <td rowSpan={2}>{row.birth_outcome}</td>
                    <td rowSpan={2}>{row.birth_weight}</td>
                    <td rowSpan={2}>{row.sex}</td>

                    <td>{row.initiated_on_bf_less_one_hour}</td>

                    <td rowSpan={2}>{row.teo_given_at_birth}</td>
                    <td rowSpan={2}>{row.chlorhexdine_applied_on_cord_stump}</td>
                    <td>{row.birth_with_deformity}</td>
                    <td rowSpan={2}>{row.given_vitamin_k}</td>

                    <td>{row.duo_test_result}</td>

                    <td rowSpan={2}>
                      {row.hiv_test_1_kit_name} / {row.hiv_test_1_lot_no} /{' '}
                      {row.hiv_test_1_expiry_date
                        ? new Date(row.hiv_test_1_expiry_date).toLocaleDateString('en-GB')
                        : ''}
                    </td>

                    <td rowSpan={2}>
                      {row.hiv_test_2_kit_name} / {row.hiv_test_2_lot_no} /{' '}
                      {row.hiv_test_2_expiry_date
                        ? new Date(row.hiv_test_2_expiry_date).toLocaleDateString('en-GB')
                        : ''}
                    </td>

                    <td rowSpan={2}>
                      {row.hiv_test_3_kit_name} / {row.hiv_test_3_lot_no} /{' '}
                      {row.hiv_test_3_expiry_date
                        ? new Date(row.hiv_test_3_expiry_date).toLocaleDateString('en-GB')
                        : ''}
                    </td>

                    <td>{row.hiv_test_results_maternity}</td>

                    <td rowSpan={2}>{row.maternal_haart}</td>
                    <td rowSpan={2}>{row.infant_prophylaxis}</td>
                    <td rowSpan={2}>{row.partner_tested_for_hiv}</td>
                    <td rowSpan={2}>{row.counselled_on_infant_feeding}</td>
                    <td rowSpan={2}>{row.deleivery_conducted_by}</td>
                    <td rowSpan={2}>{row.birth_notification_number}</td>

                    <td rowSpan={2}>
                      {row.discharge_date ? new Date(row.discharge_date).toLocaleDateString('en-GB') : ''}
                    </td>

                    <td rowSpan={2}>{row.discharge_status_of_baby}</td>
                    <td rowSpan={2}>{row.referrals_from}</td>
                    <td rowSpan={2}>{row.referrals_to}</td>
                    <td rowSpan={2}>{row.reasons_for_refferal}</td>
                    <td rowSpan={2}>{row.comments}</td>
                  </tr>

                  <tr>
                    <td>{row.nupi}</td>
                    <td>{row.age}</td>
                    <td>{row.phone_number}</td>

                    <td>
                      {row.date_maternal_death_notified
                        ? new Date(row.date_maternal_death_notified).toLocaleDateString('en-GB')
                        : ''}
                    </td>

                    <td>{row.kangaroo_mother_care}</td>
                    <td>{row.type_of_deformity}</td>
                    <td>{row.hiv_test_type}</td>
                    <td>{row.hiv_test_type}</td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={moh333Columns.length}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </RegisterLayout>
  );
};

export default Moh333Register;
