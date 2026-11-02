import { INFANT_AGES, WEIGHT_BANDS } from './moh-729b.config';
import { ALL_ON_ART, ART_AGE_BANDS, type Moh729bCell } from './moh-729b.types';

/**
 * The layout of the MOH 729B Summary tab: each section as a set of tables, each
 * cell one or more counts of the form (a regimen code, narrowed to a weight
 * band or line where the form splits it).
 *
 * The counts in a table never overlap -- a client has one regimen code, one
 * weight band and one line -- so a Total column or row is the clients of its
 * cells together, and opens their linelists as one.
 */

export interface SummaryRow {
  label: string;
  /** The counts in each column (Total excluded); empty where the form has no box */
  cells: Moh729bCell[][];
  /** What the row's Total counts, where that is not its cells together (a child
      without a weight is in no band but still in the regimen's Total) */
  total?: Moh729bCell[];
}

export interface SummaryTable {
  title?: string;
  /** Column headings, Total excluded; none for a single "Number" column */
  columns: string[];
  rows: SummaryRow[];
  /** Label of the Total row; omitted for no Total row */
  totalLabel?: string;
}

export interface SummaryCard {
  /** As on the form, e.g. `Adult ART`; also the linelist caption */
  title: string;
  note?: string;
  tables: SummaryTable[];
}

export interface SummarySection {
  id: string;
  tab: string;
  /** Totals shown in the strip above the section */
  headlines: Array<{ label: string; cells: Moh729bCell[] }>;
  cards: SummaryCard[];
}

const LINES = ['1st Line', '2nd Line', '3rd Line'];

/** A row of codes, one per column; null where the form has no such regimen */
const byCode = (label: string, codes: Array<string | null>): SummaryRow => ({
  label,
  cells: codes.map((code) => (code ? [{ code }] : [])),
});

/** A single figure, for a table with one "Number" column */
const single = (label: string, code: string): SummaryRow => ({ label, cells: [], total: [{ code }] });

/** Every count in a table's rows */
export const rowCells = (row: SummaryRow) => row.total ?? row.cells.flat();
export const tableCells = (table: SummaryTable) => table.rows.flatMap(rowCells);
export const columnCells = (table: SummaryTable, index: number) => table.rows.flatMap((row) => row.cells[index] ?? []);

const ADULT_ART: SummaryTable = {
  columns: LINES,
  rows: [
    byCode('TDF + 3TC + DTG', ['AF2E', 'AS2B', 'AT2G']),
    byCode('TAF + 3TC + DTG', ['AS2G', null, null]),
    byCode('TDF + 3TC + EFV', ['AF2B', null, null]),
    byCode('AZT + 3TC + DTG', ['AF1D', 'AS1C', 'AT2H']),
    byCode('ABC + 3TC + DTG', ['AF4C', 'AS5C', null]),
    byCode('TDF + 3TC + ATV/r', ['AF2D', 'AS2C', null]),
    byCode('TDF + 3TC + LPV/r', ['AF2F', 'AS2A', null]),
    byCode('AZT + 3TC + LPV/r', ['AF1E', 'AS1A', null]),
    byCode('AZT + 3TC + ATV/r', ['AF1F', 'AS1B', null]),
    byCode('ABC + 3TC + LPV/r', [null, 'AS5A', null]),
    byCode('ABC + 3TC + ATV/r', [null, 'AS5B', null]),
    byCode('TDF + 3TC + DTG + DRV + RTV', [null, null, 'AT2D']),
    byCode('TDF + 3TC + DTG + ETV + DRV + RTV', [null, null, 'AT2F']),
    byCode('AZT + 3TC + DTG + DRV + RTV', [null, null, 'AT2I']),
    byCode('Any other regimen', ['AF5X', 'AS6X', 'AT2X']),
  ],
  totalLabel: 'Total adults',
};

const PAEDIATRIC_LINES: Array<[string, string[]]> = [
  ['1st Line', ['CF2G', 'CF1D', 'CF4E', 'CF5X']],
  ['2nd Line', ['CS1A', 'CS1B', 'CS2A', 'CS2B', 'CS4X']],
  ['3rd Line', ['CT1H', 'CT2D', 'CT3X']],
];

const PAEDIATRIC_ART: SummaryTable = {
  columns: LINES,
  rows: [
    byCode('ABC + 3TC + DTG', ['CF2G', 'CS2B', null]),
    byCode('AZT + 3TC + DTG', ['CF1D', 'CS1B', null]),
    byCode('TDF + 3TC + DTG', ['CF4E', null, null]),
    byCode('AZT + 3TC + LPV/r', [null, 'CS1A', null]),
    byCode('ABC + 3TC + LPV/r', [null, 'CS2A', null]),
    byCode('AZT + 3TC + DRV + RTV + RAL', [null, null, 'CT1H']),
    byCode('ABC + 3TC + DRV + RTV + RAL', [null, null, 'CT2D']),
    byCode('Any other regimen', ['CF5X', 'CS4X', 'CT3X']),
  ],
  totalLabel: 'Total children',
};

const PAEDIATRIC_WEIGHT: SummaryTable = {
  title: 'By weight band',
  columns: WEIGHT_BANDS,
  rows: PAEDIATRIC_LINES.map(([label, codes]) => ({
    label,
    cells: WEIGHT_BANDS.map((band) => codes.map((code) => ({ code, band }))),
    total: codes.map((code) => ({ code })),
  })),
  totalLabel: 'Total children',
};

const PMTCT_MOTHERS: SummaryTable = {
  columns: LINES,
  rows: (
    [
      ['TDF + 3TC + DTG', 'PM12'],
      ['TDF + 3TC + EFV', 'PM9'],
      ['AZT + 3TC + DTG', 'PM13'],
      ['ABC + 3TC + DTG', 'PM14'],
      ['TDF + 3TC + ATV/r', 'PM11'],
      ['TDF + 3TC + LPV/r', 'PM7'],
      ['AZT + 3TC + ATV/r', 'PM10'],
      ['AZT + 3TC + LPV/r', 'PM5'],
      ['Any other PMTCT regimen', 'PM1X'],
    ] as Array<[string, string]>
  ).map(([label, code]) => ({ label, cells: [1, 2, 3].map((line) => [{ code, line }]), total: [{ code }] })),
  totalLabel: 'Total pregnant women',
};

const PMTCT_INFANTS: SummaryTable = {
  columns: INFANT_AGES,
  rows: (
    [
      ['AZT + NVP, breastfeeding', 'PC8'],
      ['AZT + NVP, not breastfeeding', 'PC7'],
      ['Any other PMTCT regimen', 'PC1X'],
    ] as Array<[string, string]>
  ).map(([label, code]) => ({ label, cells: INFANT_AGES.map((band) => [{ code, band }]), total: [{ code }] })),
  totalLabel: 'Total infants',
};

const PREP: SummaryTable = {
  columns: [],
  rows: [
    single('TDF + FTC', 'PRP1A'),
    single('TDF + 3TC', 'PRP1B'),
    single('Dapivirine ring', 'PRP1D'),
    single('Cabotegravir', 'PRP1E'),
    single('Lenacapavir', 'PRP1F'),
    single('Others', 'PRP1X'),
  ],
  totalLabel: 'Total on PrEP',
};

const PEP: SummaryTable = {
  columns: ['Adults', 'Children'],
  rows: [
    byCode('TDF + 3TC + DTG', ['PA3D', null]),
    byCode('TDF + 3TC + ATV/r', ['PA3C', null]),
    byCode('AZT + 3TC + ATV/r', ['PA1C', null]),
    byCode('ABC + 3TC + LPV/r', [null, 'PC3A']),
    byCode('ABC + 3TC + DTG', [null, 'PC3C']),
    byCode('Any other PEP regimen', ['PA4X', 'PC4X']),
  ],
  totalLabel: 'Total given PEP',
};

const HEPATITIS_B: SummaryTable = {
  columns: [],
  rows: [single('TDF + 3TC', 'HPB1A'), single('TDF + FTC', 'HPB1B'), single('Any other Hep B regimen', 'HPB1C')],
  totalLabel: 'Total Hep B (HIV-ve)',
};

const TPT: SummaryTable = {
  columns: ['6H', '3HP'],
  rows: [byCode('Adults (≥15 yrs)', ['ATPT1A', 'ATPT1B']), byCode('Children (<15 yrs)', ['CTPT1A', 'CTPT1B'])],
  totalLabel: 'Total started TPT',
};

/* No Total row: a client who switched between Cotrimoxazole and Dapsone in the
   month is counted under both, as the form counts each drug */
const UNIVERSAL_PROPHYLAXIS: SummaryTable = {
  columns: ['Adults (≥15 yrs)', 'Children (<15 yrs)'],
  rows: [byCode('Cotrimoxazole', ['OI1A', 'OI1C']), byCode('Dapsone', ['OI2A', null])],
};

const CRYPTOCOCCAL_MENINGITIS: SummaryTable = {
  columns: [],
  rows: [single('Liposomal Amphotericin B + Flucytosine + Fluconazole', 'OI6B'), single('Any other treatment', 'OI6X')],
  totalLabel: 'Total new CM clients',
};

/* Laid out as MOH 731 3.2 Currently on ART (age band by sex, from the same
   HIV monthly dataset), so the two reports can be checked against each other */
const CURRENTLY_ON_ART: SummaryTable = {
  columns: ['Male', 'Female'],
  rows: Object.entries(ART_AGE_BANDS).map(([age, { label }]) => ({
    label,
    cells: ['M', 'F'].map((sex) => [{ code: ALL_ON_ART, sex, age }]),
  })),
  totalLabel: 'Total currently on ART',
};

const all = (table: SummaryTable) => tableCells(table);

/** Not counted yet: shown on the form blank, listed here so the gap is visible */
export const NOT_YET_COUNTED =
  'Not counted yet: TPT for HIV-negative clients (ATPT1C). It is blank on the form too, until its query is added.';

export const MOH_729B_SUMMARY: SummarySection[] = [
  {
    id: 'art',
    tab: 'ART',
    headlines: [
      { label: 'Adults on ART', cells: all(ADULT_ART) },
      { label: 'Children on ART', cells: all(PAEDIATRIC_ART) },
      { label: 'Pregnant women on ART', cells: all(PMTCT_MOTHERS) },
      { label: 'Infants on prophylaxis', cells: all(PMTCT_INFANTS) },
      { label: 'Currently on ART', cells: [{ code: ALL_ON_ART }] },
    ],
    cards: [
      {
        title: 'Currently on ART (as MOH 731 3.2)',
        note: 'By age and sex, as MOH 731 counts them; equal to the regimens below.',
        tables: [CURRENTLY_ON_ART],
      },
      { title: 'Adult ART', tables: [ADULT_ART] },
      {
        title: 'Paediatric ART',
        note: 'Under 15 years. Weight is from the latest clinical visit.',
        tables: [PAEDIATRIC_ART, PAEDIATRIC_WEIGHT],
      },
      { title: 'PMTCT · Pregnant women', note: 'Women pregnant this month.', tables: [PMTCT_MOTHERS] },
      {
        title: 'PMTCT · Infants',
        note: 'HIV-exposed infants on ARV prophylaxis at an HEI visit this month, by feeding and age at the visit.',
        tables: [PMTCT_INFANTS],
      },
    ],
  },
  {
    id: 'prevention',
    tab: 'PrEP, PEP & Hep B',
    headlines: [
      { label: 'On PrEP', cells: all(PREP) },
      { label: 'Given PEP', cells: all(PEP) },
      { label: 'Hep B (HIV-ve)', cells: all(HEPATITIS_B) },
    ],
    cards: [
      { title: 'Pre-Exposure Prophylaxis (PrEP)', note: 'Seen for PrEP this month, not discontinued.', tables: [PREP] },
      { title: 'Post Exposure Prophylaxis (PEP)', note: 'Given PEP this month; children are under 15.', tables: [PEP] },
      {
        title: 'Hepatitis B patients who are HIV-ve',
        note: 'HBV positive at ANC this month (MOH 731 2.4). No Hep B regimen is recorded yet, so all are "any other".',
        tables: [HEPATITIS_B],
      },
    ],
  },
  {
    id: 'ois',
    tab: 'OIs & TPT',
    headlines: [
      { label: 'On Cotrimoxazole', cells: [{ code: 'OI1A' }, { code: 'OI1C' }] },
      { label: 'On Dapsone', cells: [{ code: 'OI2A' }] },
      { label: 'Started TPT (HIV positive)', cells: all(TPT) },
      { label: 'New CM clients (≥15 yrs)', cells: all(CRYPTOCOCCAL_MENINGITIS) },
    ],
    cards: [
      {
        title: 'Universal prophylaxis',
        note: 'On Cotrimoxazole or Dapsone at a visit this month; adult or child by age at the visit.',
        tables: [UNIVERSAL_PROPHYLAXIS],
      },
      {
        title: 'TPT HIV Positive',
        note: 'Started ART and TPT this month (MOH 731 3.4).',
        tables: [TPT],
      },
      {
        title: 'Cryptococcal Meningitis · New clients',
        note: 'Aged 15 and over, with a CM treatment recorded this month and none before it; counted at their first CM visit of the month.',
        tables: [CRYPTOCOCCAL_MENINGITIS],
      },
    ],
  },
];
