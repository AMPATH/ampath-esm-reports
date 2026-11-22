import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LinelistTable, type LinelistColumn, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { getMoh405PatientList } from '../../../resources/moh-711.resource';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

const MOH710_LINELIST_COLUMNS: LinelistColumn[] = [
  { header: 'Date (DD/MM/YYYY) - A', value: (row) => row.date ?? '' },
  {
    header: "Child's Number - B",
    value: (row) => row.child_number ?? '',
  },
  { header: "Child's Names - C", value: (row) => row.child_names ?? '' },
  { header: 'Sex - D', value: (row) => row.sex ?? '' },
  { header: 'Date of Birth - E', value: (row) => row.date_of_birth ?? '' },
  { header: 'BCG - K', value: (row) => row.bcg ?? '' },
  { header: 'Polio birth Dose - L', value: (row) => row.polio_birth_dose ?? '' },
  { header: 'OPV 1 - M', value: (row) => row.opv_1 ?? '' },
  { header: 'OPV 2 - N', value: (row) => row.opv_2 ?? '' },
  { header: 'OPV 3 - O', value: (row) => row.opv_3 ?? '' },
  { header: 'IPV - P', value: (row) => row.ipv ?? '' },
  { header: 'DPT / Hep.B / Hib.1 - Q', value: (row) => row.dpt_hep_1 ?? '' },
  { header: 'DPT / Hep.B / Hib.2 - R', value: (row) => row.dpt_hep_2 ?? '' },
  { header: 'DPT / Hep.B / Hib.3 - S', value: (row) => row.dpt_hep_3 ?? '' },
  { header: 'PCV 10 (Pneumococcal) T - AB', value: (row) => row.pneumococcal_1 ?? '' },
  { header: 'PCV 10 (Pneumococcal) U - AB', value: (row) => row.pneumococcal_2 ?? '' },
  { header: 'PCV 10 (Pneumococcal) V - AB', value: (row) => row.pneumococcal_3 ?? '' },
  { header: 'Rota1 - W', value: (row) => row.rotavirus_1 ?? '' },
  { header: 'Rota2 - X', value: (row) => row.rotavirus_2 ?? '' },
  { header: 'Vitamin A(6-11 months) - Y', value: (row) => row.vitamin_a_6_11_months ?? '' },
  { header: 'MR1 - Z', value: (row) => row.measles_rubella_1 ?? '' },
  { header: 'Yellow Fever - AA', value: (row) => row.yellow_fever ?? '' },
  { header: 'Fully Immunized Child - AB', value: (row) => row.fully_immunized_child ?? '' },
  { header: 'MR2 - AC', value: (row) => row.measles_rubella_2 ?? '' },
  { header: 'Remarks - AD', value: (row) => row.remarks ?? '' },
];

const Moh710Linelist: React.FC = () => {
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
      parentLabel="MOH-710 Report"
      parentPath="/moh-710"
      title="MOH-710 Linelist"
      location={locationName}
      isLoading={isLoading}
      isEmpty={!isLoading && rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={MOH710_LINELIST_COLUMNS}
        layoutKey={`moh-710:${indicator}`}
        exportName={`MOH-710 ${indicator} ${startDate ?? ''} ${endDate ?? ''}`}
      />
    </RegisterLayout>
  );
};

export default Moh710Linelist;
