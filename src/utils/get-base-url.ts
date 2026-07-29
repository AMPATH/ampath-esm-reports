import { getConfig } from '@openmrs/esm-framework';
import { configSectionName } from '../index';

/**
 * The ETL host every report reads from, taken from this module's frontend
 * configuration (`etlBaseUrl`).
 *
 * Throws when it is unset rather than returning an empty string: an empty base
 * collapses every report URL onto the OpenMRS root, which surfaces as a bare
 * 404 that reads like a missing endpoint instead of missing configuration.
 */
export async function getEtlBaseUrl(): Promise<string> {
  const { etlBaseUrl } = await getConfig(configSectionName);
  const baseUrl = typeof etlBaseUrl === 'string' ? etlBaseUrl.trim() : '';

  if (!baseUrl) {
    throw new Error(
      `The ETL base URL is not configured. Set "etlBaseUrl" for ${configSectionName} in the frontend configuration.`,
    );
  }

  // trailing slash trimmed so callers can join with a leading slash safely
  return baseUrl.replace(/\/+$/, '');
}

export type EtlQueryParams = Record<string, string | number | undefined | null>;

/**
 * Builds a report URL from the configured ETL base, a path and its query
 * parameters. Blank parameters are dropped rather than sent as empty values.
 */
export async function buildEtlUrl(path: string, params: EtlQueryParams = {}): Promise<string> {
  const baseUrl = await getEtlBaseUrl();

  const query = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => [key, String(value)]),
  ).toString();

  const url = `${baseUrl}/${path.replace(/^\/+/, '')}`;

  return query ? `${url}?${query}` : url;
}
