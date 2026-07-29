import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSession } from '@openmrs/esm-framework';

import Moh240Register from './sub-reports/moh-240-register.component';
import Moh240PageSummary from './sub-reports/page-summary.component';
import MOH240Header from './moh-240-header.component';
import { moh240Columns } from './moh-240.columns';
import { getMoh706PatientList } from '../../resources/moh-706.resource';
import { getMoh505PatientList } from '../../resources/moh-505.resource';
import { RegisterLayout, usePatientList } from '../../common/report-register';
import styles from './moh-240.scss';

/** The reports that drill down into this register */
const PARENTS: Record<string, { label: string; path: string }> = {
  'moh-505': { label: 'MOH-505 Report', path: '/moh-505' },
  'moh-706': { label: 'MOH-706 Report', path: '/moh-706' },
};

const Moh240Report: React.FC = () => {
  const [searchParams] = useSearchParams();
  const session = useSession();

  const locationUuids = searchParams.get('locationUuids') ?? '';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const indicators = searchParams.get('indicators') ?? '';
  const report = searchParams.get('report') || 'moh-706';

  const parent = PARENTS[report] ?? PARENTS['moh-706'];

  const {
    rows: patientList,
    total,
    isTotalExact,
    isLoading,
    page,
    pageSize,
    onPageChange,
    fetchAll,
  } = usePatientList(
    ({ startIndex, limit }) => {
      const params = { locationUuids, startDate, endDate, indicators, startIndex, limit };

      return report === 'moh-505' ? getMoh505PatientList(params) : getMoh706PatientList(params);
    },
    [locationUuids, startDate, endDate, indicators, report],
  );

  return (
    <RegisterLayout
      parentLabel={parent.label}
      parentPath={parent.path}
      title="Laboratory (LAB) Register MOH 240"
      isLoading={isLoading}
      isEmpty={patientList.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={moh240Columns(indicators)}
    >
      <div className={styles.sheet}>
        <MOH240Header facility={session?.sessionLocation?.display ?? ''} startDate={startDate} endDate={endDate} />
        <Moh240Register patientList={patientList} indicator={indicators} />
        <Moh240PageSummary />
      </div>
    </RegisterLayout>
  );
};

export default Moh240Report;
