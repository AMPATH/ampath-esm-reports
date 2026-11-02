import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface CervicalCancerComponentProps {
  moh711Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const CervicalCancerComponent: React.FC<CervicalCancerComponentProps> = () => {
  return (
    <div className={styles.section}>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th></th>
            <th colSpan={4}>G. Cervical cancer screening</th>
          </tr>
          <tr>
            <th></th>
            <th className={styles.greyBackground}></th>
            <th>&lt;25 yrs</th>
            <th>25-49 Years</th>
            <th>50+yrs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>No. of Clients receiving VIA/VILI/HPV VILI/HPV</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>No. screened for Pap smear</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>No. screend for HPV test</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>No. of clients with Positive VIA/VILI results</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td>No. of clients with Positive Cytology result</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>6</td>
            <td>No. of clients with Positive HPV results</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>7</td>
            <td>No. of clients with suspicious cancer lessions</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>8</td>
            <td>No. of clients treated using Cryotherapy</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>9</td>
            <td>No. of clients treated using LEEP</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>10</td>
            <td>No of HIV positive clients screened</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CervicalCancerComponent;
