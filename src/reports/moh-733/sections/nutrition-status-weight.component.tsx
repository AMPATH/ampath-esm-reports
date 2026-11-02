import React from 'react';

import styles from '../moh-733.scss';
import classNames from 'classnames';
interface NutritionStatusWeightComponentProps {
  moh733Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const NutritionStatusWeightComponent: React.FC<NutritionStatusWeightComponentProps> = ({
  moh733Data,
  startDate,
  endDate,
  locationUuids,
}) => {
  return (
    <>
      <div className={styles.category}>
        <div className={styles.section}>
          <table className={classNames(styles.table, styles.tableBordered, styles.nutritionStatusTable)}>
            <thead>
              <tr>
                <th colSpan={9}>At risk of under nutrition</th>
              </tr>
              <tr>
                <th>Sex</th>
                <th colSpan={4}>Male</th>
                <th colSpan={4}>Female</th>
              </tr>
              <tr>
                <th>Age</th>
                <th>Gen Pop</th>
                <th>HIV +ve</th>
                <th>HIV/TB Coinfected</th>
                <th>TB only</th>
                <th>Gen Pop</th>
                <th>HIV +ve</th>
                <th>HIV/TB Coinfected</th>
                <th>TB only</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0 - 5 Months</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>6 - 59 Months</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>5 - 9 Years</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>10 - 17 Years</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18+ Years</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18 - 19 Years</td>
                <td></td>
                <td></td>
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
          <table className={classNames(styles.table, styles.tableBordered, styles.nutritionStatusTable)}>
            <thead>
              <tr>
                <th colSpan={9}>Overweight/Obese</th>
              </tr>
              <tr>
                <th>Sex</th>
                <th colSpan={4}>Male</th>
                <th colSpan={4}>Female</th>
              </tr>
              <tr>
                <th>Age</th>
                <th>Gen Pop</th>
                <th>HIV +ve</th>
                <th>HIV/TB Coinfected</th>
                <th>TB only</th>
                <th>Gen Pop</th>
                <th>HIV +ve</th>
                <th>HIV/TB Coinfected</th>
                <th>TB only</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0 - 5 Months</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>6 - 59 Months</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>5 - 9 Years</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>10 - 17 Years</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18+ Years</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18 - 19 Years</td>
                <td></td>
                <td></td>
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
      </div>
    </>
  );
};

export default NutritionStatusWeightComponent;
