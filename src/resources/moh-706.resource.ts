import { openmrsFetch } from '@openmrs/esm-framework';
import { getEtlBaseUrl } from '../utils/get-base-url';

interface Moh706Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
}

interface Moh706Response {
  result: Array<Record<string, unknown>>;
}

export async function getMoh706(params: Moh706Params): Promise<Array<Record<string, unknown>>> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/lab-706`;
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
