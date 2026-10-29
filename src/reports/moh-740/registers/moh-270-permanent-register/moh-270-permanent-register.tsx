import { Button, Link, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import { type Moh270Patient } from '../../types';
import styles from '../../../../common/report-register/register-table.scss';
import moh270Styles from './moh-270-permanent-register.scss';
import { Download } from '@carbon/react/icons';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useSession } from '@openmrs/esm-framework';
import { useGeneratedLocation } from '../../../../common/report-placeholder/use-generated-location';
import { type ReportPeriod } from '../../../../common/report-filters/types';
import dayjs from 'dayjs';
import { fetchMoh740Register } from '../../moh-740.resource';
import { showReportError } from '../../../../common/report-error/show-report-error';
import ReportFiltersComponent from '../../../../common/report-filters/report-filters.component';
import { columnsToCsv, downloadCsv } from '../../../../common/report-register/rows-to-csv';
import { MOH_270_COLUMNS } from '../moh-740.columns';
const Moh270DailyRegister = () => {
    const [rows, setRows] = useState<Moh270Patient[] | any>([]);
    const [isExporting, setIsExporting] = useState(false);
    const [searchParams ] = useSearchParams();
    const startDate = searchParams.get('startDate') ?? '';
    const endDate = searchParams.get('endDate') ?? '';
    const locationUuids = searchParams.get('locationUuids') ??'';
    const indicator = searchParams.get('indicator') ?? '';
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
    const session = useSession();
    const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh270Location');
    const isGenerated = rows !== null && isForCurrentLocation;
    const columns = MOH_270_COLUMNS;
    useEffect(()=>{
       if(startDate && endDate && locationUuids){
              generate({startDate: startDate,endDate: endDate, label: ''})
       }
    },[startDate,endDate,locationUuids,indicator]);
    const generate = async ({ startDate, endDate }: ReportPeriod) => {
        setIsLoading(true);
        setPeriod({ startDate, endDate });
        let indicators = '';
        let locationUuid = '';
        const selectedDate =  dayjs(startDate).endOf('month')
        const registerStartDate = selectedDate.format('YYYY-MM-DD');
        try {
          if(!indicator){
             indicators = 'cumulative_all';
          }else{
             indicators = indicator;
          }
          if(!locationUuids){
            locationUuid = session.sessionLocation?.uuid ?? '';
          }else{
            locationUuid = locationUuids;
          }
          const resp  = await fetchMoh740Register({ locationUuid: locationUuid, endDate: registerStartDate,indicators: indicators});
          if(resp){
              setRows(resp);
          }
          markGenerated(locationUuids);
        } catch (error) {
          showReportError('The MOH 270 register', error);
        } finally {
          setIsLoading(false);
        }
    }
    const exportCsv = async () => {
          setIsExporting(true);
      
          try {
            const slug = ['moh-270-permanent-register', period.startDate, period.endDate]
              .filter(Boolean)
              .join('-')
              .toLowerCase();
            downloadCsv(columnsToCsv(rows, columns, { subHeaderRow: [] }), `${slug}.csv`);
          } catch (error) {
            showReportError('the register export', error);
          } finally {
            setIsExporting(false);
          }
    };
  return (
    <div className={styles.tableContainer}>
       <ReportFiltersComponent
        reportName="MOH 270 Permanent Register"
        mode="both"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={isGenerated}
        generatedPeriod={period}
        defaultTab="monthly"
        backLink={{ label: 'All registers', to: '/?tab=registers' }}
      />
      <div className={moh270Styles.exportRow}>
      <div className={styles.toolbar}>
            <Button kind="tertiary" size="sm" renderIcon={Download} onClick={exportCsv} disabled={isExporting}>
              {isExporting ? 'Preparing…' : 'Export CSV'}
            </Button>
      </div>
      </div>
      <Table className={classNames(styles.table, styles.tableBordered, styles.tableStriped)}>
        <TableHead>
          <TableRow>
            <TableHeader>No</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Encounter Date</TableHeader>
            <TableHeader>RTC Date</TableHeader>
            <TableHeader>Patient No</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>D.O.B</TableHeader>
            <TableHeader>Sex(M/F)</TableHeader>
            <TableHeader>Telephone No</TableHeader>
            <TableHeader>Sub County</TableHeader>
            <TableHeader>Village/Estate</TableHeader>
            <TableHeader>Landmark</TableHeader>
            <TableHeader>Treatment supporter</TableHeader>
            <TableHeader>Diagnosis at enrolment</TableHeader>
            <TableHeader>Year of diagnosis</TableHeader>
            <TableHeader>Complications/Co-morbidities at enrollment(2)</TableHeader>
            <TableHeader>SHA(Y/N)</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((p, index) => (
            <TableRow key={p.patient_uuid}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{p?.enrollment_date ?? ''}</TableCell>
              <TableCell>{p?.encounter_date ?? ''}</TableCell>
              <TableCell>{p?.rtc_date ?? ''}</TableCell>
              <TableCell>{p.amrs_universal_id}</TableCell>
              <TableCell>
                <Link href={`${window.spaBase}/patient/${p.patient_uuid}/chart/`}>{p.person_name}</Link>
              </TableCell>
              <TableCell>{p.birthdate}</TableCell>
              <TableCell>{p.gender}</TableCell>
              <TableCell>{p.phone_number}</TableCell>
              <TableCell>{p.sub_county}</TableCell>
              <TableCell>{p.ward}</TableCell>
              <TableCell>{p.landmark}</TableCell>
              <TableCell>{p.contact_of_the_treatment_supporter_and_relationship ?? ''}</TableCell>
              <TableCell>{p.diagnosis_at_enrollment ?? ''}</TableCell>
              <TableCell>{p.year_of_diagnosis ?? ''}</TableCell>
              <TableCell>{p.complications_at_enrollment ?? ''}</TableCell>
              <TableCell>{p.covered_by_shif ? 'Y' : 'N'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Moh270DailyRegister;
