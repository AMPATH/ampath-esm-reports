import React from 'react';

import { usePageScale } from '../../common/report-page';
import { AGE_BANDS, clientName, formDate, inBand, text, type Moh362Row } from './moh-362.types';
import styles from './moh-362-lab-register.scss';

interface Moh362LabRegisterProps {
  rows: Moh362Row[];
}

/** Rows ruled on the last page, which also holds the summary, as on the paper form */
const ROWS_ON_LAST_PAGE = 15;

/** Rows on every page before it: the summary's space ruled as further rows */
const ROWS_PER_FULL_PAGE = 23;

/** A4 landscape less its 8mm margins: the page as drawn on screen, inside the report card */
const PAGE_WIDTH_MM = 297 - 2 * 8;

const COLUMN_IDS = 'abcdefghijklmnopqr'.split('');

/**
 * Column widths, measured off page 5 of the form, as fractions of the sheet --
 * except the three HIV tests, widened from the remarks and provider columns to
 * fit each client's kit, lot and expiry under the result, the ID column, to fit
 * a whole Client Registry ID, and the final result, to fit "Inconclusive".
 */
const COLUMN_WIDTHS = [72, 114, 104, 238, 52, 48, 138, 71, 95, 83, 111, 111, 101, 78, 76, 79, 133, 99];
const COLUMN_TOTAL = COLUMN_WIDTHS.reduce((sum, width) => sum + width, 0);

type TestField = 'hiv_test1' | 'hiv_test2' | 'hiv_test3';

const TESTS: Array<{
  field: TestField;
  label: string;
  codes: string;
  kit: keyof Moh362Row;
  lot: keyof Moh362Row;
  expiry: keyof Moh362Row;
}> = [
  { field: 'hiv_test1', label: 'HIV Test 1', codes: '(N,P,I)', kit: 'kit1_name', lot: 'lot1', expiry: 'expiry1' },
  { field: 'hiv_test2', label: 'HIV Test 2', codes: '(N,P,I,NA)', kit: 'kit2_name', lot: 'lot2', expiry: 'expiry2' },
  { field: 'hiv_test3', label: 'HIV Test 3', codes: '(N,P,I,NA)', kit: 'kit3_name', lot: 'lot3', expiry: 'expiry3' },
];

const count = (rows: Moh362Row[], test: (row: Moh362Row) => boolean) => rows.filter(test).length;

/**
 * Full pages of rows, then a last page of at most 15 rows that carries the
 * summary. A full page never takes every remaining row, so the last page always
 * has at least one client on it.
 */
const paginate = (rows: Moh362Row[]) => {
  const pages: Moh362Row[][] = [];
  let start = 0;
  while (rows.length - start > ROWS_ON_LAST_PAGE) {
    const size = Math.min(ROWS_PER_FULL_PAGE, rows.length - start - 1);
    pages.push(rows.slice(start, start + size));
    start += size;
  }
  pages.push(rows.slice(start));
  return pages;
};

/**
 * One HIV test's header cell, ruled as on the form: the test, then the kit
 * name, lot number and expiry date lines, then its result codes. Each client's
 * own kit, lot and expiry are written under their result.
 */
const TestHeader: React.FC<{ test: (typeof TESTS)[number] }> = ({ test }) => (
  <th className={styles.testHeader}>
    <div className={styles.headerStack}>
      <span className={styles.testName}>{test.label}</span>
      <span className={styles.kit}>Kit Name:</span>
      <span>Lot No.</span>
      <span>
        Expiry Date
        <em>___/___/___</em>
      </span>
      <span className={styles.codes}>{test.codes}</span>
    </div>
  </th>
);

/** One client's HIV test: the result in full, with the kit, lot and expiry used beneath it */
const TestCell: React.FC<{ row: Moh362Row; test: (typeof TESTS)[number] }> = ({ row, test }) => {
  const detail = [text(row[test.kit]), text(row[test.lot]), formDate(row[test.expiry])].filter(Boolean).join(' · ');
  return (
    <td rowSpan={2} className={styles.testCell} title={detail || undefined}>
      {/* a box of the row's own height, so wrapping never makes the row taller */}
      <div className={styles.testBox}>
        <strong>{text(row[test.field])}</strong>
        {detail && <span className={styles.testDetail}>{detail}</span>}
      </div>
    </td>
  );
};

/** A heading with a dotted entry line above its result codes (n, o) */
const CodedHeader: React.FC<{ label: React.ReactNode; codes: string }> = ({ label, codes }) => (
  <th>
    <div className={styles.codedStack}>
      <span>{label}</span>
      <span className={styles.codes}>{codes}</span>
    </div>
  </th>
);

/** A heading holding two labels: upper cell above lower cell */
const SplitHeader: React.FC<{ upper: string; lower: string }> = ({ upper, lower }) => (
  <th className={styles.splitHeader}>
    <div className={styles.splitStack}>
      <span>{upper}</span>
      <span>{lower}</span>
    </div>
  </th>
);

/** A Tests (n) / Positive (n) block: age bands by sex, with totals */
const AgeSexSummary: React.FC<{ title: string; rows: Moh362Row[] }> = ({ title, rows }) => {
  const sexes = [
    { label: 'Male', code: 'M' },
    { label: 'Female', code: 'F' },
  ];
  return (
    <table className={styles.summaryTable}>
      <thead>
        <tr>
          <th className={styles.titleCell}>{title}</th>
          {AGE_BANDS.map((band) => (
            <th key={band.label}>{band.label}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {sexes.map((sex) => {
          const ofSex = rows.filter((row) => row.sex === sex.code);
          return (
            <tr key={sex.code}>
              <th className={styles.rowLabel}>{sex.label}</th>
              {AGE_BANDS.map((band) => (
                <td key={band.label}>{count(ofSex, (row) => inBand(row, band))}</td>
              ))}
              <td>{ofSex.length}</td>
            </tr>
          );
        })}
        <tr>
          <th className={styles.rowLabel}>Total</th>
          {AGE_BANDS.map((band) => (
            <td key={band.label}>{count(rows, (row) => inBand(row, band))}</td>
          ))}
          <td>{rows.length}</td>
        </tr>
      </tbody>
    </table>
  );
};

/** A labelled single figure: Tests Facility (j), Discordant (o) ... */
const FigureRows: React.FC<{ figures: Array<[React.ReactNode, number]> }> = ({ figures }) => (
  <table className={styles.summaryTable}>
    <tbody>
      {figures.map(([label, value], index) => (
        <tr key={index}>
          <th className={styles.figureLabel}>{label}</th>
          <td className={styles.figure}>{value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

/** A titled box holding one figure: Total Negative (n), Inconclusive test (n) */
const FigureBox: React.FC<{ title: string; value: number }> = ({ title, value }) => (
  <table className={`${styles.summaryTable} ${styles.figureBox}`}>
    <thead>
      <tr>
        <th>{title}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{value}</td>
      </tr>
    </tbody>
  </table>
);

/** The summary blocks at the foot of the last page, counting every client in the register */
const PageSummary: React.FC<{ rows: Moh362Row[] }> = ({ rows }) => {
  const positives = rows.filter((row) => row.final_result === 'Positive');
  const isKvp = (row: Moh362Row) => row.population_type === 'KVP';
  const tests = TESTS.map((test, index) => {
    const by = (result: string) => count(rows, (row) => row[test.field] === result);
    const n = by('Negative');
    const p = by('Positive');
    const i = by('Inconclusive');
    return { label: `${test.label} (${'klm'[index]})`, n, p, i, total: n + p + i };
  });
  const lines: Array<[string, 'n' | 'p' | 'i' | 'total' | null]> = [
    ['N: Negative', 'n'],
    ['P: Positive', 'p'],
    ['I: Invalid', 'i'],
    ['Wastage:', null],
    ['Total:', 'total'],
  ];

  return (
    <div className={styles.summary}>
      <div className={styles.summaryColumn}>
        <AgeSexSummary title="Tests (n )" rows={rows} />
        <AgeSexSummary title="Positive (n)" rows={positives} />
      </div>

      <div className={styles.summaryColumn}>
        <FigureBox title="Total Negative (n)" value={count(rows, (row) => row.final_result === 'Negative')} />
        <FigureBox title="Inconclusive test (n)" value={count(rows, (row) => row.final_result === 'Inconclusive')} />
      </div>

      <div className={styles.summaryColumn}>
        <FigureRows
          figures={[
            ['Tests Facility (j)', count(rows, (row) => row.setting === 'Facility')],
            ['Tests Community (j)', count(rows, (row) => row.setting === 'Community')],
          ]}
        />
        <FigureRows figures={[['Discordant (o)', count(rows, (row) => row.discordant_couple === 'Yes')]]} />
        <FigureRows
          figures={[
            ['Tests Key pops (i)', count(rows, isKvp)],
            [
              <>
                Positive Key pops
                <br />
                (i) &amp; (n)
              </>,
              count(positives, isKvp),
            ],
          ]}
        />
      </div>

      <div className={styles.summaryColumn}>
        <table className={styles.summaryTable}>
          <thead>
            <tr>
              {tests.map((test) => (
                <React.Fragment key={test.label}>
                  <th className={styles.titleCell}>{test.label}</th>
                  <th>Number</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {lines.map(([label, key]) => (
              <tr key={label}>
                {tests.map((test) => (
                  <React.Fragment key={test.label}>
                    <th className={styles.rowLabel}>{label}</th>
                    {/* wastage is counted on the kits, not recorded per client */}
                    <td>{key ? test[key] : ''}</td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/** One client: two ruled lines, columns (b) and (i) split into upper and lower cells */
const ClientRows: React.FC<{ row?: Moh362Row; serial?: number }> = ({ row, serial }) => {
  if (!row) {
    return (
      <>
        <tr className={styles.upperLine}>
          {COLUMN_IDS.map((id) => (
            <td
              key={id}
              rowSpan={id === 'b' || id === 'i' ? 1 : 2}
              className={id === 'b' || id === 'i' ? styles.upperCell : undefined}
            />
          ))}
        </tr>
        <tr className={styles.lowerLine}>
          <td className={styles.lowerCell} />
          <td className={styles.lowerCell} />
        </tr>
      </>
    );
  }

  return (
    <>
      <tr className={styles.upperLine}>
        <td rowSpan={2}>{text(row.serial_number) || serial}</td>
        <td className={`${styles.upperCell} ${styles.idCell}`}>{text(row.id_number)}</td>
        <td rowSpan={2}>{formDate(row.date_of_visit)}</td>
        <td rowSpan={2} className={styles.left}>
          <span className={styles.clamp}>{clientName(row)}</span>
        </td>
        <td rowSpan={2}>{text(row.age)}</td>
        <td rowSpan={2}>{text(row.sex)}</td>
        <td rowSpan={2}>{text(row.telephone)}</td>
        <td rowSpan={2}>{text(row.marital_status)}</td>
        <td className={styles.upperCell}>{text(row.population_type)}</td>
        <td rowSpan={2}>{text(row.setting)}</td>
        {TESTS.map((test) => (
          <TestCell key={test.field} row={row} test={test} />
        ))}
        <td rowSpan={2} className={styles.finalResult}>
          {text(row.final_result)}
        </td>
        <td rowSpan={2}>{text(row.discordant_couple)}</td>
        <td rowSpan={2}>
          <span className={styles.clamp}>{text(row.referral_services)}</span>
        </td>
        <td rowSpan={2} className={styles.left}>
          <span className={styles.clamp}>{text(row.hts_provider)}</span>
        </td>
        <td rowSpan={2} className={styles.left}>
          <span className={styles.clamp}>{text(row.initial_remarks)}</span>
        </td>
      </tr>
      <tr className={styles.lowerLine}>
        <td className={`${styles.lowerCell} ${styles.idCell}`}>{text(row.nupi)}</td>
        <td className={styles.lowerCell}>{text(row.sub_population)}</td>
      </tr>
    </>
  );
};

/**
 * One A4 landscape page of the register. Pages before the last are ruled with
 * client rows to the foot; the last has 15 rows with the summary of the whole
 * register beneath them, in one frame.
 */
const LabRegisterPage: React.FC<{
  rows: Moh362Row[];
  firstSerial: number;
  page: number;
  pages: number;
  scale: number;
  /** every client in the register, given only to the last page */
  summaryRows?: Moh362Row[];
}> = ({ rows, firstSerial, page, pages, scale, summaryRows }) => (
  <section className={styles.page} data-register-page style={{ '--page-zoom': scale } as React.CSSProperties}>
    <div className={styles.runningHead}>
      <span>Ministry Of Health</span>
      <span>MOH 362 HTS LAB, REFERRAL AND LINKAGE REGISTER</span>
      <span>Ver. July 2023</span>
    </div>
    <h4 className={styles.title}>MOH 362: HTS LAB REGISTER</h4>

    <div className={summaryRows ? `${styles.frame} ${styles.lastFrame}` : styles.frame}>
      <table className={styles.register}>
        <colgroup>
          {COLUMN_WIDTHS.map((width, index) => (
            <col key={index} style={{ width: `${(width / COLUMN_TOTAL) * 100}%` }} />
          ))}
        </colgroup>
        <thead>
          <tr className={styles.headings}>
            <th>
              Serial
              <br />
              Number
            </th>
            <SplitHeader
              upper="National Identification Number"
              lower="National Unique Patient Identifier (NUPI) Number"
            />
            <th>
              Date of visit
              <br />
              (DD/MM/YYYY)
            </th>
            <th>
              Client Name
              <br />
              (First, Middle, Last)
            </th>
            <th>Age</th>
            <th>
              Sex
              <br />
              (M/F)
            </th>
            <th>Telephone Number</th>
            <th className={styles.codeList}>
              Marital
              <br />
              Status
              <br />
              1=Married
              <br />
              2=Widowed
              <br />
              3=Single
              <br />
              4=Divorced
              <br />
              5=Separated
            </th>
            <th className={styles.codeList}>
              Population Type
              <br />
              1. Gen Pop
              <br />
              2. Key and Vulnerable Pop.
              <br />
              <br />
              Codes for KVP
              <br />- DC
              <br />- MSM/MSW
              <br />- FSW
              <br />- PWID/PWUD
              <br />- VP
            </th>
            <th className={styles.codeList}>
              Setting
              <br />
              (1=Facility
              <br />
              2=Community)
            </th>
            {TESTS.map((test) => (
              <TestHeader key={test.field} test={test} />
            ))}
            <CodedHeader
              label={
                <>
                  Final HIV
                  <br />
                  Result
                </>
              }
              codes="(N,P,Ic,NA)"
            />
            <CodedHeader
              label={
                <>
                  Discordant
                  <br />
                  Couple
                </>
              }
              codes="(Y/N/NA)"
            />
            <th>
              <div className={styles.referralStack}>
                <span>
                  Referred for
                  <br />
                  Prevention
                  <br />
                  Services
                </span>
                <span>
                  1. PrEP
                  <br />
                  2. PEP
                  <br />
                  3. VMMC
                  <br />
                  4. PMTCT
                  <br />
                  5.NA
                </span>
              </div>
            </th>
            <th>
              HTS Provider
              <br />
              (Name)
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
          {Array.from({ length: summaryRows ? ROWS_ON_LAST_PAGE : ROWS_PER_FULL_PAGE }, (_, index) => (
            <ClientRows key={index} row={rows[index]} serial={firstSerial + index} />
          ))}
        </tbody>
      </table>

      {summaryRows && (
        <>
          <PageSummary rows={summaryRows} />

          <div className={styles.signOff}>
            <span>
              Supervisor&apos;s Name: <span className={styles.rule} />
            </span>
            <span>
              Signature: <span className={styles.rule} />
            </span>
          </div>
        </>
      )}
    </div>

    <div className={styles.pageFoot}>
      <span>
        Page {page} of {pages}
      </span>
      <span>Ver. July 2023</span>
    </div>
  </section>
);

/**
 * MOH 362: HTS LAB REGISTER (Ver. July 2023), page 5 of the MOH 362 form, as
 * A4 landscape pages of clients, columns (a) to (r). The summary blocks sum
 * the whole register, so they appear once, at the foot of the last page.
 */
const Moh362LabRegister: React.FC<Moh362LabRegisterProps> = ({ rows }) => {
  const { ref, scale } = usePageScale<HTMLDivElement>(PAGE_WIDTH_MM);
  const pages = paginate(rows);
  const serials = pages.map((_, index) => pages.slice(0, index).reduce((sum, page) => sum + page.length, 0) + 1);

  return (
    <div className={styles.reportFrame}>
      <div className={styles.viewport} ref={ref}>
        {pages.map((pageRows, index) => (
          <LabRegisterPage
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
    </div>
  );
};

export default Moh362LabRegister;
