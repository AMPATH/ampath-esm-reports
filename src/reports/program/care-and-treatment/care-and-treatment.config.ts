/**
 * The Care & Treatment and ARV Management report, sections 1.1-1.4, as one
 * table: the age bands across the top once, female and male under each, and
 * every section's indicators down the side. Each row reads one or more of the
 * ETL's figures (the flags of careTreatmentBase), which come back added up by
 * age band, sex and MCH/PMTCT, so a cell is the sum of the matching groups and
 * opens their clients.
 */

export interface AgeBand {
  /** As the ETL names it, e.g. `10_14` */
  id: string;
  label: string;
  /** Under 10: no MCH/PMTCT clients */
  child?: boolean;
}

export const AGE_BANDS: AgeBand[] = [
  { id: 'under_1', label: '<1', child: true },
  { id: '1_4', label: '1-4', child: true },
  { id: '5_9', label: '5-9', child: true },
  { id: '10_14', label: '10-14' },
  { id: '15_19', label: '15-19' },
  { id: '20_24', label: '20-24' },
  { id: '25_29', label: '25-29' },
  { id: '30_34', label: '30-34' },
  { id: '35_39', label: '35-39' },
  { id: '40_44', label: '40-44' },
  { id: '45_49', label: '45-49' },
  { id: '50_54', label: '50-54' },
  { id: '55_59', label: '55-59' },
  { id: '60_64', label: '60-64' },
  { id: '65_plus', label: '65+' },
];

export type Sex = 'F' | 'M';
export const SEXES: Sex[] = ['F', 'M'];

export interface ReportRow {
  label: string;
  /** The figures added up in the row; a total lists the clients of each */
  indicators: string[];
  /** A total, set in bold */
  strong?: boolean;
  /** Repeated from an earlier section for reference, in grey */
  reference?: boolean;
  /** The MCH/PMTCT clients only */
  mch?: boolean;
  /** Clients whose detail is not recorded: shown so the rows add up, for data cleanup */
  notRecorded?: boolean;
}

export interface RowGroup {
  /** Merged down beside its rows, e.g. `<6 months on ART` */
  title?: string;
  rows: ReportRow[];
}

export interface ReportSection {
  id: string;
  number: string;
  /** Merged down beside the section's rows */
  title: string;
  /** For the section links, e.g. `Months dispensed` */
  shortTitle: string;
  /** Listed under the table */
  note?: string;
  /** The MCH/PMTCT clients only: women of 10 years and over */
  mch?: boolean;
  groups: RowGroup[];
}

const MONTHS_DISPENSED: ReportRow[] = [
  { label: '1 Month (Not MMD)', indicators: ['mmd_1'] },
  { label: '2 Months (Not MMD)', indicators: ['mmd_2'] },
  { label: '3 Months MMD', indicators: ['mmd_3'] },
  { label: '4 Months MMD', indicators: ['mmd_4'] },
  { label: '5 Months MMD', indicators: ['mmd_5'] },
  { label: '6 or more Months MMD', indicators: ['mmd_6_plus'] },
];

const DISPENSING_NOT_RECORDED: ReportRow = { label: 'Not categorized', indicators: ['mmd_unknown'], notRecorded: true };

const CURRENT_ON_ART: ReportRow = { label: 'Currently on ART (TX_CURR)', indicators: ['tx_curr'], reference: true };

export const CARE_AND_TREATMENT_SECTIONS: ReportSection[] = [
  {
    id: 'tx-new',
    number: '1.1',
    title: 'Starting on ART',
    shortTitle: 'Starting on ART',
    groups: [
      {
        rows: [{ label: 'Starting ART (TX_NEW) (All Population)', indicators: ['tx_new'], strong: true }],
      },
      {
        title: 'Baseline CD4',
        rows: [
          { label: 'CD4: <200', indicators: ['tx_new_cd4_lt_200'] },
          { label: 'CD4: ≥200', indicators: ['tx_new_cd4_ge_200'] },
          { label: 'CD4 % (subject to full haemogram result availability)', indicators: ['tx_new_cd4_percent'] },
          { label: 'Unknown CD4 (CD4 not done)', indicators: ['tx_new_cd4_unknown'] },
        ],
      },
      {
        title: 'Subsets of Starting ART',
        rows: [
          { label: 'Pregnant', indicators: ['tx_new_pregnant'] },
          { label: 'Breastfeeding', indicators: ['tx_new_breastfeeding'] },
          { label: 'TB', indicators: ['tx_new_tb'] },
          { label: 'Starting TPT', indicators: ['tx_new_tpt'] },
        ],
      },
    ],
  },
  {
    id: 'tx-curr',
    number: '1.2',
    title: 'Total Current on ART',
    shortTitle: 'Current on ART',
    note: 'Currently on ART includes defaulters of 0-30 days.',
    groups: [
      {
        rows: [
          { label: 'Currently on ART (TX_CURR)', indicators: ['tx_curr'], strong: true },
          { label: 'Current on ART (MCH/PMTCT)', indicators: ['tx_curr'], mch: true },
        ],
      },
      {
        title: '<6 months on ART',
        rows: [
          { label: 'Well (stage I & II)', indicators: ['tx_curr_lt6m_well'] },
          { label: 'Advanced (stage III & IV)', indicators: ['tx_curr_lt6m_advanced'] },
          { label: 'Not categorized', indicators: ['tx_curr_lt6m_stage_unknown'], notRecorded: true },
        ],
      },
      {
        title: '6+ months on ART',
        rows: [
          { label: 'Not established in treatment (unstable)', indicators: ['tx_curr_6m_not_established'] },
          { label: 'Established in treatment (stable)', indicators: ['tx_curr_6m_established'] },
          { label: 'Not categorized', indicators: ['tx_curr_6m_stability_unknown'], notRecorded: true },
        ],
      },
    ],
  },
  {
    id: 'mmd',
    number: '1.3a',
    title: 'Actual number of months ARV drug dispensed (ADT or MOH 367A) - All clients',
    shortTitle: 'Months dispensed',
    note: 'Months dispensed: at the client’s latest visit, the days to the next refill (or appointment), in months of 30 days.',
    groups: [
      { rows: [CURRENT_ON_ART] },
      {
        title: 'Months dispensed',
        rows: [
          {
            label: 'Total',
            indicators: MONTHS_DISPENSED.flatMap((row) => row.indicators),
            strong: true,
          },
          ...MONTHS_DISPENSED,
          DISPENSING_NOT_RECORDED,
        ],
      },
    ],
  },
  {
    id: 'mmd-mch',
    number: '1.3b',
    title: 'Actual number of months ARV drug dispensed - MCH (PMTCT)',
    shortTitle: 'Months dispensed - MCH',
    note: 'MCH (PMTCT): women of 10 years and over on ART who are pregnant or breastfeeding, or in care at an MCH clinic.',
    mch: true,
    groups: [
      { rows: [{ label: 'Currently on ART (TX_CURR)', indicators: ['tx_curr'], strong: true }] },
      { title: 'Months dispensed', rows: [...MONTHS_DISPENSED, DISPENSING_NOT_RECORDED] },
    ],
  },
  {
    id: 'tx-pvls',
    number: '1.4',
    title: 'TX_PVLS',
    shortTitle: 'TX_PVLS',
    note: 'TX_PVLS: each eligible client’s latest viral load in the past 12 months.',
    groups: [
      {
        rows: [CURRENT_ON_ART, { label: 'Eligible for Viral Load', indicators: ['vl_eligible'], strong: true }],
      },
      {
        title: 'Latest viral load',
        rows: [
          { label: '<50 copies/LDL', indicators: ['vl_lt_50'] },
          { label: '50-199 copies/ml', indicators: ['vl_50_199'] },
          { label: '200-999 copies/ml', indicators: ['vl_200_999'] },
          { label: '≥1000 copies/ml', indicators: ['vl_ge_1000'] },
          { label: 'No viral load in the past 12 months', indicators: ['vl_none'] },
        ],
      },
    ],
  },
];

/** Whether a row counts only the MCH/PMTCT clients */
export const isMchRow = (section: ReportSection, row: ReportRow) => Boolean(section.mch || row.mch);

/** A row's name in full, for its linelist, e.g. `<6 months on ART - Well (stage I & II)` */
export const rowTitle = (group: RowGroup, row: ReportRow) =>
  group.title && !row.label.startsWith(group.title) ? `${group.title} - ${row.label}` : row.label;
