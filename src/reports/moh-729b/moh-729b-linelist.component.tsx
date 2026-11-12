import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { type LinelistColumn, LinelistTable, useAllRows } from '../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../common/report-register';
import { useFacility } from '../../common/report-header';
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

/** HIV-exposed infants on ARV prophylaxis, at their latest HEI visit of the month in the count */
const INFANT_COLUMNS: LinelistColumn[] = [
  { header: 'Name', field: 'full_name' },
  { header: 'HEI Number', field: 'hei_number', text: true },
  { header: 'AMRS Number', field: 'amrs_number', text: true },
  { header: 'Sex', field: 'gender' },
  { header: 'Age', field: 'infant_age' },
  { header: 'Age Band', field: 'age_band' },
  { header: 'Visit Date', value: (row) => formatDate(row.encounter_date), sortValue: (row) => row.encounter_date },
  { header: 'Prophylaxis', field: 'regimen' },
  { header: 'Feeding', field: 'feeding' },
  { header: 'Regimen Code', field: 'regimen_code' },
  /* Available from the Columns menu */
  {
    header: 'Date of Birth',
    value: (row) => formatDate(row.birthdate),
    sortValue: (row) => row.birthdate,
    hidden: true,
  },
  { header: 'Location', field: 'location', hidden: true },
];

/** Clients on Cotrimoxazole or Dapsone, at their latest visit of the month on it */
const PROPHYLAXIS_COLUMNS: LinelistColumn[] = [
  { header: 'Name', field: 'full_name' },
  { header: 'CCC Number', field: 'ccc_number', text: true },
  { header: 'AMRS Number', field: 'amrs_number', text: true },
  { header: 'Sex', field: 'gender' },
  { header: 'Age', field: 'age' },
  { header: 'Visit Date', value: (row) => formatDate(row.encounter_date), sortValue: (row) => row.encounter_date },
  { header: 'Prophylaxis', field: 'regimen' },
  { header: 'Plan', field: 'prophylaxis_plan' },
  { header: 'Regimen Code', field: 'regimen_code' },
  /* Available from the Columns menu */
  { header: 'Location', field: 'location', hidden: true },
];

/** New Cryptococcal Meningitis clients, at their first CM visit of the month */
const CM_COLUMNS: LinelistColumn[] = [
  { header: 'Name', field: 'full_name' },
  { header: 'CCC Number', field: 'ccc_number', text: true },
  { header: 'AMRS Number', field: 'amrs_number', text: true },
  { header: 'Sex', field: 'gender' },
  { header: 'Age', field: 'age' },
  { header: 'Visit Date', value: (row) => formatDate(row.encounter_date), sortValue: (row) => row.encounter_date },
  { header: 'Current Treatment', field: 'current_treatment', wrap: true },
  { header: 'Treatment Phase', field: 'treatment_phase' },
  {
    header: 'Treatment Start Date',
    value: (row) => formatDate(row.treatment_start_date),
    sortValue: (row) => row.treatment_start_date,
  },
  { header: 'Treatment Plan', field: 'treatment_plan' },
  { header: 'ART Deferred for CM', field: 'art_deferred_for_crypto' },
  { header: 'Regimen Code', field: 'regimen_code' },
  /* Available from the Columns menu */
  { header: 'Location', field: 'location', hidden: true },
  { header: 'Encounter Type', field: 'encounter_type', hidden: true },
];

/** Each group's columns, its saved column layout and what its clients are */
const GROUPS = {
  art: { columns: ART_COLUMNS, layoutKey: 'moh-729b', title: 'Current active clients on ART' },
  prep: { columns: PREP_COLUMNS, layoutKey: 'moh-729b:prep', title: 'Current active clients on PrEP' },
  pep: { columns: PEP_COLUMNS, layoutKey: 'moh-729b:pep', title: 'Clients given PEP this month' },
  tpt: { columns: TPT_COLUMNS, layoutKey: 'moh-729b:tpt', title: 'HIV positive clients started on TPT this month' },
  hbv: { columns: HBV_COLUMNS, layoutKey: 'moh-729b:hbv', title: 'Hepatitis B patients who are HIV-ve' },
  prophylaxis: {
    columns: PROPHYLAXIS_COLUMNS,
    layoutKey: 'moh-729b:prophylaxis',
    title: 'Clients on universal prophylaxis',
  },
  infants: { columns: INFANT_COLUMNS, layoutKey: 'moh-729b:infants', title: 'HIV-exposed infants on prophylaxis' },
  cm: { columns: CM_COLUMNS, layoutKey: 'moh-729b:cm', title: 'New Cryptococcal Meningitis clients' },
};

/**
 * The clients behind a count on the MOH 729B form or its Summary: the month's
 * clients on ART, PrEP, PEP, Hep B, TPT, CM treatment or prophylaxis, and HIV-exposed infants (the same rows the form is counted
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
        : cell.code.startsWith('OI6')
          ? GROUPS.cm
          : /^OI[12][AC]$/.test(cell.code)
            ? GROUPS.prophylaxis
            : ['PC8', 'PC7', 'PC1X'].includes(cell.code)
              ? GROUPS.infants
              : PEP_CODES.has(cell.code)
                ? GROUPS.pep
                : GROUPS.art;

  /* the clients come from the whole facility (as the form's counts do), so it
     is named by its parent location, e.g. MTRH, with the clinics it includes;
     the location's own name until that loads */
  const facility = useFacility(locationUuids, useLocationName(locationUuids));
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
      location={facility.name}
      locationClinics={facility.clinics}
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
