import React, { useState } from 'react';
import { Select, SelectItem } from '@carbon/react';
import { useSearchParams } from 'react-router-dom';
import { useSession } from '@openmrs/esm-framework';
import classNames from 'classnames';

import styles from '../../../common/report-register/register-table.scss';
import { RegisterLayout, usePatientList } from '../../../common/report-register';
import { ReportFiltersComponent, type ReportPeriod } from '../../../common/report-filters';
import { getMoh209PatientList } from '../../../resources/moh-717.resource';
import { moh209ExportColumns, moh209SubHeaders } from './moh-209.columns';

const examinationOptions = [
  { value: 'plain_xray_without_enhancement', text: 'Plain X-rays without contrast enhancement' },
  { value: 'contrast_enhancement_examination', text: 'Contrast enhanced examination' },
  { value: 'magnetic_resonance_imaging', text: 'Magnetic resonance imaging' },
  { value: 'computerized_tomography', text: 'Computerized tomography' },
  { value: 'mammography', text: 'Mammography' },
  { value: 'chest_xray_for_ptb', text: 'Chest X-ray for PTB' },
  { value: 'general_ultrasound', text: 'General ultrasound' },
  { value: 'obstetric_ultrasound', text: 'Obstetric ultrasound' },
];

const Moh209RegisterComponent: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const session = useSession();
  const from = searchParams.get('from');
  const isDrilldown = Boolean(from);
  const [selectedIndicator, setSelectedIndicator] = useState(() => searchParams.get('indicator') ?? '');
  const [generatedIndicator, setGeneratedIndicator] = useState(() => searchParams.get('indicator') ?? '');
  const [generatedPeriod, setGeneratedPeriod] = useState<{ startDate: string; endDate: string } | null>(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    return !isDrilldown && startDate && endDate ? { startDate, endDate } : null;
  });
  const isGenerated = isDrilldown || Boolean(generatedPeriod);

  const startDate = generatedPeriod?.startDate ?? searchParams.get('startDate');
  const endDate = generatedPeriod?.endDate ?? searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids') ?? session?.sessionLocation?.uuid ?? '';
  const indicator = generatedIndicator;

  const generate = ({ startDate, endDate }: ReportPeriod) => {
    setGeneratedPeriod({ startDate, endDate });
    setGeneratedIndicator(selectedIndicator);
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('startDate', startDate);
      nextParams.set('endDate', endDate);
      if (selectedIndicator) {
        nextParams.set('indicator', selectedIndicator);
      } else {
        nextParams.delete('indicator');
      }
      if (!nextParams.has('locationUuids') && locationUuids) {
        nextParams.set('locationUuids', locationUuids);
      }
      return nextParams;
    });
  };

  const { rows, total, isTotalExact, isLoading, page, pageSize, onPageChange, fetchAll } = usePatientList(
    ({ startIndex, limit }) => {
      if ((!isDrilldown && !generatedPeriod) || !startDate || !endDate || !locationUuids || (isDrilldown && !indicator)) {
        return Promise.resolve({ results: [], total: 0, isTotalExact: true });
      }

      return getMoh209PatientList({
        startDate,
        endDate,
        locationUuids,
        indicator,
        startIndex,
        limit,
        from,
      });
    },
    [startDate, endDate, locationUuids, indicator, from, isDrilldown, generatedPeriod],
  );

  return (
    <>
      {!isDrilldown && (
        <ReportFiltersComponent
          reportName="MOH 209 Radiology Register"
          mode="range"
          onGenerate={generate}
          isLoading={isLoading}
          isReportGenerated={Boolean(generatedPeriod)}
          generatedPeriod={generatedPeriod ?? undefined}
          backLink={{ label: 'All registers', to: '/?tab=registers' }}
          additionalFilters={
            <Select
              id="moh-209-examination-type"
              labelText="Type of examination"
              size="sm"
              value={selectedIndicator}
              onChange={(event) => setSelectedIndicator(event.target.value)}
            >
              <SelectItem value="" text="All Indicators" />
              {examinationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} text={option.text} />
              ))}
            </Select>
          }
        />
      )}

      <RegisterLayout
        parentLabel={isDrilldown ? 'MOH-717 Report' : 'All registers'}
        parentPath={isDrilldown ? '/moh-717' : '/?tab=registers'}
        title="MOH 209 Radiology Register"
        heading="MOH 209 Radiology Register"
        isLoading={isLoading}
        isEmpty={isGenerated && rows.length === 0}
        page={page}
        pageSize={pageSize}
        total={total}
        isTotalExact={isTotalExact}
        onPageChange={onPageChange}
        fetchAll={isGenerated ? fetchAll : undefined}
        columns={moh209ExportColumns}
        subHeaders={moh209SubHeaders}
      >
        <div className={styles.tableContainer}>
          <table className={classNames(styles.table, styles.tableBordered, styles.tableStriped)}>
            <thead>
              <tr>
                {moh209ExportColumns.map((column) => (
                  <th key={column.header} scope="col">
                    {column.header}
                  </th>
                ))}
              </tr>
              <tr>
                {moh209SubHeaders.map((header) => (
                  <th key={header} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={row.encounter_id ?? `${row.person_id ?? 'patient'}-${rowIndex}`}>
                  {moh209ExportColumns.map((column) => (
                    <td key={column.header}>{String(column.value(row, rowIndex) ?? '')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RegisterLayout>
    </>
  );
};

export default Moh209RegisterComponent;
