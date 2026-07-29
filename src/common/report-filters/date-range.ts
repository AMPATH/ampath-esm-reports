import dayjs from 'dayjs';

/** The wire format every report resource expects for dates */
export const DATE_FORMAT = 'YYYY-MM-DD';

/** The format the month dropdown round-trips through */
export const MONTH_FORMAT = 'YYYY-MM';

export function formatDate(date: dayjs.ConfigType): string {
  return dayjs(date).format(DATE_FORMAT);
}

export function formatMonth(date: dayjs.ConfigType): string {
  return dayjs(date).format(MONTH_FORMAT);
}

/**
 * Expands `YYYY-MM` into the first and last day of that month.
 *
 * Parsed in local time on purpose: reporting periods are calendar months at the
 * facility, so a UTC parse would shift the boundaries for facilities east of
 * Greenwich and pull a day of data in from the neighbouring month.
 */
export function monthToDateRange(month: string): { startDate: string; endDate: string } {
  const start = dayjs(`${month}-01`).startOf('month');

  return {
    startDate: start.format(DATE_FORMAT),
    endDate: start.endOf('month').format(DATE_FORMAT),
  };
}

export function describePeriod(startDate: string, endDate: string, month?: string): string {
  if (month) {
    return dayjs(`${month}-01`).format('MMMM YYYY');
  }

  return `${dayjs(startDate).format('DD MMM YYYY')} to ${dayjs(endDate).format('DD MMM YYYY')}`;
}

/** The raw field values the user has entered, before they resolve to a period */
export interface PeriodDraft {
  /** `true` for the Custom range tab and for daily mode, `false` for Monthly */
  usesDateRange: boolean;
  /** `YYYY`, Monthly only */
  year?: string;
  /** `MM`, Monthly only */
  month?: string;
  /** `YYYY-MM-DD`, Custom range only */
  startDate?: string;
  /** `YYYY-MM-DD`, Custom range only */
  endDate?: string;
}

/** Messages keyed by the field they belong against, so each shows its own */
export interface PeriodErrors {
  year?: string;
  month?: string;
  startDate?: string;
  endDate?: string;
}

/** Order the fields appear in, so the summary quotes the first thing to fix */
const FIELD_ORDER: Array<keyof PeriodErrors> = ['year', 'month', 'startDate', 'endDate'];

export function firstError(errors: PeriodErrors): string | undefined {
  return FIELD_ORDER.map((field) => errors[field]).find(Boolean);
}

/**
 * Validates whichever period the active tab is collecting.
 *
 * Each tab has its own failure modes and each message is attached to the field
 * that caused it, so nothing is reported against a control the user cannot see
 * on the tab they are on.
 *
 * The Monthly tab needs the future check in particular: the date picker
 * enforces `maxDate` itself, but Year and Month are independent dropdowns, so a
 * later month in the current year yields a period that has not happened yet.
 */
export function validatePeriod({ usesDateRange, year, month, startDate, endDate }: PeriodDraft): PeriodErrors {
  const errors: PeriodErrors = {};
  const today = dayjs();

  if (usesDateRange) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const hasStart = Boolean(startDate) && start.isValid();
    const hasEnd = Boolean(endDate) && end.isValid();

    if (!hasStart) {
      errors.startDate = 'Enter a start date as dd/mm/yyyy.';
    }

    if (!hasEnd) {
      errors.endDate = 'Enter an end date as dd/mm/yyyy.';
    }

    if (hasStart && hasEnd && start.isAfter(end, 'day')) {
      errors.startDate = 'The start date must be on or before the end date.';
    }

    if (hasStart && !errors.startDate && start.isAfter(today, 'day')) {
      errors.startDate = 'The start date cannot be in the future.';
    }

    if (hasEnd && end.isAfter(today, 'day')) {
      errors.endDate = 'The end date cannot be in the future.';
    }

    return errors;
  }

  if (!year) {
    errors.year = 'Choose a year.';
  }

  if (!month) {
    errors.month = 'Choose a month.';
  }

  if (year && month) {
    // dayjs rolls an out-of-range month over into the next year rather than
    // reporting it invalid, so `2026-13` would read as a future date instead of
    // a malformed one. Check the parts before trusting the parse.
    const monthNumber = Number(month);
    const isWellFormed = /^\d{4}$/.test(year) && Number.isInteger(monthNumber) && monthNumber >= 1 && monthNumber <= 12;

    if (!isWellFormed) {
      errors.month = 'That is not a valid month.';
    } else if (dayjs(`${year}-${month}-01`).isAfter(today, 'month')) {
      errors.month = 'That month has not started yet.';
    }
  }

  return errors;
}
