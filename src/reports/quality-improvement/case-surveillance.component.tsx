import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { Layer, Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react';
import { Calendar, Location } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { downloadSheetsPdf } from '../../common/report-page';
import { showReportError } from '../../common/report-error';
import { ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { ReportSkeleton } from '../../common/report-skeleton';
import { FacilityClinics, useFacility } from '../../common/report-header';
import { type ReportDefinition } from '../../dashboard/report-catalog';
import { type CaseSurveillanceCard, getCaseSurveillance } from '../../resources/quality-improvement.resource';
import {
  CASE_SURVEILLANCE_CARDS,
  GAP_ALERT_PERCENT,
  type CaseSurveillanceCardDefinition,
} from './case-surveillance.config';
import { QUALITY_IMPROVEMENT_LINELIST_PATH } from './quality-improvement.config';
import styles from './case-surveillance.scss';

interface CaseSurveillanceReportProps {
  report: ReportDefinition;
}

/** A share of the denominator, to one decimal; 0 when there is none */
const percentOf = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 1000) / 10 : 0);

/**
 * Case Surveillance Report (Reports tab → Quality Improvement Reports), as the
 * POC's case surveillance dashboard lays it out: for the period chosen, at the
 * session location's whole facility, a card per gap -- the clients needing an
 * action out of those it applies to, and its share, flagged red at 25% or
 * more -- and a progress tracker of what has been done. Either figure opens
 * the list of its clients.
 */
const CaseSurveillanceReport: React.FC<CaseSurveillanceReportProps> = ({ report }) => {
  const [result, setResult] = useState<{ statusMonth: string; cards: Record<string, CaseSurveillanceCard> } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
  const sheetRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  /* the figures cover the session location's whole facility, so it is named by its parent location (MTRH) */
  const facilityDetails = useFacility(locationUuids, session?.sessionLocation?.display ?? '');
  const facility = facilityDetails.name;
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('caseSurveillanceLocation');
  const isReportGenerated = result !== null && isForCurrentLocation;

  const generate = useCallback(
    async ({ startDate, endDate }: ReportPeriod) => {
      setIsLoading(true);
      setPeriod({ startDate, endDate });
      try {
        setResult(await getCaseSurveillance({ locationUuids, startDate, endDate }));
        markGenerated(locationUuids);
      } catch (error) {
        showReportError('the Case Surveillance report', error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locationUuids],
  );

  useRestorePeriod(generate);

  /* the list behind a figure, which leads back here */
  const open = (indicator: string, label: string) => {
    const params = new URLSearchParams({
      i: indicator,
      label,
      startDate: period.startDate,
      endDate: period.endDate,
      locationUuids,
      from: 'case-surveillance',
    });
    navigate(`${QUALITY_IMPROVEMENT_LINELIST_PATH}?${params}`);
  };

  const isWholeMonth =
    Boolean(period.startDate) &&
    dayjs(period.startDate).isSame(dayjs(period.startDate).startOf('month'), 'day') &&
    dayjs(period.endDate).isSame(dayjs(period.startDate).endOf('month'), 'day');
  const periodLabel = !period.endDate
    ? ''
    : isWholeMonth
      ? dayjs(period.endDate).format('MMMM YYYY')
      : `${dayjs(period.startDate).format('DD-MMM-YYYY')} to ${dayjs(period.endDate).format('DD-MMM-YYYY')}`;
  const statusMonth = result?.statusMonth ? dayjs(result.statusMonth).format('DD-MMM-YYYY') : '';
  const fileName = [
    'Case-Surveillance',
    facility,
    isWholeMonth ? period.endDate.slice(0, 7) : `${period.startDate}_${period.endDate}`,
  ]
    .filter(Boolean)
    .join('_')
    .replace(/[^a-z0-9_-]+/gi, '-');

  /* Download PDF saves the sheet, on the tab showing, as one A4 landscape page */
  const downloadPdf = async () => {
    if (sheetRef.current) {
      await downloadSheetsPdf([sheetRef.current], `${fileName}.pdf`, { orientation: 'landscape' });
    }
  };

  const figure = (amount: number, indicator: string, label: string, className: string) =>
    amount > 0 ? (
      <button
        type="button"
        className={classNames(styles.figure, className)}
        onClick={() => open(indicator, label)}
        title={`List the ${amount.toLocaleString()} clients`}
      >
        {amount.toLocaleString()}
      </button>
    ) : (
      <span className={classNames(styles.figure, className)}>0</span>
    );

  /* a card's figures: the gap, the clients it applies to and its share; red at 25% or more */
  const figuresOf = (definition: CaseSurveillanceCardDefinition) => {
    const card = result?.cards[definition.id];
    const numerator = Number(card?.numerator ?? 0);
    const denominator = Number(card?.denominator ?? 0);
    const percent = percentOf(numerator, denominator);
    return { card, numerator, denominator, percent, isAlert: percent >= GAP_ALERT_PERCENT };
  };

  const renderGapCard = (definition: CaseSurveillanceCardDefinition) => {
    const { card, numerator, denominator, percent, isAlert } = figuresOf(definition);
    return (
      <article key={definition.id} className={classNames(styles.card, isAlert ? styles.alert : styles.good)}>
        <header className={styles.cardHeader}>
          <h5 className={styles.cardTitle}>{definition.title}</h5>
          <span className={styles.status}>{isAlert ? 'Needs action' : 'On track'}</span>
        </header>
        <div className={styles.cardValue}>
          <span className={styles.figures}>
            {figure(numerator, card?.numeratorIndicator ?? '', definition.title, styles.numerator)}
            <span className={styles.slash}>/</span>
            {figure(
              denominator,
              card?.denominatorIndicator ?? '',
              `${definition.title} - all clients`,
              styles.denominator,
            )}
          </span>
          <span className={styles.percent}>{percent}%</span>
        </div>
        {/* the gap's share of the clients it applies to */}
        <div className={styles.gapTrack} aria-hidden="true">
          <div className={styles.gapBar} style={{ width: `${Math.min(percent, 100)}%` }} />
        </div>
        <p className={styles.cardDescription}>{definition.description}</p>
      </article>
    );
  };

  const renderProgress = (definition: CaseSurveillanceCardDefinition) => {
    const { numerator, denominator, isAlert } = figuresOf(definition);
    const done = Math.max(denominator - numerator, 0);
    const percent = percentOf(done, denominator);
    return (
      <li key={definition.id} className={classNames(styles.progressRow, isAlert ? styles.alert : styles.good)}>
        <div className={styles.progressLabel}>
          <span className={styles.progressTitle}>{definition.title}</span>
          <span className={styles.progressCount}>
            {definition.achieved}: <strong>{done.toLocaleString()}</strong> of {denominator.toLocaleString()}
          </span>
        </div>
        <div
          className={styles.track}
          role="progressbar"
          aria-label={definition.title}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div className={styles.bar} style={{ width: `${percent}%` }} />
        </div>
        <span className={styles.progressPercent}>{denominator > 0 ? `${percent}%` : '—'}</span>
      </li>
    );
  };

  return (
    <>
      <ReportFiltersComponent
        reportName={report.name}
        /* a month, or any dates: the viral load cards read the end of the month the period ends in */
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
        <ReportPlaceholder reportName={report.name} isLocationChanged={result !== null && hasLocationChanged} />
      )}
      {!isLoading && isReportGenerated && (
        <Layer as="section" className={styles.sheet} ref={sheetRef}>
          <header className={styles.masthead}>
            <div>
              <h4 className={styles.title}>Case Surveillance Report</h4>
              <p className={styles.subtitle}>
                Gaps in care, out of the clients each applies to. Select a figure to list its clients.
              </p>
            </div>
            <p className={styles.meta}>
              <span className={styles.metaItem}>
                <Location size={12} />
                <FacilityClinics name={facility} clinics={facilityDetails.clinics} />
              </span>
              <span className={styles.metaItem}>
                <Calendar size={12} />
                {periodLabel}
              </span>
            </p>
          </header>
          <Tabs>
            <TabList aria-label="Case surveillance views" className={styles.tabs}>
              <Tab>Realtime gap review</Tab>
              <Tab>Progress tracker</Tab>
            </TabList>
            <TabPanels>
              <TabPanel className={styles.panel}>
                <div className={styles.cardGrid}>{CASE_SURVEILLANCE_CARDS.map(renderGapCard)}</div>
              </TabPanel>
              <TabPanel className={styles.panel}>
                <ul className={styles.progressList}>{CASE_SURVEILLANCE_CARDS.map(renderProgress)}</ul>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <p className={styles.note}>
            Figures are for the whole facility. The viral load and EAC cards are each client&rsquo;s status on ART at
            the month&rsquo;s end ({statusMonth}); the rest are for the period. A gap of {GAP_ALERT_PERCENT}% or more
            needs action.
          </p>
        </Layer>
      )}
    </>
  );
};

export default CaseSurveillanceReport;
