import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface PNCComponentProps {
  moh711Data: any;
}

const PNCComponent: React.FC<PNCComponentProps> = ({ moh711Data }) => {
  return (
    <>
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
            <td>{moh711Data.pnc_new_clients}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Revisit</td>
            <td>{moh711Data.pnc_revisit_clients}</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>No of Women counselled on Post Partum FP</td>
            <td>{moh711Data.women_couselled_on_post_partum_fp}</td>
          </tr>
          <tr>
            <td>4</td>
            <td colSpan={2}>No of Clients who received Post Partum FP</td>
            <td>{moh711Data.women_received_post_partum_fp}</td>
          </tr>
          <tr>
            <td>5</td>
            <td rowSpan={3}>No. of Mothers receiving Postpartum Care</td>
            <td>within 48 hours</td>
            <td>{moh711Data.mothers_post_partum_care_48_hours}</td>
          </tr>
          <tr>
            <td></td>
            <td>Between 3 days to 6 weeks</td>
            <td>{moh711Data.mothers_post_partum_care_3_6_weeks}</td>
          </tr>
          <tr>
            <td></td>
            <td>After 6 weeks</td>
            <td>{moh711Data.mothers_post_partum_care_after_6_weeks}</td>
          </tr>
          <tr>
            <td rowSpan={3}>6</td>
            <td rowSpan={3}>No. of Babies received Postpartum Care</td>
            <td>Within 48 hours</td>
            <td>{moh711Data.infants_post_partum_care_48_hours}</td>
          </tr>
          <tr>
            <td>Between 3 days to 6 weeks</td>
            <td>{moh711Data.infants_post_partum_care_3_6_weeks}</td>
          </tr>
          <tr>
            <td>After 6 weeks</td>
            <td>{moh711Data.infants_post_partum_care_after_6_weeks}</td>
          </tr>
          <tr>
            <td>7</td>
            <td colSpan={2}>Number of Cases of Fistula</td>
            <td>{moh711Data.fistula_cases}</td>
          </tr>
          <tr>
            <td>8</td>
            <td colSpan={2}>No referred from the Community unit to PNC</td>
            <td>{moh711Data.referrals_from_community}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PNCComponent;
