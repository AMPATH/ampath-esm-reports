import React from 'react';

import classNames from 'classnames';
import styles from '../moh-713.component.scss';

interface SectionDComponentProps {}

const SectionDComponent: React.FC<SectionDComponentProps> = () => {
  return (
    <>
      <div className={styles.tableContainer}>
        <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <thead>
            <tr>
              <td colSpan={9}>Section D: Nutrition Logistics Management</td>
            </tr>
            <tr>
              <td>Commodity</td>
              <td>Beginning Balance</td>
              <td>Stock Received</td>
              <td>Issued/Dispensed</td>
              <td>Losses</td>
              <td>
                Positive Adjustment <br />
                Receipt from other HF
              </td>
              <td>
                Negative Adjustment <br />
                Receipt to other HF
              </td>
              <td>Ending Balance</td>
              <td>
                Quantity Needed <br />
                Requested
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>F - 75 (Sachets)</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Resamol (Sachet)</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>RUSF (Sachets)</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>RUTF (Sachets)</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Oil (lit)</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>CSB/UNIMIX (kg)</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>F - 100 (Sachets)</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Multiple Micro nutrients powders</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default SectionDComponent;
