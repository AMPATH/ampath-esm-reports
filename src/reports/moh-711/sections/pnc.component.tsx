import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';
import { useOpenMoh711PncLinelist } from '../linelist/use-open-moh-711-pnc-linelist';

interface PNCComponentProps {
  moh711Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const PNCComponent: React.FC<PNCComponentProps> = ({ moh711Data, startDate, endDate, locationUuids }) => {
  const openLinelist = useOpenMoh711PncLinelist(startDate, endDate, locationUuids);
  return (
    <div className={styles.section}>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <td></td>
            <th colSpan={3}>H. Post Natal Care (PNC)</th>
          </tr>
          <tr>
            <th colSpan={3} className={styles.greyBackground}></th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td rowSpan={2}>No. of PNC Clients</td>
            <td>New</td>
            <td onClick={() => openLinelist('pnc_new_clients')}>{moh711Data.pnc_new_clients ?? 0}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Revisit</td>
            <td onClick={() => openLinelist('pnc_revisit_clients')}>{moh711Data.pnc_revisit_clients ?? 0}</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>No of Women counselled on Post Partum FP</td>
            <td onClick={() => openLinelist('women_couselled_on_post_partum_fp')}>
              {moh711Data.women_couselled_on_post_partum_fp ?? 0}
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td colSpan={2}>No of Clients who received Post Partum FP</td>
            <td onClick={() => openLinelist('women_received_post_partum_fp')}>
              {moh711Data.women_received_post_partum_fp ?? 0}
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td rowSpan={3}>No. of Mothers receiving Postpartum Care</td>
            <td>within 48 hours</td>
            <td onClick={() => openLinelist('mothers_post_partum_care_48_hours')}>
              {moh711Data.mothers_post_partum_care_48_hours ?? 0}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>Between 3 days to 6 weeks</td>
            <td onClick={() => openLinelist('mothers_post_partum_care_3_6_weeks')}>
              {moh711Data.mothers_post_partum_care_3_6_weeks ?? 0}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>After 6 weeks</td>
            <td onClick={() => openLinelist('mothers_post_partum_care_after_6_weeks')}>
              {moh711Data.mothers_post_partum_care_after_6_weeks ?? 0}
            </td>
          </tr>
          <tr>
            <td rowSpan={3}>6</td>
            <td rowSpan={3}>No. of Babies received Postpartum Care</td>
            <td>Within 48 hours</td>
            <td onClick={() => openLinelist('infants_post_partum_care_48_hours')}>
              {moh711Data.infants_post_partum_care_48_hours ?? 0}
            </td>
          </tr>
          <tr>
            <td>Between 3 days to 6 weeks</td>
            <td onClick={() => openLinelist('infants_post_partum_care_3_6_weeks')}>
              {moh711Data.infants_post_partum_care_3_6_weeks ?? 0}
            </td>
          </tr>
          <tr>
            <td>After 6 weeks</td>
            <td onClick={() => openLinelist('infants_post_partum_care_after_6_weeks')}>
              {moh711Data.infants_post_partum_care_after_6_weeks ?? 0}
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td colSpan={2}>Number of Cases of Fistula</td>
            <td onClick={() => openLinelist('fistula_cases')}>{moh711Data.fistula_cases ?? 0}</td>
          </tr>
          <tr>
            <td>8</td>
            <td colSpan={2}>No referred from the Community unit to PNC</td>
            <td onClick={() => openLinelist('referrals_from_community')}>
              {moh711Data.referrals_from_community ?? 0}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PNCComponent;
