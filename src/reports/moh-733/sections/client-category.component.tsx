import React from 'react';

import styles from '../moh-733.scss';
import classNames from 'classnames';

interface ClientCategoryComponentProps {
  moh733Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const ClientCategoryComponent: React.FC<ClientCategoryComponentProps> = ({
  moh733Data,
  startDate,
  endDate,
  locationUuids,
}) => {
  return (
    <div className={styles.category}>
      <div className={styles.section}>
        <table className={classNames(styles.table, styles.tableBordered)}>
          <thead>
            <tr>
              <th colSpan={2}>HIV Status</th>
              <th colSpan={3}>New</th>
              <th colSpan={3}>Revisit</th>
            </tr>
            <tr>
              <th>Age</th>
              <th>Sex</th>
              <th>Gen Pop</th>
              <th>HIV +ve</th>
              <th>HIV +ve + TB</th>
              <th>Gen Pop</th>
              <th>HIV +ve</th>
              <th>HIV +ve + TB</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={2}>0 - 5 Months</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}>6 - 59 Months</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}>5 - 9 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}>10-17 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}>18+ Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}>18 - 19 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.section}>
        <table className={classNames(styles.table, styles.tableBordered)}>
          <thead>
            <tr>
              <th colSpan={2}>TB Status</th>
              <th colSpan={2}>Total TB</th>
            </tr>
            <tr>
              <th>Age</th>
              <th>Sex</th>
              <th>New</th>
              <th>Revisit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={2}>0 - 5 Months</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}>6 - 59 Months</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}>5 - 9 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}>10-17 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}>18+ Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan={2}>18 - 19 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Female</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientCategoryComponent;
