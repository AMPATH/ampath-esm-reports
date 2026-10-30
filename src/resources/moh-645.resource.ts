import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';
import {
  PAGE_SIZE,
  pageParams,
  toPatientListPage,
  type PatientListPage,
  type PatientListParams,
} from './patient-list-page';

interface Moh645Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
}

const WITH_SESSION_COOKIE = { credentials: 'include' as RequestCredentials };

export async function getMoh645(params: Moh645Params): Promise<any> {
  const url = await buildEtlUrl('moh-645-report', {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
  });
  try {
    const response = await openmrsFetch(url, WITH_SESSION_COOKIE);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch MOH-645 report: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-645 report: ${error.message}`);
  }
}

export async function getMoh645PatientList(params: PatientListParams): Promise<PatientListPage> {
  const url = await buildEtlUrl('moh-645-report/patient-list', {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicators: params.indicators || '',
    ...pageParams(params),
  });
  try {
    const response = await openmrsFetch(url, WITH_SESSION_COOKIE);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch MOH-645 patient list: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    return toPatientListPage(data, params.startIndex ?? 0, params.limit ?? PAGE_SIZE);
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-645 patient list: ${error.message}`);
  }
}
