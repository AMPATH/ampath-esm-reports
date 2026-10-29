import React, { useState } from 'react';
import classNames from 'classnames';
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs, Toggle } from '@carbon/react';
import { Download } from '@carbon/react/icons';

import { columnsToCsv, downloadCsv } from '../../common/report-register';
import {
  columnCells,
  MOH_729B_SUMMARY,
  NOT_YET_COUNTED,
  rowCells,
  type SummarySection,
  type SummaryTable,
  tableCells,
} from './moh-729b-summary.config';
import { countedCode, type Moh729bCell } from './moh-729b.types';
/* drawn exactly like the MOH 731 Summary */
import styles from '../moh-731/summary/moh-731-summary.scss';

interface Moh729bSummaryProps {
  /** Clients in any of the counts */
  count: (cells: Moh729bCell[]) => number;
  /** Opens the linelist of the counts, under a heading */
  openLinelist: (cells: Moh729bCell[], label: string) => void;
  /** The section tab shown, by id */
  sectionId: string;
  onSectionChange: (sectionId: string) => void;
  /** Used to name the export */
  period: string;
}

const SHOW_CODES_KEY = 'ampath-moh729b-summary-show-codes';

const readShowCodes = () => {
  try {
    return localStorage.getItem(SHOW_CODES_KEY) === 'true';
  } catch {
    return false;
  }
};

/** The form's code for a single count, e.g. `CF2G` or `PM12 · 2nd Line` */
const codeOf = (cells: Moh729bCell[]) =>
  cells.length === 1 && !cells[0].band ? countedCode(cells[0].code) : undefined;

/**
 * The MOH 729B report regrouped for reading, as the MOH 731 Summary: a tab per
 * group of the form, each part as a compact table with a Total column and a
 * Total row. Every number opens its linelist, and a total opens the clients of
 * the counts it adds up.
 */
const Moh729bSummary: React.FC<Moh729bSummaryProps> = ({ count, openLinelist, sectionId, onSectionChange, period }) => {
  const [showCodes, setShowCodes] = useState(readShowCodes);
  const selectedIndex = Math.max(
    0,
    MOH_729B_SUMMARY.findIndex((section) => section.id === sectionId),
  );

  const toggleCodes = (checked: boolean) => {
    setShowCodes(checked);
    try {
      localStorage.setItem(SHOW_CODES_KEY, String(checked));
    } catch {
      /* not remembered, still applied */
    }
  };

  /** A count or total: its value, opening its linelist; the form's code on hover (or shown) */
  const value = (cells: Moh729bCell[], label: string, options: { strong?: boolean; code?: boolean } = {}) => {
    if (cells.length === 0) {
      return <span className={styles.none}>–</span>;
    }
    const amount = count(cells);
    const code = codeOf(cells);
    return (
      <button
        type="button"
        className={classNames(styles.value, { [styles.zero]: amount === 0, [styles.strong]: options.strong })}
        onClick={() => openLinelist(cells, label)}
        title={code ? `${code} · open the linelist` : `Open the ${label} linelist`}
      >
        {amount.toLocaleString()}
        {showCodes && code && options.code !== false && <span className={styles.code}>{code}</span>}
      </button>
    );
  };

  const exportCsv = () => {
    const lines: Array<Record<string, unknown>> = [];
    MOH_729B_SUMMARY.forEach((section) =>
      section.cards.forEach((card) =>
        card.tables.forEach((table) => {
          const part = [card.title, table.title].filter(Boolean).join(' · ');
          table.rows.forEach((row) => {
            row.cells.forEach((cells, index) => {
              if (cells.length) {
                lines.push({ section: section.tab, part, row: row.label, column: table.columns[index], cells });
              }
            });
            lines.push({ section: section.tab, part, row: row.label, column: 'Total', cells: rowCells(row) });
          });
          if (table.totalLabel) {
            lines.push({
              section: section.tab,
              part,
              row: table.totalLabel,
              column: 'Total',
              cells: tableCells(table),
            });
          }
        }),
      ),
    );
    downloadCsv(
      columnsToCsv(lines, [
        { header: 'Section', value: (line) => line.section },
        { header: 'Part', value: (line) => line.part },
        { header: 'Row', value: (line) => line.row },
        { header: 'Column', value: (line) => line.column },
        { header: 'MOH 729B Code', value: (line) => codeOf(line.cells as Moh729bCell[]) ?? '', text: true },
        { header: 'Value', value: (line) => count(line.cells as Moh729bCell[]) },
      ]),
      `moh-729b-summary-${period}.csv`.replace(/[^a-z0-9.-]+/gi, '-').toLowerCase(),
    );
  };

  const renderTable = (table: SummaryTable, caption: string, key: number) => (
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
            <th scope="col" className={styles.totalCol}>
              {table.columns.length ? 'Total' : 'Number'}
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className={styles.labelCol}>
                {row.label}
              </th>
              {table.columns.map((column, index) => (
                <td key={column}>{value(row.cells[index] ?? [], `${caption} · ${row.label} · ${column}`)}</td>
              ))}
              <td className={styles.totalCol}>
                {/* the code is beside the row's own counts already; only a count
                    shown in the Total column alone carries it here */}
                {value(rowCells(row), `${caption} · ${row.label}`, { code: table.columns.length === 0 })}
              </td>
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
                  {value(columnCells(table, index), `${caption} · ${table.totalLabel} · ${column}`, {
                    strong: true,
                    code: false,
                  })}
                </td>
              ))}
              <td className={styles.totalCol}>
                {value(tableCells(table), `${caption} · ${table.totalLabel}`, { strong: true, code: false })}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );

  const renderSection = (section: SummarySection) => (
    <>
      <div className={styles.strip}>
        {section.headlines.map((headline) => (
          <button
            type="button"
            key={headline.label}
            className={styles.headline}
            onClick={() => openLinelist(headline.cells, headline.label)}
          >
            <span className={styles.headlineLabel}>{headline.label}</span>
            <span className={styles.headlineValue}>{count(headline.cells).toLocaleString()}</span>
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {section.cards.map((card) => (
          <div key={card.title} className={styles.card}>
            <h5 className={styles.cardTitle}>{card.title}</h5>
            {card.note && <p className={styles.note}>{card.note}</p>}
            {card.tables.map((table, index) => renderTable(table, card.title, index))}
          </div>
        ))}
        {section.id === 'ois' && (
          <div className={styles.card}>
            <h5 className={styles.cardTitle}>Not counted yet</h5>
            <p className={styles.note}>{NOT_YET_COUNTED}</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className={styles.summary}>
      <Tabs
        selectedIndex={selectedIndex}
        onChange={({ selectedIndex: index }) => onSectionChange(MOH_729B_SUMMARY[index].id)}
      >
        <div className={styles.bar}>
          <TabList aria-label="MOH 729B sections" className={styles.sectionTabs}>
            {MOH_729B_SUMMARY.map((section) => (
              <Tab key={section.id}>{section.tab}</Tab>
            ))}
          </TabList>
          <div className={styles.tools}>
            <Toggle
              id="moh729b-summary-codes"
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
          {MOH_729B_SUMMARY.map((section) => (
            <TabPanel key={section.id} className={styles.panel}>
              {renderSection(section)}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Moh729bSummary;
