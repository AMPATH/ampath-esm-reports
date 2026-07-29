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

function escapeCell(value: unknown): string {
  const text = value === null || value === undefined ? '' : String(value).replace(/\s+/g, ' ').trim();

  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Serialises using the register's own columns, so the file matches the form */
export function columnsToCsv(rows: Array<Record<string, any>>, columns: RegisterColumn[]): string {
  return [
    columns.map((column) => escapeCell(column.header)).join(','),
    ...rows.map((row, index) => columns.map((column) => escapeCell(column.value(row, index))).join(',')),
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
    columns.map(escapeCell).join(','),
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
