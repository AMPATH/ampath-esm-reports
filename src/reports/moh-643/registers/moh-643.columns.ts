import { type RegisterColumn } from '../../../common/report-register';

function formatDateValue(value: unknown): string {
  if (!value) {
    return '';
  }
  const text = String(value);
  return text.includes('T') ? text.slice(0, 10) : text;
}

function countForIndicator(row: Record<string, any>, indicator?: string | null): string {
  if (indicator && row[indicator] != null && row[indicator] !== '') {
    return String(row[indicator]);
  }
  const tests = Object.keys(row).filter((key) => key.startsWith('tests_') && Number(row[key]));
  if (tests.length === 1) {
    return String(row[tests[0]]);
  }
  return '';
}

export const moh643ExportColumns: RegisterColumn[] = [
  { header: 'Visit date', value: (row) => formatDateValue(row.visit_date) },
  { header: 'Facility', value: (row) => row.facility ?? '' },
  { header: 'Patient name', value: (row) => row.person_name ?? '' },
  { header: 'Sex', value: (row) => row.gender ?? '' },
  { header: 'Age (years)', value: (row) => row.age_years ?? '' },
  { header: 'Identifier', value: (row) => row.amrs_universal_id ?? '', text: true },
  { header: 'Phone', value: (row) => row.phone_number ?? '', text: true },
  { header: 'Test', value: (row) => row.test_name ?? '' },
  { header: 'Count', value: (row) => countForIndicator(row) },
];
