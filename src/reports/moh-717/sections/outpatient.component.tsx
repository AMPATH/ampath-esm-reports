import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

interface OutpatientComponentProps {
  moh717ReportData: any;
}

const OutpatientComponent: React.FC<OutpatientComponentProps> = ({ moh717ReportData }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={5} className={styles.alighnLeft}>
              A. OUTPATIENT SERVICES
            </th>
          </tr>
          <tr>
            <th colSpan={2} className={styles.alighnLeft}>
              A.1 GENERAL OUTPATIENTS(FILTER CLINICS)
            </th>
            <th>NEW</th>
            <th>RE-ATT</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A.1.1</td>
            <td>Over 5 - Male</td>
            <td>{moh717ReportData.opd_attendance_greater_5yrs_male_new}</td>
            <td>{moh717ReportData.opd_attendance_greater_5yrs_male_revisit}</td>
            <td>
              {(moh717ReportData.opd_attendance_greater_5yrs_male_new || 0) +
                (moh717ReportData.opd_attendance_greater_5yrs_male_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.1.2</td>
            <td>Over 5 - Female</td>
            <td>{moh717ReportData.opd_attendance_greater_5yrs_female_new}</td>
            <td>{moh717ReportData.opd_attendance_greater_5yrs_female_revisit}</td>
            <td>
              {(moh717ReportData.opd_attendance_greater_5yrs_female_new || 0) +
                (moh717ReportData.opd_attendance_greater_5yrs_female_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.1.3</td>
            <td>Children Under 5 - Male</td>
            <td>{moh717ReportData.opd_attendance_less_5yrs_male_new}</td>
            <td>{moh717ReportData.opd_attendance_less_5yrs_male_revisit}</td>
            <td>
              {(moh717ReportData.opd_attendance_less_5yrs_male_new || 0) +
                (moh717ReportData.opd_attendance_less_5yrs_male_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.1.4</td>
            <td>Children Under 5 - Female</td>
            <td>{moh717ReportData.opd_attendance_less_5yrs_female_new}</td>
            <td>{moh717ReportData.opd_attendance_less_5yrs_female_revisit}</td>
            <td>
              {(moh717ReportData.opd_attendance_less_5yrs_female_new || 0) +
                (moh717ReportData.opd_attendance_less_5yrs_female_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.1.5</td>
            <td>Over 60 years</td>
            <td>{moh717ReportData.over_60_years_new}</td>
            <td>{moh717ReportData.over_60_years_revisit}</td>
            <td>{(moh717ReportData.over_60_years_new || 0) + (moh717ReportData.over_60_years_revisit || 0)}</td>
          </tr>
          <tr>
            <td className={styles.totals}>A.1.5</td>
            <td className={styles.totals}>TOTAL GENERAL OUTPATIENTS</td>
            <td className={styles.totals}>
              {(moh717ReportData.opd_attendance_greater_5yrs_male_new || 0) +
                (moh717ReportData.opd_attendance_greater_5yrs_female_new || 0) +
                (moh717ReportData.opd_attendance_less_5yrs_male_new || 0) +
                (moh717ReportData.opd_attendance_less_5yrs_female_new || 0) +
                (moh717ReportData.over_60_years_new || 0)}
            </td>
            <td className={styles.totals}>
              {(moh717ReportData.opd_attendance_greater_5yrs_male_revisit || 0) +
                (moh717ReportData.opd_attendance_greater_5yrs_female_revisit || 0) +
                (moh717ReportData.opd_attendance_less_5yrs_male_revisit || 0) +
                (moh717ReportData.opd_attendance_less_5yrs_female_revisit || 0) +
                (moh717ReportData.over_60_years_revisit || 0)}
            </td>
            <td className={styles.totals}>
              {(moh717ReportData.opd_attendance_greater_5yrs_male_new || 0) +
                (moh717ReportData.opd_attendance_greater_5yrs_female_new || 0) +
                (moh717ReportData.opd_attendance_less_5yrs_male_new || 0) +
                (moh717ReportData.opd_attendance_less_5yrs_female_new || 0) +
                (moh717ReportData.over_60_years_new || 0) +
                (moh717ReportData.opd_attendance_greater_5yrs_male_revisit || 0) +
                (moh717ReportData.opd_attendance_greater_5yrs_female_revisit || 0) +
                (moh717ReportData.opd_attendance_less_5yrs_male_revisit || 0) +
                (moh717ReportData.opd_attendance_less_5yrs_female_revisit || 0) +
                (moh717ReportData.over_60_years_revisit || 0)}
            </td>
          </tr>
          <tr>
            <th colSpan={2} className={styles.alighnLeft}>
              A.2 CASUALTY
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th colSpan={3} className={styles.alighnLeft}>
              A.3 SPECIAL CLINICS(if recorded separately from General Filter Clinics)
            </th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>A.3.1</td>
            <td>E.N.T. Clinic</td>
            <td>{moh717ReportData.ent_clinic_attendance_new}</td>
            <td>{moh717ReportData.ent_clinic_attendance_revisit}</td>
            <td>
              {(moh717ReportData.ent_clinic_attendance_new || 0) +
                (moh717ReportData.ent_clinic_attendance_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.3.2</td>
            <td>Eye Clinic</td>
            <td>{moh717ReportData.eye_clinic_attendance_new}</td>
            <td>{moh717ReportData.eye_clinic_attendance_revisit}</td>
            <td>
              {(moh717ReportData.eye_clinic_attendance_new || 0) +
                (moh717ReportData.eye_clinic_attendance_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.3.3</td>
            <td>TB and Leprosy</td>
            <td>{moh717ReportData.tb_and_leprosy_attendance_new}</td>
            <td>{moh717ReportData.tb_and_leprosy_attendance_revisit}</td>
            <td>
              {(moh717ReportData.tb_and_leprosy_attendance_new || 0) +
                (moh717ReportData.tb_and_leprosy_attendance_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.3.4</td>
            <td>Comprehensive Care Clinic (CCC)</td>
            <td>{moh717ReportData.ccc_new}</td>
            <td>{moh717ReportData.ccc_revisit}</td>
            <td>{(moh717ReportData.ccc_new || 0) + (moh717ReportData.ccc_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.3.5</td>
            <td>Psychiatry</td>
            <td>{moh717ReportData.psychiatry_attendance_new}</td>
            <td>{moh717ReportData.psychiatry_attendance_revisit}</td>
            <td>
              {(moh717ReportData.psychiatry_attendance_new || 0) +
                (moh717ReportData.psychiatry_attendance_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.3.6</td>
            <td>Orthopaedic Clinic</td>
            <td>{moh717ReportData.orthopaedic_new}</td>
            <td>{moh717ReportData.orthopaedic_revisit}</td>
            <td>{(moh717ReportData.orthopaedic_new || 0) + (moh717ReportData.orthopaedic_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.3.7</td>
            <td>Occupational Therapy</td>
            <td>{moh717ReportData.occupational_therapy_new}</td>
            <td>{moh717ReportData.occupational_therapy_revisit}</td>
            <td>
              {(moh717ReportData.occupational_therapy_new || 0) + (moh717ReportData.occupational_therapy_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.3.8</td>
            <td>Physiotherapy Clinic</td>
            <td>{moh717ReportData.physiotherapy_new}</td>
            <td>{moh717ReportData.physiotherapy_revisit}</td>
            <td>{(moh717ReportData.physiotherapy_new || 0) + (moh717ReportData.physiotherapy_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.3.9</td>
            <td>Medical Clinics</td>
            <td>{moh717ReportData.medical_attendance_new}</td>
            <td>{moh717ReportData.medical_attendance_revisit}</td>
            <td>
              {(moh717ReportData.medical_attendance_new || 0) + (moh717ReportData.medical_attendance_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.3.10</td>
            <td>Surgical Clinics</td>
            <td>{moh717ReportData.surgical_clinics_new}</td>
            <td>{moh717ReportData.surgical_clinics_revisit}</td>
            <td>{(moh717ReportData.surgical_clinics_new || 0) + (moh717ReportData.surgical_clinics_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.3.11</td>
            <td>Paediatrics</td>
            <td>{moh717ReportData.paediatrics_attendance_new}</td>
            <td>{moh717ReportData.paediatrics_attendance_revisit}</td>
            <td>
              {(moh717ReportData.paediatrics_attendance_new || 0) +
                (moh717ReportData.paediatrics_attendance_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.3.12</td>
            <td>Obstetrics/Gynaecology</td>
            <td>{moh717ReportData.obstetrics_gynaecology_new}</td>
            <td>{moh717ReportData.obstetrics_gynaecology_revisit}</td>
            <td>
              {(moh717ReportData.obstetrics_gynaecology_new || 0) +
                (moh717ReportData.obstetrics_gynaecology_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.3.13</td>
            <td>Nutrition Clinic</td>
            <td>{moh717ReportData.nutrition_new}</td>
            <td>{moh717ReportData.nutrition_revisit}</td>
            <td>{(moh717ReportData.nutrition_new || 0) + (moh717ReportData.nutrition_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.3.14</td>
            <td>Oncology Clinic</td>
            <td>{moh717ReportData.oncology_new}</td>
            <td>{moh717ReportData.oncology_revisit}</td>
            <td>{(moh717ReportData.oncology_new || 0) + (moh717ReportData.oncology_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.3.15</td>
            <td>Renal Clinic</td>
            <td>{moh717ReportData.renal_new}</td>
            <td>{moh717ReportData.renal_revisit}</td>
            <td>{(moh717ReportData.renal_new || 0) + (moh717ReportData.renal_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.3.16</td>
            <td>All other Special Clinics</td>
            <td>{moh717ReportData.other_special_clinics_new}</td>
            <td>{moh717ReportData.other_special_clinics_revisit}</td>
            <td>
              {(moh717ReportData.other_special_clinics_new || 0) +
                (moh717ReportData.other_special_clinics_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td className={styles.totals}>A.3.8</td>
            <td className={styles.totals}>TOTAL SPECIAL CLINICS</td>
            <td className={styles.totals}>
              {(moh717ReportData.ent_clinic_attendance_new || 0) +
                (moh717ReportData.eye_clinic_attendance_new || 0) +
                (moh717ReportData.tb_and_leprosy_attendance_new || 0) +
                (moh717ReportData.ccc_new || 0) +
                (moh717ReportData.psychiatry_attendance_new || 0) +
                (moh717ReportData.orthopaedic_new || 0) +
                (moh717ReportData.occupational_therapy_new || 0) +
                (moh717ReportData.physiotherapy_new || 0) +
                (moh717ReportData.medical_attendance_new || 0) +
                (moh717ReportData.surgical_clinics_new || 0) +
                (moh717ReportData.paediatrics_attendance_new || 0) +
                (moh717ReportData.obstetrics_gynaecology_new || 0) +
                (moh717ReportData.nutrition_new || 0) +
                (moh717ReportData.oncology_new || 0) +
                (moh717ReportData.renal_new || 0) +
                (moh717ReportData.other_special_clinics_new || 0)}
            </td>
            <td className={styles.totals}>
              {(moh717ReportData.ent_clinic_attendance_revisit || 0) +
                (moh717ReportData.eye_clinic_attendance_revisit || 0) +
                (moh717ReportData.tb_and_leprosy_attendance_revisit || 0) +
                (moh717ReportData.ccc_revisit || 0) +
                (moh717ReportData.psychiatry_attendance_revisit || 0) +
                (moh717ReportData.orthopaedic_revisit || 0) +
                (moh717ReportData.occupational_therapy_revisit || 0) +
                (moh717ReportData.physiotherapy_revisit || 0) +
                (moh717ReportData.medical_attendance_revisit || 0) +
                (moh717ReportData.surgical_clinics_revisit || 0) +
                (moh717ReportData.paediatrics_attendance_revisit || 0) +
                (moh717ReportData.obstetrics_gynaecology_revisit || 0) +
                (moh717ReportData.nutrition_revisit || 0) +
                (moh717ReportData.oncology_revisit || 0) +
                (moh717ReportData.renal_revisit || 0) +
                (moh717ReportData.other_special_clinics_revisit || 0)}
            </td>
            <td className={styles.totals}>
              {(moh717ReportData.ent_clinic_attendance_new || 0) +
                (moh717ReportData.eye_clinic_attendance_new || 0) +
                (moh717ReportData.tb_and_leprosy_attendance_new || 0) +
                (moh717ReportData.ccc_new || 0) +
                (moh717ReportData.psychiatry_attendance_new || 0) +
                (moh717ReportData.orthopaedic_new || 0) +
                (moh717ReportData.occupational_therapy_new || 0) +
                (moh717ReportData.physiotherapy_new || 0) +
                (moh717ReportData.medical_attendance_new || 0) +
                (moh717ReportData.surgical_clinics_new || 0) +
                (moh717ReportData.paediatrics_attendance_new || 0) +
                (moh717ReportData.obstetrics_gynaecology_new || 0) +
                (moh717ReportData.nutrition_new || 0) +
                (moh717ReportData.oncology_new || 0) +
                (moh717ReportData.renal_new || 0) +
                (moh717ReportData.other_special_clinics_new || 0) +
                (moh717ReportData.ent_clinic_attendance_revisit || 0) +
                (moh717ReportData.eye_clinic_attendance_revisit || 0) +
                (moh717ReportData.tb_and_leprosy_attendance_revisit || 0) +
                (moh717ReportData.ccc_revisit || 0) +
                (moh717ReportData.psychiatry_attendance_revisit || 0) +
                (moh717ReportData.orthopaedic_revisit || 0) +
                (moh717ReportData.occupational_therapy_revisit || 0) +
                (moh717ReportData.physiotherapy_revisit || 0) +
                (moh717ReportData.medical_attendance_revisit || 0) +
                (moh717ReportData.surgical_clinics_revisit || 0) +
                (moh717ReportData.paediatrics_attendance_revisit || 0) +
                (moh717ReportData.obstetrics_gynaecology_revisit || 0) +
                (moh717ReportData.nutrition_revisit || 0) +
                (moh717ReportData.oncology_revisit || 0) +
                (moh717ReportData.renal_revisit || 0) +
                (moh717ReportData.other_special_clinics_revisit || 0)}
            </td>
          </tr>
          <tr>
            <th colSpan={2} className={styles.alighnLeft}>
              A.4 MCH/FP CLIENTS
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>A.4.1</td>
            <td>CWC Attendances</td>
            <td>{moh717ReportData.cwc_attendance_new}</td>
            <td>{moh717ReportData.cwc_attendance_revisit}</td>
            <td>{(moh717ReportData.cwc_attendance_new || 0) + (moh717ReportData.cwc_attendance_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.4.2</td>
            <td>ANC Attendances</td>
            <td>{moh717ReportData.anc_new}</td>
            <td>{moh717ReportData.anc_revisit}</td>
            <td>{(moh717ReportData.anc_new || 0) + (moh717ReportData.anc_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.4.3</td>
            <td>PNC Attendances</td>
            <td>{moh717ReportData.pnc_new}</td>
            <td>{moh717ReportData.pnc_revisit}</td>
            <td>{(moh717ReportData.pnc_new || 0) + (moh717ReportData.pnc_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.4.4</td>
            <td>FP Attendances</td>
            <td>{moh717ReportData.fp_attendance_new}</td>
            <td>{moh717ReportData.fp_attendance_revisit}</td>
            <td>{(moh717ReportData.fp_attendance_new || 0) + (moh717ReportData.fp_attendance_revisit || 0)}</td>
          </tr>
          <tr>
            <td className={styles.totals}>A.4.5</td>
            <td className={styles.totals}>TOTAL MCH/FP</td>
            <td className={styles.totals}>
              {(moh717ReportData.cwc_attendance_new || 0) +
                (moh717ReportData.anc_new || 0) +
                (moh717ReportData.pnc_new || 0) +
                (moh717ReportData.fp_attendance_new || 0)}
            </td>
            <td className={styles.totals}>
              {(moh717ReportData.cwc_attendance_revisit || 0) +
                (moh717ReportData.anc_revisit || 0) +
                (moh717ReportData.pnc_revisit || 0) +
                (moh717ReportData.fp_attendance_revisit || 0)}
            </td>
            <td className={styles.totals}>
              {(moh717ReportData.cwc_attendance_new || 0) +
                (moh717ReportData.anc_new || 0) +
                (moh717ReportData.pnc_new || 0) +
                (moh717ReportData.fp_attendance_new || 0) +
                (moh717ReportData.cwc_attendance_revisit || 0) +
                (moh717ReportData.anc_revisit || 0) +
                (moh717ReportData.pnc_revisit || 0) +
                (moh717ReportData.fp_attendance_revisit || 0)}
            </td>
          </tr>
          <tr>
            <th colSpan={2} className={styles.alighnLeft}>
              A.5 DENTAL CLINIC
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>A.5.1</td>
            <td>Attendance (Excluding fillings and extractios)</td>
            <td>{moh717ReportData.dental_attendance_ex_fillings_extractions_new}</td>
            <td>{moh717ReportData.dental_attendance_ex_fillings_extractions_revisit}</td>
            <td>
              {(moh717ReportData.dental_attendance_ex_fillings_extractions_new || 0) +
                (moh717ReportData.dental_attendance_ex_fillings_extractions_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td>A.5.2</td>
            <td>Fillings</td>
            <td>{moh717ReportData.dental_fillings_new}</td>
            <td>{moh717ReportData.dental_fillings_revisit}</td>
            <td>{(moh717ReportData.dental_fillings_new || 0) + (moh717ReportData.dental_fillings_revisit || 0)}</td>
          </tr>
          <tr>
            <td>A.5.3</td>
            <td>Extractions</td>
            <td>{moh717ReportData.dental_extractions_new}</td>
            <td>{moh717ReportData.dental_extractions_revisit}</td>
            <td>
              {(moh717ReportData.dental_extractions_new || 0) + (moh717ReportData.dental_extractions_revisit || 0)}
            </td>
          </tr>
          <tr>
            <td className={styles.totals}>A.5.4</td>
            <td className={styles.totals}>TOTAL DENTAL SERVICES</td>
            <td>
              {(moh717ReportData.dental_attendance_ex_fillings_extractions_new || 0) +
                (moh717ReportData.dental_fillings_new || 0) +
                (moh717ReportData.dental_extractions_new || 0)}
            </td>
            <td>
              {(moh717ReportData.dental_attendance_ex_fillings_extractions_revisit || 0) +
                (moh717ReportData.dental_fillings_revisit || 0) +
                (moh717ReportData.dental_extractions_revisit || 0)}
            </td>
            <td>
              {(moh717ReportData.dental_attendance_ex_fillings_extractions_new || 0) +
                (moh717ReportData.dental_fillings_new || 0) +
                (moh717ReportData.dental_extractions_new || 0) +
                (moh717ReportData.dental_attendance_ex_fillings_extractions_revisit || 0) +
                (moh717ReportData.dental_fillings_revisit || 0) +
                (moh717ReportData.dental_extractions_revisit || 0)}
            </td>
          </tr>
          <tr>
            <th colSpan={2} className={styles.totals}>
              A.6 TOTAL OUTPATIENT SERVICES (=A.1.5 + A.2 + A.3.7 + A.4.5 + A.5.4)
            </th>
            <th className={styles.totals}></th>
            <th className={styles.totals}></th>
            <th className={styles.totals}></th>
          </tr>
          <tr>
            <th colSpan={2} className={styles.alighnLeft}>
              A.7 MEDICAL EXAMINATIONS (except p3)
            </th>
            <th className={styles.alighnLeft}>{moh717ReportData.medical_examinations_except_p3}</th>
            <th className={styles.alighnLeft}>A.10 REMOVAL OF STITCHES</th>
            <th className={styles.alighnLeft}>{moh717ReportData.opd_removal_of_stitches}</th>
          </tr>
          <tr>
            <th colSpan={2} className={styles.alighnLeft}>
              A.8 MEDICAL REPORTS (incl. p3, compensation, insurance, etc.)
            </th>
            <th className={styles.alighnLeft}>{moh717ReportData.opd_medical_reports}</th>
            <th className={styles.alighnLeft}>A.12 INJECTIONS</th>
            <th className={styles.alighnLeft}>{moh717ReportData.opd_injections_given}</th>
          </tr>
          <tr>
            <th colSpan={2} className={styles.alighnLeft}>
              A.9 DRESSINGS
            </th>
            <th className={styles.alighnLeft}>{moh717ReportData.opd_dressing_done}</th>
            <th className={styles.alighnLeft}>A.12 STITCHING</th>
            <th className={styles.totalighnLeftals}>{moh717ReportData.opd_stitching}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OutpatientComponent;
