import dayjs from 'dayjs';

import { type RegisterColumn } from '../../common/report-register';

/**
 * One row of the TB Laboratory Register: a lab-706 patient-list payload row for
 * a TB test, fetched with the `total_tb_smear` indicator -- the one TB row
 * filter the existing dataset carries (MOH 706 5.29). The columns the dataset
 * does not carry yet (time in/out, ID/NEMIS, patient type, HIV status, TB-LAMP,
 * LF-LAM, GeneXpert/Truenat) read blank until the ETL layer grows them.
 */
export type TbLabRow = Record<string, any>;

/** Blank rather than "null" / "undefined" in a cell */
export const text = (value: unknown) => (value === null || value === undefined ? '' : String(value).trim());

/** DD/MM/YYYY, as the register prints it; values already in that shape pass through */
export function asRegisterDate(value: unknown): string {
  const raw = text(value);
  if (!raw) {
    return '';
  }
  return /^\d{4}-\d{2}-\d{2}/.test(raw) ? dayjs(raw.slice(0, 10)).format('DD/MM/YYYY') : raw;
}

/** The date part of either an ISO datetime or an already-formatted DD/MM/YYYY, as YYYY-MM-DD */
const toIsoDate = (value: unknown): string => {
  const raw = text(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    return raw.slice(0, 10);
  }
  const parts = raw.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  return parts ? `${parts[3]}-${parts[2]}-${parts[1]}` : '';
};

/** Turnaround in whole calendar days, from sample collected to results dispatched */
export function tatDays(row: TbLabRow): string {
  const from = toIsoDate(row.test_datetime);
  const to = toIsoDate(row.date_results_dispatched);
  if (!from || !to) {
    return '';
  }
  const days = dayjs(to).diff(dayjs(from), 'day');
  return days >= 0 ? String(days) : '';
}

/**
 * Which sputum the row's sample is. The dataset does not carry the sample's
 * timing yet, so it is read off the specimen label; rows that do not say print
 * under Spot rather than being dropped, until the ETL carries the timing.
 */
export function timingOf(row: TbLabRow): 'spot' | 'morning' {
  return /morning/i.test(text(row.type_of_specimen)) ? 'morning' : 'spot';
}

/** The stain the microscopy used, as the template's Type ZN/FM column reads it */
export function stainType(row: TbLabRow): string {
  const investigation = text(row.investigation_required).toLowerCase();
  if (/fluor|\bfm\b/.test(investigation)) {
    return 'FM';
  }
  if (/ziehl|\bzn\b/.test(investigation)) {
    return 'ZN';
  }
  return '';
}

/** Which of the register's result columns the row's test result belongs in */
function resultKindOf(row: TbLabRow): 'microscopy' | 'tb_lamp' | 'lf_lam' | 'genexpert' {
  const investigation = text(row.investigation_required).toLowerCase();
  if (/lamp/.test(investigation)) {
    return 'tb_lamp';
  }
  if (/\blam\b|lf.?lam|lateral flow/.test(investigation)) {
    return 'lf_lam';
  }
  if (/xpert|genexp|truenat|mtb|rif/.test(investigation)) {
    return 'genexpert';
  }
  return 'microscopy';
}

/** The row's result, placed in its own column: blank in the other result columns */
const resultIn = (kind: 'microscopy' | 'tb_lamp' | 'lf_lam' | 'genexpert') => (row: TbLabRow) =>
  resultKindOf(row) === kind ? text(row.results) : '';

/** The sample appearance, under the sub-column its timing names */
const appearanceIn = (timing: 'spot' | 'morning') => (row: TbLabRow) =>
  timingOf(row) === timing ? text(row.condition_of_specimen) : '';

/** The microscopy result, under the sub-column its timing names */
const microscopyIn = (timing: 'spot' | 'morning') => (row: TbLabRow) =>
  resultKindOf(row) === 'microscopy' && timingOf(row) === timing ? text(row.results) : '';

export interface TbLabColumn {
  /** The two-tier header group the column sits under, e.g. `Microscopy result` */
  group?: string;
  /** The column's own label, as the printed template reads it */
  header: string;
  value: (row: TbLabRow, index: number) => unknown;
  /** Identifiers and phones stay text in the CSV */
  text?: boolean;
  /** Prose columns read left-aligned; the rest centre, as on the template */
  align?: 'left';
}

/** The register's columns, in the order the printed template runs them */
export const TB_LAB_COLUMNS: TbLabColumn[] = [
  { header: 'Lab S/No.', value: (row, index) => text(row.lab_no) || index + 1 },
  { header: 'Date sample collected', value: (row) => asRegisterDate(row.test_datetime) },
  { header: 'Date sample received', value: (row) => asRegisterDate(row.date_sample_received) },
  /* not in the dataset yet: the ETL layer will carry it with the sample's timing */
  { header: 'Time in', value: () => '' },
  { header: 'Name (full)', value: (row) => text(row.full_name), align: 'left' },
  { header: 'TB Reg. No. for follow ups / OPD No.', value: (row) => text(row.opd_ip_ref_no) },
  { header: 'Sex M/F', value: (row) => text(row.sex) },
  { header: 'Age (years)', value: (row) => text(row.age) },
  /* not in the dataset yet: national ID / NEMIS / passport */
  { header: "Patient's ID No./ NEMIS/ Passport", value: () => '' },
  {
    header: "Patient's physical address",
    value: (row) => [text(row.village_estate_landmark), text(row.county_sub_county)].filter(Boolean).join(', '),
    align: 'left',
  },
  { header: "Patient's/ guardian phone no.", value: (row) => text(row.telephone_number), text: true },
  /* the dataset's referrals carry the from/to facility, which is what the
     template's referring-facility column holds until a department is carried */
  { header: 'Name of referring facility/ Department', value: (row) => text(row.referrals), align: 'left' },
  /* not in the dataset yet: N / F2/F3/F5/F6 / O */
  { header: 'Type of patient N, F2/F3/F5/F6, O', value: () => '' },
  /* not in the dataset yet: Pos/Neg/ND/D */
  { header: 'HIV status Pos/Neg/ND/D', value: () => '' },
  { group: 'Sample appearance S / M / B', header: 'Spot', value: appearanceIn('spot') },
  { group: 'Sample appearance S / M / B', header: 'Morning', value: appearanceIn('morning') },
  { group: 'Microscopy result 0 = No AFB | actual no. | 1+ 2+ 3+', header: 'Type ZN/FM', value: stainType },
  { group: 'Microscopy result 0 = No AFB | actual no. | 1+ 2+ 3+', header: 'Spot', value: microscopyIn('spot') },
  {
    group: 'Microscopy result 0 = No AFB | actual no. | 1+ 2+ 3+',
    header: 'Morning',
    value: microscopyIn('morning'),
  },
  { header: 'TB-LAMP', value: resultIn('tb_lamp') },
  { header: 'LF-LAM', value: resultIn('lf_lam') },
  { header: 'GeneXpert/ Truenat', value: resultIn('genexpert') },
  { header: 'Date tested', value: (row) => asRegisterDate(row.date_sample_analysed) },
  { header: 'Date results dispatched', value: (row) => asRegisterDate(row.date_results_dispatched) },
  /* not in the dataset yet */
  { header: 'Time out (results dispatch)', value: () => '' },
  { header: 'TAT (days)', value: tatDays },
  { header: "Laboratory officer's name", value: (row) => text(row.testing_officer), align: 'left' },
  { header: 'Remarks (date & place sample referred etc.)', value: (row) => text(row.comments), align: 'left' },
];

/**
 * The register as exportable CSV columns: the two-tier header flattened into
 * one unambiguous label per column, so the file reads without the grouping.
 */
export function tbLabCsvColumns(): RegisterColumn[] {
  return TB_LAB_COLUMNS.map((column) => ({
    header: column.group ? `${column.group} - ${column.header}` : column.header,
    value: column.value,
    text: column.text,
  }));
}
