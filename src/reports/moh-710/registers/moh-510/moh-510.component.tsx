import React, { useState } from 'react';

import styles from './moh-510.scss';
import { useSearchParams } from 'react-router-dom';
import { RegisterLayout, usePatientList } from '../../../../common/report-register';
import { getMoh510PatientList } from '../../../../resources/moh-710.resource';
import { moh510ExportColumns } from './moh-510.columns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useSession } from '@openmrs/esm-framework';
import { ReportFiltersComponent, type ReportPeriod } from '../../../../common/report-filters';

interface Moh510RegisterComponentProps {}

const Moh510RegisterComponent: React.FC<Moh510RegisterComponentProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const session = useSession();
  const from = searchParams.get('from');
  const isDrilldown = Boolean(from);
  const [generatedPeriod, setGeneratedPeriod] = useState<{ startDate: string; endDate: string } | null>(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    return !isDrilldown && startDate && endDate ? { startDate, endDate } : null;
  });
  const isGenerated = isDrilldown || Boolean(generatedPeriod);

  const startDate = generatedPeriod?.startDate ?? searchParams.get('startDate');
  const endDate = generatedPeriod?.endDate ?? searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids') ?? session?.sessionLocation?.uuid ?? '';
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
    ({ startIndex, limit }) => {
      if (!isDrilldown && !generatedPeriod) {
        return Promise.resolve({ results: [], total: 0, isTotalExact: true });
      }

      return getMoh510PatientList({
        startDate,
        endDate,
        locationUuids,
        indicator,
        startIndex,
        limit,
      });
    },
    [startDate, endDate, locationUuids, indicator, isDrilldown, generatedPeriod],
  );

  const generate = ({ startDate, endDate }: ReportPeriod) => {
    setGeneratedPeriod({ startDate, endDate });
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('startDate', startDate);
      nextParams.set('endDate', endDate);
      if (!nextParams.has('locationUuids') && locationUuids) {
        nextParams.set('locationUuids', locationUuids);
      }
      return nextParams;
    });
  };

  return (
    <>
      {!isDrilldown && (
        <ReportFiltersComponent
          reportName="MOH-510 Register"
          mode="range"
          onGenerate={generate}
          isLoading={isLoading}
          isReportGenerated={Boolean(generatedPeriod)}
          generatedPeriod={generatedPeriod ?? undefined}
          backLink={{ label: 'All registers', to: '/?tab=registers' }}
        />
      )}
      <RegisterLayout
        parentLabel={isDrilldown ? 'MOH-710 Report' : 'All registers'}
        parentPath={isDrilldown ? '/moh-710' : '/?tab=registers'}
        title="MOH-510 Register"
        isLoading={isLoading}
        isEmpty={isGenerated && patientlist.length === 0}
        page={page}
        pageSize={pageSize}
        total={total}
        isTotalExact={isTotalExact}
        onPageChange={onPageChange}
        fetchAll={isGenerated ? fetchAll : undefined}
        columns={moh510ExportColumns}
      >
        {isGenerated && (
          <div className={styles.tableContainer}>
            <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
              <TableHead>
                <TableRow>
                  <TableHeader>Date (DD/MM/YYYY)</TableHeader>
                  <TableHeader>Serial Number</TableHeader>
                  <TableHeader>Child's Number</TableHeader>
                  <TableHeader>Child's Names</TableHeader>
                  <TableHeader>Sex</TableHeader>
                  <TableHeader>Date of Birth</TableHeader>
                  <TableHeader>Date first Seen</TableHeader>
                  <TableHeader>Father's Full Names/Guardian</TableHeader>
                  <TableHeader>Mother's Full Names/Guardian</TableHeader>
                  <TableHeader>Village /Estate / Landmark</TableHeader>
                  <TableHeader>Telephone No.</TableHeader>
                  <TableHeader>BCG</TableHeader>
                  <TableHeader>Polio birth Dose</TableHeader>
                  <TableHeader>OPV 1</TableHeader>
                  <TableHeader>OPV 2</TableHeader>
                  <TableHeader>OPV 3</TableHeader>
                  <TableHeader>IPV</TableHeader>
                  <TableHeader>DPT / Hep.B / Hib.1</TableHeader>
                  <TableHeader>DPT / Hep.B / Hib.2</TableHeader>
                  <TableHeader>DPT / Hep.B / Hib.3</TableHeader>
                  <TableHeader>PCV 10 (Pneumococcal) 1</TableHeader>
                  <TableHeader>PCV 10 (Pneumococcal) 2</TableHeader>
                  <TableHeader>PCV 10 (Pneumococcal) 3</TableHeader>
                  <TableHeader>Rota1</TableHeader>
                  <TableHeader>Rota2</TableHeader>
                  <TableHeader>Vitamin A(6-11 months)</TableHeader>
                  <TableHeader>MR1</TableHeader>
                  <TableHeader>Yellow Fever</TableHeader>
                  <TableHeader>Fully Immunized Child</TableHeader>
                  <TableHeader>MR2</TableHeader>
                  <TableHeader>Remarks</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientlist?.length > 0 ? (
                  patientlist?.map((patient, i) => (
                    <TableRow key={patient.person_id || patient.id}>
                      <TableCell>
                        {patient.date ? dayjs(patient.encounter_datetime).format('YYYY-MM-DD') : ''}
                      </TableCell>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{patient.child_number}</TableCell>
                      <TableCell>{patient.child_names}</TableCell>
                      <TableCell>{patient.sex}</TableCell>
                      <TableCell>{patient.date_of_birth}</TableCell>
                      <TableCell>{patient.date_first_seen}</TableCell>
                      <TableCell>{patient.father_names}</TableCell>
                      <TableCell>{patient.mother_names}</TableCell>
                      <TableCell>{patient.village_estate_landmark}</TableCell>
                      <TableCell>{patient.phone_number}</TableCell>
                      <TableCell>{patient.bcg_encounter_datetime}</TableCell>
                      <TableCell>{patient.polio_birth_dose_encounter_datetime}</TableCell>
                      <TableCell>{patient.opv_1_encounter_datetime}</TableCell>
                      <TableCell>{patient.opv_2_encounter_datetime}</TableCell>
                      <TableCell>{patient.opv_3_encounter_datetime}</TableCell>
                      <TableCell>{patient.ipv_encounter_datetime}</TableCell>
                      <TableCell>{patient.dpt_hep_1_encounter_datetime}</TableCell>
                      <TableCell>{patient.dpt_hep_2_encounter_datetime}</TableCell>
                      <TableCell>{patient.dpt_hep_3_encounter_datetime}</TableCell>
                      <TableCell>{patient.pneumococcal_1_encounter_datetime}</TableCell>
                      <TableCell>{patient.pneumococcal_2_encounter_datetime}</TableCell>
                      <TableCell>{patient.pneumococcal_3_encounter_datetime}</TableCell>
                      <TableCell>{patient.rotavirus_1_encounter_datetime}</TableCell>
                      <TableCell>{patient.rotavirus_2_encounter_datetime}</TableCell>
                      <TableCell>{patient.vitamin_a_6_11_months_encounter_datetime}</TableCell>
                      <TableCell>{patient.measles_rubella_1_encounter_datetime}</TableCell>
                      <TableCell>{patient.yellow_fever_encounter_datetime}</TableCell>
                      <TableCell>{patient.fully_immunized_child_encounter_datetime}</TableCell>
                      <TableCell>{patient.measles_rubella_2_encounter_datetime}</TableCell>
                      <TableCell>{patient.remarks}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={28}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </RegisterLayout>
    </>
  );
};

export default Moh510RegisterComponent;
