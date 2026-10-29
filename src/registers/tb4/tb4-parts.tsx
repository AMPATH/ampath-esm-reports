import React from 'react';

import { type Tb4Nutrition, type Tb4Row, text } from './tb4.types';
import styles from './tb4-register.scss';

/** Patients ruled on each page, on both facing pages, as on the form */
export const ROWS_PER_PAGE = 5;

/** A3 landscape less its 8mm margins: the page as drawn on screen, inside the report card */
export const PAGE_WIDTH_MM = 420 - 2 * 8;

export const paginate = (rows: Tb4Row[]) => {
  const pages: Tb4Row[][] = [];
  for (let start = 0; start < rows.length; start += ROWS_PER_PAGE) {
    pages.push(rows.slice(start, start + ROWS_PER_PAGE));
  }
  return pages.length ? pages : [[]];
};

/** A box in a divided cell: a printed label filling it, a label in its corner, or an entry */
export interface Box {
  heading?: string;
  tag?: string;
  value?: React.ReactNode;
  /** relative width beside the other boxes of its part (default 1) */
  grow?: number;
}

/** A part of a divided cell: its share of the row's height and the boxes across it */
export interface Part {
  share: number;
  boxes?: Box[];
}

/** A divided cell: parts stacked down the row, as printed */
export const Stack: React.FC<{ parts: Part[] }> = ({ parts }) => (
  <div className={styles.stack} style={{ gridTemplateRows: parts.map((part) => `${part.share}fr`).join(' ') }}>
    {parts.map((part, index) => (
      <div key={index} className={styles.part}>
        {(part.boxes ?? [{}]).map((box, boxIndex) => (
          <div key={boxIndex} className={styles.box} style={box.grow ? { flexGrow: box.grow } : undefined}>
            {box.heading && <span className={styles.heading}>{box.heading}</span>}
            {box.tag && <span className={styles.tag}>{box.tag}</span>}
            {box.value !== undefined && <span className={styles.boxValue}>{box.value}</span>}
          </div>
        ))}
      </div>
    ))}
  </div>
);

/** A whole cell's entry */
export const Value: React.FC<{ children: React.ReactNode; left?: boolean; wrap?: boolean }> = ({
  children,
  left,
  wrap,
}) => (
  <span className={[styles.value, left && styles.valueLeft, wrap && styles.wrap].filter(Boolean).join(' ')}>
    {children}
  </span>
);

/**
 * Nutritional status, as printed in (K) and (AD): weight beside height, then
 * BMI/Z score, then MUAC
 */
export const NutritionStack: React.FC<{ nutrition?: Tb4Nutrition | null }> = ({ nutrition }) => (
  <Stack
    parts={[
      { share: 0.146, boxes: [{ tag: 'Weight' }, { tag: 'Height' }] },
      { share: 0.295, boxes: [{ value: text(nutrition?.weight) }, { value: text(nutrition?.height) }] },
      { share: 0.146, boxes: [{ tag: 'BMI/Z score', value: text(nutrition?.bmi) }] },
      { share: 0.413, boxes: [{ tag: 'MUAC', value: text(nutrition?.muac) }] },
    ]}
  />
);

/**
 * A key beneath the register: its heading across the top, then its rows. A row
 * with fewer cells than the widest spans its last cell across the rest, and
 * the rows listed in `subheadings` are set bold ("CT - Scan", "Comorbidities").
 */
export const KeyTable: React.FC<{
  title: string;
  rows: Array<Array<React.ReactNode>>;
  widthMm: number;
  subheadings?: number[];
  leftTitle?: boolean;
}> = ({ title, rows, widthMm, subheadings = [], leftTitle }) => {
  const columns = Math.max(...rows.map((cells) => cells.length));
  return (
    <table
      className={[styles.keyTable, leftTitle && styles.leftHeadingKey].filter(Boolean).join(' ')}
      style={{ width: `${widthMm}mm` }}
    >
      <thead>
        <tr>
          <th colSpan={columns}>{title}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((cells, index) => (
          <tr key={index} className={subheadings.includes(index) ? styles.keySubheading : undefined}>
            {cells.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                colSpan={cells.length < columns && cellIndex === cells.length - 1 ? columns - cellIndex : 1}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/** Widths, measured off the form, as `<col>` percentages */
export const Columns: React.FC<{ widths: number[] }> = ({ widths }) => {
  const total = widths.reduce((sum, width) => sum + width, 0);
  return (
    <colgroup>
      {widths.map((width, index) => (
        <col key={index} style={{ width: `${(width / total) * 100}%` }} />
      ))}
    </colgroup>
  );
};

/** A column heading: its letter in bold over the printed heading */
export const Heading: React.FC<{
  letter: string;
  children?: React.ReactNode;
  centre?: boolean;
  rowSpan?: number;
  colSpan?: number;
}> = ({ letter, children, centre, rowSpan, colSpan }) => (
  <th rowSpan={rowSpan} colSpan={colSpan} className={centre ? styles.centreHeading : undefined}>
    <span className={styles.letter}>({letter})</span>
    {children}
  </th>
);

/** One A3 landscape page of the register: the ruled table, the keys beneath, and the page line */
export const Tb4Page: React.FC<{
  page: number;
  pages: number;
  side: string;
  scale: number;
  table: React.ReactNode;
  keys: React.ReactNode;
}> = ({ page, pages, side, scale, table, keys }) => (
  <section className={styles.page} data-register-page style={{ '--page-zoom': scale } as React.CSSProperties}>
    {table}
    {keys}
    <div className={styles.pageFoot}>
      <span>
        Page {page} of {pages} · {side}
      </span>
      <span>MOH/REG/DLTLDP/01 · February 2025</span>
    </div>
  </section>
);
