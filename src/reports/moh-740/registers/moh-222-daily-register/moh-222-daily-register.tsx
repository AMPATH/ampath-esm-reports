import React, { useEffect, useState } from 'react';
import { type Moh222Patient } from '../../types';
import styles from '../../../../common/report-register/register-table.scss';
import classNames from 'classnames';
import { Link, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import { useSearchParams } from 'react-router-dom';
import ReportFiltersComponent from '../../../../common/report-filters/report-filters.component';
import { type ReportPeriod } from '../../../../common/report-filters/types';
import { useGeneratedLocation } from '../../../../common/report-placeholder/use-generated-location';
import { fetchMoh740Register } from '../../moh-740.resource';
import { useSession } from '@openmrs/esm-framework';
import { showReportError } from '../../../../common/report-error/show-report-error';
import dayjs from 'dayjs';
const Moh222DailyRegister = () => {
  const [rows, setRows] = useState<Moh222Patient[] | any>([]);
  const [searchParams ] = useSearchParams();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const locationUuids = searchParams.get('locationUuids') ??'';
  const indicator = searchParams.get('indicator') ?? '';
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
  const session = useSession();
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh222Location');
  const isGenerated = rows !== null && isForCurrentLocation;
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
        showReportError('The MOH 222 register', error);
      } finally {
        setIsLoading(false);
      }
  };
  return (
    <div className={styles.tableContainer}>
       <ReportFiltersComponent
        reportName="MOH 222 Daily Register"
        mode="both"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={isGenerated}
        generatedPeriod={period}
        defaultTab="monthly"
        backLink={{ label: 'All registers', to: '/?tab=registers' }}
      />
      <Table className={classNames(styles.table, styles.tableBordered, styles.tableStriped)}>
        <TableHead>
          <TableRow>
            <TableHeader>No</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Patient No</TableHeader>
            <TableHeader>Patient Name</TableHeader>
            <TableHeader>Age</TableHeader>
            <TableHeader>D.O.B</TableHeader>
            <TableHeader>Sex(M/F)</TableHeader>
            <TableHeader>Visit for the month</TableHeader>
            <TableHeader>Weight(Kg)</TableHeader>
            <TableHeader>Height(cm)</TableHeader>
            <TableHeader>BMI</TableHeader>
            <TableHeader>Waist Circumference</TableHeader>
            <TableHeader>BP(mmHg)</TableHeader>
            <TableHeader>HTN</TableHeader>
            <TableHeader>Diabetes</TableHeader>
            <TableHeader>Both Diabetes and Hypetention(HTN)</TableHeader>
            <TableHeader>RBS(mmol/L)</TableHeader>
            <TableHeader>FBS(mmol/L)</TableHeader>
            <TableHeader>HbA1C(%) within 3 months</TableHeader>
            <TableHeader>Complications/Co-morbidities at enrollment(2)</TableHeader>
            <TableHeader>Treatment</TableHeader>
            <TableHeader>Diabetic Foot Screening</TableHeader>
            <TableHeader>Diabetic Foot(New,Known,Nill)</TableHeader>
            <TableHeader>Foot Risk Assessment</TableHeader>
            <TableHeader>Footcare Outcome</TableHeader>
            <TableHeader>Screened for TB</TableHeader>
            <TableHeader>TB Status after Screening</TableHeader>
            <TableHeader>Active SHA(Y/N)</TableHeader>
            <TableHeader>TCA Date</TableHeader>
            <TableHeader>Remarks</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((p, index) => (
            <TableRow key={p.patient_uuid}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{p.encounter_date}</TableCell>
              <TableCell>{p.amrs_universal_id}</TableCell>
              <TableCell>
                <Link href={`${window.spaBase}/patient/${p.patient_uuid}/chart/`}>{p.person_name}</Link>
              </TableCell>
              <TableCell>{p.age}</TableCell>
              <TableCell>{p.birthdate}</TableCell>
              <TableCell>{p.gender}</TableCell>
              <TableCell>{p.visit_for_the_month}</TableCell>
              <TableCell>{p.weight}</TableCell>
              <TableCell>{p.height}</TableCell>
              <TableCell>{p.bmi}</TableCell>
              <TableCell>{p.waist_circumference}</TableCell>
              <TableCell>{p.bp}</TableCell>
              <TableCell>{p.htn}</TableCell>
              <TableCell>{p.diabetes}</TableCell>
              <TableCell>{p.both_htn_and_diabetic}</TableCell>
              <TableCell>{p.rbs}</TableCell>
              <TableCell>{p.fbs}</TableCell>
              <TableCell>{p.hba1c}</TableCell>
              <TableCell>{p.complications_at_enrollment}</TableCell>
              <TableCell>{p.treatment}</TableCell>
              <TableCell>{p.diabetic_foot_screening}</TableCell>
              <TableCell>{p.diabetic_foot}</TableCell>
              <TableCell>{p.foot_risk_assessment}</TableCell>
              <TableCell>{p.footcare_outcome}</TableCell>
              <TableCell>{p.screened_for_tb}</TableCell>
              <TableCell>{p.tbs_status}</TableCell>
              <TableCell>{p.covered_by_shif ? 'Y' : 'N'}</TableCell>
              <TableCell>{p.rtc_date}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Moh222DailyRegister;
