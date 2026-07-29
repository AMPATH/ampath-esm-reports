import { type RegisterColumn } from '../../common/report-register';

/** The register's columns, in the order the printed MOH 240 prints them */
export const MOH_240_HEADERS = [
  { key: 'date', header: 'Date (DD/MM/YYYY)' },
  { key: 'opd_ip_ref_no', header: 'OPD / IPD Ref. No.' },
  { key: 'lab_no', header: 'Lab. No. (new client)' },
  { key: 'revisit_no', header: 'Revisit No.' },
  { key: 'full_name', header: 'Full Names (Three names)' },
  { key: 'age', header: 'Age' },
  { key: 'sex', header: 'Sex' },
  { key: 'county_sub_county', header: 'County / Sub County' },
  { key: 'village_estate_landmark', header: 'Village / Estate / Landmark' },
  { key: 'telephone_number', header: 'Telephone Number' },
  { key: 'clinical_diagnosis', header: 'Clinical Diagnosis' },
  { key: 'prior_treatment', header: 'Prior Treatment' },
  { key: 'type_of_specimen', header: 'Type of Specimen' },
  { key: 'condition_of_specimen', header: 'Condition of Specimen' },
  { key: 'investigation_required', header: 'Investigation Required' },
  { key: 'test_datetime', header: 'Date Sample Collected' },
  { key: 'date_sample_received', header: 'Date Sample Received' },
  { key: 'clinician_name', header: 'Clinician Name' },
  { key: 'date_sample_analysed', header: 'Date Sample Analysed' },
  { key: 'results', header: 'Results' },
  { key: 'date_results_dispatched', header: 'Date Results Dispatched' },
  { key: 'amount_charged', header: 'Amount Charged' },
  { key: 'receipt_number', header: 'Receipt Number' },
  { key: 'referrals', header: 'Referrals (From Other HF / To Other HF / 3rd Tier Reference Laboratories)' },
  { key: 'comments', header: 'Comments' },
  { key: 'testing_officer', header: 'Name of Analysing/Testing Officer' },
  { key: 'signature', header: 'Signature' },
] as const;

/** The column letters the printed register runs across the top */
export const MOH_240_SUB_HEADERS = MOH_240_HEADERS.map((_, i) =>
  i < 26 ? String.fromCharCode(65 + i) : `A${String.fromCharCode(65 + i - 26)}`,
);

/**
 * The results column carries whichever indicator the drill-down was opened for,
 * so it is read from a field named by that indicator rather than from `results`.
 */
export function resultFieldFor(indicator: string): string {
  if (indicator.startsWith('min_') || indicator.startsWith('max_')) {
    return indicator.substring(4);
  }
  if (indicator.startsWith('total_')) {
    return indicator.substring(6);
  }
  if (indicator.startsWith('positive_')) {
    return indicator.substring(9);
  }
  return indicator;
}

/** Exported with the register's own headings, so the CSV matches the form */
export function moh240Columns(indicator: string): RegisterColumn[] {
  const resultField = resultFieldFor(indicator);

  return MOH_240_HEADERS.map(({ key, header }) => ({
    header,
    value: (row: Record<string, any>) => (key === 'results' ? (row[resultField] ?? '') : (row[key] ?? '')),
  }));
}
