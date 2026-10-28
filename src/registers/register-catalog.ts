import { Activity, Chemistry, Microscope } from '@carbon/react/icons';

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
  {
    id: 'diabetes-and-hypertension',
    title: 'Diabetes and Hypertension services',
    description: 'Diabetes and Hypertension comprehensive care',
    tone: 'violet',
    reports: [
      {
        code: 'MOH 222',
        name: 'Diabetes and Hypertension Comprehensive Care Daily Register',
        description: 'Diabetes and Hypertension Comprehensive Care Daily Register',
        path: '/moh-222',
        icon: Activity,
        keywords: ['cdm', 'ncd', 'diabetes', 'hypertetion'],
      },
      {
        code: 'MOH 270',
        name: 'Diabetes & Hypertension Comprehensive Care Permanent register',
        description: 'Diabetes & Hypertension Comprehensive Care Permanent register',
        path: '/moh-270',
        icon: Activity,
        keywords: ['cdm', 'ncd', 'diabetes', 'hypertetion'],
      },
    ],
  },
  {
    id: 'laboratory',
    title: 'Laboratory',
    description: 'Laboratory specimen and testing registers',
    tone: 'blue',
    reports: [
      {
        code: 'MOH 240',
        name: 'Laboratory (LAB) Register',
        description:
          'Specimens collected and analysed by the laboratory: investigations, results, billing and referral.',
        path: '/moh-240-register',
        icon: Chemistry,
        keywords: ['lab', 'laboratory', 'specimen', 'results', 'malaria', 'referral'],
      },
      {
        code: 'TB LAB',
        name: 'TB Laboratory Register',
        description:
          'TB specimens tested: microscopy (AFB), TB-LAMP, LF-LAM and GeneXpert/Truenat results with turnaround.',
        path: '/tb-lab-register',
        icon: Chemistry,
        keywords: ['tb', 'tuberculosis', 'afb', 'microscopy', 'sputum', 'genexpert', 'truenat', 'lamp', 'tat'],
      },
    ],
  },
  {
    id: 'cancer-screening',
    title: 'Cancer Screening services',
    description: 'Cancer Screening Summary',
    tone: 'violet',
    reports: [
      {
        code: 'MOH 412',
        name: 'Cancer Screening Register',
        description: 'Cancer Screening Register',
        path: '/moh-412-register',
        icon: Activity,
        keywords: ['cancer', 'cervical', 'screening'],
      }
    ],
  }
];

export const totalRegisterCount = registerCategories.reduce((count, category) => count + category.reports.length, 0);
