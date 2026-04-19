import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

const ReportCompiledByComponent: React.FC = () => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={3}>Report Compiled By:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Name:</td>
            <td className={styles.compiledBy}></td>
          </tr>
          <tr>
            <td></td>
            <td>Designation:</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>Date:</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>Signature</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ReportCompiledByComponent;
