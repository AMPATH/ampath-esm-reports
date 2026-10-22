/**
 * The layout of the MOH 731 Summary tab: each section as a set of tables, each
 * cell a figure from the sheet, by its MOH 731 code.
 *
 * A table's Total column and Total row are sums of figures that never overlap
 * -- male and female, or population by sex, or age band by sex -- so each total
 * equals the clients behind it, and its linelist is its figures' linelists
 * together. Rows that are part of another row (`ofWhich`: KVP, pregnant and
 * breastfeeding women) or a different count altogether (`excluded`:
 * inconclusive results, the testing setting) are shown but never added in.
 */

/** A figure's MOH 731 code, or null where the form has no box */
export type SummaryCell = string | null;

export interface SummaryRow {
  label: string;
  /** One code per column of the table (Total excluded) */
  cells?: SummaryCell[];
  /** A single figure shown in the Total column only, e.g. Tests_Facility */
  only?: string;
  /** Shown indented and never added into the table's total */
  ofWhich?: boolean;
  /** A different count, shown for reference and never added into the total */
  excluded?: boolean;
  /** Small caption shown before the label, e.g. `By setting` */
  group?: string;
}

export interface SummaryTable {
  /** Optional heading within the sub-section, e.g. `Other results` */
  title?: string;
  /** Column headings, Total excluded */
  columns: string[];
  rows: SummaryRow[];
  /** Label of the Total row, e.g. `Total tests`; omitted for no Total row */
  totalLabel?: string;
  /** false where a row's figures overlap (e.g. SAM and SAM on therapeutic
      foods), so the row has no Total column */
  rowTotals?: false;
}

export interface SummarySubsection {
  /** As printed on the form, e.g. `1.1 HIV Tests`; also the linelist caption */
  block: string;
  /** Short caveat shown under the heading */
  note?: string;
  tables: SummaryTable[];
}

export interface SummarySection {
  id: string;
  /** Full title, e.g. `1. HIV Testing Services & Pre-Exposure Prophylaxis` */
  title: string;
  /** Tab label, e.g. `1. HTS & PrEP` */
  tab: string;
  /** Totals shown in the strip above the section, by the sub-section they total */
  headlines: Array<{ label: string; block: string }>;
  subsections: SummarySubsection[];
}

const SEX = ['Male', 'Female'];

/* Sections still on the earlier datasets, whose figures and linelists do not yet
   agree; they get totals once their queries are corrected */
/* Section 4: nothing reports these figures yet, on the form or here */
const NOT_REPORTED = 'Not yet reported by the system; these boxes are blank on the form too.';

const PENDING_QUERIES =
  "Figures as reported. Totals will follow once this section's queries are corrected, as its linelists don't match its figures yet.";

const prepPopulations = (codes: Record<string, [SummaryCell, SummaryCell]>): SummaryRow[] => [
  { label: 'General population', cells: codes.general },
  { label: 'MSM / MSW', cells: codes.msm },
  { label: 'FSW', cells: codes.fsw },
  { label: 'PWID / PWUD', cells: codes.pwid },
  { label: 'Discordant couple', cells: codes.discordant },
  { label: 'Vulnerable population', cells: codes.vulnerable },
  { label: 'AYP (10–24 yrs)', cells: codes.ayp },
  { label: 'Pregnant & breastfeeding women', cells: codes.pbfw, ofWhich: true },
];

export const MOH_731_SUMMARY: SummarySection[] = [
  {
    id: 'hts-prep',
    title: '1. HIV Testing Services & Pre-Exposure Prophylaxis',
    tab: '1. HTS & PrEP',
    headlines: [
      { label: 'Tested', block: '1.1 HIV Tests' },
      { label: 'New positives', block: '1.2 HIV Positive Results' },
      { label: 'Initiated on PrEP', block: '1.3 No. Initiated on PrEP (NEW)' },
    ],
    subsections: [
      {
        block: '1.1 HIV Tests',
        tables: [
          {
            columns: SEX,
            totalLabel: 'Total tests',
            rows: [
              { label: 'Tests', cells: ['HV01-01', 'HV01-02'] },
              { label: 'Facility', group: 'By setting', only: 'HV01-03', excluded: true },
              { label: 'Community', group: 'By setting', only: 'HV01-04', excluded: true },
              { label: 'Tested KVP', only: 'HV01-05', ofWhich: true },
            ],
          },
        ],
      },
      {
        block: '1.2 HIV Positive Results',
        tables: [
          {
            columns: ['2–9', '10–14', '15–19', '20–24', '25+'],
            totalLabel: 'Total positives',
            rows: [
              { label: 'Male', cells: ['HV01-06', 'HV01-08', 'HV01-10', 'HV01-12', 'HV01-14'] },
              { label: 'Female', cells: ['HV01-07', 'HV01-09', 'HV01-11', 'HV01-13', 'HV01-15'] },
            ],
          },
          {
            title: 'Other results',
            columns: SEX,
            rows: [
              { label: 'Discordant', cells: ['HV01-17', 'HV01-18'], ofWhich: true },
              { label: 'Positive KVP', only: 'HV01-16', ofWhich: true },
              { label: 'Inconclusive', cells: ['HV01-47', 'HV01-48'], excluded: true },
            ],
          },
        ],
      },
      {
        block: '1.3 No. Initiated on PrEP (NEW)',
        tables: [
          {
            columns: SEX,
            totalLabel: 'Total initiated (new)',
            rows: prepPopulations({
              general: ['HV01-19', 'HV01-20'],
              msm: ['HV01-21', null],
              fsw: [null, 'HV01-22'],
              pwid: ['HV01-23', 'HV01-24'],
              discordant: ['HV01-25', 'HV01-26'],
              vulnerable: ['HV01-27', 'HV01-28'],
              ayp: ['HV01-29', 'HV01-30'],
              pbfw: [null, 'HV01-31'],
            }),
          },
        ],
      },
      {
        block: '1.4 No. on PrEP Diagnosed with STI',
        tables: [
          {
            columns: SEX,
            totalLabel: 'Total diagnosed with STI',
            rows: prepPopulations({
              general: ['HV01-32', 'HV01-33'],
              msm: ['HV01-34', null],
              fsw: [null, 'HV01-35'],
              pwid: ['HV01-36', 'HV01-37'],
              discordant: ['HV01-38', 'HV01-39'],
              vulnerable: ['HV01-40', 'HV01-41'],
              ayp: ['HV01-42', 'HV01-43'],
              pbfw: [null, 'HV01-44'],
            }),
          },
        ],
      },
      {
        block: '1.5 No. Seroconverted while on PrEP',
        tables: [
          {
            columns: SEX,
            totalLabel: 'Total seroconverted',
            rows: [{ label: 'HIV positive', cells: ['HV01-45', 'HV01-46'] }],
          },
        ],
      },
    ],
  },
  {
    id: 'emtct',
    title: '2. Elimination of Mother-to-Child Transmission (EMTCT)',
    tab: '2. EMTCT',
    headlines: [
      { label: 'Tested (ANC, L&D, PNC)', block: '2.1 Maternal HIV Testing' },
      { label: 'New positives', block: '2.2 HIV Positive Results' },
      { label: 'Started HAART', block: '2.3 Maternal HAART' },
    ],
    subsections: [
      {
        block: '2.1 Maternal HIV Testing',
        tables: [
          {
            columns: ['Initial test', 'Retest'],
            totalLabel: 'Total tests',
            rows: [
              { label: 'ANC', cells: ['HV02-02', 'HV02-03'] },
              { label: 'L&D', cells: ['HV02-04', 'HV02-05'] },
              { label: 'PNC ≤6 weeks', cells: ['HV02-06', 'HV02-07'] },
              { label: 'PNC >6 weeks', cells: ['HV02-08', 'HV02-09'] },
              /* known positives are not tested, so they are not tests */
              { label: 'Known positive at 1st ANC', only: 'HV02-01', excluded: true },
            ],
          },
        ],
      },
      {
        block: '2.2 HIV Positive Results',
        tables: [
          {
            columns: [],
            totalLabel: 'Total positives',
            rows: [
              { label: 'ANC', only: 'HV02-10' },
              { label: 'L&D', only: 'HV02-11' },
              { label: 'PNC ≤6 weeks', only: 'HV02-12' },
              { label: 'PNC >6 weeks', only: 'HV02-13' },
            ],
          },
        ],
      },
      {
        block: '2.3 Maternal HAART',
        tables: [
          {
            columns: [],
            totalLabel: 'Total started HAART',
            rows: [
              { label: 'Started at ANC', only: 'HV02-15' },
              { label: 'Started at L&D', only: 'HV02-16' },
              { label: 'Started at PNC ≤6 weeks', only: 'HV02-17' },
              { label: 'Started at PNC >6 weeks', only: 'HV02-18' },
              /* known positives already on HAART: a different group, not started here */
              { label: 'On HAART at 1st ANC (known positive)', only: 'HV02-14', excluded: true },
            ],
          },
        ],
      },
      {
        block: '2.4 HBV Screening at ANC',
        tables: [
          {
            columns: [],
            rows: [
              { label: 'Screened for HBV', only: 'HV02-19' },
              { label: 'Positive', only: 'HV02-20', ofWhich: true },
            ],
          },
        ],
      },
      {
        /* parts of 2.1-2.3 by age; the rows overlap (on HAART is part of known
           positive), so each row has its own total and the table none */
        block: '2.5 Adolescents girls & Young Women (10-24 Yrs)',
        tables: [
          {
            columns: ['10–19', '20–24'],
            rows: [
              { label: 'Known positive at 1st ANC', cells: ['HV02-21', 'HV02-22'] },
              { label: 'On HAART at 1st ANC', cells: ['HV02-25', 'HV02-26'], ofWhich: true },
              { label: 'New HIV positive', cells: ['HV02-23', 'HV02-24'] },
              { label: 'Started HAART', cells: ['HV02-27', 'HV02-28'], ofWhich: true },
            ],
          },
        ],
      },
      {
        block: '2.6 Infant Prophylaxis',
        tables: [
          {
            columns: [],
            totalLabel: 'Total given infant prophylaxis',
            rows: [
              { label: 'ANC', only: 'HV02-29' },
              { label: 'L&D', only: 'HV02-30' },
              { label: 'PNC', only: 'HV02-31' },
            ],
          },
        ],
      },
      {
        block: '2.7 Infant Feeding',
        tables: [
          {
            columns: [],
            totalLabel: 'Total with feeding status',
            rows: [
              { label: 'Exclusive breastfeeding (EBF)', only: 'HV02-32' },
              { label: 'Breastfeeding (BF)', only: 'HV02-33' },
              { label: 'Not breastfeeding (NBF)', only: 'HV02-34' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'hiv-tb-treatment',
    title: '3. HIV and TB Treatment',
    tab: '3. HIV & TB Treatment',
    headlines: [
      { label: 'Started ART', block: '3.1 Starting ART' },
      { label: 'Currently on ART', block: '3.2 Curently on ART ([ALL])' },
      { label: 'Screened for TB', block: '3.3 TB Screening' },
    ],
    subsections: [
      {
        block: '3.1 Starting ART',
        tables: [
          {
            columns: SEX,
            totalLabel: 'Total started ART',
            rows: [
              { label: '<1', cells: ['HV03-01', 'HV03-02'] },
              { label: '1–4', cells: ['HV03-03', 'HV03-04'] },
              { label: '5–9', cells: ['HV03-05', 'HV03-06'] },
              { label: '10–14', cells: ['HV03-07', 'HV03-08'] },
              { label: '15–19', cells: ['HV03-09', 'HV03-10'] },
              { label: '20–24', cells: ['HV03-11', 'HV03-12'] },
              { label: '25+', cells: ['HV03-013', 'HV03-014'] },
            ],
          },
        ],
      },
      {
        block: '3.2 Curently on ART ([ALL])',
        tables: [
          {
            columns: SEX,
            totalLabel: 'Total currently on ART',
            rows: [
              { label: '<1', cells: ['HV03-015', 'HV03-016'] },
              { label: '1–4', cells: ['HV03-017', 'HV03-018'] },
              { label: '5–9', cells: ['HV03-019', 'HV03-020'] },
              { label: '10–14', cells: ['HV03-021', 'HV03-022'] },
              { label: '15–19', cells: ['HV03-023', 'HV03-024'] },
              { label: '20–24', cells: ['HV03-025', 'HV03-026'] },
              { label: '25+', cells: ['HV03-027', 'HV03-028'] },
            ],
          },
        ],
      },
      {
        block: '3.3 TB Screening',
        tables: [
          {
            columns: [],
            totalLabel: 'Total screened for TB',
            rows: [
              { label: '<15 years', only: 'HV03-029' },
              { label: '15+ years', only: 'HV03-030' },
            ],
          },
        ],
      },
      {
        block: '3.4 Starting TPT',
        tables: [
          {
            columns: [],
            totalLabel: 'Total started TPT',
            rows: [
              { label: '<15 years', only: 'HV03-031' },
              { label: '15+ years', only: 'HV03-032' },
            ],
          },
        ],
      },
      {
        /* two splits of the same clients, each with its own total */
        block: '3.5 Differentiated Service Delivery',
        tables: [
          {
            title: 'By stability',
            columns: [],
            totalLabel: 'Total by stability',
            rows: [
              { label: 'Established', only: 'HV03-033' },
              { label: 'Not established', only: 'HV03-034' },
            ],
          },
          {
            title: 'By model',
            columns: [],
            totalLabel: 'Total by model',
            rows: [
              { label: 'Community', only: 'HV03-035' },
              { label: 'Facility', only: 'HV03-036' },
            ],
          },
        ],
      },
      {
        block: '3.6 Nutrition and HIV',
        note: PENDING_QUERIES,
        tables: [
          {
            columns: ['SAM+', 'MAM+', 'SAM+ on therapeutic foods', 'MAM+ on supplemental foods'],
            rowTotals: false,
            rows: [
              { label: '0–5 months', cells: ['HV03-037', 'HV03-043', 'HV03-049', 'HV03-055'] },
              { label: '6–59 months', cells: ['HV03-038', 'HV03-044', 'HV03-050', 'HV03-056'] },
              { label: '5–9 years', cells: ['HV03-039', 'HV03-045', 'HV03-051', 'HV03-057'] },
              { label: '10–17 years', cells: ['HV03-040', 'HV03-046', 'HV03-052', 'HV03-058'] },
              { label: '18+ years', cells: ['HV03-041', 'HV03-047', 'HV03-053', 'HV03-059'] },
            ],
          },
        ],
      },
      {
        block: '3.7 HIV in TB Clinic',
        note: PENDING_QUERIES,
        tables: [
          {
            columns: [],
            rows: [
              { label: 'New TB cases', only: 'HV03-061' },
              { label: 'Known HIV positive', only: 'HV03-062' },
              { label: 'on HAART', only: 'HV03-064', ofWhich: true },
              { label: 'Newly tested HIV positive', only: 'HV03-063' },
              { label: 'started HAART', only: 'HV03-065', ofWhich: true },
            ],
          },
        ],
      },
    ],
  },
  {
    /* no figures behind these boxes yet: rows are listed so the section reads
       as on the form, each shown as – */
    id: 'vmmc',
    title: '4. Medical Male Circumcision',
    tab: '4. VMMC',
    headlines: [],
    subsections: [
      {
        block: '4.1 Number circumcised',
        note: NOT_REPORTED,
        tables: [
          {
            columns: [],
            rows: [
              { label: '0–60 days' },
              { label: '61 days – 9 years' },
              { label: '10–14 years' },
              { label: '15+ years' },
              { label: 'Tested HIV+' },
              { label: 'Tested HIV−' },
            ],
          },
        ],
      },
      {
        block: '4.2 Type of circumcission',
        note: NOT_REPORTED,
        tables: [
          {
            columns: [],
            rows: [{ label: 'Surgical' }, { label: 'Devices' }],
          },
        ],
      },
      {
        block: '4.3 Circumcission Adverse Events',
        note: NOT_REPORTED,
        tables: [
          {
            columns: ['Moderate', 'Severe'],
            rowTotals: false,
            rows: [
              { label: 'During', cells: [null, null] },
              { label: 'Post', cells: [null, null] },
            ],
          },
          {
            columns: [],
            rows: [{ label: 'Follow up visit < 14 days' }],
          },
        ],
      },
    ],
  },
  {
    id: 'pep',
    title: '5. Post Exposure Prophylaxis',
    tab: '5. PEP',
    headlines: [{ label: 'Exposed', block: '5. Post Exposure Prophylaxis' }],
    subsections: [
      {
        block: '5. Post Exposure Prophylaxis',
        note: "Given PEP: figures as reported. A total will follow once its query is corrected, as its linelists don't match its figures yet.",
        tables: [
          {
            title: 'Exposed',
            columns: [],
            totalLabel: 'Total exposed',
            rows: [
              { label: 'Occupational', only: 'HV05-01' },
              { label: 'Other', only: 'HV05-02' },
            ],
          },
          {
            title: 'Given PEP',
            columns: [],
            rows: [
              { label: 'Occupational', only: 'HV05-03' },
              { label: 'Other', only: 'HV05-04' },
            ],
          },
        ],
      },
    ],
  },
];

/** Codes a row adds into its table's total: none for `ofWhich` / `excluded` rows */
export function rowTotalCodes(row: SummaryRow): string[] {
  return row.only ? [row.only] : (row.cells ?? []).filter((cell): cell is string => Boolean(cell));
}
