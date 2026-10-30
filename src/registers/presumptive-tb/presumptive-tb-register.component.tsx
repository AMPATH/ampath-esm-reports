import React from 'react';

import { usePageScale } from '../../common/report-page';
import {
  formDate,
  isDiagnosed,
  isInitiated,
  isInvestigated,
  text,
  type PresumptiveTbRow,
} from './presumptive-tb.types';
import styles from './presumptive-tb-register.scss';

interface PresumptiveTbRegisterProps {
  rows: PresumptiveTbRow[];
}

/** Rows ruled on the last page, which also holds the page summary and code tables, as on the form */
const ROWS_ON_LAST_PAGE = 9;

/** Rows on every page before it: the footer's space ruled as further rows */
const ROWS_PER_FULL_PAGE = 15;

/** A3 landscape less its 8mm margins: the page as drawn on screen, inside the report card */
const PAGE_WIDTH_MM = 420 - 2 * 8;

/** The column letters across the top, as printed (R twice: TPT and Remarks) */
const LETTERS = 'ABCDEFGHIJKLMNOPQRR'.split('');

/** Column widths, measured off page 4 of the form, as fractions of the sheet */
const COLUMN_WIDTHS = [71, 98, 75, 151, 76, 79, 108, 105, 102, 91, 93, 104, 107, 93, 115, 106, 120, 79, 85];
const COLUMN_TOTAL = COLUMN_WIDTHS.reduce((sum, width) => sum + width, 0);

/** The form's code tables, beneath the register on the last page */
const MICROSCOPY_RESULTS: Array<[string, string]> = [
  ['Microscopy', 'TB LAMP'],
  ['0', 'Negative'],
  ['Actual Number', 'Positive'],
  ['+', 'Indefinite'],
  ['++', 'Invalid'],
  ['+++', ''],
];

const GENEXPERT_RESULTS: Array<[string, string]> = [
  ['MTB + RR', 'Mycobacterium Tuberculosis positive, Rifampicin Resistant'],
  ['MTB + RS', 'Mycobacterium Tuberculosis positive, Rifampicin Sensitive'],
  ['MTB –Ve', 'Mycobacterium Tuberculosis Negative'],
  ['Trace RR', 'Minimal traces of Mycobacterium Tuberculosis seen Rif Resistant'],
  ['Trace RS', 'Minimal traces of Mycobacterium Tuberculosis seen Rif Sensitive'],
  ['Trace RI', 'Minimal traces of Mycobacterium Tuberculosis seen Rif Indeterminate'],
  ['ND', 'Not done'],
  ['Invalid / No result / Error', ''],
  ['TI', 'MTB detected Rif indeterminate'],
];

const REFERRED_BY: Array<[string, string]> = [
  ['Private Sector', 'PS'],
  ['Self referral', 'SR'],
  ['Contact Invitation', 'CI'],
  ['Chemist/Pharmacy', 'CP'],
  ['Community Health Volunteer', 'CHV'],
  ['Informal Service Provider', 'ISP'],
];

const INVESTIGATIONS = ['Microscopy', 'GeneXpert', 'TruNat', 'TB-LAMP', 'LF-LAM', ''];

/**
 * Full pages of rows, then a last page of at most 9 rows that carries the
 * summary. A full page never takes every remaining row, so the last page always
 * has at least one case on it.
 */
const paginate = (rows: PresumptiveTbRow[]) => {
  const pages: PresumptiveTbRow[][] = [];
  let start = 0;
  while (rows.length - start > ROWS_ON_LAST_PAGE) {
    const size = Math.min(ROWS_PER_FULL_PAGE, rows.length - start - 1);
    pages.push(rows.slice(start, start + size));
    start += size;
  }
  pages.push(rows.slice(start));
  return pages;
};

interface CaseCell {
  upper: React.ReactNode;
  lower?: React.ReactNode;
  className?: string;
  split?: boolean;
}

/** One case: two ruled lines, the split columns holding an upper and a lower entry */
const CaseRows: React.FC<{ row?: PresumptiveTbRow; serial: number }> = ({ row, serial }) => {
  /* each column's entry: a whole cell spanning both lines, or an upper and a
     lower entry for a split column */
  const whole = (content: React.ReactNode, className?: string): CaseCell => ({ upper: content, className });
  const split = (upper: React.ReactNode, lower: React.ReactNode, className?: string): CaseCell => ({
    upper,
    lower,
    className,
    split: true,
  });
  const clamp = (value: unknown) => <span className={styles.clamp}>{text(value)}</span>;

  const cells = row
    ? [
        whole(text(row.serial_number) || serial, styles.centre),
        whole(text(row.department_number), styles.centre),
        whole(formDate(row.date), styles.centre),
        whole(clamp(row.full_name), styles.left),
        whole(text(row.sex), styles.centre),
        whole(text(row.age), styles.centre),
        split(text(row.national_id), text(row.cr_number), `${styles.centre} ${styles.idCell}`),
        split(text(row.physical_address), text(row.phone_number), styles.left),
        whole(text(row.referred_by), styles.centre),
        split(text(row.hiv_result), formDate(row.hiv_test_date), styles.centre),
        whole(
          <>
            <span className={styles.stacked}>{text(row.sample_type)}</span>
            <span className={styles.stacked}>{formDate(row.sample_date)}</span>
          </>,
          styles.centre,
        ),
        split(text(row.xray_result), formDate(row.xray_date), styles.centre),
        split(text(row.other_radiology_result), formDate(row.other_radiology_date), styles.centre),
        split(text(row.molecular_result), formDate(row.molecular_date), styles.centre),
        split(text(row.microscopy_result), formDate(row.microscopy_date), styles.centre),
        whole(text(row.outcome), styles.centre),
        split(text(row.started_tb_treatment), text(row.tb_registration), styles.centre),
        split(text(row.tpt_started), text(row.tpt_registration), styles.centre),
        whole(clamp(row.remarks), styles.left),
      ]
    : [
        whole(''),
        whole(''),
        whole(''),
        whole(''),
        whole(''),
        whole(''),
        split('', ''),
        split('', ''),
        whole(''),
        split('', ''),
        whole(''),
        split('', ''),
        split('', ''),
        split('', ''),
        split('', ''),
        whole(''),
        split('', ''),
        split('', ''),
        whole(''),
      ];

  return (
    <>
      <tr className={styles.upperLine}>
        {cells.map((cell, index) =>
          cell.split ? (
            <td key={index} className={cell.className}>
              {cell.upper}
            </td>
          ) : (
            <td key={index} rowSpan={2} className={cell.className}>
              {cell.upper}
            </td>
          ),
        )}
      </tr>
      <tr className={styles.lowerLine}>
        {cells.map((cell, index) =>
          cell.split ? (
            <td key={index} className={cell.className}>
              {cell.lower}
            </td>
          ) : null,
        )}
      </tr>
    </>
  );
};

/** The page summary and the form's code tables, beneath the register on the last page */
const Footer: React.FC<{ rows: PresumptiveTbRow[] }> = ({ rows }) => {
  const figures: Array<[string, string, number]> = [
    ['of presumptive TB cases', 'identified', rows.length],
    ['of presumptive TB cases', 'investigated for TB', rows.filter(isInvestigated).length],
    ['of presumptive TB cases', 'diagnosed with TB', rows.filter(isDiagnosed).length],
    ['of diagnosed TB cases initiated', 'on treatment', rows.filter(isInitiated).length],
  ];

  return (
    <div className={styles.footer}>
      <div className={styles.pageSummary}>
        <h5>Page summary</h5>
        {figures.map(([lead, tail, value]) => (
          <p key={tail}>
            <strong>Number</strong> {lead}
            <br />
            {tail} <span className={styles.blank}>{value}</span>
          </p>
        ))}
      </div>

      <table className={`${styles.codeTable} ${styles.results}`}>
        <thead>
          <tr>
            <th colSpan={2}>Results</th>
          </tr>
        </thead>
        <tbody>
          {MICROSCOPY_RESULTS.map(([microscopy, lamp]) => (
            <tr key={microscopy}>
              <td>{microscopy}</td>
              <td>{lamp}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className={`${styles.codeTable} ${styles.labCodes}`}>
        <thead>
          <tr>
            <th>
              Lab Result
              <br />
              (Code)
            </th>
            <th colSpan={2}>Gene Xpert test results</th>
          </tr>
        </thead>
        <tbody>
          {GENEXPERT_RESULTS.map(([code, meaning]) => (
            <tr key={code}>
              <td />
              <td>{code}</td>
              <td>{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className={`${styles.codeTable} ${styles.referredBy}`}>
        <thead>
          <tr>
            <th colSpan={2}>Patient referred by</th>
          </tr>
        </thead>
        <tbody>
          {REFERRED_BY.map(([label, code]) => (
            <tr key={code}>
              <td>{label}</td>
              <td>{code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className={`${styles.codeTable} ${styles.investigations}`}>
        <thead>
          <tr>
            <th>Investigations Done</th>
          </tr>
        </thead>
        <tbody>
          {INVESTIGATIONS.map((name, index) => (
            <tr key={index}>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * One A3 landscape page of the register. Pages before the last are ruled with
 * cases to the foot; the last has 9 rows with the page summary of the whole
 * register and the code tables beneath them.
 */
const RegisterPage: React.FC<{
  rows: PresumptiveTbRow[];
  firstSerial: number;
  page: number;
  pages: number;
  scale: number;
  /** every case in the register, given only to the last page */
  summaryRows?: PresumptiveTbRow[];
}> = ({ rows, firstSerial, page, pages, scale, summaryRows }) => (
  <section className={styles.page} data-register-page style={{ '--page-zoom': scale } as React.CSSProperties}>
    <table className={styles.register}>
      <colgroup>
        {COLUMN_WIDTHS.map((width, index) => (
          <col key={index} style={{ width: `${(width / COLUMN_TOTAL) * 100}%` }} />
        ))}
      </colgroup>
      <thead>
        <tr className={styles.letters}>
          {LETTERS.map((letter, index) => (
            <th key={index}>{letter}</th>
          ))}
        </tr>
        <tr className={styles.heading1}>
          <th rowSpan={3}>Serial No</th>
          <th rowSpan={3}>Patient department No. e.g. Patient CCC or OPD No.</th>
          <th rowSpan={3}>Date</th>
          <th rowSpan={3}>Full Names (First/ Middle/Last)</th>
          <th rowSpan={3}>Sex (M/F/ Others)</th>
          <th rowSpan={3}>Age in Yr/ Month</th>
          <th>Nationality and National ID/UPI/ NEMIS No.</th>
          <th rowSpan={3}>Physical Address and Phone number</th>
          <th rowSpan={3}>Referred by (PS /SR /CI / CP / CHV / ISP)</th>
          <th rowSpan={3}>HIV test results (Pos/ Neg/ Not Done) and Date of test</th>
          <th>Date Sputum collected</th>
          <th colSpan={4} className={styles.leftHeading}>
            Write the Investigation Done, Results and Date of results
          </th>
          <th rowSpan={3}>Outcome of Investigation (DSTB, DRTB or No TB)</th>
          <th>Started anti- TB treatment (Yes/No)</th>
          <th>TPT started (Yes/ No)</th>
          <th rowSpan={3}>Remarks</th>
        </tr>
        <tr className={styles.heading2}>
          <th rowSpan={2} />
          <th>Type of Sample (code)</th>
          <th className={styles.leftHeading}>X-ray (N/ SG/AO/ND)</th>
          <th className={styles.leftHeading}>Other Radiological test(s) done</th>
          <th className={styles.leftHeading}>Molecular / Culture test(s)</th>
          <th className={styles.leftHeading}>Microscopy/ TB LAMP</th>
          <th rowSpan={2} className={styles.leftHeading}>
            If Yes, Sub- county TB Registration No. &amp; start date
          </th>
          <th rowSpan={2} className={styles.leftHeading}>
            If Yes, TPT Sub- county register No. &amp; start date
          </th>
        </tr>
        <tr className={styles.heading3}>
          <th>Date Sputum Sample collected</th>
          <th />
          <th />
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: summaryRows ? ROWS_ON_LAST_PAGE : ROWS_PER_FULL_PAGE }, (_, index) => (
          <CaseRows key={index} row={rows[index]} serial={firstSerial + index} />
        ))}
      </tbody>
    </table>

    {summaryRows && <Footer rows={summaryRows} />}

    <div className={styles.pageFoot}>
      <span>
        Page {page} of {pages}
      </span>
      <span>MOH/REG/DNTLDP/02 · February 2023</span>
    </div>
  </section>
);

/**
 * PRESUMPTIVE TB REGISTER (MOH/REG/DNTLDP/02), page 4 of the form, as A3
 * landscape pages of cases, columns A to R. The page summary counts the whole
 * register, so it appears once, at the foot of the last page, with the form's
 * code tables.
 */
const PresumptiveTbRegister: React.FC<PresumptiveTbRegisterProps> = ({ rows }) => {
  const { ref, scale } = usePageScale<HTMLDivElement>(PAGE_WIDTH_MM);
  const pages = paginate(rows);
  const serials = pages.map((_, index) => pages.slice(0, index).reduce((sum, page) => sum + page.length, 0) + 1);

  return (
    <div className={styles.viewport} ref={ref}>
      {pages.map((pageRows, index) => (
        <RegisterPage
          key={index}
          rows={pageRows}
          firstSerial={serials[index]}
          page={index + 1}
          pages={pages.length}
          scale={scale}
          summaryRows={index === pages.length - 1 ? rows : undefined}
        />
      ))}
    </div>
  );
};

export default PresumptiveTbRegister;
