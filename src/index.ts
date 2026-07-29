import { getAsyncLifecycle, defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { createDashboardLink } from './createDashboardLink';
import { reportsDashboardMeta } from './dashboard-meta/reports-dashboard.meta';

export const moduleName = '@ampath/esm-reports-app';

/**
 * The section this app's configuration is declared under.
 *
 * Not the package name: the AMPATH deployment's `o3-config.json` declares
 * `@ampath/esm-reporting`, and there is no `@ampath/esm-reports-app` section in
 * it. Registering the schema under the package name left `etlBaseUrl` on its
 * empty default no matter what the deployment set, so every report failed with
 * "the ETL base URL is not configured". Keep this in step with the config, not
 * with `package.json`.
 */
export const configSectionName = '@ampath/esm-reporting';

const options = {
  featureName: 'ampath-esm-reports',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(configSectionName, configSchema);
}
export const root = getAsyncLifecycle(() => import('./root.component'), options);

export const reportsDashboardLink = getSyncLifecycle(createDashboardLink(reportsDashboardMeta), options);
