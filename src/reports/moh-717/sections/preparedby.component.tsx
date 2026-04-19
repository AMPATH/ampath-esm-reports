import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

const PreparedbyComponent: React.FC = () => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Designation</th>
            <th>Date</th>
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Prepared by:</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Checked by:</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Received by:</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PreparedbyComponent;
