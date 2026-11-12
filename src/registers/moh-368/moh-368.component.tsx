import React, { useState } from 'react';

import styles from './moh-368.scss';
import classNames from 'classnames';
import { ReportFiltersComponent, type ReportPeriod } from '../../common/report-filters';
import { RegisterLayout, usePatientList } from '../../common/report-register';
import { getMoh368Register } from '../../resources/moh-713.resource';
import { useSearchParams } from 'react-router-dom';
import { useSession } from '@openmrs/esm-framework';
import { moh368ExportColumns } from './moh-368.columns';

interface MOH368ComponentProps {}
const MOH368Component: React.FC<MOH368ComponentProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const session = useSession();
  const [generatedPeriod, setGeneratedPeriod] = useState<{ startDate: string; endDate: string } | null>(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    return startDate && endDate ? { startDate, endDate } : null;
  });
  const isGenerated = Boolean(generatedPeriod);

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
      if (!generatedPeriod) {
        return Promise.resolve({ results: [], total: 0, isTotalExact: true });
      }

      return getMoh368Register({
        startDate: startDate ?? undefined,
        endDate: endDate ?? undefined,
        locationUuids,
        indicator: indicator ?? undefined,
        startIndex,
        limit,
      });
    },
    [startDate, endDate, locationUuids, indicator, generatedPeriod],
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
      <ReportFiltersComponent
        reportName="MOH-368 Register"
        mode="both"
        defaultTab="custom"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={Boolean(generatedPeriod)}
        generatedPeriod={generatedPeriod ?? undefined}
        backLink={{ label: 'All registers', to: '/?tab=registers' }}
      />
      <RegisterLayout
        parentLabel="All registers"
        parentPath="/?tab=registers"
        hideBreadcrumb
        title="MOH-368 Register"
        isLoading={isLoading}
        isEmpty={isGenerated && patientlist?.length === 0}
        page={page}
        pageSize={pageSize}
        total={total}
        isTotalExact={isTotalExact}
        onPageChange={onPageChange}
        fetchAll={isGenerated ? fetchAll : undefined}
        columns={moh368ExportColumns}
      >
        <h5 className={styles.mainTitleBox}>INPATIENT NUTRITION CARE REGISTER</h5>
        <div className={styles.tableContainer}>
          <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
            <thead>
              <tr>
                <th colSpan={13}>ADMISSION DETAILS</th>
                <th colSpan={4}>ADMISSION MEASUREMTS(admission day)</th>
                <th colSpan={4}>
                  WEIGHT(kg)MUAC
                  <br />
                  (cm)MONITORING
                </th>
              </tr>
              <tr>
                <th rowSpan={2}>No</th>
                <th rowSpan={2}>
                  Unique Nutrition Reg
                  <br />
                  Number
                </th>
                <th rowSpan={2}>Admission Date</th>
                <th rowSpan={2}>Client's Name</th>
                <th rowSpan={2}>Birth Notification Number</th>
                <th rowSpan={2}>Physical Address / County/Subcounty / Phone Number</th>
                <th rowSpan={2}>
                  Age
                  <br />
                  (Years)
                </th>
                <th rowSpan={2}>
                  Sex
                  <br />
                  (M/F)
                </th>
                <th rowSpan={2}>
                  In Household <br />
                  food security
                  <br />
                  programme[1]
                </th>
                <th rowSpan={2}>Admission criteria</th>
                <th rowSpan={2}>Type of admission</th>
                <th rowSpan={2}>Serostatus</th>
                <th rowSpan={2}>TB Status</th>
                <th rowSpan={2}>
                  Height/Length
                  <br />
                  (cm)
                </th>
                <th rowSpan={2}>Weight (Kg)</th>
                <th rowSpan={2}>WHZ score</th>
                <th rowSpan={2}>MUAC (cm)</th>
                <th colSpan={2}>Day 1</th>
                <th colSpan={2}>Day 2</th>
              </tr>
              <tr>
                <th>Weight</th>
                <th>MUAC</th>
                <th>Weight</th>
                <th>MUAC</th>
              </tr>
            </thead>
            <tbody>
              {patientlist?.length > 0 ? (
                patientlist?.map((patient, index) => (
                  <tr key={index}>
                    {moh368ExportColumns.map((column) => (
                      <td key={column.header}>{String(column.value(patient, index) ?? '')}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={moh368ExportColumns.length}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </RegisterLayout>
    </>
  );
};

export default MOH368Component;
