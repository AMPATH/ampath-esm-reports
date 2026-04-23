import React, { useState } from 'react';
import { useSession } from '@openmrs/esm-framework';
import { Loading } from '@carbon/react';
import UrineAnalysis from './sub-reports/urine-analysis/urine-analysis.component';
import BloodChemistry from './sub-reports/blood-chemistry/blood-chemistry.component';
import Parasitology from './sub-reports/parasitology/parasitology.component';
import Haematology from './sub-reports/haematology/haematology.component';
import Bacteriology from './sub-reports/bacteriology/bacteriology.component';
import HistologyAndCytology from './sub-reports/histology-and-cytology/histology-and-cytology.component';
import Serology from './sub-reports/serology/serology.component';
import SpecimenReferralToHigherLevels from './sub-reports/specimen-referral-to-higher-levels/specimen-referral-to-higher-levels.component';
import DrugSusceptibilityTesting from './sub-reports/drug-susceptibility-testing/drug-susceptibility-testing.component';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';
import { getMoh706 } from '../../resources/moh-706.resource';

const MoH706Report: React.FC = () => {
  const [moh706Data, setMoh706Data] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [filters, setFilters] = useState<{ locationUuids?: string; startDate?: string; endDate?: string }>({});

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;

  const fetchMoh706Data = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
    setErrorMessage('');
    setIsLoading(true);

    let startDate = filters.startDate;
    let endDate = filters.endDate;

    if (filters.month) {
      const [year, monthIndex] = filters.month.split('-').map(Number);
      const start = new Date(year, monthIndex - 1, 1);
      const end = new Date(year, monthIndex, 0);

      const formatLocalDate = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      };

      startDate = formatLocalDate(start);
      endDate = formatLocalDate(end);
    }

    const params = {
      locationUuids: locationUuids || '',
      startDate,
      endDate,
    };

    try {
      const result = await getMoh706(params);
      const flatData = Object.assign({}, ...result);
      setMoh706Data(flatData);
      setFilters({ locationUuids: params.locationUuids, startDate, endDate });
    } catch (error: any) {
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ReportFiltersComponent reportName="MOH-706 Report" mode="monthly" onGenerate={fetchMoh706Data} isLoding={isLoading} />
      {isLoading && <Loading description="Fetching data...." />}
      {!isLoading && errorMessage && (
        <div>
          <a href="#" className="close" data-dismiss="alert">
            &times;
          </a>
          <h4>
            <strong>
              <span className="glyphicon glyphicon-warning-sign"></span>{' '}
            </strong>{' '}
            An error occurred while trying to load the report. Please try again.
          </h4>
          <p>
            <small>{errorMessage}</small>
          </p>
        </div>
      )}
      <UrineAnalysis data={moh706Data} locationUuids={filters.locationUuids} startDate={filters.startDate} endDate={filters.endDate} />
      <BloodChemistry data={moh706Data} locationUuids={filters.locationUuids} startDate={filters.startDate} endDate={filters.endDate} />
      <Parasitology data={moh706Data} locationUuids={filters.locationUuids} startDate={filters.startDate} endDate={filters.endDate} />
      <Haematology data={moh706Data} locationUuids={filters.locationUuids} startDate={filters.startDate} endDate={filters.endDate} />
      <Bacteriology data={moh706Data} locationUuids={filters.locationUuids} startDate={filters.startDate} endDate={filters.endDate} />
      <HistologyAndCytology />
      <Serology data={moh706Data} locationUuids={filters.locationUuids} startDate={filters.startDate} endDate={filters.endDate} />
      <SpecimenReferralToHigherLevels />
      <DrugSusceptibilityTesting />
    </>
  );
};

export default MoH706Report;
