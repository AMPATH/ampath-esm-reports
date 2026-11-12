import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { type LinelistColumn, LinelistTable, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { useFacility } from '../../../common/report-header';
import { getCareAndTreatmentPatientList } from '../../../resources/care-and-treatment.resource';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

const date = (header: string, field: string, hidden?: boolean): LinelistColumn => ({
  header,
  value: (row) => formatDate(row[field]),
  sortValue: (row) => row[field],
  hidden,
});

/** Every column a linelist can show; each section shows its own and keeps the rest in the Columns menu */
const columnsFor = (shown: string[]): LinelistColumn[] =>
  [
    { header: 'Name', field: 'full_name' },
    { header: 'CCC Number', field: 'ccc_number', text: true },
    { header: 'AMRS Number', field: 'amrs_number', text: true },
    /* filled with the CR number, as on the MOH 731 linelists */
    { header: 'NUPI', field: 'nupi', text: true },
    { header: 'Sex', field: 'gender' },
    { header: 'Age', field: 'age' },
    { header: 'Clinic', field: 'location' },
    date('ART Start Date', 'art_start_date'),
    { header: 'Regimen', field: 'cur_arv_meds', wrap: true },
    { header: 'ARV Line', field: 'cur_arv_line' },
    date('Last Visit', 'last_visit_date'),
    date('RTC Date', 'rtc_date'),
    date('Refill Date', 'refill_date'),
    { header: 'Months Dispensed', field: 'months_dispensed' },
    { header: 'WHO Stage', field: 'who_stage' },
    { header: 'Baseline CD4', field: 'cd4' },
    date('CD4 Date', 'cd4_date'),
    { header: 'CD4 %', field: 'cd4_percent' },
    { header: 'Stability', field: 'stability' },
    { header: 'Pregnant', field: 'pregnant' },
    { header: 'Breastfeeding', field: 'breastfeeding' },
    { header: 'On TB Treatment', field: 'on_tb_treatment' },
    { header: 'Started TPT', field: 'started_tpt' },
    { header: 'Viral Load', field: 'vl_1' },
    date('VL Date', 'vl_1_date'),
  ].map((column) => ({ ...column, hidden: !shown.includes(column.header) }));

const COMMON = ['Name', 'CCC Number', 'AMRS Number', 'NUPI', 'Sex', 'Age', 'Clinic'];

/** Each section's columns, its saved layout and what its clients are, by the figure's prefix */
const SECTIONS = [
  {
    prefix: 'tx_new',
    layoutKey: 'care-and-treatment:tx-new',
    title: 'Starting on ART',
    columns: columnsFor([
      ...COMMON,
      'ART Start Date',
      'Regimen',
      'WHO Stage',
      'Baseline CD4',
      'CD4 %',
      'Pregnant',
      'Breastfeeding',
      'On TB Treatment',
      'Started TPT',
    ]),
  },
  {
    prefix: 'mmd',
    layoutKey: 'care-and-treatment:mmd',
    title: 'Months of ARVs dispensed',
    columns: columnsFor([...COMMON, 'Regimen', 'Last Visit', 'Refill Date', 'RTC Date', 'Months Dispensed']),
  },
  {
    prefix: 'vl',
    layoutKey: 'care-and-treatment:tx-pvls',
    title: 'TX_PVLS',
    columns: columnsFor([...COMMON, 'ART Start Date', 'Regimen', 'ARV Line', 'Viral Load', 'VL Date']),
  },
  {
    prefix: 'tx_curr',
    layoutKey: 'care-and-treatment:tx-curr',
    title: 'Current on ART',
    columns: columnsFor([...COMMON, 'ART Start Date', 'Regimen', 'Last Visit', 'RTC Date', 'WHO Stage', 'Stability']),
  },
];

/**
 * The clients behind a figure of the Care & Treatment and ARV Management
 * report: its figures (`i`, several for a total), narrowed to an age band, sex
 * and MCH/PMTCT where the cell is. A total's figures never overlap, so their
 * clients are listed one figure after another.
 */
const CareAndTreatmentLinelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const endDate = searchParams.get('endDate') ?? '';
  const locationUuids = searchParams.get('locationUuids') ?? '';
  const indicators = searchParams.getAll('i');
  const ageBand = searchParams.get('ageBand') ?? 'all';
  const gender = searchParams.get('gender') ?? 'all';
  const mch = searchParams.get('mch') ?? 'all';
  const heading = `${searchParams.get('label') ?? 'Clients'} linelist`;
  const section = SECTIONS.find((candidate) => indicators[0]?.startsWith(candidate.prefix)) ?? SECTIONS[3];

  /* the clients come from the whole facility, so it is named by its parent location, with its clinics */
  const facility = useFacility(locationUuids, useLocationName(locationUuids));
  const { rows, isLoading } = useAllRows(
    indicators.map(
      (indicator) =>
        ({ startIndex, limit }) =>
          getCareAndTreatmentPatientList({
            locationUuids,
            endDate,
            indicator,
            ageBand,
            gender,
            mch,
            startIndex,
            limit,
          }),
    ),
    [searchParams.toString()],
  );

  return (
    <RegisterLayout
      parentLabel="Care & Treatment and ARV Management"
      parentPath="/program/care-and-treatment"
      title={`Care & Treatment · ${section.title}`}
      heading={heading}
      location={facility.name}
      locationClinics={facility.clinics}
      isLoading={isLoading}
      isEmpty={rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={section.columns}
        layoutKey={section.layoutKey}
        exportName={`Care and Treatment ${heading} ${endDate}`}
      />
    </RegisterLayout>
  );
};

export default CareAndTreatmentLinelist;
