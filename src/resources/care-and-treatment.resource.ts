import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';
import { PAGE_SIZE, pageParams, toPatientListPage, type PatientListPage } from './patient-list-page';

/** One group of the report's figures: an age band and sex, in MCH/PMTCT (1) or not (0) */
export interface CareAndTreatmentGroup {
  age_band: string;
  gender: 'F' | 'M';
  mch: number | string;
  [indicator: string]: number | string;
}

/**
 * Care & Treatment and ARV Management, sections 1.1-1.7, for the month ending
 * on `endDate`, for the whole facility of the location: each figure added up
 * by age band, sex and MCH/PMTCT -- a few dozen rows, which the report adds
 * up into its tables.
 */
export async function getCareAndTreatment(params: {
  locationUuids: string;
  endDate: string;
}): Promise<CareAndTreatmentGroup[]> {
  const url = await buildEtlUrl('care-and-treatment', {
    locationUuids: params.locationUuids,
    endDate: params.endDate,
  });
  const response = await openmrsFetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch the Care & Treatment report: ${response.status} - ${await response.text()}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export interface CareAndTreatmentListParams {
  locationUuids: string;
  endDate: string;
  indicator: string;
  /** An age band id, or 'all' */
  ageBand?: string;
  /** F, M or 'all' */
  gender?: string;
  /** '1' for the MCH/PMTCT clients only, or 'all' */
  mch?: string;
  startIndex?: number;
  limit?: number;
}

/** A page of the clients behind one figure of the report */
export async function getCareAndTreatmentPatientList(params: CareAndTreatmentListParams): Promise<PatientListPage> {
  const url = await buildEtlUrl('care-and-treatment-patient-list', {
    locationUuids: params.locationUuids,
    endDate: params.endDate,
    indicator: params.indicator,
    ageBand: params.ageBand ?? 'all',
    gender: params.gender ?? 'all',
    mch: params.mch ?? 'all',
    ...pageParams(params),
  });
  const response = await openmrsFetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch the patient list: ${response.status} - ${await response.text()}`);
  }
  return toPatientListPage(await response.json(), params.startIndex ?? 0, params.limit ?? PAGE_SIZE);
}
