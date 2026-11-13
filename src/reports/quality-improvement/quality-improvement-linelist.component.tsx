import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { type LinelistColumn, LinelistTable, useAllRows } from '../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../common/report-register';
import { useFacility } from '../../common/report-header';
import { getQualityImprovementPatientList } from '../../resources/quality-improvement.resource';
import { QUALITY_IMPROVEMENT_PATH } from './quality-improvement.config';
import { CASE_SURVEILLANCE_PATH } from './case-surveillance.config';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

const date = (header: string, field: string): LinelistColumn => ({
  header,
  value: (row) => formatDate(row[field]),
  sortValue: (row) => row[field],
});

const COMMON: LinelistColumn[] = [
  { header: 'Name', field: 'full_name' },
  { header: 'CCC Number', field: 'ccc_number', text: true },
  { header: 'AMRS Number', field: 'amrs_number', text: true },
  { header: 'Sex', field: 'gender' },
  { header: 'Age', field: 'age' },
  { header: 'Clinic', field: 'location' },
];

const VIRAL_LOAD = [{ header: 'Last Viral Load', field: 'last_vl' }, date('Last VL Date', 'last_vl_date')];

const HEI = [
  { header: 'Name', field: 'full_name' },
  { header: 'HEI Number', field: 'hei_number', text: true },
  { header: 'AMRS Number', field: 'amrs_number', text: true },
  { header: 'Sex', field: 'gender' },
  date('Birth Date', 'birth_date'),
  { header: 'Clinic', field: 'location' },
  date('Last Visit', 'last_visit_date'),
];

/** Each indicator's columns: who the clients are, and what needs doing */
const COLUMNS: Record<string, LinelistColumn[]> = {
  'hiv-positive-not-linked': [...COMMON, date('HIV Test Date', 'test_date')],
  'high-risk-pbf-not-on-prep': [
    ...COMMON,
    { header: 'PrEP Number', field: 'prep_number', text: true },
    date('Screening Date', 'screening_date'),
  ],
  'pns-undocumented-status': [
    { header: 'Index Client', field: 'full_name' },
    { header: 'CCC Number', field: 'ccc_number', text: true },
    { header: 'Clinic', field: 'location' },
    { header: 'Contact', field: 'contact_name' },
    { header: 'Relationship', field: 'relationship' },
    { header: 'Contact Age', field: 'contact_age' },
    { header: 'Contact Sex', field: 'contact_sex' },
    { header: 'Contact Phone', field: 'contact_phone', text: true },
    date('Date Elicited', 'date_elicited'),
  ],
  'missed-vl-testing': [...COMMON, date('Last Visit', 'last_visit_date'), ...VIRAL_LOAD],
  'viral-load-200-plus': [...COMMON, ...VIRAL_LOAD],
  'viral-load-1000-plus': [...COMMON, ...VIRAL_LOAD],
  'delayed-eac': [...COMMON, ...VIRAL_LOAD, { header: 'Days Since VL', field: 'days_since_vl' }],
  'recent-defaulters': [
    ...COMMON,
    date('Last Visit', 'last_visit_date'),
    date('Missed Appointment', 'rtc_date'),
    { header: 'Days Missed', field: 'days_missed' },
  ],
  'adolescent-not-in-otz': [...COMMON, date('Last Visit', 'last_visit_date')],
  'hei-without-dna-pcr': HEI,
  'hei-not-linked-to-mother': HEI,
  'hei-without-outcome': HEI,
  /* the Case Surveillance cards' other figures */
  'cs-new-positives': [...COMMON, date('HIV Test Date', 'test_date')],
  'cs-high-risk-pbfw': [
    ...COMMON,
    { header: 'PrEP Number', field: 'prep_number', text: true },
    date('Screening Date', 'screening_date'),
  ],
  'cs-unsuppressed': [...COMMON, ...VIRAL_LOAD, { header: 'Days Since VL', field: 'days_since_vl' }],
  'cs-visited-due-for-vl': [...COMMON, date('Last Visit', 'last_visit_date'), ...VIRAL_LOAD],
  'cs-hei-6-8-weeks': HEI,
  'cs-hei-24-months': HEI,
  'cs-hei-24-months-without-outcome': HEI,
};

/* the report a list was opened from, which its breadcrumb leads back to */
const PARENTS = {
  'case-surveillance': { label: 'Case Surveillance Report', path: CASE_SURVEILLANCE_PATH, title: 'Case Surveillance' },
  'quality-improvement': {
    label: 'Quality Improvement Report',
    path: QUALITY_IMPROVEMENT_PATH,
    title: 'Quality Improvement',
  },
};

/** The clients of one Quality Improvement or Case Surveillance figure (`i`) for the period */
const QualityImprovementLinelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const locationUuids = searchParams.get('locationUuids') ?? '';
  const indicator = searchParams.get('i') ?? '';
  const heading = `${searchParams.get('label') ?? 'Clients'} linelist`;
  const parent =
    searchParams.get('from') === 'case-surveillance' ? PARENTS['case-surveillance'] : PARENTS['quality-improvement'];

  /* the clients come from the whole facility, so it is named by its parent location, with its clinics */
  const facility = useFacility(locationUuids, useLocationName(locationUuids));
  const { rows, isLoading } = useAllRows(
    ({ startIndex, limit }) =>
      getQualityImprovementPatientList({ locationUuids, startDate, endDate, indicator, startIndex, limit }),
    [searchParams.toString()],
  );

  return (
    <RegisterLayout
      parentLabel={parent.label}
      parentPath={parent.path}
      title={parent.title}
      heading={heading}
      location={facility.name}
      locationClinics={facility.clinics}
      isLoading={isLoading}
      isEmpty={rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={COLUMNS[indicator] ?? COMMON}
        layoutKey={`quality-improvement:${indicator}`}
        exportName={`${parent.title} ${heading} ${endDate}`}
      />
    </RegisterLayout>
  );
};

export default QualityImprovementLinelist;
