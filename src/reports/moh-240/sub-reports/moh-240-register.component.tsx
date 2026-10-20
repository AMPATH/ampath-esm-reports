import React from 'react';
import DatatableWrapper from '../../datatable-wrapper/datatable-wrapper.component';
import { MOH_240_HEADERS, MOH_240_SUB_HEADERS, MOH_240_WRAP_KEYS, formatRegisterDate } from '../moh-240.columns';
import tableStyles from '../../../common/report-register/register-table.scss';
import classNames from 'classnames';

interface Moh240RegisterProps {
  patientList?: any[];
  indicator?: string;
}

const Moh240Register: React.FC<Moh240RegisterProps> = ({ patientList = [], indicator = '' }) => {
  const rows = patientList.map((patient, index) => {
    const row: { id: string } & Record<string, any> = { id: String(index) };

    MOH_240_HEADERS.forEach(({ key }) => {
      row[key] = (key === 'test_datetime' ? formatRegisterDate(patient[key]) : patient[key]) || '';
    });

    return row;
  });

  return (
    <div className={tableStyles.tableContainer}>
      <DatatableWrapper
        headers={[...MOH_240_HEADERS]}
        rows={rows}
        subHeaders={MOH_240_SUB_HEADERS}
        wrapKeys={MOH_240_WRAP_KEYS}
        className={classNames(tableStyles.table, tableStyles.tableBordered, tableStyles.tableStriped)}
      />
    </div>
  );
};

export default Moh240Register;
