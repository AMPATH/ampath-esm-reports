import { type RegisterColumn } from '../../../common/report-register';

function formatDateValue(value: unknown): string {
  if (!value) {
    return '';
  }
  const text = String(value);
  return text.includes('T') ? text.slice(0, 10) : text;
}

function countValue(...values: unknown[]): string {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== '') {
      const n = Number(value);
      if (!Number.isNaN(n) && n !== 0) {
        return String(n);
      }
    }
  }
  return '';
}

export const moh645ExportColumns: RegisterColumn[] = [
  { header: 'Visit date', value: (row) => formatDateValue(row.visit_date) },
  { header: 'Facility', value: (row) => row.facility ?? '' },
  { header: 'IP/OP', value: (row) => row.ip_op ?? '' },
  { header: 'Patient name', value: (row) => row.person_name ?? '' },
  { header: 'Sex', value: (row) => row.gender ?? '' },
  { header: 'Age (years)', value: (row) => row.age_years ?? '' },
  { header: 'Identifier', value: (row) => row.amrs_universal_id ?? '', text: true },
  { header: 'Phone', value: (row) => row.phone_number ?? '', text: true },
  { header: 'Drug', value: (row) => row.drug_name ?? '' },
  { header: 'Quantity', value: (row) => row.quantity ?? '' },
  { header: 'Microscopy POS', value: (row) => countValue(row.microscopy_pos, row.microscopy_positive) },
  { header: 'Microscopy NEG', value: (row) => countValue(row.microscopy_neg, row.microscopy_negative) },
  { header: 'mRDT POS', value: (row) => countValue(row.mrdt_pos, row.rdt_positive) },
  { header: 'mRDT NEG', value: (row) => countValue(row.mrdt_neg, row.rdt_negative) },
  { header: 'mRDT INV', value: (row) => countValue(row.mrdt_inv, row.rdt_invalid) },
  { header: 'No test done', value: (row) => countValue(row.no_test_done) },
];
