import React, { useMemo } from 'react';
import TableWrapper from '../../table-wrapper/table-wrapper.component';
import TableRowMapper from '../../table-wrapper/table-row-mapper.component';
import { getCell } from '../../../utils/utils';
import styles from '../moh-240.scss';

/**
 * Encounter types that count as inpatient (IP). The OPD/IP split on this
 * summary depends on the site's encounter dictionary, which this module
 * cannot know; while the set is empty the combined count is shown under OPD
 * and the IP cell stays blank rather than claiming a split.
 */
const INPATIENT_ENCOUNTER_TYPES: number[] = [];

/** Reference-lab tests count as the form's "special" tests; the rest are routine */
const SPECIAL_TEST_FLAGS = ['total_cd4', 'total_viral_load_specimens', 'total_tb_culture_specimens'];

interface Moh240PageSummaryProps {
  /** The register rows currently fetched; the printed form summarises a page */
  rows?: Array<Record<string, any>>;
}

const Moh240PageSummary: React.FC<Moh240PageSummaryProps> = ({ rows = [] }) => {
  const flagCount = (flag: string, inpatient: boolean) =>
    rows.filter(
      (row) => Number(row[flag]) === 1 && INPATIENT_ENCOUNTER_TYPES.includes(Number(row.encounter_type)) === inpatient,
    ).length;

  /* combined OPD+IP under the OPD cell while the split is undeterminable */
  const malariaCell = (flag: string, inpatient: boolean) =>
    INPATIENT_ENCOUNTER_TYPES.length === 0
      ? inpatient
        ? ''
        : String(flagCount(flag, false) + flagCount(flag, true))
      : String(flagCount(flag, inpatient));

  const summary = useMemo(
    () => ({
      bsUnderFive: [malariaCell('total_malaria_bs_under_5', false), malariaCell('total_malaria_bs_under_5', true)],
      bsFiveAndAbove: [
        malariaCell('total_malaria_bs_5_and_above', false),
        malariaCell('total_malaria_bs_5_and_above', true),
      ],
      rdtUnderFive: [malariaCell('total_malaria_rdt_under_5', false), malariaCell('total_malaria_rdt_under_5', true)],
      rdtFiveAndAbove: [
        malariaCell('total_malaria_rdt_5_and_above', false),
        malariaCell('total_malaria_rdt_5_and_above', true),
      ],
      routineTests: rows.filter(
        (row) => Number(row.total_exam) === 1 && !SPECIAL_TEST_FLAGS.some((flag) => Number(row[flag]) === 1),
      ).length,
      specialTests: rows.filter((row) => SPECIAL_TEST_FLAGS.some((flag) => Number(row[flag]) === 1)).length,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows],
  );

  const tableRows = useMemo(
    () => [
      {
        tableCells: [getCell('', 'Page Summary', 8, 1, true)],
      },
      {
        tableCells: [
          getCell('', 'Malaria Testing', 3, 1, true),
          getCell('', 'Type of test', 2, 1, true),
          getCell('', 'Referrals', 3, 1, true),
        ],
      },
      {
        tableCells: [
          getCell('', '', 1, 2, true),
          getCell('', 'Number', 2, 1, true),
          getCell('', '', 1, 2, true),
          getCell('', 'Number', 1, 2, true),
          getCell('', '', 1, 1, true),
          getCell('', 'Number', 2, 1, true),
        ],
      },
      {
        tableCells: [
          ,
          getCell('', 'OPD', 1, 1, true),
          getCell('', 'IP', 1, 1, true),
          ,
          ,
          getCell(),
          getCell('', 'Routine', 1, 1, true),
          getCell('', 'Specialized', 1, 1, true),
        ],
      },
      {
        tableCells: [
          getCell('', 'Malaria BS (Under five years)'),
          getCell('', summary.bsUnderFive[0]),
          getCell('', summary.bsUnderFive[1]),
          getCell('', 'No. of Routine tests', 1, 2),
          getCell('', String(summary.routineTests), 1, 2),
          getCell('', 'From Other HF'),
          getCell(),
          getCell(),
        ],
      },
      {
        tableCells: [
          getCell('', 'Malaria BS (5 years and above)'),
          getCell('', summary.bsFiveAndAbove[0]),
          getCell('', summary.bsFiveAndAbove[1]),
          ,
          ,
          getCell('', 'To Other HF'),
          getCell(),
          getCell(),
        ],
      },
      {
        tableCells: [
          getCell('', 'Malaria Rapid Diagnostic Tests (Under five years)'),
          getCell('', summary.rdtUnderFive[0]),
          getCell('', summary.rdtUnderFive[1]),
          getCell('', 'No. of Special tests', 1, 2),
          getCell('', String(summary.specialTests), 1, 2),
          getCell('', 'To Reference Laboratories', 1, 2),
          getCell('', '', 1, 2),
          getCell('', '', 1, 2),
        ],
      },
      {
        tableCells: [
          getCell('', 'Malaria Rapid Diagnostic Tests (5 years and above)'),
          getCell('', summary.rdtFiveAndAbove[0]),
          getCell('', summary.rdtFiveAndAbove[1]),
        ],
      },
    ],
    [summary],
  );

  return (
    <div className={styles.summarySection}>
      <TableWrapper className={styles.formTable}>
        <TableRowMapper tableRows={tableRows} />
      </TableWrapper>
    </div>
  );
};

export default Moh240PageSummary;
