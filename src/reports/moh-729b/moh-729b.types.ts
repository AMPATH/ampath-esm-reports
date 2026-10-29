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
  /** Adult, Paediatric, PMTCT, PrEP, PEP for Adults, PEP for Children, Hepatitis B or TPT HIV Positive */
  client_group?: string | null;
  /** e.g. TDF + 3TC + DTG */
  regimen?: string | null;
  /** the form's code, e.g. AF2E */
  regimen_code?: string | null;
  /** children only, as the form heads the bands, e.g. 10-13.9kg */
  weight_band?: string | null;
}

/** The PEP regimen codes (PA… for adults, PC3A/PC3C/PC4X for children -- not the infants' PC7, PC8, PC1X) */
export const PEP_CODES = new Set(PEP.flatMap((group) => group.rows.map(([code]) => code)));

/** One count on the form: a regimen code, narrowed to a weight band or a line where the form splits it */
export interface Moh729bCell {
  code: string;
  band?: string;
  line?: number;
}

/**
 * The form prints TAF + 3TC + DTG as AS2G among the adult 1st line regimens;
 * its own list of codes (page 3) calls it AF2G, which is what the ETL returns.
 */
export const countedCode = (printed: string) => (printed === 'AS2G' ? 'AF2G' : printed);

export const inCell = (row: Moh729bRow, { code, band, line }: Moh729bCell) =>
  row.regimen_code === countedCode(code) &&
  (band === undefined || row.weight_band === band) &&
  (line === undefined || Number(row.arv_line) === line);

/** A client in any of several counts (a total of counts that never overlap) */
export const inCells = (row: Moh729bRow, cells: Moh729bCell[]) => cells.some((cell) => inCell(row, cell));

/** A count in a link: `AF2E`, `CF2G~20-24.9kg`, `PM12~~2` */
export const encodeCell = ({ code, band, line }: Moh729bCell) =>
  [code, band ?? '', line ?? ''].join('~').replace(/~+$/, '');

export const decodeCell = (value: string): Moh729bCell => {
  const [code, band, line] = value.split('~');
  return { code, band: band || undefined, line: Number(line) || undefined };
};

/** The regimen a code stands for on the form, for a linelist's heading */
export const REGIMEN_NAMES: Record<string, string> = Object.fromEntries(
  [...ADULT_ART, ...PAEDIATRIC_ART, PMTCT_MOTHERS, PREP, ...PEP, HEPATITIS_B, ...OPPORTUNISTIC_INFECTIONS].flatMap(
    (section) => section.rows.map(([code, name]) => [countedCode(code), name]),
  ),
);

const ORDINALS = ['', '1st', '2nd', '3rd'];

/** e.g. `AF2E TDF + 3TC + DTG`, `CF2G ABC+3TC+DTG · 20-24.9kg`, `PM12 … · 1st Line` */
export const describeCell = ({ code, band, line }: Moh729bCell) =>
  [
    `${countedCode(code)} ${REGIMEN_NAMES[countedCode(code)] ?? ''}`.trim(),
    band,
    line ? `${ORDINALS[line] ?? line} Line` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');
