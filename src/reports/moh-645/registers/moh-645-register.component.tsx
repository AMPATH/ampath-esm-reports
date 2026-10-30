import { Link, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import styles from '../../../common/report-register/register-table.scss';
import { RegisterLayout, usePatientList } from '../../../common/report-register';
import { getMoh645PatientList } from '../../../resources/moh-645.resource';
import { moh645ExportColumns } from './moh-645.columns';

function formatDateValue(value: unknown): string {
  if (!value) {
    return '';
  }
  const text = String(value);
  return text.includes('T') ? text.slice(0, 10) : text;
}

function countValue(...values: unknown[]): string {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== '') {
      const n = Number(value);
      if (!Number.isNaN(n) && n !== 0) {
        return String(n);
      }
    }
  }
  return '';
}

const Moh645Register: React.FC = () => {
  const [searchParams] = useSearchParams();

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicators = searchParams.get('indicators');

  const { rows: patientlist, total, isTotalExact, isLoading, page, pageSize, onPageChange, fetchAll } = usePatientList(
    ({ startIndex, limit }) =>
      getMoh645PatientList({
        startDate: startDate || '',
        endDate: endDate || '',
        locationUuids: locationUuids || '',
        indicators: indicators || '',
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicators],
  );

  return (
    <RegisterLayout
      parentLabel="MOH-645 Report"
      parentPath="/moh-645"
      title="MOH 645 Malaria Commodities Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={moh645ExportColumns}
    >
      <div className={styles.tableContainer}>
        <Table className={classNames(styles.table, styles.tableBordered, styles.tableStriped)}>
          <TableHead>
            <TableRow>
              <TableHeader>No</TableHeader>
              <TableHeader>Visit date</TableHeader>
              <TableHeader>Facility</TableHeader>
              <TableHeader>IP/OP</TableHeader>
              <TableHeader>Patient name</TableHeader>
              <TableHeader>Sex</TableHeader>
              <TableHeader>Age</TableHeader>
              <TableHeader>Identifier</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Drug</TableHeader>
              <TableHeader>Quantity</TableHeader>
              <TableHeader>Microscopy POS</TableHeader>
              <TableHeader>Microscopy NEG</TableHeader>
              <TableHeader>mRDT POS</TableHeader>
              <TableHeader>mRDT NEG</TableHeader>
              <TableHeader>mRDT INV</TableHeader>
              <TableHeader>No test</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientlist.map((patient, index) => (
              <TableRow key={patient.patient_uuid ?? patient.person_id ?? index}>
                <TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
                <TableCell>{formatDateValue(patient.visit_date)}</TableCell>
                <TableCell>{patient.facility ?? ''}</TableCell>
                <TableCell>{patient.ip_op ?? ''}</TableCell>
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
                <TableCell>{patient.drug_name ?? ''}</TableCell>
                <TableCell>{patient.quantity ?? ''}</TableCell>
                <TableCell>{countValue(patient.microscopy_pos, patient.microscopy_positive)}</TableCell>
                <TableCell>{countValue(patient.microscopy_neg, patient.microscopy_negative)}</TableCell>
                <TableCell>{countValue(patient.mrdt_pos, patient.rdt_positive)}</TableCell>
                <TableCell>{countValue(patient.mrdt_neg, patient.rdt_negative)}</TableCell>
                <TableCell>{countValue(patient.mrdt_inv, patient.rdt_invalid)}</TableCell>
                <TableCell>{countValue(patient.no_test_done)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </RegisterLayout>
  );
};

export default Moh645Register;
