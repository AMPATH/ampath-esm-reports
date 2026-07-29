import React from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from '../../../common/report-register/register-table.scss';
import { getMoh510PatientList } from '../../../resources/moh-711.resource';
import { RegisterLayout, usePatientList } from '../../../common/report-register';

const Moh510Register: React.FC = () => {
  const [searchParams] = useSearchParams();

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator');

  const {
    rows: patientlist,
    total,
    isTotalExact,
    isLoading,
    page,
    pageSize,
    onPageChange,
    fetchAll,
  } = usePatientList(
    ({ startIndex, limit }) =>
      getMoh510PatientList({
        startDate,
        endDate,
        locationUuids,
        indicator,
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicator],
  );

  return (
    <RegisterLayout
      parentLabel="MOH-711 Report"
      parentPath="/moh-711"
      title="MOH 510 Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
    ></RegisterLayout>
  );
};

export default Moh510Register;
