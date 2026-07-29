import React from 'react';
import { DataTableSkeleton, SkeletonText } from '@carbon/react';

import styles from './report-skeleton.scss';

interface ReportSkeletonProps {
  /** How many indicator blocks to outline. Roughly the sections a form has. */
  blocks?: number;
}

/**
 * Placeholder in the shape of a generated report.
 *
 * Reports replaced their whole body while fetching, so a centred spinner left
 * the page blank and shifted everything when the data landed. Outlining the
 * masthead and the indicator tables keeps the layout stable and shows how much
 * is coming.
 */
export const ReportSkeleton: React.FC<ReportSkeletonProps> = ({ blocks = 2 }) => (
  <div className={styles.skeleton} aria-busy="true" aria-label="Loading report">
    <div className={styles.header}>
      <SkeletonText heading width="45%" />
      <SkeletonText width="70%" />
    </div>

    {Array.from({ length: blocks }, (_, index) => (
      <div key={index} className={styles.block}>
        <SkeletonText heading width="30%" />
        <DataTableSkeleton showHeader={false} showToolbar={false} columnCount={4} rowCount={5} size="sm" />
      </div>
    ))}
  </div>
);

/**
 * Placeholder for the register and patient-list pages, which are a single
 * table rather than a form.
 */
export const RegisterSkeleton: React.FC<{ columnCount?: number; rowCount?: number }> = ({
  columnCount = 6,
  rowCount = 8,
}) => (
  <div className={styles.skeleton} aria-busy="true" aria-label="Loading register">
    <DataTableSkeleton showHeader={false} showToolbar={false} columnCount={columnCount} rowCount={rowCount} size="sm" />
  </div>
);
