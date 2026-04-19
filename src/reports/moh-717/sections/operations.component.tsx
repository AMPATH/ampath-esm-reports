import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

interface OperationsComponentProps {
  moh717ReportData: any;
}

const OperationsComponent: React.FC<OperationsComponentProps> = ({ moh717ReportData }: { moh717ReportData: any }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th className={styles.totals}>B.3 OPERATIONS</th>
            <th className={styles.totals}>No. Booked</th>
            <th className={styles.totals}>No. Operated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>B.3.1 Minor Surgeries (excluding circumcision)</td>
            <td>{moh717ReportData.minor_surgeries_booked}</td>
            <td>{moh717ReportData.minor_surgeries_operated}</td>
          </tr>
          <tr>
            <td>B.3.1.1 Emergencies</td>
            <td>{moh717ReportData.emergencies_booked}</td>
            <td>{moh717ReportData.emergencies_operated}</td>
          </tr>
          <tr>
            <td>B.3.1.2 Cold Cases</td>
            <td>{moh717ReportData.cold_cases_booked}</td>
            <td>{moh717ReportData.cold_surgical_cases}</td>
          </tr>
          <tr>
            <td>B.3.2 Circumcision</td>
            <td>{moh717ReportData.circumcisions_booked}</td>
            <td>{moh717ReportData.circumcisions_operated}</td>
          </tr>
          <tr>
            <td>B.3.3 Major surgeries</td>
            <td>{moh717ReportData.major_surgeries_booked}</td>
            <td>{moh717ReportData.major_surgeries_operated}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OperationsComponent;
