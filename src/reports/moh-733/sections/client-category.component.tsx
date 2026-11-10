import React from 'react';

import styles from '../moh-733.scss';
import classNames from 'classnames';
import { useOpenMoh733Linelist } from '../linelist/use-open-moh-733-linelist';

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
  const openLinelist = useOpenMoh733Linelist(startDate, endDate, locationUuids);
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
              <td onClick={() => openLinelist('gen_population_0_5_months_male_new')}>
                {moh733Data?.gen_population_0_5_months_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_0_5_months_male_new')}>
                {moh733Data?.hiv_0_5_months_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_0_5_months_male_new')}>
                {moh733Data?.hiv_and_tb_0_5_months_male_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_0_5_months_male_revisit')}>
                {moh733Data?.gen_population_0_5_months_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_0_5_months_male_revisit')}>
                {moh733Data?.hiv_0_5_months_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_0_5_months_male_revisit')}>
                {moh733Data?.hiv_and_tb_0_5_months_male_revisit || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('gen_population_0_5_months_female_new')}>
                {moh733Data?.gen_population_0_5_months_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_0_5_months_female_new')}>
                {moh733Data?.hiv_0_5_months_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_0_5_months_female_new')}>
                {moh733Data?.hiv_and_tb_0_5_months_female_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_0_5_months_female_revisit')}>
                {moh733Data?.gen_population_0_5_months_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_0_5_months_female_revisit')}>
                {moh733Data?.hiv_0_5_months_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_0_5_months_female_revisit')}>
                {moh733Data?.hiv_and_tb_0_5_months_female_revisit || 0}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>6 - 59 Months</td>
              <td className={styles.greyBackground}>Male</td>
              <td onClick={() => openLinelist('gen_population_6_59_months_male_new')}>
                {moh733Data?.gen_population_6_59_months_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_6_59_months_male_new')}>
                {moh733Data?.hiv_6_59_months_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_6_59_months_male_new')}>
                {moh733Data?.hiv_and_tb_6_59_months_male_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_6_59_months_male_revisit')}>
                {moh733Data?.gen_population_6_59_months_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_6_59_months_male_revisit')}>
                {moh733Data?.hiv_6_59_months_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_6_59_months_male_revisit')}>
                {moh733Data?.hiv_and_tb_6_59_months_male_revisit || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('gen_population_6_59_months_female_new')}>
                {moh733Data?.gen_population_6_59_months_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_6_59_months_female_new')}>
                {moh733Data?.hiv_6_59_months_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_6_59_months_female_new')}>
                {moh733Data?.hiv_and_tb_6_59_months_female_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_6_59_months_female_revisit')}>
                {moh733Data?.gen_population_6_59_months_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_6_59_months_female_revisit')}>
                {moh733Data?.hiv_6_59_months_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_6_59_months_female_revisit')}>
                {moh733Data?.hiv_and_tb_6_59_months_female_revisit || 0}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>5 - 9 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td onClick={() => openLinelist('gen_population_5_9_years_male_new')}>
                {moh733Data?.gen_population_5_9_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_5_9_years_male_new')}>{moh733Data?.hiv_5_9_years_male_new || 0}</td>
              <td onClick={() => openLinelist('hiv_and_tb_5_9_years_male_new')}>
                {moh733Data?.hiv_and_tb_5_9_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_5_9_years_male_revisit')}>
                {moh733Data?.gen_population_5_9_years_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_5_9_years_male_revisit')}>
                {moh733Data?.hiv_5_9_years_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_5_9_years_male_revisit')}>
                {moh733Data?.hiv_and_tb_5_9_years_male_revisit || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('gen_population_5_9_years_female_new')}>
                {moh733Data?.gen_population_5_9_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_5_9_years_female_new')}>
                {moh733Data?.hiv_5_9_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_5_9_years_female_new')}>
                {moh733Data?.hiv_and_tb_5_9_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_5_9_years_female_revisit')}>
                {moh733Data?.gen_population_5_9_years_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_5_9_years_female_revisit')}>
                {moh733Data?.hiv_5_9_years_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_5_9_years_female_revisit')}>
                {moh733Data?.hiv_and_tb_5_9_years_female_revisit || 0}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>10-17 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td onClick={() => openLinelist('gen_population_10_17_years_male_new')}>
                {moh733Data?.gen_population_10_17_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_10_17_years_male_new')}>
                {moh733Data?.hiv_10_17_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_10_17_years_male_new')}>
                {moh733Data?.hiv_and_tb_10_17_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_10_17_years_male_revisit')}>
                {moh733Data?.gen_population_10_17_years_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_10_17_years_male_revisit')}>
                {moh733Data?.hiv_10_17_years_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_10_17_years_male_revisit')}>
                {moh733Data?.hiv_and_tb_10_17_years_male_revisit || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('gen_population_10_17_years_female_new')}>
                {moh733Data?.gen_population_10_17_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_10_17_years_female_new')}>
                {moh733Data?.hiv_10_17_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_10_17_years_female_new')}>
                {moh733Data?.hiv_and_tb_10_17_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_10_17_years_female_revisit')}>
                {moh733Data?.gen_population_10_17_years_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_10_17_years_female_revisit')}>
                {moh733Data?.hiv_10_17_years_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_10_17_years_female_revisit')}>
                {moh733Data?.hiv_and_tb_10_17_years_female_revisit || 0}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>18+ Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td onClick={() => openLinelist('gen_population_18_above_years_male_new')}>
                {moh733Data?.gen_population_18_above_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_18_above_years_male_new')}>
                {moh733Data?.hiv_18_above_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_18_above_years_male_new')}>
                {moh733Data?.hiv_and_tb_18_above_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_18_above_years_male_revisit')}>
                {moh733Data?.gen_population_18_above_years_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_18_above_years_male_revisit')}>
                {moh733Data?.hiv_18_above_years_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_18_above_years_male_revisit')}>
                {moh733Data?.hiv_and_tb_18_above_years_male_revisit || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('gen_population_18_above_years_female_new')}>
                {moh733Data?.gen_population_18_above_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_18_above_years_female_new')}>
                {moh733Data?.hiv_18_above_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_18_above_years_female_new')}>
                {moh733Data?.hiv_and_tb_18_above_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_18_above_years_female_revisit')}>
                {moh733Data?.gen_population_18_above_years_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_18_above_years_female_revisit')}>
                {moh733Data?.hiv_18_above_years_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_18_above_years_female_revisit')}>
                {moh733Data?.hiv_and_tb_18_above_years_female_revisit || 0}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>18 - 19 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td onClick={() => openLinelist('gen_population_18_19_years_male_new')}>
                {moh733Data?.gen_population_18_19_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_18_19_years_male_new')}>
                {moh733Data?.hiv_18_19_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_18_19_years_male_new')}>
                {moh733Data?.hiv_and_tb_18_19_years_male_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_18_19_years_male_revisit')}>
                {moh733Data?.gen_population_18_19_years_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_18_19_years_male_revisit')}>
                {moh733Data?.hiv_18_19_years_male_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_18_19_years_male_revisit')}>
                {moh733Data?.hiv_and_tb_18_19_years_male_revisit || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('gen_population_18_19_years_female_new')}>
                {moh733Data?.gen_population_18_19_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_18_19_years_female_new')}>
                {moh733Data?.hiv_18_19_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_18_19_years_female_new')}>
                {moh733Data?.hiv_and_tb_18_19_years_female_new || 0}
              </td>
              <td onClick={() => openLinelist('gen_population_18_19_years_female_revisit')}>
                {moh733Data?.gen_population_18_19_years_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_18_19_years_female_revisit')}>
                {moh733Data?.hiv_18_19_years_female_revisit || 0}
              </td>
              <td onClick={() => openLinelist('hiv_and_tb_18_19_years_female_revisit')}>
                {moh733Data?.hiv_and_tb_18_19_years_female_revisit || 0}
              </td>
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
              <td onClick={() => openLinelist('tb_new_0_5_months_male')}>{moh733Data?.tb_new_0_5_months_male || 0}</td>
              <td onClick={() => openLinelist('tb_revisit_0_5_months_male')}>
                {moh733Data?.tb_revisit_0_5_months_male || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('tb_new_0_5_months_female')}>
                {moh733Data?.tb_new_0_5_months_female || 0}
              </td>
              <td onClick={() => openLinelist('tb_revisit_0_5_months_female')}>
                {moh733Data?.tb_revisit_0_5_months_female || 0}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>6 - 59 Months</td>
              <td className={styles.greyBackground}>Male</td>
              <td onClick={() => openLinelist('tb_new_6_59_months_male')}>
                {moh733Data?.tb_new_6_59_months_male || 0}
              </td>
              <td onClick={() => openLinelist('tb_revisit_6_59_months_male')}>
                {moh733Data?.tb_revisit_6_59_months_male || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('tb_new_6_59_months_female')}>
                {moh733Data?.tb_new_6_59_months_female || 0}
              </td>
              <td onClick={() => openLinelist('tb_revisit_6_59_months_female')}>
                {moh733Data?.tb_revisit_6_59_months_female || 0}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>5 - 9 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td onClick={() => openLinelist('tb_new_5_9_years_male')}>{moh733Data?.tb_new_5_9_years_male || 0}</td>
              <td onClick={() => openLinelist('tb_revisit_5_9_years_male')}>
                {moh733Data?.tb_revisit_5_9_years_male || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('tb_new_5_9_years_female')}>
                {moh733Data?.tb_new_5_9_years_female || 0}
              </td>
              <td onClick={() => openLinelist('tb_revisit_5_9_years_female')}>
                {moh733Data?.tb_revisit_5_9_years_female || 0}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>10-17 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td onClick={() => openLinelist('tb_new_5_17_years_male')}>{moh733Data?.tb_new_5_17_years_male || 0}</td>
              <td onClick={() => openLinelist('tb_revisit_5_17_years_male')}>
                {moh733Data?.tb_revisit_5_17_years_male || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('tb_new_5_17_years_female')}>
                {moh733Data?.tb_new_5_17_years_female || 0}
              </td>
              <td onClick={() => openLinelist('tb_revisit_5_17_years_female')}>
                {moh733Data?.tb_revisit_5_17_years_female || 0}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>18+ Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td onClick={() => openLinelist('tb_new_18_above_years_male')}>
                {moh733Data?.tb_new_18_above_years_male || 0}
              </td>
              <td onClick={() => openLinelist('tb_revisit_18_above_years_male')}>
                {moh733Data?.tb_revisit_18_above_years_male || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('tb_new_18_above_years_female')}>
                {moh733Data?.tb_new_18_above_years_female || 0}
              </td>
              <td onClick={() => openLinelist('tb_revisit_18_above_years_female')}>
                {moh733Data?.tb_revisit_18_above_years_female || 0}
              </td>
            </tr>
            <tr>
              <td rowSpan={2}>18 - 19 Years</td>
              <td className={styles.greyBackground}>Male</td>
              <td onClick={() => openLinelist('tb_new_18_19_years_male')}>
                {moh733Data?.tb_new_18_19_years_male || 0}
              </td>
              <td onClick={() => openLinelist('tb_revisit_18_19_years_male')}>
                {moh733Data?.tb_revisit_18_19_years_male || 0}
              </td>
            </tr>
            <tr>
              <td>Female</td>
              <td onClick={() => openLinelist('tb_new_18_19_years_female')}>
                {moh733Data?.tb_new_18_19_years_female || 0}
              </td>
              <td onClick={() => openLinelist('tb_revisit_18_19_years_female')}>
                {moh733Data?.tb_revisit_18_19_years_female || 0}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientCategoryComponent;
