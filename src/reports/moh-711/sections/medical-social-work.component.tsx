import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface MedicalSocialWorkComponentProps {
  moh711Data: any;
}

const MedicalSocialWorkComponent: React.FC<MedicalSocialWorkComponentProps> = () => {
  return (
    <div className={styles.section}>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th></th>
            <th>J. MEDICAL SOCIAL WORK / MENTAL HEALTH</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Psycho-Social Counselling</td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Alcohol and Drug Abuse</td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mental illness</td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Adolescent issues</td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Psycho-Social Assessment (psycho, social and economic)</td>
            <td></td>
          </tr>
          <tr>
            <td>6</td>
            <td>Social investigations (Home visits / Follow ups)</td>
            <td></td>
          </tr>
          <tr>
            <td>7</td>
            <td>Social Rehabilitation</td>
            <td></td>
          </tr>
          <tr>
            <td>8</td>
            <td>Outreach Services / Health Talks</td>
            <td></td>
          </tr>
          <tr>
            <td>9</td>
            <td>Referrals</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MedicalSocialWorkComponent;
