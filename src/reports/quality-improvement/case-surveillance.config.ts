/**
 * The Case Surveillance report's gap review cards, in their order on the page.
 * Each `id` is the ETL's card (case-surveillance), which gives its gap and the
 * clients it applies to, and the indicators listing each.
 */

export interface CaseSurveillanceCardDefinition {
  id: string;
  title: string;
  description: string;
  /** What the clients not in the gap have had done, for the progress tracker */
  achieved: string;
}

export const CASE_SURVEILLANCE_CARDS: CaseSurveillanceCardDefinition[] = [
  {
    id: 'not-linked',
    title: 'HIV +ve not linked',
    description: 'HIV positive clients not linked to ART',
    achieved: 'Linked to ART',
  },
  {
    id: 'pbfw-not-on-prep',
    title: 'High risk -ve PBFW not on PrEP',
    description: 'High risk -ve PBFW not linked to PrEP',
    achieved: 'On PrEP',
  },
  {
    id: 'delayed-eac',
    title: 'Delayed enhanced adherence counselling',
    description: 'Virally unsuppressed clients without EAC within 2 weeks',
    achieved: 'Had EAC',
  },
  {
    id: 'missed-vl',
    title: 'Missed opportunity in viral load testing',
    description: 'Clients on ART who visited the facility and were eligible for VL but no VL was done',
    achieved: 'VL done',
  },
  {
    id: 'hei-without-pcr',
    title: 'HEI (6–8 weeks) without DNA-PCR results',
    description: 'HEI (6–8 weeks) without DNA PCR results',
    achieved: 'DNA PCR done',
  },
  {
    id: 'hei-without-outcome',
    title: 'Undocumented final outcome',
    description: '24 months old HEI without documented outcome',
    achieved: 'Outcome documented',
  },
];

/** A gap at or above this share of its clients is flagged red */
export const GAP_ALERT_PERCENT = 25;

export const CASE_SURVEILLANCE_PATH = '/quality-improvement/case-surveillance';
