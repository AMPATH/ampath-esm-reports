import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

interface MaternityComponentProps {
  moh717ReportData: any;
}

const MaternityComponent: React.FC<MaternityComponentProps> = ({ moh717ReportData }: { moh717ReportData: any }) => {
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
            <td>{moh717ReportData.normal_deliveries}</td>
          </tr>
          <tr>
            <td>B.2.2</td>
            <td>Caesarian Sections</td>
            <td>{moh717ReportData.caesarian_sections}</td>
          </tr>
          <tr>
            <td>B.2.3</td>
            <td>Breach Deliveries</td>
            <td>{moh717ReportData.breach_deliveries}</td>
          </tr>
          <tr>
            <td>B.2.4</td>
            <td>Assisted Vaginal Delivery</td>
            <td>{moh717ReportData.assisted_vaginal_deliveries}</td>
          </tr>
          <tr>
            <td>B.2.5a</td>
            <td>BBA (Born before arrival)</td>
            <td>{moh717ReportData.born_before_arrival}</td>
          </tr>
          <tr>
            <td>B.2.5b</td>
            <td>Maternal deaths</td>
            <td>{moh717ReportData.maternal_deaths}</td>
          </tr>
          <tr>
            <td>B.2.6</td>
            <td>Maternal Deaths Audited</td>
            <td>{moh717ReportData.maternal_deaths_audited_within_7_days}</td>
          </tr>
          <tr>
            <td>B.2.7</td>
            <td>Live births</td>
            <td>{moh717ReportData.live_births}</td>
          </tr>
          <tr>
            <td>B.2.8</td>
            <td>Still births</td>
            <td>{moh717ReportData.still_births}</td>
          </tr>
          <tr>
            <td>B.2.9</td>
            <td>Neonatal deaths</td>
            <td>{moh717ReportData.neonatal_deaths_0_28_days}</td>
          </tr>
          <tr>
            <td>B.2.10</td>
            <td>Neonatal deaths Audits</td>
            <td>{moh717ReportData.neonatal_deaths_audits}</td>
          </tr>
          <tr>
            <td>B.2.11</td>
            <td>Low Birth Weight babies (under 2500gms)</td>
            <td>{moh717ReportData.low_birth_weight_less_2500gms}</td>
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
