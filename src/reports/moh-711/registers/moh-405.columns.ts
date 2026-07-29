import { type RegisterColumn } from '../../../common/report-register';

/**
 * MOH 405 as the register prints it: one column per cell, in the order they appear.
 *
 * The last 10 columns are rendered by the table but have no headings above
 * them -- the header row is 46 columns wide against 56 of data. They carry
 * their field names rather than headings borrowed from neighbouring columns.
 */
export const moh405ExportColumns: RegisterColumn[] = [
  { header: 'Date of visit', value: (row) => row.date_of_visit ?? '' },
  { header: '(New Client) - ANC Number - NUPI', value: (row) => row.anc_number ?? '' },
  { header: 'ANC Number/NUPI (Re Visit)', value: (row) => row.anc_number_NUPI ?? '' },
  { header: 'AMRSID', value: (row) => row.amrsID ?? '' },
  { header: 'Number of Visits (1st,2nd,3rd, 4th ….)', value: (row) => row.number_of_anc_visits ?? '' },
  { header: 'Full Name (First, Middle, Surname)', value: (row) => row.full_names ?? '' },
  { header: 'Date of Birth (DD/MM/YYYY) - Age', value: (row) => row.date_of_birth ?? '' },
  { header: 'Subcounty/ County', value: (row) => row.subcounty_county ?? '' },
  { header: 'Village/Estate/ Landmark - Phone Number', value: (row) => row.village_estate_landmark ?? '' },
  {
    header:
      'Marital Status NM=Never Married/Single MM=Married Monogamous MP=Married Polygamous W=Widowed D=Divorced S=Separated',
    value: (row) => row.marital_status ?? '',
  },
  { header: 'Parity', value: (row) => row.parity ?? '' },
  { header: 'Gravidae', value: (row) => row.gravidae ?? '' },
  { header: 'Date of Last Menstrual Period (LMP) - (dd/mm/yyyy)', value: (row) => row.last_lmp_date ?? '' },
  { header: 'Expected Date of Delivery (EDD) - (dd/mm/yyyy)', value: (row) => row.edd ?? '' },
  { header: 'Gestation in Weeks', value: (row) => row.gestation_in_weeks ?? '' },
  { header: 'MUAC 1= Green, 2=Yellow, 3=Red', value: (row) => row.muac ?? '' },
  { header: 'Height (cm)', value: (row) => row.height ?? '' },
  { header: 'Weight (kg)', value: (row) => row.weight ?? '' },
  { header: 'Blood Pressure', value: (row) => row.blood_pressure ?? '' },
  { header: 'Breast Exam 1=normal 2=abnormal', value: (row) => row.breast_exam ?? '' },
  {
    header: 'FGM (Y/N) - FGM associated complications: 1=Scarring 2=Keloids 3=Dyspaneuria 4=UTI 5 = NA',
    value: (row) => row.fgm ?? '',
  },
  { header: 'Laboratory - Haemoglobin (Level/ ND/NA)', value: (row) => row.haemoglobin ?? '' },
  {
    header:
      'Laboratory - Blood Sugar Testing for Diabetes: 1=RBS&lt; 11.1 mmol/L, No Diabetes, 2=RBS&gt;11.1 mmol/L, Has Diabetes, 3=No RBS done',
    value: (row) => row.blood_sugar_test ?? '',
  },
  { header: 'Laboratory - Blood group and rhesus (Y/N)', value: (row) => row.blood_group_rhesus ?? '' },
  { header: 'Laboratory - Urinalysis (Y/N)', value: (row) => row.urinalysis ?? '' },
  {
    header: 'Laboratory - Type of Test RPR/ VDRL/ Duo Test/ NA - Test Results (P/N/NA)',
    value: (row) => row.rpr_vdrl_duo ?? '',
  },
  {
    header: 'Laboratory - Hepatitis B virus Sceening Result (P/N/ND) - Treatment (Y/N/NA)',
    value: (row) => row.hepatitisB ?? '',
  },
  {
    header: 'Laboratory - TB Screening: Codes (1-5) - 1=Presumed TB 2=No Signs 3=On TB Treatment 4=On TPT 5=Not Done',
    value: (row) => row.tb_screening ?? '',
  },
  {
    header: 'Laboratory - HIV Testing (Initial or Retest, Known Poitive or Revisit) - (I/R/KP/ND/Rev)',
    value: (row) => row.hiv_test_type ?? '',
  },
  {
    header: 'Laboratory - HIV Test 1 - Kit Name - Expiry / / - (N/P/I/NA)',
    value: (row) => row.hiv_test_1_kit_name ?? '',
  },
  {
    header: 'Laboratory - HIV Test 2 - Kit Name - Expiry / / - (N/P/I/NA)',
    value: (row) => row.hiv_test_2_kit_name ?? '',
  },
  {
    header: 'Laboratory - HIV Test 3 - Kit Name - Expiry / / - (N/P/I/NA)',
    value: (row) => row.hiv_test_3_kit_name ?? '',
  },
  { header: 'Laboratory - HIV Results - (N/P/Ic/U/N A)', value: (row) => row.hiv_results ?? '' },
  {
    header: 'Maternal HAART - N = New on ART. OA = On ART NA = Not Applicable',
    value: (row) => row.maternal_haart ?? '',
  },
  { header: 'Infant Prophylaxis - AN = AZT&NVP A = AZT N = NVP NA', value: (row) => row.infant_prophylaxis ?? '' },
  { header: 'Partner HIV Testing - N/P/KP/NA', value: (row) => row.partner_hiv_testing ?? '' },
  {
    header:
      'Other Conditions and Treatment - 1=Hypertension; 2=Diabetes; 3=Epilepsy; 4=Malaria in Pregnancy; 5=STIs/RTI; 6=Others (Specify) 7=None Record all that apply - Treatment (Y/N/NA)',
    value: (row) => row.other_conditions ?? '',
  },
  { header: 'Deworming - (Y/N/NA)', value: (row) => row.deworming ?? '' },
  { header: 'IPT 1-3 - (1,2,3,N,NA)', value: (row) => row.ipt_1_3 ?? '' },
  {
    header: 'TT Dose - 1=TT Dose 1st dose 2=2nd dose 3=3rd dose 4=4th dose 5=5th dose NA=None',
    value: (row) => row.tt_dose ?? '',
  },
  {
    header:
      'Supplementation - Given Supplementation 1=Combined IFAs 2=Iron 3=Folate 4=Iron+Folate Separately 5=Calcium',
    value: (row) => row.supplementation ?? '',
  },
  { header: 'LLITNs - Received LLITNs (Y/N)', value: (row) => row.llitns ?? '' },
  {
    header: 'Referrrals - From - 1=From Community Unit 2=Another Health Facility 3=Not Applicable',
    value: (row) => row.referrals_from ?? '',
  },
  {
    header:
      'Referrrals - To - 1=To Community Unit 2=HIV preventive services 3=Another Health Facility 4=Not Applicable',
    value: (row) => row.referrals_to ?? '',
  },
  { header: 'Referrrals - Reason for referral (specify)', value: (row) => row.reason_for_referral ?? '' },
  { header: 'Remarks', value: (row) => row.remarks ?? '' },
  { header: 'NUPI', value: (row) => row.NUPI ?? '' },
  { header: 'Age', value: (row) => row.age ?? '' },
  { header: 'Phone number', value: (row) => row.phone_number ?? '' },
  { header: 'Fgm complications', value: (row) => row.fgm_complications ?? '' },
  { header: 'Rpr vdrl duo results', value: (row) => row.rpr_vdrl_duo_results ?? '' },
  { header: 'Hepatitis B treatment', value: (row) => row.hepatitisB_treatment ?? '' },
  { header: 'Hiv test 1 expiry date', value: (row) => row.hiv_test_1_expiry_date ?? '' },
  { header: 'Hiv test 2 expiry date', value: (row) => row.hiv_test_2_expiry_date ?? '' },
  { header: 'Hiv test 3 expiry date', value: (row) => row.hiv_test_3_expiry_date ?? '' },
  { header: 'Other conditions treatment', value: (row) => row.other_conditions_treatment ?? '' },
];
