import { openmrsFetch } from '@openmrs/esm-framework';
import { getEtlBaseUrl } from '../utils/get-base-url';

interface Moh711Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
  indicator?: string | string[];
  reportName?: string;
}

export async function getMoh711(params: Moh711Params): Promise<any> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-711`;
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
    throw new Error(`An error occurred while fetching the MOH-711 report: ${error.message}`);
  }
}

export async function getMoh406PatientList(params: Moh711Params): Promise<any> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-406-patient-list`;
  const queryparams = {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: Array.isArray(params.indicator) ? params.indicator.join(',') : params.indicator || '',
    reportName: params.reportName || '',
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
    throw new Error(`An error occurred while fetching the MOH-705 patient list: ${error.message}`);
  }
}

export async function getMoh405PatientList(params: Moh711Params): Promise<any> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-405-patient-list`;
  const queryparams = {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: Array.isArray(params.indicator) ? params.indicator.join(',') : params.indicator || '',
    reportName: params.reportName || '',
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
    throw new Error(`An error occurred while fetching the MOH-705 patient list: ${error.message}`);
  }
}

export async function getMoh333PatientList(params: Moh711Params): Promise<any> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-333-patient-list`;
  const queryparams = {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: Array.isArray(params.indicator) ? params.indicator.join(',') : params.indicator || '',
    reportName: params.reportName || '',
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
    throw new Error(`An error occurred while fetching the MOH-705 patient list: ${error.message}`);
  }
}

export async function getMoh510PatientList(params: Moh711Params): Promise<any> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-510-patient-list`;
  const queryparams = {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: Array.isArray(params.indicator) ? params.indicator.join(',') : params.indicator || '',
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
    throw new Error(`An error occurred while fetching the MOH-705 patient list: ${error.message}`);
  }
}

export async function getMoh511PatientList(params: Moh711Params): Promise<any> {
  const etlBaseUrl = await getEtlBaseUrl();
  const url = `${etlBaseUrl}/moh-511-patient-list`;
  const queryparams = {
    locationUuids: params.locationUuids || '',
    startDate: params.startDate || '',
    endDate: params.endDate || '',
    indicator: Array.isArray(params.indicator) ? params.indicator.join(',') : params.indicator || '',
    reportName: params.reportName || '',
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
    throw new Error(`An error occurred while fetching the MOH-705 patient list: ${error.message}`);
  }
}
