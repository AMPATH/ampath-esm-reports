import React, { useEffect, useState } from 'react';
import { formatDate, useSession } from '@openmrs/esm-framework';
import { Column, Grid } from '@carbon/react';
import UrineAnalysis from './sub-reports/urine-analysis/urine-analysis.component';
import BloodChemistry from './sub-reports/blood-chemistry/blood-chemistry.component';
import Parasitology from './sub-reports/parasitology/parasitology.component';
import Haematology from './sub-reports/haematology/haematology.component';
import Bacteriology from './sub-reports/bacteriology/bacteriology.component';
import HistologyAndCytology from './sub-reports/histology-and-cytology/histology-and-cytology.component';
import Serology from './sub-reports/serology/serology.component';
import SpecimenReferralToHigherLevels from './sub-reports/specimen-referral-to-higher-levels/specimen-referral-to-higher-levels.component';
import DrugSusceptibilityTesting from './sub-reports/drug-susceptibility-testing/drug-susceptibility-testing.component';
import { ReportFiltersComponent, type ReportPeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { hasReportData, ReportPlaceholder } from '../../common/report-placeholder';
import { getMoh706 } from '../../resources/moh-706.resource';
import styles from './moh-706.scss';
import MOH706Header from './moh-706-header.component';
import { useSearchParams } from 'react-router-dom';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';

const MoH706Report: React.FC = () => {
  const [moh706Data, setMoh706Data] = useState<any>({});
  const isReportGenerated = hasReportData(moh706Data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ locationUuids?: string; startDate?: string; endDate?: string }>({});

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;

  /* Masthead and sign-off fill themselves in, as on the other reports */
  const facility = session?.sessionLocation?.display ?? '';
  const compiledBy = session?.user?.person?.display ?? session?.user?.display ?? '';
  const compiledOn = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (startDate && endDate) {
      setFilters({ locationUuids, startDate, endDate });
      fetchMoh706Data({ startDate, endDate });
    }
  }, [searchParams]);

  const fetchMoh706Data = async ({ startDate, endDate }: Pick<ReportPeriod, 'startDate' | 'endDate'>) => {
    setIsLoading(true);

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
      showReportError('the MOH-706 report', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-706 Report"
        mode="both"
        onGenerate={fetchMoh706Data}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && <ReportPlaceholder reportName="MOH-706" />}
      {!isLoading && isReportGenerated && (
        <ReportPage>
          <div className={styles.sheet}>
            <MOH706Header facility={facility} startDate={filters.startDate} endDate={filters.endDate} />
            <div className={styles.reportSections}>
              <UrineAnalysis
                data={moh706Data}
                locationUuids={filters.locationUuids}
                startDate={filters.startDate}
                endDate={filters.endDate}
              />
              <BloodChemistry
                data={moh706Data}
                locationUuids={filters.locationUuids}
                startDate={filters.startDate}
                endDate={filters.endDate}
              />
              <Parasitology
                data={moh706Data}
                locationUuids={filters.locationUuids}
                startDate={filters.startDate}
                endDate={filters.endDate}
              />
              <Haematology
                data={moh706Data}
                locationUuids={filters.locationUuids}
                startDate={filters.startDate}
                endDate={filters.endDate}
              />
              <Bacteriology
                data={moh706Data}
                locationUuids={filters.locationUuids}
                startDate={filters.startDate}
                endDate={filters.endDate}
              />
              <HistologyAndCytology />
              <Serology
                data={moh706Data}
                locationUuids={filters.locationUuids}
                startDate={filters.startDate}
                endDate={filters.endDate}
              />
              <SpecimenReferralToHigherLevels />
              <DrugSusceptibilityTesting />
            </div>

            <div className={styles.signOff}>
              <span>
                Compiled by:<span className={styles.line}>{compiledBy}</span>
              </span>
              <span>
                Signature:
                <span className={styles.line} />
              </span>
              <span>
                Date:<span className={styles.shortLine}>{compiledOn}</span>
              </span>
            </div>
          </div>
        </ReportPage>
      )}
    </>
  );
};

export default MoH706Report;
