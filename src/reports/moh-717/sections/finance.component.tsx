import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

interface FinanceComponentProps {
  moh717ReportData: any;
}

const FinanceComponent: React.FC<FinanceComponentProps> = ({ moh717ReportData }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={2}>G. FINANCE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>G.1 Total Amount Collected (Kshs)</td>
            <td>{}</td>
            <td>G.3 Clients waived</td>
            <td>{}</td>
            <td>Clients exempted</td>
            <td>{}</td>
          </tr>
          <tr>
            <td>G.2 Total Amount Received</td>
            <td>{}</td>
            <td>G.4 Clients waived (Kshs)</td>
            <td>{}</td>
            <td>G.5 Clients Exempted (Kshs)</td>
            <td>{}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FinanceComponent;
