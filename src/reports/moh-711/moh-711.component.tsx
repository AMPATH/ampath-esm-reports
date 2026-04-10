import React, { useState } from 'react';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';

import styles from './moh711.scss';
import classNames from 'classnames';
import { useSession } from '@openmrs/esm-framework';
import { getMoh711 } from '../../resources/moh-711.resource';
import { Loading } from '@carbon/react';

const Moh711Report: React.FC = () => {
  let errorMessage: string = '';
  const [moh711Data, setMoh711Data] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();
  const locationUuid = session?.sessionLocation?.uuid;
  const fetchMoh711ReportData = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
    setIsLoading(true);
    let startDate = filters.startDate;
    let endDate = filters.endDate;

    if (filters.month) {
      const [year, monthIndex] = filters.month.split('-').map(Number);

      const start = new Date(year, monthIndex - 1, 1);
      const end = new Date(year, monthIndex, 0);

      const formatLocalDate = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      startDate = formatLocalDate(start);
      endDate = formatLocalDate(end);
    }

    const params = {
      locationUuids: locationUuid || '',
      startDate,
      endDate,
    };
    try {
      const data = await getMoh711(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh711Data(flatData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch MOH-711 report data: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-711 Report"
        mode="monthly"
        onGenerate={fetchMoh711ReportData}
        isLoding={isLoading}
      />
      {isLoading && <Loading description="Fetching data...." />}
      {!isLoading && errorMessage && (
        <div>
          <a href="#" className="close" data-dismiss="alert">
            &times;
          </a>
          <h4>
            <strong>
              <span className="glyphicon glyphicon-warning-sign"></span>{' '}
            </strong>{' '}
            An error occurred while trying to load the report. Please try again.
          </h4>
          <p>
            <small>{errorMessage}</small>
          </p>
        </div>
      )}
      <h3>KHIS Aggregate</h3>
      <div className={styles.container}>
        <p className={styles.title}>A. ANC</p>
        <p className={styles.sectionTitle}>default</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>New ANC clients</td>
                <td>{moh711Data.new_anc_clients}</td>
              </tr>
              <tr>
                <td>Re-Visit ANC Clients</td>
                <td>{moh711Data.revisit_anc_clients}</td>
              </tr>
              <tr>
                <td>Clients given IPT 1st Dose</td>
                <td>{moh711Data.first_ipt_dose}</td>
              </tr>
              <tr>
                <td>Clients given IPT 2nd Dose</td>
                <td>{moh711Data.second_ipt_dose}</td>
              </tr>
              <tr>
                <td>Clients given IPT 3rd Dose</td>
                <td>{moh711Data.third_ipt_dose}</td>
              </tr>
              <tr>
                <td>Clients with Hb&lt;11g/dl</td>
                <td>{moh711Data.Hb_less_11g}</td>
              </tr>
              <tr>
                <td>No. clients with 1st ANC contact at 12 or less weeks</td>
                <td>{moh711Data.first_anc_contact_12_or_less_weeks}</td>
              </tr>
              <tr>
                <td>Pregnant women completing 4 ANC visits</td>
                <td>{moh711Data.completing_4_anc_visits}</td>
              </tr>
              <tr>
                <td>No. of clients completed 8th ANC Contact</td>
                <td>{moh711Data.completing_8_anc_contact}</td>
              </tr>
              <tr>
                <td>LLINs distributed to children &lt; 1 year</td>
                <td>{moh711Data.llins_children_less_than_one}</td>
              </tr>
              <tr>
                <td>LLINs distributed to ANC clients</td>
                <td>{moh711Data.llins_anc_clients}</td>
              </tr>
              <tr>
                <td>ANC clients testd for syphilis</td>
                <td>{moh711Data.anc_clients_tested_syphilis}</td>
              </tr>
              <tr>
                <td>ANC clients Syphilis +ve</td>
                <td>{moh711Data.syphilis_positive}</td>
              </tr>
              <tr>
                <td>Total Women Done Breast Examination</td>
                <td>{moh711Data.breast_exam}</td>
              </tr>
              <tr>
                <td>No. Adolesc. (10-14 years) Preg. At 1st ANC Visit</td>
                <td>{moh711Data.adolesc_10_14}</td>
              </tr>
              <tr>
                <td>No. Adolesc. (15-19 years) Preg At 1st ANC Visit</td>
                <td>{moh711Data.adolesc_15_19}</td>
              </tr>
              <tr>
                <td>Youth (20-24 years) presenting with pregnancy At 1st ANC Visit</td>
                <td>{moh711Data.youth_20_24}</td>
              </tr>
              <tr>
                <td>ANC Client given Iron</td>
                <td>{moh711Data.iron}</td>
              </tr>
              <tr>
                <td>ANC Client given folic</td>
                <td>{moh711Data.folic}</td>
              </tr>
              <tr>
                <td>ANC Client supplimented wiht Combined Iron and Folate</td>
                <td>{moh711Data.iron_and_folate}</td>
              </tr>
              <tr>
                <td>Pregnant women presenting in ANC with complication associated with FGM</td>
                <td>{moh711Data.fgm_complications}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>B. Maternity and Newborn</p>
        <p className={styles.sectionTitle}>default</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Normal Deliveries</td>
                <td>{moh711Data.normal_deliveries}</td>
              </tr>
              <tr>
                <td>Caesarean Sections</td>
                <td>{moh711Data.caesarian_sections}</td>
              </tr>
              <tr>
                <td>Breach Delivery</td>
                <td>{moh711Data.breach_delivery}</td>
              </tr>
              <tr>
                <td>Assisted Vaginal Delivery</td>
                <td>{moh711Data.assisted_vaginal_delivery}</td>
              </tr>
              <tr>
                <td>Mothers given uterotonics within 1 minute (Oxytocin)</td>
                <td>{moh711Data.oxytocin_uterotonic}</td>
              </tr>
              <tr>
                <td>Mothers given uterotonics within 1 minute (Carbatosin)</td>
                <td>{moh711Data.carbatocin_uterotonic}</td>
              </tr>
              <tr>
                <td>Live birth</td>
                <td>{moh711Data.live_birth}</td>
              </tr>
              <tr>
                <td>Low Birth Weight &lt; 2500gms</td>
                <td>{moh711Data.low_birth_weight}</td>
              </tr>
              <tr>
                <td>Births with low APGAR score</td>
                <td>{moh711Data.low_apgar_score}</td>
              </tr>
              <tr>
                <td>Birth with diformities</td>
                <td>{moh711Data.birth_with_deformity}</td>
              </tr>
              <tr>
                <td>Babies applied chlorhexidine for cord care</td>
                <td>{moh711Data.chlorhexidine_applied}</td>
              </tr>
              <tr>
                <td>Neonates given Vit "K"</td>
                <td>{moh711Data.vitamin_k}</td>
              </tr>
              <tr>
                <td>Babies given tetracycline at birth</td>
                <td>{moh711Data.tetracycline_given}</td>
              </tr>
              <tr>
                <td>Pre-term babies</td>
                <td>{moh711Data.pre_term_babies}</td>
              </tr>
              <tr>
                <td>Babies discharge Alive</td>
                <td>{moh711Data.discharge_alive}</td>
              </tr>
              <tr>
                <td>Infants initiated on breast feeding within 1 hour after birth</td>
                <td>{moh711Data.bf_within_1_hour}</td>
              </tr>
              <tr>
                <td>Deliveries from HIV+ve Women</td>
                <td>{moh711Data.deliveries_from_positive_women}</td>
              </tr>
              <tr>
                <td>Fresh Still Birth</td>
                <td>{moh711Data.fresh_still_birth}</td>
              </tr>
              <tr>
                <td>Macerated still Birth</td>
                <td>{moh711Data.macerated_still_birth}</td>
              </tr>
              <tr>
                <td>Perinatal Deaths 0-7 days</td>
                <td>{moh711Data.perinatal_deaths_0_7_days}</td>
              </tr>
              <tr>
                <td>Neonatal deaths 0-28 Days</td>
                <td>{moh711Data.neonatal_deaths_0_28_days}</td>
              </tr>
              <tr>
                <td>Maternal deaths 10-14 Years</td>
                <td>{moh711Data.maternal_deaths_10_14_years}</td>
              </tr>
              <tr>
                <td>Maternal deaths 15-19 Years</td>
                <td>{moh711Data.maternal_deaths_15_19_years}</td>
              </tr>
              <tr>
                <td>Maternal deaths 20-24 Years</td>
                <td>{moh711Data.maternal_deaths_20_24_years}</td>
              </tr>
              <tr>
                <td>Maternal deaths 25+ Years</td>
                <td>{moh711Data.maternal_deaths_25_above_years}</td>
              </tr>
              <tr>
                <td>Maternal Deaths Audited Within 7 Days</td>
                <td>{moh711Data.maternal_deaths_audited_within_7_days}</td>
              </tr>
              <tr>
                <td>Neonatal deaths audited within 7 days</td>
                <td>{moh711Data.neonatal_deaths_audited_within_7_days}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>B1. Maternal Complications</p>
        <p className={styles.sectionTitle}>AD</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>A</th>
                <th>D</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>APH (Ante partum Haemorrage)</td>
                <td>{moh711Data.ante_partum_haemorrage}</td>
                <td></td>
              </tr>
              <tr>
                <td>PPH (Post Partum Haemorrage)</td>
                <td></td>
                <td>{moh711Data.post_partum_haemorrage}</td>
              </tr>
              <tr>
                <td>Eclampsia</td>
                <td>{moh711Data.eclampsia}</td>
                <td></td>
              </tr>
              <tr>
                <td>Ruptured Uterus</td>
                <td></td>
                <td>{moh711Data.ruptured_uterus}</td>
              </tr>
              <tr>
                <td>Obstructed Labour</td>
                <td></td>
                <td>{moh711Data.obstructed_labour}</td>
              </tr>
              <tr>
                <td>Sepsis</td>
                <td></td>
                <td>{moh711Data.sepsis}</td>
              </tr>
              <tr>
                <td>Mothers with delivery complications associated with FGM</td>
                <td></td>
                <td>{moh711Data.fgm_delivery_complications}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>B2. Neonate Care and Outcome</p>
        <p className={styles.sectionTitle}>default</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Neonatal deaths due to Sepsis</td>
                <td>{moh711Data.neonatal_deaths_sepsis}</td>
              </tr>
              <tr>
                <td>Neonatal deaths due to Prematurity</td>
                <td>{moh711Data.neonatal_deaths_prematurity}</td>
              </tr>
              <tr>
                <td>Neonatal deaths due to Asphyxia</td>
                <td>{moh711Data.neonatal_deaths_asphyxia}</td>
              </tr>
              <tr>
                <td>Neonates initiated on Kangaroo Mother Care</td>
                <td>{moh711Data.kangaroo_mother_care}</td>
              </tr>
              <tr>
                <td>Maternal Referrals From Other Health Facility</td>
                <td>{moh711Data.referrals_from_other_health_facility}</td>
              </tr>
              <tr>
                <td>Maternal Referrals To Other Health Facility</td>
                <td>{moh711Data.referrals_to_other_health_facility}</td>
              </tr>
              <tr>
                <td>Maternal Referrals From Community Unit</td>
                <td>{moh711Data.referrals_from_community}</td>
              </tr>
              <tr>
                <td>Maternal Referrals To Community Unit</td>
                <td>{moh711Data.referrals_to_community}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>C. Sexual and Gender Based Violence</p>
        <p className={styles.sectionTitle}>0-9 yrs10-17 yrs18-49Yrs50 Yrs and above</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>0-9 yrs</th>
                <th>10-17 yrs</th>
                <th>18-49 Yrs</th>
                <th>50 Yrs and above</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SGBV Total Survivors Seen</td>
                <td>{moh711Data.sgbv_total_survivors_0_9}</td>
                <td>{moh711Data.sgbv_total_survivors_10_17}</td>
                <td>{moh711Data.sgbv_total_survivors_18_49}</td>
                <td>{moh711Data.sgbv_total_survivors_50_plus}</td>
              </tr>
              <tr>
                <td>SGBV cases presenting within 72 hours</td>
                <td>{moh711Data.sgbv_within_72_hours_0_9}</td>
                <td>{moh711Data.sgbv_within_72_hours_10_17}</td>
                <td>{moh711Data.sgbv_within_72_hours_18_49}</td>
                <td>{moh711Data.sgbv_within_72_hours_50_above}</td>
              </tr>
              <tr>
                <td>SGBV Eligible Survivors Initiated on PEP</td>
                <td>{moh711Data.sgbv_initiated_on_pep_0_9}</td>
                <td>{moh711Data.sgbv_initiated_on_pep_10_17}</td>
                <td>{moh711Data.sgbv_initiated_on_pep_18_49}</td>
                <td>{moh711Data.sgbv_initiated_on_pep_50_above}</td>
              </tr>
              <tr>
                <td>SGBV Eligible Survivors Completed PEP</td>
                <td>{moh711Data.sgbv_completed_pep_0_9}</td>
                <td>{moh711Data.sgbv_completed_pep_10_17}</td>
                <td>{moh711Data.sgbv_completed_pep_18_49}</td>
                <td>{moh711Data.sgbv_completed_pep_50_above}</td>
              </tr>
              <tr>
                <td>SGBV Rape survivors seroconverting 3 months after exposure</td>
                <td>{moh711Data.sgbv_seroconverting_0_9}</td>
                <td>{moh711Data.sgbv_seroconverting_10_17}</td>
                <td>{moh711Data.sgbv_seroconverting_18_49}</td>
                <td>{moh711Data.sgbv_seroconverting_50_above}</td>
              </tr>
              <tr>
                <td>SGBV Survivors eligible for ECP</td>
                <td>{moh711Data.sgbv_eligible_for_ecp_0_9}</td>
                <td>{moh711Data.sgbv_eligible_for_ecp_10_17}</td>
                <td>{moh711Data.sgbv_eligible_for_ecp_18_49}</td>
                <td>{moh711Data.sgbv_eligible_for_ecp_50_above}</td>
              </tr>
              <tr>
                <td>SGBV Survivors receiving ECP</td>
                <td>{moh711Data.sgbv_receiving_ecp_0_9}</td>
                <td>{moh711Data.sgbv_receiving_ecp_10_17}</td>
                <td>{moh711Data.sgbv_receiving_ecp_18_49}</td>
                <td>{moh711Data.sgbv_receiving_ecp_50_above}</td>
              </tr>
              <tr>
                <td>SGBV Rape/defilement survivors pregnant 4 weeks after exposure</td>
                <td>{moh711Data.sgbv_pregnant_0_9}</td>
                <td>{moh711Data.sgbv_pregnant_10_17}</td>
                <td>{moh711Data.sgbv_pregnant_18_49}</td>
                <td>{moh711Data.sgbv_pregnant_50_above}</td>
              </tr>
              <tr>
                <td>SGBV RC(Reproductive Coercion)/IPV(Intimate Partner Violence) clients seen</td>
                <td>{moh711Data.sgbv_rc_seen_0_9}</td>
                <td>{moh711Data.sgbv_rc_seen_10_17}</td>
                <td>{moh711Data.sgbv_rc_seen_18_49}</td>
                <td>{moh711Data.sgbv_rc_seen_50_above}</td>
              </tr>
              <tr>
                <td>SGBV Survivors with disability</td>
                <td>{moh711Data.sgbv_with_disability_0_9}</td>
                <td>{moh711Data.sgbv_with_disability_10_17}</td>
                <td>{moh711Data.sgbv_with_disability_18_49}</td>
                <td>{moh711Data.sgbv_with_disability_50_above}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>D. Family Planning</p>
        <p className={styles.sectionTitle}>New clientsRe-visits</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>New clients</th>
                <th>Re-visits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1st Ever Users of Contraceptive</td>
                <td>{moh711Data.first_users_contraceptive_new}</td>
                <td>{moh711Data.first_users_contraceptive_revisit}</td>
              </tr>
              <tr>
                <td>Pills progestine only</td>
                <td>{moh711Data.pills_progestine_new}</td>
                <td>{moh711Data.pills_progestine_revisit}</td>
              </tr>
              <tr>
                <td>Pills Combined oral contraceptive</td>
                <td>{moh711Data.pills_combined_oral_contraceptive_new}</td>
                <td>{moh711Data.pills_combined_oral_contraceptive_revisit}</td>
              </tr>
              <tr>
                <td>Emergency contraceptive pill</td>
                <td>{moh711Data.emergency_contraceptive_pill_new}</td>
                <td>{moh711Data.emergency_contraceptive_pill_revisit}</td>
              </tr>
              <tr>
                <td>FP Injections DMPA- IM</td>
                <td>{moh711Data.fp_injections_dmpa_im}</td>
                <td></td>
              </tr>
              <tr>
                <td>FP Injections DMPA- SC</td>
                <td>{moh711Data.fp_injections_dmpa_sc}</td>
                <td></td>
              </tr>
              <tr>
                <td>Client receiving Male condoms</td>
                <td>{moh711Data.male_condoms_new}</td>
                <td>{moh711Data.male_condoms_revisit}</td>
              </tr>
              <tr>
                <td>Client receiving Female condoms</td>
                <td>{moh711Data.female_condoms_new}</td>
                <td>{moh711Data.female_condoms_revisit}</td>
              </tr>
              <tr>
                <td>Client received (Both Male and Female condoms)</td>
                <td>{moh711Data.male_and_female_condoms_new}</td>
                <td>{moh711Data.male_and_female_condoms_revisit}</td>
              </tr>
              <tr>
                <td>Clients Counselled Natural Family Planning</td>
                <td>{moh711Data.counselled_for_natural_family_planning_new}</td>
                <td>{moh711Data.counselled_for_natural_family_planning_revisit}</td>
              </tr>
              <tr>
                <td>Clients given cycle beads</td>
                <td>{moh711Data.cycle_beads_new}</td>
                <td>{moh711Data.cycle_beads_revisit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>D1. Long Acting FP Methods</p>
        <p className={styles.sectionTitle}>1st Time InsertionRe-insertion</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>1st Time Insertion</th>
                <th>Re-insertion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Implants insertion 1 Rod</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Implants inerstion 2 Rod</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>IUCD Insertion Hormonal</td>
                <td>{moh711Data.iucd_hormonal}</td>
                <td></td>
              </tr>
              <tr>
                <td>IUCD Insertion Non Hormonal</td>
                <td>{moh711Data.iucd_non_hormonal}</td>
                <td></td>
              </tr>
              <tr>
                <td>Voluntary surgical contraception BTL</td>
                <td>{moh711Data.surgical_contraception_btl}</td>
                <td></td>
              </tr>
              <tr>
                <td>Voluntaru Surgical Contraception Vasectomy</td>
                <td>{moh711Data.vasectomy} </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>D2. FP Removals</p>
        <p className={styles.sectionTitle}>default</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IUCD Removals</td>
                <td>{moh711Data.iucd_removals}</td>
              </tr>
              <tr>
                <td>Implants Removal</td>
                <td>{moh711Data.implants_removal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>D3. Clients Receiving All FP Services</p>
        <p className={styles.sectionTitle}>New clientsRe-visits</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>New clients</th>
                <th>Re-visits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adolescent 10-14 yrs Receiving FP Services</td>
                <td>{moh711Data.fp_adolescent_10_14_new}</td>
                <td>{moh711Data.fp_adolescent_10_14_revisit}</td>
              </tr>
              <tr>
                <td>Adolescent 15-19 Yrs Receiving FP Services</td>
                <td>{moh711Data.fp_adolescent_15_19_new}</td>
                <td>{moh711Data.fp_adolescent_15_19_revisit}</td>
              </tr>
              <tr>
                <td>Adolescent 20-24 Yrs Receiving FP Services</td>
                <td>{moh711Data.fp_adolescent_20_24_new}</td>
                <td>{moh711Data.fp_adolescent_20_24_revisit}</td>
              </tr>
              <tr>
                <td>Adults 25+ receiving FP Services</td>
                <td>{moh711Data.fp_adolescent_25_plus_new}</td>
                <td>{moh711Data.fp_adolescent_25_plus_revisit}</td>
              </tr>
              <tr>
                <td>Post paturm FP within 48 Hours</td>
                <td>{moh711Data.post_partum_fp_48_hours_new}</td>
                <td>{moh711Data.post_partum_fp_48_hours_revisit}</td>
              </tr>
              <tr>
                <td>Post partum FP 4weeks to 6 weeks</td>
                <td>{moh711Data.post_partum_fp_4_6_weeks_new}</td>
                <td>{moh711Data.post_partum_fp_4_6_weeks_revisit}</td>
              </tr>
              <tr>
                <td>Clients receiving post abortion FP</td>
                <td>{moh711Data.post_abortion_fp_new}</td>
                <td>{moh711Data.post_abortion_fp_revisit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>E. PAC Services</p>
        <p className={styles.sectionTitle}>default</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adolescent (10-19yrs) Receiving PAC Services</td>
                <td></td>
              </tr>
              <tr>
                <td>Youth 20-24 yrs receiving PAC services</td>
                <td></td>
              </tr>
              <tr>
                <td>Receiving PAC 25yrs plus</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>F. Child Health and Nutrition Information Systsem (CHANIS)</p>
        <p className={styles.sectionTitle}>Male Female</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>Male</th>
                <th>Female</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Normal Weight for Age 0-&lt;6 months</td>
                <td>{moh711Data.normal_weight_0_6_months_male}</td>
                <td>{moh711Data.normal_weight_0_6_months_female}</td>
              </tr>
              <tr>
                <td>Underweight 0&lt;6 months</td>
                <td>{moh711Data.underweight_0_6_months_male}</td>
                <td>{moh711Data.underweight_0_6_months_female}</td>
              </tr>
              <tr>
                <td>Severely underweight 0&lt;6 months</td>
                <td>{moh711Data.severely_underweight_0_6_months_male}</td>
                <td>{moh711Data.severely_underweight_0_6_months_female}</td>
              </tr>
              <tr>
                <td>Overweight 0&lt;6 months</td>
                <td>{moh711Data.overweight_0_6_months_male}</td>
                <td>{moh711Data.overweight_0_6_months_female}</td>
              </tr>
              <tr>
                <td>Obese 0&lt;6 months</td>
                <td>{moh711Data.obese_0_6_months_male}</td>
                <td>{moh711Data.obese_0_6_months_female}</td>
              </tr>
              <tr>
                <td>Normal Weight for Age 6-23 months</td>
                <td>{moh711Data.normal_weight_6_23_months_male}</td>
                <td>{moh711Data.normal_weight_6_23_months_female}</td>
              </tr>
              <tr>
                <td>Underweight 6-23 months</td>
                <td>{moh711Data.underweight_6_23_months_male}</td>
                <td>{moh711Data.underweight_6_23_months_female}</td>
              </tr>
              <tr>
                <td>Severely underweight 6-23 months</td>
                <td>{moh711Data.severely_underweight_6_23_months_male}</td>
                <td>{moh711Data.severely_underweight_6_23_months_female}</td>
              </tr>
              <tr>
                <td>Overweight 6-23 months</td>
                <td>{moh711Data.overweight_6_23_months_male}</td>
                <td>{moh711Data.overweight_6_23_months_female}</td>
              </tr>
              <tr>
                <td>Obese 6-23 months</td>
                <td>{moh711Data.obese_6_23_months_male}</td>
                <td>{moh711Data.obese_6_23_months_female}</td>
              </tr>
              <tr>
                <td>Normal Weight for Age 24-59 Months</td>
                <td>{moh711Data.normal_weight_24_59_months_male}</td>
                <td>{moh711Data.normal_weight_24_59_months_female}</td>
              </tr>
              <tr>
                <td>Underweight 24-59 Months</td>
                <td>{moh711Data.underweight_24_59_months_male}</td>
                <td>{moh711Data.underweight_24_59_months_female}</td>
              </tr>
              <tr>
                <td>Severely underweight 24-59 months</td>
                <td>{moh711Data.severely_underweight_24_59_months_male}</td>
                <td>{moh711Data.severely_underweight_24_59_months_female}</td>
              </tr>
              <tr>
                <td>Overweight 24-59 months</td>
                <td>{moh711Data.overweight_24_59_months_male}</td>
                <td>{moh711Data.overweight_24_59_months_female}</td>
              </tr>
              <tr>
                <td>Obese 24-59 months</td>
                <td>{moh711Data.obese_24_59_months_male}</td>
                <td>{moh711Data.obese_24_59_months_female}</td>
              </tr>
              <tr>
                <td>MUAC 6-59 months Normal (Green)</td>
                <td>{moh711Data.muac_6_59_months_normal_male}</td>
                <td>{moh711Data.muac_6_59_months_normal_female}</td>
              </tr>
              <tr>
                <td>MUAC 6-59 months Moderate (Yellow)</td>
                <td>{moh711Data.muac_6_59_months_moderate_male}</td>
                <td>{moh711Data.muac_6_59_months_moderate_female}</td>
              </tr>
              <tr>
                <td>MUAC 6-59 months Severe (Red)</td>
                <td>{moh711Data.muac_6_59_months_severe_male}</td>
                <td>{moh711Data.muac_6_59_months_severe_female}</td>
              </tr>
              <tr>
                <td>0&lt;6 months Normal Height for Age</td>
                <td>{moh711Data.height_for_age_0_6_months_normal_male}</td>
                <td>{moh711Data.height_for_age_0_6_months_normal_female}</td>
              </tr>
              <tr>
                <td>0&lt;6 months Stunted</td>
                <td>{moh711Data.stunted_0_6_months_male}</td>
                <td>{moh711Data.stunted_0_6_months_female}</td>
              </tr>
              <tr>
                <td>0&lt;6 months Severely Stunted</td>
                <td>{moh711Data.severely_stunted_0_6_months_male}</td>
                <td>{moh711Data.severely_stunted_0_6_months_female}</td>
              </tr>
              <tr>
                <td>6-23 months Normal Height for Age</td>
                <td>{moh711Data.normal_height_for_age_6_23_months_male}</td>
                <td>{moh711Data.normal_height_for_age_6_23_months_female}</td>
              </tr>
              <tr>
                <td>6-23 months Stunted</td>
                <td>{moh711Data.stunted_6_23_months_male}</td>
                <td>{moh711Data.stunted_6_23_months_female}</td>
              </tr>
              <tr>
                <td>6-23 months Severely Stunted</td>
                <td>{moh711Data.severely_stunted_6_23_months_male}</td>
                <td>{moh711Data.severely_stunted_6_23_months_female}</td>
              </tr>
              <tr>
                <td>24-59 months Normal Height for Age</td>
                <td>{moh711Data.normal_height_for_age_24_59_months_male}</td>
                <td>{moh711Data.normal_height_for_age_24_59_months_female}</td>
              </tr>
              <tr>
                <td>24-59 months Stunted</td>
                <td>{moh711Data.stunted_24_59_months_male}</td>
                <td>{moh711Data.stunted_24_59_months_female}</td>
              </tr>
              <tr>
                <td>24-59 months Severely Stunted</td>
                <td>{moh711Data.severely_stunted_24_59_months_male}</td>
                <td>{moh711Data.severely_stunted_24_59_months_female}</td>
              </tr>
              <tr>
                <td>New Visits of 0-59 Month Attending CWC</td>
                <td>{moh711Data.new_visits_0_59_months_attending_cwc_male}</td>
                <td>{moh711Data.new_visits_0_59_months_attending_cwc_female}</td>
              </tr>
              <tr>
                <td>Kwashiorkor (0-59 Months)</td>
                <td>{moh711Data.kwashiokor_0_59_months_male}</td>
                <td>{moh711Data.kwashiokor_0_59_months_female}</td>
              </tr>
              <tr>
                <td>Marasmus (0-59 Months)</td>
                <td>{moh711Data.marasmus_0_59_months_male}</td>
                <td>{moh711Data.marasmus_0_59_months_female}</td>
              </tr>
              <tr>
                <td>Faltering Growth (0-59 Months)</td>
                <td>{moh711Data.faltering_growth_0_59_months_male}</td>
                <td>{moh711Data.faltering_growth_0_59_months_female}</td>
              </tr>
              <tr>
                <td>Exclusive breastfeeding 0&lt; months</td>
                <td>{moh711Data.exclusive_breastfeeding_0_6_months_male}</td>
                <td>{moh711Data.exclusive_breastfeeding_0_6_months_female}</td>
              </tr>
              <tr>
                <td>De-wormed 12-59 Months</td>
                <td>{moh711Data.dewormed_12_59_months_male}</td>
                <td>{moh711Data.dewormed_12_59_months_female}</td>
              </tr>
              <tr>
                <td>Children aged 6-23 months supplemented with MNPS</td>
                <td>{moh711Data.mnps_supplimentation_6_23_months_male}</td>
                <td>{moh711Data.mnps_supplimentation_6_23_months_female}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>F1. CHANIS Under Five Years</p>
        <p className={styles.sectionTitle}>Male Female</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>Male</th>
                <th>Female</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No. of children who have diarrhoea with severe dehydration</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>No. of children who have diarrhoea with some dehydration</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>No. of children who have diarrhoea with no dehydration</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Children under five years with diarrhoea treated with ORS and Zinc (Co-pack)</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Children under five years presenting with pneumonia treated wiht antibiotics (Amoxycillin (DT))</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Children under five deaths</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Under 5 Yers with any Kind of Disability</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Children under five years with delayed developmental milestones</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>G. Cervical cancer screening</p>
        <p className={styles.sectionTitle}>&lt;25 yrs25-49 Years50 Yrs and above</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>&lt;25 yrs</th>
                <th>25-49 Years</th>
                <th>50 Yrs and above</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Clients screen using VIA/VILI/HPV VILI/HPV</td>
                <td>{moh711Data.via_villi_hpv_less_25}</td>
                <td>{moh711Data.via_villi_hpv_25_49}</td>
                <td>{moh711Data.via_villi_hpv_50_above}</td>
              </tr>
              <tr>
                <td>Clients screened using Pap smear</td>
                <td>{moh711Data.pap_smear_less_25}</td>
                <td>{moh711Data.pap_smear_25_49}</td>
                <td>{moh711Data.pap_smear_50_above}</td>
              </tr>
              <tr>
                <td>Clients screend for Cervical Cancer using HPV test</td>
                <td>{moh711Data.hpv_test_less_25}</td>
                <td>{moh711Data.hpv_test_25_49}</td>
                <td>{moh711Data.hpv_test_50_above}</td>
              </tr>
              <tr>
                <td>Cevical cancer clients with Positive VIA/VILI results</td>
                <td>{moh711Data.positive_via_villi_less_25}</td>
                <td>{moh711Data.positive_via_villi_25_49}</td>
                <td>{moh711Data.positive_via_villi_50_above}</td>
              </tr>
              <tr>
                <td>Cervical cancer clients with Positive Cytology result</td>
                <td>{moh711Data.positive_cytology_less_25}</td>
                <td>{moh711Data.positive_cytology_25_49}</td>
                <td>{moh711Data.positive_cytology_50_above}</td>
              </tr>
              <tr>
                <td>Cervical cancer clients with Positive HPV results</td>
                <td>{moh711Data.positive_hpv_less_25}</td>
                <td>{moh711Data.positive_hpv_25_49}</td>
                <td>{moh711Data.positive_hpv_50_above}</td>
              </tr>
              <tr>
                <td>Clients with suspicious cancer lessions</td>
                <td>{moh711Data.suspicious_cancer_lessions_less_25}</td>
                <td>{moh711Data.suspicious_cancer_lessions_25_49}</td>
                <td>{moh711Data.suspicious_cancer_lessions_50_above}</td>
              </tr>
              <tr>
                <td>Cervical cancer clients treated using Cryotherapy</td>
                <td>{moh711Data.cryotherapy_treatment_less_25}</td>
                <td>{moh711Data.cryotherapy_treatment_25_49}</td>
                <td>{moh711Data.cryotherapy_treatment_50_above}</td>
              </tr>
              <tr>
                <td>Cervical cancer treated using LEEP</td>
                <td>{moh711Data.leep_treatment_less_25}</td>
                <td>{moh711Data.leep_treatment_25_49}</td>
                <td>{moh711Data.leep_treatment_50_above}</td>
              </tr>
              <tr>
                <td>HIV positive clients screened for cervical cancer</td>
                <td>{moh711Data.hiv_positive_screened_cervical_cancer_less_25}</td>
                <td>{moh711Data.hiv_positive_screened_cervical_cancer_25_49}</td>
                <td>{moh711Data.hiv_positive_screened_cervical_cancer_50_above}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>H. Post Natal Care (PNC)</p>
        <p className={styles.sectionTitle}>default</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PNC Clients New</td>
                <td>{moh711Data.pnc_new_clients}</td>
              </tr>
              <tr>
                <td>PNC Clients revisits</td>
                <td>{moh711Data.pnc_revisit_clients}</td>
              </tr>
              <tr>
                <td>PNC Women counselled on Post Partum FP</td>
                <td>{moh711Data.women_couselled_on_post_partum_fp}</td>
              </tr>
              <tr>
                <td>PNC Clients who received Post Partum FP</td>
                <td>{moh711Data.women_received_post_partum_fp}</td>
              </tr>
              <tr>
                <td>Mothers receiving Postpartum Care within 48 hours</td>
                <td>{moh711Data.mothers_post_partum_care_48_hours}</td>
              </tr>
              <tr>
                <td>Mothers receiving Postpartum Care 3 days to 6 weeks</td>
                <td>{moh711Data.mothers_post_partum_care_3_6_weeks}</td>
              </tr>
              <tr>
                <td>Mothers receiving Postpartum Care after 6 weeks</td>
                <td>{moh711Data.mothers_post_partum_care_after_6_weeks}</td>
              </tr>
              <tr>
                <td>Infants receiving Postpartum care within 48 hours</td>
                <td>{moh711Data.infants_post_partum_care_48_hours}</td>
              </tr>
              <tr>
                <td>Infants receiving Postpartum care Between 3 days to 6 weeks</td>
                <td>{moh711Data.infants_post_partum_care_3_6_weeks}</td>
              </tr>
              <tr>
                <td>Infants receiving Postpartum care after 6 weeks</td>
                <td>{moh711Data.infants_post_partum_care_after_6_weeks}</td>
              </tr>
              <tr>
                <td>PNC fistula cases</td>
                <td>{moh711Data.fistula_cases}</td>
              </tr>
              <tr>
                <td>PNC referrals From Community Unit</td>
                <td>{moh711Data.referrals_from_community}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>I. Rehabilitation Services</p>
        <p className={styles.sectionTitle}>default</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rehab clients assessed</td>
                <td></td>
              </tr>
              <tr>
                <td>Rehab clients treated</td>
                <td></td>
              </tr>
              <tr>
                <td>Number Rehabilitated</td>
                <td></td>
              </tr>
              <tr>
                <td>Rehab clients referred for further interventions</td>
                <td></td>
              </tr>
              <tr>
                <td>Rehab clients integrated in the community</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>J. Medical Social Work/ Mental Health</p>
        <p className={styles.sectionTitle}>default</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Psycho-Social Counselling</td>
                <td>{moh711Data.psycho_social_counselling}</td>
              </tr>
              <tr>
                <td>Alcohol and Drug Abuse</td>
                <td>{moh711Data.alcohol_and_drug_abuse}</td>
              </tr>
              <tr>
                <td>Mental illness</td>
                <td>{moh711Data.mental_illness}</td>
              </tr>
              <tr>
                <td>Adolescent Issues</td>
                <td>{moh711Data.adolescent_issues}</td>
              </tr>
              <tr>
                <td>Psycho-Social Assessment (psycho, social and economic)</td>
                <td>{moh711Data.psycho_social_economic_assessment}</td>
              </tr>
              <tr>
                <td>Social investigations (Home visits / Follow ups)</td>
                <td>{moh711Data.social_investigations}</td>
              </tr>
              <tr>
                <td>Psycho-Social Rehabilitation</td>
                <td>{moh711Data.psycho_social_rehabilitation}</td>
              </tr>
              <tr>
                <td>Outreach Services / Health Talks</td>
                <td>{moh711Data.outreach_services}</td>
              </tr>
              <tr>
                <td>Mental Health Referrals</td>
                <td>{moh711Data.mental_health_referral}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>K. Physiotherapy Service</p>
        <p className={styles.sectionTitle}>&lt;5 yrs5-19 yrs&gt; 20 yrs</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>&lt;5 yrs</th>
                <td>5-19 yrs</td>
                <th>&gt;20 yrs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PWDs idenntified and receiving physiotherapy from OPD</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>PWDs idenntified and receiving physiotherapy from IPD</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Number of other clients/patients receiving physiotherapy in OPD</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Number of other clients/patients receiving physiotherapy in IPD</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Total Number of treatments</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>PWDs assessed for registration</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>L. Other FIF</p>
        <p className={styles.sectionTitle}>default</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Amount of FIF Collected</td>
                <td></td>
              </tr>
              <tr>
                <td>Amount of FIF Waived</td>
                <td></td>
              </tr>
              <tr>
                <td>Amount of FIF Exempted</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>M. TB Screening</p>
        <p className={styles.sectionTitle}>default</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <td></td>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total Screened for TB</td>
                <td>{moh711Data.total_screened_for_tb}</td>
              </tr>
              <tr>
                <td>Total Presumptive TB Cases</td>
                <td>{moh711Data.total_presumptive_tb_cases}</td>
              </tr>
              <tr>
                <td>Total already on TB Treatment</td>
                <td>{moh711Data.already_on_tb_treatment}</td>
              </tr>
              <tr>
                <td>Total Not Screened for TB</td>
                <td>{moh711Data.not_screened_for_tb}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Moh711Report;
