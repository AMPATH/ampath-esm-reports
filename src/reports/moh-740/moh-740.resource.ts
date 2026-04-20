import { openmrsFetch } from '@openmrs/esm-framework';
import { getEtlBaseUrl } from '../../utils/get-base-url';
import { type Moh740Resp, type Moh740Dto, type Moh740Data } from './types';

export async function fetchMoh740Report(params: Moh740Dto): Promise<Moh740Data> {
  const etlBaseUrl = await getEtlBaseUrl();
  const moh740Url = `${etlBaseUrl}/moh-740-report?endDate=${params.endDate}&locationUuids=${params.locationUuid}`;
  const resp = await openmrsFetch(moh740Url);
  const data: Moh740Resp = await resp.json();
  if (data && data.result) {
    return data.result[0];
  } else {
    return null;
  }
}
