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

  const [activeTab, setActiveTab] = React.useState<'monthly' | 'custom'>('monthly');

  const [startDateString, setStartDateString] = React.useState<string>(getToday());
  const [endDateString, setEndDateString] = React.useState<string>(getToday());
  const [monthString, setMonthString] = React.useState<string>(getPreviousMonth());

  const [selectedFacility, setSelectedFacility] = React.useState<string>('');
  const [facility, setFacility] = React.useState<string>('Select Facility');

  const generateReport = () => {
    if (onGenerate) {
      const filters: { startDate?: string; endDate?: string; month?: string } = {};

      if (mode === 'daily') {
        filters.startDate = startDateString;
        filters.endDate = endDateString;
      }

      if (mode === 'monthly') {
        if (activeTab === 'monthly') {
          filters.month = monthString;
        } else {
          filters.startDate = startDateString;
          filters.endDate = endDateString;
        }
      }

      onGenerate(filters);
    }
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <Button className={styles.backIcon} onClick={() => navigate('/')}>
          Back
        </Button>
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
            {/* Tabs */}
            <div className={styles.tabsContainer}>
              <Button
                className={activeTab === 'monthly' ? styles.activeTab : styles.tab}
                onClick={() => setActiveTab('monthly')}
              >
                Monthly
              </Button>

              <Button
                className={activeTab === 'custom' ? styles.activeTab : styles.tab}
                onClick={() => setActiveTab('custom')}
              >
                Custom
              </Button>
            </div>

            {/* Monthly tab */}
            {activeTab === 'monthly' && (
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
            )}

            {/* Custom tab */}
            {activeTab === 'custom' && (
              <div className={styles.dateContainer}>
                <label htmlFor="customStartDate">Start Date:</label>
                <label htmlFor="customEndDate">End Date:</label>

                <input
                  id="customStartDate"
                  type="date"
                  className={styles.input}
                  value={startDateString}
                  onChange={(e) => setStartDateString(e.target.value)}
                />

                <input
                  id="customEndDate"
                  type="date"
                  className={styles.input}
                  value={endDateString}
                  onChange={(e) => setEndDateString(e.target.value)}
                />
              </div>
            )}
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
