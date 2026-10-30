import dayjs from 'dayjs';

/**
 * One PrEP visit in the MOH 267 PrEP Daily Activity Register (Ver. July 2023),
 * column by column as on the form, as the ETL returns it (/moh-267-register):
 * the same visits as MOH 731 1.3 to 1.5, one per client per day, with the
 * form's codes as words.
 */
export interface Moh267Row {
  patient_id?: number;
  /** (a) */
  prep_number?: string | null;
  /** (b) */
  date_of_visit?: string | null;
  /** (c) upper */
  id_number?: string | null;
  /** (c) lower */
  nupi?: string | null;
  /** (d) */
  age?: number | string | null;
  /** (e) M or F */
  sex?: string | null;
  /** (f) General Population, Discordant Couple, MSM/MSW, FSW, PWID/PWUD or VP */
  population_type?: string | null;
  /** (g) New, Continuing, Discontinued or Restart */
  prep_status?: string | null;
  /** (h) Daily oral PrEP, Event driven oral PrEP, Dapivirine Vaginal ring, Cabotegravir Injectable (or Lenacapavir) */
  prep_method?: string | null;
  /** (i) Negative, Positive, Inconclusive or NA */
  hiv_result?: string | null;
  /** (j) Yes or No */
  sti_diagnosed?: string | null;
  /** (k) */
  remarks?: string | null;
  /** the PrEP start date, for the clients on PrEP at least 3 months */
  prep_start_date?: string | null;
  /** MOH 731 1.3: an Initial visit that is not a transfer-in */
  is_new?: number | null;
  /** MOH 731 1.5: a Follow-up visit with a positive HIV test */
  is_seroconverted?: number | null;
}

/** Blank rather than "null" / "undefined" in a cell */
export const text = (value: unknown) => (value === null || value === undefined ? '' : String(value));

/** DD/MM/YYYY, as the form asks */
export const formDate = (value: unknown) => (value ? dayjs(String(value)).format('DD/MM/YYYY') : '');
