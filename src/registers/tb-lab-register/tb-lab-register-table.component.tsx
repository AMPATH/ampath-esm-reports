import React from 'react';

import { TB_LAB_COLUMNS, type TbLabColumn, type TbLabRow, text } from './tb-lab-register.columns';
import styles from './tb-lab-register-table.scss';

interface TbLabRegisterTableProps {
  rows: TbLabRow[];
  facility?: string;
  startDate?: string;
  endDate?: string;
}

interface HeaderCell {
  /** A two-tier group spanning its member columns; undefined for a tall column */
  group?: string;
  /** The column's own label, repeated once per member under a group */
  label: string;
  /** Columns the header spans */
  span: number;
  /** 2 for a column that stands alone across both header rows */
  height: number;
}

/**
 * The printed template's two-tier header, rebuilt from the column spec:
 * consecutive members of a group sit under one spanning group cell, standalone
 * columns stand two rows tall.
 */
export function headerCellsFor(columns: TbLabColumn[]): HeaderCell[][] {
  const top: HeaderCell[] = [];
  const bottom: HeaderCell[] = [];

  columns.forEach((column, index) => {
    if (!column.group) {
      top.push({ group: undefined, label: column.header, span: 1, height: 2 });
      return;
    }
    const previous = columns[index - 1];
    if (previous?.group === column.group) {
      top[top.length - 1].span += 1;
    } else {
      top.push({ group: column.group, label: column.group, span: 1, height: 1 });
    }
    bottom.push({ group: undefined, label: column.header, span: 1, height: 1 });
  });

  return [top, bottom];
}

/**
 * The TB Laboratory Register as the printed template lays it out: one row per
 * specimen tested, the two-tier header over the appearance and microscopy
 * columns, drawn as a landscape sheet that scrolls sideways in its frame.
 */
const TbLabRegisterTable: React.FC<TbLabRegisterTableProps> = ({ rows, facility = '', startDate, endDate }) => {
  const [topRow, bottomRow] = headerCellsFor(TB_LAB_COLUMNS);
  const period = [startDate, endDate]
    .filter(Boolean)
    .map((value) => asDay(value))
    .join(' to ');

  return (
    <div className={styles.sheet}>
      <div className={styles.runningHead}>
        <span>Ministry of Health</span>
        <span>TB LABORATORY REGISTER</span>
        <span>{facility}</span>
      </div>
      {period && <div className={styles.period}>{period}</div>}

      <div className={styles.tableScroll}>
        <table className={styles.register}>
          <thead>
            <tr>
              {topRow.map((cell, index) =>
                cell.group ? (
                  <th key={index} colSpan={cell.span}>
                    {cell.label}
                  </th>
                ) : (
                  <th key={index} rowSpan={2} className={styles.tall}>
                    {cell.label}
                  </th>
                ),
              )}
            </tr>
            <tr>
              {bottomRow.map((cell, index) => (
                <th key={index}>{cell.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={text(row.lab_no) || index}>
                {TB_LAB_COLUMNS.map((column, cellIndex) => (
                  <td key={cellIndex} className={column.align === 'left' ? styles.left : undefined}>
                    {text(column.value(row, index))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/** Renders a filter-bar period (YYYY-MM-DD) the way the register reads it */
function asDay(value: string): string {
  const parts = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return parts ? `${parts[3]}/${parts[2]}/${parts[1]}` : value;
}

export default TbLabRegisterTable;
