import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

interface MedicalRecordsComponentProps {
  moh717ReportData: any;
}

const MedicalRecordsComponent: React.FC<MedicalRecordsComponentProps> = ({ moh717ReportData }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th>F. MEDICAL RECORDS ISSUED</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>F.1 New Files/Folders</td>
            <td>{moh717ReportData.new_patient_files_issued}</td>
          </tr>
          <tr>
            <td>F.2 Outpatient Cards/booklets</td>
            <td>{moh717ReportData.outpatient_records_cards_issued}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MedicalRecordsComponent;
