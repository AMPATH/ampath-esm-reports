import React from 'react';

import styles from '../moh-733.scss';
import classNames from 'classnames';
import { useOpenMoh733Linelist } from '../linelist/use-open-moh-733-linelist';
interface NutritionInterventionPregnantBrestfeedingComponentProps {
  moh733Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const NutritionInterventionPregnantBrestfeedingComponent: React.FC<
  NutritionInterventionPregnantBrestfeedingComponentProps
> = ({ moh733Data, startDate, endDate, locationUuids }) => {
  const openLinelist = useOpenMoh733Linelist(startDate, endDate, locationUuids);

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
                  <td onClick={() => openLinelist('vitamin_A_0_5_months')}>{moh733Data?.vitamin_A_0_5_months || 0}</td>
                  <td onClick={() => openLinelist('vitamin_B6_0_5_months')}>
                    {moh733Data?.vitamin_B6_0_5_months || 0}
                  </td>
                  <td onClick={() => openLinelist('iron_0_5_months')}>{moh733Data?.iron_0_5_months || 0}</td>
                </tr>
                <tr>
                  <td>6 - 59 Months</td>
                  <td onClick={() => openLinelist('vitamin_A_6_59_months')}>
                    {moh733Data?.vitamin_A_6_59_months || 0}
                  </td>
                  <td onClick={() => openLinelist('vitamin_B6_6_59_months')}>
                    {moh733Data?.vitamin_B6_6_59_months || 0}
                  </td>
                  <td onClick={() => openLinelist('iron_6_59_months')}>{moh733Data?.iron_6_59_months || 0}</td>
                </tr>
                <tr>
                  <td>5 - 9 Years</td>
                  <td onClick={() => openLinelist('vitamin_A_5_9_years')}>{moh733Data?.vitamin_A_5_9_years || 0}</td>
                  <td onClick={() => openLinelist('vitamin_B6_5_9_years')}>{moh733Data?.vitamin_B6_5_9_years || 0}</td>
                  <td onClick={() => openLinelist('iron_5_9_years')}>{moh733Data?.iron_5_9_years || 0}</td>
                </tr>
                <tr>
                  <td>10 - 17 Years</td>
                  <td onClick={() => openLinelist('vitamin_A_10_17_years')}>
                    {moh733Data?.vitamin_A_10_17_years || 0}
                  </td>
                  <td onClick={() => openLinelist('vitamin_B6_10_17_years')}>
                    {moh733Data?.vitamin_B6_10_17_years || 0}
                  </td>
                  <td onClick={() => openLinelist('iron_10_17_years')}>{moh733Data?.iron_10_17_years || 0}</td>
                </tr>
                <tr>
                  <td>18+ Years</td>
                  <td onClick={() => openLinelist('vitamin_A_18_above_years')}>
                    {moh733Data?.vitamin_A_18_above_years || 0}
                  </td>
                  <td onClick={() => openLinelist('vitamin_B6_18_above_years')}>
                    {moh733Data?.vitamin_B6_18_above_years || 0}
                  </td>
                  <td onClick={() => openLinelist('iron_18_above_years')}>{moh733Data?.iron_18_above_years || 0}</td>
                </tr>
                <tr>
                  <td>18 - 19 Years</td>
                  <td onClick={() => openLinelist('vitamin_A_18_19_years')}>
                    {moh733Data?.vitamin_A_18_19_years || 0}
                  </td>
                  <td onClick={() => openLinelist('vitamin_B6_18_19_years')}>
                    {moh733Data?.vitamin_B6_18_19_years || 0}
                  </td>
                  <td onClick={() => openLinelist('iron_18_19_years')}>{moh733Data?.iron_18_19_years || 0}</td>
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
                  <td onClick={() => openLinelist('cured_0_5_months')}>{moh733Data?.cured_0_5_months || 0}</td>
                  <td onClick={() => openLinelist('defaulted_0_5_months')}>{moh733Data?.defaulted_0_5_months || 0}</td>
                  <td onClick={() => openLinelist('died_0_5_months')}>{moh733Data?.died_0_5_months || 0}</td>
                  <td onClick={() => openLinelist('non_recovered_0_5_months')}>
                    {moh733Data?.non_recovered_0_5_months || 0}
                  </td>
                  <td onClick={() => openLinelist('transferred_out_0_5_months')}>
                    {moh733Data?.transferred_out_0_5_months || 0}
                  </td>
                </tr>
                <tr>
                  <td>6 - 59 Months</td>
                  <td onClick={() => openLinelist('cured_6_59_months')}>{moh733Data?.cured_6_59_months || 0}</td>
                  <td onClick={() => openLinelist('defaulted_6_59_months')}>
                    {moh733Data?.defaulted_6_59_months || 0}
                  </td>
                  <td onClick={() => openLinelist('died_6_59_months')}>{moh733Data?.died_6_59_months || 0}</td>
                  <td onClick={() => openLinelist('non_recovered_6_59_months')}>
                    {moh733Data?.non_recovered_6_59_months || 0}
                  </td>
                  <td onClick={() => openLinelist('transferred_out_6_59_months')}>
                    {moh733Data?.transferred_out_6_59_months || 0}
                  </td>
                </tr>
                <tr>
                  <td>5 - 9 Years</td>
                  <td onClick={() => openLinelist('cured_5_9_years')}>{moh733Data?.cured_5_9_years || 0}</td>
                  <td onClick={() => openLinelist('defaulted_5_9_years')}>{moh733Data?.defaulted_5_9_years || 0}</td>
                  <td onClick={() => openLinelist('died_5_9_years')}>{moh733Data?.died_5_9_years || 0}</td>
                  <td onClick={() => openLinelist('non_recovered_5_9_years')}>
                    {moh733Data?.non_recovered_5_9_years || 0}
                  </td>
                  <td onClick={() => openLinelist('transferred_out_5_9_years')}>
                    {moh733Data?.transferred_out_5_9_years || 0}
                  </td>
                </tr>
                <tr>
                  <td>10 - 17 Years</td>
                  <td onClick={() => openLinelist('cured_10_17_years')}>{moh733Data?.cured_10_17_years || 0}</td>
                  <td onClick={() => openLinelist('defaulted_10_17_years')}>
                    {moh733Data?.defaulted_10_17_years || 0}
                  </td>
                  <td onClick={() => openLinelist('died_10_17_years')}>{moh733Data?.died_10_17_years || 0}</td>
                  <td onClick={() => openLinelist('non_recovered_10_17_years')}>
                    {moh733Data?.non_recovered_10_17_years || 0}
                  </td>
                  <td onClick={() => openLinelist('transferred_out_10_17_years')}>
                    {moh733Data?.transferred_out_10_17_years || 0}
                  </td>
                </tr>
                <tr>
                  <td>18+ Years</td>
                  <td onClick={() => openLinelist('cured_18_above_years')}>{moh733Data?.cured_18_above_years || 0}</td>
                  <td onClick={() => openLinelist('defaulted_18_above_years')}>
                    {moh733Data?.defaulted_18_above_years || 0}
                  </td>
                  <td onClick={() => openLinelist('died_18_above_years')}>{moh733Data?.died_18_above_years || 0}</td>
                  <td onClick={() => openLinelist('non_recovered_18_above_years')}>
                    {moh733Data?.non_recovered_18_above_years || 0}
                  </td>
                  <td onClick={() => openLinelist('transferred_out_18_above_years')}>
                    {moh733Data?.transferred_out_18_above_years || 0}
                  </td>
                </tr>
                <tr>
                  <td>18 - 19 Years</td>
                  <td onClick={() => openLinelist('cured_18_19_years')}>{moh733Data?.cured_18_19_years || 0}</td>
                  <td onClick={() => openLinelist('defaulted_18_19_years')}>
                    {moh733Data?.defaulted_18_19_years || 0}
                  </td>
                  <td onClick={() => openLinelist('died_18_19_years')}>{moh733Data?.died_18_19_years || 0}</td>
                  <td onClick={() => openLinelist('non_recovered_18_19_years')}>
                    {moh733Data?.non_recovered_18_19_years || 0}
                  </td>
                  <td onClick={() => openLinelist('transferred_out_18_19_years')}>
                    {moh733Data?.transferred_out_18_19_years || 0}
                  </td>
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
                <td onClick={() => openLinelist('gen_pop_new')}>{moh733Data?.gen_pop_new || 0}</td>
                <td onClick={() => openLinelist('hiv_positive_new')}>{moh733Data?.hiv_positive_new || 0}</td>
                <td onClick={() => openLinelist('hiv_tb_positive_new')}>{moh733Data?.hiv_tb_positive_new || 0}</td>
              </tr>
              <tr>
                <td>REVISIT</td>
                <td onClick={() => openLinelist('gen_pop_revisit')}>{moh733Data?.gen_pop_revisit || 0}</td>
                <td onClick={() => openLinelist('hiv_positive_revisit')}>{moh733Data?.hiv_positive_revisit || 0}</td>
                <td onClick={() => openLinelist('hiv_tb_positive_revisit')}>
                  {moh733Data?.hiv_tb_positive_revisit || 0}
                </td>
              </tr>
              <tr>
                <td>SAM</td>
                <td onClick={() => openLinelist('gen_pop_sam')}>{moh733Data?.gen_pop_sam || 0}</td>
                <td onClick={() => openLinelist('hiv_positive_sam')}>{moh733Data?.hiv_positive_sam || 0}</td>
                <td onClick={() => openLinelist('hiv_tb_positive_sam')}>{moh733Data?.hiv_tb_positive_sam || 0}</td>
              </tr>
              <tr>
                <td>MAM</td>
                <td onClick={() => openLinelist('gen_pop_mam')}>{moh733Data?.gen_pop_mam || 0}</td>
                <td onClick={() => openLinelist('hiv_positive_mam')}>{moh733Data?.hiv_positive_mam || 0}</td>
                <td onClick={() => openLinelist('hiv_tb_positive_mam')}>{moh733Data?.hiv_tb_positive_mam || 0}</td>
              </tr>
              <tr>
                <td>SAM receiving Supplimentary Foods</td>
                <td onClick={() => openLinelist('gen_pop_sam_supplimentary_foods')}>
                  {moh733Data?.gen_pop_sam_supplimentary_foods || 0}
                </td>
                <td onClick={() => openLinelist('hiv_positive_sam_supplimentary_foods')}>
                  {moh733Data?.hiv_positive_sam_supplimentary_foods || 0}
                </td>
                <td onClick={() => openLinelist('hiv_tb_positive_sam_supplimentary_foods')}>
                  {moh733Data?.hiv_tb_positive_sam_supplimentary_foods || 0}
                </td>
              </tr>
              <tr>
                <td>MAM receiving Supplimentary Foods</td>
                <td onClick={() => openLinelist('gen_pop_mam_supplimentary_foods')}>
                  {moh733Data?.gen_pop_mam_supplimentary_foods || 0}
                </td>
                <td onClick={() => openLinelist('hiv_positive_mam_supplimentary_foods')}>
                  {moh733Data?.hiv_positive_mam_supplimentary_foods || 0}
                </td>
                <td onClick={() => openLinelist('hiv_tb_positive_mam_supplimentary_foods')}>
                  {moh733Data?.hiv_tb_positive_mam_supplimentary_foods || 0}
                </td>
              </tr>
              <tr>
                <td>Vitamin B6 Therapeutic</td>
                <td onClick={() => openLinelist('gen_pop_vitamin_B6')}>{moh733Data?.gen_pop_vitamin_B6 || 0}</td>
                <td onClick={() => openLinelist('hiv_positive_vitamin_B6')}>
                  {moh733Data?.hiv_positive_vitamin_B6 || 0}
                </td>
                <td onClick={() => openLinelist('hiv_tb_positive_vitamin_B6')}>
                  {moh733Data?.hiv_tb_positive_vitamin_B6 || 0}
                </td>
              </tr>
              <tr>
                <td>Iron</td>
                <td onClick={() => openLinelist('gen_pop_iron')}>{moh733Data?.gen_pop_iron || 0}</td>
                <td onClick={() => openLinelist('hiv_positive_iron')}>{moh733Data?.hiv_positive_iron || 0}</td>
                <td onClick={() => openLinelist('hiv_tb_positive_iron')}>{moh733Data?.hiv_tb_positive_iron || 0}</td>
              </tr>
              <tr>
                <td>Cured</td>
                <td onClick={() => openLinelist('gen_pop_cured')}>{moh733Data?.gen_pop_cured || 0}</td>
                <td onClick={() => openLinelist('hiv_positive_cured')}>{moh733Data?.hiv_positive_cured || 0}</td>
                <td onClick={() => openLinelist('hiv_tb_positive_cured')}>{moh733Data?.hiv_tb_positive_cured || 0}</td>
              </tr>
              <tr>
                <td>Defaulted</td>
                <td onClick={() => openLinelist('gen_pop_defaulted')}>{moh733Data?.gen_pop_defaulted || 0}</td>
                <td onClick={() => openLinelist('hiv_positive_defaulted')}>
                  {moh733Data?.hiv_positive_defaulted || 0}
                </td>
                <td onClick={() => openLinelist('hiv_tb_positive_defaulted')}>
                  {moh733Data?.hiv_tb_positive_defaulted || 0}
                </td>
              </tr>
              <tr>
                <td>Died</td>
                <td onClick={() => openLinelist('gen_pop_died')}>{moh733Data?.gen_pop_died || 0}</td>
                <td onClick={() => openLinelist('hiv_positive_died')}>{moh733Data?.hiv_positive_died || 0}</td>
                <td onClick={() => openLinelist('hiv_tb_positive_died')}>{moh733Data?.hiv_tb_positive_died || 0}</td>
              </tr>
              <tr>
                <td>Non-Recovered</td>
                <td onClick={() => openLinelist('gen_pop_non_recovered')}>{moh733Data?.gen_pop_non_recovered || 0}</td>
                <td onClick={() => openLinelist('hiv_positive_non_recovered')}>
                  {moh733Data?.hiv_positive_non_recovered || 0}
                </td>
                <td onClick={() => openLinelist('hiv_tb_positive_non_recovered')}>
                  {moh733Data?.hiv_tb_positive_non_recovered || 0}
                </td>
              </tr>
              <tr>
                <td>Transferred out</td>
                <td onClick={() => openLinelist('gen_pop_transferred_out')}>
                  {moh733Data?.gen_pop_transferred_out || 0}
                </td>
                <td onClick={() => openLinelist('hiv_positive_transferred_out')}>
                  {moh733Data?.hiv_positive_transferred_out || 0}
                </td>
                <td onClick={() => openLinelist('hiv_tb_positive_transferred_out')}>
                  {moh733Data?.hiv_tb_positive_transferred_out || 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NutritionInterventionPregnantBrestfeedingComponent;
