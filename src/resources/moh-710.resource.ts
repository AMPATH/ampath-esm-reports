import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';
import { PAGE_SIZE, toPatientListPage, pageParams, type PatientListParams } from './patient-list-page';

interface Moh710Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
  indicator?: string | string[];
  startIndex?: number;
  limit?: number;
  reportName?: string;
}

export async function getMoh710(params: Moh710Params): Promise<any> {
  const url = await buildEtlUrl('moh-710', {
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
    throw new Error(`An error occurred while fetching the MOH-710 report: ${error.message}`);
  }
}

export async function getMoh510PatientList(params: PatientListParams): Promise<any> {
  const url = await buildEtlUrl('moh-510-patient-list', {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: Array.isArray(params.indicator) ? params.indicator.join(',') : params.indicator || '',
    reportName: params.reportName || 'moh710Report',
    ...pageParams(params),
  });

  try {
    const response = await openmrsFetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch dashboard summary: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return toPatientListPage(data, params.startIndex ?? 0, params.limit ?? PAGE_SIZE);
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-510 REgister: ${error.message}`);
  }
}

export async function getMoh413PatientList(params: PatientListParams): Promise<any> {
  const url = await buildEtlUrl('moh-413-patient-list', {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: Array.isArray(params.indicator) ? params.indicator.join(',') : params.indicator || '',
    reportName: params.reportName || 'moh710Report',
    ...pageParams(params),
  });

  try {
    const response = await openmrsFetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch  moh-413: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return toPatientListPage(data, params.startIndex ?? 0, params.limit ?? PAGE_SIZE);
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-413 Register: ${error.message}`);
  }
}
