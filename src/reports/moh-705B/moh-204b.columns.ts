import { type RegisterColumn } from '../../common/report-register';

/**
 * MOH 204B as the register prints it: one column per cell, in the order they appear.
 */
export const moh204bExportColumns: RegisterColumn[] = [
  { header: 'Date (DD/MM/YYYY) - A', value: (row) => row.date ?? '' },
  { header: 'OPD No. (New) - B', value: (row) => row.opd_number_new_visit ?? '' },
  { header: 'OPD No. (Revisit) - C', value: (row) => row.opd_number_return_visit ?? '' },
  { header: 'Referred From 1=CU, 2=From Other facility, 3= Within 4=N/A - D', value: (row) => row.referred_from ?? '' },
  { header: 'Full Names (THREE names) - E', value: (row) => row.full_names ?? '' },
  { header: 'Age in Years - F', value: (row) => row.age ?? '' },
  { header: 'Sex - G', value: (row) => row.sex ?? '' },
  { header: 'Countu/Sub- county - H', value: (row) => row.county_sub_county ?? '' },
  { header: 'Village /Estate / Landmark - I', value: (row) => row.village_estate_landmark ?? '' },
  { header: "Patient/ Parent/Caregivers's Telephone No. - J", value: (row) => row.phone_number ?? '' },
  { header: 'Weight - K', value: (row) => row.weight ?? '' },
  { header: 'Height - L', value: (row) => row.height ?? '' },
  { header: 'BMI (Kg/m2) - M', value: (row) => row.bmi ?? '' },
  { header: 'Temp (oC) - N', value: (row) => row.temp ?? '' },
  { header: 'BP - O', value: (row) => row.systolic ?? '' },
  { header: 'Visual Aquity "RE (Right Eye)"LE (Left Eye) - P', value: (row) => row.visual_aquity_re ?? '' },
  {
    header: 'TB Screening 1. presumed TB 2. No signs 3. On TB Treatment 4. Not done - Q',
    value: (row) => row.tb_screening ?? '',
  },
  {
    header:
      'Malaria 1.Presenting with symptoms NOT Tested 2.RDT Tested (-ve) 3.Microscopy Tested (-ve) 4.RDT Tested (+ve) 5. Microscopy Tested (+ve) - R',
    value: (row) => row.malaria ?? '',
  },
  { header: 'Diagnosis - S', value: (row) => row.diagnosis ?? '' },
  { header: 'Treatment/Prescription - T', value: (row) => row.treatment_prescription ?? '' },
  {
    header: 'Referred to (1=CU, 2= to other H/F, 3=within the facility/ 4=N/A) - V',
    value: (row) => row.referred_to ?? '',
  },
  { header: 'REMARKS/ Outcome - W', value: (row) => row.remarks ?? '' },
];
