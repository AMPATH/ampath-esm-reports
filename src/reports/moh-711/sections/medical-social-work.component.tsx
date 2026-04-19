import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface MedicalSocialWorkComponentProps {
  moh711Data: any;
}

const MedicalSocialWorkComponent: React.FC<MedicalSocialWorkComponentProps> = ({ moh711Data }) => {
  return (
    <>
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
            <td>{moh711Data.psycho_social_counselling}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Alcohol and Drug Abuse</td>
            <td>{moh711Data.alcohol_and_drug_abuse}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mental illness</td>
            <td>{moh711Data.mental_illness}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Adolescent issues</td>
            <td>{moh711Data.adolescent_issues}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Psycho-Social Assessment (psycho, social and economic)</td>
            <td>{moh711Data.psycho_social_economic_assessment}</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Social investigations (Home visits / Follow ups)</td>
            <td>{moh711Data.social_investigations}</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Social Rehabilitation</td>
            <td>{moh711Data.psycho_social_rehabilitation}</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Outreach Services / Health Talks</td>
            <td>{moh711Data.outreach_services}</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Referrals</td>
            <td>{moh711Data.mental_health_referral}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MedicalSocialWorkComponent;
