import React from 'react';
import styles from './data-cell.scss';
interface DataCellProps {
  value: number;
  indicator: string;
  indicatorSelected: (indicator: string) => void;
}
const DataCell: React.FC<DataCellProps> = ({ value, indicator, indicatorSelected }) => {
  const handleCellClicked = () => {
    indicatorSelected(indicator);
  };
  if (!value || value < 0) {
    return 0;
  }
  return (
    <>
      <span onClick={handleCellClicked} className={styles.dataCell}>
        {value ?? 0}
      </span>
    </>
  );
};
export default DataCell;
