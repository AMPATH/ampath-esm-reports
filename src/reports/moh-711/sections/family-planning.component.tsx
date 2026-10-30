import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

interface FamilyPlanningComponentProps {
  moh711Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const FamilyPlanningComponent: React.FC<FamilyPlanningComponentProps> = ({
  moh711Data,
  startDate,
  endDate,
  locationUuids,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToRegister = (indicator: string) => {
    navigate(
      `/moh-512-register?startDate=${startDate}&endDate=${endDate}&locationUuids=${locationUuids}&indicator=${indicator}&from=moh-711`,
      {
        state: {
          from: location.pathname,
          reportName: 'moh711Report',
        },
      },
    );
  };
  return (
    <div className={styles.section}>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th></th>
            <th colSpan={2}>D. Family Planning (Number of clients issued with contraceptives)</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th colSpan={2} className={styles.greyBackground}></th>
            <th>NEW</th>
            <th>RE-VISITS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td colSpan={2}>No. of 1st Ever Users of Contraceptive</td>
            <td onClick={() => navigateToRegister('first_users_contraceptive_new')}>
              {moh711Data.first_users_contraceptive_new}
            </td>
            <td className={styles.greyBackground}></td>
          </tr>
          <tr>
            <td>2</td>
            <td rowSpan={3}>Pills</td>
            <td>Progestine only pills</td>
            <td onClick={() => navigateToRegister('pills_progestine_new')}>{moh711Data.pills_progestine_new}</td>
            <td onClick={() => navigateToRegister('pills_progestine_revisit')}>
              {moh711Data.pills_progestine_revisit}
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Pills Combined oral contraceptive</td>
            <td onClick={() => navigateToRegister('pills_combined_oral_contraceptive_new')}>
              {moh711Data.pills_combined_oral_contraceptive_new}
            </td>
            <td onClick={() => navigateToRegister('pills_combined_oral_contraceptive_revisit')}>
              {moh711Data.pills_combined_oral_contraceptive_revisit}
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Emergency contraceptive pill</td>
            <td onClick={() => navigateToRegister('emergency_contraceptive_pill_new')}>
              {moh711Data.emergency_contraceptive_pill_new}
            </td>
            <td className={styles.greyBackground}></td>
          </tr>
          <tr>
            <td>5</td>
            <td rowSpan={2}>Injectables</td>
            <td>FP Injections DMPA- IM</td>
            <td onClick={() => navigateToRegister('fp_injections_dmpa_im_new')}>
              {moh711Data.fp_injections_dmpa_im_new}
            </td>
            <td onClick={() => navigateToRegister('fp_injections_dmpa_im_revisit')}>
              {moh711Data.fp_injections_dmpa_im_revisit}
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>FP Injections DMPA- SC</td>
            <td onClick={() => navigateToRegister('fp_injections_dmpa_sc_new')}>
              {moh711Data.fp_injections_dmpa_sc_new}
            </td>
            <td onClick={() => navigateToRegister('fp_injections_dmpa_sc_revisit')}>
              {moh711Data.fp_injections_dmpa_sc_revisit}
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td rowSpan={3}>Condoms</td>
            <td>No. of clients received (Male condoms)</td>
            <td onClick={() => navigateToRegister('male_condoms_new')}>{moh711Data.male_condoms_new}</td>
            <td onClick={() => navigateToRegister('male_condoms_revisit')}>{moh711Data.male_condoms_revisit}</td>
          </tr>
          <tr>
            <td>8</td>
            <td>No. of clients received (Female condoms)</td>
            <td onClick={() => navigateToRegister('female_condoms_new')}>{moh711Data.female_condoms_new}</td>
            <td onClick={() => navigateToRegister('female_condoms_revisit')}>{moh711Data.female_condoms_revisit}</td>
          </tr>
          <tr>
            <td>9</td>
            <td>No. of clients received (Both Male and Female condoms)</td>
            <td onClick={() => navigateToRegister('male_and_female_condoms_new')}>
              {moh711Data.male_and_female_condoms_new}
            </td>
            <td onClick={() => navigateToRegister('male_and_female_condoms_revisit')}>
              {moh711Data.male_and_female_condoms_revisit}
            </td>
          </tr>
          <tr>
            <td>10</td>
            <td rowSpan={2}>Natural FP</td>
            <td>No. of clients counselled Natural FP</td>
            <td onClick={() => navigateToRegister('counselled_for_natural_family_planning_new')}>
              {moh711Data.counselled_for_natural_family_planning_new}
            </td>
            <td className={styles.greyBackground}></td>
          </tr>
          <tr>
            <td>11</td>
            <td>No. of clients given cycle beads</td>
            <td onClick={() => navigateToRegister('cycle_beads_new')}>{moh711Data.cycle_beads_new}</td>
            <td className={styles.greyBackground}></td>
          </tr>
        </tbody>
      </table>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th></th>
            <th colSpan={2}>Long acting and permanent methods</th>
            <th>1st time insertion</th>
            <th>Re-insertion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12</td>
            <td rowSpan={2}>Implants</td>
            <td>1 Rod</td>
            <td onClick={() => navigateToRegister('implants_insertion_1_rod_first_time')}>
              {moh711Data.implants_insertion_1_rod_first_time}
            </td>
            <td onClick={() => navigateToRegister('implants_insertion_1_rod_re_insertion')}>
              {moh711Data.implants_insertion_1_rod_re_insertion}
            </td>
          </tr>
          <tr>
            <td>13</td>
            <td>2 Rods</td>
            <td onClick={() => navigateToRegister('implants_insertion_2_rod_first_time')}>
              {moh711Data.implants_insertion_2_rod_first_time}
            </td>
            <td onClick={() => navigateToRegister('implants_insertion_2_rod_re_insertion')}>
              {moh711Data.implants_insertion_2_rod_re_insertion}
            </td>
          </tr>
          <tr>
            <td>14</td>
            <td rowSpan={2}>I.U.C.D insertion</td>
            <td>Hormonal</td>
            <td onClick={() => navigateToRegister('iucd_hormonal_first_time')}>
              {moh711Data.iucd_hormonal_first_time}
            </td>
            <td onClick={() => navigateToRegister('iucd_hormonal_re_insertion')}>
              {moh711Data.iucd_hormonal_re_insertion}
            </td>
          </tr>
          <tr>
            <td>15</td>
            <td>Non Hormonal</td>
            <td onClick={() => navigateToRegister('iucd_non_hormonal_first_time')}>
              {moh711Data.iucd_non_hormonal_first_time}
            </td>
            <td onClick={() => navigateToRegister('iucd_non_hormonal_re_insertion')}>
              {moh711Data.iucd_non_hormonal_re_insertion}
            </td>
          </tr>
          <tr>
            <td>16</td>
            <td rowSpan={2}>Voluntary surgical contraception</td>
            <td>BTL</td>
            <td onClick={() => navigateToRegister('surgical_contraception_btl_first_time')}>
              {moh711Data.surgical_contraception_btl_first_time}
            </td>
            <td className={styles.greyBackground}></td>
          </tr>
          <tr>
            <td>17</td>
            <td>Vasectomy</td>
            <td onClick={() => navigateToRegister('vasectomy_insertion')}>{moh711Data.vasectomy_insertion}</td>
            <td className={styles.greyBackground}></td>
          </tr>
          <tr>
            <th colSpan={3}></th>
            <th>New</th>
            <th>Revisit</th>
          </tr>
          <tr>
            <td>18</td>
            <td rowSpan={2}>Removals</td>
            <td>I.U.C.D</td>
            <td onClick={() => navigateToRegister('iucd_removals_new')}>{moh711Data.iucd_removals_new}</td>
            <td className={styles.greyBackground}></td>
          </tr>
          <tr>
            <td>19</td>
            <td>Implants</td>
            <td onClick={() => navigateToRegister('implants_removal_new')}>{moh711Data.implants_removal_new}</td>
            <td className={styles.greyBackground}></td>
          </tr>
          <tr>
            <td>20</td>
            <td rowSpan={4}>
              Number of clients <br /> receiving All FP <br /> services (Issued with <br /> commodities plus <br />
              other FP services)
            </td>
            <td>Adolescent clients (10-14 yrs) Receiving FP Services</td>
            <td onClick={() => navigateToRegister('fp_adolescent_10_14_new')}>{moh711Data.fp_adolescent_10_14_new}</td>
            <td onClick={() => navigateToRegister('fp_adolescent_10_14_revisit')}>
              {moh711Data.fp_adolescent_10_14_revisit}
            </td>
          </tr>
          <tr>
            <td>21</td>
            <td>Adolescent clients (15-19 Yrs) Receiving FP Services</td>
            <td onClick={() => navigateToRegister('fp_adolescent_15_19_new')}>{moh711Data.fp_adolescent_15_19_new}</td>
            <td onClick={() => navigateToRegister('fp_adolescent_15_19_revisit')}>
              {moh711Data.fp_adolescent_15_19_revisit}
            </td>
          </tr>
          <tr>
            <td>22</td>
            <td>Adolescent clients (20-24 Yrs) Receiving FP Services</td>
            <td onClick={() => navigateToRegister('fp_adolescent_20_24_new')}>{moh711Data.fp_adolescent_20_24_new}</td>
            <td onClick={() => navigateToRegister('fp_adolescent_20_24_revisit')}>
              {moh711Data.fp_adolescent_20_24_revisit}
            </td>
          </tr>
          <tr>
            <td>23</td>
            <td>Adults 25+ receiving FP Services</td>
            <td onClick={() => navigateToRegister('fp_adolescent_25_plus_new')}>
              {moh711Data.fp_adolescent_25_plus_new}
            </td>
            <td onClick={() => navigateToRegister('fp_adolescent_25_plus_revisit')}>
              {moh711Data.fp_adolescent_25_plus_revisit}
            </td>
          </tr>
          <tr>
            <td>24</td>
            <td rowSpan={2}>No. of clients receiving immediate post partum FP Method</td>
            <td>within 48 Hours</td>
            <td onClick={() => navigateToRegister('post_partum_fp_48_hours_new')}>
              {moh711Data.post_partum_fp_48_hours_new}
            </td>
            <td className={styles.greyBackground}></td>
          </tr>
          <tr>
            <td>25</td>
            <td>3 days to 6 weeks</td>
            <td onClick={() => navigateToRegister('post_partum_fp_3days_6_weeks_new')}>
              {moh711Data.post_partum_fp_3days_6_weeks_new}
            </td>
            <td className={styles.greyBackground}></td>
          </tr>
          <tr>
            <td>26</td>
            <td colSpan={2}>No. of clients receiving post abortion FP Method</td>
            <td onClick={() => navigateToRegister('post_abortion_fp_new')}>{moh711Data.post_abortion_fp_new}</td>
            <td className={styles.greyBackground}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FamilyPlanningComponent;
