import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LinelistTable, type LinelistColumn, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { getMoh406PatientList } from '../../../resources/moh-711.resource';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

const PNC_LINELIST_COLUMNS: LinelistColumn[] = [
  {
    header: 'Date of Visit',
    value: (row) => formatDate(row.date_of_visit),
    sortValue: (row) => row.date_of_visit,
  },
  { header: 'CR Number', field: 'cr_id', text: true },
  { header: 'Full Name', field: 'full_names' },
  {
    header: 'Date of Birth',
    value: (row) => formatDate(row.date_of_birth),
    sortValue: (row) => row.date_of_birth,
  },
  { header: 'Age (Years)', field: 'age' },
  { header: 'Weight', field: 'weight' },
  { header: 'Height', field: 'height' },
  { header: 'Systolic Blood Pressure', field: 'bp_systolic' },
  { header: 'Diastolic Blood Pressure', field: 'bp_diastolic' },
  { header: 'Client Type', field: 'client_type' },
  { header: 'Modern Postpartum Family Planning Counselling', field: 'counselled' },
  { header: 'Family Planning Method Received', field: 'ppfp_method' },
  { header: 'Postpartum Visit – Mother', field: 'timing_mother' },
  { header: 'Postpartum Visit – Baby', field: 'timing_baby' },
  { header: 'Fistula Type', field: 'fistula' },
  { header: 'Referred From', field: 'referral_from' },
];

const Moh711PncLinelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator') ?? '';
  const from = searchParams.get('from');
  const locationName = useLocationName(locationUuids);

  const fetchPatientList = useCallback(
    ({ startIndex, limit }: { startIndex: number; limit: number }) =>
      getMoh406PatientList({
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
      title="MOH-711 PNC Linelist"
      location={locationName}
      isLoading={isLoading}
      isEmpty={!isLoading && rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={PNC_LINELIST_COLUMNS}
        layoutKey={`moh-711-pnc:${indicator}`}
        exportName={`MOH-711 PNC ${indicator} ${startDate ?? ''} ${endDate ?? ''}`}
      />
    </RegisterLayout>
  );
};

export default Moh711PncLinelist;
