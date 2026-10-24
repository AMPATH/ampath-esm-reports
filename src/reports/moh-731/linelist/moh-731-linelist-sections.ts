import { type LinelistColumn } from '../../../common/linelist-table';
import { getMoh366PatientList } from '../../../resources/moh-731.resource';
import { type PatientListPage, type PatientListParams } from '../../../resources/patient-list-page';

/** How one family of MOH 731 figures is listed: where the rows come from and how they are shown */
export interface Moh731LinelistSection {
  /** Shown above the table, e.g. `HIV Testing Services` */
  title: string;
  fetchPatientList: (params: PatientListParams) => Promise<PatientListPage>;
  columns: LinelistColumn[];
}

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

/* Columns every section starts from. Each section lists its own columns below,
   so a column added to one section does not appear in the others. The table
   numbers the rows itself. */
const cccNumber: LinelistColumn = { header: 'CCC Number', field: 'ccc_number', text: true };
const name: LinelistColumn = { header: 'Name', field: 'person_name' };
const nupi: LinelistColumn = { header: 'NUPI', field: 'upi_number', text: true };
const sex: LinelistColumn = { header: 'Sex', field: 'gender' };
const age: LinelistColumn = { header: 'Age', field: 'age' };
const phoneNumber: LinelistColumn = { header: 'Phone Number', field: 'phone_number', text: true };

/**
 * The linelist definition behind each part of the MOH 731 sheet.
 *
 * To add a column to a linelist, add it to that section's `columns`. To point a
 * section at its own query, give it its own `fetchPatientList`. Which figures
 * open which section is set in `moh-731-indicators.ts`.
 */
export const MOH_731_LINELIST_SECTIONS = {
  /* 1.1 HIV Tests, 1.2 HIV Positive Results, 2.1 Maternal HIV Testing, 2.2 HIV
     Positive Results and 2.3 Start HAART at ANC, L&D and PNC, 2.4 HBV Screening and
     2.5 AGYW (HV01-01 to HV01-18, HV01-47/48, HV02-02 to HV02-28 except the
     known-positive figures).
     Both are counted from one dataset of tested clients in the ETL
     (service/moh-731/ver-2023/hiv-tests), so these are its columns, and every
     figure lists exactly the tests it counted. */
  hivTests: {
    title: 'HIV Testing Services',
    fetchPatientList: getMoh366PatientList,
    columns: [
      { header: 'Test Date', value: (row) => formatDate(row.test_date), sortValue: (row) => row.test_date },
      /* Shown by default on the PNC figures (showColumns in moh-731-indicators.ts) */
      {
        header: 'Delivery Date',
        value: (row) => formatDate(row.delivery_date),
        sortValue: (row) => row.delivery_date,
        hidden: true,
      },
      { header: 'Name', field: 'full_name' },
      { header: 'AMRS Number', field: 'amrs_number', text: true },
      { header: 'CCC Number', field: 'ccc_number', text: true },
      { header: 'NUPI', field: 'nupi', text: true },
      { header: 'Sex', field: 'gender' },
      { header: 'Age', field: 'age_at_test' },
      { header: 'Service', field: 'service' },
      { header: 'Test Type', field: 'test_type' },
      { header: 'Setting', field: 'hts_setting' },
      { header: 'Population Type', field: 'population_type' },
      { header: 'Final Result', field: 'final_result' },
      /* HBV screening in the period; available from the Columns menu */
      { header: 'Screened HBV', field: 'screened_hbv', hidden: true },
      { header: 'HBV Result', field: 'hbv_result', hidden: true },
      {
        header: 'HBV Test Date',
        value: (row) => formatDate(row.hbv_test_date),
        sortValue: (row) => row.hbv_test_date,
        hidden: true,
      },
      { header: 'HBV Recorded On', field: 'hbv_encounter_types', hidden: true },
      { header: 'Initiated in Care', field: 'initiated_in_care' },
      {
        header: 'ART Start Date',
        value: (row) => formatDate(row.arv_first_regimen_start_date),
        sortValue: (row) => row.arv_first_regimen_start_date,
      },
      { header: 'Location', field: 'location' },
      { header: 'Entered By', field: 'entered_by' },
      /* Available from the Columns menu */
      { header: 'Encounter Type', field: 'encounter_type', hidden: true },
      { header: 'Typology', field: 'typology', hidden: true },
      { header: 'Infant Prophylaxis Dispensed', field: 'infant_prophylaxis_dispensed', hidden: true },
      { header: 'Infant Prophylaxis Regimen', field: 'infant_prophylaxis_regimen', hidden: true },
      {
        header: 'Date of Birth',
        value: (row) => formatDate(row.birthdate),
        sortValue: (row) => row.birthdate,
        hidden: true,
      },
      { header: 'Encounter ID', field: 'encounter_id', hidden: true },
    ],
  },
  /* 1.3 No. Initiated on PrEP, 1.4 No. on PrEP Diagnosed with STI and 1.5 No.
     Seroconverted while on PrEP (HV01-19 to HV01-46). Fields are the columns of
     the PrEP visits dataset in the ETL (service/moh-731/ver-2023/prep), which
     both counts these figures and lists the visits behind them. */
  prepVisits: {
    title: 'Pre-Exposure Prophylaxis',
    fetchPatientList: getMoh366PatientList,
    columns: [
      { header: 'Visit Date', value: (row) => formatDate(row.visit_date), sortValue: (row) => row.visit_date },
      { header: 'Visit', field: 'visit' },
      { header: 'Name', field: 'full_name' },
      { header: 'AMRS Number', field: 'amrs_number', text: true },
      { header: 'NUPI', field: 'nupi', text: true },
      { header: 'Sex', field: 'gender' },
      { header: 'Age', field: 'age' },
      { header: 'Population', field: 'population_category' },
      {
        header: 'PrEP Start Date',
        value: (row) => formatDate(row.prep_start_date),
        sortValue: (row) => row.prep_start_date,
      },
      { header: 'Transfer In', field: 'transfer_in' },
      { header: 'PrEP Status', field: 'prep_status' },
      { header: 'PrEP Type', field: 'prep_type' },
      { header: 'Regimen', field: 'regimen', wrap: true },
      { header: 'HIV Test', field: 'hiv_test' },
      { header: 'STI', field: 'has_sti' },
      { header: 'STI Signs', field: 'sti_signs', wrap: true },
      { header: 'Location', field: 'location' },
      { header: 'Entered By', field: 'entered_by' },
      /* Available from the Columns menu */
      { header: 'Encounter Type', field: 'encounter_type', hidden: true },
      { header: 'Population Recorded', field: 'population_recorded', hidden: true },
      { header: 'Pregnant / Breastfeeding', value: (row) => (Number(row.is_pbfw) === 1 ? 'Yes' : 'No'), hidden: true },
      {
        header: 'Date of Birth',
        value: (row) => formatDate(row.birthdate),
        sortValue: (row) => row.birthdate,
        hidden: true,
      },
      { header: 'Encounter ID', field: 'encounter_id', hidden: true },
    ],
  },
  /* 2.1 Known Positive at 1st ANC (HV02-01) and 2.3 On HAART at 1st ANC (HV02-14).
     Fields are the columns of the
     known-positive ANC dataset in the ETL (service/moh-731/ver-2023/known-positive-anc),
     which counts the figure and lists the visits behind it. */
  ancKnownPositives: {
    title: 'Elimination of Mother-to-Child Transmission (EMTCT)',
    fetchPatientList: getMoh366PatientList,
    columns: [
      { header: 'ANC Date', value: (row) => formatDate(row.anc_date), sortValue: (row) => row.anc_date },
      { header: 'Visit', field: 'visit' },
      { header: 'ANC Visit No.', field: 'anc_visit_number' },
      { header: 'Name', field: 'full_name' },
      { header: 'AMRS Number', field: 'amrs_number', text: true },
      { header: 'CCC Number', field: 'ccc_number', text: true },
      { header: 'NUPI', field: 'nupi', text: true },
      { header: 'Age', field: 'age_at_anc' },
      { header: 'HIV Status', field: 'hiv_status' },
      { header: 'Initiated in Care', field: 'initiated_in_care' },
      {
        header: 'ART Start Date',
        value: (row) => formatDate(row.arv_first_regimen_start_date),
        sortValue: (row) => row.arv_first_regimen_start_date,
      },
      { header: 'Infant Prophylaxis Dispensed', field: 'infant_prophylaxis_dispensed' },
      { header: 'Infant Prophylaxis Regimen', field: 'infant_prophylaxis_regimen' },
      { header: 'Location', field: 'location' },
      { header: 'Entered By', field: 'entered_by' },
      /* Available from the Columns menu */
      { header: 'Encounter Type', field: 'encounter_type', hidden: true },
      { header: 'Known Positive Source', field: 'known_positive_source', hidden: true },
      { header: 'Screened HBV', field: 'screened_hbv', hidden: true },
      { header: 'HBV Result', field: 'hbv_result', hidden: true },
      {
        header: 'HBV Test Date',
        value: (row) => formatDate(row.hbv_test_date),
        sortValue: (row) => row.hbv_test_date,
        hidden: true,
      },
      { header: 'HBV Recorded On', field: 'hbv_encounter_types', hidden: true },
      { header: 'Sex', field: 'gender', hidden: true },
      {
        header: 'Date of Birth',
        value: (row) => formatDate(row.birthdate),
        sortValue: (row) => row.birthdate,
        hidden: true,
      },
      { header: 'Encounter ID', field: 'encounter_id', hidden: true },
    ],
  },
  /* 2.6 Infant Prophylaxis (HV02-29 to HV02-31). Fields are the columns of the
     HIV-positive mothers dataset in the ETL (service/moh-731/ver-2023/infant-prophylaxis):
     women newly positive at an ANC, L&D or PNC test and women known positive at ANC. */
  /* 2.4 HBV Screening at ANC (HV02-19, HV02-20). Fields are the columns of the
     ANC HBV dataset in the ETL (service/moh-731/ver-2023/hbv-screening): ANC visits
     that are an ANC test or a known-positive visit, with the client's HBV screening. */
  ancHbv: {
    title: 'Elimination of Mother-to-Child Transmission (EMTCT)',
    fetchPatientList: getMoh366PatientList,
    columns: [
      { header: 'ANC Date', value: (row) => formatDate(row.anc_date), sortValue: (row) => row.anc_date },
      { header: 'Visit', field: 'visit' },
      { header: 'ANC Visit No.', field: 'anc_visit_number' },
      { header: 'Group', field: 'anc_group' },
      { header: 'HIV Result', field: 'hiv_result' },
      { header: 'Name', field: 'full_name' },
      { header: 'AMRS Number', field: 'amrs_number', text: true },
      { header: 'CCC Number', field: 'ccc_number', text: true },
      { header: 'NUPI', field: 'nupi', text: true },
      { header: 'Age', field: 'age_at_anc' },
      { header: 'Screened HBV', field: 'screened_hbv' },
      { header: 'HBV Result', field: 'hbv_result' },
      {
        header: 'HBV Test Date',
        value: (row) => formatDate(row.hbv_test_date),
        sortValue: (row) => row.hbv_test_date,
      },
      { header: 'HBV Recorded On', field: 'hbv_encounter_types' },
      { header: 'Location', field: 'location' },
      { header: 'Entered By', field: 'entered_by' },
      /* Available from the Columns menu */
      { header: 'Encounter Type', field: 'encounter_type', hidden: true },
      {
        header: 'Date of Birth',
        value: (row) => formatDate(row.birthdate),
        sortValue: (row) => row.birthdate,
        hidden: true,
      },
      { header: 'Encounter ID', field: 'encounter_id', hidden: true },
    ],
  },
  hivPositiveMothers: {
    title: 'Elimination of Mother-to-Child Transmission (EMTCT)',
    fetchPatientList: getMoh366PatientList,
    columns: [
      { header: 'Visit Date', value: (row) => formatDate(row.visit_date), sortValue: (row) => row.visit_date },
      /* Shown by default on the PNC figure (showColumns in moh-731-indicators.ts) */
      {
        header: 'Delivery Date',
        value: (row) => formatDate(row.delivery_date),
        sortValue: (row) => row.delivery_date,
        hidden: true,
      },
      { header: 'Name', field: 'full_name' },
      { header: 'AMRS Number', field: 'amrs_number', text: true },
      { header: 'CCC Number', field: 'ccc_number', text: true },
      { header: 'NUPI', field: 'nupi', text: true },
      { header: 'Age', field: 'age' },
      { header: 'Service', field: 'service' },
      { header: 'HIV Status', field: 'hiv_status' },
      { header: 'ANC Visit No.', field: 'anc_visit_number' },
      { header: 'Infant Prophylaxis Given', field: 'infant_prophylaxis_dispensed' },
      { header: 'Prophylaxis Regimen', field: 'infant_prophylaxis_regimen' },
      { header: 'Initiated in Care', field: 'initiated_in_care' },
      {
        header: 'ART Start Date',
        value: (row) => formatDate(row.arv_first_regimen_start_date),
        sortValue: (row) => row.arv_first_regimen_start_date,
      },
      { header: 'Location', field: 'location' },
      { header: 'Entered By', field: 'entered_by' },
      /* Available from the Columns menu */
      { header: 'Encounter Type', field: 'encounter_type', hidden: true },
      {
        header: 'Date of Birth',
        value: (row) => formatDate(row.birthdate),
        sortValue: (row) => row.birthdate,
        hidden: true,
      },
      { header: 'Encounter ID', field: 'encounter_id', hidden: true },
    ],
  },
  /* 2.7 Infant Feeding (HV02-32 to HV02-34). Fields are the columns of the HEI
     feeding dataset in the ETL (service/moh-731/ver-2023/infant-feeding): HEI
     follow-ups seen before the end of the period whose return-to-clinic date is
     on or after its start. */
  infantFeeding: {
    title: 'Elimination of Mother-to-Child Transmission (EMTCT)',
    fetchPatientList: getMoh366PatientList,
    columns: [
      {
        header: 'Visit Date',
        value: (row) => formatDate(row.encounter_datetime),
        sortValue: (row) => row.encounter_datetime,
      },
      { header: 'RTC Date', value: (row) => formatDate(row.rtc_date), sortValue: (row) => row.rtc_date },
      { header: 'Name', field: 'full_name' },
      { header: 'AMRS Number', field: 'amrs_number', text: true },
      { header: 'CCC Number', field: 'ccc_number', text: true },
      { header: 'NUPI', field: 'nupi', text: true },
      { header: 'Sex', field: 'gender' },
      { header: 'Age (Months)', field: 'age_months' },
      { header: 'Feeding Method', field: 'feeding_methods', wrap: true },
      { header: 'Feeding Category', field: 'feeding_category' },
      { header: 'MOH 731 Code', field: 'moh731_code' },
      { header: 'Location', field: 'location' },
      { header: 'Entered By', field: 'entered_by' },
      /* Available from the Columns menu */
      { header: 'Encounter Type', field: 'encounter_type', hidden: true },
      {
        header: 'Date of Birth',
        value: (row) => formatDate(row.birthdate),
        sortValue: (row) => row.birthdate,
        hidden: true,
      },
      { header: 'Encounter ID', field: 'encounter_id', hidden: true },
    ],
  },
  /* 3.1 Starting ART and 3.2 Currently on ART (HV03-01 to HV03-028). Fields are
     the columns of the ART monthly dataset in the ETL (service/moh-731/ver-2023/art),
     read from the HIV monthly report dataset for the month. */
  artMonthly: {
    title: 'HIV and TB Treatment',
    fetchPatientList: getMoh366PatientList,
    columns: [
      { header: 'Name', field: 'full_name' },
      { header: 'CCC Number', field: 'ccc_number', text: true },
      { header: 'NUPI', field: 'nupi', text: true },
      { header: 'AMRS Number', field: 'amrs_number', text: true },
      { header: 'Sex', field: 'gender' },
      { header: 'Age', field: 'age' },
      { header: 'ART Status', field: 'art_status' },
      {
        header: 'ART Start Date',
        value: (row) => formatDate(row.arv_first_regimen_start_date),
        sortValue: (row) => row.arv_first_regimen_start_date,
      },
      { header: 'Current Regimen', field: 'cur_arv_meds', wrap: true },
      { header: 'ARV Line', field: 'cur_arv_line' },
      {
        header: 'Last Visit',
        value: (row) => formatDate(row.last_visit_date),
        sortValue: (row) => row.last_visit_date,
      },
      { header: 'RTC Date', value: (row) => formatDate(row.rtc_date), sortValue: (row) => row.rtc_date },
      { header: 'Location', field: 'location' },
      /* Available from the Columns menu */
      {
        header: 'Enrollment Date',
        value: (row) => formatDate(row.enrollment_date),
        sortValue: (row) => row.enrollment_date,
        hidden: true,
      },
      { header: 'Transfer In This Month', field: 'transfer_in', hidden: true },
      { header: 'Pregnant', field: 'pregnant', hidden: true },
      { header: 'Latest VL', field: 'vl_1', hidden: true },
      {
        header: 'Latest VL Date',
        value: (row) => formatDate(row.vl_1_date),
        sortValue: (row) => row.vl_1_date,
        hidden: true,
      },
      {
        header: 'Date of Birth',
        value: (row) => formatDate(row.birthdate),
        sortValue: (row) => row.birthdate,
        hidden: true,
      },
    ],
  },
  /* 3.3 TB Screening, 3.4 Starting TPT and 3.5 Differentiated Service Delivery
     (HV03-029 to HV03-036). Fields are the columns of the TB, TPT and DSD datasets in
     the ETL (service/moh-731/ver-2023/tb-tpt-dsd); each figure lists one row per client. */
  tbDsd: {
    title: 'HIV and TB Treatment',
    fetchPatientList: getMoh366PatientList,
    columns: [
      { header: 'Name', field: 'full_name' },
      { header: 'CCC Number', field: 'ccc_number', text: true },
      { header: 'NUPI', field: 'nupi', text: true },
      { header: 'AMRS Number', field: 'amrs_number', text: true },
      { header: 'Sex', field: 'gender' },
      { header: 'Age', field: 'age' },
      {
        header: 'ART Start Date',
        value: (row) => formatDate(row.arv_first_regimen_start_date),
        sortValue: (row) => row.arv_first_regimen_start_date,
      },
      {
        header: 'TB Screening Date',
        value: (row) => formatDate(row.tb_screening_date),
        sortValue: (row) => row.tb_screening_date,
      },
      { header: 'TB Screening Result', field: 'tb_screening_result' },
      {
        header: 'TPT Start Date',
        value: (row) => formatDate(row.ipt_start_date),
        sortValue: (row) => row.ipt_start_date,
      },
      { header: 'DSD Status', field: 'dsd_status' },
      { header: 'DSD Model', field: 'dsd_model' },
      {
        header: 'DSD Recorded',
        value: (row) => formatDate(row.dsd_obs_date),
        sortValue: (row) => row.dsd_obs_date,
      },
      {
        header: 'Last Visit',
        value: (row) => formatDate(row.last_visit_date),
        sortValue: (row) => row.last_visit_date,
      },
      { header: 'Location', field: 'location' },
    ],
  },
  art: {
    title: 'HIV Treatment',
    fetchPatientList: getMoh366PatientList,
    columns: [cccNumber, name, nupi, sex, age, phoneNumber],
  },
  tb: {
    title: 'TB Screening, TPT and HIV in TB Clinic',
    fetchPatientList: getMoh366PatientList,
    columns: [cccNumber, name, nupi, sex, age, phoneNumber],
  },
  /* 3.6 Nutrition and HIV (HV03-037 to HV03-060): one row per client, their
     latest SAM / MAM status in the period, from the ETL's nutrition dataset
     (service/moh-731/ver-2023/nutrition) */
  nutrition: {
    title: 'Nutrition and HIV',
    fetchPatientList: getMoh366PatientList,
    columns: [
      {
        header: 'Visit Date',
        value: (row) => formatDate(row.encounter_date),
        sortValue: (row) => row.encounter_date,
      },
      { header: 'Name', field: 'full_name' },
      { header: 'CCC Number', field: 'ccc_number', text: true },
      { header: 'NUPI', field: 'nupi', text: true },
      { header: 'AMRS Number', field: 'amrs_number', text: true },
      { header: 'Sex', field: 'gender' },
      { header: 'Age', field: 'age' },
      { header: 'Age (Months)', field: 'age_months', hidden: true },
      { header: 'SAM / MAM', field: 'sam_mam' },
      { header: 'Food Given', field: 'food_given' },
      { header: 'Pregnant / Lactating', field: 'pregnant_lactating' },
      { header: 'Current ARV Regimen', field: 'current_arv_regimen' },
      { header: 'ARV Line', field: 'cur_arv_line', hidden: true },
      {
        header: 'ART Start Date',
        value: (row) => formatDate(row.art_start_date),
        sortValue: (row) => row.art_start_date,
      },
      { header: 'RTC Date', value: (row) => formatDate(row.rtc_date), sortValue: (row) => row.rtc_date },
      { header: 'HIV Clinic', field: 'hiv_clinic', hidden: true },
      { header: 'Encounter Type', field: 'encounter_type', hidden: true },
      { header: 'Location', field: 'location' },
      { header: 'Entered By', field: 'entered_by', hidden: true },
    ],
  },
  /* 5. Post Exposure Prophylaxis (HV05-01 to HV05-04): one row per exposure, from
     the ETL's PEP dataset (service/moh-731/ver-2023/pep) */
  pep: {
    title: 'Post Exposure Prophylaxis',
    fetchPatientList: getMoh366PatientList,
    columns: [
      {
        header: 'Exposure Date',
        value: (row) => formatDate(row.exposure_date),
        sortValue: (row) => row.exposure_date,
      },
      { header: 'Name', field: 'full_name' },
      { header: 'CCC Number', field: 'ccc_number', text: true },
      { header: 'NUPI', field: 'nupi', text: true },
      { header: 'AMRS Number', field: 'amrs_number', text: true },
      { header: 'Sex', field: 'gender' },
      { header: 'Age', field: 'age' },
      { header: 'Exposure Type', field: 'exposure_type' },
      { header: 'PEP Given', field: 'pep_given_status' },
      { header: 'Location', field: 'location' },
      { header: 'Entered By', field: 'entered_by' },
    ],
  },
} satisfies Record<string, Moh731LinelistSection>;

export type Moh731SectionId = keyof typeof MOH_731_LINELIST_SECTIONS;
