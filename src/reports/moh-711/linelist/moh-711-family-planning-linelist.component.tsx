import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LinelistTable, type LinelistColumn, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { getMoh512PatientList } from '../../../resources/moh-711.resource';

const formatDate = (value: unknown) => (value ? new Date(String(value)).toLocaleDateString('en-GB') : '');

const FAMILY_PLANNING_LINELIST_COLUMNS: LinelistColumn[] = [
  { header: 'Date of Visit', value: (row) => formatDate(row.date), sortValue: (row) => row.date },
  { header: 'CR Number', field: 'cr_id', text: true },
  { header: 'Full Name', field: 'name_of_client' },
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
  { header: 'First-Time Contraceptive User', field: 'first_ever_use_of_contraceptive' },
  { header: 'Counselled on Family Planning', field: 'counselled_on_fp' },
  {
    header: 'Type of Visit for Method',
    value: (row) =>
      [
        row.type_of_visit_for_method_progestine,
        row.type_of_visit_for_method_combined_oral_contraceptive,
        row.type_of_visit_for_method_1_rod,
        row.type_of_visit_for_method_2_rod,
        row.type_of_visit_for_method_iud,
      ]
        .filter((value) => value !== null && value !== undefined && value !== '')
        .join(' / '),
    wrap: true,
  },
  { header: 'Pills – Progestin-Only Pills', field: 'quantity_dispensed_progestine' },
  { header: 'Pills – Combined Oral Contraceptive Pills', field: 'quantity_dispensed_combined_oral_contraceptive' },
  { header: 'Pills – Emergency Contraceptive Pills', field: 'quantity_dispensed_emergency_contraceptive_pills' },
  { header: 'Injectables – DMPA-IM', field: 'quantity_dispensed_dmpa_im' },
  { header: 'Injectables – DMPA-SC', field: 'quantity_dispensed_dmpa_sc' },
  { header: 'Condoms – Male Condoms', field: 'quantity_dispensed_male_condoms' },
  { header: 'Condoms – Female Condoms', field: 'quantity_dispensed_female_condoms' },
  { header: 'Condoms – Both Male and Female Condoms', field: 'quantity_dispensed_both_condoms' },
  { header: 'Natural Family Planning – Clients Counselled', field: 'counseled_on_natural_fp' },
  { header: 'Natural Family Planning – Cycle Beads Given', field: 'given_cycle_beads' },
  { header: 'Implants – 1 Rod', field: 'quantity_dispensed_1_rod' },
  { header: 'Implants – 2 Rods', field: 'quantity_dispensed_2_rod' },
  { header: 'IUCD Insertion – Hormonal', field: 'quantity_dispensed_hormonal' },
  { header: 'IUCD Insertion – Non-Hormonal', field: 'quantity_dispensed_non_hormonal' },
  { header: 'Voluntary Surgical Contraception – BTL', field: 'btl' },
  { header: 'Voluntary Surgical Contraception – Vasectomy', field: 'vasectomy' },
  { header: 'Removals – IUCD', field: 'iucd_removal' },
  { header: 'Removals – Implants', field: 'implant_removal' },
  { header: 'Provider Name', field: 'provider' },
  { header: 'RTC / TCA Date', value: (row) => formatDate(row.rtc_date), sortValue: (row) => row.rtc_date },
];

const Moh711FamilyPlanningLinelist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator') ?? '';
  const locationName = useLocationName(locationUuids);

  const fetchPatientList = useCallback(
    ({ startIndex, limit }: { startIndex: number; limit: number }) =>
      getMoh512PatientList({
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
        locationUuids: locationUuids ?? '',
        indicator,
        reportName: 'moh711Report',
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicator],
  );
  const { rows, isLoading } = useAllRows(fetchPatientList, [startDate, endDate, locationUuids, indicator]);

  return (
    <RegisterLayout
      parentLabel="MOH-711 Report"
      parentPath="/moh-711"
      title="MOH-711 Family Planning Linelist"
      location={locationName}
      isLoading={isLoading}
      isEmpty={!isLoading && rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={FAMILY_PLANNING_LINELIST_COLUMNS}
        layoutKey={`moh-711-family-planning:${indicator}`}
        exportName={`MOH-711 Family Planning ${indicator} ${startDate ?? ''} ${endDate ?? ''}`}
      />
    </RegisterLayout>
  );
};

export default Moh711FamilyPlanningLinelist;
