import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RegisterLayout, usePatientList } from '../../../common/report-register';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@carbon/react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useSession } from '@openmrs/esm-framework';

import styles from './moh-512.scss';
import { moh512ExportColumns } from './moh-512-columns';
import { getMoh512PatientList } from '../../../resources/moh-711.resource';
import { ReportFiltersComponent, type ReportPeriod } from '../../../common/report-filters';

interface Moh512RegisterComponentProps {}

const Moh512RegisterComponent: React.FC<Moh512RegisterComponentProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const session = useSession();

  const [generatedPeriod, setGeneratedPeriod] = useState<{ startDate: string; endDate: string } | null>(() => {
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    return startDate && endDate ? { startDate, endDate } : null;
  });

  const startDate = generatedPeriod?.startDate ?? searchParams.get('startDate');
  const endDate = generatedPeriod?.endDate ?? searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids') ?? session?.sessionLocation?.uuid ?? '';
  const indicator = searchParams.get('indicator');
  const isGenerated = Boolean(generatedPeriod);

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
      if (!generatedPeriod) {
        return Promise.resolve({ results: [], total: 0, isTotalExact: true });
      }

      return getMoh512PatientList({
        startDate,
        endDate,
        locationUuids,
        indicator,
        startIndex,
        limit,
      });
    },
    [startDate, endDate, locationUuids, indicator, generatedPeriod],
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

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'cr_id', label: 'Client Number' },
    { key: 'name_of_client', label: 'Name of Client' },
    { key: 'client_type', label: 'Client Type (1=New, 2=Revisit)' },
    { key: 'first_ever_use_of_contraceptive', label: '1st Ever User (Y/N)' },
    { key: 'age', label: 'Age (Years)' },
    { key: 'sex', label: 'Sex (M/F/I)' },
    { key: 'disability_status', label: 'Disability Status' },
    { key: 'phone_number', label: 'Telephone Number' },
    { key: 'village_estate_landmark', label: 'Village/Estate/Landmark' },
    { key: 'counselled_on_fp', label: 'Counselled on FP (Y/N)' },
    { key: 'type_of_visit_for_method_combined_oral_contraceptive', label: 'COC Visit Type' },
    { key: 'quantity_dispensed_combined_oral_contraceptive', label: 'COC Qty (Cycles)' },
    { key: 'type_of_visit_for_method_progestine', label: 'POP Visit Type' },
    { key: 'quantity_dispensed_progestine', label: 'POP Qty (Cycles)' },
    { key: 'quantity_dispensed_emergency_contraceptive_pills', label: 'Emergency Contraceptive Doses' },
    { key: 'type_of_visit_for_method_injectables', label: 'Injectables Visit Type' },
    { key: 'quantity_dispensed_dmpa_im', label: 'DMPA IM Qty (Vials)' },
    { key: 'quantity_dispensed_dmpa_sc', label: 'DMPA SC Qty (Vials)' },
    { key: 'type_of_visit_for_method_1_rod', label: 'Implant Visit Type' },
    { key: 'quantity_dispensed_1_rod', label: '1 Rod (Sets)' },
    { key: 'quantity_dispensed_2_rod', label: '2 Rods 3 Years (Sets)' },
    { key: 'quantity_dispensed_2_rod_5_years', label: '2 Rods 5 Years (Sets)' },
    { key: 'type_of_visit_for_method_iud', label: 'IUD Visit Type' },
    { key: 'quantity_dispensed_non_hormonal', label: 'Non-Hormonal IUD (Sets)' },
    { key: 'quantity_dispensed_hormonal', label: 'Hormonal IUD (Sets)' },
    { key: 'reason_for_larc_removal', label: 'Reason for LARC Removal' },
    { key: 'type_of_condom', label: 'Condom Client Sex' },
    { key: 'quantity_dispensed_male_condoms', label: 'Male Condoms' },
    { key: 'quantity_dispensed_female_condoms', label: 'Female Condoms' },
    { key: 'voluntary_surgical_contraception', label: 'VSC' },
    { key: 'counseled_on_natural_fp', label: 'Natural FP' },
    { key: 'given_cycle_beads', label: 'Cycle Beads Given' },
    { key: 'received_post_partum_fp', label: 'Timing of PPFP' },
    { key: 'tb_screening', label: 'TB Screening' },
    { key: 'counselled_on_hiv', label: 'Counselled for HIV' },
    { key: 'tested_for_hiv', label: 'Counselled and Tested for HIV' },
    { key: 'hiv_results', label: 'HIV Status' },
    { key: 'intimate_partner_violence', label: 'IPV/Reproductive Coercion' },
    { key: 'screened_for_cervical_cancer', label: 'Cervical Cancer Screened' },
    { key: 'cervical_cancer_screening_result', label: 'Cervical Cancer Result' },
    { key: 'referral_from', label: 'Referral From' },
    { key: 'referral_to', label: 'Referral To' },
    { key: 'reason_for_referral', label: 'Reason for Referral' },
    { key: 'comments', label: 'Remarks' },
  ];

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH 512 Register"
        mode="both"
        defaultTab="custom"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={Boolean(generatedPeriod)}
        generatedPeriod={generatedPeriod ?? undefined}
        backLink={{ label: 'All registers', to: '/?tab=registers' }}
      />
      <RegisterLayout
        parentLabel="All registers"
        parentPath="/?tab=registers"
        hideBreadcrumb
        title="MOH 512 Register"
        isLoading={isLoading}
        isEmpty={isGenerated && patientlist?.length === 0}
        page={page}
        pageSize={pageSize}
        total={total}
        isTotalExact={isTotalExact}
        onPageChange={onPageChange}
        fetchAll={isGenerated ? fetchAll : undefined}
        columns={moh512ExportColumns}
      >
        {isGenerated && (
          <div className={styles.tableContainer}>
            <Table className={classNames(styles.table, styles.tableBordered, styles.tableStriped)}>
              <TableHead>
                <TableRow>
                  {columns.slice(0, 11).map((column) => (
                    <th key={column.key} rowSpan={3} scope="col">
                      {column.label}
                    </th>
                  ))}
                  <th colSpan={19} scope="colgroup">
                    Contraceptives dispensed at this visit
                  </th>
                  {columns.slice(30, 35).map((column) => (
                    <th key={column.key} rowSpan={3} scope="col">
                      {column.label}
                    </th>
                  ))}
                  <th colSpan={3} scope="colgroup">
                    HIV Status
                  </th>
                  <th rowSpan={3} scope="col">
                    IPV / Reproductive Coercion
                  </th>
                  <th colSpan={2} scope="colgroup">
                    Cervical Cancer Screening
                  </th>
                  <th colSpan={3} scope="colgroup">
                    Referrals
                  </th>
                  <th rowSpan={3} scope="col">
                    Remarks
                  </th>
                </TableRow>
                <TableRow>
                  <th colSpan={4} scope="colgroup">
                    Oral Contraceptives (Cycles)
                  </th>
                  <th rowSpan={2} scope="col">
                    Emergency Contraceptive Pills (Doses)
                  </th>
                  <th colSpan={3} scope="colgroup">
                    Injectables — DMPA
                  </th>
                  <th colSpan={4} scope="colgroup">
                    Implants (Sets)
                  </th>
                  <th colSpan={3} scope="colgroup">
                    IUDs (Sets)
                  </th>
                  <th rowSpan={2} scope="col">
                    Reasons for LARC Removal
                  </th>
                  <th colSpan={3} scope="colgroup">
                    Condoms for FP
                  </th>
                  {columns.slice(35, 38).map((column) => (
                    <th key={column.key} rowSpan={2} scope="col">
                      {column.label}
                    </th>
                  ))}
                  {columns.slice(39, 41).map((column) => (
                    <th key={column.key} rowSpan={2} scope="col">
                      {column.label}
                    </th>
                  ))}
                  {columns.slice(41, 44).map((column) => (
                    <th key={column.key} rowSpan={2} scope="col">
                      {column.label}
                    </th>
                  ))}
                </TableRow>
                <TableRow>
                  {columns.slice(11, 15).map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                  {columns.slice(16, 26).map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                  {columns.slice(27, 30).map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                </TableRow>
                <TableRow>
                  {columns.map((column, index) => (
                    <th key={column.key} scope="col" title={column.label}>
                      {index < 26 ? String.fromCharCode(65 + index) : `A${String.fromCharCode(65 + index - 26)}`}
                    </th>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length}>Loading register...</TableCell>
                  </TableRow>
                ) : patientlist.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length}>No records found.</TableCell>
                  </TableRow>
                ) : (
                  patientlist.map((patient, index) => (
                    <TableRow key={patient.person_id || patient.id || index}>
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {column.key === 'date' && patient[column.key]
                            ? dayjs(patient[column.key]).format('YYYY-MM-DD')
                            : (patient[column.key] ?? '')}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </RegisterLayout>
    </>
  );
};

export default Moh512RegisterComponent;
