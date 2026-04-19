import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface RehabilitationComponentProps {
  moh711Data: any;
}

const RehabilitationComponent: React.FC<RehabilitationComponentProps> = ({ moh711Data }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th></th>
            <th colSpan={2}>I. Rehabilitation Services</th>
          </tr>
          <tr>
            <th></th>
            <th className={styles.greyBackground}></th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Number Assessed</td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Number Treated</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Number Rehabilitated</td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Rehab referred for further Interventions</td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Number Integrated to Communities</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default RehabilitationComponent;
