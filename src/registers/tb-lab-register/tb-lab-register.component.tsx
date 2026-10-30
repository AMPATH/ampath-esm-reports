import React, { useState } from 'react';
import { Button, Layer, Pagination } from '@carbon/react';
import { Document, Download } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { ReportSkeleton } from '../../common/report-skeleton';
import { columnsToCsv, downloadCsv, usePatientList } from '../../common/report-register';
import { getMoh706PatientList } from '../../resources/moh-706.resource';
import TbLabRegisterTable from './tb-lab-register-table.component';
import { tbLabCsvColumns, type TbLabRow } from './tb-lab-register.columns';
import styles from './tb-lab-register-table.scss';

/**
 * TB Laboratory Register, opened from the landing page's Registers tab. It
 * shares the reports' filter bar and renders the printed template -- the
 * two-tier header over the appearance and microscopy columns -- from the
 * existing lab-706 dataset: rows come back filtered by the `total_tb_smear`
 * indicator (the MOH 706 5.29 filter) until the ETL layer carries the rest of
 * the TB workload, and the columns the dataset does not carry yet read blank.
 */
const TbLabRegister: React.FC = () => {
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
  const [isExporting, setIsExporting] = useState(false);
  /* A fetch that failed leaves the page on the placeholder rather than showing
     an empty register, so the two are told apart here. */
  const [hasError, setHasError] = useState(false);

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  /* Only a register for the current location counts */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('tbLabRegisterLocation');
  const isGenerated = Boolean(period.startDate && period.endDate) && isForCurrentLocation && !hasError;

  const { rows, total, isTotalExact, isLoading, page, pageSize, onPageChange, fetchAll } = usePatientList(
    ({ startIndex, limit }) => {
      /* Nothing is fetched before a period is chosen: the mount-time load and
         an unset session land here rather than querying the endpoint's defaults. */
      if (!period.startDate || !period.endDate) {
        return Promise.resolve({ results: [], total: 0, isTotalExact: true });
      }

      return getMoh706PatientList({
        locationUuids,
        startDate: period.startDate,
        endDate: period.endDate,
        indicators: 'total_tb_smear',
        startIndex,
        limit,
      }).then(
        (result) => {
          setHasError(false);
          return result;
        },
        (error) => {
          setHasError(true);
          throw error;
        },
      );
    },
    [locationUuids, period.startDate, period.endDate],
  );

  const generate = ({ startDate, endDate }: ReportPeriod) => {
    setHasError(false);
    setPeriod({ startDate, endDate });
    markGenerated(locationUuids);
  };

  useRestorePeriod(generate);

  /* Exports every page, not the one on screen: with pagination the DOM only
     holds one page, and the file must match the printed register. */
  const exportCsv = async () => {
    setIsExporting(true);

    try {
      const all: TbLabRow[] = await fetchAll();
      const slug = ['tb-laboratory-register', period.startDate, period.endDate].filter(Boolean).join('-').toLowerCase();
      downloadCsv(columnsToCsv(all, tbLabCsvColumns()), `${slug}.csv`);
    } catch (error) {
      showReportError('the register export', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="TB Laboratory Register"
        mode="both"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={isGenerated}
        generatedPeriod={period}
        defaultTab="custom"
        backLink={{ label: 'All registers', to: '/?tab=registers' }}
      />
      {isGenerated && isLoading && rows.length === 0 && <ReportSkeleton />}
      {isGenerated && !isLoading && (
        <>
          <div className={styles.toolbar}>
            <span className={styles.total}>
              {total.toLocaleString()}
              {isTotalExact ? '' : '+'} records
            </span>
            <Button kind="tertiary" size="sm" renderIcon={Download} onClick={exportCsv} disabled={isExporting}>
              {isExporting ? 'Preparing…' : 'Export CSV'}
            </Button>
          </div>
          {rows.length > 0 ? (
            <>
              <TbLabRegisterTable
                rows={rows}
                facility={session?.sessionLocation?.display ?? ''}
                startDate={period.startDate}
                endDate={period.endDate}
              />
              {typeof total === 'number' && total > pageSize && (
                <Pagination
                  className={styles.pager}
                  page={page}
                  pageSize={pageSize}
                  pageSizes={[25, 50, 100, 200]}
                  totalItems={total}
                  size="sm"
                  onChange={onPageChange}
                />
              )}
            </>
          ) : (
            <Layer className={styles.empty}>
              <Document size={32} className={styles.emptyIcon} />
              <h4>No records to list</h4>
              <p>No TB laboratory entries matched the selected period and facility.</p>
            </Layer>
          )}
        </>
      )}
      {!isGenerated && (
        <ReportPlaceholder
          reportName="TB laboratory register"
          isLocationChanged={Boolean(period.startDate) && hasLocationChanged}
        />
      )}
    </>
  );
};

export default TbLabRegister;
