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
import { MOH_240_SUB_HEADERS, moh240Columns } from '../../reports/moh-240/moh-240.columns';
import MOH240Header from '../../reports/moh-240/moh-240-header.component';
import sheetStyles from '../../reports/moh-240/moh-240.scss';
import Moh240PageSummary from '../../reports/moh-240/sub-reports/page-summary.component';
import Moh240Register from '../../reports/moh-240/sub-reports/moh-240-register.component';
import styles from './moh-240-register.scss';

/** The register's own columns (A-AA). No drill-down indicator runs here, so the
    results column reads the row's translated `results` field. */
const columns = moh240Columns('');

/**
 * Laboratory (LAB) Register MOH 240, opened from the landing page's Registers
 * tab. It shares the reports' filter bar and serves the same printed register
 * -- masthead, columns A-AA and the page summary -- that the MOH 505 and
 * MOH 706 drill-downs open, but over the laboratory's whole workload for the
 * period rather than one indicator's rows.
 */
const Moh240LabRegister: React.FC = () => {
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
  const [isExporting, setIsExporting] = useState(false);
  /* A fetch that failed leaves the page on the placeholder rather than showing
     an empty register, so the two are told apart here. */
  const [hasError, setHasError] = useState(false);

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  /* Only a register for the current location counts */
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh240RegisterLocation');
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
     holds one page, and the file must match the printed form column for column. */
  const exportCsv = async () => {
    setIsExporting(true);

    try {
      const all = await fetchAll();
      const slug = ['laboratory-lab-register-moh-240', period.startDate, period.endDate]
        .filter(Boolean)
        .join('-')
        .toLowerCase();
      downloadCsv(columnsToCsv(all, columns, { subHeaderRow: MOH_240_SUB_HEADERS }), `${slug}.csv`);
    } catch (error) {
      showReportError('the register export', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="Laboratory (LAB) Register MOH 240"
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
              <div className={sheetStyles.sheet}>
                <MOH240Header
                  facility={session?.sessionLocation?.display ?? ''}
                  startDate={period.startDate}
                  endDate={period.endDate}
                />
                <Moh240Register patientList={rows} />
                <Moh240PageSummary rows={rows} />
              </div>
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
              <p>No laboratory entries matched the selected period and facility.</p>
            </Layer>
          )}
        </>
      )}
      {!isGenerated && (
        <ReportPlaceholder
          reportName="MOH 240 laboratory register"
          isLocationChanged={Boolean(period.startDate) && hasLocationChanged}
        />
      )}
    </>
  );
};

export default Moh240LabRegister;
