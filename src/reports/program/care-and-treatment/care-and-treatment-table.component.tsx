import React from 'react';
import classNames from 'classnames';

import {
  AGE_BANDS,
  CARE_AND_TREATMENT_SECTIONS,
  isMchRow,
  rowTitle,
  SEXES,
  type AgeBand,
  type ReportRow,
  type ReportSection,
  type RowGroup,
  type Sex,
} from './care-and-treatment.config';
import styles from './care-and-treatment.scss';

export interface CellQuery {
  section: ReportSection;
  group: RowGroup;
  row: ReportRow;
  /** Every age band when absent: the Total column */
  band?: AgeBand;
  /** Both sexes when absent */
  sex?: Sex;
}

interface CareAndTreatmentTableProps {
  count: (cell: CellQuery) => number;
  /** Opens the clients of a cell */
  open: (cell: CellQuery) => void;
  /** Shown under the last row, inside the table's scrolling box (the notes) */
  footer?: React.ReactNode;
}

export const SEX_LABEL: Record<Sex, string> = { F: 'Female', M: 'Male' };

/**
 * The whole report as one table, laid out as the reporting form: the age
 * bands across the top once, F and M under each, then a Total column. Down
 * the side, each section's name is merged beside its rows, and a group's name
 * (e.g. `<6 months on ART`) beside its own. Every figure above 0 opens its
 * linelist; MCH/PMTCT rows have no male or under-10 cells.
 */
const CareAndTreatmentTable: React.FC<CareAndTreatmentTableProps> = ({ count, open, footer }) => {
  const describe = ({ group, row, band, sex }: CellQuery) =>
    [rowTitle(group, row), band ? `Age ${band.label}` : 'All ages', sex ? SEX_LABEL[sex] : undefined]
      .filter(Boolean)
      .join(' · ');

  const value = (cell: CellQuery) => {
    const amount = count(cell);
    if (amount === 0) {
      /* a quiet dot on screen; the PDF prints 0 (see .zero) */
      return <span className={styles.zero} aria-label="0" />;
    }
    return (
      <button type="button" className={styles.value} onClick={() => open(cell)} title={describe(cell)}>
        {amount.toLocaleString()}
      </button>
    );
  };

  const sectionRows = (section: ReportSection) => section.groups.reduce((n, group) => n + group.rows.length, 0);

  return (
    <div className={styles.tableScroll}>
      <table className={styles.grid} aria-label="Care & Treatment and ARV Management">
        <thead>
          <tr>
            <th colSpan={3} rowSpan={2} scope="col" className={styles.indicatorHead}>
              Indicator
            </th>
            {AGE_BANDS.map((band) => (
              <th key={band.id} colSpan={SEXES.length} scope="colgroup" className={styles.bandHead}>
                {band.label}
              </th>
            ))}
            <th rowSpan={2} scope="col" className={styles.totalHead}>
              Total
            </th>
          </tr>
          <tr>
            {AGE_BANDS.flatMap((band) =>
              SEXES.map((sex) => (
                <th
                  key={`${band.id}-${sex}`}
                  scope="col"
                  title={SEX_LABEL[sex]}
                  className={classNames(styles.sexHead, { [styles.bandStart]: sex === 'F' })}
                >
                  {sex}
                </th>
              )),
            )}
          </tr>
        </thead>
        {CARE_AND_TREATMENT_SECTIONS.map((section) => (
          <tbody key={section.id} id={`ct-${section.id}`} className={styles.section}>
            {section.groups.flatMap((group, groupIndex) =>
              group.rows.map((row, rowIndex) => {
                const mchOnly = isMchRow(section, row);
                return (
                  <tr
                    key={`${groupIndex}-${row.label}`}
                    className={classNames({
                      [styles.strongRow]: row.strong,
                      [styles.referenceRow]: row.reference,
                      [styles.notRecordedRow]: row.notRecorded,
                    })}
                  >
                    {groupIndex === 0 && rowIndex === 0 && (
                      <th scope="rowgroup" rowSpan={sectionRows(section)} className={styles.sectionCell}>
                        <span className={styles.sectionNumber}>{section.number}</span>
                        <span className={styles.sectionName}>{section.title}</span>
                      </th>
                    )}
                    {group.title && rowIndex === 0 && (
                      <th scope="rowgroup" rowSpan={group.rows.length} className={styles.groupCell}>
                        {group.title}
                      </th>
                    )}
                    <th
                      scope="row"
                      colSpan={group.title ? 1 : 2}
                      className={classNames(styles.rowLabel, { [styles.rowLabelWide]: !group.title })}
                    >
                      {row.label}
                    </th>
                    {AGE_BANDS.flatMap((band) =>
                      SEXES.map((sex) => {
                        const applies = !mchOnly || (sex === 'F' && !band.child);
                        return (
                          <td
                            key={`${band.id}-${sex}`}
                            className={classNames(styles.cell, {
                              [styles.bandStart]: sex === 'F',
                              [styles.notApplicable]: !applies,
                            })}
                          >
                            {applies && value({ section, group, row, band, sex })}
                          </td>
                        );
                      }),
                    )}
                    <td className={styles.totalCell}>{value({ section, group, row })}</td>
                  </tr>
                );
              }),
            )}
          </tbody>
        ))}
      </table>
      {footer}
    </div>
  );
};

export default CareAndTreatmentTable;
