import React from 'react';

import styles from '../moh-733.scss';
import classNames from 'classnames';
interface NutritionInterventionPregnantBrestfeedingComponentProps {
  moh733Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const NutritionInterventionPregnantBrestfeedingComponent: React.FC<
  NutritionInterventionPregnantBrestfeedingComponentProps
> = ({ moh733Data, startDate, endDate, locationUuids }) => {
  return (
    <>
      <div className={styles.category}>
        <div className={styles.subCategory}>
          <div className={styles.section}>
            <table className={classNames(styles.table, styles.tableBordered, styles.nutritionStatusTable)}>
              <thead>
                <tr>
                  <th>Micronutrient</th>
                  <th>Vitamin A Therapeutic</th>
                  <th>Vitamin B6 Therapeutic</th>
                  <th>Iron</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0 - 5 Months</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>6 - 59 Months</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5 - 9 Years</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>10 - 17 Years</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>18+ Years</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>18 - 19 Years</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>TREATMENT OUTCOME</p>
          <div className={styles.section}>
            <table className={classNames(styles.table, styles.tableBordered, styles.nutritionStatusTable)}>
              <thead>
                <tr>
                  <th>Outcomes</th>
                  <th>Cured</th>
                  <th>Defaulted</th>
                  <th>Died</th>
                  <th>Non-Recovered</th>
                  <th>Transferred Out</th>
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
                </tr>
                <tr>
                  <td>6 - 59 Months</td>
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
                </tr>
                <tr>
                  <td>10 - 17 Years</td>
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
                </tr>
                <tr>
                  <td>18 - 19 Years</td>
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
        <div className={styles.section}>
          <p>PREGNANT OR BREASTFEEDING WOMEN</p>
          <table className={classNames(styles.table, styles.tableBordered, styles.nutritionStatusTable)}>
            <thead>
              <tr>
                <th>PBFW</th>
                <th>Gen Pop</th>
                <th>HIV +ve</th>
                <th>HIV +ve + TB</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>NEW</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>REVISIT</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>SAM</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>MAM</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>SAM receiving Supplimentary Foods</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>MAM receiving Supplimentary Foods</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Vitamin B6 Therapeutic</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Iron</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Cured</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Defaulted</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Died</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Non-Recovered</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Transferred out</td>
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

export default NutritionInterventionPregnantBrestfeedingComponent;
