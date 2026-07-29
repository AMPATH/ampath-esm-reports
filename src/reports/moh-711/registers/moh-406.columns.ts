import { type RegisterColumn } from '../../../common/report-register';

/**
 * MOH 406 as the register prints it: one column per cell, in the order they appear.
 *
 * The last 6 columns are rendered by the table but have no headings above
 * them -- the header row is 43 columns wide against 49 of data. They carry
 * their field names rather than headings borrowed from neighbouring columns.
 */
export const moh406ExportColumns: RegisterColumn[] = [
  { header: 'Registration Information - Date of Visit (dd/mm/yyyy)', value: (row) => row.date_of_visit ?? '' },
  { header: 'Registration Information - PNC Number (New Visit) - NUPI', value: (row) => row.pnc_number ?? '' },
  { header: 'Registration Information - PNC Number/NUPI (Revisit)', value: (row) => row.pnc_number ?? '' },
  { header: 'Registration Information - AMRSID', value: (row) => row.amrsID ?? '' },
  {
    header: 'Registration Information - Full Name(first name, middle and surname)',
    value: (row) => row.full_names ?? '',
  },
  {
    header: 'Registration Information - Date of Birth (dd/mm/yyyy) - Age in Years',
    value: (row) => row.date_of_birth ?? '',
  },
  { header: 'Registration Information - County/ SubCounty', value: (row) => row.subcounty_county ?? '' },
  {
    header: 'Registration Information - Village/Estate/ Landmark - Telephone number',
    value: (row) => row.village_estate_landmark ?? '',
  },
  { header: 'Maternity History - Date of Delivery (dd/mm/yyyy)', value: (row) => row.date_of_delivery ?? '' },
  {
    header: 'Maternity History - Place of Delivery 1)Facility 2) Home 3) BBA',
    value: (row) => row.place_of_delivery ?? '',
  },
  {
    header: 'Maternity History - Mode of Delivery 1) SVD 2) CS 3) Breech 4) AVD',
    value: (row) => row.mode_of_delivery ?? '',
  },
  {
    header: 'Postpartum Visit - Timing Mother - 1=no change, 2=10 days to 14 days; 3=4 to 6 weeks; 4=4 to 6 months',
    value: (row) => row.timing_mother ?? '',
  },
  {
    header: 'Postpartum Visit - Timing Baby - 1=no change, 2=10 days to 14 days; 3=4 to 6 weeks; 4=4 to 6 months',
    value: (row) => row.timing_baby ?? '',
  },
  { header: 'Vital Signs - Temp', value: (row) => row.temperature ?? '' },
  { header: 'Vital Signs - Pulse', value: (row) => row.pulse ?? '' },
  { header: 'Vital Signs - Blood Pressure', value: (row) => row.blood_pressure ?? '' },
  {
    header: 'Postnatal Examinations - Pallor (Y/N) - 1= mild; 2= moderate; 3= severe',
    value: (row) => row.pallor_present ?? '',
  },
  {
    header: 'Postnatal Examinations - Breast 1=normal 2= cracked nipple 3=engorged 4=mastitis',
    value: (row) => row.breast ?? '',
  },
  {
    header: 'Postnatal Examinations - Uterus 1= contracte d 2= not contracte d 3= Others Specify',
    value: (row) => row.uterus ?? '',
  },
  { header: 'Postnatal Examinations - PPH 1=present 2=Absent', value: (row) => row.pph ?? '' },
  {
    header: 'Postnatal Examinations - C-Section Site 1=Bleeding 2=Normal 3=Infected 4=Gapping 5=N/A',
    value: (row) => row.c_section_site ?? '',
  },
  { header: 'Postnatal Examinations - Lochia 1=Normal 2=Foul smelling 3=Excessi ve', value: (row) => row.lochia ?? '' },
  {
    header: 'Postnatal Examinations - Episiotomy 1=Repaired 2=Gaping 3=Infected 4=Healed 5=N/',
    value: (row) => row.episiotomy ?? '',
  },
  { header: 'Postnatal Examinations - Fistula 1=VVF 2=RVF 3=VVR 4=Non', value: (row) => row.fistula ?? '' },
  {
    header: 'TB screening - TB Screening 1: Presumed TB 2: No signs 3: On TB treatment 4: On TPT 5: Not done',
    value: (row) => row.tb_screening ?? '',
  },
  { header: 'Tested PNC - (I/R/ND/KP)', value: (row) => row.tested_pnc ?? '' },
  {
    header: 'HIV Test 1 - Kit Name: - Lot No. - Expiry No. / / - (N,P,I,NA)',
    value: (row) => row.hiv_test_1_kit_name ?? '',
  },
  {
    header: 'HIV Test 2 - Kit Name: - Lot No. - Expiry No. / / - (N,P,I,NA)',
    value: (row) => row.hiv_test_2_kit_name ?? '',
  },
  {
    header: 'HIV Test 3 - Kit Name: - Lot No. - Expiry No. / / - (N,P,I,NA)',
    value: (row) => row.hiv_test_3_kit_name ?? '',
  },
  { header: 'Results in PNC - <=6wks - (N/P/Ic/NA)', value: (row) => row.results_less_6_weeks ?? '' },
  { header: 'Results in PNC - &gt;6wks - (N/P/Ic/NA)', value: (row) => row.results_greater_6_weeks ?? '' },
  {
    header: 'HAART & Infant Prophylaxis and Treatment - <=6wks - Infant - NVP +AZT +CTX or NVP +CTX - (Y/N/NA/R)',
    value: (row) => row.infant_prophylaxis_less_6_weeks ?? '',
  },
  {
    header: 'HAART & Infant Prophylaxis and Treatment - <=6wks - Mother - HAART - (Y/N/NA/R)',
    value: (row) => row.maternal_haart_less_6_weeks ?? '',
  },
  {
    header: 'HAART & Infant Prophylaxis and Treatment - &gt;6wks - Infant - NVP +AZT +CTX or NVP +CTX - (Y/N/NA/R)',
    value: (row) => row.infant_prophylaxis_greater_6_weeks ?? '',
  },
  {
    header: 'HAART & Infant Prophylaxis and Treatment - &gt;6wks - Mother - HAART - (Y/N/NA/R)',
    value: (row) => row.maternal_haart_greater_6_weeks ?? '',
  },
  {
    header:
      'Cervical Cancer Screening (VIA/VILLI/PAP Smear/ND) - Results 1=Normal, 2=Suspected, 3= Confirmed, 4= Not done',
    value: (row) => row.cervical_cancer_method ?? '',
  },
  {
    header: 'Modern Post Partum Family Planning (Y/N) - Counseled Method received',
    value: (row) => row.counselled ?? '',
  },
  { header: 'Other Maternal Complications', value: (row) => row.other_maternal_complications ?? '' },
  { header: 'Haematinics (Y/N)', value: (row) => row.haematinics ?? '' },
  {
    header: 'Refferals - From - 1 = Community Unit 2 = Another Health Facility 3 = Not Applicable',
    value: (row) => row.referrals_from ?? '',
  },
  {
    header: 'Refferals - To - 1 = Community Unit 2 = Another Health Facility 3 = Not Applicable',
    value: (row) => row.referrals_to ?? '',
  },
  { header: 'Refferals - Reasons for referral (specify)', value: (row) => row.reason_for_referral ?? '' },
  { header: 'Remarks', value: (row) => row.remarks ?? '' },
  { header: 'Nupi', value: (row) => row.nupi ?? '' },
  { header: 'Age', value: (row) => row.age ?? '' },
  { header: 'Phone number', value: (row) => row.phone_number ?? '' },
  { header: 'Pallor', value: (row) => row.pallor ?? '' },
  { header: 'Cervical cancer results', value: (row) => row.cervical_cancer_results ?? '' },
  { header: 'Family planning method', value: (row) => row.family_planning_method ?? '' },
];
