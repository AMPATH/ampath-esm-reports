import {
  Activity,
  Chemistry,
  Document,
  DocumentTasks,
  Medication,
  Microscope,
  Stethoscope,
  TaskView,
} from '@carbon/react/icons';

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
    title: 'HIV Testing Services & Pre-Exposure Prophylaxis',
    description: 'HTS and PrEP daily registers',
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
      {
        code: 'MOH 267',
        name: 'PrEP daily activity',
        description: 'PrEP visits: clients new, continuing or restarting, their PrEP method, HIV results and STIs.',
        path: '/moh-267',
        icon: Medication,
        keywords: ['prep', 'pre-exposure', 'prophylaxis', 'daily activity', 'dar', 'sti'],
      },
    ],
  },
  {
    id: 'tb',
    title: 'Tuberculosis',
    description: 'TB case finding registers',
    tone: 'teal',
    reports: [
      {
        code: 'MOH/REG/DNTLDP/02',
        name: 'Presumptive TB',
        description:
          'Presumptive TB cases, their investigations and results, and whether started on TB treatment or TPT.',
        path: '/presumptive-tb',
        icon: Stethoscope,
        keywords: ['tb', 'tuberculosis', 'presumptive', 'acf', 'case finding', 'sputum', 'genexpert', 'tpt'],
      },
      {
        code: 'TB4',
        name: 'Notification & treatment',
        description:
          'Drug-sensitive TB patients notified: diagnosis, investigations, treatment, follow-up and outcome.',
        path: '/tb4',
        icon: TaskView,
        keywords: ['tb', 'tb4', 'tuberculosis', 'dstb', 'notification', 'treatment', 'outcome', 'smear', 'culture'],
      },
    ],
  },
  {
    id: 'outpatient-and-workload',
    title: 'Outpatient & workload',
    description: 'Outpatient morbidity registers',
    tone: 'teal',
    reports: [
      {
        code: 'MOH 204A',
        name: 'Under-5 Outpatient Register',
        description: 'Daily outpatient visits and clinical details for children under five years.',
        path: '/moh-204a',
        icon: DocumentTasks,
        keywords: ['outpatient', 'opd', 'under 5', 'under five', 'children', 'morbidity'],
      },
      {
        code: 'MOH 204B',
        name: 'Over-5 Outpatient Register',
        description: 'Daily outpatient visits and clinical details for clients aged five years and above.',
        path: '/moh-204b',
        icon: Document,
        keywords: ['outpatient', 'opd', 'over 5', 'above five', 'adults', 'morbidity'],
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
    id: 'radiology',
    title: 'Radiology',
    description: 'Radiology examination register',
    tone: 'blue',
    reports: [
      {
        code: 'MOH 209',
        name: 'Radiology Register',
        description: 'Radiology examinations, reports, referrals and billing details.',
        path: '/moh-209-register',
        icon: Microscope,
        keywords: ['radiology', 'x-ray', 'imaging', 'ultrasound', 'examination'],
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
      },
    ],
  },
  {
    id: 'MOH 711',
    title: 'MOH 711',
    description: 'MOH 711 Summary',
    tone: 'violet',
    reports: [
      {
        code: 'MOH 405',
        name: 'MOH 405 Register',
        description: 'MOH 405 Register',
        path: '/moh-405-register',
        icon: Activity,
        keywords: ['anc'],
      },
      {
        code: 'MOH 406',
        name: 'MOH 406 Register',
        description: 'MOH 406 Register',
        path: '/moh-406-register',
        icon: Activity,
        keywords: ['pnc'],
      },
      {
        code: 'MOH 333',
        name: 'MOH 333 Register',
        description: 'MOH 333 Register',
        path: '/moh-333-register',
        icon: Activity,
        keywords: ['anc'],
      },
      {
        code: 'MOH 407',
        name: 'MOH 407 Register',
        description: 'Child Health and Nutrition Register',
        path: '/moh-407-register',
        icon: Activity,
        keywords: ['child health', 'nutrition', 'chanis'],
      },
      {
        code: 'MOH 512',
        name: 'MOH 512 Register',
        description: 'MOH 512 Register',
        path: '/moh-512-register',
        icon: Activity,
        keywords: ['family', 'planning'],
      },
    ],
  },
  {
    id: 'MOH 710',
    title: 'MOH 710',
    description: 'MOH 710',
    tone: 'violet',
    reports: [
      {
        code: 'MOH 510',
        name: 'Immunization Register',
        description: 'Immunization Register',
        path: '/moh-510-register',
        icon: Activity,
        keywords: ['immunization'],
      },
      {
        code: 'MOH 413',
        name: 'HPV Register',
        description: 'HPV Register',
        path: '/moh-413-register',
        icon: Activity,
        keywords: ['hpv'],
      },
    ],
  },
];

export const totalRegisterCount = registerCategories.reduce((count, category) => count + category.reports.length, 0);
