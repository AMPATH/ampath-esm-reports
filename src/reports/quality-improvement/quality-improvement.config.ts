import { type ReportTone } from '../../dashboard/report-catalog';

/**
 * The Quality Improvement report's indicators: the clients who need an
 * action, by area. Each `id` is the ETL's indicator (quality-improvement
 * service), which gives its count and its clients for the period.
 */

export interface QualityIndicator {
  id: string;
  code: string;
  name: string;
  description: string;
  /** Not counted yet: no source in the EMR has been agreed */
  pending?: boolean;
}

export interface QualityArea {
  id: string;
  title: string;
  description: string;
  tone: ReportTone;
  indicators: QualityIndicator[];
}

export const QUALITY_AREAS: QualityArea[] = [
  {
    id: 'testing-and-linkage',
    title: 'Testing & linkage',
    description: 'Clients to link to care or prevention',
    tone: 'teal',
    indicators: [
      {
        id: 'hiv-positive-not-linked',
        code: 'LINKAGE',
        name: 'HIV positive not linked',
        description: 'Tested HIV positive in the period, with no linkage form and not enrolled in HIV care.',
      },
      {
        id: 'high-risk-pbf-not-on-prep',
        code: 'PBF PrEP',
        name: 'High risk -ve PBFs not on PrEP',
        description:
          'Pregnant or breastfeeding women screened in the period: HIV negative, high or very high risk, with no PrEP visit.',
      },
      {
        id: 'pns-undocumented-status',
        code: 'PNS',
        name: 'PNS contacts with undocumented HIV status',
        description: 'Sexual and needle-sharing partners elicited by the period’s end, with no HIV status or test.',
      },
      {
        id: 'sns-undocumented-status',
        code: 'SNS',
        name: 'SNS contacts with undocumented HIV status',
        description: 'Social Network Strategy contacts whose HIV status is not documented.',
        pending: true,
      },
    ],
  },
  {
    id: 'viral-load',
    title: 'Viral load',
    description: 'Clients to test or support to suppression',
    tone: 'violet',
    indicators: [
      {
        id: 'missed-vl-testing',
        code: 'VL TEST',
        name: 'Missed opportunity in VL testing',
        description: 'On ART, seen in the month while due for a viral load, with none ordered or resulted.',
      },
      {
        id: 'viral-load-200-plus',
        code: 'VL ≥200',
        name: 'Current on ART with VL ≥ 200',
        description: 'On ART, latest viral load in the past 12 months 200 copies/ml or more (includes ≥1000).',
      },
      {
        id: 'viral-load-1000-plus',
        code: 'VL ≥1000',
        name: 'Current on ART with VL ≥ 1000',
        description: 'On ART, latest viral load in the past 12 months 1000 copies/ml or more.',
      },
      {
        id: 'delayed-eac',
        code: 'EAC',
        name: 'Delayed enhanced adherence counselling (EAC)',
        description: 'Viral load ≥200 over 2 weeks ago, with no enhanced adherence session since.',
      },
    ],
  },
  {
    id: 'retention',
    title: 'Retention',
    description: 'Clients to trace or enrol in support',
    tone: 'blue',
    indicators: [
      {
        id: 'recent-defaulters',
        code: 'DEFAULTERS',
        name: 'Recent defaulters (missed app < 30 days)',
        description: 'On ART, missed their appointment by 1-30 days at the month’s end.',
      },
      {
        id: 'adolescent-not-in-otz',
        code: 'OTZ',
        name: 'Adolescent not enrolled in OTZ',
        description: 'On ART, aged 10-19, not enrolled in OTZ at the month’s end.',
      },
    ],
  },
  {
    id: 'hei',
    title: 'HIV-exposed infants',
    description: 'Infants due for a test, linkage or outcome',
    tone: 'magenta',
    indicators: [
      {
        id: 'hei-without-dna-pcr',
        code: 'HEI PCR',
        name: 'HEI (6–8 wk) without DNA PCR',
        description: 'Infants 6-8 weeks old during the period, with no DNA PCR result by its end.',
      },
      {
        id: 'hei-not-linked-to-mother',
        code: 'HEI LINK',
        name: 'HEI not linked to the mother',
        description: 'Infants in care under 2 years with no mother linked to their record.',
      },
      {
        id: 'hei-without-outcome',
        code: 'HEI OUTCOME',
        name: 'HEI above 2 years without documented outcome',
        description: 'Infants 2 years and over, still in care, with no final outcome recorded.',
      },
    ],
  },
];

export const QUALITY_INDICATORS = QUALITY_AREAS.flatMap((area) => area.indicators);

export const QUALITY_IMPROVEMENT_PATH = '/quality-improvement/report';
export const QUALITY_IMPROVEMENT_LINELIST_PATH = '/quality-improvement/linelist';
