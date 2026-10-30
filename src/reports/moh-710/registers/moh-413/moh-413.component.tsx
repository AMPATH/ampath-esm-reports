import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RegisterLayout, usePatientList } from '../../../../common/report-register';
import { getMoh413PatientList } from '../../../../resources/moh-710.resource';
import classNames from 'classnames';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import dayjs from 'dayjs';
import { useSession } from '@openmrs/esm-framework';

import styles from './moh-413.scss';
import { Moh413xportColumns } from './moh-413-columns';
import { ReportFiltersComponent, type ReportPeriod } from '../../../../common/report-filters';

interface Moh413ComponentProps {}

const Moh413Component: React.FC<Moh413ComponentProps> = () => {
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

      return getMoh413PatientList({
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
          reportName="MOH 413 Register"
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
        title="MOH 413 Register"
        isLoading={isLoading}
        isEmpty={isGenerated && patientlist.length === 0}
        page={page}
        pageSize={pageSize}
        total={total}
        isTotalExact={isTotalExact}
        onPageChange={onPageChange}
        fetchAll={isGenerated ? fetchAll : undefined}
        columns={Moh413xportColumns}
      >
        {isGenerated && (
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
                      {Moh413xportColumns.map((column, index) => {
                        const value = column.value(patient, i);
                        return (
                          <TableCell key={`${column.header}-${index}`}>
                            {[0, 3, 5].includes(index) && value
                              ? dayjs(String(value)).format('YYYY-MM-DD')
                              : String(value ?? '')}
                          </TableCell>
                        );
                      })}
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
        )}
      </RegisterLayout>
    </>
  );
};

export default Moh413Component;
