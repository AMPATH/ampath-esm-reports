import dayjs from 'dayjs';

import { type LinelistColumn } from '../../common/linelist-table';
import { MOH_240_HEADERS, formatRegisterDate, moh240Columns } from './moh-240.columns';

/** Blank rather than "null" / "undefined" in a cell */
const text = (value: unknown) => (value === null || value === undefined ? '' : String(value).trim());

/** The ISO date behind either an ISO datetime or a DD/MM/YYYY cell, else '' */
const toIsoDate = (value: unknown): string => {
  const raw = text(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    return raw.slice(0, 10);
  }
  const parts = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  return parts ? `${parts[3]}-${parts[2]}-${parts[1]}` : '';
};

/** A row whose own test is a random blood sugar (not the fasting one) */
const isRandomBloodSugar = (row: Record<string, any>) =>
  /\brbs\b|random blood sugar/i.test(text(row.investigation_required));

/** Whole days from the visit to the return-to-clinic date, when both exist */
const daysToRtc = (row: Record<string, any>): string => {
  const from = toIsoDate(row.date);
  const to = toIsoDate(row.rtc_date);
  if (!from || !to) {
    return '';
  }
  const days = dayjs(to).diff(dayjs(from), 'day');
  return days >= 0 ? String(days) : '';
};

/**
 * The drill-down line list behind every clickable figure on the MOH 706 (and
 * MOH 505) report: the DHA "Line List Summary minimum Requirements" columns,
 * in the requirements' own order. Values come from the lab-706 patient-list
 * payload -- the register's own fields plus the columns the template prefills
 * from the clinical flat tables (etl-rest-server v1.10). A column the payload
 * does not carry yet reads blank against its named field, so it fills with no
 * frontend change once the ETL layer grows it.
 */
export function moh240LineListColumns(facility: string): LinelistColumn[] {
  return [
    // A. RECORD & VISIT
    { header: 'Serial No', field: 'lab_no', text: true },
    { header: 'Facility Name', value: () => facility },
    { header: 'Visit Date', value: (row) => formatRegisterDate(row.date), sortValue: (row) => toIsoDate(row.date) },
    { header: 'Encounter Type', field: 'encounter_type' },
    { header: 'CR Number', field: 'cr_number', text: true },
    // B. CLIENT
    { header: 'Client Name', field: 'full_name', wrap: true },
    { header: 'Sex', field: 'sex' },
    { header: 'Age (years)', field: 'age' },
    // C. NUTRITION
    { header: 'Nutrition Assessment Type', field: 'nutrition_assessment_type' },
    { header: 'Nutrition Value', field: 'nutrition_value' },
    { header: 'Nutrition Status', field: 'nutrition_status' },
    // D. VITALS & LABS
    { header: 'Systolic BP (mmHg)', field: 'systolic' },
    { header: 'Diastolic BP (mmHg)', field: 'diastolic' },
    // the row's own blood-sugar result stands in until the patient's CDM
    // encounter prefills rbs, so an RBS test never shows as blank
    {
      header: 'RBS (mmol/L)',
      value: (row) => row.rbs ?? (isRandomBloodSugar(row) ? row.results : undefined),
    },
    {
      header: 'RBS Date',
      value: (row) =>
        row.rbs_date
          ? formatRegisterDate(row.rbs_date)
          : isRandomBloodSugar(row)
            ? formatRegisterDate(row.test_datetime)
            : '',
      sortValue: (row) => toIsoDate(row.rbs_date || (isRandomBloodSugar(row) ? row.test_datetime : '')),
    },
    // E. SCREENING
    { header: 'TB Screening Date', field: 'tb_screening_date' },
    { header: 'TB Screening Result', field: 'tb_screening_result' },
    { header: 'Ebola Screening Status', field: 'ebola_screening_status' },
    { header: 'Cervical Screening Eligible', field: 'cervical_screening_eligible' },
    { header: 'Cervical Screening Date', field: 'cervical_screening_date' },
    { header: 'Cervical Screening Method', field: 'cervical_screening_method' },
    { header: 'Cervical Screening Result', field: 'cervical_screening_result' },
    { header: 'Diagnosis', field: 'clinical_diagnosis', wrap: true },
    { header: 'Return-to-Clinic Date', field: 'rtc_date' },
    { header: 'Days to RTC', value: daysToRtc },
    // G. FINANCING & PROVIDER
    { header: 'SHA Enrolled', field: 'sha_enrolled' },
    { header: 'SHA Status', field: 'sha_status' },
    { header: 'Provider Name', field: 'clinician_name' },
  ];
}

/**
 * The register's own 27 columns, kept available behind the requirements'
 * minimum set: rebuilt from the register's single column spec (so both views
 * stay one source of truth) and started hidden -- a user shows them from the
 * Columns menu when a drill-down needs the lab detail.
 */
export function moh240LineListLabColumns(indicators: string): LinelistColumn[] {
  return moh240Columns(indicators).map((column) => ({
    header: column.header,
    // the register's column values take the row's running index for the CSV;
    // the line list renders each row on its own, so 0 is the honest index
    value: (row: Record<string, any>) => column.value(row, 0),
    text: column.text,
    wrap: column.wrap,
    hidden: true,
  }));
}

/**
 * The register columns a lab indicator's drill-down starts un-hidden, so e.g.
 * a TB smear figure opens onto its specimen, stain and result. Unknown
 * indicators auto-show nothing; the user can always show more.
 */
export function lineListShowColumns(indicators: string): string[] {
  const list = indicators.toLowerCase();
  const show = new Set<string>();

  if (/tb_|sputum|smear|culture/.test(list)) {
    ['Type of Specimen', 'Investigation Required', 'Results', 'Date Sample Collected', 'Date Sample Analysed'].forEach(
      (header) => show.add(header),
    );
  }

  if (/urine|urinalysis|glucose|ketone|protein|blood_sugar|ogtt|hba1c|cd4|viral/.test(list)) {
    ['Type of Specimen', 'Investigation Required', 'Results'].forEach((header) => show.add(header));
  }

  return [...show];
}

/** The register's own column headings, for tests and layout tooling */
export const MOH_240_LAB_COLUMN_HEADERS = MOH_240_HEADERS.map(({ header }) => header);
