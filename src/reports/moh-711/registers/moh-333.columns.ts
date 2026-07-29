import { type RegisterColumn } from '../../../common/report-register';

/**
 * MOH 333 as the register prints it: one column per cell, in the order they appear.
 *
 * The last 8 columns are rendered by the table but have no headings above
 * them -- the header row is 53 columns wide against 61 of data. They carry
 * their field names rather than headings borrowed from neighbouring columns.
 */
export const moh333ExportColumns: RegisterColumn[] = [
  { header: 'Date of Admission (dd/mm/yyyy)', value: (row) => row.date_of_admission ?? '' },
  { header: 'AMRSID', value: (row) => row.amrsID ?? '' },
  { header: 'Admission number (yyyy-mm-nnnn) - NUPI', value: (row) => row.admission_number ?? '' },
  { header: 'Full Name (First, Middle, surname)', value: (row) => row.full_names ?? '' },
  { header: 'Date of Birth (dd/mm/yyyy) - Age', value: (row) => row.date_of_birth ?? '' },
  { header: 'County/ Subcounty', value: (row) => row.subcounty_county ?? '' },
  { header: 'Village/ Estate/ Land mark - Phone number', value: (row) => row.village_estate_landmark ?? '' },
  {
    header: 'Marital Status 1 = Married 2 = Widowed 3 = Single 4 = Divorced 5 = Separated',
    value: (row) => row.marital_status ?? '',
  },
  { header: 'Parity (X+Y)', value: (row) => row.parity ?? '' },
  { header: 'Gravidae', value: (row) => row.gravidae ?? '' },
  { header: 'No. of ANC visits', value: (row) => row.no_of_anc_visits ?? '' },
  { header: 'Date of Last Menstrual Period (LMP) (dd/mm/yyyy)', value: (row) => row.lmp ?? '' },
  { header: 'Estimated Date of Delivery (EDD) (dd/mm/yyyy)', value: (row) => row.edd ?? '' },
  { header: 'Diagnosis', value: (row) => row.diagnosis ?? '' },
  { header: 'Delivery - Duration of labour (hours)', value: (row) => row.duration_of_labour ?? '' },
  { header: 'Delivery - Date of Delivery (dd/mm/yyyy)', value: (row) => row.date_of_delivery ?? '' },
  { header: 'Delivery - Time of Delivery', value: (row) => row.time_of_delivery ?? '' },
  { header: 'Delivery - Gestation at Birth (wks)', value: (row) => row.gestation_at_birth ?? '' },
  { header: 'Delivery - Mode of Delivery 1) SVD 2) CS 3) Breech 4) AVD', value: (row) => row.mode_of_delivery ?? '' },
  { header: 'Delivery - No.of babies delivered', value: (row) => row.no_of_babies_delivered ?? '' },
  { header: 'Delivery - Placenta Complete 1=Yes 2=No 3=BBA', value: (row) => row.placenta_complete ?? '' },
  {
    header: 'Delivery - Uterotonic given 1=oxytocin 2=Carbetocin 3=Others Specify 4= None',
    value: (row) => row.uterotonic_given ?? '',
  },
  {
    header: 'Delivery - Vaginal Examination 1= Normal 2=Episiotomy 3=Vaginal tear 4=FGM 5=Vaginal warts',
    value: (row) => row.vaginal_examination ?? '',
  },
  { header: 'Delivery - Blood loss (mls)', value: (row) => row.blood_loss ?? '' },
  {
    header: "Delivery - Mother's status after Delivery (Alive/ Dead)",
    value: (row) => row.mother_status_after_delivery ?? '',
  },
  {
    header: 'Delivery - Maternal deaths Notified (Y/N/NA) - Date Death notified',
    value: (row) => row.maternal_deaths_notified ?? '',
  },
  {
    header:
      'Delivery - Delivery Complications 1=A.P.H. (Ante Partum Haemorrhage); 2=P.P.H. (Post Partum Haemorrhage); 3= Eclampsia; 4=Ruptured Uterus; 5=Obstructed labour; 6=Sepsis 7= NA',
    value: (row) => row.delivery_complications ?? '',
  },
  { header: 'APGAR Score', value: (row) => row.apgar_score ?? '' },
  { header: 'Birth Outcome (LB/FSB/ MSB)', value: (row) => row.birth_outcome ?? '' },
  { header: 'Birth Weight (grams)', value: (row) => row.birth_weight ?? '' },
  { header: 'Sex (M/F)', value: (row) => row.sex ?? '' },
  {
    header: 'Initiated on BF in &lt; 1hr (Y/N) - Kangaroo Mother Care (Y/N)',
    value: (row) => row.initiated_on_bf_less_one_hour ?? '',
  },
  { header: 'TEO given at birth? (Y/N)', value: (row) => row.teo_given_at_birth ?? '' },
  { header: 'Chlorhexidine applied on cord stump (Y/N)', value: (row) => row.chlorhexdine_applied_on_cord_stump ?? '' },
  {
    header: 'Birth with deformity (Y/N) - 1- congenital syphilis. 2- spina bifida, 3- Hydrocephalus, 4- Talipes',
    value: (row) => row.birth_with_deformity ?? '',
  },
  { header: 'Given Vitamin K (Y/N)', value: (row) => row.given_vitamin_k ?? '' },
  {
    header: 'VDRL/ RPR Results (Specify 1-VDRL 2-RPR 3-Duo testing) - (P/N/ND)',
    value: (row) => row.duo_test_result ?? '',
  },
  {
    header: 'Baby - HIV Test 1 - Kit Name: - Lot No. - Expiry / / - (N/P/I/NA)',
    value: (row) => row.hiv_test_1_kit_name ?? '',
  },
  {
    header: 'Baby - HIV Test 2 - Kit Name: - Lot No. - Expiry / / - (N/P/I/NA)',
    value: (row) => row.hiv_test_2_kit_name ?? '',
  },
  {
    header: 'Baby - HIV Test 3 - Kit Name: - Lot No. - Expiry / / - (N/P/I/NA)',
    value: (row) => row.hiv_test_3_kit_name ?? '',
  },
  {
    header: 'Baby - HIV Result Maternity (N/P/Inc/U/NA) - Initial/Retest/ NA',
    value: (row) => row.hiv_test_results_maternity ?? '',
  },
  { header: 'Maternal HAART - Start at Maternity - (Y/N/NA)', value: (row) => row.maternal_haart ?? '' },
  { header: 'Infant Prophylaxis - (Y/N/NA)', value: (row) => row.infant_prophylaxis ?? '' },
  { header: 'Partner Tested for HIV - (Y/N/NA)', value: (row) => row.partner_tested_for_hiv ?? '' },
  { header: 'Counselled on infant feeding (Y/N/NA)', value: (row) => row.counselled_on_infant_feeding ?? '' },
  { header: 'Delivery Conducted by (Enter Name)', value: (row) => row.deleivery_conducted_by ?? '' },
  { header: 'Birth Notification Number', value: (row) => row.birth_notification_number ?? '' },
  { header: 'Discharge - Date (dd/mm/yyyy)', value: (row) => row.discharge_date ?? '' },
  { header: 'Discharge - Status of Baby A= Alive D= Dead', value: (row) => row.discharge_status_of_baby ?? '' },
  {
    header: 'Referral - From - 1= From Community Unit, 2= From Another Health Facility, 3=Not Applicable',
    value: (row) => row.referrals_from ?? '',
  },
  {
    header:
      'Referral - To - 1= To Community Unit, 2=Referred to HIV preventive services 3=Another Health Facility, 4=Not Applicable',
    value: (row) => row.referrals_to ?? '',
  },
  { header: 'Referral - Reason for referral', value: (row) => row.reasons_for_refferal ?? '' },
  { header: 'Comments', value: (row) => row.comments ?? '' },
  { header: 'Nupi', value: (row) => row.nupi ?? '' },
  { header: 'Age', value: (row) => row.age ?? '' },
  { header: 'Phone number', value: (row) => row.phone_number ?? '' },
  { header: 'Date maternal death notified', value: (row) => row.date_maternal_death_notified ?? '' },
  { header: 'Kangaroo mother care', value: (row) => row.kangaroo_mother_care ?? '' },
  { header: 'Type of deformity', value: (row) => row.type_of_deformity ?? '' },
  { header: 'Hiv test type', value: (row) => row.hiv_test_type ?? '' },
  { header: 'Hiv test type', value: (row) => row.hiv_test_type ?? '' },
];
