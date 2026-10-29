import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { type LinelistColumn, LinelistTable, useAllRows } from '../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../common/report-register';
import { getMoh729b } from '../../resources/moh-729b.resource';
import { decodeCell, describeCell, inCells, PEP_CODES, type Moh729bCell, type Moh729bRow } from './moh-729b.types';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

/** Clients on ART */
const ART_COLUMNS: LinelistColumn[] = [
  { header: 'Name', field: 'full_name' },
  { header: 'CCC Number', field: 'ccc_number', text: true },
  { header: 'AMRS Number', field: 'amrs_number', text: true },
  { header: 'Sex', field: 'gender' },
  { header: 'Age', field: 'age' },
  { header: 'Weight (kg)', field: 'weight' },
  { header: 'Regimen', field: 'regimen', wrap: true },
  { header: 'Regimen Code', field: 'regimen_code' },
  { header: 'ARV Line', field: 'arv_line' },
  { header: 'RTC Date', value: (row) => formatDate(row.rtc_date), sortValue: (row) => row.rtc_date },
  /* Available from the Columns menu */
  { header: 'Pregnant', field: 'pregnant', hidden: true },
  { header: 'Weight Band', field: 'weight_band', hidden: true },
  { header: 'ARV Concepts', field: 'cur_arv_meds', text: true, hidden: true },
  {
    header: 'Date of Birth',
    value: (row) => formatDate(row.birthdate),
    sortValue: (row) => row.birthdate,
    hidden: true,
  },
];

/** Clients on PrEP */
const PREP_COLUMNS: LinelistColumn[] = [
  { header: 'Name', field: 'full_name' },
  { header: 'PrEP Number', field: 'prep_number', text: true },
  { header: 'AMRS Number', field: 'amrs_number', text: true },
  { header: 'Sex', field: 'gender' },
  { header: 'Age', field: 'age' },
  { header: 'PrEP Regimen', field: 'regimen', wrap: true },
  { header: 'Regimen Code', field: 'regimen_code' },
  { header: 'PrEP Status', field: 'prep_status' },
  {
    header: 'Last Visit',
    value: (row) => formatDate(row.last_visit_date),
    sortValue: (row) => row.last_visit_date,
  },
  /* Available from the Columns menu */
  {
    header: 'Date of Birth',
    value: (row) => formatDate(row.birthdate),
    sortValue: (row) => row.birthdate,
    hidden: true,
  },
];

/** Clients given PEP */
const PEP_COLUMNS: LinelistColumn[] = [
  { header: 'Name', field: 'full_name' },
  { header: 'CCC Number', field: 'ccc_number', text: true },
  { header: 'AMRS Number', field: 'amrs_number', text: true },
  { header: 'Sex', field: 'gender' },
  { header: 'Age', field: 'age' },
  {
    header: 'Exposure Date',
    value: (row) => formatDate(row.exposure_date),
    sortValue: (row) => row.exposure_date,
  },
  { header: 'Exposure Type', field: 'exposure_type', wrap: true },
  { header: 'PEP Regimen', field: 'regimen', wrap: true },
  { header: 'Regimen Code', field: 'regimen_code' },
  /* Available from the Columns menu */
  { header: 'ARV Concepts', field: 'cur_arv_meds', text: true, hidden: true },
];

/** Hepatitis B patients who are HIV-ve */
const HBV_COLUMNS: LinelistColumn[] = [
  { header: 'Name', field: 'full_name' },
  { header: 'AMRS Number', field: 'amrs_number', text: true },
  { header: 'Sex', field: 'gender' },
  { header: 'Age', field: 'age' },
  { header: 'ANC Visit', value: (row) => formatDate(row.anc_date), sortValue: (row) => row.anc_date },
  { header: 'HIV Result', field: 'hiv_result' },
  { header: 'HBV Result', field: 'hbv_result' },
  {
    header: 'HBV Test Date',
    value: (row) => formatDate(row.hbv_test_date),
    sortValue: (row) => row.hbv_test_date,
  },
  { header: 'Hep B Regimen', field: 'regimen' },
  { header: 'Regimen Code', field: 'regimen_code' },
];

/** Clients on ART who started TPT */
const TPT_COLUMNS: LinelistColumn[] = [
  { header: 'Name', field: 'full_name' },
  { header: 'CCC Number', field: 'ccc_number', text: true },
  { header: 'AMRS Number', field: 'amrs_number', text: true },
  { header: 'Sex', field: 'gender' },
  { header: 'Age', field: 'age' },
  {
    header: 'ART Start Date',
    value: (row) => formatDate(row.arv_first_regimen_start_date),
    sortValue: (row) => row.arv_first_regimen_start_date,
  },
  {
    header: 'TB Screening Date',
    value: (row) => formatDate(row.tb_screening_date),
    sortValue: (row) => row.tb_screening_date,
  },
  { header: 'TB Screening Result', field: 'tb_screening_result' },
  {
    header: 'TPT Start Date',
    value: (row) => formatDate(row.ipt_start_date),
    sortValue: (row) => row.ipt_start_date,
  },
  { header: 'TPT Regimen', field: 'regimen' },
  { header: 'Regimen Code', field: 'regimen_code' },
];

/** Each group's columns, its saved column layout and what its clients are */
const GROUPS = {
  art: { columns: ART_COLUMNS, layoutKey: 'moh-729b', title: 'Current active clients on ART' },
  prep: { columns: PREP_COLUMNS, layoutKey: 'moh-729b:prep', title: 'Current active clients on PrEP' },
  pep: { columns: PEP_COLUMNS, layoutKey: 'moh-729b:pep', title: 'Clients given PEP this month' },
  tpt: { columns: TPT_COLUMNS, layoutKey: 'moh-729b:tpt', title: 'HIV positive clients started on TPT this month' },
  hbv: { columns: HBV_COLUMNS, layoutKey: 'moh-729b:hbv', title: 'Hepatitis B patients who are HIV-ve' },
};

/**
 * The clients behind a count on the MOH 729B form or its Summary: the month's
 * clients on ART, PrEP, PEP, Hep B or TPT (the same rows the form is counted
 * from), narrowed to the count's regimen code and, where the form splits it,
 * weight band or line. A total of several counts (`f`, one per count, with a
 * `label`) lists the clients of all of them; its counts never overlap.
 */
const Moh729bLinelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const endDate = searchParams.get('endDate') ?? '';
  const locationUuids = searchParams.get('locationUuids') ?? '';
  const figures = searchParams.getAll('f');
  const cells: Moh729bCell[] = figures.length
    ? figures.map(decodeCell)
    : [
        {
          code: searchParams.get('code') ?? '',
          band: searchParams.get('band') ?? undefined,
          line: Number(searchParams.get('line')) || undefined,
        },
      ];
  const label = searchParams.get('label');
  const heading = `${label ?? describeCell(cells[0])} linelist`;
  /* the counts of a total are all of one kind, so the first decides the columns */
  const cell = cells[0];
  const group = cell.code.startsWith('PRP')
    ? GROUPS.prep
    : cell.code.startsWith('HPB')
      ? GROUPS.hbv
      : /^[AC]TPT1[AB]$/.test(cell.code)
        ? GROUPS.tpt
        : PEP_CODES.has(cell.code)
          ? GROUPS.pep
          : GROUPS.art;

  const locationName = useLocationName(locationUuids);
  /* the month's clients come back in one response; they are fetched once and
     handed to the table in the batches it reads */
  let clients: Promise<Moh729bRow[]> | undefined;
  const { rows, isLoading } = useAllRows(
    ({ startIndex, limit }) => {
      clients ??= getMoh729b({ locationUuids, endDate }).then((all) =>
        (all as unknown as Moh729bRow[]).filter((row) => inCells(row, cells)),
      );
      return clients.then((matching) => ({
        results: matching.slice(startIndex, startIndex + limit),
        total: matching.length,
        isTotalExact: true,
      }));
    },
    [searchParams.toString()],
  );

  return (
    <RegisterLayout
      parentLabel="MOH 729B F-MAPS Report"
      parentPath="/moh-729b"
      title={`MOH 729B F-MAPS · ${group.title}`}
      heading={heading}
      location={locationName}
      isLoading={isLoading}
      isEmpty={rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={group.columns}
        layoutKey={group.layoutKey}
        exportName={`MOH 729B ${heading} ${endDate}`}
      />
    </RegisterLayout>
  );
};

export default Moh729bLinelist;
