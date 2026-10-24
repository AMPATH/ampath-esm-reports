import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';

interface Moh362Params {
  locationUuids: string;
  startDate: string;
  endDate: string;
}

/**
 * MOH 362 HTS Lab, Referral & Linkage Register: one row per test in the
 * period -- the same tests as MOH 731 1.1 HIV Tests -- for the whole facility of
 * the location, with the register's details.
 */
export async function getMoh362(params: Moh362Params): Promise<Array<Record<string, unknown>>> {
  const url = await buildEtlUrl('moh-362-register', {
    locationUuids: params.locationUuids,
    startDate: params.startDate,
    endDate: params.endDate,
  });
  const response = await openmrsFetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch the MOH 362 register: ${response.status} - ${await response.text()}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
