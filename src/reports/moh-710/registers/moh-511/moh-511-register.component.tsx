import { Table, TableBody, TableHead, TableHeader, TableRow } from '@carbon/react';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './moh-511.scss';
import { moh511Columns } from './type';
import { moh511ExportColumns } from './moh-511-columns';
import { RegisterLayout, usePatientList } from '../../../../common/report-register';
import classNames from 'classnames';
import { ReportFiltersComponent, type ReportPeriod } from '../../../../common/report-filters';
import { useSession } from '@openmrs/esm-framework';
import { getMoh511Register } from '../../../../resources/moh-710.resource';

const Moh511Register: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const session = useSession();
  const from = searchParams.get('from');
  const isDrilldown = Boolean(from);
  const [generatedPeriod, setGeneratedPeriod] = useState<{ startDate: string; endDate: string } | null>(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    return !isDrilldown && startDate && endDate ? { startDate, endDate } : null;
  });
  const isGenerated = isDrilldown || Boolean(generatedPeriod);

  const startDate = generatedPeriod?.startDate ?? searchParams.get('startDate');
  const endDate = generatedPeriod?.endDate ?? searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids') ?? session?.sessionLocation?.uuid ?? '';
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
    ({ startIndex, limit }) => {
      if (!isDrilldown && !generatedPeriod) {
        return Promise.resolve({ results: [], total: 0, isTotalExact: true });
      }

      return getMoh511Register({
        startDate,
        endDate,
        locationUuids,
        indicator,
        startIndex,
        limit,
      });
    },
    [startDate, endDate, locationUuids, indicator, isDrilldown, generatedPeriod],
  );

  const generate = ({ startDate, endDate }: ReportPeriod) => {
    setGeneratedPeriod({ startDate, endDate });
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('startDate', startDate);
      nextParams.set('endDate', endDate);
      if (!nextParams.has('locationUuids') && locationUuids) {
        nextParams.set('locationUuids', locationUuids);
      }
      return nextParams;
    });
  };

  return (
    <>
      {!isDrilldown && (
        <ReportFiltersComponent
          reportName="MOH-511 Register"
          mode="range"
          onGenerate={generate}
          isLoading={isLoading}
          isReportGenerated={Boolean(generatedPeriod)}
          generatedPeriod={generatedPeriod ?? undefined}
          backLink={{ label: 'All registers', to: '/?tab=registers' }}
        />
      )}
      <RegisterLayout
        parentLabel={isDrilldown ? 'MOH-710 Report' : 'All registers'}
        parentPath={isDrilldown ? '/moh-710' : '/?tab=registers'}
        title="MOH-511 Register"
        isLoading={isLoading}
        isEmpty={isGenerated && patientlist.length === 0}
        page={page}
        pageSize={pageSize}
        total={total}
        isTotalExact={isTotalExact}
        onPageChange={onPageChange}
        fetchAll={isGenerated ? fetchAll : undefined}
        columns={moh511ExportColumns}
      >
        {isGenerated && (
          <div className={styles.tableContainer}>
            <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`)}>
              <TableHead>
                <TableRow>
                  <TableHeader>Serial No.</TableHeader>
                  <TableHeader>
                    Date.
                    <br />
                    (DD:MM:YYYY)
                  </TableHeader>
                  <TableHeader>CR_ID</TableHeader>
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
          </div>
        )}
      </RegisterLayout>
    </>
  );
};

export default Moh511Register;
