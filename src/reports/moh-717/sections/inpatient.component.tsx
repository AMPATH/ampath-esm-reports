import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

interface InpatientComponentProps {
  moh717ReportData: any;
}

const InpatientComponent = ({ moh717ReportData }: InpatientComponentProps) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={2}>B.1 INPATIENTS</th>
            <th className={styles.rotateUp}>MEDICAL</th>
            <th className={styles.rotateUp}>SURGICAL</th>
            <th className={styles.rotateUp}>OBST/GYN</th>
            <th className={styles.rotateUp}>PAEDIATRICS</th>
            <th className={styles.rotateUp}>MATERNITY</th>
            <th className={styles.rotateUp}>EYE</th>
            <th className={styles.rotateUp}>
              NURSERY/
              <br />
              NEWBORN
            </th>
            <th className={styles.rotateUp}>ORTHOPAEDIC</th>
            <th className={styles.rotateUp}>ISOLATION</th>
            <th className={styles.rotateUp}>AMENITY</th>
            <th className={styles.rotateUp}>PSYCHIATRY</th>
            <th className={styles.rotateUp}>ICU</th>
            <th className={styles.rotateUp}>RENAL</th>
            <th className={styles.rotateUp}>OTHER</th>
            <th className={styles.rotateUp}>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>B.1.1</td>
            <td>Discharges</td>
            <td>{moh717ReportData.medical_discharges}</td>
            <td>{moh717ReportData.surgical_discharges}</td>
            <td>{moh717ReportData.obst_gyn_discharges}</td>
            <td>{moh717ReportData.paediatrics_discharges}</td>
            <td>{moh717ReportData.maternity_discharges}</td>
            <td>{moh717ReportData.eye_discharges}</td>
            <td>{moh717ReportData.nursery_newborn_discharges}</td>
            <td>{moh717ReportData.orthopaedic_discharges}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.2</td>
            <td>Deaths</td>
            <td>{moh717ReportData.medical_deaths}</td>
            <td>{moh717ReportData.surgical_deaths}</td>
            <td>{moh717ReportData.obst_gyn_deaths}</td>
            <td>{moh717ReportData.paediatrics_deaths}</td>
            <td>{moh717ReportData.maternity_deaths}</td>
            <td>{moh717ReportData.eye_deaths}</td>
            <td>{moh717ReportData.nursery_newborn_deaths}</td>
            <td>{moh717ReportData.orthopaedic_deaths}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.3</td>
            <td>Abscondees</td>
            <td>{moh717ReportData.medical_abscondees}</td>
            <td>{moh717ReportData.surgical_abscondees}</td>
            <td>{moh717ReportData.obst_gyn_abscondees}</td>
            <td>{moh717ReportData.paediatrics_abscondees}</td>
            <td>{moh717ReportData.maternity_abscondees}</td>
            <td>{moh717ReportData.eye_abscondees}</td>
            <td>{moh717ReportData.nursery_newborn_abscondees}</td>
            <td>{moh717ReportData.orthopaedic_abscondees}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.4</td>
            <td>Referrals Out of the Facility</td>
            <td>{moh717ReportData.medical_referrals_out_of_facility}</td>
            <td>{moh717ReportData.surgical_referrals_out_of_facility}</td>
            <td>{moh717ReportData.obst_gyn_referrals_out_of_facility}</td>
            <td>{moh717ReportData.paediatrics_referrals_out_of_facility}</td>
            <td>{moh717ReportData.maternity_referrals_out_of_facility}</td>
            <td>{moh717ReportData.eye_referrals_out_of_facility}</td>
            <td>{moh717ReportData.nursery_newborn_referrals_out_of_facility}</td>
            <td>{moh717ReportData.orthopaedic_referrals_out_of_facility}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td className={styles.totals}>B.1.5</td>
            <td className={styles.totals}>TOTAL DISCHARGES, DEATHS, etc.</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
            <td className={styles.totals}>{}</td>
          </tr>
          <tr>
            <td className={styles.totals}>B.1.6</td>
            <td colSpan={16} className={styles.totals}>
              Admissions
            </td>
          </tr>
          <tr>
            <td>B.1.7a</td>
            <td>Admissions Under Five</td>
            <td>{moh717ReportData.medical_admissions_under_five}</td>
            <td>{moh717ReportData.surgical_admissions_under_five}</td>
            <td>{moh717ReportData.obst_gyn_admissions_under_five}</td>
            <td>{moh717ReportData.paediatrics_admissions_under_five}</td>
            <td>{moh717ReportData.maternity_admissions_under_five}</td>
            <td>{moh717ReportData.eye_admissions_under_five}</td>
            <td>{moh717ReportData.nursery_newborn_admissions_under_five}</td>
            <td>{moh717ReportData.orthopaedic_admissions_under_five}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.7b</td>
            <td>Admissions Over Five</td>
            <td>{moh717ReportData.medical_admissions_over_five}</td>
            <td>{moh717ReportData.surgical_admissions_over_five}</td>
            <td>{moh717ReportData.obst_gyn_admissions_over_five}</td>
            <td>{moh717ReportData.paediatrics_admissions_over_five}</td>
            <td>{moh717ReportData.maternity_admissions_over_five}</td>
            <td>{moh717ReportData.eye_admissions_over_five}</td>
            <td>{moh717ReportData.nursery_newborn_admissions_over_five}</td>
            <td>{moh717ReportData.orthopaedic_admissions_over_five}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.8</td>
            <td>Paroles</td>
            <td>{moh717ReportData.medical_paroles}</td>
            <td>{moh717ReportData.surgical_paroles}</td>
            <td>{moh717ReportData.obst_gyn_paroles}</td>
            <td>{moh717ReportData.paediatrics_paroles}</td>
            <td>{moh717ReportData.maternity_paroles}</td>
            <td>{moh717ReportData.eye_paroles}</td>
            <td>{moh717ReportData.nursery_newborn_paroles}</td>
            <td>{moh717ReportData.orthopaedic_paroles}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.9</td>
            <td>Occupied Bed Days -NHIF Members/ And other insurers</td>
            <td>{moh717ReportData.medical_occupied_bed_days_sha_members}</td>
            <td>{moh717ReportData.surgical_occupied_bed_days_sha_members}</td>
            <td>{moh717ReportData.obst_gyn_occupied_bed_days_sha_members}</td>
            <td>{moh717ReportData.paediatrics_occupied_bed_days_sha_members}</td>
            <td>{moh717ReportData.maternity_occupied_bed_days_sha_members}</td>
            <td>{moh717ReportData.eye_occupied_bed_days_sha_members}</td>
            <td>{moh717ReportData.nursery_newborn_occupied_bed_days_sha_members}</td>
            <td>{moh717ReportData.orthopaedic_occupied_bed_days_sha_members}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.1O</td>
            <td>Occupied Bed Days- Cash</td>
            <td>{moh717ReportData.medical_occupied_bed_days_non_sha_members}</td>
            <td>{moh717ReportData.surgical_occupied_bed_days_non_sha_members}</td>
            <td>{moh717ReportData.obst_gyn_occupied_bed_days_non_sha_members}</td>
            <td>{moh717ReportData.paediatrics_occupied_bed_days_non_sha_members}</td>
            <td>{moh717ReportData.maternity_occupied_bed_days_non_sha_members}</td>
            <td>{moh717ReportData.eye_occupied_bed_days_non_sha_members}</td>
            <td>{moh717ReportData.nursery_newborn_occupied_bed_days_non_sha_members}</td>
            <td>{moh717ReportData.orthopaedic_occupied_bed_days_non_sha_members}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.11</td>
            <td>Well Persons Days</td>
            <td>{moh717ReportData.medical_well_persons_days}</td>
            <td>{moh717ReportData.surgical_well_persons_days}</td>
            <td>{moh717ReportData.obst_gyn_well_persons_days}</td>
            <td>{moh717ReportData.paediatrics_well_persons_days}</td>
            <td>{moh717ReportData.maternity_well_persons_days}</td>
            <td>{moh717ReportData.eye_well_persons_days}</td>
            <td>{moh717ReportData.nursery_newborn_well_persons_days}</td>
            <td>{moh717ReportData.orthopaedic_well_persons_days}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.12</td>
            <td>Beds- Authorized</td>
            <td>{moh717ReportData.medical_authorised_beds}</td>
            <td>{moh717ReportData.surgical_authorised_beds}</td>
            <td>{moh717ReportData.obst_gyn_authorised_beds}</td>
            <td>{moh717ReportData.paediatrics_authorised_beds}</td>
            <td>{moh717ReportData.maternity_authorised_beds}</td>
            <td>{moh717ReportData.eye_authorised_beds}</td>
            <td>{moh717ReportData.nursery_newborn_authorised_beds}</td>
            <td>{moh717ReportData.orthopaedic_authorised_beds}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.13</td>
            <td>Beds- Actual Physical</td>
            <td>{moh717ReportData.medical_actual_physical_beds}</td>
            <td>{moh717ReportData.surgical_actual_physical_beds}</td>
            <td>{moh717ReportData.obst_gyn_actual_physical_beds}</td>
            <td>{moh717ReportData.paediatrics_actual_physical_beds}</td>
            <td>{moh717ReportData.maternity_actual_physical_beds}</td>
            <td>{moh717ReportData.eye_actual_physical_beds}</td>
            <td>{moh717ReportData.nursery_newborn_actual_physical_beds}</td>
            <td>{moh717ReportData.orthopaedic_actual_physical_beds}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.14</td>
            <td>Cots- Authorised</td>
            <td>{moh717ReportData.medical_authorised_cots}</td>
            <td>{moh717ReportData.surgical_authorised_cots}</td>
            <td>{moh717ReportData.obst_gyn_authorised_cots}</td>
            <td>{moh717ReportData.paediatrics_authorised_cots}</td>
            <td>{moh717ReportData.maternity_authorised_cots}</td>
            <td>{moh717ReportData.eye_authorised_cots}</td>
            <td>{moh717ReportData.nursery_newborn_authorised_cots}</td>
            <td>{moh717ReportData.orthopaedic_authorised_cots}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.15</td>
            <td>Cots- Actual Physical</td>
            <td>{moh717ReportData.medical_actual_physical_cots}</td>
            <td>{moh717ReportData.surgical_actual_physical_cots}</td>
            <td>{moh717ReportData.obst_gyn_actual_physical_cots}</td>
            <td>{moh717ReportData.paediatrics_actual_physical_cots}</td>
            <td>{moh717ReportData.maternity_actual_physical_cots}</td>
            <td>{moh717ReportData.eye_actual_physical_cots}</td>
            <td>{moh717ReportData.nursery_newborn_actual_physical_cots}</td>
            <td>{moh717ReportData.orthopaedic_actual_physical_cots}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.16</td>
            <td>Incubator- Authorised</td>
            <td>{moh717ReportData.medical_authorised_incubator}</td>
            <td>{moh717ReportData.surgical_authorised_incubator}</td>
            <td>{moh717ReportData.obst_gyn_authorised_incubator}</td>
            <td>{moh717ReportData.paediatrics_authorised_incubator}</td>
            <td>{moh717ReportData.maternity_authorised_incubator}</td>
            <td>{moh717ReportData.eye_authorised_incubator}</td>
            <td>{moh717ReportData.nursery_newborn_authorised_incubator}</td>
            <td>{moh717ReportData.orthopaedic_authorised_incubator}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>B.1.17</td>
            <td>Incubator- Actual Physical</td>
            <td>{moh717ReportData.medical_actual_Physical_incubator}</td>
            <td>{moh717ReportData.surgical_actual_Physical_incubator}</td>
            <td>{moh717ReportData.obst_gyn_actual_Physical_incubator}</td>
            <td>{moh717ReportData.paediatrics_actual_Physical_incubator}</td>
            <td>{moh717ReportData.maternity_actual_Physical_incubator}</td>
            <td>{moh717ReportData.eye_actual_Physical_incubator}</td>
            <td>{moh717ReportData.nursery_newborn_actual_Physical_incubator}</td>
            <td>{moh717ReportData.orthopaedic_actual_Physical_incubator}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
            <td>{}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default InpatientComponent;
