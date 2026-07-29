import { type RegisterColumn } from '../../../common/report-register';

/**
 * MOH 511 as the register prints it: one column per cell, in the order they appear.
 */
export const moh511ExportColumns: RegisterColumn[] = [
  { header: 'Serial No. - A', value: (row) => row.serial_no ?? '' },
  { header: 'Date. (DD:MM:YYYY) - B', value: (row) => row.visit_date ?? '' },
  { header: 'CWC No. (New Visit) - C', value: (row) => row.cwc_number_new ?? '' },
  { header: 'CWC No. (Revisit) - D', value: (row) => row.cwc_number_revisit ?? '' },
  { header: 'BIRTH NOTIFICATION (NUMBER) - E', value: (row) => row.birth_notification_number ?? '' },
  { header: 'Full Names (Three names) - F', value: (row) => row.full_name ?? '' },
  { header: 'Age - G', value: (row) => row.age ?? '' },
  { header: 'Sex - H', value: (row) => row.sex ?? '' },
  { header: 'County/Sub- county - I', value: (row) => row.county_sub_county ?? '' },
  { header: 'Village /Estate / Landmark - J', value: (row) => row.village_estate_landmark ?? '' },
  { header: 'Telephone number - K', value: (row) => row.phone_number ?? '' },
  { header: 'Weight in Kgs - L', value: (row) => row.weight_kg ?? '' },
  { header: 'Weight categories: (1=Normal 2=UW 3=SUW 4=OW 5=Obese) - M', value: (row) => row.weight_category ?? '' },
  { header: 'Height / Length in cm - N', value: (row) => row.height ?? '' },
  {
    header: 'Height/Length categories: (1=Normal 2=Stunted 3=Sev. Stunted) - O',
    value: (row) => row.height_category ?? '',
  },
  { header: 'MUAC 1.Green 2.Yellow 3.Red - P', value: (row) => row.muac ?? '' },
  {
    header: 'Exclusive Breast feeding (less than 6 months)(Y/N) - Q',
    value: (row) => row.exclusive_breastfeeding_less_6_months ?? '',
  },
  {
    header: 'Vitamin A supplimentation: (6-59 months) (1=6- 11 months, 2=12-59 months, 3=Not supplimented) - R',
    value: (row) => row.vitamin_A_supplementation ?? '',
  },
  { header: 'Dewormed (Y/N) - S', value: (row) => row.dewormed ?? '' },
  { header: 'MNPs supplimentation:(6-23 children) - T', value: (row) => row.mnps_supplimentation ?? '' },
  {
    header: 'Childs assessed for Developmental milestones including 1st Haed control ,2= sitting, 3=talking - U',
    value: (row) => row.developmental_milestones ?? '',
  },
  {
    header:
      'Any Danger Signs 1.Unable to breastfeed 2.Unable to drink 3.Vomits everything 4.Bloody diarrhoea 5.Has oedema 6.Has convulsions - V',
    value: (row) => row.danger_signs ?? '',
  },
  { header: 'Any Disability - W', value: (row) => row.disability ?? '' },
  { header: 'Immunization status up to date(Y/N) - X', value: (row) => row.immunization_status_up_to_date ?? '' },
  { header: 'LLIN gievn to under 1 years(Y/N) - Y', value: (row) => row.llin_supplimentation_given ?? '' },
  { header: 'Follow up for: 1=Nutrition service 2=Rehabilitation service - Z', value: (row) => row.follow_up ?? '' },
  {
    header: '1=referred from CU; 2= referred from another H/F; 3=Not applicable - AA',
    value: (row) => row.referred_from ?? '',
  },
  {
    header: '1=referred to CU; 2= referred to another H/F; 3=Not applicable - AB',
    value: (row) => row.referred_to ?? '',
  },
  { header: 'Reason for referral ....specify - AC', value: (row) => row.reason_for_referral ?? '' },
  { header: 'REMARKS - AD', value: (row) => row.remarks ?? '' },
];
