import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Layer } from '@carbon/react';
import { Calendar, Location } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { downloadSheetsPdf } from '../../common/report-page';
import { showReportError } from '../../common/report-error';
import { ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { ReportSkeleton } from '../../common/report-skeleton';
import { FacilityClinics, useFacility } from '../../common/report-header';
import { type ReportDefinition } from '../../dashboard/report-catalog';
import { getQualityImprovement, type QualityImprovementCounts } from '../../resources/quality-improvement.resource';
import {
  QUALITY_AREAS,
  QUALITY_IMPROVEMENT_LINELIST_PATH,
  type QualityArea,
  type QualityIndicator,
} from './quality-improvement.config';
import styles from './quality-improvement.scss';

interface QualityImprovementReportProps {
  report: ReportDefinition;
}

/**
 * Quality Improvement Report (Reports tab → Quality Improvement Reports): for
 * the month chosen, at the session location's whole facility, how many
 * clients need each action -- linking, PrEP, partner testing, viral load,
 * adherence, tracing, OTZ and the HEI follow-ups -- by area. Each count opens
 * the list of its clients.
 */
const QualityImprovementReport: React.FC<QualityImprovementReportProps> = ({ report }) => {
  const [result, setResult] = useState<QualityImprovementCounts | null>(null);
  const counts = result?.counts ?? null;
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
  const sheetRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  /* the counts cover the session location's whole facility, so it is named by its parent location (MTRH) */
  const facilityDetails = useFacility(locationUuids, session?.sessionLocation?.display ?? '');
  const facility = facilityDetails.name;
  const { isForCurrentLocation, hasLocationChanged, markGenerated } =
    useGeneratedLocation('qualityImprovementLocation');
  const isReportGenerated = counts !== null && isForCurrentLocation;

  const generate = useCallback(
    async ({ startDate, endDate }: ReportPeriod) => {
      setIsLoading(true);
      setPeriod({ startDate, endDate });
      try {
        setResult(await getQualityImprovement({ locationUuids, startDate, endDate }));
        markGenerated(locationUuids);
      } catch (error) {
        showReportError('the Quality Improvement report', error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locationUuids],
  );

  useRestorePeriod(generate);

  const open = (indicator: QualityIndicator) => {
    const params = new URLSearchParams({
      i: indicator.id,
      label: indicator.name,
      startDate: period.startDate,
      endDate: period.endDate,
      locationUuids,
    });
    navigate(`${QUALITY_IMPROVEMENT_LINELIST_PATH}?${params}`);
  };

  /* the period, as the filter bar names it: `October 2026`, or its dates */
  const isWholeMonth =
    Boolean(period.startDate) &&
    dayjs(period.startDate).isSame(dayjs(period.startDate).startOf('month'), 'day') &&
    dayjs(period.endDate).isSame(dayjs(period.startDate).endOf('month'), 'day');
  const periodLabel = !period.endDate
    ? ''
    : isWholeMonth
      ? dayjs(period.endDate).format('MMMM YYYY')
      : `${dayjs(period.startDate).format('DD-MMM-YYYY')} to ${dayjs(period.endDate).format('DD-MMM-YYYY')}`;
  /* the month's end the status counts are for, when it is not the period's own */
  const statusMonth = result?.statusMonth ? dayjs(result.statusMonth).format('DD-MMM-YYYY') : '';
  const statusIsPeriodEnd = Boolean(result?.statusMonth) && result?.statusMonth === period.endDate;
  const fileName = [
    'Quality-Improvement',
    facility,
    isWholeMonth ? period.endDate.slice(0, 7) : `${period.startDate}_${period.endDate}`,
  ]
    .filter(Boolean)
    .join('_')
    .replace(/[^a-z0-9_-]+/gi, '-');

  const countOf = (indicator: QualityIndicator) => (indicator.pending ? null : Number(counts?.[indicator.id] ?? 0));

  /* Download PDF saves the sheet as one A4 page */
  const downloadPdf = async () => {
    if (sheetRef.current) {
      await downloadSheetsPdf([sheetRef.current], `${fileName}.pdf`);
    }
  };

  const renderCount = (indicator: QualityIndicator) => {
    const amount = countOf(indicator);
    if (amount === null) {
      return <span className={styles.pending}>Not available</span>;
    }
    if (amount === 0) {
      return <span className={styles.none}>0</span>;
    }
    return (
      <button
        type="button"
        className={styles.count}
        onClick={() => open(indicator)}
        title={`List the ${amount.toLocaleString()} clients`}
      >
        {amount.toLocaleString()}
      </button>
    );
  };

  const renderArea = (area: QualityArea) => (
    <tbody key={area.id} data-tone={area.tone}>
      {area.indicators.map((indicator, index) => (
        <tr key={indicator.id}>
          {index === 0 && (
            <th scope="rowgroup" rowSpan={area.indicators.length} className={styles.areaCell}>
              <span className={styles.areaName}>{area.title}</span>
              <span className={styles.areaDescription}>{area.description}</span>
            </th>
          )}
          <td className={styles.codeCell}>
            <span className={styles.code}>{indicator.code}</span>
          </td>
          <th scope="row" className={styles.indicatorCell}>
            <span className={styles.indicatorName}>{indicator.name}</span>
            <span className={styles.indicatorDescription}>{indicator.description}</span>
          </th>
          <td className={styles.countCell}>{renderCount(indicator)}</td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <>
      <ReportFiltersComponent
        reportName={report.name}
        /* a month, or any dates: the indicators of a client's status on ART
           read the end of the month the period ends in */
        mode="both"
        defaultTab="monthly"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={period}
        onDownloadPdf={downloadPdf}
        backLink={{ label: 'Quality Improvement Reports', to: '/?group=quality-improvement' }}
      />
      {isLoading && <ReportSkeleton blocks={2} />}
      {!isLoading && !isReportGenerated && (
        <ReportPlaceholder reportName={report.name} isLocationChanged={counts !== null && hasLocationChanged} />
      )}
      {!isLoading && isReportGenerated && (
        <Layer as="section" className={styles.sheet} ref={sheetRef}>
          <header className={styles.masthead}>
            <div>
              <h4 className={styles.title}>Quality Improvement Report</h4>
              <p className={styles.subtitle}>Clients needing action, by area. Select a count to list its clients.</p>
            </div>
            <p className={styles.meta}>
              <span className={styles.metaItem}>
                <Location size={14} />
                <FacilityClinics name={facility} clinics={facilityDetails.clinics} />
              </span>
              <span className={styles.metaItem}>
                <Calendar size={14} />
                {periodLabel}
              </span>
            </p>
          </header>
          <table className={styles.table} aria-label="Quality improvement indicators">
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Code</th>
                <th scope="col">Indicator</th>
                <th scope="col" className={styles.countHead}>
                  Clients
                </th>
              </tr>
            </thead>
            {QUALITY_AREAS.map(renderArea)}
          </table>
          <p className={styles.note}>
            Counts are for the whole facility. Viral load, EAC, defaulter and OTZ counts are each client&rsquo;s status
            on ART at the month&rsquo;s end{statusIsPeriodEnd ? '' : ` (${statusMonth})`}; the rest are for the period.
            The VL ≥200 count includes those of 1000 and over.
          </p>
        </Layer>
      )}
    </>
  );
};

export default QualityImprovementReport;
