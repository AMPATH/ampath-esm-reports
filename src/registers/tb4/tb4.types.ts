import dayjs from 'dayjs';

/** A test result with the date it was done, and for smears the serial number */
export interface Tb4Test {
  serial?: string | null;
  date?: string | null;
  result?: string | null;
}

/** Nutritional status: weight (kg), height/length (cm), BMI or Z score, MUAC */
export interface Tb4Nutrition {
  weight?: number | string | null;
  height?: number | string | null;
  bmi?: number | string | null;
  muac?: number | string | null;
}

/**
 * One patient in the TB4 Notification and Treatment Register
 * (MOH/REG/DLTLDP/01, February 2025), column by column as on the form's two
 * facing pages: A to T (patient, diagnosis and investigations) and U to AH
 * (treatment and follow-up).
 *
 * The register has no backend yet: these are the names its query is to
 * return, so the page fills in once it is connected.
 */
export interface Tb4Row {
  /** (A) cumulative from the start of each year */
  serial_number?: number | string | null;
  /** (B) date the sub-county registration number was issued */
  registration_date?: string | null;
  /** (C) */
  sub_county_tb_number?: string | null;
  /** (D) three names */
  full_name?: string | null;
  /** (E) M, F or other */
  sex?: string | null;
  /** (F) years and months */
  age?: string | number | null;
  /** (G) */
  nationality?: string | null;
  /** (G) national ID, passport, UPI, NEMIS or alien ID number */
  id_number?: string | null;
  /** (H) neighbour, school, church or mosque */
  physical_address?: string | null;
  /** (H) */
  patient_phone?: string | null;
  /** (H) */
  supporter_phone?: string | null;
  /** (I) HCW, truck driver, prisoner, miner, or None */
  key_population?: string | null;
  /** (J) Key 1 */
  referred_by?: string | null;
  /** (K) at the start of treatment */
  nutrition_start?: Tb4Nutrition | null;
  /** (L) Severe or Non-Severe (Key 2) */
  severity?: string | null;
  /** (M) PTB or EPTB */
  tb_type?: string | null;
  /** (N) EPTB sub-type */
  eptb_subtype?: string | null;
  /** (N) for lymph nodes: complicated or uncomplicated (Key 3) */
  lymph_node_type?: string | null;
  /** (O) Key 4 */
  patient_type?: string | null;
  /** (P) X-ray: date, score and finding (Key 5) */
  xray_date?: string | null;
  xray_score?: string | null;
  xray_finding?: string | null;
  /** (P) other imaging, specified */
  other_imaging?: string | null;
  /** (Q) Pos, Neg or ND */
  tb_lamp?: Tb4Test | null;
  /** (R) Pos, Neg or ND */
  lf_lam?: Tb4Test | null;
  /** (S) molecular test at month 0 (Key 6a/6b) */
  molecular?: Tb4Test | null;
  /** (S) sputum smears by month of treatment: 0, 2, 3, 5 and 6 */
  smears?: Partial<Record<0 | 2 | 3 | 5 | 6, Tb4Test>> | null;
  /** (T) culture result (Key 7b) and the date collected */
  culture?: Tb4Test | null;
  /** (T) DST: R or S for each drug (Key 7a) */
  dst?: { r?: string | null; h?: string | null; z?: string | null; e?: string | null } | null;

  /** (U) Yes or No */
  started_treatment?: string | null;
  /** (U) if not started, why */
  not_started_reason?: string | null;
  /** (V) */
  regimen?: string | null;
  /** (V) */
  treatment_start_date?: string | null;
  /** (W) initial phase drug collection dates, up to eight */
  initial_phase_collections?: string[] | null;
  /** (X) continuation phase drug collection dates, placed by month */
  continuation_collections?: string[] | null;
  /** (Y) New Pos, Known Pos, Neg or Unknown, and the date done */
  hiv?: Tb4Test | null;
  /** (Z) partner tested: Pos, Neg, Unknown or No Partner, and the date done */
  partner_hiv?: Tb4Test | null;
  /** (AA) cotrimoxazole preventive therapy / dapsone: Yes or No */
  cpt?: string | null;
  /** (AA) */
  cpt_start_date?: string | null;
  /** (AB) Yes or No */
  art?: string | null;
  /** (AB) date started and regimen */
  art_start?: string | null;
  /** (AC) Key 8 */
  nutrition_support?: string | null;
  /** (AD) at the end of treatment */
  nutrition_end?: Tb4Nutrition | null;
  /** (AE) Key 9 */
  risk_factors?: string | null;
  /** (AF) Key 9 */
  comorbidities?: string | null;
  /** (AG) Key 10 */
  outcome?: string | null;
  /** (AG) */
  outcome_date?: string | null;
  /** (AH) */
  remarks?: string | null;
}

/** Blank rather than "null" / "undefined" in a cell */
export const text = (value: unknown) => (value === null || value === undefined ? '' : String(value));

/** DD/MM/YYYY, as the form asks */
export const formDate = (value: unknown) => (value ? dayjs(String(value)).format('DD/MM/YYYY') : '');
