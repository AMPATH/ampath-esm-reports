import { Table, TableBody, TableHead, TableHeader, TableRow } from '@carbon/react';
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import styles from '../../../common/report-register/register-table.scss';
import { getMoh511PatientList } from '../../../resources/moh-711.resource';
import { moh511Columns } from './type';
import { moh511ExportColumns } from './moh-511-710.columns';
import { RegisterLayout, usePatientList } from '../../../common/report-register';

const Moh511710Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  /* The endpoint scopes its list by report. Defaulted rather than read only
     from route state, which is lost on a reload or a pasted link. */
  const reportName = location.state?.reportName || 'moh710Report';

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
      getMoh511PatientList({
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

  return (
    <RegisterLayout
      parentLabel="MOH-710 Report"
      parentPath="/moh-710"
      title="MOH 511 Immunization Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={moh511ExportColumns}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Serial No.</TableHeader>
            <TableHeader>
              Date.
              <br />
              (DD:MM:YYYY)
            </TableHeader>
            <TableHeader>
              CWC No.
              <br />
              (New Visit)
            </TableHeader>
            <TableHeader>
              CWC No.
              <br />
              (Revisit)
            </TableHeader>
            <TableHeader>
              BIRTH NOTIFICATION
              <br /> (NUMBER)
            </TableHeader>
            <TableHeader>Full Names (Three names)</TableHeader>
            <TableHeader>Age</TableHeader>
            <TableHeader>Sex</TableHeader>
            <TableHeader>
              County/Sub-
              <br />
              county
            </TableHeader>
            <TableHeader>
              Village /Estate / <br />
              Landmark
            </TableHeader>
            <TableHeader>
              Telephone
              <br />
              number
            </TableHeader>
            <TableHeader>Weight</TableHeader>
            <TableHeader>Height</TableHeader>
            <TableHeader>Weight in Kgs</TableHeader>
            <TableHeader>
              Weight
              <br />
              categories:
              <br />
              (1=Normal
              <br />
              2=UW
              <br />
              3=SUW
              <br />
              4=OW
              <br />
              5=Obese)
            </TableHeader>
            <TableHeader>Height / Length in cm</TableHeader>
            <TableHeader>
              Height/Length
              <br />
              categories:
              <br />
              (1=Normal
              <br />
              2=Stunted
              <br />
              3=Sev.
              <br />
              Stunted)
              <br />
            </TableHeader>
            <TableHeader>
              MUAC
              <br />
              1.Green
              <br />
              2.Yellow
              <br />
              3.Red
            </TableHeader>
            <TableHeader>
              Exclusive <br /> Breast feeding <br />
              (less than 6<br /> months)(Y/N)
            </TableHeader>
            <TableHeader>
              Vitamin A
              <br />
              supplimentation:
              <br />
              (6-59 months) (1=6-
              <br />
              11 months, 2=12-59
              <br />
              months, 3=Not
              <br />
              supplimented)
            </TableHeader>
            <TableHeader>Dewormed (Y/N)</TableHeader>
            <TableHeader>
              MNPs supplimentation:(6-23
              <br />
              children)
            </TableHeader>
            <TableHeader>
              Childs assessed for <br />
              Developmental milestones <br />
              including 1st Haed control ,2=
              <br />
              sitting, 3=talking
            </TableHeader>
            <TableHeader>
              Any Danger Signs
              <br />
              1.Unable to breastfeed
              <br />
              2.Unable to drink
              <br />
              3.Vomits everything
              <br />
              4.Bloody diarrhoea
              <br />
              5.Has oedema <br />
              6.Has convulsions
            </TableHeader>
            <TableHeader>Any Disability</TableHeader>
            <TableHeader>Immunization status up to date(Y/N)</TableHeader>
            <TableHeader>LLIN gievn to under 1 years(Y/N)</TableHeader>
            <TableHeader>
              Follow up for: <br />
              1=Nutrition service
              <br />
              2=Rehabilitation service
            </TableHeader>
            <TableHeader>
              1=referred from CU; 2= <br />
              referred from another H/F;
              <br />
              3=Not applicable
            </TableHeader>
            <TableHeader>
              1=referred to CU; 2= <br />
              referred to another H/F;
              <br />
              3=Not applicable
            </TableHeader>
            <TableHeader>
              Reason for referral <br />
              ....specify
            </TableHeader>
            <TableHeader>REMARKS</TableHeader>
          </TableRow>
          <TableRow>
            <TableHeader>A</TableHeader>
            <TableHeader>B</TableHeader>
            <TableHeader>C</TableHeader>
            <TableHeader>D</TableHeader>
            <TableHeader>E</TableHeader>
            <TableHeader>F</TableHeader>
            <TableHeader>G</TableHeader>
            <TableHeader>H</TableHeader>
            <TableHeader>I</TableHeader>
            <TableHeader>J</TableHeader>
            <TableHeader>K</TableHeader>
            <TableHeader>L</TableHeader>
            <TableHeader>M</TableHeader>
            <TableHeader>N</TableHeader>
            <TableHeader>O</TableHeader>
            <TableHeader>P</TableHeader>
            <TableHeader>Q</TableHeader>
            <TableHeader>R</TableHeader>
            <TableHeader>S</TableHeader>
            <TableHeader>T</TableHeader>
            <TableHeader>U</TableHeader>
            <TableHeader>V</TableHeader>
            <TableHeader>W</TableHeader>
            <TableHeader>X</TableHeader>
            <TableHeader>Y</TableHeader>
            <TableHeader>Z</TableHeader>
            <TableHeader>AA</TableHeader>
            <TableHeader>AB</TableHeader>
            <TableHeader>AC</TableHeader>
            <TableHeader>AD</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientlist?.length > 0 ? (
            patientlist.map((patient, index) => (
              <TableRow key={index}>
                {moh511Columns.map((col) => (
                  <td key={col}>{col === 'serial_no' ? index + 1 : (patient?.[col] ?? '')}</td>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <td colSpan={moh511Columns.length}>No data available</td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </RegisterLayout>
  );
};

export default Moh511710Register;
