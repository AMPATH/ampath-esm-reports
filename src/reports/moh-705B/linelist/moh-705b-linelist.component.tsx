import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { type LinelistColumn, LinelistTable, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { getMoh705bPatientList } from '../../../resources/moh-705.resource';

const MOH_705B_LINELIST_COLUMNS: LinelistColumn[] = [
  { header: 'Date', field: 'date' },
  { header: 'OPD No. (New)', field: 'opd_number_new_visit' },
  { header: 'OPD No. (Revisit)', field: 'opd_number_return_visit' },
  { header: 'Referred From', field: 'referred_from' },
  { header: 'Full Names', field: 'full_names' },
  { header: 'Age', field: 'age' },
  { header: 'Sex', field: 'sex' },
  { header: 'County/Sub-county', field: 'county_sub_county' },
  { header: 'Village / Estate / Landmark', field: 'village_estate_landmark' },
  { header: "Patient/Parent/Caregiver's Telephone No.", field: 'phone_number' },
  { header: 'Weight', field: 'weight' },
  { header: 'Height', field: 'height' },
  { header: 'BMI (Kg/m2)', field: 'bmi' },
  { header: 'Temp (oC)', field: 'temp' },
  { header: 'BP', field: 'systolic' },
  { header: 'Visual Aquity', field: 'visual_aquity_re' },
  { header: 'TB Screening', field: 'tb_screening' },
  { header: 'Malaria', field: 'malaria' },
  { header: 'Diagnosis', field: 'diagnosis' },
  { header: 'Treatment / Prescription', field: 'treatment_prescription' },
  { header: 'Referred To', field: 'referred_to' },
  { header: 'Remarks / Outcome', field: 'remarks' },
];

const Moh705BLinelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const locationUuids = searchParams.get('locationUuids') ?? '';
  const indicator = searchParams.get('indicator') ?? '';
  const from = searchParams.get('from') || undefined;
  const locationName = useLocationName(locationUuids);

  const fetchPatientList = useCallback(
    ({ startIndex, limit }: { startIndex: number; limit: number }) =>
      getMoh705bPatientList({
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        locationUuids,
        indicator,
        reportName: 'moh705bReport',
        startIndex,
        limit,
        from,
      }),
    [startDate, endDate, locationUuids, indicator, from],
  );

  const { rows, isLoading } = useAllRows(fetchPatientList, [startDate, endDate, locationUuids, indicator, from]);

  return (
    <RegisterLayout
      parentLabel="MOH-705B Report"
      parentPath="/moh-705b"
      title="MOH-705B Linelist"
      location={locationName}
      isLoading={isLoading}
      isEmpty={!isLoading && rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={MOH_705B_LINELIST_COLUMNS}
        layoutKey={`moh-705b:${indicator}`}
        exportName={`MOH-705B ${indicator || 'linelist'} ${startDate} ${endDate}`}
      />
    </RegisterLayout>
  );
};

export default Moh705BLinelist;
