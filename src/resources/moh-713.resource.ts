import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';
import {
  PAGE_SIZE,
  pageParams,
  type PatientListPage,
  type PatientListParams,
  toPatientListPage,
} from './patient-list-page';

interface Moh713Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
  indicator?: string | string[];
  reportName?: string;
}

export async function getMoh713(params: Moh713Params): Promise<any> {
  const url = await buildEtlUrl('moh-713', {
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
    throw new Error(`An error occurred while fetching the MOH-713 report: ${error.message}`);
  }
}

export async function getMoh368Register(params: PatientListParams): Promise<PatientListPage> {
  const url = await buildEtlUrl('moh-368-register', {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: Array.isArray(params.indicator) ? params.indicator.join(',') : params.indicator || '',
    reportName: params.reportName || '',
    ...pageParams(params),
  });

  try {
    const response = await openmrsFetch(url);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Failed to fetch  moh-368: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return toPatientListPage(data?.data, params.startIndex ?? 0, params.limit ?? PAGE_SIZE);
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-368 Register: ${error.message}`);
  }
}
