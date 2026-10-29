import dayjs from 'dayjs';

/**
 * One test in the MOH 362 register, as the ETL returns it (/moh-362-register):
 * the same tests as MOH 731 1.1 HIV Tests, with the register's details.
 */
export interface Moh362Row {
  serial_number?: number | string;
  patient_id?: number;
  nupi?: string | null;
  amrsID?: string | null;
  id_number?: string | null;
  full_name?: string | null;
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  age?: number | string | null;
  sex?: string | null;
  telephone?: string | null;
  date_of_visit?: string | null;
  hts_provider?: string | null;
  /** Married, Widowed, Single, Divorced or Separated */
  marital_status?: string | null;
  /** Gen Pop or KVP */
  population_type?: string | null;
  sub_population?: string | null;
  /** Facility or Community */
  setting?: string | null;
  /** Negative, Positive or Inconclusive */
  hiv_test1?: string | null;
  kit1_name?: string | null;
  lot1?: string | null;
  expiry1?: string | null;
  hiv_test2?: string | null;
  kit2_name?: string | null;
  lot2?: string | null;
  expiry2?: string | null;
  hiv_test3?: string | null;
  kit3_name?: string | null;
  lot3?: string | null;
  expiry3?: string | null;
  /** Positive, Negative or Inconclusive */
  final_result?: string | null;
  /** Yes, No or NA */
  discordant_couple?: string | null;
  /** PrEP, PEP, VMMC, PMTCT, as a list, or NA */
  referral_services?: string | null;
  client_tested_as?: string | null;
  referral_to?: string | null;
  residence?: string | null;
  handed_to?: string | null;
  art_start_date?: string | null;
  ccc_number?: string | null;
  screening_remarks?: string | null;
  initial_remarks?: string | null;
}

/** Blank rather than "null" / "undefined" in a cell */
export const text = (value: unknown) => (value === null || value === undefined ? '' : String(value));

/** DD/MM/YYYY, as the form asks */
export const formDate = (value: unknown) => (value ? dayjs(String(value)).format('DD/MM/YYYY') : '');

export const clientName = (row: Moh362Row) =>
  row.full_name || [row.first_name, row.middle_name, row.last_name].filter(Boolean).join(' ');

/** Tested positive and linked to care: started on ART */
export const isLinked = (row: Moh362Row) => row.final_result === 'Positive' && Boolean(row.art_start_date);

export const ageOf = (row: Moh362Row) => {
  const age = Number(row.age);
  return Number.isFinite(age) && row.age !== null && row.age !== '' ? age : null;
};

/** The form's age bands for the Tests (n) and Positive (n) summaries */
export const AGE_BANDS: Array<{ label: string; min: number; max?: number }> = [
  { label: '1-9 yrs', min: 1, max: 9 },
  { label: '10-14 yrs', min: 10, max: 14 },
  { label: '15-19 yrs', min: 15, max: 19 },
  { label: '20-24 yrs', min: 20, max: 24 },
  { label: '25+ yrs', min: 25 },
];

export const inBand = (row: Moh362Row, band: { min: number; max?: number }) => {
  const age = ageOf(row);
  return age !== null && age >= band.min && (band.max === undefined || age <= band.max);
};
