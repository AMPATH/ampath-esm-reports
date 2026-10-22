import { type RegisterColumn } from '../report-register';

/**
 * One column of a linelist.
 *
 * Most columns show a field of the row as it comes back from the ETL, so
 * `field` is enough. `value` is for anything derived (a formatted date, a
 * combined cell); it wins over `field` when both are given.
 */
export interface LinelistColumn {
  /** Also identifies the column in the saved layout, so keep it unique within a linelist */
  header: string;
  field?: string;
  value?: (row: Record<string, any>) => unknown;
  /**
   * What the column sorts by, when that differs from what it shows -- a date
   * displayed as dd/mm/yyyy sorts by the raw date, not by its text.
   */
  sortValue?: (row: Record<string, any>) => unknown;
  /** Keep as text in the CSV (identifiers, phone numbers) */
  text?: boolean;
  /** Let the cell wrap instead of truncating (long prose) */
  wrap?: boolean;
  /** Start hidden; the user can show it from the Columns menu */
  hidden?: boolean;
}

/** What a column shows for a row */
export function cellValue(column: LinelistColumn, row: Record<string, any>): unknown {
  if (column.value) {
    return column.value(row);
  }

  return column.field ? row[column.field] : undefined;
}

/** The columns, with a running row number first, in the shape the CSV export expects */
export function toRegisterColumns(columns: LinelistColumn[]): RegisterColumn[] {
  return [
    { header: 'No', value: (_row, index) => index + 1 },
    ...columns.map((column) => ({
      header: column.header,
      value: (row: Record<string, any>) => cellValue(column, row) ?? '',
      text: column.text,
      wrap: column.wrap,
    })),
  ];
}
