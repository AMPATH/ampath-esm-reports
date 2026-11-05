import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LinelistTable, type LinelistColumn, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { getMoh333PatientList } from '../../../resources/moh-711.resource';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

const MATERNITY_LINELIST_COLUMNS: LinelistColumn[] = [
  {
    header: 'Date of Admission',
    value: (row) => formatDate(row.admission_date),
    sortValue: (row) => row.admission_date,
  },
  { header: 'CR Number', field: 'cr_id', text: true },
  { header: 'Full Name', field: 'full_names' },
  {
    header: 'Date of Birth',
    value: (row) => formatDate(row.date_of_birth),
    sortValue: (row) => row.date_of_birth,
  },
  { header: 'Age (Years)', field: 'age' },
  {
    header: 'Date of Delivery',
    value: (row) => formatDate(row.date_of_delivery),
    sortValue: (row) => row.date_of_delivery,
  },
  { header: 'Time of Delivery', field: 'time_of_delivery' },
  { header: 'Gestational Age at Birth (Weeks)', field: 'gestation_at_birth' },
  { header: 'Mode of Delivery', field: 'mode_of_delivery' },
  { header: 'Uterotonic Given', field: 'uterotonic_given' },
  { header: "Mother's Status After Delivery", field: 'mothers_status_after_delivery' },
  { header: 'Maternal Death Notified', field: 'maternal_deaths_notified' },
  {
    header: 'Date Death Notified',
    value: (row) => formatDate(row.date_maternal_death_notified),
    sortValue: (row) => row.date_maternal_death_notified,
  },
  { header: 'Delivery Complications', field: 'delivery_complication' },
  { header: 'APGAR Score', field: 'apgar_score' },
  { header: 'Birth Outcome', field: 'birth_outcome' },
  { header: 'Date of HIV Testing', field: 'date_of_hiv_test' },
  { header: 'Birth Weight (Grams)', field: 'birth_weight' },
  { header: 'Initiated Breastfeeding Within 1 Hour', field: 'initiated_on_bf_in_1_hour' },
  { header: 'Kangaroo Mother Care (KMC)', field: 'kangaroo_mother_care' },
  { header: 'TEO Given at Birth', field: 'teo_given_at_birth' },
  { header: 'Chlorhexidine Applied on Cord Stump', field: 'chlorhexidine_applied_on_cord_stamp' },
  { header: 'Baby Born with Deformity', field: 'birth_with_deformity' },
  { header: 'Vitamin K Given', field: 'vitamin_k_given' },
  { header: 'HIV Status', field: 'hiv_result_maternity' },
  {
    header: 'Date of Discharge',
    value: (row) => formatDate(row.discharge_date),
    sortValue: (row) => row.discharge_date,
  },
  { header: "Baby's Status at Discharge", field: 'discharge_status' },
  { header: 'Delivery Conducted By (Name)', field: 'delivery_conducted_by' },
];

const Moh711MaternityLinelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator') ?? '';
  const from = searchParams.get('from');
  const locationName = useLocationName(locationUuids);

  const fetchPatientList = useCallback(
    ({ startIndex, limit }: { startIndex: number; limit: number }) =>
      getMoh333PatientList({
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
      title="MOH-711 Maternity Linelist"
      location={locationName}
      isLoading={isLoading}
      isEmpty={!isLoading && rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={MATERNITY_LINELIST_COLUMNS}
        layoutKey={`moh-711-maternity:${indicator}`}
        exportName={`MOH-711 Maternity ${indicator} ${startDate ?? ''} ${endDate ?? ''}`}
      />
    </RegisterLayout>
  );
};

export default Moh711MaternityLinelist;
