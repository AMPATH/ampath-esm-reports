import { openmrsFetch } from '@openmrs/esm-framework';
import { getEtlBaseUrl } from '../../utils/get-base-url';
import {
  type Moh740Resp,
  type Moh740Dto,
  type Moh740Data,
  type Moh740RegisterDto,
  type Moh740RegisterResp,
  type Moh270Patient,
} from './types';

const baseMoh740Url = 'moh-740-report';

export async function fetchMoh740Report(params: Moh740Dto): Promise<Moh740Data | null> {
  const etlBaseUrl = await getEtlBaseUrl();
  const moh740Url = `${etlBaseUrl}/${baseMoh740Url}?endDate=${params.endDate}&locationUuids=${params.locationUuid}`;
  const resp = await openmrsFetch(moh740Url);

  /* Without this a 404 or a 500 falls through to `null`, which the report then
     renders as "no report generated yet" -- indistinguishable from never
     having pressed Generate. Throwing lets the failure reach the snackbar. */
  if (!resp.ok) {
    throw new Error(`Failed to fetch the MOH-740 report: ${resp.status} ${resp.statusText}`);
  }

  const data: Moh740Resp = await resp.json();

  return data?.result?.[0] ?? null;
}

export async function fetchMoh740Register(params: Moh740RegisterDto): Promise<Moh270Patient[]> {
  const etlBaseUrl = await getEtlBaseUrl();
  const p = {
    endDate: params.endDate,
    indicators: params.indicators,
    locationUuids: params.locationUuid,
  };
  const queryString = new URLSearchParams(p).toString();
  const moh740RegisterUrl = `${etlBaseUrl}/${baseMoh740Url}/patient-list`;
  const resp = await openmrsFetch(`${moh740RegisterUrl}?${queryString}`);

  if (!resp.ok) {
    throw new Error(`Failed to fetch the MOH-740 register: ${resp.status} ${resp.statusText}`);
  }

  const data: Moh740RegisterResp = await resp.json();

  return data?.result ?? [];
}
