import { ArrowLeft } from '@carbon/react/icons';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Button } from '@carbon/react';

import styles from './report-filters.scss';

interface ReportFiltersComponentProps {
  reportName: string;
  mode?: 'monthly' | 'daily';
  isFacility?: false | 'true';
  onGenerate?: (filters: { startDate?: string; endDate?: string; month?: string }) => void;
  isLoding?: boolean;
}
const ReportFiltersComponent: React.FC<ReportFiltersComponentProps> = ({
  reportName,
  mode = 'daily',
  isFacility,
  onGenerate,
  isLoding = false,
}) => {
  const navigate = useNavigate();

  const getToday = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getPreviousMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}`;
  };

  const [startDateString, setStartDateString] = React.useState<string>(getToday());
  const [endDateString, setEndDateString] = React.useState<string>(getToday());
  const [monthString, setMonthString] = React.useState<string>(getPreviousMonth());
  const [selectedFacility, setSelectedFacility] = React.useState<string>('');
  const [facility, setFacility] = React.useState<string>('Select Facility');
  const [startDateTime, setStartDateTime] = React.useState<string>('');
  const [endDateTime, setEndDateTime] = React.useState<string>('');

  const generateReport = () => {
    if (onGenerate) {
      const filters: { startDate?: string; endDate?: string; month?: string } = {};
      if (mode === 'daily') {
        filters.startDate = startDateString;
        filters.endDate = endDateString;
      } else if (mode === 'monthly') {
        filters.month = monthString;
      }
      onGenerate(filters);
    }
  };
  return (
    <>
      <div className={styles.titleContainer}>
        <ArrowLeft className={styles.backIcon} onClick={() => navigate(-1)} />
        <h2 className={styles.title}>{reportName}</h2>
      </div>
      <div className={styles.filtersContainer}>
        {mode === 'daily' && (
          <div className={styles.dateContainer}>
            <label htmlFor="startingMonth">Start Date:</label>
            <label htmlFor="endingMonth">End Date:</label>

            <input
              id="startingMonth"
              type="date"
              className={styles.input}
              value={startDateString}
              onChange={(e) => setStartDateString(e.target.value)}
            />

            <input
              id="endingMonth"
              type="date"
              className={styles.input}
              value={endDateString}
              onChange={(e) => setEndDateString(e.target.value)}
            />
          </div>
        )}
        {mode === 'monthly' && (
          <div>
            <div>
              <div>
                <label htmlFor="month">Month:</label>
                <input
                  id="month"
                  type="month"
                  className={styles.input}
                  value={monthString}
                  onChange={(e) => setMonthString(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.clearFix}></div>
          </div>
        )}
        {isFacility === 'true' && (
          <div>
            <label>Facility</label>
            <select
              className={styles.input}
              name="selectedFacility"
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
            >
              <option value="">{facility}</option>
            </select>
          </div>
        )}
      </div>
      {!isLoding && (
        <div className={styles.buttonContainer}>
          <Button onClick={generateReport}>Generate Report</Button>
        </div>
      )}
    </>
  );
};

export default ReportFiltersComponent;
