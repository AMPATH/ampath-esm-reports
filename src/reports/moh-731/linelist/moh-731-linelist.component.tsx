import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LinelistTable, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { MOH_731_INDICATORS } from './moh-731-indicators';
import { MOH_731_LINELIST_SECTIONS } from './moh-731-linelist-sections';

const GENDERS: Record<string, string> = { M: 'Male', F: 'Female' };

/**
 * The linelist behind one figure on the MOH 731 sheet, or behind a total of
 * several figures on the Summary tab.
 *
 * The link carries the figure's code (or, for a total, its figures' codes with
 * a label) and the report period; each code is looked up in `MOH_731_INDICATORS`
 * for what to list, and the section it belongs to decides where the rows come
 * from and which columns they are shown in. A total lists its figures' rows one
 * after another -- its figures never overlap, so each client appears once.
 */
const Moh731Linelist: React.FC = () => {
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code') ?? '';
  const totalCodes = (searchParams.get('codes') ?? '').split(',').filter(Boolean);
  const totalLabel = searchParams.get('label') ?? '';
  const totalBlock = searchParams.get('block') ?? '';
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');

  const locationName = useLocationName(locationUuids);

  const isTotal = totalCodes.length > 0;
  const parts = (isTotal ? totalCodes : [code]).map((partCode) => MOH_731_INDICATORS[partCode]);
  /* every figure of a total comes from the same section, so it is listed in one table */
  const figure = parts.every((part) => part && part.section === parts[0].section) ? parts[0] : undefined;
  const section = figure ? MOH_731_LINELIST_SECTIONS[figure.section] : undefined;

  const { rows, isLoading } = useAllRows(
    section
      ? parts.map(
          (part) =>
            ({ startIndex, limit }) =>
              section.fetchPatientList({
                locationUuids,
                startDate,
                endDate,
                indicator: part.indicator,
                gender: part.gender ?? '',
                startIndex,
                limit,
              }),
        )
      : () => Promise.resolve({ results: [], total: 0, isTotalExact: true }),
    [code, totalCodes.join(','), startDate, endDate, locationUuids],
  );

  /* A figure can start some of its section's hidden columns visible. It keeps
     its own saved layout, so a layout saved on the section's other figures
     does not hide them again. */
  const showColumns = figure?.showColumns;
  const columns = useMemo(
    () =>
      (section?.columns ?? []).map((column) =>
        showColumns?.includes(column.header) ? { ...column, hidden: false } : column,
      ),
    [section, showColumns],
  );
  const layoutKey = `moh-731:${figure?.section}${showColumns ? `:${showColumns.join(',')}` : ''}`;

  const sex = figure?.gender ? ` (${GENDERS[figure.gender]})` : '';
  const heading = !figure
    ? `Unknown MOH 731 figure ${isTotal ? totalCodes.join(', ') : code}`
    : isTotal
      ? `${totalLabel} linelist`
      : `${figure.label}${sex} ${code} linelist`;
  const block = isTotal ? totalBlock : figure?.block;

  return (
    <RegisterLayout
      parentLabel="MOH-731 Report"
      parentPath="/moh-731"
      title={figure ? `${section.title} · ${block}` : 'MOH 731 Linelist'}
      heading={heading}
      location={locationName}
      isLoading={isLoading}
      isEmpty={rows.length === 0}
    >
      {section && (
        <LinelistTable
          rows={rows}
          columns={columns}
          layoutKey={layoutKey}
          exportName={`${heading} ${startDate ?? ''} ${endDate ?? ''}`}
        />
      )}
    </RegisterLayout>
  );
};

export default Moh731Linelist;
