import dayjs from 'dayjs';

/**
 * One presumptive TB case in the register, column by column as on the form
 * (MOH/REG/DNTLDP/02, February 2023). Where a column holds two lines, the
 * upper and lower are separate fields.
 *
 * These are the columns the ETL returns (/presumptive-tb-register), one row
 * per TB encounter in the period.
 */
export interface PresumptiveTbRow {
  /** (A) cumulative from the start of each year */
  serial_number?: number | string | null;
  /** (B) patient department number, e.g. CCC or OPD number */
  department_number?: string | null;
  /** (C) date registered as a presumed TB/DR-TB case */
  date?: string | null;
  /** (D) first, middle and last names */
  full_name?: string | null;
  /** (E) M, F or other */
  sex?: string | null;
  /** (F) completed years, or months for a child under one, e.g. `35 Yrs` or `8 Mo` */
  age?: string | number | null;
  /** (G) upper: national ID (identifier type 5) */
  national_id?: string | null;
  /** (G) lower: Client Registry number (identifier type 55), in place of UPI */
  cr_number?: string | null;
  /** (H) upper: nearest landmark */
  physical_address?: string | null;
  /** (H) lower */
  phone_number?: string | null;
  /** (I) PS, SR, CI, CP, CHV or ISP */
  referred_by?: string | null;
  /** (J) upper: Positive, Negative or Not Done, in full */
  hiv_result?: string | null;
  /** (J) lower */
  hiv_test_date?: string | null;
  /** (K) type of sample (code) */
  sample_type?: string | null;
  /** (K) date the sputum sample was collected */
  sample_date?: string | null;
  /** (L) upper: N, SG, AO or ND */
  xray_result?: string | null;
  /** (L) lower */
  xray_date?: string | null;
  /** (M) upper: other radiological test(s) and result */
  other_radiology_result?: string | null;
  /** (M) lower */
  other_radiology_date?: string | null;
  /** (N) upper: molecular / culture test(s) and result, e.g. MTB + RS */
  molecular_result?: string | null;
  /** (N) lower */
  molecular_date?: string | null;
  /** (O) upper: microscopy / TB LAMP result */
  microscopy_result?: string | null;
  /** (O) lower */
  microscopy_date?: string | null;
  /** (P) DSTB, DRTB or No TB */
  outcome?: string | null;
  /** (Q) upper: Yes or No */
  started_tb_treatment?: string | null;
  /** (Q) lower: sub-county TB registration number & start date */
  tb_registration?: string | null;
  /** (R) upper: Yes or No */
  tpt_started?: string | null;
  /** (R) lower: TPT sub-county register number & start date */
  tpt_registration?: string | null;
  remarks?: string | null;
}

/** Blank rather than "null" / "undefined" in a cell */
export const text = (value: unknown) => (value === null || value === undefined ? '' : String(value));

/** DD/MM/YYYY, as the form asks */
export const formDate = (value: unknown) => (value ? dayjs(String(value)).format('DD/MM/YYYY') : '');

/** Diagnosed with TB: drug-sensitive or drug-resistant */
export const isDiagnosed = (row: PresumptiveTbRow) => ['DSTB', 'DRTB'].includes(text(row.outcome).toUpperCase());

/** Investigated for TB: a sample collected or any investigation recorded */
export const isInvestigated = (row: PresumptiveTbRow) =>
  [row.sample_date, row.xray_result, row.other_radiology_result, row.molecular_result, row.microscopy_result].some(
    (value) => text(value) !== '',
  );

/** A diagnosed case started on anti-TB treatment */
export const isInitiated = (row: PresumptiveTbRow) =>
  isDiagnosed(row) && /^y(es)?$/i.test(text(row.started_tb_treatment));
