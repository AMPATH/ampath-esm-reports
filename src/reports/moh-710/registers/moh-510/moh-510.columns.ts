import { type RegisterColumn } from '../../../../common/report-register/register-columns';

/**
 * MOH 204A as the register prints it: one column per cell, in the order they appear.
 */
export const moh510ExportColumns: RegisterColumn[] = [
  { header: 'Date (DD/MM/YYYY) - A', value: (row) => row.date ?? '' },
  {
    header: "Child's Number - B",
    value: (row) => row.child_number ?? '',
  },
  { header: "Child's Names - C", value: (row) => row.child_names ?? '' },
  { header: 'Sex - D', value: (row) => row.sex ?? '' },
  { header: 'Date of Birth - E', value: (row) => row.date_of_birth ?? '' },
  { header: 'Date first Seen - F', value: (row) => row.date_first_seen ?? '' },
  { header: "Father's Full Names/Guardian - G", value: (row) => row.father_names ?? '' },
  { header: "Mother's Full Names/Guardian - H", value: (row) => row.mother_names ?? '' },
  { header: 'Village /Estate / Landmark - I', value: (row) => row.village_estate_landmark ?? '' },
  { header: 'Telephone No. - J', value: (row) => row.phone_number ?? '' },
  { header: 'BCG - K', value: (row) => row.bcg ?? '' },
  { header: 'Polio birth Dose - L', value: (row) => row.polio_birth_dose ?? '' },
  { header: 'OPV 1 - M', value: (row) => row.opv_1 ?? '' },
  { header: 'OPV 2 - N', value: (row) => row.opv_2 ?? '' },
  { header: 'OPV 3 - O', value: (row) => row.opv_3 ?? '' },
  { header: 'IPV - P', value: (row) => row.ipv ?? '' },
  { header: 'DPT / Hep.B / Hib.1 - Q', value: (row) => row.dpt_hep_1 ?? '' },
  { header: 'DPT / Hep.B / Hib.2 - R', value: (row) => row.dpt_hep_2 ?? '' },
  { header: 'DPT / Hep.B / Hib.3 - S', value: (row) => row.dpt_hep_3 ?? '' },
  { header: 'PCV 10 (Pneumococcal) T - AB', value: (row) => row.pneumococcal_1 ?? '' },
  { header: 'PCV 10 (Pneumococcal) U - AB', value: (row) => row.pneumococcal_2 ?? '' },
  { header: 'PCV 10 (Pneumococcal) V - AB', value: (row) => row.pneumococcal_3 ?? '' },
  { header: 'Rota1 - W', value: (row) => row.rotavirus_1 ?? '' },
  { header: 'Rota2 - X', value: (row) => row.rotavirus_2 ?? '' },
  { header: 'Vitamin A(6-11 months) - Y', value: (row) => row.vitamin_a_6_11_months ?? '' },
  { header: 'MR1 - Z', value: (row) => row.measles_rubella_1 ?? '' },
  { header: 'Yellow Fever - AA', value: (row) => row.yellow_fever ?? '' },
  { header: 'Fully Immunized Child - AB', value: (row) => row.fully_immunized_child ?? '' },
  { header: 'MR2 - AC', value: (row) => row.measles_rubella_2 ?? '' },
  { header: 'Remarks - AD', value: (row) => row.remarks ?? '' },
];
