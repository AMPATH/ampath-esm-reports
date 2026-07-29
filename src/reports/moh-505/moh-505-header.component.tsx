import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import TableWrapper from '../table-wrapper/table-wrapper.component';
import TableRowMapper from '../table-wrapper/table-row-mapper.component';
import { getCell } from '../../utils/utils';
import styles from './moh-505.scss';

interface MOH505HeaderProps {
  facility?: string;
  startDate?: string;
  endDate?: string;
}

const asDate = (value?: string) => (value ? dayjs(value).format('DD/MM/YYYY') : '');

const MOH505Header: React.FC<MOH505HeaderProps> = ({ facility = '', startDate, endDate }) => {
  const tableRows = useMemo(() => {
    return [
      {
        tableCells: [getCell('', 'County:', 1, 1, true), getCell('', '', 3)],
      },
      {
        tableCells: [getCell('', 'Sub-County:', 1, 1, true), getCell('', '', 3)],
      },
      {
        tableCells: [getCell('', 'Health Facility:', 1, 1, true), getCell('', facility, 3)],
      },
      {
        tableCells: [getCell('', 'KMHFL code:', 1, 1, true), getCell('', '', 3)],
      },
      {
        tableCells: [
          getCell('', 'Facility Type:', 1, 1, true),
          getCell('', ''),
          getCell('', 'Man. Agency:', 1, 1, true),
          getCell('', ''),
        ],
      },
      {
        tableCells: [
          getCell('', 'Start date:', 1, 1, true),
          getCell('', asDate(startDate)),
          getCell('', 'End date:', 1, 1, true),
          getCell('', asDate(endDate)),
        ],
      },
    ];
  }, [facility, startDate, endDate]);

  return (
    <div className={styles.headerSection}>
      <div className={styles.mainTitleBox}>
        <p className={styles.ministry}>Ministry of Health</p>
        <h3 className={styles.reportTitle}>MOH 505 IDSR</h3>
        <p className={styles.subTitle}>Weekly Epidemic Monitoring Form</p>
      </div>
      <TableWrapper className={styles.headerTable}>
        <TableRowMapper tableRows={tableRows} />
      </TableWrapper>
    </div>
  );
};

export default MOH505Header;
