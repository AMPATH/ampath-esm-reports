import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

interface TBScreeningProps {
  moh711Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const TBScreeningComponent: React.FC<TBScreeningProps> = ({ moh711Data, startDate, endDate, locationUuids }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToRegister = (indicator: string) => {
    navigate(
      `/tb-register?startDate=${startDate}&endDate=${endDate}&locationUuids=${locationUuids}&indicator=${indicator}&from=moh-711`,
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
            <th colSpan={2}>M. TB SCREENING</th>
            <th>0 - 14 years</th>
            <th>15 years +</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Total Number of people screened</td>
            <td onClick={() => navigateToRegister('total_screened_for_tb_0_to_14')}>
              {moh711Data.total_screened_for_tb_0_to_14 ?? 0}
            </td>
            <td onClick={() => navigateToRegister('total_screened_for_tb_15_above')}>
              {moh711Data.total_screened_for_tb_15_above ?? 0}
            </td>
            <td onClick={() => navigateToRegister('total_screened_for_tb')}>{moh711Data.total_screened_for_tb ?? 0}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Total Number of presumptive TB cases</td>
            <td onClick={() => navigateToRegister('total_presumptive_tb_cases_0_14')}>
              {moh711Data.total_presumptive_tb_cases_0_14 ?? 0}
            </td>
            <td onClick={() => navigateToRegister('total_presumptive_tb_cases_15_above')}>
              {moh711Data.total_presumptive_tb_cases_15_above ?? 0}
            </td>
            <td onClick={() => navigateToRegister('total_presumptive_tb_cases')}>
              {moh711Data.total_presumptive_tb_cases ?? 0}
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Total Number of already on TB treatment</td>
            <td onClick={() => navigateToRegister('already_on_tb_treatment_0_14')}>
              {moh711Data.already_on_tb_treatment_0_14 ?? 0}
            </td>
            <td onClick={() => navigateToRegister('already_on_tb_treatment_15_above')}>
              {moh711Data.already_on_tb_treatment_15_above ?? 0}
            </td>
            <td onClick={() => navigateToRegister('already_on_tb_treatment')}>
              {moh711Data.already_on_tb_treatment ?? 0}
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Total Number of people not screened</td>
            <td onClick={() => navigateToRegister('not_screened_for_tb_0_14')}>
              {moh711Data.not_screened_for_tb_0_14 ?? 0}
            </td>
            <td onClick={() => navigateToRegister('not_screened_for_tb_15_above')}>
              {moh711Data.not_screened_for_tb_15_above ?? 0}
            </td>
            <td onClick={() => navigateToRegister('not_screened_for_tb')}>{moh711Data.not_screened_for_tb ?? 0}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TBScreeningComponent;
