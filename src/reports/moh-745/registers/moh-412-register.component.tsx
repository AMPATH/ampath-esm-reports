import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import React, { useEffect, useState } from 'react';

import styles from '../../../common/report-register/register-table.scss';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { moh412Columns } from './type';
import { fetchMoh745PatientList, getMoh412PatientList } from '../../../resources/moh-745.resource';
import { moh412ExportColumns } from './moh-412.columns';
import { RegisterLayout, usePatientList } from '../../../common/report-register';

const Moh412Register: React.FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const locationUuids = searchParams.get('locationUuids') ?? '';
  const indicators = searchParams.get('indicators') ?? '';
  const [patientList,setPatientList] = useState<any>([]);

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
          setPatientList(resp);
      }else{
         setPatientList([]);
      }
  }

  return (
  
      <div className={styles.tableContainer}>
        <div>
           <h4>MOH-412 Register</h4>
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
              patientList.map((p: any,index: number)=>{
                  return <><TableRow>
                         <TableCell>{index + 1}</TableCell>
                         <TableCell>{p.screening_date ?? ''}</TableCell>
                         <TableCell>{p?.screening_visit_type ?? ''}</TableCell>
                         <TableCell>{p?.ccc_number ?? ''}</TableCell>
                         <TableCell>{p.person_name}</TableCell>
                         <TableCell></TableCell>
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
