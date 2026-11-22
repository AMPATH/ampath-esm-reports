import { type RegisterColumn } from '../../common/report-register';

const valueFrom = (row: Record<string, any>, keys: string[]) => {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== '') {
      return row[key];
    }
  }
  return '';
};

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
  ...Array.from({ length: 12 }, (_, index) => {
    const day = index + 1;
    return [
      { header: `Day ${day} Weight`, value: (row) => row.weight ?? '' },
      { header: `Day ${day} MUAC`, value: (row) => row.muac ?? '' },
    ] satisfies RegisterColumn[];
  }).flat(),
  {
    header: 'Discharge Weight (Kg)',
    value: (row) => valueFrom(row, ['discharge_weight', 'discharge_weight_kg', 'weight_at_discharge']),
  },
  {
    header: 'Discharge length/height',
    value: (row) => valueFrom(row, ['discharge_height', 'discharge_length', 'length_or_height_at_discharge']),
  },
  {
    header: 'Discharge WHZ',
    value: (row) => valueFrom(row, ['discharge_whz', 'discharge_whz_score', 'whz_at_discharge']),
  },
  {
    header: 'Discharge MUAC (cm)',
    value: (row) => valueFrom(row, ['discharge_muac', 'muac_at_discharge']),
  },
  { header: 'Exit date', value: (row) => valueFrom(row, ['exit_date', 'discharge_date']) },
  {
    header: 'Length of stay in days',
    value: (row) => valueFrom(row, ['length_of_stay', 'length_of_stay_in_days', 'days_in_care']),
  },
  { header: 'Exit Outcome[7]', value: (row) => valueFrom(row, ['exit_outcome', 'exit_status', 'nutrition_outcome']) },
  {
    header: 'Observations/comments',
    value: (row) => valueFrom(row, ['observations', 'observation', 'comments', 'remarks']),
    wrap: true,
  },
];
