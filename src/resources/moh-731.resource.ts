import { openmrsFetch } from '@openmrs/esm-framework';
import { getEtlBaseUrl } from '../utils/get-base-url';

interface Moh745Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
  indicator?: string;
  gender?: string;
}

export async function getMoh731(params: Moh745Params): Promise<any> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-731-monthly-summary`;
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

export async function getMoh366PatientList(params: Moh745Params): Promise<any> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-731-monthly-summary-patient-list`;
  const queryparams = {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: params.indicator || '',
    gender: params.gender || '',
    limit: '300',
  };
  const queryString = new URLSearchParams(
    Object.fromEntries(Object.entries(queryparams).filter(([_, v]) => v !== undefined && v !== null)),
  ).toString();
  try {
    const response = await openmrsFetch(`${url}?${queryString}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch patient list: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Failed to fetch MOH 412 PATIENT LIST data', error);
    throw new Error(`An error occurred while fetching the MOH-705 patient list: ${error.message}`);
  }
}

export async function getPrepPatientList(params: Moh745Params): Promise<any> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/prep-patient-list`;
  const queryparams = {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: params.indicator || '',
    gender: params.gender || '',
    limit: '300',
  };
  const queryString = new URLSearchParams(
    Object.fromEntries(Object.entries(queryparams).filter(([_, v]) => v !== undefined && v !== null)),
  ).toString();
  try {
    const response = await openmrsFetch(`${url}?${queryString}`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch patient list: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Failed to fetch MOH 412 PATIENT LIST data', error);
    throw new Error(`An error occurred while fetching the MOH-705 patient list: ${error.message}`);
  }
}
