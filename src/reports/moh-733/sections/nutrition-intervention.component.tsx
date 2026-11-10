import React from 'react';

import styles from '../moh-733.scss';
import classNames from 'classnames';
import { useOpenMoh733Linelist } from '../linelist/use-open-moh-733-linelist';

interface NutritionInterventionComponentProps {
  moh733Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const NutritionInterventionComponent: React.FC<NutritionInterventionComponentProps> = ({
  moh733Data,
  startDate,
  endDate,
  locationUuids,
}) => {
  const openLinelist = useOpenMoh733Linelist(startDate, endDate, locationUuids);

  return (
    <>
      <div className={styles.category}>
        <div className={styles.section}>
          <table className={classNames(styles.table, styles.tableBordered, styles.nutritionStatusTable)}>
            <thead>
              <tr>
                <th className={styles.samHeader} colSpan={9}>
                  Number SAM Receiving Therapeutic Foods
                </th>
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
                <td onClick={() => openLinelist('gen_population_male_0_5_months')}>
                  {moh733Data?.gen_population_male_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_male_0_5_months')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_male_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_male_0_5_months')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_male_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_male_0_5_months')}>
                  {moh733Data?.sam_therapeutic_foods_tb_male_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_0_5_months')}>
                  {moh733Data?.gen_population_female_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_female_0_5_months')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_female_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_female_0_5_months')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_female_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_female_0_5_months')}>
                  {moh733Data?.sam_therapeutic_foods_tb_female_0_5_months || 0}
                </td>
              </tr>
              <tr>
                <td>6 - 59 Months</td>
                <td onClick={() => openLinelist('gen_population_male_6_59_months')}>
                  {moh733Data?.gen_population_male_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_male_6_59_months')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_male_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_male_6_59_months')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_male_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_male_6_59_months')}>
                  {moh733Data?.sam_therapeutic_foods_tb_male_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_6_59_months')}>
                  {moh733Data?.gen_population_female_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_female_6_59_months')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_female_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_female_6_59_months')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_female_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_female_6_59_months')}>
                  {moh733Data?.sam_therapeutic_foods_tb_female_6_59_months || 0}
                </td>
              </tr>
              <tr>
                <td>5 - 9 Years</td>
                <td onClick={() => openLinelist('gen_population_male_5_9_years')}>
                  {moh733Data?.gen_population_male_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_male_5_9_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_male_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_male_5_9_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_male_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_male_5_9_years')}>
                  {moh733Data?.sam_therapeutic_foods_tb_male_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_5_9_years')}>
                  {moh733Data?.gen_population_female_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_female_5_9_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_female_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_female_5_9_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_female_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_female_5_9_years')}>
                  {moh733Data?.sam_therapeutic_foods_tb_female_5_9_years || 0}
                </td>
              </tr>
              <tr>
                <td>10 - 17 Years</td>
                <td onClick={() => openLinelist('gen_population_male_10_17_years')}>
                  {moh733Data?.gen_population_male_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_male_10_17_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_male_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_male_10_17_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_male_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_male_10_17_years')}>
                  {moh733Data?.sam_therapeutic_foods_tb_male_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_10_17_years')}>
                  {moh733Data?.gen_population_female_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_female_10_17_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_female_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_female_10_17_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_female_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_female_10_17_years')}>
                  {moh733Data?.sam_therapeutic_foods_tb_female_10_17_years || 0}
                </td>
              </tr>
              <tr>
                <td>18+ Years</td>
                <td onClick={() => openLinelist('gen_population_male_18_above_years')}>
                  {moh733Data?.gen_population_male_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_male_18_above_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_male_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_male_18_above_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_male_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_male_18_above_years')}>
                  {moh733Data?.sam_therapeutic_foods_tb_male_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_18_above_years')}>
                  {moh733Data?.gen_population_female_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_female_18_above_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_female_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_female_18_above_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_female_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_female_18_above_years')}>
                  {moh733Data?.sam_therapeutic_foods_tb_female_18_above_years || 0}
                </td>
              </tr>
              <tr>
                <td>18 - 19 Years</td>
                <td onClick={() => openLinelist('gen_population_male_18_19_years')}>
                  {moh733Data?.gen_population_male_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_male_18_19_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_male_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_male_18_19_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_male_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_male_18_19_years')}>
                  {moh733Data?.sam_therapeutic_foods_tb_male_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_18_19_years')}>
                  {moh733Data?.gen_population_female_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_female_18_19_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_female_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_hiv_and_tb_female_18_19_years')}>
                  {moh733Data?.sam_therapeutic_foods_hiv_and_tb_female_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('sam_therapeutic_foods_tb_female_18_19_years')}>
                  {moh733Data?.sam_therapeutic_foods_tb_female_18_19_years || 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.section}>
          <table className={classNames(styles.table, styles.tableBordered, styles.nutritionStatusTable)}>
            <thead>
              <tr>
                <th className={styles.mamHeader} colSpan={9}>
                  Number MAM Receiving Supplimentary Foods
                </th>
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
                <td onClick={() => openLinelist('gen_population_male_0_5_months')}>
                  {moh733Data?.gen_population_male_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_male_0_5_months')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_male_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_male_0_5_months')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_male_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_male_0_5_months')}>
                  {moh733Data?.mam_therapeutic_foods_tb_male_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_0_5_months')}>
                  {moh733Data?.gen_population_female_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_female_0_5_months')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_female_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_female_0_5_months')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_female_0_5_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_female_0_5_months')}>
                  {moh733Data?.mam_therapeutic_foods_tb_female_0_5_months || 0}
                </td>
              </tr>
              <tr>
                <td>6 - 59 Months</td>
                <td onClick={() => openLinelist('gen_population_male_6_59_months')}>
                  {moh733Data?.gen_population_male_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_male_6_59_months')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_male_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_male_6_59_months')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_male_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_male_6_59_months')}>
                  {moh733Data?.mam_therapeutic_foods_tb_male_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_6_59_months')}>
                  {moh733Data?.gen_population_female_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_female_6_59_months')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_female_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_female_6_59_months')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_female_6_59_months || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_female_6_59_months')}>
                  {moh733Data?.mam_therapeutic_foods_tb_female_6_59_months || 0}
                </td>
              </tr>
              <tr>
                <td>5 - 9 Years</td>
                <td onClick={() => openLinelist('gen_population_male_5_9_years')}>
                  {moh733Data?.gen_population_male_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_male_5_9_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_male_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_male_5_9_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_male_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_male_5_9_years')}>
                  {moh733Data?.mam_therapeutic_foods_tb_male_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_5_9_years')}>
                  {moh733Data?.gen_population_female_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_female_5_9_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_female_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_female_5_9_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_female_5_9_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_female_5_9_years')}>
                  {moh733Data?.mam_therapeutic_foods_tb_female_5_9_years || 0}
                </td>
              </tr>
              <tr>
                <td>10 - 17 Years</td>
                <td onClick={() => openLinelist('gen_population_male_10_17_years')}>
                  {moh733Data?.gen_population_male_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_male_10_17_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_male_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_male_10_17_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_male_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_male_10_17_years')}>
                  {moh733Data?.mam_therapeutic_foods_tb_male_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_10_17_years')}>
                  {moh733Data?.gen_population_female_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_female_10_17_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_female_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_female_10_17_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_female_10_17_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_female_10_17_years')}>
                  {moh733Data?.mam_therapeutic_foods_tb_female_10_17_years || 0}
                </td>
              </tr>
              <tr>
                <td>18+ Years</td>
                <td onClick={() => openLinelist('gen_population_male_18_above_years')}>
                  {moh733Data?.gen_population_male_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_male_18_above_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_male_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_male_18_above_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_male_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_male_18_above_years')}>
                  {moh733Data?.mam_therapeutic_foods_tb_male_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_18_above_years')}>
                  {moh733Data?.gen_population_female_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_female_18_above_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_female_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_female_18_above_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_female_18_above_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_female_18_above_years')}>
                  {moh733Data?.mam_therapeutic_foods_tb_female_18_above_years || 0}
                </td>
              </tr>
              <tr>
                <td>18 - 19 Years</td>
                <td onClick={() => openLinelist('gen_population_male_18_19_years')}>
                  {moh733Data?.gen_population_male_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_male_18_19_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_male_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_male_18_19_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_male_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_male_18_19_years')}>
                  {moh733Data?.mam_therapeutic_foods_tb_male_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('gen_population_female_18_19_years')}>
                  {moh733Data?.gen_population_female_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_female_18_19_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_female_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_hiv_and_tb_female_18_19_years')}>
                  {moh733Data?.mam_therapeutic_foods_hiv_and_tb_female_18_19_years || 0}
                </td>
                <td onClick={() => openLinelist('mam_therapeutic_foods_tb_female_18_19_years')}>
                  {moh733Data?.mam_therapeutic_foods_tb_female_18_19_years || 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NutritionInterventionComponent;
