import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';
import { PAGE_SIZE, pageParams, toPatientListPage, type PatientListPage } from './patient-list-page';

export interface QualityImprovementCounts {
  /**
   * The month's end the counts of a client's status on ART are for
   * (YYYY-MM-DD): the period's last month, or the latest month in the HIV
   * monthly dataset while that one is not in it yet
   */
  statusMonth: string;
  /** Each indicator's count, e.g. `{ 'recent-defaulters': 744 }` */
  counts: Record<string, number>;
}

/**
 * The Quality Improvement report for the period from `startDate` to `endDate`
 * (a month, or any dates), for the whole facility of the location: each
 * indicator's count of clients needing an action.
 */
export async function getQualityImprovement(params: {
  locationUuids: string;
  startDate: string;
  endDate: string;
}): Promise<QualityImprovementCounts> {
  const url = await buildEtlUrl('quality-improvement', {
    locationUuids: params.locationUuids,
    startDate: params.startDate,
    endDate: params.endDate,
  });
  const response = await openmrsFetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch the Quality Improvement report: ${response.status} - ${await response.text()}`);
  }
  const data = await response.json();
  return { statusMonth: data?.statusMonth ?? '', counts: data?.counts ?? {} };
}

/** A Case Surveillance card: the gap (numerator) out of the clients it applies to (denominator) */
export interface CaseSurveillanceCard {
  numerator: number;
  denominator: number;
  /** The indicators whose clients each figure lists */
  numeratorIndicator: string;
  denominatorIndicator: string;
}

/**
 * The Case Surveillance report for the period, for the whole facility of the
 * location: each gap review card, by id (e.g. `not-linked`).
 */
export async function getCaseSurveillance(params: {
  locationUuids: string;
  startDate: string;
  endDate: string;
}): Promise<{ statusMonth: string; cards: Record<string, CaseSurveillanceCard> }> {
  const url = await buildEtlUrl('case-surveillance', {
    locationUuids: params.locationUuids,
    startDate: params.startDate,
    endDate: params.endDate,
  });
  const response = await openmrsFetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch the Case Surveillance report: ${response.status} - ${await response.text()}`);
  }
  const data = await response.json();
  return { statusMonth: data?.statusMonth ?? '', cards: data?.cards ?? {} };
}

/** A page of the clients of one indicator (of either report) */
export async function getQualityImprovementPatientList(params: {
  locationUuids: string;
  startDate: string;
  endDate: string;
  indicator: string;
  startIndex?: number;
  limit?: number;
}): Promise<PatientListPage> {
  const url = await buildEtlUrl('quality-improvement-patient-list', {
    locationUuids: params.locationUuids,
    startDate: params.startDate,
    endDate: params.endDate,
    indicator: params.indicator,
    ...pageParams(params),
  });
  const response = await openmrsFetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch the patient list: ${response.status} - ${await response.text()}`);
  }
  return toPatientListPage(await response.json(), params.startIndex ?? 0, params.limit ?? PAGE_SIZE);
}
