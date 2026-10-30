import React, { useState } from 'react';
import { formatDate, useSession } from '@openmrs/esm-framework';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { hasReportData, ReportPlaceholder } from '../../common/report-placeholder';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';
import { getMoh645 } from '../../resources/moh-645.resource';

import styles from './moh-645.scss';

const STOCK_COLUMNS = [
  { letter: 'A', label: 'Beginning balance' },
  { letter: 'B', label: 'Quantity received' },
  { letter: 'C', label: 'Quantity dispensed' },
  { letter: 'D', label: 'Losses' },
  { letter: 'E', label: 'Positive adjustment' },
  { letter: 'F', label: 'Negative adjustment' },
  { letter: 'G', label: 'Physical count' },
  { letter: 'H', label: 'Expired' },
  { letter: 'I', label: 'Days stocked out' },
  { letter: 'J', label: 'Quantity to order' },
];

const COMMODITY_ROWS: Array<{ label: string; indicator?: string }> = [
  { label: 'RDT kits' },
  { label: 'AL 6s (5–14 kg)', indicator: 'qty_dispensed_al_6s' },
  { label: 'AL 12s (15–24 kg)', indicator: 'qty_dispensed_al_12s' },
  { label: 'AL 18s (25–34 kg)', indicator: 'qty_dispensed_al_18s' },
  { label: 'AL 24s (≥35 kg)', indicator: 'qty_dispensed_al_24s' },
  { label: 'Inj. Artesunate 60 mg (vials)', indicator: 'qty_dispensed_artesunate_vials' },
];

const WEIGHT_BAND_ROWS: Array<{ label: string; indicator: string }> = [
  { label: '5–14 kg (AL 6s)', indicator: 'patients_al_5_14kg' },
  { label: '15–24 kg (AL 12s)', indicator: 'patients_al_15_24kg' },
  { label: '25–34 kg (AL 18s)', indicator: 'patients_al_25_34kg' },
  { label: '≥35 kg (AL 24s)', indicator: 'patients_al_35kg' },
];

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

const Moh645Component: React.FC = () => {
  const [moh645Data, setMoh645Data] = useState<Record<string, any>>({});
  const isReportGenerated = hasReportData(moh645Data);
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

  const fetchMoh645ReportData = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setStartDate(startDate);
    setEndDate(endDate);

    try {
      const data = await getMoh645({
        locationUuids: locationUuids || '',
        startDate,
        endDate,
      });
      const rows = Array.isArray(data?.result) ? data.result : [];
      setMoh645Data(Object.assign({}, ...rows));
    } catch (error) {
      showReportError('the MOH-645 report', error);
    } finally {
      setIsLoading(false);
    }
  };

  useRestorePeriod(fetchMoh645ReportData);

  const openRegister = (indicator: string, label: string) => {
    const params = new URLSearchParams({
      startDate,
      endDate,
      locationUuids: locationUuids || '',
      indicators: indicator,
      label,
      from: 'moh-645',
    });
    navigate(`/moh-645-register?${params.toString()}`);
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-645 Report"
        mode="monthly"
        onGenerate={fetchMoh645ReportData}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={{ startDate, endDate }}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && <ReportPlaceholder reportName="MOH-645" />}
      {!isLoading && isReportGenerated && (
        <ReportPage>
          <div className={styles.headerContainer}>
            <div className={styles.mainTitleBox}>
              <h2 className={styles.mainTitle}>Ministry of Health</h2>
              <h3 className={styles.subTitle}>Malaria Commodities: Monthly Summary Form (MOH 645)</h3>
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
                <th className={styles.sectionHeader} colSpan={STOCK_COLUMNS.length + 1}>
                  Malaria commodities
                </th>
              </tr>
              <tr>
                <th>Commodity</th>
                {STOCK_COLUMNS.map((column) => (
                  <th key={column.letter} className={styles.rotateUp}>
                    {column.letter}. {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMMODITY_ROWS.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  {STOCK_COLUMNS.map((column) =>
                    column.letter === 'C' ? (
                      <ClickCell
                        key={column.letter}
                        value={row.indicator ? moh645Data[row.indicator] : null}
                        indicator={row.indicator}
                        label={`${row.label} — quantity dispensed`}
                        onOpen={openRegister}
                      />
                    ) : (
                      <td key={column.letter}></td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.sectionHeader} colSpan={2}>
                  Patients treated with AL by weight band
                </th>
              </tr>
              <tr>
                <th>Weight band</th>
                <th>Number of patients</th>
              </tr>
            </thead>
            <tbody>
              {WEIGHT_BAND_ROWS.map((row) => (
                <tr key={row.indicator}>
                  <td>{row.label}</td>
                  <ClickCell
                    value={moh645Data[row.indicator]}
                    indicator={row.indicator}
                    label={row.label}
                    onOpen={openRegister}
                  />
                </tr>
              ))}
            </tbody>
          </table>

          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.sectionHeader} colSpan={5}>
                  Malaria diagnostics
                </th>
              </tr>
              <tr>
                <th>Test</th>
                <th>Positive</th>
                <th>Negative</th>
                <th>Invalid</th>
                <th>Total tested</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Microscopy (blood smear)</td>
                <ClickCell
                  value={moh645Data.microscopy_positive}
                  indicator="microscopy_positive"
                  label="Microscopy positive"
                  onOpen={openRegister}
                />
                <ClickCell
                  value={moh645Data.microscopy_negative}
                  indicator="microscopy_negative"
                  label="Microscopy negative"
                  onOpen={openRegister}
                />
                <td></td>
                <ClickCell
                  value={moh645Data.microscopy_total_tested}
                  indicator="microscopy_total_tested"
                  label="Microscopy total tested"
                  onOpen={openRegister}
                />
              </tr>
              <tr>
                <td>mRDT</td>
                <ClickCell
                  value={moh645Data.rdt_positive}
                  indicator="rdt_positive"
                  label="mRDT positive"
                  onOpen={openRegister}
                />
                <ClickCell
                  value={moh645Data.rdt_negative}
                  indicator="rdt_negative"
                  label="mRDT negative"
                  onOpen={openRegister}
                />
                <ClickCell
                  value={moh645Data.rdt_invalid}
                  indicator="rdt_invalid"
                  label="mRDT invalid"
                  onOpen={openRegister}
                />
                <ClickCell
                  value={moh645Data.rdt_total_tested}
                  indicator="rdt_total_tested"
                  label="mRDT total tested"
                  onOpen={openRegister}
                />
              </tr>
              <tr>
                <td>Total</td>
                <ClickCell
                  value={moh645Data.diagnostics_total_positive}
                  indicator="diagnostics_total_positive"
                  label="Diagnostics total positive"
                  onOpen={openRegister}
                />
                <ClickCell
                  value={moh645Data.diagnostics_total_negative}
                  indicator="diagnostics_total_negative"
                  label="Diagnostics total negative"
                  onOpen={openRegister}
                />
                <td></td>
                <ClickCell
                  value={moh645Data.diagnostics_total_tested}
                  indicator="diagnostics_total_tested"
                  label="Diagnostics total tested"
                  onOpen={openRegister}
                />
              </tr>
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

export default Moh645Component;
