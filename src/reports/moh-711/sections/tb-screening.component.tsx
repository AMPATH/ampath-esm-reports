import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface TBScreeningProps {
  moh711Data: any;
}

const TBScreeningComponent: React.FC<TBScreeningProps> = ({ moh711Data }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={2}>M. TB SCREENING</th>
            <th>0 - 14 years</th>
            <th>15 years +</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Total Number of people screened</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Total Number of presumptive TB cases</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Total Number of already on TB treatment</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Total Number of people not screened</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TBScreeningComponent;
