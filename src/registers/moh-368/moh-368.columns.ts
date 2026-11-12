import { type RegisterColumn } from '../../common/report-register';

/**
 * MOH 368 columns in the order they appear on the register.
 */
export const moh368ExportColumns: RegisterColumn[] = [
  { header: 'No', value: (_row, index) => index + 1 },
  {
    header: 'Unique Nutrition Reg Number',
    value: (row) => row.nutrition_reg_number ?? '',
    text: true,
  },
  { header: 'Admission Date', value: (row) => row.admission_date ?? '' },
  { header: "Client's Name", value: (row) => row.client_name ?? '' },
  { header: 'Birth Notification Number', value: (row) => row.birth_notification_number ?? '', text: true },
  {
    header: 'Physical Address / County/Subcounty / Phone Number',
    value: (row) => [row.address, row.county_subcounty, row.phone_number].filter(Boolean).join(', '),
    text: true,
  },
  { header: 'Age (Years)', value: (row) => row.age ?? '' },
  { header: 'Sex (M/F)', value: (row) => row.sex ?? '' },
  { header: 'In Household food security programme[1]', value: (row) => row.inhousehold_food_security ?? '' },
  { header: 'Admission criteria', value: (row) => row.admission_criteria ?? '' },
  { header: 'Type of admission', value: (row) => row.type_of_admission ?? '' },
  { header: 'Serostatus', value: (row) => row.serostatus ?? '' },
  { header: 'TB Status', value: (row) => row.tb_status ?? '' },
  { header: 'Height/Length (cm)', value: (row) => row.height ?? '' },
  { header: 'Weight (Kg)', value: (row) => row.weight ?? '' },
  { header: 'WHZ score', value: (row) => row.whz_score ?? '' },
  { header: 'MUAC (cm)', value: (row) => row.muac ?? '' },
  { header: 'Day 1 Weight', value: (row) => row.weight_in_kgs ?? row.weight ?? '' },
  { header: 'Day 1 MUAC', value: (row) => row.muac ?? '' },
  { header: 'Day 2 Weight', value: (row) => row.weight_in_kgs ?? row.weight ?? '' },
  { header: 'Day 2 MUAC', value: (row) => row.muac ?? '' },
];
