/**
 * Which period controls a report offers.
 *
 * `monthly` suits returns that are only ever compiled for a calendar month --
 * offering a date range there invites a period the return is not defined for.
 * `range` suits reports read over arbitrary dates. `both` lets the user choose.
 */
export type ReportFilterMode =
  | 'monthly' // year and month only
  | 'range' // start and end date only
  | 'both'; // a switcher between the two

export interface FacilityOption {
  value: string;
  label: string;
}

/**
 * What the filter bar hands back when the user generates a report.
 *
 * `startDate` and `endDate` are always resolved to `YYYY-MM-DD`, whichever way
 * the period was picked, so a report never has to expand a month into a range
 * itself.
 */
export interface ReportPeriod {
  startDate: string;
  endDate: string;
  /** Set only when the user picked a whole month, as `YYYY-MM` */
  month?: string;
  /** Set only when the caller supplied `facilities` */
  facility?: string;
  /** Human readable period, e.g. `June 2026` or `01 Jun 2026 to 14 Jun 2026` */
  label: string;
}

export interface ReportFiltersProps {
  /** Shown as the page title, e.g. `MOH-731 Report` */
  reportName: string;
  /** Defaults to `both`. See {@link ReportFilterMode}. */
  mode?: ReportFilterMode;
  /** Renders a facility picker when supplied. Omit to hide it. */
  facilities?: FacilityOption[];
  /** How many years the year dropdown offers, counting back from now */
  yearsBack?: number;
  /** Disables the generate button and shows a pending label */
  isLoading?: boolean;
  /** Reveals the Download PDF button beside Generate once a report is on screen */
  isReportGenerated?: boolean;
  /**
   * The period the report currently on screen was generated for.
   *
   * Reports that restore their data from session storage come back with a
   * report showing but no record here of which period produced it. Passing it
   * lets the filter bar flag stale figures on the first change after a reload,
   * rather than only after the user has generated once in this session.
   */
  generatedPeriod?: { startDate?: string; endDate?: string };
  onGenerate: (period: ReportPeriod) => void;
  /**
   * Fires whenever the selected period changes, before Generate is pressed.
   *
   * Lets a report show the period on its form as soon as it is chosen, rather
   * than only once figures have been fetched for it.
   */
  onPeriodChange?: (period: ReportPeriod) => void;
}
