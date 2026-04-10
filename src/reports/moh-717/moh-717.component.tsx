import React, { useState } from 'react';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';

import styles from './moh717.scss';
import classNames from 'classnames';
import { useSession } from '@openmrs/esm-framework';
import { getMoh717 } from '../../resources/moh-717.resource';
import { Loading } from '@carbon/react';

const Moh717Report: React.FC = () => {
  let errorMessage: string = '';
  const [moh717ReportData, setMoh717ReportData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();
  const locationUuid = session?.sessionLocation?.uuid;
  const fetchMoh717ReportData = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
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
      const data = await getMoh717(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh717ReportData(flatData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Failed to fetch MOH-717 report data: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-717 Report"
        mode="monthly"
        onGenerate={fetchMoh717ReportData}
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
        <p className={styles.title}>General outpatient (Filter Clinic)</p>
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
                <td>OPD attendance &gt;5yrs Male</td>
                <td>{moh717ReportData.opd_attendance_greater_5yrs_male_new}</td>
                <td>{moh717ReportData.opd_attendance_greater_5yrs_male_revisit}</td>
              </tr>
              <tr>
                <td>OPD attendance &gt;5yrs Female</td>
                <td>{moh717ReportData.opd_attendance_greater_5yrs_female_new}</td>
                <td>{moh717ReportData.opd_attendance_greater_5yrs_female_revisit}</td>
              </tr>
              <tr>
                <td>OPD attendance &lt;5yrs Male</td>
                <td>{moh717ReportData.opd_attendance_less_5yrs_male_new}</td>
                <td>{moh717ReportData.opd_attendance_less_5yrs_male_revisit}</td>
              </tr>
              <tr>
                <td>OPD attendance &lt;5yrs Female</td>
                <td>{moh717ReportData.opd_attendance_less_5yrs_female_new}</td>
                <td>{moh717ReportData.opd_attendance_less_5yrs_female_revisit}</td>
              </tr>
              <tr>
                <td>Over 60 years</td>
                <td>{moh717ReportData.over_60_years_new}</td>
                <td>{moh717ReportData.over_60_years_revisit}</td>
              </tr>
              <tr>
                <td>OPD Casualty attendance</td>
                <td>{moh717ReportData.casualty_attendance_new}</td>
                <td>{moh717ReportData.casualty_attendance_revisit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Special clinics</p>
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
                <td>ENT Clinic Attendance</td>
                <td>{moh717ReportData.ent_clinic_attendance_new}</td>
                <td>{moh717ReportData.ent_clinic_attendance_revisit}</td>
              </tr>
              <tr>
                <td>Eye Clinic Attendance</td>
                <td>{moh717ReportData.eye_clinic_attendance_new}</td>
                <td>{moh717ReportData.eye_clinic_attendance_revisit}</td>
              </tr>
              <tr>
                <td>TB and Leprosy attendance</td>
                <td>{moh717ReportData.tb_and_leprosy_attendance_new}</td>
                <td>{moh717ReportData.tb_and_leprosy_attendance_revisit}</td>
              </tr>
              <tr>
                <td>Comprehensive Care Clinic (CCC)</td>
                <td>{moh717ReportData.ccc_new}</td>
                <td>{moh717ReportData.ccc_revisit}</td>
              </tr>
              <tr>
                <td>Psychiatry Attendance</td>
                <td>{moh717ReportData.psychiatry_attendance_new}</td>
                <td>{moh717ReportData.psychiatry_attendance_revisit}</td>
              </tr>
              <tr>
                <td>Orthopaedic Clinic Attendance</td>
                <td>{moh717ReportData.orthopaedic_new}</td>
                <td>{moh717ReportData.orthopaedic_revisit}</td>
              </tr>
              <tr>
                <td>Occupational Therapy Attendance</td>
                <td>{moh717ReportData.occupational_therapy_new}</td>
                <td>{moh717ReportData.occupational_therapy_revisit}</td>
              </tr>
              <tr>
                <td>Physiotherapy Attendance</td>
                <td>{moh717ReportData.physiotherapy_new}</td>
                <td>{moh717ReportData.physiotherapy_revisit}</td>
              </tr>
              <tr>
                <td>Medical Attendance</td>
                <td>{moh717ReportData.medical_attendance_new}</td>
                <td>{moh717ReportData.medical_attendance_revisit}</td>
              </tr>
              <tr>
                <td>Surgical Clinics attendances</td>
                <td>{moh717ReportData.surgical_clinics_new}</td>
                <td>{moh717ReportData.surgical_clinics_revisit}</td>
              </tr>
              <tr>
                <td>Paediatrics attendances</td>
                <td>{moh717ReportData.paediatrics_attendance_new}</td>
                <td>{moh717ReportData.paediatrics_attendance_revisit}</td>
              </tr>
              <tr>
                <td>Obstetrics/Gynaecology/Attendance</td>
                <td>{moh717ReportData.obstetrics_gynaecology_new}</td>
                <td>{moh717ReportData.obstetrics_gynaecology_revisit}</td>
              </tr>
              <tr>
                <td>Nutrition Clinic</td>
                <td>{moh717ReportData.nutrition_new}</td>
                <td>{moh717ReportData.nutrition_revisit}</td>
              </tr>
              <tr>
                <td>Oncology Clinic</td>
                <td>{moh717ReportData.oncology_new}</td>
                <td>{moh717ReportData.oncology_revisit}</td>
              </tr>
              <tr>
                <td>Renal Clinic</td>
                <td>{moh717ReportData.renal_new}</td>
                <td>{moh717ReportData.renal_revisit}</td>
              </tr>
              <tr>
                <td>All other special clinics attendance</td>
                <td>{moh717ReportData.other_special_clinics_new}</td>
                <td>{moh717ReportData.other_special_clinics_revisit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>MCH/FP clients</p>
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
                <td>CWC Attendance</td>
                <td>{moh717ReportData.cwc_attendance_new}</td>
                <td>{moh717ReportData.cwc_attendance_revisit}</td>
              </tr>
              <tr>
                <td>ANC Attendance</td>
                <td>{moh717ReportData.anc_new}</td>
                <td>{moh717ReportData.anc_revisit}</td>
              </tr>
              <tr>
                <td>PNC Attendance</td>
                <td>{moh717ReportData.pnc_new}</td>
                <td>{moh717ReportData.pnc_revisit}</td>
              </tr>
              <tr>
                <td>FP Attendance</td>
                <td>{moh717ReportData.fp_attendance_new}</td>
                <td>{moh717ReportData.fp_attendance_revisit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Dental Clinic</p>
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
                <td>Dental clinic attendance (Excluding fillings and extractios)</td>
                <td>{moh717ReportData.dental_attendance_ex_fillings_extractions_new}</td>
                <td>{moh717ReportData.dental_attendance_ex_fillings_extractions_revisit}</td>
              </tr>
              <tr>
                <td>Dental Fillings Attendance</td>
                <td>{moh717ReportData.dental_fillings_new}</td>
                <td>{moh717ReportData.dental_fillings_revisit}</td>
              </tr>
              <tr>
                <td>Dental Extractions Attendance</td>
                <td>{moh717ReportData.dental_extractions_new}</td>
                <td>{moh717ReportData.dental_extractions_revisit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Other Services</p>
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
                <td>Medical Examinations done except P3</td>
                <td>{moh717ReportData.medical_examinations_except_p3}</td>
              </tr>
              <tr>
                <td>Medical Reports Issued (INC. p3, compensation, insuarnce)</td>
                <td>{moh717ReportData.opd_medical_reports}</td>
              </tr>
              <tr>
                <td>OPD Dressing Done</td>
                <td>{moh717ReportData.opd_dressing_done}</td>
              </tr>
              <tr>
                <td>OPD Removal of Stitches</td>
                <td>{moh717ReportData.opd_removal_of_stitches}</td>
              </tr>
              <tr>
                <td>OPD injections Given</td>
                <td>{moh717ReportData.opd_injections_given}</td>
              </tr>
              <tr>
                <td>OPD Stitching Done</td>
                <td>{moh717ReportData.opd_stitching}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Inpatient Services</p>
        <p className={styles.sectionTitle}>
          MEDICALSURGICALOBST/FYNPAEDIATRICSMATERNITYEYENURSERY/NEBORNORTHOPAEDICISOLATIONAMENITYPSYCHIATRYICURENALOTHER
        </p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>MEDICAL</th>
                <th>SURGICAL</th>
                <th>OBST/GYN</th>
                <th>PAEDIATRICS</th>
                <th>MATERNITY</th>
                <th>EYE</th>
                <th>NURSERY/NEWBORN</th>
                <th>ORTHOPAEDIC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Inpatient Discharges</td>
                <td>{moh717ReportData.medical_discharges}</td>
                <td>{moh717ReportData.surgical_discharges}</td>
                <td>{moh717ReportData.obst_gyn_discharges}</td>
                <td>{moh717ReportData.paediatrics_discharges}</td>
                <td>{moh717ReportData.maternity_discharges}</td>
                <td>{moh717ReportData.eye_discharges}</td>
                <td>{moh717ReportData.nursery_newborn_discharges}</td>
                <td>{moh717ReportData.orthopaedic_discharges}</td>
              </tr>
              <tr>
                <td>Inpatient Deaths</td>
                <td>{moh717ReportData.medical_deaths}</td>
                <td>{moh717ReportData.surgical_deaths}</td>
                <td>{moh717ReportData.obst_gyn_deaths}</td>
                <td>{moh717ReportData.paediatrics_deaths}</td>
                <td>{moh717ReportData.maternity_deaths}</td>
                <td>{moh717ReportData.eye_deaths}</td>
                <td>{moh717ReportData.nursery_newborn_deaths}</td>
                <td>{moh717ReportData.orthopaedic_deaths}</td>
              </tr>
              <tr>
                <td>Deaths due to confirmed Malaria</td>
                <td>{moh717ReportData.medical_deaths_malaria}</td>
                <td>{moh717ReportData.surgical_deaths_malaria}</td>
                <td>{moh717ReportData.obst_gyn_deaths_malaria}</td>
                <td>{moh717ReportData.paediatrics_deaths_malaria}</td>
                <td>{moh717ReportData.maternity_deaths_malaria}</td>
                <td>{moh717ReportData.eye_deaths_malaria}</td>
                <td>{moh717ReportData.nursery_newborn_deaths_malaria}</td>
                <td>{moh717ReportData.orthopaedic_deaths_malaria}</td>
              </tr>
              <tr>
                <td>Inpatient Abscondees</td>
                <td>{moh717ReportData.medical_abscondees}</td>
                <td>{moh717ReportData.surgical_abscondees}</td>
                <td>{moh717ReportData.obst_gyn_abscondees}</td>
                <td>{moh717ReportData.paediatrics_abscondees}</td>
                <td>{moh717ReportData.maternity_abscondees}</td>
                <td>{moh717ReportData.eye_abscondees}</td>
                <td>{moh717ReportData.nursery_newborn_abscondees}</td>
                <td>{moh717ReportData.orthopaedic_abscondees}</td>
              </tr>
              <tr>
                <td>Referrals Out of the Facility</td>
                <td>{moh717ReportData.medical_referrals_out_of_facility}</td>
                <td>{moh717ReportData.surgical_referrals_out_of_facility}</td>
                <td>{moh717ReportData.obst_gyn_referrals_out_of_facility}</td>
                <td>{moh717ReportData.paediatrics_referrals_out_of_facility}</td>
                <td>{moh717ReportData.maternity_referrals_out_of_facility}</td>
                <td>{moh717ReportData.eye_referrals_out_of_facility}</td>
                <td>{moh717ReportData.nursery_newborn_referrals_out_of_facility}</td>
                <td>{moh717ReportData.orthopaedic_referrals_out_of_facility}</td>
              </tr>
              <tr>
                <td>Admission 0-28 days</td>
                <td>{moh717ReportData.medical_admissions_0_28_days}</td>
                <td>{moh717ReportData.surgical_admissions_0_28_days}</td>
                <td>{moh717ReportData.obst_gyn_admissions_0_28_days}</td>
                <td>{moh717ReportData.paediatrics_admissions_0_28_days}</td>
                <td>{moh717ReportData.maternity_admissions_0_28_days}</td>
                <td>{moh717ReportData.eye_admissions_0_28_days}</td>
                <td>{moh717ReportData.nursery_newborn_admissions_0_28_days}</td>
                <td>{moh717ReportData.orthopaedic_admissions_0_28_days}</td>
              </tr>
              <tr>
                <td>Inaptient Admissions Under Five</td>
                <td>{moh717ReportData.medical_admissions_under_five}</td>
                <td>{moh717ReportData.surgical_admissions_under_five}</td>
                <td>{moh717ReportData.obst_gyn_admissions_under_five}</td>
                <td>{moh717ReportData.paediatrics_admissions_under_five}</td>
                <td>{moh717ReportData.maternity_admissions_under_five}</td>
                <td>{moh717ReportData.eye_admissions_under_five}</td>
                <td>{moh717ReportData.nursery_newborn_admissions_under_five}</td>
                <td>{moh717ReportData.orthopaedic_admissions_under_five}</td>
              </tr>
              <tr>
                <td>Inaptient Admissions Over Five</td>
                <td>{moh717ReportData.medical_admissions_over_five}</td>
                <td>{moh717ReportData.surgical_admissions_over_five}</td>
                <td>{moh717ReportData.obst_gyn_admissions_over_five}</td>
                <td>{moh717ReportData.paediatrics_admissions_over_five}</td>
                <td>{moh717ReportData.maternity_admissions_over_five}</td>
                <td>{moh717ReportData.eye_admissions_over_five}</td>
                <td>{moh717ReportData.nursery_newborn_admissions_over_five}</td>
                <td>{moh717ReportData.orthopaedic_admissions_over_five}</td>
              </tr>
              <tr>
                <td>Under 5's admitted with severe Malaria</td>
                <td>{moh717ReportData.medical_admissions_under_five_severe_malaria}</td>
                <td>{moh717ReportData.surgical_admissions_under_five_severe_malaria}</td>
                <td>{moh717ReportData.obst_gyn_admissions_under_five_severe_malaria}</td>
                <td>{moh717ReportData.paediatrics_admissions_under_five_severe_malaria}</td>
                <td>{moh717ReportData.maternity_admissions_under_five_severe_malaria}</td>
                <td>{moh717ReportData.eye_admissions_under_five_severe_malaria}</td>
                <td>{moh717ReportData.nursery_newborn_admissions_under_five_severe_malaria}</td>
                <td>{moh717ReportData.orthopaedic_admissions_under_five_severe_malaria}</td>
              </tr>
              <tr>
                <td>Over 5's admitted with severe Malaria</td>
                <td>{moh717ReportData.medical_admissions_over_five_severe_malaria}</td>
                <td>{moh717ReportData.surgical_admissions_over_five_severe_malaria}</td>
                <td>{moh717ReportData.obst_gyn_admissions_over_five_severe_malaria}</td>
                <td>{moh717ReportData.paediatrics_admissions_over_five_severe_malaria}</td>
                <td>{moh717ReportData.maternity_admissions_over_five_severe_malaria}</td>
                <td>{moh717ReportData.eye_admissions_over_five_severe_malaria}</td>
                <td>{moh717ReportData.nursery_newborn_admissions_over_five_severe_malaria}</td>
                <td>{moh717ReportData.orthopaedic_admissions_over_five_severe_malaria}</td>
              </tr>
              <tr>
                <td>Inpatient Paroles</td>
                <td>{moh717ReportData.medical_paroles}</td>
                <td>{moh717ReportData.surgical_paroles}</td>
                <td>{moh717ReportData.obst_gyn_paroles}</td>
                <td>{moh717ReportData.paediatrics_paroles}</td>
                <td>{moh717ReportData.maternity_paroles}</td>
                <td>{moh717ReportData.eye_paroles}</td>
                <td>{moh717ReportData.nursery_newborn_paroles}</td>
                <td>{moh717ReportData.orthopaedic_paroles}</td>
              </tr>
              <tr>
                <td>Inpatient Occupied Bed Days -NHIF Members</td>
                <td>{moh717ReportData.medical_occupied_bed_days_sha_members}</td>
                <td>{moh717ReportData.surgical_occupied_bed_days_sha_members}</td>
                <td>{moh717ReportData.obst_gyn_occupied_bed_days_sha_members}</td>
                <td>{moh717ReportData.paediatrics_occupied_bed_days_sha_members}</td>
                <td>{moh717ReportData.maternity_occupied_bed_days_sha_members}</td>
                <td>{moh717ReportData.eye_occupied_bed_days_sha_members}</td>
                <td>{moh717ReportData.nursery_newborn_occupied_bed_days_sha_members}</td>
                <td>{moh717ReportData.orthopaedic_occupied_bed_days_sha_members}</td>
              </tr>
              <tr>
                <td>Inpatient Occupied Bed Days -NON-NHIF Members</td>
                <td>{moh717ReportData.medical_occupied_bed_days_non_sha_members}</td>
                <td>{moh717ReportData.surgical_occupied_bed_days_non_sha_members}</td>
                <td>{moh717ReportData.obst_gyn_occupied_bed_days_non_sha_members}</td>
                <td>{moh717ReportData.paediatrics_occupied_bed_days_non_sha_members}</td>
                <td>{moh717ReportData.maternity_occupied_bed_days_non_sha_members}</td>
                <td>{moh717ReportData.eye_occupied_bed_days_non_sha_members}</td>
                <td>{moh717ReportData.nursery_newborn_occupied_bed_days_non_sha_members}</td>
                <td>{moh717ReportData.orthopaedic_occupied_bed_days_non_sha_members}</td>
              </tr>
              <tr>
                <td>Inpatient Well Persons Days</td>
                <td>{moh717ReportData.medical_well_persons_days}</td>
                <td>{moh717ReportData.surgical_well_persons_days}</td>
                <td>{moh717ReportData.obst_gyn_well_persons_days}</td>
                <td>{moh717ReportData.paediatrics_well_persons_days}</td>
                <td>{moh717ReportData.maternity_well_persons_days}</td>
                <td>{moh717ReportData.eye_well_persons_days}</td>
                <td>{moh717ReportData.nursery_newborn_well_persons_days}</td>
                <td>{moh717ReportData.orthopaedic_well_persons_days}</td>
              </tr>
              <tr>
                <td>Inpatient Authorised Beds</td>
                <td>{moh717ReportData.medical_authorised_beds}</td>
                <td>{moh717ReportData.surgical_authorised_beds}</td>
                <td>{moh717ReportData.obst_gyn_authorised_beds}</td>
                <td>{moh717ReportData.paediatrics_authorised_beds}</td>
                <td>{moh717ReportData.maternity_authorised_beds}</td>
                <td>{moh717ReportData.eye_authorised_beds}</td>
                <td>{moh717ReportData.nursery_newborn_authorised_beds}</td>
                <td>{moh717ReportData.orthopaedic_authorised_beds}</td>
              </tr>
              <tr>
                <td>Inpatient Actual Physical Beds</td>
                <td>{moh717ReportData.medical_actual_physical_beds}</td>
                <td>{moh717ReportData.surgical_actual_physical_beds}</td>
                <td>{moh717ReportData.obst_gyn_actual_physical_beds}</td>
                <td>{moh717ReportData.paediatrics_actual_physical_beds}</td>
                <td>{moh717ReportData.maternity_actual_physical_beds}</td>
                <td>{moh717ReportData.eye_actual_physical_beds}</td>
                <td>{moh717ReportData.nursery_newborn_actual_physical_beds}</td>
                <td>{moh717ReportData.orthopaedic_actual_physical_beds}</td>
              </tr>
              <tr>
                <td>Inpatient Authorised Cots</td>
                <td>{moh717ReportData.medical_authorised_cots}</td>
                <td>{moh717ReportData.surgical_authorised_cots}</td>
                <td>{moh717ReportData.obst_gyn_authorised_cots}</td>
                <td>{moh717ReportData.paediatrics_authorised_cots}</td>
                <td>{moh717ReportData.maternity_authorised_cots}</td>
                <td>{moh717ReportData.eye_authorised_cots}</td>
                <td>{moh717ReportData.nursery_newborn_authorised_cots}</td>
                <td>{moh717ReportData.orthopaedic_authorised_cots}</td>
              </tr>
              <tr>
                <td>Inpatient Actual Physical Cots</td>
                <td>{moh717ReportData.medical_actual_physical_cots}</td>
                <td>{moh717ReportData.surgical_actual_physical_cots}</td>
                <td>{moh717ReportData.obst_gyn_actual_physical_cots}</td>
                <td>{moh717ReportData.paediatrics_actual_physical_cots}</td>
                <td>{moh717ReportData.maternity_actual_physical_cots}</td>
                <td>{moh717ReportData.eye_actual_physical_cots}</td>
                <td>{moh717ReportData.nursery_newborn_actual_physical_cots}</td>
                <td>{moh717ReportData.orthopaedic_actual_physical_cots}</td>
              </tr>
              <tr>
                <td>Incubator- Authorised</td>
                <td>{moh717ReportData.medical_authorised_incubator}</td>
                <td>{moh717ReportData.surgical_authorised_incubator}</td>
                <td>{moh717ReportData.obst_gyn_authorised_incubator}</td>
                <td>{moh717ReportData.paediatrics_authorised_incubator}</td>
                <td>{moh717ReportData.maternity_authorised_incubator}</td>
                <td>{moh717ReportData.eye_authorised_incubator}</td>
                <td>{moh717ReportData.nursery_newborn_authorised_incubator}</td>
                <td>{moh717ReportData.orthopaedic_authorised_incubator}</td>
              </tr>
              <tr>
                <td>Incubator- Actual Physical</td>
                <td>{moh717ReportData.medical_actual_Physical_incubator}</td>
                <td>{moh717ReportData.surgical_actual_Physical_incubator}</td>
                <td>{moh717ReportData.obst_gyn_actual_Physical_incubator}</td>
                <td>{moh717ReportData.paediatrics_actual_Physical_incubator}</td>
                <td>{moh717ReportData.maternity_actual_Physical_incubator}</td>
                <td>{moh717ReportData.eye_actual_Physical_incubator}</td>
                <td>{moh717ReportData.nursery_newborn_actual_Physical_incubator}</td>
                <td>{moh717ReportData.orthopaedic_actual_Physical_incubator}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Maternity</p>
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
                <td>{moh717ReportData.normal_deliveries}</td>
              </tr>
              <tr>
                <td>Caesarian Sections</td>
                <td>{moh717ReportData.caesarian_sections}</td>
              </tr>
              <tr>
                <td>Breach Delivery</td>
                <td>{moh717ReportData.breach_deliveries}</td>
              </tr>
              <tr>
                <td>Assisted vaginal delivery</td>
                <td>{moh717ReportData.assisted_vaginal_deliveries}</td>
              </tr>
              <tr>
                <td>BBA (Born before arrival)</td>
                <td>{moh717ReportData.born_before_arrival}</td>
              </tr>
              <tr>
                <td>Maternal deaths</td>
                <td>{moh717ReportData.maternal_deaths}</td>
              </tr>
              <tr>
                <td>Maternal Deaths Audited Within 7 days</td>
                <td>{moh717ReportData.maternal_deaths_audited_within_7_days}</td>
              </tr>
              <tr>
                <td>Live births</td>
                <td>{moh717ReportData.live_births}</td>
              </tr>
              <tr>
                <td>Still births</td>
                <td>{moh717ReportData.still_births}</td>
              </tr>
              <tr>
                <td>Neonatal deaths 0-28 Days</td>
                <td>{moh717ReportData.neonatal_deaths_0_28_days}</td>
              </tr>
              <tr>
                <td>Neonatal deaths Audits</td>
                <td>{moh717ReportData.neonatal_deaths_audits}</td>
              </tr>
              <tr>
                <td>Low Birth Weight &lt;2500gms</td>
                <td>{moh717ReportData.low_birth_weight_less_2500gms}</td>
              </tr>
              <tr>
                <td>Babies discharge Alive</td>
                <td>{moh717ReportData.babies_discharged_alive}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Operations</p>
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
                <td>Minor Surgeries Booked</td>
                <td>{moh717ReportData.minor_surgeries_booked}</td>
              </tr>
              <tr>
                <td>Minor surgeries operated</td>
                <td>{moh717ReportData.minor_surgeries_operated}</td>
              </tr>
              <tr>
                <td>Emergencies Booked</td>
                <td>{moh717ReportData.emergencies_booked}</td>
              </tr>
              <tr>
                <td>Emergencies Operated</td>
                <td>{moh717ReportData.emergencies_operated}</td>
              </tr>
              <tr>
                <td>Cold Cases Booked</td>
                <td>{moh717ReportData.cold_cases_booked}</td>
              </tr>
              <tr>
                <td>Cold surgical cases</td>
                <td>{moh717ReportData.cold_surgical_cases}</td>
              </tr>
              <tr>
                <td>Circumcision Booked</td>
                <td>{moh717ReportData.circumcisions_booked}</td>
              </tr>
              <tr>
                <td>Circumcision Operated</td>
                <td>{moh717ReportData.circumcisions_operated}</td>
              </tr>
              <tr>
                <td>Major surgeries Booked</td>
                <td>{moh717ReportData.major_surgeries_booked}</td>
              </tr>
              <tr>
                <td>Major surgeries Operated</td>
                <td>{moh717ReportData.major_surgeries_operated}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Orthopaedic Trauma Services</p>
        <p className={styles.sectionTitle}>
          Under 5 Years, New clientsUnder 5 Years, Re-visitsOver Five Years, New clientsOver Five Years, Re-visits
        </p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th colSpan={2}>Under 5 Years</th>
                <th colSpan={2}>Over Five Years</th>
              </tr>
              <tr>
                <th></th>
                <th>New clients</th>
                <th>Re-visits</th>
                <th>New clients</th>
                <th>Re-visits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No of Casts fixed</td>
                <td>{moh717ReportData.casts_fixed_less_5_years_new}</td>
                <td>{moh717ReportData.casts_fixed_less_5_years_revisit}</td>
                <td>{moh717ReportData.casts_fixed_over_5_years_new}</td>
                <td>{moh717ReportData.casts_fixed_over_5_years_revisit}</td>
              </tr>
              <tr>
                <td>No of Tractions fixed</td>
                <td>{moh717ReportData.tractions_fixed_less_5_years_new}</td>
                <td>{moh717ReportData.tractions_fixed_less_5_years_revisit}</td>
                <td>{moh717ReportData.tractions_fixed_over_5_years_new}</td>
                <td>{moh717ReportData.tractions_fixed_over_5_years_revisit}</td>
              </tr>
              <tr>
                <td>No of Closed Reductions (Fructures, Dislocation)</td>
                <td>{moh717ReportData.closed_reductions_less_5_years_new}</td>
                <td>{moh717ReportData.closed_reductions_less_5_years_revisit}</td>
                <td>{moh717ReportData.closed_reductions_over_5_years_new}</td>
                <td>{moh717ReportData.closed_reductions_over_5_years_revisit}</td>
              </tr>
              <tr>
                <td>No of Orthopeadic cases assisted in theatre</td>
                <td>{moh717ReportData.orthopaedic_assisted_in_theatre_less_5_years_new}</td>
                <td>{moh717ReportData.orthopaedic_assisted_in_theatre_less_5_years_revisit}</td>
                <td>{moh717ReportData.orthopaedic_assisted_in_theatre_over_5_years_new}</td>
                <td>{moh717ReportData.orthopaedic_assisted_in_theatre_over_5_years_revisit}</td>
              </tr>
              <tr>
                <td>No of club foot seen /corrected (Ponsseti method)</td>
                <td>{moh717ReportData.club_foot_seen_less_5_years_new}</td>
                <td>{moh717ReportData.club_foot_seen_less_5_years_revisit}</td>
                <td>{moh717ReportData.club_foot_seen_over_5_years_new}</td>
                <td>{moh717ReportData.club_foot_seen_over_5_years_revisit}</td>
              </tr>
              <tr>
                <td>No of Crepe bandages and arm slings applied</td>
                <td>{moh717ReportData.crepe_bandages_applied_less_5_years_new}</td>
                <td>{moh717ReportData.crepe_bandages_applied_less_5_years_revisit}</td>
                <td>{moh717ReportData.crepe_bandages_applied_over_5_years_new}</td>
                <td>{moh717ReportData.crepe_bandages_applied_over_5_years_revisit}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Orthopaedic Removal</p>
        <p className={styles.sectionTitle}>&lt;5 yrs&gt;5 yrs</p>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th></th>
                <th>&lt;5 yrs</th>
                <th>&gt;5 yrs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No. of Removals Done Casts</td>
                <td>{moh717ReportData.removals_done_cast_less_5_years}</td>
                <td>{moh717ReportData.removals_done_cast_over_5_years}</td>
              </tr>
              <tr>
                <td>No. of Removals Done Tractions</td>
                <td>{moh717ReportData.removals_done_tractions_less_5_years}</td>
                <td>{moh717ReportData.orthopaedic_removals_tractions_over_5_years}</td>
              </tr>
              <tr>
                <td>No. of Removals Ex-Fixator</td>
                <td>{moh717ReportData.ex_fixator_removed_less_5_years}</td>
                <td>{moh717ReportData.ex_fixator_removed_over_5_years}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Special services</p>
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
                <td>Laboratory routine test</td>
                <td>{moh717ReportData.lab_routine_test}</td>
              </tr>
              <tr>
                <td>Laboratory special test</td>
                <td>{moh717ReportData.lab_special_test}</td>
              </tr>
              <tr>
                <td>Plain X-Rays without enhancement</td>
                <td>{moh717ReportData.plain_xray_without_enhancement}</td>
              </tr>
              <tr>
                <td>Contrast enhanced examinations</td>
                <td>{moh717ReportData.contrast_enhancement_examination}</td>
              </tr>
              <tr>
                <td>Magnetic Resonance Imaging</td>
                <td>{moh717ReportData.magnetic_resonance_imaging}</td>
              </tr>
              <tr>
                <td>Computarized Tomography</td>
                <td>{moh717ReportData.computerized_tomography}</td>
              </tr>
              <tr>
                <td>Mammography</td>
                <td>{moh717ReportData.mammography}</td>
              </tr>
              <tr>
                <td>Chest x-ray for PTB with specialist's report</td>
                <td>{moh717ReportData.chest_xray_for_ptb}</td>
              </tr>
              <tr>
                <td>Number of ultrasound examinations</td>
                <td>{moh717ReportData.number_of_ultrasound_examinations}</td>
              </tr>
              <tr>
                <td>General ultrasound</td>
                <td>{moh717ReportData.general_ultrasound}</td>
              </tr>
              <tr>
                <td>Obstetric ultrasound</td>
                <td>{moh717ReportData.obstetric_ultrasound}</td>
              </tr>
              <tr>
                <td>Total routine (X-Ray and Imaging)</td>
                <td>{moh717ReportData.total_routine_xray_and_imaging}</td>
              </tr>
              <tr>
                <td>Total special exams (X-Ray and Imaging)</td>
                <td>{moh717ReportData.total_special_exams_xray_and_imaging}</td>
              </tr>
              <tr>
                <td>Physiotherapy - Number of Treatments</td>
                <td>{moh717ReportData.physiotherapy_number_of_treatments}</td>
              </tr>
              <tr>
                <td>Occupational therapy Number of treatments</td>
                <td>{moh717ReportData.occupational_therapy_number_of_treatments}</td>
              </tr>
              <tr>
                <td>
                  Orthopaedic Technology (Prosthetist & Orthotist) - Orthopaedic Technology - No of ITEMS Prepared and
                  issued e.g. a pair of crutches, Wheelchair, Prosthesis etc. count as one item
                </td>
                <td>{moh717ReportData.orthopaedic_technology_prepared}</td>
              </tr>
              <tr>
                <td>
                  Orthopaedic Technology (Prosthetist & Orthotist) - Orthopaedic Technology - No of ITEMS issued e.g. a
                  pair of crutches, Wheelchair, Prosthesis etc. count as one item
                </td>
                <td>{moh717ReportData.orthopaedic_technology_issued}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Pharmacy No of prescriptions</p>
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
                <td>Prescriptions Issued - Common Drugs</td>
                <td>{moh717ReportData.prescriptions_issued_common_drugs}</td>
              </tr>
              <tr>
                <td>Prescriptions Issued - Antibiotics</td>
                <td>{moh717ReportData.prescriptions_issued_antibiotics}</td>
              </tr>
              <tr>
                <td>Prescriptions Issued - Special drugs</td>
                <td>{moh717ReportData.prescriptions_issued_special_drugs}</td>
              </tr>
              <tr>
                <td>Prescriptions Issued - Drugs for Children</td>
                <td>{moh717ReportData.prescriptions_issued_drugs_children}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Mortuary</p>
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
                <td>Mortuary Body days</td>
                <td>{moh717ReportData.mortuary_body_days}</td>
              </tr>
              <tr>
                <td>Mortuary Embalment</td>
                <td>{moh717ReportData.mortuary_embalment}</td>
              </tr>
              <tr>
                <td>Mortuary Post-Moterm</td>
                <td>{moh717ReportData.mortuary_postmortem}</td>
              </tr>
              <tr>
                <td>Mortuary Unclaimed body days</td>
                <td>{moh717ReportData.mortuary_unclaimed_bodies}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Medical Records</p>
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
                <td>New Patient Files issued</td>
                <td>{moh717ReportData.new_patient_files_issued}</td>
              </tr>
              <tr>
                <td>Outpatient records cards Issued</td>
                <td>{moh717ReportData.outpatient_records_cards_issued}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.title}>Finance</p>
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
                <td>Total Amount Collected (Kshs)</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>Total Amount Received</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>Number of clients waived</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>Amount for clients waived (Kshs)</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>Number of clients exempted</td>
                <td>{}</td>
              </tr>
              <tr>
                <td>Amount for clients exempted (Kshs)</td>
                <td>{}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Moh717Report;
