import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';

interface Moh267Params {
  locationUuids: string;
  startDate: string;
  endDate: string;
}

/**
 * MOH 267 PrEP Daily Activity Register: one row per PrEP visit in the period --
 * the same visits as MOH 731 1.3 to 1.5 -- for the whole facility of the
 * location, with the register's columns.
 */
export async function getMoh267(params: Moh267Params): Promise<Array<Record<string, unknown>>> {
  const url = await buildEtlUrl('moh-267-register', {
    locationUuids: params.locationUuids,
    startDate: params.startDate,
    endDate: params.endDate,
  });
  const response = await openmrsFetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch the MOH 267 register: ${response.status} - ${await response.text()}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
