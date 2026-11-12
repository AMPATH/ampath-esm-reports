import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LinelistTable, type LinelistColumn, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { getMoh405PatientList } from '../../../resources/moh-711.resource';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

const ANC_LINELIST_COLUMNS: LinelistColumn[] = [
  { header: 'Date of Visit', value: (row) => formatDate(row.date_of_visit), sortValue: (row) => row.date_of_visit },
  { header: 'CR Number', field: 'cr_id', text: true },
  { header: 'Full Name', field: 'full_names' },
  { header: 'Date of Birth', value: (row) => formatDate(row.date_of_birth), sortValue: (row) => row.date_of_birth },
  { header: 'Age (Years)', field: 'age' },
  { header: 'Number of ANC Visits', field: 'number_of_anc_visits' },
  { header: 'Weight', field: 'weight' },
  { header: 'Height', field: 'height' },
  { header: 'Systolic Blood Pressure', field: 'bp_systolic' },
  { header: 'Diastolic Blood Pressure', field: 'bp_diastolic' },
  { header: 'Type of Visit', field: 'visit_type' },
  { header: 'Gestational Age (Weeks)', field: 'maturity_in_weeks' },
  { header: 'Haemoglobin Level', field: 'hb' },
  { header: 'Syphilis Screening Method', field: 'rpr_vdrl_duo' },
  { header: 'Syphilis Screening Result', field: 'rpr_vdrl_duo_results' },
  { header: 'HIV Results', field: 'hiv_results' },
  { header: 'Date HIV tested', field: 'date_of_hiv_test' },
  { header: 'Breast Examination', field: 'breast_exam_finding' },
  { header: 'FGM Screening', field: 'fgm' },
  { header: 'IPT Dose', field: 'ipt_dose' },
  { header: 'Supplementation', field: 'supplementation' },
  { header: 'LLITN Given', field: 'llitns' },
  { header: 'Provider Name', field: 'provider' },
  { header: 'TCA / RTC Date', value: (row) => formatDate(row.rtc), sortValue: (row) => row.rtc },
];

const Moh711AncLinelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator') ?? '';
  const from = searchParams.get('from');
  const locationName = useLocationName(locationUuids);

  const fetchPatientList = useCallback(
    ({ startIndex, limit }: { startIndex: number; limit: number }) =>
      getMoh405PatientList({
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
        locationUuids: locationUuids ?? '',
        indicator,
        reportName: 'moh711Report',
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicator, from],
  );
  const { rows, isLoading } = useAllRows(fetchPatientList, [startDate, endDate, locationUuids, indicator, from]);
  return (
    <RegisterLayout
      parentLabel="MOH-711 Report"
      parentPath="/moh-711"
      title="MOH-711 ANC Linelist"
      location={locationName}
      isLoading={isLoading}
      isEmpty={!isLoading && rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={ANC_LINELIST_COLUMNS}
        layoutKey={`moh-711-anc:${indicator}`}
        exportName={`MOH-711 ANC ${indicator} ${startDate ?? ''} ${endDate ?? ''}`}
      />
    </RegisterLayout>
  );
};

export default Moh711AncLinelist;
