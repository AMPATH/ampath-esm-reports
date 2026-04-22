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

export async function fetchMoh740Report(params: Moh740Dto): Promise<Moh740Data> {
  const etlBaseUrl = await getEtlBaseUrl();
  const moh740Url = `${etlBaseUrl}/${baseMoh740Url}?endDate=${params.endDate}&locationUuids=${params.locationUuid}`;
  const resp = await openmrsFetch(moh740Url);
  const data: Moh740Resp = await resp.json();
  if (data && data.result) {
    return data.result[0];
  } else {
    return null;
  }
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
  const data: Moh740RegisterResp = await resp.json();
  if (data && data.result) {
    return data.result;
  } else {
    return [];
  }
}
