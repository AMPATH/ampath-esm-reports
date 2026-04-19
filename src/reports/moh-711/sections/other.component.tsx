import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface OtherComponentProps {
  moh711Data: any;
}

const OtherComponent: React.FC<OtherComponentProps> = ({ moh711Data }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={2}>L. OTHER</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Amount of FIF Collected</td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Amount of FIF Waived</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Amount of FIF Exempted</td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Number of Disability committee meetings held</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OtherComponent;
