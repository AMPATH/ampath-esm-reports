import {
  ADULT_ART,
  HEPATITIS_B,
  OPPORTUNISTIC_INFECTIONS,
  PAEDIATRIC_ART,
  PEP,
  PMTCT_MOTHERS,
  PREP,
} from './moh-729b.config';

/**
 * One client counted on the form, as the ETL returns it (/moh-729b), with the
 * form's regimen code worked out in SQL: a client active on ART in the month
 * (by their current ARVs, reported line, age and pregnancy, and a child's
 * weight band), or a client on PrEP in the month (by the PrEP prescribed at
 * their latest visit).
 */
export interface Moh729bRow {
  person_id: number;
  patient_uuid?: string;
  ccc_number?: string | null;
  amrs_number?: string | null;
  full_name?: string | null;
  gender?: string | null;
  birthdate?: string | null;
  age?: number | null;
  weight?: number | null;
  rtc_date?: string | null;
  /** concept ids joined by ' ## ', as stored in the HIV summary */
  cur_arv_meds?: string | null;
  /** 1, 2 or 3 */
  arv_line?: number | null;
  pregnant?: string | null;
  /** PrEP only: the PrEP number, latest visit of the month and status at it */
  prep_number?: string | null;
  last_visit_date?: string | null;
  prep_status?: string | null;
  /** PEP only: the exposure the latest PEP of the month was given for */
  exposure_date?: string | null;
  exposure_type?: string | null;
  /** Hepatitis B only: the ANC visit and the results MOH 731 2.4 counts it by */
  anc_date?: string | null;
  hiv_result?: string | null;
  hbv_result?: string | null;
  hbv_test_date?: string | null;
  /** TPT only: the ART start, this month's TB screening and the TPT start */
  arv_first_regimen_start_date?: string | null;
  tb_screening_date?: string | null;
  tb_screening_result?: string | null;
  ipt_start_date?: string | null;
  /** Universal prophylaxis only: the plan at the client's latest visit of the month on that drug */
  prophylaxis_plan?: string | null;
  /** Cryptococcal Meningitis (first CM visit of the month) and universal prophylaxis (latest visit on the drug) */
  location?: string | null;
  encounter_type?: string | null;
  encounter_date?: string | null;
  current_treatment?: string | null;
  treatment_phase?: string | null;
  treatment_start_date?: string | null;
  treatment_plan?: string | null;
  art_deferred_for_crypto?: string | null;
  /** Adult, Paediatric, PMTCT, PrEP, PEP for Adults, PEP for Children, Hepatitis B, TPT HIV Positive,
      Cryptococcal Meningitis, Universal prophylaxis or PMTCT Infants */
  client_group?: string | null;
  /** e.g. TDF + 3TC + DTG */
  regimen?: string | null;
  /** the form's code, e.g. AF2E */
  regimen_code?: string | null;
  /** children only, as the form heads the bands, e.g. 10-13.9kg */
  weight_band?: string | null;
  /** PMTCT infants only: the HEI number, age and feeding at the visit, and the form's age band, e.g. 7- 9 months */
  hei_number?: string | null;
  infant_age?: string | null;
  feeding?: string | null;
  age_band?: string | null;
}

/** The PEP regimen codes (PA… for adults, PC3A/PC3C/PC4X for children -- not the infants' PC7, PC8, PC1X) */
export const PEP_CODES = new Set(PEP.flatMap((group) => group.rows.map(([code]) => code)));

/**
 * One count on the form: a regimen code, narrowed to a weight band or a line
 * where the form splits it. `ALL_ON_ART` instead of a code is every client on
 * ART (adult, paediatric and PMTCT), narrowed by sex and MOH 731 age band, for
 * the Summary's table laid out as MOH 731 3.2 Currently on ART.
 */
export interface Moh729bCell {
  code: string;
  band?: string;
  line?: number;
  /** M or F */
  sex?: string;
  /** a key of `ART_AGE_BANDS` */
  age?: string;
}

/** Every client counted under ART, whatever the regimen */
export const ALL_ON_ART = '*ART';

const ART_GROUPS = ['Adult', 'Paediatric', 'PMTCT'];

/**
 * MOH 731's age bands, by key: the label and the ages in it, tested as MOH 731
 * tests them -- `age < 1` for the first (an infant's age is a fraction, e.g.
 * 0.5), then `BETWEEN min AND max`, and `>= 25` for the last.
 */
export const ART_AGE_BANDS: Record<string, { label: string; min?: number; max?: number; below?: number }> = {
  less_1: { label: '<1', below: 1 },
  '1_4': { label: '1–4', min: 1, max: 4 },
  '5_9': { label: '5–9', min: 5, max: 9 },
  '10_14': { label: '10–14', min: 10, max: 14 },
  '15_19': { label: '15–19', min: 15, max: 19 },
  '20_24': { label: '20–24', min: 20, max: 24 },
  '25_above': { label: '25+', min: 25 },
};

const inAgeBand = (age: unknown, key: string) => {
  const band = ART_AGE_BANDS[key];
  const years = Number(age);
  return Boolean(band) && age !== null && age !== '' && Number.isFinite(years)
    ? band.below !== undefined
      ? years < band.below
      : years >= (band.min ?? 0) && (band.max === undefined || years <= band.max)
    : false;
};

/**
 * The form prints TAF + 3TC + DTG as AS2G among the adult 1st line regimens;
 * its own list of codes (page 3) calls it AF2G, which is what the ETL returns.
 */
export const countedCode = (printed: string) => (printed === 'AS2G' ? 'AF2G' : printed);

export const inCell = (row: Moh729bRow, { code, band, line, sex, age }: Moh729bCell) =>
  (code === ALL_ON_ART ? ART_GROUPS.includes(row.client_group ?? '') : row.regimen_code === countedCode(code)) &&
  (band === undefined || (row.weight_band ?? row.age_band) === band) &&
  (line === undefined || Number(row.arv_line) === line) &&
  (sex === undefined || row.gender === sex) &&
  (age === undefined || inAgeBand(row.age, age));

/** A client in any of several counts (a total of counts that never overlap) */
export const inCells = (row: Moh729bRow, cells: Moh729bCell[]) => cells.some((cell) => inCell(row, cell));

/** A count in a link: `AF2E`, `CF2G~20-24.9kg`, `PM12~~2`, `*ART~~~F~25_above` */
export const encodeCell = ({ code, band, line, sex, age }: Moh729bCell) =>
  [code, band ?? '', line ?? '', sex ?? '', age ?? ''].join('~').replace(/~+$/, '');

export const decodeCell = (value: string): Moh729bCell => {
  const [code, band, line, sex, age] = value.split('~');
  return {
    code,
    band: band || undefined,
    line: Number(line) || undefined,
    sex: sex || undefined,
    age: age || undefined,
  };
};

/** The regimen a code stands for on the form, for a linelist's heading */
export const REGIMEN_NAMES: Record<string, string> = Object.fromEntries(
  [...ADULT_ART, ...PAEDIATRIC_ART, PMTCT_MOTHERS, PREP, ...PEP, HEPATITIS_B, ...OPPORTUNISTIC_INFECTIONS].flatMap(
    (section) => section.rows.map(([code, name]) => [countedCode(code), name]),
  ),
);

const ORDINALS = ['', '1st', '2nd', '3rd'];

/** e.g. `AF2E TDF + 3TC + DTG`, `CF2G ABC+3TC+DTG · 20-24.9kg`, `PM12 … · 1st Line` */
export const describeCell = ({ code, band, line, sex, age }: Moh729bCell) =>
  [
    code === ALL_ON_ART ? 'Currently on ART' : `${countedCode(code)} ${REGIMEN_NAMES[countedCode(code)] ?? ''}`.trim(),
    age ? ART_AGE_BANDS[age]?.label : undefined,
    sex ? (sex === 'M' ? 'Male' : 'Female') : undefined,
    band,
    line ? `${ORDINALS[line] ?? line} Line` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');
