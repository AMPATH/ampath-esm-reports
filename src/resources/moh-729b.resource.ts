import { openmrsFetch } from '@openmrs/esm-framework';
import { buildEtlUrl } from '../utils/get-base-url';

interface Moh729bParams {
  locationUuids: string;
  endDate: string;
}

/**
 * MOH 729B F-MAPS: one row per client active on ART in the month ending on
 * `endDate`, for the whole facility of the location, with the form's regimen
 * code. The form counts these rows and its linelists list them.
 */
export async function getMoh729b(params: Moh729bParams): Promise<Array<Record<string, unknown>>> {
  const url = await buildEtlUrl('moh-729b', {
    locationUuids: params.locationUuids,
    endDate: params.endDate,
  });
  const response = await openmrsFetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch MOH 729B: ${response.status} - ${await response.text()}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
