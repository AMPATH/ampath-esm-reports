import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

interface InpatientComponentProps {
  moh717ReportData: any;
}

const PharmacyComponent: React.FC<InpatientComponentProps> = ({ moh717ReportData }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th>D. PHARMACY</th>
            <th>No. of Prescriptions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>D.1 Common Drugs</td>
            <td>{moh717ReportData.prescriptions_issued_common_drugs}</td>
          </tr>
          <tr>
            <td>D.2 Antibiotics</td>
            <td>{moh717ReportData.prescriptions_issued_antibiotics}</td>
          </tr>
          <tr>
            <td>D.3 Special Drugs</td>
            <td>{moh717ReportData.prescriptions_issued_special_drugs}</td>
          </tr>
          <tr>
            <td>D.4 Drugs For Children</td>
            <td>{moh717ReportData.prescriptions_issued_drugs_children}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PharmacyComponent;
