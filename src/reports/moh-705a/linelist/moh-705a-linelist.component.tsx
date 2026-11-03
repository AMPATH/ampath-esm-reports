import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { type LinelistColumn, LinelistTable, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { getMoh705aPatientList } from '../../../resources/moh-705.resource';

const MOH_705A_LINELIST_COLUMNS: LinelistColumn[] = [
  { header: 'Date', field: 'date' },
  { header: 'OPD No. (New)', field: 'opd_number_new_visit' },
  { header: 'OPD No. (Revisit)', field: 'opd_number_return_visit' },
  { header: 'Referred From', field: 'referred_from' },
  { header: 'Full Names', field: 'full_names' },
  { header: 'Age', field: 'age' },
  { header: 'Sex', field: 'sex' },
  { header: 'County/Sub-county', field: 'county_sub_county' },
  { header: 'Village / Estate / Landmark', field: 'village_estate_landmark' },
  { header: "Parent/Caregiver's Telephone No.", field: 'caregiver_phone_number' },
  { header: 'Weight (kg)', field: 'weight' },
  { header: 'Height / Length (cm)', field: 'height' },
  { header: 'MUAC', field: 'muac' },
  { header: 'Temp (oC)', field: 'temp' },
  { header: 'Respiratory Rate', field: 'respiratory_rate' },
  { header: 'Oxygen Saturation (SPO2)', field: 'oxygen_saturation' },
  { header: 'Pulse Rate', field: 'pulse_rate' },
  { header: 'Danger Signs', field: 'danger_signs' },
  { header: 'Current Illness Duration', field: 'duration_of_illness' },
  { header: 'Malaria Status', field: 'suspected_malaria_cases' },
  { header: 'IMNCI Classification / Diagnosis', field: 'diagnosis' },
  { header: 'Tracer Drugs', field: 'tracer_drugs_prescribed' },
  { header: 'Other Treatments', field: 'all_other_treatments_prescribed' },
  { header: 'Immunisation Status Up to Date', field: 'immunization_status_up_to_date' },
  { header: 'TB Screening', field: 'tb_screening' },
  { header: 'Nutrition / Dietetics', field: 'nutrition_dietetics' },
  { header: 'Referred To', field: 'referred_to' },
  { header: 'Remarks / Outcome', field: 'remarks' },
];

const Moh705ALinelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const locationUuids = searchParams.get('locationUuids') ?? '';
  const indicator = searchParams.get('indicator') ?? '';
  const from = searchParams.get('from') || undefined;
  const locationName = useLocationName(locationUuids);

  const fetchPatientList = useCallback(
    ({ startIndex, limit }: { startIndex: number; limit: number }) =>
      getMoh705aPatientList({
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        locationUuids,
        indicator,
        reportName: 'moh705aReport',
        startIndex,
        limit,
        from,
      }),
    [startDate, endDate, locationUuids, indicator, from],
  );

  const { rows, isLoading } = useAllRows(fetchPatientList, [startDate, endDate, locationUuids, indicator, from]);

  return (
    <RegisterLayout
      parentLabel="MOH-705A Report"
      parentPath="/moh-705a"
      title="MOH-705A Linelist"
      location={locationName}
      isLoading={isLoading}
      isEmpty={!isLoading && rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={MOH_705A_LINELIST_COLUMNS}
        layoutKey={`moh-705a:${indicator}`}
        exportName={`MOH-705A ${indicator || 'linelist'} ${startDate} ${endDate}`}
      />
    </RegisterLayout>
  );
};

export default Moh705ALinelist;
