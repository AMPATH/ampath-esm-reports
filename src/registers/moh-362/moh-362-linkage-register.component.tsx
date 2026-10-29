import React from 'react';

import { usePageScale } from '../../common/report-page';
import { clientName, formDate, text, type Moh362Row } from './moh-362.types';
import sheet from './moh-362-lab-register.scss';
import styles from './moh-362-linkage-register.scss';

interface Moh362LinkageRegisterProps {
  rows: Moh362Row[];
}

/** Rows ruled on each page of the paper form */
const ROWS_PER_PAGE = 15;

/** A4 landscape less its 8mm margins: the page as drawn on screen, inside the report card */
const PAGE_WIDTH_MM = 297 - 2 * 8;

const COLUMN_IDS = 'abcdefghij'.split('');

/** Column widths, measured off page 6 of the form, as fractions of the sheet */
const COLUMN_WIDTHS = [82, 204, 271, 180, 134, 193, 286, 147, 134, 182];
const COLUMN_TOTAL = COLUMN_WIDTHS.reduce((sum, width) => sum + width, 0);

/** Columns split into an upper and a lower cell: (b), (d) and (g) */
const SPLIT_COLUMNS = new Set(['b', 'd', 'g']);

const paginate = (rows: Moh362Row[]) => {
  const pages: Moh362Row[][] = [];
  for (let start = 0; start < rows.length; start += ROWS_PER_PAGE) {
    pages.push(rows.slice(start, start + ROWS_PER_PAGE));
  }
  return pages.length ? pages : [[]];
};

/** A heading holding two labels: upper cell over lower cell */
const SplitHeader: React.FC<{ upper: React.ReactNode; lower: React.ReactNode }> = ({ upper, lower }) => (
  <th className={styles.splitHeader}>
    <div className={styles.splitStack}>
      <span>{upper}</span>
      <span>{lower}</span>
    </div>
  </th>
);

/** One client: two ruled lines, columns (b), (d) and (g) split into upper and lower cells */
const ClientRows: React.FC<{ row?: Moh362Row; serial: number }> = ({ row, serial }) => {
  if (!row) {
    return (
      <>
        <tr className={styles.clientUpper}>
          {COLUMN_IDS.map((id) =>
            SPLIT_COLUMNS.has(id) ? <td key={id} className={sheet.upperCell} /> : <td key={id} rowSpan={2} />,
          )}
        </tr>
        <tr className={styles.clientLower}>
          {[...SPLIT_COLUMNS].map((id) => (
            <td key={id} className={sheet.lowerCell} />
          ))}
        </tr>
      </>
    );
  }

  return (
    <>
      <tr className={styles.clientUpper}>
        <td rowSpan={2}>{serial}</td>
        <td className={sheet.upperCell}>{text(row.id_number)}</td>
        <td rowSpan={2} className={sheet.left}>
          <span className={sheet.clamp}>{clientName(row)}</span>
        </td>
        <td className={sheet.upperCell}>{text(row.telephone)}</td>
        <td rowSpan={2}>{text(row.client_tested_as)}</td>
        <td rowSpan={2} className={sheet.left}>
          <span className={sheet.clamp}>{text(row.referral_to)}</span>
        </td>
        <td className={`${sheet.upperCell} ${sheet.left}`}>{text(row.handed_to)}</td>
        <td rowSpan={2}>{formDate(row.art_start_date)}</td>
        <td rowSpan={2}>{text(row.ccc_number)}</td>
        <td rowSpan={2} className={sheet.left}>
          <span className={sheet.clamp}>{text(row.screening_remarks)}</span>
        </td>
      </tr>
      <tr className={styles.clientLower}>
        <td className={sheet.lowerCell}>{text(row.nupi)}</td>
        <td className={`${sheet.lowerCell} ${sheet.left}`}>{text(row.residence)}</td>
        {/* the receiving health worker's cadre is not recorded */}
        <td className={sheet.lowerCell} />
      </tr>
    </>
  );
};

/**
 * One A4 landscape page of the register: 15 ruled client rows, and on the last
 * page the total of clients linked across the whole register, in one frame.
 */
const LinkageRegisterPage: React.FC<{
  rows: Moh362Row[];
  firstSerial: number;
  page: number;
  pages: number;
  scale: number;
  /** clients linked in the whole register, given only to the last page */
  totalLinked?: number;
}> = ({ rows, firstSerial, page, pages, scale, totalLinked }) => (
  <section className={sheet.page} data-register-page style={{ '--page-zoom': scale } as React.CSSProperties}>
    <div className={sheet.runningHead}>
      <span>Ministry Of Health</span>
      <span>MOH 362 HTS LAB, REFERRAL AND LINKAGE REGISTER</span>
      <span>Ver. July 2023</span>
    </div>
    <h4 className={`${sheet.title} ${styles.title}`}>REFERRAL AND LINKAGE REGISTER</h4>

    <div className={sheet.frame}>
      <table className={`${sheet.register} ${styles.linkageTable}`}>
        <colgroup>
          {COLUMN_WIDTHS.map((width, index) => (
            <col key={index} style={{ width: `${(width / COLUMN_TOTAL) * 100}%` }} />
          ))}
        </colgroup>
        <thead>
          <tr className={styles.headingRow}>
            <th>
              Serial
              <br />
              Number
            </th>
            <SplitHeader
              upper="National Identification Number"
              lower="National Unique Patient Identifier (NUPI) Number"
            />
            <th>Client Names</th>
            <SplitHeader upper="Telephone Number" lower="Residence" />
            <th>
              Identification Strategy
              <br />
              <span className={styles.regular}>(VCT/IT/HIVST /SNS)</span>
            </th>
            <th>Patient referred to</th>
            <th>
              Handed over to:
              <br />
              <span className={styles.regular}>
                (Indicate Name (upper cell)
                <br />
                and Cadre (lower cell)
              </span>
            </th>
            <th>Date started on ART</th>
            <th>CCC Number</th>
            <th>Remarks</th>
          </tr>
          <tr className={styles.idRow}>
            {COLUMN_IDS.map((id) => (
              <th key={id}>({id})</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ROWS_PER_PAGE }, (_, index) => (
            <ClientRows key={index} row={rows[index]} serial={firstSerial + index} />
          ))}
          {totalLinked !== undefined && (
            <tr className={styles.totalRow}>
              <th colSpan={3} className={styles.totalLabel}>
                Totals Clients Linked
              </th>
              <td colSpan={6} className={styles.totalFill} />
              <td className={styles.totalFigure}>{totalLinked}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className={sheet.pageFoot}>
      <span>
        Page {page} of {pages}
      </span>
      <span>Ver. July 2023</span>
    </div>
  </section>
);

/**
 * REFERRAL AND LINKAGE REGISTER (Ver. July 2023), page 6 of the MOH 362 form,
 * as A4 landscape pages: the clients who tested HIV positive and were linked to
 * care (started on ART), columns (a) to (j), with the total linked at the foot
 * of the last page.
 */
const Moh362LinkageRegister: React.FC<Moh362LinkageRegisterProps> = ({ rows }) => {
  const { ref, scale } = usePageScale<HTMLDivElement>(PAGE_WIDTH_MM);
  const pages = paginate(rows);

  return (
    <div className={sheet.reportFrame}>
      <div className={sheet.viewport} ref={ref}>
        {pages.map((pageRows, index) => (
          <LinkageRegisterPage
            key={index}
            rows={pageRows}
            firstSerial={index * ROWS_PER_PAGE + 1}
            page={index + 1}
            pages={pages.length}
            scale={scale}
            totalLinked={index === pages.length - 1 ? rows.length : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default Moh362LinkageRegister;
