import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, Toggle } from '@carbon/react';
import { Download } from '@carbon/react/icons';

import { columnsToCsv, downloadCsv } from '../../../common/report-register';
import { MOH_731_INDICATORS } from '../linelist/moh-731-indicators';
import { type Moh731LinelistTotal } from '../linelist/use-open-moh-731-linelist';
import {
  MOH_731_SUMMARY,
  rowTotalCodes,
  type SummaryRow,
  type SummarySection,
  type SummaryTable,
} from './moh-731-summary.config';
import styles from './moh-731-summary.scss';

interface Moh731SummaryProps {
  /** The report as generated: indicator key -> value */
  data: Record<string, unknown>;
  openLinelist: (figure: string | Moh731LinelistTotal) => void;
  /** The section tab shown, by id */
  sectionId: string;
  onSectionChange: (sectionId: string) => void;
  /** Used to name the export */
  period: string;
}

const SHOW_CODES_KEY = 'ampath-moh731-summary-show-codes';

/** A figure's value, 0 where the report has none */
const valueOf = (data: Record<string, unknown>, code: string) => {
  const indicator = MOH_731_INDICATORS[code]?.indicator;
  return Number((indicator && data[indicator]) || 0);
};

const sum = (data: Record<string, unknown>, codes: string[]) =>
  codes.reduce((total, code) => total + valueOf(data, code), 0);

/** The codes a table's Total row adds up: every row that counts towards the total */
const tableCodes = (table: SummaryTable) =>
  table.rows.filter((row) => !row.ofWhich && !row.excluded).flatMap(rowTotalCodes);

const rowLabel = (row: SummaryRow) => (row.ofWhich ? `of which ${row.label}` : row.label);

const readShowCodes = () => {
  try {
    return localStorage.getItem(SHOW_CODES_KEY) === 'true';
  } catch {
    return false;
  }
};

/**
 * The MOH 731 report regrouped for reading: a tab per section, each sub-section
 * as a compact table with a Total column and a Total row. Every number opens its
 * linelist, and a total opens the linelists of the figures it adds up.
 */
const Moh731Summary: React.FC<Moh731SummaryProps> = ({ data, openLinelist, sectionId, onSectionChange, period }) => {
  const [showCodes, setShowCodes] = useState(readShowCodes);
  const selectedIndex = Math.max(
    0,
    MOH_731_SUMMARY.findIndex((section) => section.id === sectionId),
  );

  const toggleCodes = (checked: boolean) => {
    setShowCodes(checked);
    try {
      localStorage.setItem(SHOW_CODES_KEY, String(checked));
    } catch {
      /* not remembered, still applied */
    }
  };

  /* One figure opens its own linelist; several open as a total */
  const open = (codes: string[], label: string, block: string) => {
    if (codes.length === 1) {
      openLinelist(codes[0]);
    } else if (codes.length > 1) {
      openLinelist({ codes, label, block });
    }
  };

  /** A figure or total: its value, opening its linelist; the MOH code on hover (or shown) */
  const value = (codes: string[], label: string, block: string, options: { strong?: boolean; code?: boolean } = {}) => {
    if (codes.length === 0) {
      return <span className={styles.none}>–</span>;
    }
    const amount = sum(data, codes);
    const code = codes.length === 1 ? codes[0] : undefined;
    return (
      <button
        type="button"
        className={classNames(styles.value, { [styles.zero]: amount === 0, [styles.strong]: options.strong })}
        onClick={() => open(codes, label, block)}
        title={code ? `${code} · open the linelist` : `Open the ${label} linelist`}
      >
        {amount.toLocaleString()}
        {showCodes && code && options.code !== false && <span className={styles.code}>{code}</span>}
      </button>
    );
  };

  const exportCsv = () => {
    const lines: Array<Record<string, unknown>> = [];
    MOH_731_SUMMARY.forEach((section) =>
      section.subsections.forEach((sub) =>
        sub.tables.forEach((table) => {
          table.rows.forEach((row) => {
            (row.cells ?? []).forEach((cell, index) => {
              if (cell) {
                lines.push({
                  section: section.title,
                  block: sub.block,
                  row: rowLabel(row),
                  column: table.columns[index],
                  code: cell,
                  value: valueOf(data, cell),
                });
              }
            });
            lines.push({
              section: section.title,
              block: sub.block,
              row: rowLabel(row),
              column: 'Total',
              code: row.only ?? '',
              value: sum(data, rowTotalCodes(row)),
            });
          });
          if (table.totalLabel) {
            lines.push({
              section: section.title,
              block: sub.block,
              row: table.totalLabel,
              column: 'Total',
              code: '',
              value: sum(data, tableCodes(table)),
            });
          }
        }),
      ),
    );
    downloadCsv(
      columnsToCsv(lines, [
        { header: 'Section', value: (line) => line.section },
        { header: 'Sub-section', value: (line) => line.block },
        { header: 'Row', value: (line) => line.row },
        { header: 'Column', value: (line) => line.column },
        { header: 'MOH 731 Code', value: (line) => line.code, text: true },
        { header: 'Value', value: (line) => line.value },
      ]),
      `moh-731-summary-${period}.csv`.replace(/[^a-z0-9.-]+/gi, '-').toLowerCase(),
    );
  };

  const renderTable = (table: SummaryTable, block: string, key: number) => {
    const included = table.rows.filter((row) => !row.ofWhich && !row.excluded);
    const hasTotalColumn = table.rowTotals !== false;
    return (
      <div key={key} className={styles.tableScroll}>
        {table.title && <p className={styles.tableTitle}>{table.title}</p>}
        <table className={classNames(styles.table, { [styles.single]: table.columns.length === 0 })}>
          <thead>
            <tr>
              <th scope="col" className={styles.labelCol} />
              {table.columns.map((column) => (
                <th scope="col" key={column}>
                  {column}
                </th>
              ))}
              {/* a table without a breakdown has one column of figures, not totals */}
              {hasTotalColumn && (
                <th scope="col" className={styles.totalCol}>
                  {table.columns.length ? 'Total' : 'Number'}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr
                key={row.label}
                className={classNames({ [styles.ofWhich]: row.ofWhich, [styles.excluded]: row.excluded })}
              >
                <th scope="row" className={styles.labelCol}>
                  {row.group && <span className={styles.group}>{row.group} · </span>}
                  {rowLabel(row)}
                </th>
                {table.columns.map((column, index) => (
                  <td key={column}>
                    {row.only
                      ? null
                      : value(row.cells?.[index] ? [row.cells[index] as string] : [], `${row.label} ${column}`, block)}
                  </td>
                ))}
                {/* the code is beside the row's own figures already; only a figure
                    shown in the Total column alone carries it here */}
                {hasTotalColumn && (
                  <td className={styles.totalCol}>
                    {value(rowTotalCodes(row), `${row.label} total`, block, { code: Boolean(row.only) })}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {table.totalLabel && (
            <tfoot>
              <tr>
                <th scope="row" className={styles.labelCol}>
                  {table.totalLabel}
                </th>
                {table.columns.map((column, index) => (
                  <td key={column}>
                    {value(
                      included.map((row) => row.cells?.[index]).filter((cell): cell is string => Boolean(cell)),
                      `${table.totalLabel} – ${column}`,
                      block,
                      { strong: true, code: false },
                    )}
                  </td>
                ))}
                {hasTotalColumn && (
                  <td className={styles.totalCol}>
                    {value(tableCodes(table), table.totalLabel, block, { strong: true, code: false })}
                  </td>
                )}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    );
  };

  const renderSection = (section: SummarySection) => (
    <>
      {section.headlines.length > 0 && (
        <div className={styles.strip}>
          {section.headlines.map((headline) => {
            const table = section.subsections
              .find((sub) => sub.block === headline.block)
              ?.tables.find((t) => t.totalLabel);
            const codes = table ? tableCodes(table) : [];
            return (
              <button
                type="button"
                key={headline.block}
                className={styles.headline}
                onClick={() => open(codes, table?.totalLabel ?? headline.label, headline.block)}
              >
                <span className={styles.headlineLabel}>{headline.label}</span>
                <span className={styles.headlineValue}>{sum(data, codes).toLocaleString()}</span>
              </button>
            );
          })}
        </div>
      )}
      <div className={styles.grid}>
        {section.subsections.map((sub) => (
          <div key={sub.block} className={styles.card}>
            <h5 className={styles.cardTitle}>{sub.block}</h5>
            {sub.note && <p className={styles.note}>{sub.note}</p>}
            {sub.tables.map((table, index) => renderTable(table, sub.block, index))}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className={styles.summary}>
      <Tabs
        selectedIndex={selectedIndex}
        onChange={({ selectedIndex: index }) => onSectionChange(MOH_731_SUMMARY[index].id)}
      >
        <div className={styles.bar}>
          <TabList aria-label="MOH 731 sections" className={styles.sectionTabs}>
            {MOH_731_SUMMARY.map((section) => (
              <Tab key={section.id} title={section.title}>
                {section.tab}
              </Tab>
            ))}
          </TabList>
          <div className={styles.tools}>
            <Toggle
              id="moh731-summary-codes"
              size="sm"
              labelText="Show MOH codes"
              hideLabel
              labelA="MOH codes"
              labelB="MOH codes"
              toggled={showCodes}
              onToggle={toggleCodes}
            />
            <Button kind="ghost" size="sm" renderIcon={Download} onClick={exportCsv}>
              Export CSV
            </Button>
          </div>
        </div>
        <TabPanels>
          {MOH_731_SUMMARY.map((section) => (
            <TabPanel key={section.id} className={styles.panel}>
              {renderSection(section)}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Moh731Summary;
