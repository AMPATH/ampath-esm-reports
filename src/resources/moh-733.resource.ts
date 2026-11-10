import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';

interface Moh733Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
  indicator?: string | string[];
  reportName?: string;
}

export async function getMoh733(params: Moh733Params): Promise<any> {
  const url = await buildEtlUrl('moh-733', {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
  });
  try {
    const response = await openmrsFetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch dashboard summary: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-733 report: ${error.message}`);
  }
}
