import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';
import { formatDate, useSession } from '@openmrs/esm-framework';

const ReportCompiledByComponent: React.FC = () => {
  const session = useSession();

  /* Who produced the return and when. Designation and signature stay blank --
     those are signed by hand on the printed form. */
  const compiledBy = session?.user?.person?.display ?? session?.user?.display ?? '';
  const compiledOn = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

  return (
    <div className={styles.section}>
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
            <td className={styles.compiledBy}>{compiledBy}</td>
          </tr>
          <tr>
            <td></td>
            <td>Designation:</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>Date:</td>
            <td className={styles.compiledBy}>{compiledOn}</td>
          </tr>
          <tr>
            <td></td>
            <td>Signature</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportCompiledByComponent;
