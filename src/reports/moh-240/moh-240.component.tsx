import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSession } from '@openmrs/esm-framework';

import { LinelistTable, useAllRows } from '../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../common/report-register';
import { getMoh505PatientList } from '../../resources/moh-505.resource';
import { getMoh706PatientList } from '../../resources/moh-706.resource';
import { lineListShowColumns, moh240LineListColumns, moh240LineListLabColumns } from './line-list.columns';

/** The reports that drill down into this register */
const PARENTS: Record<string, { label: string; path: string }> = {
  'moh-505': { label: 'MOH-505 Report', path: '/moh-505' },
  'moh-706': { label: 'MOH-706 Report', path: '/moh-706' },
};

/**
 * The line list behind every clickable figure on the MOH 706 (and MOH 505)
 * report. The same register route and lab-706 patient-list endpoint the
 * printed register shares, rendered as a line list rather than the printed
 * sheet: the DHA minimum requirements' columns, with the register's own lab
 * detail columns kept behind the Columns menu and lab indicators opening
 * with the relevant ones shown.
 */
const Moh240Report: React.FC = () => {
  const [searchParams] = useSearchParams();
  const session = useSession();

  const locationUuids = searchParams.get('locationUuids') ?? '';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const indicators = searchParams.get('indicators') ?? '';
  const report = searchParams.get('report') || 'moh-706';
  const label = searchParams.get('label');

  const parent = PARENTS[report] ?? PARENTS['moh-706'];
  const locationName = useLocationName(locationUuids || null);
  const facility = locationName || session?.sessionLocation?.display || '';

  /* Sorting, filtering and the export have to see the whole list, so the
     fetcher reads every page (the moh-731 linelist pattern). */
  const { rows, isLoading } = useAllRows(
    ({ startIndex, limit }) => {
      /* The line list only means something behind a generated figure */
      if (!locationUuids || !startDate || !endDate) {
        return Promise.resolve({ results: [], total: 0, isTotalExact: true });
      }

      const params = { locationUuids, startDate, endDate, indicators, startIndex, limit };

      return report === 'moh-505' ? getMoh505PatientList(params) : getMoh706PatientList(params);
    },
    [locationUuids, startDate, endDate, indicators, report],
  );

  const showColumns = lineListShowColumns(indicators);
  const columns = useMemo(
    () =>
      moh240LineListColumns(facility).concat(
        moh240LineListLabColumns(indicators).map((column) =>
          showColumns.includes(column.header) ? { ...column, hidden: false } : column,
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [facility, indicators],
  );

  return (
    <RegisterLayout
      parentLabel={parent.label}
      parentPath={parent.path}
      title="Laboratory (LAB) Register MOH 240"
      heading={label ?? undefined}
      location={locationName}
      isLoading={isLoading}
      isEmpty={rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={columns}
        layoutKey={`moh-240:${report}:${indicators}${showColumns.length ? `:${showColumns.join(',')}` : ''}`}
        exportName={`laboratory-lab-register-moh-240 ${startDate} ${endDate}`}
      />
    </RegisterLayout>
  );
};

export default Moh240Report;
