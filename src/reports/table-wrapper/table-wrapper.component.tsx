import React from 'react';
import classNames from 'classnames';
import styles from './table-wrapper.scss';

interface TableWrapperProps {
  children: React.ReactNode;
  /** Applied to the wrapper, so a report can use its own stylesheet */
  className?: string;
}

/**
 * The frame the form-shaped reports render their tables in.
 *
 * This used to be Carbon's `<Table>`, but every report that uses it is a
 * printed form rather than a data grid: Carbon sizes its rows to 2rem and pads
 * its cells to 1rem, at a specificity no report stylesheet can reasonably
 * outrank. A plain table carries none of those rules, so the reports size their
 * own cells for A4.
 */
const TableWrapper: React.FC<TableWrapperProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.tableWrapper, className)}>
      <table>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableWrapper;
