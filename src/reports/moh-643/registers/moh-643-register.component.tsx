import { Link, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import styles from '../../../common/report-register/register-table.scss';
import { RegisterLayout, usePatientList } from '../../../common/report-register';
import { getMoh643PatientList } from '../../../resources/moh-643.resource';
import { moh643ExportColumns } from './moh-643.columns';

function formatDateValue(value: unknown): string {
  if (!value) {
    return '';
  }
  const text = String(value);
  return text.includes('T') ? text.slice(0, 10) : text;
}

function countForIndicator(row: Record<string, any>, indicator?: string | null): string {
  if (indicator && row[indicator] != null && row[indicator] !== '') {
    return String(row[indicator]);
  }
  return '';
}

const Moh643Register: React.FC = () => {
  const [searchParams] = useSearchParams();

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicators = searchParams.get('indicators');

  const { rows: patientlist, total, isTotalExact, isLoading, page, pageSize, onPageChange, fetchAll } = usePatientList(
    ({ startIndex, limit }) =>
      getMoh643PatientList({
        startDate: startDate || '',
        endDate: endDate || '',
        locationUuids: locationUuids || '',
        indicators: indicators || '',
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicators],
  );

  const exportColumns = moh643ExportColumns.map((column) =>
    column.header === 'Count'
      ? { ...column, value: (row: Record<string, any>) => countForIndicator(row, indicators) }
      : column,
  );

  return (
    <RegisterLayout
      parentLabel="MOH-643 Report"
      parentPath="/moh-643"
      title="MOH 643 Laboratory Commodities Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={exportColumns}
    >
      <div className={styles.tableContainer}>
        <Table className={classNames(styles.table, styles.tableBordered, styles.tableStriped)}>
          <TableHead>
            <TableRow>
              <TableHeader>No</TableHeader>
              <TableHeader>Visit date</TableHeader>
              <TableHeader>Facility</TableHeader>
              <TableHeader>Patient name</TableHeader>
              <TableHeader>Sex</TableHeader>
              <TableHeader>Age</TableHeader>
              <TableHeader>Identifier</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Test</TableHeader>
              <TableHeader>Count</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientlist.map((patient, index) => (
              <TableRow key={patient.patient_uuid ?? patient.person_id ?? index}>
                <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                <TableCell>{formatDateValue(patient.visit_date)}</TableCell>
                <TableCell>{patient.facility ?? ''}</TableCell>
                <TableCell>
                  {patient.patient_uuid ? (
                    <Link href={`${window.spaBase}/patient/${patient.patient_uuid}/chart/`}>{patient.person_name}</Link>
                  ) : (
                    patient.person_name
                  )}
                </TableCell>
                <TableCell>{patient.gender ?? ''}</TableCell>
                <TableCell>{patient.age_years ?? ''}</TableCell>
                <TableCell>{patient.amrs_universal_id ?? ''}</TableCell>
                <TableCell>{patient.phone_number ?? ''}</TableCell>
                <TableCell>{patient.test_name ?? ''}</TableCell>
                <TableCell>{countForIndicator(patient, indicators)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </RegisterLayout>
  );
};

export default Moh643Register;
