import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface PhysiotherapyComponentProps {
  moh711Data: any;
}

const PhysiotherapyComponent: React.FC<PhysiotherapyComponentProps> = () => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th>K. PHYSIOTHERAPY SERVICE</th>
            <th>&lt;5 yrs</th>
            <th>5-19 yrs</th>
            <th>20 yrs +</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td rowSpan={2}>Number of PWDs identified and receiving physiotherapy</td>
            <td>OPD</td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Inpatient</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td rowSpan={2}>Number of clients/patients receiving physiotherapy</td>
            <td>OPD</td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Inpatient</td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td colSpan={2}>Total Number of treatments</td>
            <td></td>
          </tr>
          <tr>
            <td>6</td>
            <td colSpan={2}>PWDs assessed for registration</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PhysiotherapyComponent;
