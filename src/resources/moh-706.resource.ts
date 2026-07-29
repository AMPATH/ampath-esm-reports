import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';
import {
  PAGE_SIZE,
  pageParams,
  toPatientListPage,
  type PatientListPage,
  type PatientListParams,
} from './patient-list-page';

interface Moh706Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
}

interface Moh706Response {
  result: Array<Record<string, unknown>>;
}

interface Moh706PatientListResponse {
  result: Array<Record<string, unknown>>;
}

export async function getMoh706(params: Moh706Params): Promise<Array<Record<string, unknown>>> {
  const url = await buildEtlUrl('lab-706', {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
  });
  try {
    const response = await openmrsFetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch MOH-706 report: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.result)) {
      throw new Error('Invalid MOH-706 response format: missing result array.');
    }

    return data.result;
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-706 report: ${error.message}`);
  }
}

export async function getMoh706PatientList(params: PatientListParams): Promise<PatientListPage> {
  const url = await buildEtlUrl('lab-706/patient-list', {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicators: params.indicators || '',
    ...pageParams(params),
  });
  try {
    const response = await openmrsFetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch MOH-706 patient list: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return toPatientListPage(data, params.startIndex ?? 0, params.limit ?? PAGE_SIZE);
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-706 patient list: ${error.message}`);
  }
}
