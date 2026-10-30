import React, { useState } from 'react';
import { RegisterLayout, usePatientList } from '../../../common/report-register';
import { useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useSession } from '@openmrs/esm-framework';

import styles from './moh-407.scss';
import { Moh407xportColumns } from './moh-407.columns';
import { getMoh407PatientList } from '../../../resources/moh-711.resource';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import { ReportFiltersComponent, type ReportPeriod } from '../../../common/report-filters';

interface Moh407RegisterComponentProps {}

const Moh407RegisterComponent: React.FC<Moh407RegisterComponentProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
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
  const reportName = location.state?.reportName || 'moh711Report';

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

      return getMoh407PatientList({
        startDate,
        endDate,
        locationUuids,
        indicator,
        reportName,
        startIndex,
        limit,
        from,
      });
    },
    [startDate, endDate, locationUuids, indicator, reportName, from, isDrilldown, generatedPeriod],
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
          reportName="MOH 407 Register"
          mode="range"
          onGenerate={generate}
          isLoading={isLoading}
          isReportGenerated={Boolean(generatedPeriod)}
          generatedPeriod={generatedPeriod ?? undefined}
          backLink={{ label: 'All registers', to: '/?tab=registers' }}
        />
      )}
      <RegisterLayout
        parentLabel={isDrilldown ? 'MOH-711 Report' : 'All registers'}
        parentPath={isDrilldown ? '/moh-711' : '/?tab=registers'}
        title="MOH 407 Register"
        isLoading={isLoading}
        isEmpty={isGenerated && patientlist.length === 0}
        page={page}
        pageSize={pageSize}
        total={total}
        isTotalExact={isTotalExact}
        onPageChange={onPageChange}
        fetchAll={isGenerated ? fetchAll : undefined}
        columns={Moh407xportColumns}
      >
        {isGenerated && (
          <div className={styles.tableContainer}>
            <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
              <TableHead>
                <TableRow>
                  <TableHeader aria-rowspan={2}>Serial Number</TableHeader>
                  <TableHeader aria-rowspan={2}>Date</TableHeader>
                  <TableHeader aria-rowspan={2}>National Identification Number</TableHeader>
                  <TableHeader aria-rowspan={2}>Patient Names</TableHeader>
                  <TableHeader aria-rowspan={2}>Patient Visit</TableHeader>
                  <TableHeader aria-rowspan={2}>Residence</TableHeader>
                  <TableHeader aria-rowspan={2}>Sex</TableHeader>
                  <TableHeader colSpan={2}>Age</TableHeader>
                  <TableHeader aria-rowspan={2}>Pregnant or Breastfeeding</TableHeader>
                  <TableHeader>Nutritional Assessment</TableHeader>
                  <TableHeader aria-rowspan={2}>Nutrition Status</TableHeader>
                  <TableHeader aria-rowspan={2}>Serostatus</TableHeader>
                  <TableHeader aria-rowspan={2}>Medical Condition</TableHeader>
                  <TableHeader aria-rowspan={2}>Food Secure</TableHeader>
                  <TableHeader aria-rowspan={2}>Nutrition Intervention</TableHeader>
                  <TableHeader aria-rowspan={2}>Remarks</TableHeader>
                </TableRow>
                <TableRow>
                  <TableHeader>Years</TableHeader>
                  <TableHeader>Months</TableHeader>
                  <TableHeader>Figure for z score</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientlist.length > 0 ? (
                  patientlist.map((patient, index) => (
                    <TableRow key={patient.person_id || patient.id || index}>
                      {Moh407xportColumns.map((column, columnIndex) => (
                        <TableCell key={`${column.header}-${columnIndex}`}>
                          {String(column.value(patient, (page - 1) * pageSize + index) ?? '')}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={Moh407xportColumns.length}>No data available</TableCell>
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

export default Moh407RegisterComponent;
