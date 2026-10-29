import React from 'react';

import { usePageScale } from '../../common/report-page';
import { AGE_BANDS, METHODS, moh267Summary, type AgeSexCounts, type Population } from './moh-267-summary';
import { formDate, text, type Moh267Row } from './moh-267.types';
import styles from './moh-267-register.scss';

interface Moh267RegisterProps {
  rows: Moh267Row[];
  /** the period's last day, for the clients on PrEP at least 3 months */
  endDate: string;
  /** the visits in the calendar month of the period's end, for TOTAL this Month */
  monthVisits: number;
}

/** Rows ruled on the last page, which also holds the summary tables, as on the form */
const ROWS_ON_LAST_PAGE = 15;

/** Rows on every page before it: the summary's space ruled as further rows */
const ROWS_PER_FULL_PAGE = 22;

/** A4 landscape less its 8mm margins: the page as drawn on screen, inside the report card */
const PAGE_WIDTH_MM = 297 - 2 * 8;

const COLUMN_IDS = 'abcdefghijk'.split('');

/** Column widths, measured off page 3 of the form, as fractions of the sheet */
const COLUMN_WIDTHS = [147, 166, 199, 104, 115, 203, 150, 219, 165, 137, 244];
const COLUMN_TOTAL = COLUMN_WIDTHS.reduce((sum, width) => sum + width, 0);

/**
 * The summary tables' rows, as each table words them, and the register's
 * population each counts. MSM/MSW are male and FSW female, so the other sex's
 * cells are shaded as on the form.
 */
type SummaryRow = { label: string; population: Population | 'TOTAL'; only?: 'M' | 'F' };
const summaryRows = (pwid: string, vulnerable: string): SummaryRow[] => [
  { label: 'General popn', population: 'General Population' },
  { label: 'MSM/MSW', population: 'MSM/MSW', only: 'M' },
  { label: 'FSW', population: 'FSW', only: 'F' },
  { label: pwid, population: 'PWID/PWUD' },
  { label: 'Discordant Couple', population: 'Discordant Couple' },
  { label: vulnerable, population: 'VP' },
  { label: 'TOTAL', population: 'TOTAL' },
];

/**
 * Full pages of rows, then a last page of at most 15 rows that carries the
 * summary. A full page never takes every remaining row, so the last page always
 * has at least one visit on it.
 */
const paginate = (rows: Moh267Row[]) => {
  const pages: Moh267Row[][] = [];
  let start = 0;
  while (rows.length - start > ROWS_ON_LAST_PAGE) {
    const size = Math.min(ROWS_PER_FULL_PAGE, rows.length - start - 1);
    pages.push(rows.slice(start, start + size));
    start += size;
  }
  pages.push(rows.slice(start));
  return pages;
};

/** One visit: two ruled lines, column (c) split into national ID over NUPI */
const VisitRows: React.FC<{ row?: Moh267Row }> = ({ row }) => (
  <>
    <tr className={styles.upperLine}>
      <td rowSpan={2}>{text(row?.prep_number)}</td>
      <td rowSpan={2}>{formDate(row?.date_of_visit)}</td>
      <td className={styles.upperCell}>{text(row?.id_number)}</td>
      <td rowSpan={2}>{text(row?.age)}</td>
      <td rowSpan={2}>{text(row?.sex)}</td>
      <td rowSpan={2}>{text(row?.population_type)}</td>
      <td rowSpan={2}>{text(row?.prep_status)}</td>
      <td rowSpan={2}>{text(row?.prep_method)}</td>
      <td rowSpan={2}>{text(row?.hiv_result)}</td>
      <td rowSpan={2}>{text(row?.sti_diagnosed)}</td>
      <td rowSpan={2} className={styles.left}>
        <span className={styles.clamp}>{text(row?.remarks)}</span>
      </td>
    </tr>
    <tr className={styles.lowerLine}>
      <td className={styles.lowerCell}>{text(row?.nupi)}</td>
    </tr>
  </>
);

/**
 * A total row's figure: the number of visits -- the page's, or the calendar
 * month's -- in the first column after the label, the rest of the row left
 * ruled and blank
 */
const VisitTotals: React.FC<{ visits: number }> = ({ visits }) => (
  <>
    <td>{visits}</td>
    {COLUMN_IDS.slice(4).map((id) => (
      <td key={id} />
    ))}
  </>
);

/** An age-band-by-sex summary table: initiated on PrEP, current on PrEP, diagnosed with STI */
const AgeSexTable: React.FC<{
  title: string;
  corner?: React.ReactNode;
  rows: SummaryRow[];
  counts: AgeSexCounts;
}> = ({ title, corner, rows, counts }) => (
  <table className={`${styles.summaryTable} ${styles.ageTable}`}>
    <thead>
      <tr>
        <th rowSpan={3} className={styles.rowLabel}>
          {corner}
        </th>
        <th colSpan={9}>{title}</th>
        <th />
      </tr>
      <tr>
        {AGE_BANDS.map((band) => (
          <th key={band.label} colSpan={2}>
            {band.label}
          </th>
        ))}
      </tr>
      <tr>
        {AGE_BANDS.map((band) => (
          <React.Fragment key={band.label}>
            <th>M</th>
            <th>F</th>
          </React.Fragment>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((population) => (
        <tr key={population.label}>
          <th className={styles.rowLabel}>{population.label}</th>
          {AGE_BANDS.map((band, bandIndex) =>
            (['M', 'F'] as const).map((sex) =>
              population.only && population.only !== sex ? (
                <td key={`${band.label}-${sex}`} className={styles.notApplicable} />
              ) : (
                <td key={`${band.label}-${sex}`}>{counts(population.population, bandIndex, sex)}</td>
              ),
            ),
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

/** The summary tables at the foot of the last page, counting every visit in the register */
const Summary: React.FC<{ rows: Moh267Row[]; endDate: string }> = ({ rows, endDate }) => {
  const summary = moh267Summary(rows, endDate);
  return (
    <div className={styles.summary}>
      <AgeSexTable
        title="Number initiated (New) on PrEP (g)"
        rows={summaryRows('PWID/PWUD', 'Vulnerable Pop.')}
        counts={summary.initiated}
      />
      <AgeSexTable
        title="Number Current on PrEP"
        corner={
          <>
            New +<br />
            Refill +<br />
            Restart
          </>
        }
        rows={summaryRows('PWID', 'VP')}
        counts={summary.current}
      />
      <AgeSexTable
        title="Number diagnosed with STI (j)"
        rows={summaryRows('PWID', 'Vulnerable Pop.')}
        counts={summary.sti}
      />

      <div className={styles.methodColumn}>
        <table className={`${styles.summaryTable} ${styles.methodTable}`}>
          <thead>
            <tr>
              <th rowSpan={2} className={styles.rowLabel}>
                Indicator/
                <br />
                PrEP method
              </th>
              <th colSpan={5}>Number of Clients on each PrEP method (h)</th>
            </tr>
            <tr>
              <th>
                Event
                <br />
                Driven
              </th>
              <th>
                Daily
                <br />
                Oral
              </th>
              <th>
                Dapivirine
                <br />
                Vaginal
              </th>
              <th>
                Cabotegravir
                <br />
                injectable
              </th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {summary.methods.map((indicator) => (
              <tr key={indicator.label}>
                <th className={styles.rowLabel}>{indicator.label}</th>
                {METHODS.map((method) => (
                  <td key={method}>{indicator.count(method)}</td>
                ))}
                {/* every method, Lenacapavir included, which has no column of its own */}
                <td>{indicator.count('Total')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className={`${styles.summaryTable} ${styles.seroconverting}`}>
          <tbody>
            <tr>
              <th>Number Seroconverting while on PrEP (i)</th>
              <td>{summary.seroconverted}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * One A4 landscape page of the register. Pages before the last are ruled with
 * visits and their page total; the last has 15 rows, the page and month
 * totals, and the summary tables beneath, in one frame.
 */
const RegisterPage: React.FC<{
  rows: Moh267Row[];
  page: number;
  pages: number;
  scale: number;
  /** every visit in the register and the period's end, given only to the last page */
  summary?: { rows: Moh267Row[]; endDate: string; monthVisits: number };
}> = ({ rows, page, pages, scale, summary }) => {
  const isLast = summary !== undefined;
  return (
    <section className={styles.page} data-register-page style={{ '--page-zoom': scale } as React.CSSProperties}>
      <div className={styles.runningHead}>
        <span>Ministry Of Health</span>
        <span>MOH 267 PrEP Daily Activity Register</span>
        <span>Ver. July 2023</span>
      </div>

      <div className={isLast ? `${styles.frame} ${styles.lastFrame}` : styles.frame}>
        <table className={styles.register}>
          <colgroup>
            {COLUMN_WIDTHS.map((width, index) => (
              <col key={index} style={{ width: `${(width / COLUMN_TOTAL) * 100}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr className={styles.headings}>
              <th>PrEP No</th>
              <th>Date of Visit</th>
              <th className={styles.splitHeader}>
                <div className={styles.splitStack}>
                  <span>National Identification Number</span>
                  <span>National Unique Patient Identifier (NUPI)</span>
                </div>
              </th>
              <th>Age</th>
              <th>
                Sex
                <br />
                (M/F)
              </th>
              <th className={styles.codeHeading}>
                <strong>Population type</strong>
                <br />
                (Use the codes):
                <br />
                1. General Population
                <br />
                2. Discordant Couple
                <br />
                3. MSM/MSW
                <br />
                4. FSW
                <br />
                5. PWID/PWUD
                <br />
                6. VP
              </th>
              <th className={styles.codeHeading}>
                <strong>Client PrEP Status:</strong>
                <br />
                <strong>N</strong>- New
                <br />
                <strong>C</strong>- Continuing
                <br />
                <strong>D</strong>-Discontinued
                <br />
                <strong>R</strong>-Restart
              </th>
              <th className={styles.codeHeading}>
                <strong>PrEP Method:</strong>
                <br />
                <strong>1.</strong> Daily oral PrEP
                <br />
                <strong>2.</strong> Event driven oral PrEP
                <br />
                <strong>3.</strong> Dapivirine Vaginal ring
                <br />
                <strong>4.</strong> Cabotegravir Injectable
              </th>
              <th>
                HIV Results
                <br />
                <span className={styles.codes}>(N/P/Ic/NA)</span>
              </th>
              <th>
                Diagnosed with
                <br />
                STI
                <br />
                <br />
                <span className={styles.codes}>(N/Y)</span>
              </th>
              <th>Remarks</th>
            </tr>
            <tr className={styles.columnIds}>
              {COLUMN_IDS.map((id) => (
                <th key={id}>({id})</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: isLast ? ROWS_ON_LAST_PAGE : ROWS_PER_FULL_PAGE }, (_, index) => (
              <VisitRows key={index} row={rows[index]} />
            ))}
            <tr className={styles.totalRow}>
              <th colSpan={3} className={styles.left}>
                TOTAL this Page
              </th>
              <VisitTotals visits={rows.length} />
            </tr>
            {isLast && (
              <tr className={styles.totalRow}>
                <th colSpan={3} className={styles.left}>
                  TOTAL this Month
                </th>
                <VisitTotals visits={summary.monthVisits} />
              </tr>
            )}
          </tbody>
        </table>

        {summary && <Summary rows={summary.rows} endDate={summary.endDate} />}
      </div>

      <div className={styles.pageFoot}>
        <span>
          Page {page} of {pages}
        </span>
        <span>Ver. July 2023</span>
      </div>
    </section>
  );
};

/**
 * MOH 267 PrEP DAILY ACTIVITY REGISTER (Ver. July 2023), page 3 of the form,
 * as A4 landscape pages of visits, columns (a) to (k). The summary tables sum
 * the whole register, so they appear once, at the foot of the last page.
 */
const Moh267Register: React.FC<Moh267RegisterProps> = ({ rows, endDate, monthVisits }) => {
  const { ref, scale } = usePageScale<HTMLDivElement>(PAGE_WIDTH_MM);
  const pages = paginate(rows);

  return (
    <div className={styles.viewport} ref={ref}>
      {pages.map((pageRows, index) => (
        <RegisterPage
          key={index}
          rows={pageRows}
          page={index + 1}
          pages={pages.length}
          scale={scale}
          summary={index === pages.length - 1 ? { rows, endDate, monthVisits } : undefined}
        />
      ))}
    </div>
  );
};

export default Moh267Register;
