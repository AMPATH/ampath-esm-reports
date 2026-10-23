import React from 'react';

import styles from './moh-510.scss';
import { useSearchParams } from 'react-router-dom';
import { RegisterLayout, usePatientList } from '../../../../common/report-register';
import { getMoh710PatientList } from '../../../../resources/moh-710.resource';
import { moh510ExportColumns } from './moh-510.columns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import classNames from 'classnames';

interface Moh510RegisterComponentProps {}

const Moh510RegisterComponent: React.FC<Moh510RegisterComponentProps> = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator');
  const reportName = 'moh710Report';

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
      getMoh710PatientList({
        startDate: startDate!,
        endDate: endDate!,
        locationUuids: locationUuids!,
        indicator: indicator!,
        startIndex,
        limit,
        reportName: reportName,
      }),
    [startDate, endDate, locationUuids, indicator],
  );
  return (
    <RegisterLayout
      parentLabel="MOH-705A Report"
      parentPath="/moh-705a"
      title="MOH 204A Under-5 Outpatient Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={moh510ExportColumns}
    >
      <div className={styles.tableContainer}>
        <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <TableHead>
            <TableRow>
              <TableHeader>Date (DD/MM/YYYY)</TableHeader>
              <TableHeader>Serial Number</TableHeader>
              <TableHeader>Child's Number</TableHeader>
              <TableHeader>Child's Names</TableHeader>
              <TableHeader>Sex</TableHeader>
              <TableHeader>Date of Birth</TableHeader>
              <TableHeader>Date first Seen</TableHeader>
              <TableHeader>Father's Full Names/Guardian</TableHeader>
              <TableHeader>Mother's Full Names/Guardian</TableHeader>
              <TableHeader>Village /Estate / Landmark</TableHeader>
              <TableHeader>Telephone No.</TableHeader>
              <TableHeader>BCG</TableHeader>
              <TableHeader>Polio birth Dose</TableHeader>
              <TableHeader>OPV 1</TableHeader>
              <TableHeader>OPV 2</TableHeader>
              <TableHeader>OPV 3</TableHeader>
              <TableHeader>IPV</TableHeader>
              <TableHeader>DPT / Hep.B / Hib.1</TableHeader>
              <TableHeader>DPT / Hep.B / Hib.2</TableHeader>
              <TableHeader>DPT / Hep.B / Hib.3</TableHeader>
              <TableHeader>PCV 10 (Pneumococcal)</TableHeader>
              <TableHeader>PCV 10 (Pneumococcal)</TableHeader>
              <TableHeader>PCV 10 (Pneumococcal)</TableHeader>
              <TableHeader>Rota1</TableHeader>
              <TableHeader>Rota2</TableHeader>
              <TableHeader>Vitamin A(6-11 months)</TableHeader>
              <TableHeader>MR1</TableHeader>
              <TableHeader>Yellow Fever</TableHeader>
              <TableHeader>Fully Immunized Child</TableHeader>
              <TableHeader>MR2</TableHeader>
              <TableHeader>Remarks</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientlist?.length > 0 ? (
              patientlist?.map((patient, i) => (
                <TableRow key={patient.person_id || patient.id}>
                  <TableCell>{patient.date}</TableCell>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{patient.child_number}</TableCell>
                  <TableCell>{patient.child_names}</TableCell>
                  <TableCell>{patient.sex}</TableCell>
                  <TableCell>{patient.date_of_birth}</TableCell>
                  <TableCell>{patient.date_first_seen}</TableCell>
                  <TableCell>{patient.father_names}</TableCell>
                  <TableCell>{patient.mother_names}</TableCell>
                  <TableCell>{patient.village_estate_landmark}</TableCell>
                  <TableCell>{patient.phone_number}</TableCell>
                  <TableCell>{patient.bcg}</TableCell>
                  <TableCell>{patient.polio_birth_dose}</TableCell>
                  <TableCell>{patient.opv_1}</TableCell>
                  <TableCell>{patient.opv_2}</TableCell>
                  <TableCell>{patient.opv_3}</TableCell>
                  <TableCell>{patient.ipv}</TableCell>
                  <TableCell>{patient.dpt_hep_1}</TableCell>
                  <TableCell>{patient.dpt_hep_2}</TableCell>
                  <TableCell>{patient.dpt_hep_3}</TableCell>
                  <TableCell>{patient.pneumococcal_1}</TableCell>
                  <TableCell>{patient.pneumococcal_2}</TableCell>
                  <TableCell>{patient.pneumococcal_3}</TableCell>
                  <TableCell>{patient.rotavirus_1}</TableCell>
                  <TableCell>{patient.rotavirus_2}</TableCell>
                  <TableCell>{patient.vitamin_a_6_11_months}</TableCell>
                  <TableCell>{patient.measles_rubella_1}</TableCell>
                  <TableCell>{patient.yellow_fever}</TableCell>
                  <TableCell>{patient.fully_immunized_child}</TableCell>
                  <TableCell>{patient.measles_rubella_2}</TableCell>
                  <TableCell>{patient.remarks}</TableCell>
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

export default Moh510RegisterComponent;
