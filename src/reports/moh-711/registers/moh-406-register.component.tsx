import { Button, Loading } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import styles from '../moh711.scss';
import classNames from 'classnames';
import { getMoh406PatientList } from '../../../resources/moh-711.resource';
import { moh406Columns } from './type';

const Moh406Register: React.FC = () => {
  const navigate = useNavigate();

  const [patientlist, setPatientList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator');
  const reportName = location.state?.reportName || '';

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate || !locationUuids || !indicator) return;

      setIsLoading(true);

      try {
        const params = {
          startDate,
          endDate,
          locationUuids,
          indicator,
          reportName,
        };

        const data = await getMoh406PatientList(params);

        setPatientList(data?.results.results || []);
      } catch (error) {
        console.error('Failed to fetch register data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, locationUuids, indicator, reportName]);
  function navigateBack() {
    navigate('/moh-711');
  }
  return (
    <>
      <div className={styles.buttonContainer}>
        <Button onClick={navigateBack}>Back</Button>
      </div>
      <div>{isLoading && <Loading />}</div>
      <div className={styles.tableContainer}>
        <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <thead>
            <tr>
              <th colSpan={8}>Registration Information</th>
              <th colSpan={3}>Maternity History</th>
              <th colSpan={2}>Postpartum Visit</th>
              <th colSpan={3}>Vital Signs</th>
              <th colSpan={8}>Postnatal Examinations</th>
              <th>TB screening</th>
              <th colSpan={6}></th>
              <th colSpan={4}>HAART & Infant Prophylaxis and Treatment</th>
              <th>
                Cervical Cancer
                <br />
                Screening
                <br />
                (VIA/VILLI/PAP
                <br />
                Smear/ND)
              </th>
              <th>
                Modern Post
                <br />
                Partum Family
                <br />
                Planning
                <br />
                (Y/N)
              </th>
              <th>
                Other Maternal
                <br />
                Complications
              </th>
              <th>
                Haematinics
                <br />
                (Y/N)
              </th>
              <th colSpan={3}>Refferals</th>
              <th rowSpan={7}>Remarks</th>
            </tr>
            <tr>
              <th rowSpan={6}>
                Date of Visit
                <br />
                (dd/mm/yyyy)
              </th>
              <th>
                PNC Number
                <br />
                (New Visit)
              </th>
              <th rowSpan={6}>
                PNC Number/NUPI <br />
                (Revisit)
              </th>
              <th rowSpan={6}>AMRSID</th>
              <th rowSpan={6}>
                Full Name(first name, middle and <br />
                surname)
              </th>
              <th>
                Date of Birth
                <br />
                (dd/mm/yyyy)
              </th>
              <th rowSpan={6}>
                County/ <br />
                SubCounty
              </th>
              <th>Village/Estate/ Landmark</th>
              <th rowSpan={6}>
                Date of Delivery
                <br />
                (dd/mm/yyyy)
              </th>
              <th rowSpan={6}>
                Place of <br />
                Delivery
                <br />
                1)Facility <br />
                2) Home
                <br />
                3) BBA
              </th>
              <th rowSpan={6}>
                Mode of
                <br />
                Delivery
                <br />
                1) SVD
                <br />
                2) CS
                <br />
                3) Breech
                <br />
                4) AVD
              </th>
              <th>
                Timing <br />
                Mother
              </th>
              <th>Timing Baby</th>
              <th rowSpan={6}>Temp</th>
              <th rowSpan={6}>Pulse</th>
              <th rowSpan={6}>
                Blood <br />
                Pressure
              </th>
              <th>
                Pallor
                <br />
                (Y/N)
              </th>
              <th rowSpan={6}>
                Breast <br />
                1=normal <br />
                2= cracked
                <br />
                nipple
                <br />
                3=engorged <br />
                4=mastitis
              </th>
              <th rowSpan={6}>
                Uterus <br />
                1=
                <br />
                contracte d<br />
                2= not
                <br />
                contracte d <br />
                3= Others
                <br />
                Specify
              </th>
              <th rowSpan={6}>
                PPH <br />
                1=present
                <br />
                2=Absent
              </th>
              <th rowSpan={6}>
                C-Section Site <br />
                1=Bleeding <br />
                2=Normal <br />
                3=Infected
                <br />
                4=Gapping <br />
                5=N/A
              </th>
              <th rowSpan={6}>
                Lochia <br />
                1=Normal <br />
                2=Foul <br />
                smelling <br />
                3=Excessi <br />
                ve
              </th>
              <th rowSpan={6}>
                Episiotomy <br />
                1=Repaired <br />
                2=Gaping <br />
                3=Infected <br />
                4=Healed <br />
                5=N/
              </th>
              <th rowSpan={6}>
                Fistula <br />
                1=VVF <br />
                2=RVF <br />
                3=VVR <br />
                4=Non
              </th>
              <th>
                TB Screening
                <br />
                1: Presumed TB
                <br />
                2: No signs
                <br />
                3: On TB treatment
                <br />
                4: On TPT
                <br />
                5: Not done
              </th>
              <th>Tested PNC</th>
              <th>HIV Test 1</th>
              <th>HIV Test 2</th>
              <th>HIV Test 3</th>
              <th colSpan={2}>Results in PNC</th>
              <th colSpan={2}>&le;6wks</th>
              <th colSpan={2}>&gt;6wks</th>
              <th>
                Results
                <br />
                1=Normal,
                <br />
                2=Suspected,
                <br />
                3= Confirmed,
                <br />
                4= Not done
              </th>
              <th>
                Counseled <br />
                Method received
              </th>
              <th rowSpan={6}></th>
              <th rowSpan={6}></th>
              <th>From</th>
              <th>To</th>
              <th>
                Reasons for <br />
                referral <br />
                (specify)
              </th>
            </tr>
            <tr>
              <th rowSpan={6}>NUPI</th>
              <th rowSpan={6}>Age in Years</th>
              <th rowSpan={6}>Telephone number</th>
              <th rowSpan={5}>
                1=no change, <br />
                2=10 days to
                <br />
                14 days; <br />
                3=4 to 6 <br />
                weeks; <br />
                4=4 to 6 <br />
                months
              </th>
              <th rowSpan={5}>
                1=no change,
                <br />
                2=10 days to <br />
                14 days; <br />
                3=4 to 6 <br />
                weeks; <br />
                4=4 to 6 <br />
                months
              </th>
              <th rowSpan={5}>
                1= mild;
                <br />
                2= moderate;
                <br />
                3= severe
              </th>
              <th rowSpan={5}></th>
              <th rowSpan={5}>(I/R/ND/KP)</th>
              <th>Kit Name:</th>
              <th>Kit Name:</th>
              <th>Kit Name:</th>
              <th>&le;6wks</th>
              <th>&gt;6wks</th>
              <th>Infant</th>
              <th>Mother</th>
              <th>Infant</th>
              <th>Mother</th>
              <th rowSpan={5}></th>
              <th rowSpan={5}></th>
              <th>
                1 = Community Unit
                <br />
                2 = Another Health
                <br />
                Facility
                <br />3 = Not Applicable
              </th>
              <th>
                1 = Community Unit
                <br />
                <br />
                2 = Another Health
                <br />
                Facility
                <br />3 = Not Applicable
              </th>
              <th rowSpan={5}></th>
            </tr>
            <tr>
              <th>Lot No.</th>
              <th>Lot No.</th>
              <th>Lot No.</th>
              <th rowSpan={4}>(N/P/Ic/NA)</th>
              <th rowSpan={4}>(N/P/Ic/NA)</th>
              <th>
                NVP +AZT
                <br />
                +CTX
                <br />
                or
                <br />
                NVP +CTX
              </th>
              <th>HAART</th>
              <th>
                NVP +AZT
                <br />
                +CTX
                <br />
                or
                <br />
                NVP +CTX
              </th>
              <th>HAART</th>
              <th rowSpan={4}></th>
              <th rowSpan={4}></th>
            </tr>
            <tr>
              <th>Expiry No. / /</th>
              <th>Expiry No. / /</th>
              <th>Expiry No. / /</th>
              <th rowSpan={3}>(Y/N/NA/R)</th>
              <th rowSpan={3}>(Y/N/NA/R)</th>
              <th rowSpan={3}>(Y/N/NA/R)</th>
              <th rowSpan={3}>(Y/N/NA/R)</th>
            </tr>
            <tr>
              <th rowSpan={2}>(N,P,I,NA)</th>
              <th rowSpan={2}>(N,P,I,NA)</th>
              <th rowSpan={2}>(N,P,I,NA)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.textCenter}>(a)</td>
              <td className={styles.textCenter}>(b)</td>
              <td className={styles.textCenter}>(c)</td>
              <td className={styles.textCenter}>(d)</td>
              <td className={styles.textCenter}>(e)</td>
              <td className={styles.textCenter}>(f)</td>
              <td className={styles.textCenter}>(g)</td>
              <td className={styles.textCenter}>(h)</td>
              <td className={styles.textCenter}>(i)</td>
              <td className={styles.textCenter}>(j)</td>
              <td className={styles.textCenter}>(k)</td>
              <td className={styles.textCenter}>(l)</td>
              <td className={styles.textCenter}>(m)</td>
              <td className={styles.textCenter}>(n)</td>
              <td className={styles.textCenter}>(o)</td>
              <td className={styles.textCenter}>(p)</td>
              <td className={styles.textCenter}>(q)</td>
              <td className={styles.textCenter}>(r)</td>
              <td className={styles.textCenter}>(s)</td>
              <td className={styles.textCenter}>(t)</td>
              <td className={styles.textCenter}>(u)</td>
              <td className={styles.textCenter}>(v)</td>
              <td className={styles.textCenter}>(w)</td>
              <td className={styles.textCenter}>(x)</td>
              <td className={styles.textCenter}>(y)</td>
              <td className={styles.textCenter}>(z)</td>
              <td className={styles.textCenter}>(aa)</td>
              <td className={styles.textCenter}>(ab)</td>
              <td className={styles.textCenter}>(ac)</td>
              <td className={styles.textCenter}>(ad)</td>
              <td className={styles.textCenter}>(ae)</td>
              <td className={styles.textCenter}>(af)</td>
              <td className={styles.textCenter}>(ag)</td>
              <td className={styles.textCenter}>(ah)</td>
              <td className={styles.textCenter}>(ai)</td>
              <td className={styles.textCenter}>(aj)</td>
              <td className={styles.textCenter}>(ak)</td>
              <td className={styles.textCenter}>(al)</td>
              <td className={styles.textCenter}>(am)</td>
              <td className={styles.textCenter}>(an)</td>
              <td className={styles.textCenter}>(ao)</td>
              <td className={styles.textCenter}>(ap)</td>
              <td className={styles.textCenter}>(aq)</td>
            </tr>
            {patientlist?.length > 0 ? (
              patientlist.map((patient, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td rowSpan={2}>
                      {patient.date_of_visit ? new Date(patient.date_of_visit).toLocaleDateString('en-GB') : ''}
                    </td>
                    <td>{patient.pnc_number}</td>
                    <td rowSpan={2}>{patient.pnc_number}</td>
                    <td rowSpan={2}>{patient.amrsID}</td>
                    <td rowSpan={2}>{patient.full_names}</td>

                    <td>{patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString('en-GB') : ''}</td>

                    <td rowSpan={2}>{patient.subcounty_county}</td>
                    <td>{patient.village_estate_landmark}</td>

                    <td rowSpan={2}>
                      {patient.date_of_delivery ? new Date(patient.date_of_delivery).toLocaleDateString('en-GB') : ''}
                    </td>

                    <td rowSpan={2}>{patient.place_of_delivery}</td>
                    <td rowSpan={2}>{patient.mode_of_delivery}</td>
                    <td rowSpan={2}>{patient.timing_mother}</td>
                    <td rowSpan={2}>{patient.timing_baby}</td>
                    <td rowSpan={2}>{patient.temperature}</td>
                    <td rowSpan={2}>{patient.pulse}</td>
                    <td rowSpan={2}>{patient.blood_pressure}</td>

                    <td>{patient.pallor_present}</td>

                    <td rowSpan={2}>{patient.breast}</td>
                    <td rowSpan={2}>{patient.uterus}</td>
                    <td rowSpan={2}>{patient.pph}</td>
                    <td rowSpan={2}>{patient.c_section_site}</td>
                    <td rowSpan={2}>{patient.lochia}</td>
                    <td rowSpan={2}>{patient.episiotomy}</td>
                    <td rowSpan={2}>{patient.fistula}</td>
                    <td rowSpan={2}>{patient.tb_screening}</td>
                    <td rowSpan={2}>{patient.tested_pnc}</td>

                    <td rowSpan={2}>
                      {patient.hiv_test_1_kit_name} / {patient.hiv_test_1_lot_no} / {patient.hiv_test_1_expiry_date} /{' '}
                      {patient.hiv_test_1_test_result}
                    </td>

                    <td rowSpan={2}>
                      {patient.hiv_test_2_kit_name} / {patient.hiv_test_2_lot_no} / {patient.hiv_test_2_expiry_date} /{' '}
                      {patient.hiv_test_2_test_result}
                    </td>

                    <td rowSpan={2}>
                      {patient.hiv_test_3_kit_name} / {patient.hiv_test_3_lot_no} / {patient.hiv_test_3_expiry_date} /{' '}
                      {patient.hiv_test_3_test_result}
                    </td>

                    <td rowSpan={2}>{patient.results_less_6_weeks}</td>
                    <td rowSpan={2}>{patient.results_greater_6_weeks}</td>
                    <td rowSpan={2}>{patient.infant_prophylaxis_less_6_weeks}</td>
                    <td rowSpan={2}>{patient.maternal_haart_less_6_weeks}</td>
                    <td rowSpan={2}>{patient.infant_prophylaxis_greater_6_weeks}</td>
                    <td rowSpan={2}>{patient.maternal_haart_greater_6_weeks}</td>

                    <td>{patient.cervical_cancer_method}</td>
                    <td>{patient.counselled}</td>

                    <td rowSpan={2}>{patient.other_maternal_complications}</td>
                    <td rowSpan={2}>{patient.haematinics}</td>
                    <td rowSpan={2}>{patient.referrals_from}</td>
                    <td rowSpan={2}>{patient.referrals_to}</td>
                    <td rowSpan={2}>{patient.reason_for_referral}</td>
                    <td rowSpan={2}>{patient.remarks}</td>
                  </tr>

                  <tr>
                    <td>{patient.nupi}</td>
                    <td>{patient.age}</td>
                    <td>{patient.phone_number}</td>
                    <td>{patient.pallor}</td>
                    <td>{patient.cervical_cancer_results}</td>
                    <td>{patient.family_planning_method}</td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={moh406Columns.length} className={styles.textCenter}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Moh406Register;
