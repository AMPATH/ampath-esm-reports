import { getAsyncLifecycle, defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { createDashboardLink } from './createDashboardLink';
import { reportsDashboardMeta } from './dashboard-meta/reports-dashboard.meta';

export const moduleName = '@ampath/esm-reports-app';

const options = {
  featureName: 'ampath-esm-reports',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
export const root = getAsyncLifecycle(() => import('./root.component'), options);

export const reportsDashboardLink = getSyncLifecycle(createDashboardLink(reportsDashboardMeta), options);
