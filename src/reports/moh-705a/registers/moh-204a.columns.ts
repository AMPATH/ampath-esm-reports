import { type RegisterColumn } from '../../../common/report-register';

/**
 * MOH 204A as the register prints it: one column per cell, in the order they appear.
 */
export const moh204aExportColumns: RegisterColumn[] = [
  { header: 'Date (DD/MM/YYYY) - A', value: (row) => row.date ?? '' },
  { header: 'OPD No. (New) - B', value: (row) => row.opd_number_new_visit ?? '' },
  { header: 'OPD No. (Revisit) - C', value: (row) => row.opd_number_return_visit ?? '' },
  { header: 'Referred From 1=CU, 2=From Other facility, 3= Within 4=N/A - D', value: (row) => row.referred_from ?? '' },
  { header: 'Full Names (THREE names) - E', value: (row) => row.full_names ?? '' },
  { header: 'Age - F', value: (row) => row.age ?? '' },
  { header: 'Sex - G', value: (row) => row.sex ?? '' },
  { header: 'Countu/Sub-county - H', value: (row) => row.county_sub_county ?? '' },
  { header: 'Village /Estate / Landmark - I', value: (row) => row.village_estate_landmark ?? '' },
  { header: "Parent/Caregivers's Telephone No. - J", value: (row) => row.caregiver_phone_number ?? '' },
  { header: 'Weight(kg) - K', value: (row) => row.weight ?? '' },
  { header: 'Height /Length (cm) - L', value: (row) => row.height ?? '' },
  { header: 'MUAC 1.Green 2.Yellow 3.Red - M', value: (row) => row.muac ?? '' },
  { header: 'Temp (oC) - N', value: (row) => row.temp ?? '' },
  { header: 'Respiratory Rate - O', value: (row) => row.respiratory_rate ?? '' },
  { header: 'Oxygen Saturation Reading (SPO2) - P', value: (row) => row.oxygen_saturation ?? '' },
  { header: 'Pulse Rate - Q', value: (row) => row.pulse_rate ?? '' },
  {
    header:
      'DANGER SIGNS 1.Unable to drink or breastfeed 2.Vomits everything 3.Had convulsions in this illness 4.Is lethargic or unconscious 5.Is convulsing now - R',
    value: (row) => row.danger_signs ?? '',
  },
  { header: 'Duration of Current Illness (in hours/ days) - S', value: (row) => row.duration_of_illness ?? '' },
  {
    header:
      'Malaria 1.Presenting with symptoms NOT Tested 2.RDT Tested (-ve) 3.Microscopy Tested (-ve) 4.RDT Tested (+ve) 5. Microscopy Tested (+ve) - T',
    value: (row) => row.suspected_malaria_cases ?? '',
  },
  { header: 'IMNCI Classification or Diagnosis - U', value: (row) => row.diagnosis ?? '' },
  {
    header:
      'TRACER DRUGS PRESCRIBED 1. ORS & Zinc (Co-pack) 2.Zinc Only 3. ORS Only 4. Amoxicillin DT 5. Vitamin A 6.Oxygen 7. Albendazole 8.IV Fluids - V',
    value: (row) => row.tracer_drugs_prescribed ?? '',
  },
  {
    header: 'Other ALL Treatments Prescribed 1. CPAP 2. Other - W',
    value: (row) => row.all_other_treatments_prescribed ?? '',
  },
  { header: 'Immunization Status Up to Date (Y/N) - X', value: (row) => row.immunization_status_up_to_date ?? '' },
  { header: 'TB Screening 1. presumed TB 2. Referred - Y', value: (row) => row.tb_screening ?? '' },
  {
    header:
      'Nutrition and diatetics Interventions 1=Nutrition counselling 2=Nutrition therapeutic supplements 3 =. Diatetics - Z',
    value: (row) => row.nutrition_dietetics ?? '',
  },
  {
    header: 'Referred to (1=CU, 2= to other H/F, 3=within the facility/ 4=N/A) - AA',
    value: (row) => row.referred_to ?? '',
  },
  { header: 'REMARKS/ Outcome - AB', value: (row) => row.remarks ?? '' },
];
