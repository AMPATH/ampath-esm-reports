import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

interface PNCComponentProps {
  moh711Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const PNCComponent: React.FC<PNCComponentProps> = ({ moh711Data, startDate, endDate, locationUuids }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToRegister = (indicator: string) => {
    navigate(
      `/moh-406-register?startDate=${startDate}&endDate=${endDate}&locationUuids=${locationUuids}&indicator=${indicator}`,
      {
        state: {
          from: location.pathname,
          reportName: 'moh711Report',
        },
      },
    );
  };
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
            <td onClick={() => navigateToRegister('pnc_new_clients')}>{moh711Data.pnc_new_clients}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Revisit</td>
            <td onClick={() => navigateToRegister('pnc_revisit_clients')}>{moh711Data.pnc_revisit_clients}</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>No of Women counselled on Post Partum FP</td>
            <td onClick={() => navigateToRegister('women_couselled_on_post_partum_fp')}>
              {moh711Data.women_couselled_on_post_partum_fp}
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td colSpan={2}>No of Clients who received Post Partum FP</td>
            <td onClick={() => navigateToRegister('women_received_post_partum_fp')}>
              {moh711Data.women_received_post_partum_fp}
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td rowSpan={3}>No. of Mothers receiving Postpartum Care</td>
            <td>within 48 hours</td>
            <td onClick={() => navigateToRegister('mothers_post_partum_care_48_hours')}>
              {moh711Data.mothers_post_partum_care_48_hours}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>Between 3 days to 6 weeks</td>
            <td onClick={() => navigateToRegister('mothers_post_partum_care_3_6_weeks')}>
              {moh711Data.mothers_post_partum_care_3_6_weeks}
            </td>
          </tr>
          <tr>
            <td></td>
            <td>After 6 weeks</td>
            <td onClick={() => navigateToRegister('mothers_post_partum_care_after_6_weeks')}>
              {moh711Data.mothers_post_partum_care_after_6_weeks}
            </td>
          </tr>
          <tr>
            <td rowSpan={3}>6</td>
            <td rowSpan={3}>No. of Babies received Postpartum Care</td>
            <td>Within 48 hours</td>
            <td onClick={() => navigateToRegister('infants_post_partum_care_48_hours')}>
              {moh711Data.infants_post_partum_care_48_hours}
            </td>
          </tr>
          <tr>
            <td>Between 3 days to 6 weeks</td>
            <td onClick={() => navigateToRegister('infants_post_partum_care_3_6_weeks')}>
              {moh711Data.infants_post_partum_care_3_6_weeks}
            </td>
          </tr>
          <tr>
            <td>After 6 weeks</td>
            <td onClick={() => navigateToRegister('infants_post_partum_care_after_6_weeks')}>
              {moh711Data.infants_post_partum_care_after_6_weeks}
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td colSpan={2}>Number of Cases of Fistula</td>
            <td onClick={() => navigateToRegister('pnc_new_clients')}>{moh711Data.fistula_cases}</td>
          </tr>
          <tr>
            <td>8</td>
            <td colSpan={2}>No referred from the Community unit to PNC</td>
            <td onClick={() => navigateToRegister('pnc_new_clients')}>{moh711Data.referrals_from_community}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PNCComponent;
