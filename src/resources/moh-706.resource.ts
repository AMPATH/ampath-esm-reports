import { getJson } from '../utils/utils';

interface Moh706Params {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
}

interface Moh706Response {
  result: Array<Record<string, unknown>>;
}

export async function getMoh706(params: Moh706Params): Promise<Array<Record<string, unknown>>> {
  const url = 'http://localhost:8004/etl/lab-706';
  try {
    const data = await getJson<Moh706Response>(url, {
      startDate: params.startDate,
      endDate: params.endDate,
      locationUuids: params.locationUuids,
    });

    if (!Array.isArray(data.result)) {
      throw new Error('Invalid MOH-706 response format: missing result array.');
    }

    return data.result;
  } catch (error: any) {
    throw new Error(`An error occurred while fetching the MOH-706 report: ${error.message}`);
  }
}
