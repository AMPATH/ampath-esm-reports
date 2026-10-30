import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';

interface PresumptiveTbParams {
  locationUuids: string;
  startDate: string;
  endDate: string;
}

/**
 * Presumptive TB Register (MOH/REG/DNTLDP/02): one row per TB encounter (331)
 * in the period, for the whole facility of the location, in the register's
 * columns (PresumptiveTbRow).
 */
export async function getPresumptiveTb(params: PresumptiveTbParams): Promise<Array<Record<string, unknown>>> {
  const url = await buildEtlUrl('presumptive-tb-register', {
    locationUuids: params.locationUuids,
    startDate: params.startDate,
    endDate: params.endDate,
  });
  const response = await openmrsFetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch the Presumptive TB register: ${response.status} - ${await response.text()}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
