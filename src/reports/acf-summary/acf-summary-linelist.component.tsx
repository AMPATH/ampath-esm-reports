import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { type LinelistColumn, LinelistTable, useAllRows } from '../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../common/report-register';
import { getPresumptiveTb } from '../../resources/presumptive-tb.resource';
import { ACF_INDICATORS, type AcfCase } from './acf-summary.counts';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

const COLUMNS: LinelistColumn[] = [
  { header: 'Name', field: 'full_name' },
  { header: 'CCC Number', field: 'department_number', text: true },
  { header: 'Date', value: (row) => formatDate(row.date), sortValue: (row) => row.date },
  { header: 'Sex', field: 'sex' },
  { header: 'Age', field: 'age' },
  { header: 'Referred By', field: 'referred_by' },
  { header: 'HIV Result', field: 'hiv_result' },
  { header: 'Chest X-ray', field: 'xray_result' },
  { header: 'Microscopy', field: 'microscopy_result' },
  { header: 'Culture', field: 'molecular_result', wrap: true },
  { header: 'Outcome', field: 'outcome' },
  { header: 'Started Anti-TB', field: 'started_tb_treatment' },
  { header: 'TB Treatment Start', field: 'tb_registration' },
  /* Available from the Columns menu */
  { header: 'National ID', field: 'national_id', text: true, hidden: true },
  { header: 'CR Number', field: 'cr_number', text: true, hidden: true },
  { header: 'Phone Number', field: 'phone_number', text: true, hidden: true },
  { header: 'Physical Address', field: 'physical_address', wrap: true, hidden: true },
];

/**
 * The cases behind a count on the ACF Facility Summary Tool: the Presumptive TB
 * Register's cases for the period (the same rows the form is counted from),
 * narrowed to the indicator's rule.
 */
const AcfSummaryLinelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const locationUuids = searchParams.get('locationUuids') ?? '';
  const number = Number(searchParams.get('indicator'));
  const indicator = ACF_INDICATORS[number];
  const heading = indicator ? `${number}. ${indicator.label} linelist` : 'ACF linelist';

  const locationName = useLocationName(locationUuids);
  /* the period's cases come back in one response; they are fetched once and
     handed to the table in the batches it reads */
  let cases: Promise<AcfCase[]> | undefined;
  const { rows, isLoading } = useAllRows(
    ({ startIndex, limit }) => {
      cases ??= getPresumptiveTb({ locationUuids, startDate, endDate }).then((all) =>
        (all as AcfCase[]).filter((row) => indicator?.counts(row)),
      );
      return cases.then((matching) => ({
        results: matching.slice(startIndex, startIndex + limit),
        total: matching.length,
        isTotalExact: true,
      }));
    },
    [searchParams.toString()],
  );

  return (
    <RegisterLayout
      parentLabel="ACF Facility Summary Tool"
      parentPath="/acf-summary"
      title="ACF Facility Summary · TB / Chest Clinic"
      heading={heading}
      location={locationName}
      isLoading={isLoading}
      isEmpty={rows.length === 0}
    >
      <LinelistTable rows={rows} columns={COLUMNS} layoutKey="acf-summary" exportName={`ACF ${heading} ${endDate}`} />
    </RegisterLayout>
  );
};

export default AcfSummaryLinelist;
