import React, { useState } from 'react';
import { formatDate, useSession } from '@openmrs/esm-framework';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { hasReportData, ReportPlaceholder } from '../../common/report-placeholder';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';
import { getMoh643 } from '../../resources/moh-643.resource';

import { COMMODITY_ROWS, STOCK_COLUMNS } from './moh-643.rows';
import styles from './moh-643.scss';

interface ClickCellProps {
  value?: number | string | null;
  indicator?: string;
  label: string;
  onOpen: (indicator: string, label: string) => void;
}

const ClickCell: React.FC<ClickCellProps> = ({ value, indicator, label, onOpen }) => {
  if (!indicator) {
    return <td></td>;
  }

  return (
    <td className={styles.clickable} onClick={() => onOpen(indicator, label)}>
      {value ?? 0}
    </td>
  );
};

const Moh643Component: React.FC = () => {
  const [moh643Data, setMoh643Data] = useState<Record<string, any>>({});
  const isReportGenerated = hasReportData(moh643Data);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;
  const facility = session?.sessionLocation?.display ?? '';
  const monthYear = startDate ? dayjs(startDate).format('MMMM YYYY') : '';
  const compiledBy = session?.user?.person?.display ?? session?.user?.display ?? '';
  const compiledOn = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

  const navigate = useNavigate();

  const fetchMoh643ReportData = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setStartDate(startDate);
    setEndDate(endDate);

    try {
      const data = await getMoh643({
        locationUuids: locationUuids || '',
        startDate,
        endDate,
      });
      const rows = Array.isArray(data?.result) ? data.result : [];
      setMoh643Data(Object.assign({}, ...rows));
    } catch (error) {
      showReportError('the MOH-643 report', error);
    } finally {
      setIsLoading(false);
    }
  };

  useRestorePeriod(fetchMoh643ReportData);

  const openRegister = (indicator: string, label: string) => {
    const params = new URLSearchParams({
      startDate,
      endDate,
      locationUuids: locationUuids || '',
      indicators: indicator,
      label,
      from: 'moh-643',
    });
    navigate(`/moh-643-register?${params.toString()}`);
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-643 Report"
        mode="monthly"
        onGenerate={fetchMoh643ReportData}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={{ startDate, endDate }}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && <ReportPlaceholder reportName="MOH-643" />}
      {!isLoading && isReportGenerated && (
        <ReportPage>
          <div className={styles.headerContainer}>
            <div className={styles.mainTitleBox}>
              <h2 className={styles.mainTitle}>Ministry of Health</h2>
              <h3 className={styles.subTitle}>Laboratory Commodities: Monthly Summary Form (MOH 643)</h3>
            </div>
          </div>

          <table className={styles.topMeta}>
            <tbody>
              <tr>
                <td>
                  Name of the facility: <strong>{facility}</strong>
                </td>
                <td>
                  MFL code: <strong></strong>
                </td>
                <td>
                  County: <strong></strong>
                </td>
                <td>
                  Sub County: <strong></strong>
                </td>
                <td>
                  Month/Year: <strong>{monthYear}</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.sectionHeader} colSpan={STOCK_COLUMNS.length + 2}>
                  Laboratory commodities
                </th>
              </tr>
              <tr>
                <th>Commodity</th>
                <th>Unit pack size</th>
                {STOCK_COLUMNS.map((column) => (
                  <th key={column.key} className={styles.rotateUp}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMMODITY_ROWS.map((row, index) => {
                if (row.kind === 'section') {
                  return (
                    <tr key={`section-${row.label}`}>
                      <td className={styles.sectionHeader} colSpan={STOCK_COLUMNS.length + 2}>
                        {row.label}
                      </td>
                    </tr>
                  );
                }
                if (row.kind === 'note') {
                  return (
                    <tr key={`note-${index}`} className={styles.noteRow}>
                      <td colSpan={STOCK_COLUMNS.length + 2}>{row.label}</td>
                    </tr>
                  );
                }

                const testsIndicator = row.slug ? `tests_${row.slug}` : undefined;
                const qtyIndicator = row.slug ? `qty_used_${row.slug}` : undefined;

                return (
                  <tr key={row.label}>
                    <td className={styles.commodity}>{row.label}</td>
                    <td className={styles.unit}>{row.unit}</td>
                    {STOCK_COLUMNS.map((column) => {
                      if (column.key === 'qty_used') {
                        return (
                          <ClickCell
                            key={column.key}
                            value={qtyIndicator ? moh643Data[qtyIndicator] : null}
                            indicator={qtyIndicator}
                            label={`${row.label} — quantity used`}
                            onOpen={openRegister}
                          />
                        );
                      }
                      if (column.key === 'tests_done') {
                        return (
                          <ClickCell
                            key={column.key}
                            value={testsIndicator ? moh643Data[testsIndicator] : null}
                            indicator={testsIndicator}
                            label={`${row.label} — tests done`}
                            onOpen={openRegister}
                          />
                        );
                      }
                      return <td key={column.key}></td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className={styles.signOff}>
            <span>
              Compiled by: Name <span className={styles.line}>{compiledBy}</span>
            </span>
            <span>
              Signature <span className={styles.line}></span>
            </span>
            <span>
              Phone no <span className={styles.shortLine}></span>
            </span>
            <span>
              Date <span className={styles.shortLine}>{compiledOn}</span>
            </span>
          </div>
        </ReportPage>
      )}
    </>
  );
};

export default Moh643Component;
