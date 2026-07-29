import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

interface MaternityComponentProps {
  moh717ReportData: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const MaternityComponent: React.FC<MaternityComponentProps> = ({
  moh717ReportData,
  startDate,
  endDate,
  locationUuids,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToRegister = (indicator: string | string[]) => {
    navigate(
      `/moh-333-register?startDate=${startDate}&endDate=${endDate}&locationUuids=${locationUuids}&indicator=${indicator}&from=moh-717`,
      {
        state: {
          from: location.pathname,
          reportName: 'moh717Report',
        },
      },
    );
  };
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={2} className={styles.totals}>
              B.2 MATERNITY SERVICES
            </th>
            <th className={styles.totals}>Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>B.2.1</td>
            <td>Normal Deliveries</td>
            <td onClick={() => navigateToRegister('normal_deliveries')}>{moh717ReportData.normal_deliveries}</td>
          </tr>
          <tr>
            <td>B.2.2</td>
            <td>Caesarian Sections</td>
            <td onClick={() => navigateToRegister('caesarian_sections')}>{moh717ReportData.caesarian_sections}</td>
          </tr>
          <tr>
            <td>B.2.3</td>
            <td>Breach Deliveries</td>
            <td onClick={() => navigateToRegister('breach_deliveries')}>{moh717ReportData.breach_deliveries}</td>
          </tr>
          <tr>
            <td>B.2.4</td>
            <td>Assisted Vaginal Delivery</td>
            <td onClick={() => navigateToRegister('assisted_vaginal_deliveries')}>
              {moh717ReportData.assisted_vaginal_deliveries}
            </td>
          </tr>
          <tr>
            <td>B.2.5a</td>
            <td>BBA (Born before arrival)</td>
            <td onClick={() => navigateToRegister('born_before_arrival')}>{moh717ReportData.born_before_arrival}</td>
          </tr>
          <tr>
            <td>B.2.5b</td>
            <td>Maternal deaths</td>
            <td onClick={() => navigateToRegister('maternal_deaths')}>{moh717ReportData.maternal_deaths}</td>
          </tr>
          <tr>
            <td>B.2.6</td>
            <td>Maternal Deaths Audited</td>
            <td onClick={() => navigateToRegister('maternal_deaths_audited_within_7_days')}>
              {moh717ReportData.maternal_deaths_audited_within_7_days}
            </td>
          </tr>
          <tr>
            <td>B.2.7</td>
            <td>Live births</td>
            <td onClick={() => navigateToRegister('live_births')}>{moh717ReportData.live_births}</td>
          </tr>
          <tr>
            <td>B.2.8</td>
            <td>Still births</td>
            <td onClick={() => navigateToRegister('still_births')}>{moh717ReportData.still_births}</td>
          </tr>
          <tr>
            <td>B.2.9</td>
            <td>Neonatal deaths</td>
            <td onClick={() => navigateToRegister('neonatal_deaths_0_28_days')}>
              {moh717ReportData.neonatal_deaths_0_28_days}
            </td>
          </tr>
          <tr>
            <td>B.2.10</td>
            <td>Neonatal deaths Audits</td>
            <td onClick={() => navigateToRegister('neonatal_deaths_audits')}>
              {moh717ReportData.neonatal_deaths_audits}
            </td>
          </tr>
          <tr>
            <td>B.2.11</td>
            <td>Low Birth Weight babies (under 2500gms)</td>
            <td onClick={() => navigateToRegister('low_birth_weight_less_2500gms')}>
              {moh717ReportData.low_birth_weight_less_2500gms}
            </td>
          </tr>
          <tr>
            <td>B.2.12</td>
            <td>Total Discharges: new born</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MaternityComponent;
