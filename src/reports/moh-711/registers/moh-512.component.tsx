import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { RegisterLayout, usePatientList } from '../../../common/report-register';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import classNames from 'classnames';

import styles from './moh-512.scss';
import { moh512ExportColumns } from './moh-512-columns';
import { getMoh512PatientList } from '../../../resources/moh-711.resource';

interface Moh512RegisterComponentProps {}

const Moh512RegisterComponent: React.FC<Moh512RegisterComponentProps> = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator');
  const reportName = location.state?.reportName || '';

  const {
    rows: patientlist,
    total,
    isTotalExact,
    isLoading,
    page,
    pageSize,
    onPageChange,
    fetchAll,
  } = usePatientList(
    ({ startIndex, limit }) =>
      getMoh512PatientList({
        startDate,
        endDate,
        locationUuids,
        indicator,
        reportName,
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicator, reportName],
  );

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'cr_id', label: 'Client Number' },
    { key: 'name_of_client', label: 'Name of Client' },
    { key: 'client_type', label: 'Client Type' },
    { key: 'first_ever_use_of_contraceptive', label: '1st Ever User of Contraceptive' },
    { key: 'age', label: 'Age' },
    { key: 'sex', label: 'Sex' },
    { key: 'disability_status', label: 'Disability Status' },
    { key: 'phone_number', label: 'Telephone Number' },
    { key: 'village_estate_landmark', label: 'Village/Estate/Landmark' },
    { key: 'counselled_on_fp', label: 'Counselled on FP' },
    { key: 'type_of_visit_for_method_combined_oral_contraceptive', label: 'COC Visit Type' },
    { key: 'quantity_dispensed_combined_oral_contraceptive', label: 'COC Quantity' },
    { key: 'type_of_visit_for_method_progestine', label: 'POP Visit Type' },
    { key: 'quantity_dispensed_progestine', label: 'POP Quantity' },
    { key: 'quantity_dispensed_emergency_contraceptive_pills', label: 'Emergency Contraceptive Doses' },
    { key: 'type_of_visit_for_method_1_rod', label: '1 Rod Visit Type' },
    { key: 'quantity_dispensed_1_rod', label: '1 Rod (Sets)' },
    { key: 'type_of_visit_for_method_2_rod', label: '2 Rods Visit Type' },
    { key: 'quantity_dispensed_2_rod', label: '2 Rods (Sets)' },
    { key: 'type_of_visit_for_method_iud', label: 'IUD Visit Type' },
    { key: 'quantity_dispensed_non_hormonal', label: 'Non-Hormonal IUD (Sets)' },
    { key: 'quantity_dispensed_hormonal', label: 'Hormonal IUD (Sets)' },
    { key: 'reason_for_larc_removal', label: 'Reason for LARC Removal' },
    { key: 'type_of_condom', label: 'Condom Client Sex' },
    { key: 'quantity_dispensed_male_condoms', label: 'Male Condoms' },
    { key: 'quantity_dispensed_female_condoms', label: 'Female Condoms' },
    { key: 'voluntary_surgical_contraception', label: 'VSC' },
    { key: 'counseled_on_natural_fp', label: 'Natural FP' },
    { key: 'given_cycle_beads', label: 'Cycle Beads Given' },
    { key: 'received_post_partum_fp', label: 'Timing of PPFP' },
    { key: 'tb_screening', label: 'TB Screening' },
    { key: 'counselled_on_hiv', label: 'Counselled for HIV' },
    { key: 'tested_for_hiv', label: 'Counselled and Tested for HIV' },
    { key: 'hiv_results', label: 'HIV Status' },
    { key: 'intimate_partner_violence', label: 'IPV/Reproductive Coercion' },
    { key: 'screened_for_cervical_cancer', label: 'Cervical Cancer Screened' },
    { key: 'cervical_cancer_screening_result', label: 'Cervical Cancer Result' },
    { key: 'referral_from', label: 'Referral From' },
    { key: 'referral_to', label: 'Referral To' },
    { key: 'reason_for_referral', label: 'Reason for Referral' },
    { key: 'comments', label: 'Remarks' },
  ];

  return (
    <RegisterLayout
      parentLabel="MOH-711 Report"
      parentPath="/moh-711"
      title="MOH 512 Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={moh512ExportColumns}
    >
      <div className={styles.tableContainer}>
        <Table className={classNames(styles.table, styles.tableBordered, styles.tableStriped)}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableHeader key={column.key}>{column.label}</TableHeader>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>Loading register...</TableCell>
              </TableRow>
            ) : patientlist.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>No records found.</TableCell>
              </TableRow>
            ) : (
              patientlist.map((patient, index) => (
                <TableRow key={patient.person_id || patient.id || index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>{patient[column.key] ?? ''}</TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </RegisterLayout>
  );
};

export default Moh512RegisterComponent;
