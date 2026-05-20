import { Button, Loading, Table, TableBody, TableHead, TableHeader, TableRow } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import styles from '../moh711.scss';
import { getMoh511PatientList } from '../../../resources/moh-711.resource';
import { moh511Columns } from './type';
import classNames from 'classnames';

const Moh511Register: React.FC = () => {
  const navigate = useNavigate();
  const [patientlist, setPatientList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const location = useLocation();

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator');
  const reportName = location.state?.reportName || '';

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate || !locationUuids || !indicator || !reportName) return;

      setIsLoading(true);

      try {
        const params = {
          startDate,
          endDate,
          locationUuids,
          indicator,
          reportName,
        };

        const data = await getMoh511PatientList(params);

        setPatientList(data?.results.results || []);
      } catch (error) {
        console.error('Failed to fetch register data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, locationUuids, indicator, reportName]);

  function navigateBack() {
    navigate(location.state?.from || '/moh-711');
  }
  return (
    <>
      <div className={styles.buttonContainer}>
        <Button onClick={navigateBack}>Back</Button>
      </div>
      <div>{isLoading && <Loading />}</div>
      <Table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <TableHead>
          <TableRow>
            <TableHeader>Serial No.</TableHeader>
            <TableHeader>
              Date.
              <br />
              (DD:MM:YYYY)
            </TableHeader>
            <TableHeader>
              CWC No.
              <br />
              (New Visit)
            </TableHeader>
            <TableHeader>
              CWC No.
              <br />
              (Revisit)
            </TableHeader>
            <TableHeader>
              BIRTH NOTIFICATION
              <br /> (NUMBER)
            </TableHeader>
            <TableHeader>Full Names (Three names)</TableHeader>
            <TableHeader>Age</TableHeader>
            <TableHeader>Sex</TableHeader>
            <TableHeader>
              County/Sub-
              <br />
              county
            </TableHeader>
            <TableHeader>
              Village /Estate / <br />
              Landmark
            </TableHeader>
            <TableHeader>
              Telephone
              <br />
              number
            </TableHeader>
            <TableHeader>Weight in Kgs</TableHeader>
            <TableHeader>
              Weight
              <br />
              categories:
              <br />
              (1=Normal
              <br />
              2=UW
              <br />
              3=SUW
              <br />
              4=OW
              <br />
              5=Obese)
            </TableHeader>
            <TableHeader>Height / Length in cm</TableHeader>
            <TableHeader>
              Height/Length
              <br />
              categories:
              <br />
              (1=Normal
              <br />
              2=Stunted
              <br />
              3=Sev.
              <br />
              Stunted)
              <br />
            </TableHeader>
            <TableHeader>
              MUAC
              <br />
              1.Green
              <br />
              2.Yellow
              <br />
              3.Red
            </TableHeader>
            <TableHeader>
              Exclusive <br /> Breast feeding <br />
              (less than 6<br /> months)(Y/N)
            </TableHeader>
            <TableHeader>
              Vitamin A
              <br />
              supplimentation:
              <br />
              (6-59 months) (1=6-
              <br />
              11 months, 2=12-59
              <br />
              months, 3=Not
              <br />
              supplimented)
            </TableHeader>
            <TableHeader>Dewormed (Y/N)</TableHeader>
            <TableHeader>
              MNPs supplimentation:(6-23
              <br />
              children)
            </TableHeader>
            <TableHeader>
              Childs assessed for <br />
              Developmental milestones <br />
              including 1st Haed control ,2=
              <br />
              sitting, 3=talking
            </TableHeader>
            <TableHeader>
              Any Danger Signs
              <br />
              1.Unable to breastfeed
              <br />
              2.Unable to drink
              <br />
              3.Vomits everything
              <br />
              4.Bloody diarrhoea
              <br />
              5.Has oedema <br />
              6.Has convulsions
            </TableHeader>
            <TableHeader>Any Disability</TableHeader>
            <TableHeader>Immunization status up to date(Y/N)</TableHeader>
            <TableHeader>LLIN gievn to under 1 years(Y/N)</TableHeader>
            <TableHeader>
              Follow up for: <br />
              1=Nutrition service
              <br />
              2=Rehabilitation service
            </TableHeader>
            <TableHeader>
              1=referred from CU; 2= <br />
              referred from another H/F;
              <br />
              3=Not applicable
            </TableHeader>
            <TableHeader>
              1=referred to CU; 2= <br />
              referred to another H/F;
              <br />
              3=Not applicable
            </TableHeader>
            <TableHeader>
              Reason for referral <br />
              ....specify
            </TableHeader>
            <TableHeader>REMARKS</TableHeader>
          </TableRow>
          <TableRow>
            <TableHeader>A</TableHeader>
            <TableHeader>B</TableHeader>
            <TableHeader>C</TableHeader>
            <TableHeader>D</TableHeader>
            <TableHeader>E</TableHeader>
            <TableHeader>F</TableHeader>
            <TableHeader>G</TableHeader>
            <TableHeader>H</TableHeader>
            <TableHeader>I</TableHeader>
            <TableHeader>J</TableHeader>
            <TableHeader>K</TableHeader>
            <TableHeader>L</TableHeader>
            <TableHeader>M</TableHeader>
            <TableHeader>N</TableHeader>
            <TableHeader>O</TableHeader>
            <TableHeader>P</TableHeader>
            <TableHeader>Q</TableHeader>
            <TableHeader>R</TableHeader>
            <TableHeader>S</TableHeader>
            <TableHeader>T</TableHeader>
            <TableHeader>U</TableHeader>
            <TableHeader>V</TableHeader>
            <TableHeader>W</TableHeader>
            <TableHeader>X</TableHeader>
            <TableHeader>Y</TableHeader>
            <TableHeader>Z</TableHeader>
            <TableHeader>AA</TableHeader>
            <TableHeader>AB</TableHeader>
            <TableHeader>AC</TableHeader>
            <TableHeader>AD</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientlist?.length > 0 ? (
            patientlist.map((patient, index) => (
              <TableRow key={index}>
                {moh511Columns.map((col) => (
                  <td key={col}>
                    {col === 'serial_no'
                      ? index + 1
                      : col === 'visit_date'
                        ? new Date(patient?.[col]).toLocaleDateString('en-GB')
                        : (patient?.[col] ?? '')}
                  </td>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <td colSpan={moh511Columns.length}>No data available</td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default Moh511Register;
