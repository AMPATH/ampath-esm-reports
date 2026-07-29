import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ContentSwitcher,
  DatePicker,
  DatePickerInput,
  Layer,
  Select,
  SelectItem,
  Switch,
} from '@carbon/react';
import { Calendar, ChartColumn, Download, WarningAlt } from '@carbon/react/icons';
import classNames from 'classnames';
import dayjs from 'dayjs';

import {
  DATE_FORMAT,
  describePeriod,
  firstError,
  formatDate,
  formatMonth,
  monthToDateRange,
  validatePeriod,
} from './date-range';
import { type ReportFiltersProps } from './types';
import styles from './report-filters.scss';

const months = Array.from({ length: 12 }, (_, index) => ({
  value: String(index + 1).padStart(2, '0'),
  label: dayjs().month(index).format('MMMM'),
}));

const ReportFiltersComponent: React.FC<ReportFiltersProps> = ({
  reportName,
  mode = 'both',
  facilities,
  yearsBack = 6,
  isLoading = false,
  isReportGenerated = false,
  generatedPeriod,
  onGenerate,
  onPeriodChange,
}) => {
  /* A register's breadcrumb links back here carrying the period the report was
     generated for. Seeding the controls from it matters as much as restoring
     the figures: left on their defaults the bar would compare last month
     against the restored period and warn that figures are stale on arrival. */
  const [params] = useSearchParams();
  const urlStart = params.get('startDate');
  const urlEnd = params.get('endDate');
  const urlMonth = params.get('month');

  /* A period covering exactly one calendar month came from the Monthly tab,
     however it is spelled in the URL. */
  const urlWholeMonth =
    urlMonth ??
    (urlStart &&
    urlEnd &&
    dayjs(urlStart).isSame(dayjs(urlStart).startOf('month'), 'day') &&
    dayjs(urlEnd).isSame(dayjs(urlStart).endOf('month'), 'day')
      ? dayjs(urlStart).format('YYYY-MM')
      : null);

  const [activeTab, setActiveTab] = React.useState<'monthly' | 'custom'>(
    urlStart && urlEnd && !urlWholeMonth ? 'custom' : 'monthly',
  );

  const [startDateString, setStartDateString] = React.useState<string>(() => urlStart ?? formatDate(new Date()));
  const [endDateString, setEndDateString] = React.useState<string>(() => urlEnd ?? formatDate(new Date()));
  const [monthString, setMonthString] = React.useState<string>(
    () => urlWholeMonth ?? formatMonth(dayjs().subtract(1, 'month')),
  );

  const [selectedFacility, setSelectedFacility] = React.useState<string>('');

  const [selectedYear, selectedMonth] = monthString.split('-');

  /** Recomputed per render so a session open across New Year still offers this year */
  const years = React.useMemo(
    () => Array.from({ length: yearsBack }, (_, index) => String(dayjs().year() - index)),
    [yearsBack],
  );

  const showsSwitcher = mode === 'both';
  const usesDateRange = mode === 'range' || (showsSwitcher && activeTab === 'custom');
  const usesMonth = mode === 'monthly' || (showsSwitcher && activeTab === 'monthly');

  const dateRange = React.useMemo(
    () => [dayjs(startDateString).toDate(), dayjs(endDateString).toDate()],
    [startDateString, endDateString],
  );

  const period = React.useMemo(() => {
    const month = usesDateRange ? undefined : monthString;
    const { startDate, endDate } = month
      ? monthToDateRange(month)
      : { startDate: startDateString, endDate: endDateString };

    return {
      startDate,
      endDate,
      month,
      facility: facilities ? selectedFacility : undefined,
      label: describePeriod(startDate, endDate, month),
    };
  }, [usesDateRange, monthString, startDateString, endDateString, facilities, selectedFacility]);

  /* What the report currently on screen was generated for, so a change to the
     filters can be called out rather than silently leaving stale figures up. */
  const [generatedFor, setGeneratedFor] = React.useState<{ key: string; label: string } | null>(null);

  const errors = React.useMemo(
    () =>
      validatePeriod({
        usesDateRange,
        year: selectedYear,
        month: selectedMonth,
        startDate: startDateString,
        endDate: endDateString,
      }),
    [usesDateRange, selectedYear, selectedMonth, startDateString, endDateString],
  );
  const isValid = Object.keys(errors).length === 0;

  /* Reported on change so a report can label its form with the chosen period
     before any figures exist for it. */
  React.useEffect(() => {
    onPeriodChange?.(period);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const periodKey = `${period.startDate}|${period.endDate}|${period.facility ?? ''}`;

  /* Falls back to the period the caller says is on screen, which is what makes
     the warning work after a reload rather than only after a generate. */
  const shownPeriod =
    generatedFor ??
    (generatedPeriod?.startDate && generatedPeriod?.endDate
      ? {
          key: `${generatedPeriod.startDate}|${generatedPeriod.endDate}|`,
          label: describePeriod(generatedPeriod.startDate, generatedPeriod.endDate),
        }
      : null);

  const isStale = isReportGenerated && shownPeriod !== null && shownPeriod.key !== periodKey;

  const handleGenerate = () => {
    if (!isValid) {
      return;
    }

    setGeneratedFor({ key: periodKey, label: period.label });
    onGenerate(period);
  };

  /** Only commit a complete range, so re-rendering does not interrupt the second pick */
  const handleDateRangeChange = (dates: Array<Date>) => {
    const [start, end] = dates;

    if (start && end) {
      setStartDateString(dayjs(start).format(DATE_FORMAT));
      setEndDateString(dayjs(end).format(DATE_FORMAT));
    }
  };

  const dateRangePicker = (
    <DatePicker
      datePickerType="range"
      dateFormat="d/m/Y"
      maxDate={new Date()}
      value={dateRange}
      onChange={handleDateRangeChange}
      className={styles.datePicker}
    >
      <DatePickerInput
        id="report-start-date"
        labelText="Start date"
        placeholder="dd/mm/yyyy"
        size="sm"
        invalid={Boolean(errors.startDate)}
        invalidText={errors.startDate}
      />
      <DatePickerInput
        id="report-end-date"
        labelText="End date"
        placeholder="dd/mm/yyyy"
        size="sm"
        invalid={Boolean(errors.endDate)}
        invalidText={errors.endDate}
      />
    </DatePicker>
  );

  return (
    <div className={styles.filters}>
      <Breadcrumb noTrailingSlash className={styles.breadcrumb}>
        <BreadcrumbItem>
          <Link to="/">All reports</Link>
        </BreadcrumbItem>
        {/* The report name doubles as the page heading, so it stays an `h3`
            rather than being repeated in a separate title row. */}
        <BreadcrumbItem isCurrentPage>
          <h3 className={styles.title}>{reportName}</h3>
        </BreadcrumbItem>
      </Breadcrumb>

      <Layer className={styles.filtersContainer}>
        <div className={styles.fields}>
          {showsSwitcher && (
            <div className={classNames(styles.field, styles.periodField)}>
              <span className={styles.fieldLabel}>Period type</span>
              <ContentSwitcher
                selectedIndex={activeTab === 'monthly' ? 0 : 1}
                onChange={({ index }) => setActiveTab(index === 0 ? 'monthly' : 'custom')}
                size="sm"
                className={styles.switcher}
              >
                <Switch name="monthly" text="Monthly" />
                <Switch name="custom" text="Custom range" />
              </ContentSwitcher>
            </div>
          )}

          {usesMonth && (
            <>
              <Select
                id="report-year"
                labelText="Year"
                size="sm"
                className={classNames(styles.field, styles.yearField)}
                invalid={Boolean(errors.year)}
                invalidText={errors.year}
                value={selectedYear}
                onChange={(event) => setMonthString(`${event.target.value}-${selectedMonth}`)}
              >
                {years.map((year) => (
                  <SelectItem key={year} value={year} text={year} />
                ))}
              </Select>
              <Select
                id="report-month"
                labelText="Month"
                size="sm"
                className={classNames(styles.field, styles.monthField)}
                invalid={Boolean(errors.month)}
                invalidText={errors.month}
                value={selectedMonth}
                onChange={(event) => setMonthString(`${selectedYear}-${event.target.value}`)}
              >
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value} text={month.label} />
                ))}
              </Select>
            </>
          )}

          {usesDateRange && <div className={classNames(styles.field, styles.rangeField)}>{dateRangePicker}</div>}

          {facilities && (
            <Select
              id="report-facility"
              labelText="Facility"
              size="sm"
              className={styles.field}
              value={selectedFacility}
              onChange={(event) => setSelectedFacility(event.target.value)}
            >
              <SelectItem value="" text="All facilities" />
              {facilities.map((facility) => (
                <SelectItem key={facility.value} value={facility.value} text={facility.label} />
              ))}
            </Select>
          )}
        </div>

        <div className={styles.actions}>
          {/* Restating a period that cannot be generated reads as if it will be,
              so the blocking reason takes its place. */}
          {isValid && isStale ? (
            <p className={classNames(styles.summary, styles.summaryStale)}>
              <WarningAlt size={16} />
              Filters changed. The report below is for <strong>{shownPeriod?.label}</strong> &mdash; select Generate
              report to refresh it.
            </p>
          ) : isValid ? (
            <p className={styles.summary}>
              <Calendar size={16} />
              Reporting period: <strong>{period.label}</strong>
            </p>
          ) : (
            <p className={classNames(styles.summary, styles.summaryInvalid)}>
              <WarningAlt size={16} />
              {firstError(errors)}
            </p>
          )}
          <div className={styles.actionButtons}>
            {/* Only offered once there is something on screen to put on paper */}
            {isReportGenerated && !isLoading && (
              <Button kind="tertiary" size="sm" renderIcon={Download} onClick={() => window.print()}>
                Download PDF
              </Button>
            )}
            <Button size="sm" renderIcon={ChartColumn} onClick={handleGenerate} disabled={isLoading || !isValid}>
              {isLoading ? 'Generating…' : 'Generate report'}
            </Button>
          </div>
        </div>
      </Layer>
    </div>
  );
};

export default ReportFiltersComponent;
