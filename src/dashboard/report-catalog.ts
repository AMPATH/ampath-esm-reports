import {
  Activity,
  ChartColumn,
  Document,
  DocumentTasks,
  GenderFemale,
  Growth,
  HealthCross,
  Microscope,
  UserMultiple,
  Warning,
  type CarbonIconType,
} from '@carbon/react/icons';

export type ReportTone = 'violet' | 'magenta' | 'teal' | 'blue';

export interface ReportDefinition {
  /** The MOH form number, e.g. `MOH 731` */
  code: string;
  /** Human readable name of the form */
  name: string;
  description: string;
  /** Route registered in root.component.tsx */
  path: string;
  icon: CarbonIconType;
  /** Extra terms matched by the search field */
  keywords: string[];
}

export interface ReportCategory {
  id: string;
  title: string;
  description: string;
  tone: ReportTone;
  reports: ReportDefinition[];
}

export const reportCategories: ReportCategory[] = [
  {
    id: 'hiv-and-chronic-care',
    title: 'HIV & chronic care',
    description: 'Comprehensive care programme summaries',
    tone: 'violet',
    reports: [
      {
        code: 'MOH 731',
        name: 'Comprehensive HIV/AIDS',
        description: 'NASCOP monthly summary for HIV testing, EMTCT, care and treatment.',
        path: '/moh-731',
        icon: HealthCross,
        keywords: ['hiv', 'nascop', 'art', 'prep', 'emtct', 'pmtct', 'tb'],
      },
      {
        code: 'MOH 740',
        name: 'Diabetes & hypertension',
        description: 'Monthly summary for the NCD comprehensive care clinic.',
        path: '/moh-740',
        icon: Activity,
        keywords: ['ncd', 'diabetes', 'hypertension', 'chronic'],
      },
    ],
  },
  {
    id: 'reproductive-and-child-health',
    title: 'Reproductive & child health',
    description: 'RMNCAH service delivery summaries',
    tone: 'magenta',
    reports: [
      {
        code: 'MOH 710',
        name: 'Immunization',
        description: 'Child immunization and vitamin A supplementation summary.',
        path: '/moh-710',
        icon: Growth,
        keywords: ['immunization', 'vaccine', 'child', 'khis', 'bcg', 'polio'],
      },
      {
        code: 'MOH 711',
        name: 'Integrated programme summary',
        description: 'Reproductive and child health, medical and rehabilitation services.',
        path: '/moh-711',
        icon: UserMultiple,
        keywords: ['rmncah', 'anc', 'pnc', 'maternity', 'family planning', 'gbv', 'physiotherapy'],
      },
      {
        code: 'MOH 745',
        name: 'Cancer screening',
        description: 'Monthly cervical and breast cancer screening summary.',
        path: '/moh-745',
        icon: GenderFemale,
        keywords: ['cancer', 'cervical', 'screening', 'via', 'hpv'],
      },
    ],
  },
  {
    id: 'outpatient-and-workload',
    title: 'Outpatient & workload',
    description: 'Morbidity and facility workload returns',
    tone: 'teal',
    reports: [
      {
        code: 'MOH 705A',
        name: 'Outpatient morbidity, under 5',
        description: 'Summary of diagnoses for children under five years.',
        path: '/moh-705a',
        icon: DocumentTasks,
        keywords: ['morbidity', 'outpatient', 'under five', 'children', 'khis'],
      },
      {
        code: 'MOH 705B',
        name: 'Outpatient morbidity, over 5',
        description: 'Summary of diagnoses for clients aged five years and above.',
        path: '/moh-705b',
        icon: Document,
        keywords: ['morbidity', 'outpatient', 'above five', 'adults', 'khis'],
      },
      {
        code: 'MOH 717',
        name: 'Service workload',
        description: 'Monthly service workload across facility departments.',
        path: '/moh-717',
        icon: ChartColumn,
        keywords: ['workload', 'inpatient', 'pharmacy', 'mortuary', 'theatre', 'maternity'],
      },
    ],
  },
  {
    id: 'diagnostics-and-surveillance',
    title: 'Diagnostics & surveillance',
    description: 'Laboratory and disease surveillance returns',
    tone: 'blue',
    reports: [
      {
        code: 'MOH 706',
        name: 'Laboratory services',
        description: 'Monthly summary of laboratory investigations and results.',
        path: '/moh-706',
        icon: Microscope,
        keywords: ['laboratory', 'lab', 'urine', 'parasitology', 'blood chemistry'],
      },
      {
        code: 'MOH 505',
        name: 'IDSR epidemic monitoring',
        description: 'Weekly monitoring form for priority notifiable diseases.',
        path: '/moh-505',
        icon: Warning,
        keywords: ['idsr', 'surveillance', 'epidemic', 'notifiable', 'outbreak'],
      },
    ],
  },
];

export const totalReportCount = reportCategories.reduce((count, category) => count + category.reports.length, 0);

export function filterCategories(categories: ReportCategory[], searchTerm: string): ReportCategory[] {
  const term = searchTerm.trim().toLowerCase();

  if (!term) {
    return categories;
  }

  return categories
    .map((category) => ({
      ...category,
      reports: category.reports.filter((report) =>
        [report.code, report.name, report.description, category.title, ...report.keywords]
          .join(' ')
          .toLowerCase()
          .includes(term),
      ),
    }))
    .filter((category) => category.reports.length > 0);
}
