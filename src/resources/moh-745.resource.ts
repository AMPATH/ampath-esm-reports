import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';
import {
  PAGE_SIZE,
  pageParams,
  toPatientListPage,
  type PatientListPage,
  type PatientListParams,
} from './patient-list-page';

interface Moh745Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
  indicator?: string | string[];
}

export async function getMoh745(params: Moh745Params): Promise<any> {
  const url = await buildEtlUrl('moh-745', {
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

export async function getMoh412PatientList(params: PatientListParams): Promise<PatientListPage> {
  const url = await buildEtlUrl('moh-412-patient-list', {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: Array.isArray(params.indicator) ? params.indicator.join(',') : params.indicator || '',
    ...pageParams(params),
  });
  try {
    const response = await openmrsFetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch patient list: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return toPatientListPage(data, params.startIndex ?? 0, params.limit ?? PAGE_SIZE);
  } catch (error: any) {
    console.error('Failed to fetch MOH 412 PATIENT LIST data', error);
    throw new Error(`An error occurred while fetching the MOH-705 patient list: ${error.message}`);
  }
}
