import { openmrsFetch } from '@openmrs/esm-framework';
import { getEtlBaseUrl } from '../utils/get-base-url';

interface Moh505Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
}

interface Moh505Response {
  result: Array<Record<string, unknown>>;
}

interface Moh505PatientListParams {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
  indicators: string;
}

interface Moh505PatientListResponse {
  result: Array<Record<string, unknown>>;
}

export async function getMoh505(params: Moh505Params): Promise<Array<Record<string, unknown>>> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-505`;
  const queryparams = {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
  };
  const queryString = new URLSearchParams(
    Object.fromEntries(Object.entries(queryparams).filter(([_, v]) => v !== undefined && v !== null)),
  ).toString();
  try {
    const response = await openmrsFetch(`${url}?${queryString}`);

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

export async function getMoh505PatientList(params: Moh505PatientListParams): Promise<Array<Record<string, unknown>>> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-505/patient-list`;
  const queryparams = {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicators: params.indicators || '',
  };
  const queryString = new URLSearchParams(
    Object.fromEntries(Object.entries(queryparams).filter(([_, v]) => v !== undefined && v !== null)),
  ).toString();
  try {
    const response = await openmrsFetch(`${url}?${queryString}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch MOH-505 patient list: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.result)) {
      throw new Error('Invalid MOH-505 patient list response format: missing result array.');
    }

    return data.result;
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-505 patient list: ${error.message}`);
  }
}