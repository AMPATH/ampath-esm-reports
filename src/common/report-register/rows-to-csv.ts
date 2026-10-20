import { type RegisterColumn } from './register-columns';

/**
 * Serialises line-list rows to CSV.
 *
 * Built from the data rather than from the rendered table: with pagination the
 * DOM only ever holds one page, so scraping it would quietly export 50 rows
 * while looking like it exported all 2,000 -- the worst way for an export to
 * fail. The trade-off is that the file carries the API's own fields rather
 * than the register's printed column headings, which is what a spreadsheet
 * wants anyway.
 */

/**
 * Forces text Excel cannot mangle. A cell starting with `=`, `+`, `-` or `@`
 * is parsed as a formula (`+2547...` becomes `#NAME?`), and a long digit-only
 * cell is reinterpreted as a number (leading zeros dropped, switched to
 * scientific notation), so both are emitted as an explicit text formula
 * (`"..."` quoted inside `=`, which Excel renders as literal text).
 */
const FORMULA_PREFIX = /^[=+\-@]/;
const LONG_DIGITS = /^\d{9,}$/;

function escapeCell(value: unknown, forceText = false): string {
  const text = value === null || value === undefined ? '' : String(value).replace(/\s+/g, ' ').trim();

  if (forceText && text !== '') {
    return `="${text.replace(/"/g, '""')}"`;
  }

  if (text !== '' && (FORMULA_PREFIX.test(text) || LONG_DIGITS.test(text))) {
    return `="${text.replace(/"/g, '""')}"`;
  }

  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Serialises using the register's own columns, so the file matches the form */
export function columnsToCsv(
  rows: Array<Record<string, any>>,
  columns: RegisterColumn[],
  options?: {
    /** A second header row (e.g. the printed form's column letters) */
    subHeaderRow?: string[];
  },
): string {
  const headerRows = [
    columns.map((column) => escapeCell(column.header)).join(','),
    ...(options?.subHeaderRow ? [options.subHeaderRow.map((cell) => escapeCell(cell)).join(',')] : []),
  ];

  return [
    ...headerRows,
    ...rows.map((row, index) => columns.map((column) => escapeCell(column.value(row, index), column.text)).join(',')),
  ].join('\r\n');
}

/** Fallback for registers with no column spec yet: the response's own fields */
export function rowsToCsv(rows: Array<Record<string, any>>): string {
  if (!rows.length) {
    return '';
  }

  /* Union of keys, not just the first row's: endpoints omit fields that are
     null for a given client, so keying off row one drops columns. */
  const keys = new Set<string>();
  rows.forEach((row) => Object.keys(row).forEach((key) => keys.add(key)));
  const columns = Array.from(keys);

  return [
    columns.map((column) => escapeCell(column)).join(','),
    ...rows.map((row) => columns.map((column) => escapeCell(row[column])).join(',')),
  ].join('\r\n');
}

/** Prompts the browser to save `csv` under `filename` */
export function downloadCsv(csv: string, filename: string): void {
  // the BOM is what makes Excel read the file as UTF-8 rather than latin-1
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
