import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { RegisterLayout, usePatientList } from '../../../common/report-register';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import classNames from 'classnames';

import styles from './tb-register.scss';
import { TBExportColumns } from './tb-register-columns';
import { getTBPatientList } from '../../../resources/moh-711.resource';

interface TbRegisterComponentProps {}

const TbRegisterComponent: React.FC<TbRegisterComponentProps> = () => {
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
      getTBPatientList({
        startDate: startDate!,
        endDate: endDate!,
        locationUuids: locationUuids!,
        indicator: indicator!,
        startIndex,
        limit,
        reportName: 'moh711Report',
      }),
    [startDate, endDate, locationUuids, indicator],
  );
  return (
    <RegisterLayout
      parentLabel="MOH-711 Report"
      parentPath="/moh-711"
      title="TB Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={TBExportColumns}
    >
      <div className={styles.tableContainer}>
        <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <TableHead>
            <TableRow>
              <TableHeader>Date</TableHeader>
              <TableHeader>CR No</TableHeader>
              <TableHeader>DOB</TableHeader>
              <TableHeader>Gender</TableHeader>
              <TableHeader>TB Screening</TableHeader>
              <TableHeader>TCA</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientlist?.length > 0 ? (
              patientlist?.map((patient, i) => (
                <TableRow key={patient.person_id || patient.id}>
                  <TableCell>{patient.date}</TableCell>
                  <TableCell>{patient.cr_id}</TableCell>
                  <TableCell>{patient.date_of_birth}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.tb_screening}</TableCell>
                  <TableCell>{patient.rtc}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={28}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </RegisterLayout>
  );
};

export default TbRegisterComponent;
