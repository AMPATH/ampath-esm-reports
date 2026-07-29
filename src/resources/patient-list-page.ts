/** How many rows a register asks for at a time */
export const PAGE_SIZE = 50;

export interface PatientListParams {
  locationUuids: string;
  startDate?: string;
  endDate?: string;
  indicator?: string;
  indicators?: string;
  gender?: string;
  /** MOH-711 endpoints scope the list by report */
  reportName?: string;
  /** Row to start at, 0-based, as the ETL expects */
  startIndex?: number;
  limit?: number;
}

export interface PatientListPage {
  results: Array<Record<string, any>>;
  /** Rows across every page */
  total: number;
  /** `false` when the total had to be inferred rather than read from the response */
  isTotalExact: boolean;
}

/** The paging arguments every patient-list endpoint takes */
export function pageParams(params: PatientListParams) {
  return {
    startIndex: String(params.startIndex ?? 0),
    limit: String(params.limit ?? PAGE_SIZE),
  };
}

/**
 * Normalises a patient-list response into a page of rows plus a total.
 *
 * The endpoints nest their payload differently and do not all report a count,
 * so the total is read from whichever field carries it and inferred otherwise:
 * a short page means we are on the last one, a full page means there is at
 * least one more. Inferring keeps the pager usable without ever overstating
 * what we know -- `isTotalExact` says which it is.
 */
export function toPatientListPage(data: any, startIndex: number, limit: number): PatientListPage {
  const container = data?.results ?? data ?? {};
  const results: Array<Record<string, any>> = Array.isArray(container?.results)
    ? container.results
    : Array.isArray(container)
      ? container
      : [];

  const reported = [container?.total, container?.totalCount, container?.count, data?.total, data?.totalCount].find(
    (value) => typeof value === 'number',
  );

  if (typeof reported === 'number') {
    return { results, total: reported, isTotalExact: true };
  }

  const isLastPage = results.length < limit;

  return {
    results,
    total: isLastPage ? startIndex + results.length : startIndex + results.length + 1,
    isTotalExact: isLastPage,
  };
}
