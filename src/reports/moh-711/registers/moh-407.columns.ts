import { type RegisterColumn } from '../../../common/report-register/register-columns';

/**
 * MOH 407 columns, flattened from the register's two-row table header.
 */
export const Moh407xportColumns: RegisterColumn[] = [
  { header: 'Serial Number', value: (_row, index) => index + 1 },
  { header: 'Date', value: (row) => row.date ?? '' },
  { header: 'National Identification Number', value: (row) => row.national_identification_number ?? '' },
  { header: 'Patient Names', value: (row) => row.patient_names ?? '' },
  { header: 'Patient Visit', value: (row) => row.patient_visit ?? '' },
  { header: 'Residence', value: (row) => row.residence ?? '' },
  { header: 'Sex', value: (row) => row.sex ?? '' },
  { header: 'Age - Years', value: (row) => row.age_years ?? '' },
  { header: 'Age - Months', value: (row) => row.age_months ?? '' },
  { header: 'Pregnant or Breastfeeding', value: (row) => row.pregnant_or_breastfeeding ?? '' },
  { header: 'Nutritional Assessment - Figure for z score', value: (row) => row.z_score ?? '' },
  { header: 'Nutrition Status', value: (row) => row.nutrition_status ?? '' },
  { header: 'Serostatus', value: (row) => row.serostatus ?? '' },
  { header: 'Medical Condition', value: (row) => row.medical_condition ?? '' },
  { header: 'Food Secure', value: (row) => row.food_secure ?? '' },
  { header: 'Nutrition Intervention', value: (row) => row.nutrition_intervention ?? '' },
  { header: 'Remarks', value: (row) => row.remarks ?? '' },
];
