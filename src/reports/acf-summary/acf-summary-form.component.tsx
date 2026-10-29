import React from 'react';
import dayjs from 'dayjs';

import { usePageScale } from '../../common/report-page';
import { COUNTED_DEPARTMENT } from './acf-summary.counts';
import styles from './acf-summary.scss';

/** A4 landscape less its 8mm margins: the page as drawn on screen, inside the report card */
const PAGE_WIDTH_MM = 297 - 2 * 8;

/** The form's measuring unit (row heights below) in millimetres */
const MM_PER_UNIT = 0.227;
const height = (units: number): React.CSSProperties => ({ height: `${units * MM_PER_UNIT}mm` });

/** The departments across the top, then Total; widths measured off the form */
const DEPARTMENTS: Array<[string, number]> = [
  ['OPD', 44],
  ['TB / Chest Clinic', 48],
  ['Maternity', 68],
  ['Medical ward', 73],
  ['Surgical ward', 77],
  ['Pediatric Ward', 82],
  ['CCC', 45],
  ['Radiology', 71],
  ['HTS', 42],
  ['Nutrition', 65],
  ['Diabtes', 67],
  ['Eye Clinic', 49],
  ['ENT clinic', 54],
  ['Dental clinic', 65],
  ['Laboratory', 82],
  ['Other departments', 89],
  ['Total', 49],
];
const LABEL_WIDTH = 138;
const TOTAL_WIDTH = DEPARTMENTS.reduce((sum, [, width]) => sum + width, LABEL_WIDTH);
const percent = (width: number) => `${(width / TOTAL_WIDTH) * 100}%`;

/** The indicators down the side, each with its row height as printed */
const INDICATORS: Array<[string, number]> = [
  ['1. Workload', 25],
  ['2. Number of people screened for TB', 48],
  ['3. Number of people with respiratory conditions', 58],
  ['4. Number of presumptive TB cases investigated for TB disease', 69],
  ['5. Number of presumptive TB cases diagnosed with TB', 73],
  ['6. Number of presumptive cases Bact.confirmed with TB', 84],
  ['7. Number of presumptive cases diagnosed with TB clinically', 85],
  ['8. Number of diagnosed TB cases initiated on treatment', 73],
];

/** A count on the form, opening the linelist of its cases when clicked; blank where there is none */
const Count: React.FC<{ value?: number; onOpen?: () => void }> = ({ value, onOpen }) =>
  value === undefined || !onOpen ? (
    <td className={styles.count} />
  ) : (
    <td
      className={`${styles.count} ${styles.clickable}`}
      title="Click to open linelist"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && onOpen()}
    >
      {value}
    </td>
  );

/** A label and the ruled line it is written on */
const Field: React.FC<{ label: string; value?: string; wide?: boolean }> = ({ label, value, wide }) => (
  <span className={styles.field}>
    {label}:<span className={wide ? styles.wideLine : styles.line}>{value}</span>
  </span>
);

interface AcfSummaryFormProps {
  facility: string;
  /** Any date in the reporting month */
  month: string;
  /** The counts by indicator number, for the TB / Chest Clinic and the Total;
      an indicator without one is left blank */
  counts?: Record<number, number>;
  /** Opens the linelist of an indicator's cases */
  onOpen?: (indicator: number) => void;
}

/**
 * Summary Tool for Facility-Based Active Case Finding (MOH/F/DNTLDP/02,
 * February 2023): page 2 of the tool as one A4 landscape sheet -- the eight ACF
 * indicators by department, with a Total column.
 *
 * Indicators 4 to 8 are counted from the Presumptive TB Register's cases (its
 * TB assessment encounters), under the TB / Chest Clinic and so the Total;
 * workload (1, from MOH 717), screened (2) and respiratory conditions (3) and
 * the other departments are blank until their queries are added.
 */
const AcfSummaryForm: React.FC<AcfSummaryFormProps> = ({ facility, month, counts = {}, onOpen }) => {
  const { ref, scale } = usePageScale<HTMLDivElement>(PAGE_WIDTH_MM);
  const date = month ? dayjs(month) : undefined;

  return (
    <div className={styles.viewport} ref={ref}>
      <section className={styles.page} data-register-page style={{ '--page-zoom': scale } as React.CSSProperties}>
        <h2 className={styles.title}>Summary Tool for Facility-Based Active Case Finding</h2>

        <div className={styles.fields}>
          <Field label="County" />
          <Field label="Sub County" />
          <Field label="Health Facility" value={facility} wide />
        </div>
        <div className={styles.fields}>
          <Field label="Month" value={date?.format('MMMM')} />
          <Field label="Year" value={date?.format('YYYY')} />
        </div>

        <table className={styles.grid}>
          <colgroup>
            <col style={{ width: percent(LABEL_WIDTH) }} />
            {DEPARTMENTS.map(([name, width]) => (
              <col key={name} style={{ width: percent(width) }} />
            ))}
          </colgroup>
          <thead>
            <tr style={height(50)}>
              <th />
              {DEPARTMENTS.map(([name]) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INDICATORS.map(([indicator, rowHeight], index) => (
              <tr key={indicator} style={height(rowHeight)}>
                <th scope="row">{indicator}</th>
                {DEPARTMENTS.map(([name]) => (
                  <Count
                    key={name}
                    value={name === COUNTED_DEPARTMENT || name === 'Total' ? counts[index + 1] : undefined}
                    onOpen={onOpen && (() => onOpen(index + 1))}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.signOff}>
          <span>
            Prepared by
            <span className={styles.dots} />
          </span>
          <span>
            Signature
            <span className={styles.dots} />
          </span>
          <span>
            Date
            <span className={styles.dots} />
          </span>
        </div>

        <div className={styles.instructions}>
          <strong>Instructions</strong>:
          <ol>
            <li>
              Workload- Information to be obtained from MOH 717
              <br />
              Summarize indicators 2-6 from departmental ACF summary tools
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default AcfSummaryForm;
