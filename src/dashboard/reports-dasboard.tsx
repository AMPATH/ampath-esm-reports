import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClickableTile } from '@carbon/react';

import styles from './reports-dashboard.module.scss';
interface ReportsDashboardProps {}
const ReportsDashboard: React.FC<ReportsDashboardProps> = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <ClickableTile onClick={() => navigate('/moh-710')} className={styles.tile}>
          MOH-710 REPORT
        </ClickableTile>
        <ClickableTile onClick={() => navigate('/moh-711')} className={styles.tile}>
          MOH-711 REPORT
        </ClickableTile>
        <ClickableTile onClick={() => navigate('/moh-717')} className={styles.tile}>
          MOH-717 REPORT
        </ClickableTile>
        <ClickableTile onClick={() => navigate('/moh-706')} className={styles.tile}>
          MOH-706 REPORT
        </ClickableTile>
      </div>
    </>
  );
};

export default ReportsDashboard;
