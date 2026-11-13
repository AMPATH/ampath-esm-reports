/**
 * The Care & Treatment and ARV Management report, sections 1.1-1.7 and the
 * PMTCT VL tracking, as one
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
  /** Empty for a part of the form without one, e.g. `Inflows (Net gain)` */
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

/** A client's CD4 when back on ART after an interruption */
const rttCd4 = (prefix: string): ReportRow[] => [
  { label: 'CD4: <200', indicators: [`${prefix}_cd4_lt_200`] },
  { label: 'CD4: ≥200', indicators: [`${prefix}_cd4_ge_200`] },
  { label: 'CD4 % (subject to full haemogram result availability)', indicators: [`${prefix}_cd4_percent`] },
  { label: 'Unknown CD4 (CD4 not done)', indicators: [`${prefix}_cd4_unknown`] },
];

/** A PMTCT group's latest viral loads in the past 12 months, known and new positives */
const pmtctViralLoads = (group: string): ReportRow[] => [
  { label: 'Viral load collected and results available', indicators: [`pmtct_${group}_vl`], strong: true },
  ...[
    ['known', 'Known positive'],
    ['new', 'New positive'],
  ].flatMap(([status, name]) => [
    { label: `${name}: <50 copies/LDL`, indicators: [`pmtct_${group}_${status}_lt_50`] },
    { label: `${name}: 50-199 copies/ml`, indicators: [`pmtct_${group}_${status}_50_199`] },
    { label: `${name}: 200-999 copies/ml`, indicators: [`pmtct_${group}_${status}_200_999`] },
    { label: `${name}: ≥1000 copies/ml`, indicators: [`pmtct_${group}_${status}_ge_1000`] },
  ]),
];

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
    note: 'MCH (PMTCT): women of 10 years and over on ART who are pregnant, breastfeeding or with a child under 2 (one recorded as theirs, or an EDD in the past 24 months), or in care at an MCH clinic.',
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
  {
    id: 'ti',
    number: '',
    title: 'Inflows (Net gain)',
    shortTitle: 'Transfer in',
    note: 'Transfer In: on ART here this month but not last month, neither starting ART nor back after an interruption -- transferred in, or last on ART at another facility.',
    groups: [{ rows: [{ label: 'Transfer In (TI)', indicators: ['ti'], strong: true }] }],
  },
  {
    id: 'tx-rtt',
    number: '1.5',
    title: 'TX_RTT (returned to treatment) - Monthly',
    shortTitle: 'TX_RTT',
    note: 'TX_RTT: back on ART this month after being a defaulter or lost to follow-up last month. The interruption runs from the missed appointment to the return, and the CD4 is one done since the missed appointment.',
    groups: [
      {
        rows: [
          { label: 'TX_RTT (returned to treatment)', indicators: ['rtt'], strong: true },
          { label: 'TX_RTT: Experienced a treatment interruption of <3 months', indicators: ['rtt_lt3'] },
        ],
      },
      {
        title: 'TX_RTT: Experienced a treatment interruption of 3-5 months',
        rows: [{ label: 'Total', indicators: ['rtt_3_5'], strong: true }, ...rttCd4('rtt_3_5')],
      },
      {
        title: 'TX_RTT: Experienced a treatment interruption of 6+ months',
        rows: [{ label: 'Total', indicators: ['rtt_6_plus'], strong: true }, ...rttCd4('rtt_6_plus')],
      },
    ],
  },
  {
    id: 'tx-ml',
    number: '1.6',
    title: 'TX_ML (Mortality & Loss) - Monthly',
    shortTitle: 'TX_ML',
    note: 'TX_ML: on ART here at the end of last month (last month’s TX_CURR) but not at the end of this month, by their status now. An interruption is a defaulter or lost to follow-up, by how long they had been on ART at the missed appointment.',
    groups: [
      {
        title: 'Outflows (Net Loss)',
        rows: [
          { label: 'Total', indicators: ['ml_total'], strong: true },
          { label: 'Interruption of Treatment for clients on ART for <3 months', indicators: ['ml_iit_lt3'] },
          { label: 'Interruption of Treatment for clients on ART for 3-5 months', indicators: ['ml_iit_3_5'] },
          { label: 'Interruption of Treatment for clients on ART for 6+ months', indicators: ['ml_iit_6_plus'] },
          { label: 'Transfer Out (TO)', indicators: ['ml_to'] },
          { label: 'Refused (Stopped) Treatment', indicators: ['ml_stopped'] },
          { label: 'Deceased', indicators: ['ml_died'] },
          { label: 'Not categorized', indicators: ['ml_unknown'], notRecorded: true },
        ],
      },
    ],
  },
  {
    id: 'cod',
    number: '1.7',
    title: 'Cause of Death - Monthly',
    shortTitle: 'Cause of death',
    note: 'Cause of death of the clients who died (TX_ML Deceased): the latest recorded on a death report or outreach form, else on the person; none recorded counts as unknown.',
    groups: [
      { rows: [{ label: 'Deceased (TX_ML)', indicators: ['ml_died'], reference: true }] },
      {
        title: 'Disaggregations of Cause of Death (Monthly Net Gain Analysis)',
        rows: [
          { label: 'COD- TB', indicators: ['cod_tb'] },
          { label: 'COD- Cancer', indicators: ['cod_cancer'] },
          { label: 'COD- HIV Disease', indicators: ['cod_hiv'] },
          { label: 'COD- Other HIV Disease', indicators: ['cod_other_hiv'] },
          { label: 'COD- Other Natural Causes', indicators: ['cod_other_natural'] },
          { label: 'COD- Non Natural Causes', indicators: ['cod_non_natural'] },
          { label: 'COD- Unknown Causes', indicators: ['cod_unknown'] },
        ],
      },
    ],
  },
  {
    id: 'pmtct-vl',
    number: '',
    title: 'Monthly PMTCT VL Tracking (Females only)',
    shortTitle: 'PMTCT VL',
    note: 'PMTCT VL tracking: each woman’s latest viral load in the past 12 months; pregnant first, then breastfeeding, then with a child under 2. A known positive was diagnosed before this pregnancy (280 days before the EDD or the child’s birth), a new positive since.',
    mch: true,
    groups: [
      {
        rows: [
          { label: 'TX_Curr MCH', indicators: ['tx_curr'], strong: true },
          { label: 'Eligible for Viral Load in the last 12 months', indicators: ['vl_eligible'] },
        ],
      },
      { title: 'Pregnant', rows: pmtctViralLoads('pregnant') },
      { title: 'Breastfeeding', rows: pmtctViralLoads('bf') },
      { title: 'Other (non-breastfeeding with child below 24 months)', rows: pmtctViralLoads('other') },
    ],
  },
];

/** Whether a row counts only the MCH/PMTCT clients */
export const isMchRow = (section: ReportSection, row: ReportRow) => Boolean(section.mch || row.mch);

/** A row's name in full, for its linelist, e.g. `<6 months on ART - Well (stage I & II)` */
export const rowTitle = (group: RowGroup, row: ReportRow) =>
  group.title && !row.label.startsWith(group.title) ? `${group.title} - ${row.label}` : row.label;
