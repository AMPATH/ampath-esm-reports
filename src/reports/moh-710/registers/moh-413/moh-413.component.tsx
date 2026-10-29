import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { RegisterLayout, usePatientList } from '../../../../common/report-register';
import { getMoh413PatientList } from '../../../../resources/moh-710.resource';
import classNames from 'classnames';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';

import styles from './moh-413.scss';
import { Moh413xportColumns } from './moh-413-columns';

interface Moh413ComponentProps {}

const Moh413Component: React.FC<Moh413ComponentProps> = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator');

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
      getMoh413PatientList({
        startDate: startDate!,
        endDate: endDate!,
        locationUuids: locationUuids!,
        indicator: indicator!,
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicator],
  );
  return (
    <RegisterLayout
      parentLabel="MOH-711 Report"
      parentPath="/moh-413"
      title="MOH 413 Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={Moh413xportColumns}
    >
      <div className={styles.tableContainer}>
        <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <TableHead>
            <TableRow>
              {Moh413xportColumns.map((column, index) => (
                <TableHeader key={`${column.header}-${index}`}>{column.header}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {patientlist?.length > 0 ? (
              patientlist?.map((patient, i) => (
                <TableRow key={patient.person_id || patient.id}>
                  {Moh413xportColumns.map((column, index) => (
                    <TableCell key={`${column.header}-${index}`}>
                      {String(column.value(patient, i) ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={Moh413xportColumns.length}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </RegisterLayout>
  );
};

export default Moh413Component;
