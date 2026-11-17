import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { type LinelistColumn, LinelistTable, useAllRows } from '../../../common/linelist-table';
import { RegisterLayout, useLocationName } from '../../../common/report-register';
import { fetchMoh740Register } from '../moh-740.resource';
import dayjs from 'dayjs';
import { showSnackbar, useSession } from '@openmrs/esm-framework';
import { type Moh222Patient } from '../types';

const MOH_740_LINELIST_COLUMNS: LinelistColumn[] = [
  { header: 'Patient ID', field: 'person_id' },
  { header: 'AMRS Universal ID', field: 'amrs_universal_id' },
  { header: 'CCC NO', field: 'ccc_no' },
  { header: 'Patient Name', field: 'person_name' },
  { header: 'Age', field: 'age' },
  { header: 'Gender', field: 'gender' },
  { header: 'HIV Status', field: 'hiv_status' },
  { header: 'Location Name', field: 'location' },
  { header: 'Initiation Date', field: 'enrollment_date' },
  { header: 'Encounter Date', field: 'encounter_date' },
  { header: 'RTC Date', field: 'rtc_date' },
  { header: 'Disease Type', field: 'disease_type' },
  { header: 'Date of Diagnosis', field: 'diagnosis_date' },
  { header: 'Systolic', field: 'systolic' },
  { header: 'Diastolic', field: 'diastolic' },
  { header: 'RBS', field: 'rbs' },
  { header: 'FBS', field: 'fbs' },
  { header: 'HbA1C', field:'hba1c' },
  { header: 'HTN Meds', field:'htn_meds' },
  { header: 'Diabetes Meds', field:'diabetes_meds' }
];

const Moh740Linelist: React.FC = () => {
  const [rows, setRows] = useState<Moh222Patient[] | any>([]);
  const [searchParams] = useSearchParams();
  const session = useSession();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const locationUuids = searchParams.get('locationUuids') ?? '';
  const indicator = searchParams.get('indicator') ?? '';
  const from = searchParams.get('from') || undefined;
  const locationName = useLocationName(locationUuids);
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
 useEffect(()=>{
       if(startDate && endDate && locationUuids){
              fetchPatientList();
       }
 },[startDate,endDate,locationUuids,indicator]);

  async function fetchPatientList(){
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
           console.log({resp});
           if(resp){
               setRows(resp);
           }
        }catch(error){
              showSnackbar({
                kind: 'error',
                title: 'Error generating line list',
                subtitle: 'Error generating line list, kindly try again or contact support'
              });
        }finally{
             setIsLoading(false);
        }
    
  }


  return (
    <RegisterLayout
      parentLabel="MOH-740 Report"
      parentPath="/moh-740"
      title="MOH-740 Linelist"
      location={locationName}
      isLoading={isLoading}
      isEmpty={!isLoading && rows.length === 0}
    >
      <LinelistTable
        rows={rows}
        columns={MOH_740_LINELIST_COLUMNS}
        layoutKey={`moh-740:${indicator}`}
        exportName={`MOH-740 ${indicator || 'linelist'} ${startDate} ${endDate}`}
      />
    </RegisterLayout>
  );
};

export default Moh740Linelist;