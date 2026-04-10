import { openmrsFetch } from '@openmrs/esm-framework';
import { getEtlBaseUrl } from '../utils/get-base-url';

interface Moh710Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
}

export async function getMoh710(params: Moh710Params): Promise<any> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-710`;
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
      throw new Error(`Failed to fetch dashboard summary: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-710 report: ${error.message}`);
  }
}
