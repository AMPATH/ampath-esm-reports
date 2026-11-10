import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LinelistTable, type LinelistColumn, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { getMoh407PatientList } from '../../../resources/moh-711.resource';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

const MOH_733_LINELIST_COLUMNS: LinelistColumn[] = [
  {
    header: 'Date of Visit',
    value: (row) => formatDate(row.date_of_visit ?? row.date),
    sortValue: (row) => row.date_of_visit ?? row.date,
  },
  { header: 'CR Number', value: (row) => row.cr_id ?? row.national_identification_number ?? '', text: true },
  { header: 'Full Name', value: (row) => row.full_names ?? row.patient_names ?? '' },
  {
    header: 'Date of Birth',
    value: (row) => formatDate(row.date_of_birth),
    sortValue: (row) => row.date_of_birth,
  },
  { header: 'Age (Months)', field: 'age_in_months' },
  { header: 'Sex (Male/Female)', field: 'sex' },
  { header: 'Weight (kg)', field: 'weight' },
  { header: 'Height (cm)', field: 'height' },
  { header: 'Visit Type (New/Revisit)', value: (row) => row.visit_type ?? row.patient_visit ?? '' },
  { header: 'Age (Years)', field: 'age' },
  { header: 'Nutrition Assessment Score', value: (row) => row.nutrition_assessment_score ?? row.z_score ?? '' },
  { header: 'Nutrition Status', field: 'nutrition_status' },
];

const Moh733Linelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator') ?? '';
  const locationName = useLocationName(locationUuids);

  const fetchPatientList = useCallback(
    ({ startIndex, limit }: { startIndex: number; limit: number }) =>
      getMoh407PatientList({
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
        locationUuids: locationUuids ?? '',
        indicator,
        reportName: 'moh733Report',
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicator],
  );
  const { rows, isLoading } = useAllRows(fetchPatientList, [startDate, endDate, locationUuids, indicator]);

  return (
    <RegisterLayout
      parentLabel="MOH-733 Report"
      parentPath="/moh-733"
      title="MOH-733 Linelist"
      location={locationName}
      isLoading={isLoading}
      isEmpty={!isLoading && rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={MOH_733_LINELIST_COLUMNS}
        layoutKey={`moh-733:${indicator}`}
        exportName={`MOH-733 ${indicator} ${startDate ?? ''} ${endDate ?? ''}`}
      />
    </RegisterLayout>
  );
};

export default Moh733Linelist;
