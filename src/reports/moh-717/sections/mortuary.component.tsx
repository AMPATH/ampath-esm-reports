import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

interface MortuaryComponentProps {
  moh717ReportData: any;
}

const MortuaryComponent: React.FC<MortuaryComponentProps> = ({ moh717ReportData }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th>E. MORTUARY</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E.1 Body days</td>
            <td>{moh717ReportData.mortuary_body_days}</td>
          </tr>
          <tr>
            <td>E.2 Embalment</td>
            <td>{moh717ReportData.mortuary_embalment}</td>
          </tr>
          <tr>
            <td>E.3 Post-Mortem</td>
            <td>{moh717ReportData.mortuary_postmortem}</td>
          </tr>
          <tr>
            <td>E.4 Unclaimed body days</td>
            <td>{moh717ReportData.mortuary_unclaimed_bodies}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MortuaryComponent;
