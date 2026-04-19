import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface ANCComponentProps {
  moh711Data: any;
}

const ANCComponent: React.FC<ANCComponentProps> = ({ moh711Data }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={3}>A. ANC/PMTCT</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td rowSpan={2}>No. of ANC Clients</td>
            <td>New</td>
            <td>{moh711Data.new_anc_clients}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Re-visit</td>
            <td>{moh711Data.revisit_anc_clients}</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>No. of Clients given IPT (1st Dose)</td>
            <td>{moh711Data.first_ipt_dose}</td>
          </tr>
          <tr>
            <td>4</td>
            <td colSpan={2}>No. of Clients given IPT (2nd Dose)</td>
            <td>{moh711Data.second_ipt_dose}</td>
          </tr>
          <tr>
            <td>5</td>
            <td colSpan={2}>No. of Clients given IPT (3rd Dose)</td>
            <td>{moh711Data.third_ipt_dose}</td>
          </tr>
          <tr>
            <td>6</td>
            <td colSpan={2}>No. of Clients with Hb&lt;11g/dl</td>
            <td>{moh711Data.Hb_less_11g}</td>
          </tr>
          <tr>
            <td>7</td>
            <td colSpan={2}>No. clients with 1st ANC contact at 12 or less weeks</td>
            <td>{moh711Data.first_anc_contact_12_or_less_weeks}</td>
          </tr>
          <tr>
            <td>8</td>
            <td colSpan={2}>Pregnant women completing 4th ANC Contacts</td>
            <td>{moh711Data.completing_4_anc_visits}</td>
          </tr>
          <tr>
            <td>9</td>
            <td colSpan={2}>No. of clients completed 8th ANC Contacts</td>
            <td>{moh711Data.completing_8_anc_contact}</td>
          </tr>
          <tr>
            <td>10</td>
            <td colSpan={2}>No. of LLINs distributed to under 1 year</td>
            <td>{moh711Data.llins_children_less_than_one}</td>
          </tr>
          <tr>
            <td>11</td>
            <td colSpan={2}>No. of LLINs distributed to ANC clients</td>
            <td>{moh711Data.llins_anc_clients}</td>
          </tr>
          <tr>
            <td>12</td>
            <td rowSpan={2}>No. of clients</td>
            <td>Tested for Syphilis</td>
            <td>{moh711Data.anc_clients_tested_syphilis}</td>
          </tr>
          <tr>
            <td>13</td>
            <td>Positive (+ve)</td>
            <td>{moh711Data.syphilis_positive}</td>
          </tr>
          <tr>
            <td>14</td>
            <td colSpan={2}>Total Women Done Breast Examination</td>
            <td>{moh711Data.breast_exam}</td>
          </tr>
          <tr>
            <td>15</td>
            <td colSpan={2}>No. of adolescents (10-14 years) presenting with pregnancy at 1st ANC contact</td>
            <td>{moh711Data.adolesc_10_14}</td>
          </tr>
          <tr>
            <td>16</td>
            <td colSpan={2}>No. of adolescents (15-19 years) presenting with pregnancy at 1st ANC contact</td>
            <td>{moh711Data.adolesc_15_19}</td>
          </tr>
          <tr>
            <td>17</td>
            <td colSpan={2}>No. of youth (20-24 years) presenting with pregnancy at 1st ANC contact</td>
            <td>{moh711Data.youth_20_24}</td>
          </tr>
          <tr>
            <td>18</td>
            <td colSpan={2}>No. of clients issued with Iron</td>
            <td>{moh711Data.iron}</td>
          </tr>
          <tr>
            <td>19</td>
            <td colSpan={2}>No. of clients issued with Folic</td>
            <td>{moh711Data.folic}</td>
          </tr>
          <tr>
            <td>20</td>
            <td colSpan={2}>No. of clients issued with Combined Ferrous Folate</td>
            <td>{moh711Data.iron_and_folate}</td>
          </tr>
          <tr>
            <td>21</td>
            <td colSpan={2}>No. of pregnant women presenting in ANC with complication associated with FGM</td>
            <td>{moh711Data.fgm_complications}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ANCComponent;
