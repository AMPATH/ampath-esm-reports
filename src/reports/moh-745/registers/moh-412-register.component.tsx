import { Table, TableBody, TableHead, TableHeader, TableRow } from '@carbon/react';
import React from 'react';

import styles from '../../../common/report-register/register-table.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { moh412Columns } from './type';
import { getMoh412PatientList } from '../../../resources/moh-745.resource';
import { moh412ExportColumns } from './moh-412.columns';
import { RegisterLayout, usePatientList } from '../../../common/report-register';

const Moh412Register: React.FC = () => {
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
      getMoh412PatientList({
        startDate,
        endDate,
        locationUuids,
        indicator,
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicator],
  );

  return (
    <RegisterLayout
      parentLabel="MOH-745 Report"
      parentPath="/moh-745"
      title="MOH 412 Cancer Screening Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={moh412ExportColumns}
    >
      <div className={styles.tableContainer}>
        <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <TableHead>
            <TableRow>
              <TableHeader colSpan={3}>Month:</TableHeader>
              <TableHeader colSpan={2}>Year</TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader colSpan={6}>CERVICAL CANCER</TableHeader>
              <TableHeader colSpan={3}>Breast Cancer</TableHeader>
              <TableHeader colSpan={2}>Colorectal Cancer</TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
            </TableRow>
            <TableRow>
              <TableHeader colSpan={9}>Client Details</TableHeader>
              <TableHeader colSpan={3}>Screening Methods and Results</TableHeader>
              <TableHeader colSpan={3}>Pre-Cancer Treatment</TableHeader>
              <TableHeader colSpan={3}>Methods and Results</TableHeader>
              <TableHeader colSpan={2}>Methods and Results</TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
            </TableRow>
            <TableRow>
              <TableHeader>
                a)S/No
                <br />
                No
              </TableHeader>
              <TableHeader>
                b)Visit <br />
                Date
              </TableHeader>
              <TableHeader>
                c)Visit <br />
                Type
              </TableHeader>
              <TableHeader>
                d)Client <br />
                No
              </TableHeader>
              <TableHeader>e)Client Names</TableHeader>
              <TableHeader>
                f)Client's Phone <br />
                Number
              </TableHeader>
              <TableHeader>
                g)Client's <br /> Age
              </TableHeader>
              <TableHeader>
                h)Location
                <br />
                Residence
              </TableHeader>
              <TableHeader>
                i)Treatment
                <br />
                Suppoter's Phone
                <br />
                Number
              </TableHeader>
              <TableHeader>
                j)Via or <br />
                VIA/VILLI
              </TableHeader>
              <TableHeader>
                k)Pap <br />
                Smear
              </TableHeader>
              <TableHeader>
                l)HPV Test
                <br />
                (over 30 years)
              </TableHeader>
              <TableHeader>m)cryotherapy</TableHeader>
              <TableHeader>
                n)Thermo-
                <br />
                ablation
              </TableHeader>
              <TableHeader>o)LEEP</TableHeader>
              <TableHeader>p)CBE</TableHeader>
              <TableHeader>q)Ultrasound</TableHeader>
              <TableHeader>r)Mammogram</TableHeader>
              <TableHeader>s)Colonoscopy</TableHeader>
              <TableHeader>t)FOBT</TableHeader>
              <TableHeader>u)HIV Status</TableHeader>
              <TableHeader>
                v)Referral <br />
                To/From
              </TableHeader>
              <TableHeader>
                w)Follow-
                <br />
                up Date
              </TableHeader>
              <TableHeader>
                Remarks(e.g Colposcopy done,
                <br />
                Cervicography results, Call
                <br />
                Client for follow up, Return for <br />
                post-treatment screening, <br />
                Communicate with the referral site)
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {patientlist?.length > 0 ? (
              patientlist.map((patient, index) => (
                <TableRow key={index}>
                  {moh412Columns.map((col) => (
                    <td key={col}>{col === 'serial_no' ? index + 1 : (patient?.[col] ?? '')}</td>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <td colSpan={moh412Columns.length}>No data available</td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </RegisterLayout>
  );
};
export default Moh412Register;
