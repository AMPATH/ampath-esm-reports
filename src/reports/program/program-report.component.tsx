import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Layer } from '@carbon/react';
import { Template } from '@carbon/react/icons';
import { useSession } from '@openmrs/esm-framework';

import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { ReportPlaceholder, useGeneratedLocation } from '../../common/report-placeholder';
import { useFacilityName } from '../../common/report-header';
import { type ReportDefinition } from '../../dashboard/report-catalog';
import styles from './program-report.scss';

interface ProgramReportProps {
  report: ReportDefinition;
  /** Back to the report's group on the landing page */
  backLink: { label: string; to: string };
}

/**
 * The page every program and action summary report opens on (Reports tab),
 * set up as the MOH reports are: the filter bar, generation for the session
 * location's facility, and the space below where the report's template goes.
 *
 * Until a report's own template is built, generating shows that space marked
 * as such, headed with the report, facility and period it will show. To build
 * one, give the report its own component (as the MOH reports have) and point
 * its route in root.component.tsx at it.
 */
const ProgramReport: React.FC<ProgramReportProps> = ({ report, backLink }) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid ?? '';
  /* program reports cover the session location's whole facility, as the MOH ones do */
  const facility = useFacilityName(locationUuids, session?.sessionLocation?.display ?? '');
  const storageKey = `programReportLocation:${report.path}`;
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation(storageKey);
  const isReportGenerated = isGenerated && isForCurrentLocation;
  /* e.g. "New on ART (TX_NEW)"; just "PrEP" where the code is the name */
  const reportName = report.code === report.name ? report.name : `${report.name} (${report.code})`;

  /* nothing to fetch yet: generating sets the period the template will show */
  const generate = async ({ startDate, endDate }: ReportPeriod) => {
    setPeriod({ startDate, endDate });
    setIsGenerated(true);
    markGenerated(locationUuids);
  };

  useRestorePeriod(generate);

  const periodLabel = period.startDate
    ? `${dayjs(period.startDate).format('DD-MMM-YYYY')} to ${dayjs(period.endDate).format('DD-MMM-YYYY')}`
    : '';

  return (
    <>
      <ReportFiltersComponent
        reportName={reportName}
        mode="monthly"
        onGenerate={generate}
        isLoading={false}
        isReportGenerated={isReportGenerated}
        generatedPeriod={period}
        backLink={backLink}
      />
      {!isReportGenerated && (
        <ReportPlaceholder reportName={reportName} isLocationChanged={isGenerated && hasLocationChanged} />
      )}
      {isReportGenerated && (
        <Layer className={styles.frame}>
          <header className={styles.header}>
            <p className={styles.code}>{report.code}</p>
            <h4 className={styles.title}>{report.name}</h4>
            <p className={styles.meta}>
              <span>
                Facility: <strong>{facility}</strong>
              </span>
              <span>
                Period: <strong>{periodLabel}</strong>
              </span>
            </p>
          </header>
          {/* where the report's template goes once it is built */}
          <div className={styles.templateArea}>
            <Template size={32} className={styles.templateIcon} />
            <h5>Template in development</h5>
            <p>{report.description}</p>
            <p>The {report.name} template will be built here, filled in with the facility&rsquo;s figures.</p>
          </div>
        </Layer>
      )}
    </>
  );
};

export default ProgramReport;
