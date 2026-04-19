import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface GBVComponentProps {
  moh711Data: any;
}

const GBVComponent: React.FC<GBVComponentProps> = ({ moh711Data }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th></th>
            <th colSpan={5}>C. Sexual and Gender Based Violence (SGBV)</th>
          </tr>
          <tr>
            <th></th>
            <th className={styles.greyBackground}></th>
            <th>0-9 yrs</th>
            <th>10-17 yrs</th>
            <th>18-49 Yrs</th>
            <th>50+yrs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Total SGBV Total Survivors Seen (Rape, attempted rape, defilement and asault)</td>
            <td>{moh711Data.sgbv_total_survivors_0_9}</td>
            <td>{moh711Data.sgbv_total_survivors_10_17}</td>
            <td>{moh711Data.sgbv_total_survivors_18_49}</td>
            <td>{moh711Data.sgbv_total_survivors_50_plus}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>No. of SGBV survivors presenting within 72 hours</td>
            <td>{moh711Data.sgbv_within_72_hours_0_9}</td>
            <td>{moh711Data.sgbv_within_72_hours_10_17}</td>
            <td>{moh711Data.sgbv_within_72_hours_18_49}</td>
            <td>{moh711Data.sgbv_within_72_hours_50_above}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>No. of eligible Survivors Initiated on PEP</td>
            <td>{moh711Data.sgbv_initiated_on_pep_0_9}</td>
            <td>{moh711Data.sgbv_initiated_on_pep_10_17}</td>
            <td>{moh711Data.sgbv_initiated_on_pep_18_49}</td>
            <td>{moh711Data.sgbv_initiated_on_pep_50_above}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>No. of eligible survivors Completed PEP</td>
            <td>{moh711Data.sgbv_completed_pep_0_9}</td>
            <td>{moh711Data.sgbv_completed_pep_10_17}</td>
            <td>{moh711Data.sgbv_completed_pep_18_49}</td>
            <td>{moh711Data.sgbv_completed_pep_50_above}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>No. of SGBV survivors seroconverting 3 months after exposure</td>
            <td>{moh711Data.sgbv_seroconverting_0_9}</td>
            <td>{moh711Data.sgbv_seroconverting_10_17}</td>
            <td>{moh711Data.sgbv_seroconverting_18_49}</td>
            <td>{moh711Data.sgbv_seroconverting_50_above}</td>
          </tr>
          <tr>
            <td>6</td>
            <td>No. of SGBV survivors eligible for ECP</td>
            <td>{moh711Data.sgbv_eligible_for_ecp_0_9}</td>
            <td>{moh711Data.sgbv_eligible_for_ecp_10_17}</td>
            <td>{moh711Data.sgbv_eligible_for_ecp_18_49}</td>
            <td>{moh711Data.sgbv_eligible_for_ecp_50_above}</td>
          </tr>
          <tr>
            <td>7</td>
            <td>No. of SGBV survivors who received ECP</td>
            <td>{moh711Data.sgbv_receiving_ecp_0_9}</td>
            <td>{moh711Data.sgbv_receiving_ecp_10_17}</td>
            <td>{moh711Data.sgbv_receiving_ecp_18_49}</td>
            <td>{moh711Data.sgbv_receiving_ecp_50_above}</td>
          </tr>
          <tr>
            <td>8</td>
            <td>No. of rape/defilement Survivors Pregnant after 4 weeks</td>
            <td>{moh711Data.sgbv_pregnant_0_9}</td>
            <td>{moh711Data.sgbv_pregnant_10_17}</td>
            <td>{moh711Data.sgbv_pregnant_18_49}</td>
            <td>{moh711Data.sgbv_pregnant_50_above}</td>
          </tr>
          <tr>
            <td>9</td>
            <td>No. of RC/IPV clients seen</td>
            <td>{moh711Data.sgbv_rc_seen_0_9}</td>
            <td>{moh711Data.sgbv_rc_seen_10_17}</td>
            <td>{moh711Data.sgbv_rc_seen_18_49}</td>
            <td>{moh711Data.sgbv_rc_seen_50_above}</td>
          </tr>
          <tr>
            <td>10</td>
            <td>No. of survivors with disability</td>
            <td>{moh711Data.sgbv_with_disability_0_9}</td>
            <td>{moh711Data.sgbv_with_disability_10_17}</td>
            <td>{moh711Data.sgbv_with_disability_18_49}</td>
            <td>{moh711Data.sgbv_with_disability_50_above}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GBVComponent;
