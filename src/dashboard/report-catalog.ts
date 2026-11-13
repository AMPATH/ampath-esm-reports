import {
  Activity,
  ChartColumn,
  Document,
  DocumentTasks,
  GenderFemale,
  Growth,
  HealthCross,
  Medication,
  Microscope,
  Stethoscope,
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
  /** A short name, shown in the landing page's table in place of the title */
  label?: string;
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
        code: 'MOH 729B',
        name: 'Facility ARV patient summary (F-MAPS)',
        description: 'Monthly count of current active patients on each ARV and OI regimen.',
        path: '/moh-729b',
        icon: Medication,
        keywords: ['fmaps', 'f-maps', 'arv', 'regimen', 'art', 'pmtct', 'pep', 'prep', 'tpt', 'pharmacy'],
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
      {
        code: 'MOH 733',
        name: 'Nutrition',
        description: 'Nutrition summary.',
        path: '/moh-733',
        icon: Growth,
        keywords: ['nutrition'],
      },
      {
        code: 'MOH 713',
        name: 'IMAM',
        description: 'Acute Malnutrition Summary.',
        path: '/moh-713',
        icon: Growth,
        keywords: ['nutrition'],
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
        code: 'MOH 645',
        name: 'Malaria commodities',
        description: 'Monthly summary of AL and artesunate dispensed, and malaria diagnostics.',
        path: '/moh-645',
        icon: HealthCross,
        keywords: ['malaria', 'al', 'artemether', 'artesunate', 'rdt', 'commodities', 'act'],
      },
      {
        code: 'MOH 643',
        name: 'Laboratory commodities',
        description: 'Monthly FCDRR of laboratory reagents: tests done and quantity used.',
        path: '/moh-643',
        icon: Microscope,
        keywords: ['laboratory', 'lab', 'commodities', 'fcdrr', 'hiv', 'cd4', 'viral load', 'reagents'],
      },
      {
        code: 'MOH 505',
        name: 'IDSR epidemic monitoring',
        description: 'Weekly monitoring form for priority notifiable diseases.',
        path: '/moh-505',
        icon: Warning,
        keywords: ['idsr', 'surveillance', 'epidemic', 'notifiable', 'outbreak'],
      },
      {
        code: 'MOH/F/DNTLDP/02',
        name: 'TB active case finding summary',
        description: 'Monthly facility summary of TB screening, investigation, diagnosis and treatment by department.',
        path: '/acf-summary',
        icon: Stethoscope,
        keywords: ['tb', 'tuberculosis', 'acf', 'active case finding', 'screening', 'presumptive', 'dntldp'],
      },
    ],
  },
  {
    id: 'inpatient-mobidity-mortality',
    title: 'Inpatient Morbidity and Mortality',
    description: 'Inpatient Morbidity and Mortality',
    tone: 'violet',
    reports: [
      {
        code: 'MOH 718',
        name: 'Inpatient Morbidity and Mortality',
        description: 'Inpatient Morbidity and Mortality',
        path: '/moh-718',
        icon: HealthCross,
        keywords: ['inpatient', 'morbidity', 'mortality'],
      },
    ],
  },
];

/**
 * The Reports tab's groups, each with its own categories. The Ministry of
 * Health summary forms above make up the first; program and quality improvement
 * reports go in theirs as they are built.
 */
export interface ReportGroup {
  /** Kept in the URL as `?group=`; the first group is the default */
  id: string;
  title: string;
  /** The title on a phone, where the three do not fit in full */
  shortTitle: string;
  /** Shown as the group link's tooltip */
  description: string;
  categories: ReportCategory[];
}

export const reportGroups: ReportGroup[] = [
  {
    id: 'moh',
    title: 'MOH reports',
    shortTitle: 'MOH',
    description: 'Ministry of Health summary forms',
    categories: reportCategories,
  },
  {
    id: 'program',
    title: 'Program reports',
    shortTitle: 'Program',
    description: 'Monitoring of care programs',
    /* the program reports' sections; each opens on the shared program report
       page (src/reports/program) until its own template is built */
    categories: [
      {
        id: 'prevention',
        title: 'Prevention',
        description: 'HIV prevention programs',
        tone: 'teal',
        reports: [
          {
            code: 'PrEP',
            name: 'PrEP',
            description: 'Clients on pre-exposure prophylaxis.',
            path: '/program/prep',
            icon: HealthCross,
            keywords: ['prep', 'prevention', 'pre-exposure', 'prophylaxis'],
          },
        ],
      },
      {
        id: 'hiv',
        title: 'HIV',
        description: 'HIV care and treatment programs',
        tone: 'violet',
        reports: [
          {
            code: 'C&T',
            name: 'Care & Treatment and ARV Management',
            description:
              'Monthly summary of starting ART (TX_NEW), current on ART (TX_CURR), months of ARVs dispensed, viral load (TX_PVLS), TX-ML (TIs, RTT, TOs, deaths, declined, IITs) and AHD.',
            path: '/program/care-and-treatment',
            icon: Medication,
            keywords: [
              'art',
              'arv',
              'tx_new',
              'tx-new',
              'new on art',
              'tx_curr',
              'tx-curr',
              'current on art',
              'mmd',
              'tx_pvls',
              'viral load',
              'tx_ml',
              'tx-ml',
              'iit',
              'rtt',
              'transfer',
              'death',
              'declined',
              'ahd',
              'advanced hiv disease',
              'cd4',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'quality-improvement',
    title: 'Quality Improvement Reports',
    shortTitle: 'Quality improvement',
    description: 'Clients due for follow-up or action',
    categories: [
      {
        id: 'gap-reviews',
        title: 'Gap reviews',
        description: 'Clients due for follow-up or action',
        tone: 'teal',
        reports: [
          {
            code: 'QI',
            name: 'Quality Improvement Report',
            description:
              'Clients needing action this month, with counts that open their lists: linkage, PrEP for PBFs, PNS/SNS contacts, viral load testing and suppression, EAC, recent defaulters, OTZ and HEI follow-up.',
            path: '/quality-improvement/report',
            icon: DocumentTasks,
            keywords: [
              'quality improvement',
              'qi',
              'action',
              'linkage',
              'prep',
              'pbf',
              'pns',
              'sns',
              'contacts',
              'viral load',
              'vl',
              'eac',
              'defaulters',
              'otz',
              'hei',
              'pcr',
              'outcome',
            ],
          },
          {
            code: 'CS',
            name: 'Case Surveillance Report',
            description: 'Realtime gap review and progress tracking of the case surveillance indicators.',
            path: '/quality-improvement/case-surveillance',
            icon: ChartColumn,
            keywords: ['case surveillance', 'gap review', 'progress tracker', 'linkage', 'prep', 'hei', 'viral load'],
          },
        ],
      },
    ],
  },
];

export const countReports = (categories: ReportCategory[]) =>
  categories.reduce((count, category) => count + category.reports.length, 0);

export const totalReportCount = reportGroups.reduce((count, group) => count + countReports(group.categories), 0);

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

const reportsOf = (groupId: string): ReportDefinition[] =>
  (reportGroups.find((group) => group.id === groupId)?.categories ?? []).flatMap((category) => category.reports);

/** Every program report, each routed to the shared report template page */
export const programReports = reportsOf('program');

/** Every quality improvement report */
export const qualityImprovementReports = reportsOf('quality-improvement');
