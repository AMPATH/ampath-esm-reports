import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface GBVComponentProps {
  moh711Data: any;
}

const GBVComponent: React.FC<GBVComponentProps> = () => {
  return (
    <div className={styles.section}>
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>No. of SGBV survivors presenting within 72 hours</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>No. of eligible Survivors Initiated on PEP</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>No. of eligible survivors Completed PEP</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td>No. of SGBV survivors seroconverting 3 months after exposure</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>6</td>
            <td>No. of SGBV survivors eligible for ECP</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>7</td>
            <td>No. of SGBV survivors who received ECP</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>8</td>
            <td>No. of rape/defilement Survivors Pregnant after 4 weeks</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>9</td>
            <td>No. of RC/IPV clients seen</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>10</td>
            <td>No. of survivors with disability</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GBVComponent;
