import React from 'react';

import { usePageScale } from './use-page-scale';
import styles from './report-page.scss';

interface ReportPageProps {
  children: React.ReactNode;
}

/**
 * An A4 sheet that fills the width it is given.
 *
 * Reports that mirror a paper return are drawn at true A4 so they print 1:1,
 * but a fixed page wastes most of a wide monitor. The sheet is scaled up to
 * fill its container and floored at A4, below which the viewport scrolls
 * instead -- shrinking a dense return past its paper size makes it unreadable.
 */
const ReportPage: React.FC<ReportPageProps> = ({ children }) => {
  const { ref, scale } = usePageScale<HTMLDivElement>();

  return (
    <div className={styles.viewport} ref={ref}>
      {/* a custom property rather than an inline `zoom`, so the print
          stylesheet can still reset it to 1 */}
      <div className={styles.sheet} style={{ '--page-zoom': scale } as React.CSSProperties}>
        {children}
      </div>
    </div>
  );
};

export default ReportPage;
