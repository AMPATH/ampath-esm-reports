import React from 'react';
import { Layer } from '@carbon/react';
import { Report } from '@carbon/react/icons';

import styles from './report-placeholder.scss';

interface ReportPlaceholderProps {
  /** Named so the guidance says which return is about to be produced */
  reportName?: string;
  /** Shown when a report was generated but came back with nothing in it */
  isEmptyResult?: boolean;
}

/**
 * Stands in for the report template until a report has actually been generated,
 * and explains how to produce one.
 *
 * Report templates are large pre-printed MOH forms; rendering one with every
 * value blank reads as "the facility reported zeroes" rather than "you have not
 * run this yet", so the template is held back until there is data to put in it.
 * That leaves the page empty, hence the guidance here.
 */
const ReportPlaceholder: React.FC<ReportPlaceholderProps> = ({ reportName, isEmptyResult = false }) => (
  <Layer className={styles.placeholder}>
    <Report size={32} className={styles.icon} />

    {isEmptyResult ? (
      <>
        <h5>No records for this period</h5>
        <p>
          {reportName ?? 'The report'} ran successfully but returned no data for the period you selected. Try a
          different reporting period, or confirm that data has been entered for this facility.
        </p>
      </>
    ) : (
      <>
        <h5>No report generated yet</h5>
        <p>
          {reportName ? `The ${reportName} form` : 'The report'} will appear here, filled in with your facility&rsquo;s
          figures, once you generate it.
        </p>
        <ol className={styles.steps}>
          <li>Choose the reporting period in the filters above.</li>
          <li>
            Select <strong>Generate report</strong>.
          </li>
          <li>
            Use <strong>Download PDF</strong> to save or print the completed form.
          </li>
        </ol>
      </>
    )}
  </Layer>
);

export default ReportPlaceholder;
