import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface ChanisComponentProps {
  moh711Data: any;
}

const ChanisComponent: React.FC<ChanisComponentProps> = ({ moh711Data }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <th colSpan={6}></th>
          <tr>
            <th colSpan={6}>F. Child Health and Nutrition Information System</th>
          </tr>
          <tr>
            <th colSpan={2}>Weight for age</th>
            <th></th>
            <th>M</th>
            <th>F</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={6}>1</td>
            <td rowSpan={6}>
              0 - &lt;6 <br /> months
            </td>
            <td>Normal Weight for Age</td>
            <td>{moh711Data.normal_weight_0_6_months_male}</td>
            <td>{moh711Data.normal_weight_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Underweight</td>
            <td>{moh711Data.underweight_0_6_months_male}</td>
            <td>{moh711Data.underweight_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Severely underweight</td>
            <td>{moh711Data.severely_underweight_0_6_months_male}</td>
            <td>{moh711Data.severely_underweight_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Overweight</td>
            <td>{moh711Data.overweight_0_6_months_male}</td>
            <td>{moh711Data.overweight_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Obese</td>
            <td>{moh711Data.obese_0_6_months_male}</td>
            <td>{moh711Data.obese_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <th>Total Weighed</th>
            <td>{moh711Data.obese_0_6_months_male}</td>
            <td>{moh711Data.obese_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td rowSpan={6}>2</td>
            <td rowSpan={6}>6-23 months</td>
            <td>Normal Weight for Age</td>
            <td>{moh711Data.normal_weight_6_23_months_male}</td>
            <td>{moh711Data.normal_weight_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Underweight</td>
            <td>{moh711Data.underweight_6_23_months_male}</td>
            <td>{moh711Data.underweight_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Severely underweight</td>
            <td>{moh711Data.severely_underweight_6_23_months_male}</td>
            <td>{moh711Data.severely_underweight_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Overweight</td>
            <td>{moh711Data.overweight_6_23_months_male}</td>
            <td>{moh711Data.overweight_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Obese 6-23</td>
            <td>{moh711Data.obese_6_23_months_male}</td>
            <td>{moh711Data.obese_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <th>Total Weighed</th>
            <td>{moh711Data.obese_6_23_months_male}</td>
            <td>{moh711Data.obese_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td rowSpan={6}>3</td>
            <td rowSpan={6}>24 - 59 months</td>
            <td>Normal Weight for Age</td>
            <td>{moh711Data.normal_weight_24_59_months_male}</td>
            <td>{moh711Data.normal_weight_24_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Underweight</td>
            <td>{moh711Data.underweight_24_59_months_male}</td>
            <td>{moh711Data.underweight_24_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Severely underweight</td>
            <td>{moh711Data.severely_underweight_24_59_months_male}</td>
            <td>{moh711Data.severely_underweight_24_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Overweight</td>
            <td>{moh711Data.overweight_24_59_months_male}</td>
            <td>{moh711Data.overweight_24_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Obese 24-59</td>
            <td>{moh711Data.obese_24_59_months_male}</td>
            <td>{moh711Data.obese_24_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <th>Total Weighed</th>
            <td>{moh711Data.obese_24_59_months_male}</td>
            <td>{moh711Data.obese_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td rowSpan={3}>4</td>
            <td rowSpan={3}>MUAC 6-59 months</td>
            <td>Normal (Green)</td>
            <td>{moh711Data.muac_6_59_months_normal_male}</td>
            <td>{moh711Data.muac_6_59_months_normal_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Moderate (Yellow)</td>
            <td>{moh711Data.muac_6_59_months_moderate_male}</td>
            <td>{moh711Data.muac_6_59_months_moderate_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Severe (Red)</td>
            <td>{moh711Data.muac_6_59_months_severe_male}</td>
            <td>{moh711Data.muac_6_59_months_severe_female}</td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={2}>Height for Age</th>
            <th></th>
            <th>F</th>
            <th>M</th>
            <th>Total</th>
          </tr>
          <tr>
            <td rowSpan={4}>5</td>
            <td rowSpan={4}>0-&le;6 Months</td>
            <td>Normal Height for Age</td>
            <td>{moh711Data.height_for_age_0_6_months_normal_male}</td>
            <td>{moh711Data.height_for_age_0_6_months_normal_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Stunted</td>
            <td>{moh711Data.stunted_0_6_months_male}</td>
            <td>{moh711Data.stunted_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Severely Stunted</td>
            <td>{moh711Data.severely_stunted_0_6_months_male}</td>
            <td>{moh711Data.severely_stunted_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <th>Total Measured</th>
            <td>{moh711Data.severely_stunted_0_6_months_male}</td>
            <td>{moh711Data.severely_stunted_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td rowSpan={4}>6</td>
            <td rowSpan={4}>6 - 23 months</td>
            <td>Normal Height for Age</td>
            <td>{moh711Data.normal_height_for_age_6_23_months_male}</td>
            <td>{moh711Data.normal_height_for_age_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Stunted</td>
            <td>{moh711Data.stunted_6_23_months_male}</td>
            <td>{moh711Data.stunted_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Severely Stunted</td>
            <td>{moh711Data.severely_stunted_6_23_months_male}</td>
            <td>{moh711Data.severely_stunted_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <th>Total Weighed</th>
            <td>{moh711Data.severely_stunted_0_6_months_male}</td>
            <td>{moh711Data.severely_stunted_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td rowSpan={4}>7</td>
            <td rowSpan={4}>24 - 59 months</td>
            <td>Normal Height for Age</td>
            <td>{moh711Data.normal_height_for_age_24_59_months_male}</td>
            <td>{moh711Data.normal_height_for_age_24_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Stunted</td>
            <td>{moh711Data.stunted_24_59_months_male}</td>
            <td>{moh711Data.stunted_24_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Severely Stunted</td>
            <td>{moh711Data.severely_stunted_24_59_months_male}</td>
            <td>{moh711Data.severely_stunted_24_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <th>Total Weighed</th>
            <td>{moh711Data.severely_stunted_0_6_months_male}</td>
            <td>{moh711Data.severely_stunted_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <th colSpan={3}>Others</th>
            <th>M</th>
            <th>F</th>
            <th>Total</th>
          </tr>
          <tr>
            <td rowSpan={4}>8</td>
            <td rowSpan={4}>0 - 59 Months</td>
            <td>New Visits</td>
            <td>{moh711Data.new_visits_0_59_months_attending_cwc_male}</td>
            <td>{moh711Data.new_visits_0_59_months_attending_cwc_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Kwashiorkor</td>
            <td>{moh711Data.kwashiokor_0_59_months_male}</td>
            <td>{moh711Data.kwashiokor_0_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Marasmus</td>
            <td>{moh711Data.marasmus_0_59_months_male}</td>
            <td>{moh711Data.marasmus_0_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>Faltering Growth</td>
            <td>{moh711Data.faltering_growth_0_59_months_male}</td>
            <td>{moh711Data.faltering_growth_0_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>9</td>
            <td>0 - &le;6</td>
            <td>Exclusive breastfeeding</td>
            <td>{moh711Data.exclusive_breastfeeding_0_6_months_male}</td>
            <td>{moh711Data.exclusive_breastfeeding_0_6_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>10</td>
            <td> 12-59 Months</td>
            <td>Dewormed</td>
            <td>{moh711Data.dewormed_12_59_months_male}</td>
            <td>{moh711Data.dewormed_12_59_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>11</td>
            <td>6-23 months</td>
            <td>MNPs Supplimentation</td>
            <td>{moh711Data.mnps_supplimentation_6_23_months_male}</td>
            <td>{moh711Data.mnps_supplimentation_6_23_months_female}</td>
            <td></td>
          </tr>
          <tr>
            <td>12</td>
            <td colSpan={2}>No. of children who have diarrhoea with severe dehydration</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>13</td>
            <td colSpan={2}>No. of children who have diarrhoea with some dehydration</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>14</td>
            <td colSpan={2}>No. of children who have diarrhoea with no dehydration</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>15</td>
            <td colSpan={2}>No. of children with diarrhoea treated with ORS and Zinc (Co-pack)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>16</td>
            <td colSpan={2}>No. of children with pneumonia treated with Amoxycillin (DT)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>17</td>
            <td colSpan={2}>Under five deaths</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>18</td>
            <td colSpan={2}>No. of children with any Kind of disability</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>19</td>
            <td colSpan={2}>No. of children with delayed milestones</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ChanisComponent;
