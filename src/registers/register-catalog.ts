import { Microscope } from '@carbon/react/icons';

import { type ReportCategory } from '../dashboard/report-catalog';

/**
 * The registers listed on the landing page's Registers tab, grouped as the
 * reports are. Each opens on its own route (root.component.tsx) with the same
 * filter bar as the reports, opening on a custom range of today
 * (`defaultTab="custom"`), where the reports open on last month.
 */
export const registerCategories: ReportCategory[] = [
  {
    id: 'hiv-testing',
    title: 'HIV testing services',
    description: 'HTS daily registers',
    tone: 'violet',
    reports: [
      {
        code: 'MOH 362',
        name: 'HTS lab, referral & linkage',
        description: 'Clients tested for HIV, their test kits and results, and referral and linkage to care.',
        path: '/moh-362',
        icon: Microscope,
        keywords: ['hts', 'hiv testing', 'lab', 'referral', 'linkage', 'kits'],
      },
    ],
  },
];

export const totalRegisterCount = registerCategories.reduce((count, category) => count + category.reports.length, 0);
