/**
 * The report each register can be opened from.
 *
 * Several registers serve more than one report -- MOH 333, 405 and 406 are
 * reached from both MOH-711 and MOH-717, and MOH 412 from both MOH-711 and
 * MOH-745. A register cannot name its parent as a constant, then: whichever
 * report it named, the trail would be wrong for everyone arriving from the
 * other one. The link carries `from`, and the trail is resolved from it.
 */
export interface ReportParent {
  label: string;
  path: string;
}

export const REPORT_PARENTS: Record<string, ReportParent> = {
  'moh-240': { label: 'MOH-240 Register', path: '/moh-240' },
  'moh-505': { label: 'MOH-505 Report', path: '/moh-505' },
  'moh-705a': { label: 'MOH-705A Report', path: '/moh-705a' },
  'moh-705b': { label: 'MOH-705B Report', path: '/moh-705b' },
  'moh-706': { label: 'MOH-706 Report', path: '/moh-706' },
  'moh-710': { label: 'MOH-710 Report', path: '/moh-710' },
  'moh-711': { label: 'MOH-711 Report', path: '/moh-711' },
  'moh-717': { label: 'MOH-717 Report', path: '/moh-717' },
  'moh-731': { label: 'MOH-731 Report', path: '/moh-731' },
  'moh-740': { label: 'MOH-740 Report', path: '/moh-740' },
  'moh-745': { label: 'MOH-745 Report', path: '/moh-745' },
};
