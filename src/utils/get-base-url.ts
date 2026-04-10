import { getConfig } from '@openmrs/esm-framework';
import { moduleName } from '../index';

export async function getEtlBaseUrl() {
  const { etlBaseUrl } = await getConfig(moduleName);
  return etlBaseUrl ?? null;
}

export async function getSubDomain() {
  const { subDomain } = await getConfig(moduleName);
  return subDomain ?? null;
}
