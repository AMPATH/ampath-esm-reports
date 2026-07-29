import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import TableWrapper from '../table-wrapper/table-wrapper.component';
import TableRowMapper from '../table-wrapper/table-row-mapper.component';
import { getCell } from '../../utils/utils';
import styles from './moh-240.scss';

interface MOH240HeaderProps {
  facility?: string;
  startDate?: string;
  endDate?: string;
}

const asDate = (value?: string) => (value ? dayjs(value).format('DD/MM/YYYY') : '');

const MOH240Header: React.FC<MOH240HeaderProps> = ({ facility = '', startDate, endDate }) => {
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
        tableCells: [getCell('', 'KMHFL Code:', 1, 1, true), getCell('', '', 3)],
      },
      {
        tableCells: [
          getCell('', 'Type:', 1, 1, true),
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
      <TableWrapper className={styles.formTable}>
        <TableRowMapper tableRows={tableRows} />
      </TableWrapper>
    </div>
  );
};

export default MOH240Header;
