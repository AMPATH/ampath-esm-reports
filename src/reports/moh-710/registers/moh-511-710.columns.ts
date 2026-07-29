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
  { header: 'Weight - L', value: (row) => row.height ?? '' },
  { header: 'Height - M', value: (row) => row.weight_kg ?? '' },
  { header: 'Weight in Kgs - N', value: (row) => row.weight_category ?? '' },
  { header: 'Weight categories: (1=Normal 2=UW 3=SUW 4=OW 5=Obese) - O', value: (row) => row.height_category ?? '' },
  { header: 'Height / Length in cm - P', value: (row) => row.muac ?? '' },
  {
    header: 'Height/Length categories: (1=Normal 2=Stunted 3=Sev. Stunted) - Q',
    value: (row) => row.exclusive_breastfeeding_less_6_months ?? '',
  },
  { header: 'MUAC 1.Green 2.Yellow 3.Red - R', value: (row) => row.vitamin_A_supplementation ?? '' },
  { header: 'Exclusive Breast feeding (less than 6 months)(Y/N) - S', value: (row) => row.dewormed ?? '' },
  {
    header: 'Vitamin A supplimentation: (6-59 months) (1=6- 11 months, 2=12-59 months, 3=Not supplimented) - T',
    value: (row) => row.mnps_supplimentation ?? '',
  },
  { header: 'Dewormed (Y/N) - U', value: (row) => row.developmental_milestones ?? '' },
  { header: 'MNPs supplimentation:(6-23 children) - V', value: (row) => row.danger_signs ?? '' },
  {
    header: 'Childs assessed for Developmental milestones including 1st Haed control ,2= sitting, 3=talking - W',
    value: (row) => row.disability ?? '',
  },
  {
    header:
      'Any Danger Signs 1.Unable to breastfeed 2.Unable to drink 3.Vomits everything 4.Bloody diarrhoea 5.Has oedema 6.Has convulsions - X',
    value: (row) => row.immunization_status_up_to_date ?? '',
  },
  { header: 'Any Disability - Y', value: (row) => row.llin_supplimentation_given ?? '' },
  { header: 'Immunization status up to date(Y/N) - Z', value: (row) => row.follow_up ?? '' },
  { header: 'LLIN gievn to under 1 years(Y/N) - AA', value: (row) => row.referred_from ?? '' },
  { header: 'Follow up for: 1=Nutrition service 2=Rehabilitation service - AB', value: (row) => row.referred_to ?? '' },
  {
    header: '1=referred from CU; 2= referred from another H/F; 3=Not applicable - AC',
    value: (row) => row.remarks ?? '',
  },
];
