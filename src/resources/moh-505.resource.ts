import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';
import {
  PAGE_SIZE,
  pageParams,
  toPatientListPage,
  type PatientListPage,
  type PatientListParams,
} from './patient-list-page';

interface Moh505Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
}

interface Moh505Response {
  result: Array<Record<string, unknown>>;
}

export async function getMoh505(params: Moh505Params): Promise<Array<Record<string, unknown>>> {
  const url = await buildEtlUrl('moh-505', {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
  });
  try {
    const response = await openmrsFetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch MOH-505 report: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.result)) {
      throw new Error('Invalid MOH-505 response format: missing result array.');
    }

    return data.result;
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-505 report: ${error.message}`);
  }
}

export async function getMoh505PatientList(params: PatientListParams): Promise<PatientListPage> {
  const url = await buildEtlUrl('moh-505/patient-list', {
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
      throw new Error(`Failed to fetch MOH-505 patient list: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return toPatientListPage(data, params.startIndex ?? 0, params.limit ?? PAGE_SIZE);
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-505 patient list: ${error.message}`);
  }
}
