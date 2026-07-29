import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Layer, Pagination } from '@carbon/react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Document, Download } from '@carbon/react/icons';
import { formatDate } from '@openmrs/esm-framework';

import { formatIndicatorName } from '../../utils/format-indicator';
import { showReportError } from '../report-error';
import { columnsToCsv, downloadCsv, rowsToCsv } from './rows-to-csv';
import { type RegisterColumn } from './register-columns';
import { REPORT_PARENTS } from './report-parents';

import { RegisterSkeleton } from '../report-skeleton';
import styles from './register-layout.scss';

interface RegisterLayoutProps {
  /** The report this register was opened from, e.g. `MOH-731 Report` */
  parentLabel: string;
  /** Route back to that report, e.g. `/moh-731` */
  parentPath?: string;
  /**
   * Returns to the report in place, for a register that is a view on the
   * report's own route rather than a route of its own.
   *
   * MOH-740 toggles its registers in place, so there is nowhere to navigate:
   * a breadcrumb would link the page to itself. Given this, the trail is
   * replaced by a button that puts the report back.
   */
  onBack?: () => void;
  /** Register name, e.g. `HIV Care Treatment Daily Activity Register MOH 366` */
  title: string;
  isLoading: boolean;
  /** `true` once loaded with nothing to show */
  isEmpty: boolean;
  /** Paging state from `usePatientList` */
  page?: number;
  pageSize?: number;
  total?: number;
  /** `false` when the total is a lower bound the endpoint did not confirm */
  isTotalExact?: boolean;
  onPageChange?: (change: { page: number; pageSize: number }) => void;
  /** Every row across every page, used to build the export */
  fetchAll?: () => Promise<Array<Record<string, any>>>;
  /** The register's own columns. Without them the export falls back to the
      response's raw fields, which will not match the printed form. */
  columns?: RegisterColumn[];
  /** The register table. Optional: MOH 510 has no table implemented yet. */
  children?: React.ReactNode;
}

/**
 * The frame every drill-down register renders inside.
 *
 * Registers are opened from a value box on a report, so the trail back matters
 * more than a bare Back button: the breadcrumb shows where the figure came
 * from and lets the user step to either level. The table itself is wide -- the
 * MOH 366 register runs to 41 columns -- so it scrolls within the page rather
 * than forcing the whole layout sideways.
 */
const GENDERS: Record<string, string> = { M: 'Male', F: 'Female' };

const RegisterLayout: React.FC<RegisterLayoutProps> = ({
  parentLabel,
  parentPath,
  onBack,
  title,
  isLoading,
  isEmpty,
  page,
  pageSize,
  total,
  isTotalExact = true,
  onPageChange,
  fetchAll,
  columns,
  children,
}) => {
  /* The same register serves every indicator that links to it, so without this
     each drill-down looks identical no matter which box was clicked. */
  const [params] = useSearchParams();
  const [isExporting, setIsExporting] = React.useState(false);
  const indicator = params.get('indicator') ?? params.get('indicators');
  /* The report passes the row label it displayed, so the crumb reads the way
     the figure was labelled on the form. `formatIndicatorName` is the fallback
     for links made before the label was carried through. */
  const label = params.get('label');
  const gender = params.get('gender');
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');
  const locationUuids = params.get('locationUuids');

  /* Where the drill-down came from. Registers shared by two reports cannot
     name their parent as a constant, so the link says which one it was; the
     props remain the fallback for links made before it was carried. */
  const from = params.get('from');
  const parent = (from && REPORT_PARENTS[from]) || { label: parentLabel, path: parentPath ?? '' };

  /* The crumb has to carry the period, not just the path: a report that does
     not keep its figures in session storage regenerates from its URL, and
     linking to the bare path would land the user on the placeholder instead of
     the figures the register was opened from. */
  const parentQuery = new URLSearchParams();
  if (locationUuids) parentQuery.append('locationUuids', locationUuids);
  if (startDate) parentQuery.append('startDate', startDate);
  if (endDate) parentQuery.append('endDate', endDate);
  const parentLink = parentQuery.toString() ? `${parent.path}?${parentQuery}` : parent.path;

  const heading = label
    ? `${label}${gender && GENDERS[gender] ? ` (${GENDERS[gender]})` : ''}`
    : formatIndicatorName(indicator ?? '');

  /* Exports every page, not the one on screen: the DOM only holds the current
     page once paginated, so a scrape would silently export 50 of 2,000. */
  const exportCsv = async () => {
    if (!fetchAll) {
      return;
    }

    setIsExporting(true);

    try {
      const all = await fetchAll();
      const slug = [title, label ?? indicator, startDate, endDate]
        .filter(Boolean)
        .join('-')
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();

      downloadCsv(columns ? columnsToCsv(all, columns) : rowsToCsv(all), `${slug}.csv`);
    } catch (error) {
      showReportError('the register export', error);
    } finally {
      setIsExporting(false);
    }
  };

  const canExport = !isLoading && !isEmpty;
  const pageSizeOrDefault = pageSize ?? 50;

  const period =
    startDate && endDate
      ? `${formatDate(new Date(startDate), { mode: 'standard', time: false, noToday: true })} to ${formatDate(
          new Date(endDate),
          { mode: 'standard', time: false, noToday: true },
        )}`
      : null;

  return (
    <div className={styles.register}>
      {onBack ? (
        <div className={styles.breadcrumb}>
          <Button kind="ghost" size="sm" renderIcon={ArrowLeft} onClick={onBack} className={styles.back}>
            {parent.label}
          </Button>
          <h3 className={styles.title}>{heading || title}</h3>
        </div>
      ) : (
        <Breadcrumb noTrailingSlash className={styles.breadcrumb}>
          <BreadcrumbItem>
            <Link to="/">All reports</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={parentLink}>{parent.label}</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <h3 className={styles.title}>{heading || title}</h3>
          </BreadcrumbItem>
        </Breadcrumb>
      )}

      {/* Register, period and the export sit on one line: they all describe the
          table below, and splitting them stacked two sparse rows above it. */}
      {(indicator || period || canExport) && (
        <div className={styles.context}>
          {/* Register and period read as one caption for the table, so they
              share a panel rather than sitting as two loose fragments. */}
          <span className={styles.summary}>
            <span className={styles.summaryTitle}>{title}</span>
            <span className={styles.period}>
              {period && (
                <>
                  <Calendar size={14} />
                  {period}
                </>
              )}
              {typeof total === 'number' && total > 0 && (
                <span>{isTotalExact ? `${total.toLocaleString()} records` : `${total.toLocaleString()}+ records`}</span>
              )}
            </span>
          </span>
          {canExport && fetchAll && (
            <Button
              kind="tertiary"
              size="sm"
              renderIcon={Download}
              onClick={exportCsv}
              disabled={isExporting}
              className={styles.export}
            >
              {isExporting ? 'Preparing…' : 'Export CSV'}
            </Button>
          )}
        </div>
      )}

      {isLoading && <RegisterSkeleton />}

      {!isLoading && isEmpty && (
        <Layer className={styles.empty}>
          <Document size={32} className={styles.emptyIcon} />
          <h4>No records to list</h4>
          <p>No clients matched this indicator for the selected period and facility.</p>
        </Layer>
      )}

      {canExport && (
        <>
          <div className={styles.tableScroll}>{children}</div>
          {onPageChange && typeof total === 'number' && total > pageSizeOrDefault && (
            <Pagination
              className={styles.pagination}
              page={page}
              pageSize={pageSizeOrDefault}
              pageSizes={[25, 50, 100, 200]}
              totalItems={total}
              size="sm"
              onChange={onPageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RegisterLayout;
