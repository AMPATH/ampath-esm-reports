import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import React, { useEffect, useState } from 'react';

import styles from '../../../common/report-register/register-table.scss';
import { Download } from '@carbon/react/icons';
import moh412Styles from './moh-412-register.component.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { moh412Columns } from './type';
import { fetchMoh745PatientList, getMoh412PatientList } from '../../../resources/moh-745.resource';
import { moh412ExportColumns } from './moh-412.columns';
import { columnsToCsv, downloadCsv, RegisterLayout, usePatientList } from '../../../common/report-register';
import ReportFiltersComponent from '../../../common/report-filters/report-filters.component';
import { showReportError } from '../../../common/report-error/show-report-error';
import { type ReportPeriod } from '../../../common/report-filters/types';
import { useSession } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { useGeneratedLocation } from '../../../common/report-placeholder/use-generated-location';

const Moh412Register: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const locationUuids = searchParams.get('locationUuids') ?? '';
  const indicators = searchParams.get('indicators') ?? '';
  const [patientList,setPatientList] = useState<any>([]);
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [period, setPeriod] = useState<{ startDate: string; endDate: string }>({ startDate: '', endDate: '' });
  const session = useSession();
  const { isForCurrentLocation, hasLocationChanged, markGenerated } = useGeneratedLocation('moh412Location');
  const isGenerated = rows !== null && isForCurrentLocation;
   const columns = moh412ExportColumns;

  useEffect(()=>{
     if(startDate && endDate && locationUuids && indicators){
         fetchPatientList();
     }
      
  },[startDate, endDate, locationUuids, indicators]);

  async function fetchPatientList(){
      const resp = await fetchMoh745PatientList({
        startDate,
        endDate,
        locationUuids,
        indicators,
      });

      if(resp){
          setRows(resp);
      }else{
         setRows([]);
      }
  }
    const generate = async ({ startDate, endDate }: ReportPeriod) => {
          setIsLoading(true);
          setPeriod({ startDate, endDate });
          let ind = '';
          let locationUuid = '';
          const selectedDate =  dayjs(startDate).endOf('month')
          const registerStartDate = selectedDate.format('YYYY-MM-DD');
          let reportIndicators;
          try {
            if(!indicators){
               reportIndicators = 'cumulative_all';
            }else{
               reportIndicators = ind;
            }
            if(!locationUuids){
              locationUuid = session.sessionLocation?.uuid ?? '';
            }else{
              locationUuid = locationUuids;
            }
            const resp  = await fetchMoh745PatientList({ startDate, endDate, locationUuids: locationUuid,indicators: reportIndicators,
      });
            if(resp){
                setRows(resp);
            }
            markGenerated(locationUuids);
          } catch (error) {
            showReportError('The MOH 412 register', error);
          } finally {
            setIsLoading(false);
          }
  }
   const exportCsv = async () => {
        setIsExporting(true);
    
        try {
          const slug = ['moh-412-register', period.startDate, period.endDate]
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
        reportName="MOH 412 Register"
        mode="both"
        onGenerate={generate}
        isLoading={isLoading}
        isReportGenerated={isGenerated}
        generatedPeriod={period}
        defaultTab="monthly"
        backLink={{ label: 'All registers', to: '/?tab=registers' }}
      />
      <div className={moh412Styles.exportRow}>
      <div className={styles.toolbar}>
            <Button kind="tertiary" size="sm" renderIcon={Download} onClick={exportCsv} disabled={isExporting}>
              {isExporting ? 'Preparing…' : 'Export CSV'}
            </Button>
      </div>
      </div>
        <div>
           <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
          <TableHead>
            <TableRow>
              <TableHeader colSpan={3}>Month:</TableHeader>
              <TableHeader colSpan={2}>Year</TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader colSpan={6}>CERVICAL CANCER</TableHeader>
              <TableHeader colSpan={3}>Breast Cancer</TableHeader>
              <TableHeader colSpan={2}>Colorectal Cancer</TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
            </TableRow>
            <TableRow>
              <TableHeader colSpan={9}>Client Details</TableHeader>
              <TableHeader colSpan={3}>Screening Methods and Results</TableHeader>
              <TableHeader colSpan={3}>Pre-Cancer Treatment</TableHeader>
              <TableHeader colSpan={3}>Methods and Results</TableHeader>
              <TableHeader colSpan={2}>Methods and Results</TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
              <TableHeader></TableHeader>
            </TableRow>
            <TableRow>
              <TableHeader>
                a)S/No
                <br />
                No
              </TableHeader>
              <TableHeader>
                b)Visit <br />
                Date
              </TableHeader>
              <TableHeader>
                c)Visit <br />
                Type
              </TableHeader>
              <TableHeader>
                d)Client <br />
                No
              </TableHeader>
              <TableHeader>e)Client Names</TableHeader>
              <TableHeader>
                f)Client's Phone <br />
                Number
              </TableHeader>
              <TableHeader>
                g)Client's <br /> Age
              </TableHeader>
              <TableHeader>
                h)Location
                <br />
                Residence
              </TableHeader>
              <TableHeader>
                i)Treatment
                <br />
                Suppoter's Phone
                <br />
                Number
              </TableHeader>
              <TableHeader>
                j)Via or <br />
                VIA/VILLI
              </TableHeader>
              <TableHeader>
                k)Pap <br />
                Smear
              </TableHeader>
              <TableHeader>
                l)HPV Test
                <br />
                (over 30 years)
              </TableHeader>
              <TableHeader>m)cryotherapy</TableHeader>
              <TableHeader>
                n)Thermo-
                <br />
                ablation
              </TableHeader>
              <TableHeader>o)LEEP</TableHeader>
              <TableHeader>p)CBE</TableHeader>
              <TableHeader>q)Ultrasound</TableHeader>
              <TableHeader>r)Mammogram</TableHeader>
              <TableHeader>s)Colonoscopy</TableHeader>
              <TableHeader>t)FOBT</TableHeader>
              <TableHeader>u)HIV Status</TableHeader>
              <TableHeader>
                v)Referral <br />
                To/From
              </TableHeader>
              <TableHeader>
                w)Follow-
                <br />
                up Date
              </TableHeader>
              <TableHeader>
                Remarks(e.g Colposcopy done,
                <br />
                Cervicography results, Call
                <br />
                Client for follow up, Return for <br />
                post-treatment screening, <br />
                Communicate with the referral site)
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.map((p: any,index: number)=>{
                  return <><TableRow>
                         <TableCell>{index + 1}</TableCell>
                         <TableCell>{p.screening_date ?? ''}</TableCell>
                         <TableCell>{p?.screening_visit_type ?? ''}</TableCell>
                         <TableCell>{p?.ccc_number ?? ''}</TableCell>
                         <TableCell>{p.person_name}</TableCell>
                         <TableCell>{p?.phone_number ?? ''}</TableCell>
                         <TableCell>{p?.age ?? ''}</TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                         <TableCell>{p?.via_or_via_vili_test_result ?? ''}</TableCell>
                         <TableCell>{p?.pap_smear_test_result ?? ''}</TableCell>
                         <TableCell>{p?.hpv_test_result ?? ''}</TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                         <TableCell>{p?.hiv_status ?? ''}</TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                         <TableCell></TableCell>
                 </TableRow></>
              })
            }
              
          </TableBody>
        </Table>
        </div>
      </div>
  );
};
export default Moh412Register;
