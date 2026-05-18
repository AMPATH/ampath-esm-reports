import React, { useEffect, useState } from 'react';

import styles from './prep-registers.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPrepPatientList } from '../../../resources/moh-731.resource';
import { Button, Loading } from '@carbon/react';
import classNames from 'classnames';
const PrepRegisterComponent: React.FC = () => {
  const navigate = useNavigate();
  const [patientlist, setPatientList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator');
  const gender = searchParams.get('gender');

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate || !locationUuids || !indicator || !gender) return;

      setIsLoading(true);

      try {
        const params = {
          startDate,
          endDate,
          locationUuids,
          indicator,
          gender,
        };

        const data = await getPrepPatientList(params);

        setPatientList(data?.results.results || []);
      } catch (error) {
        console.error('Failed to fetch register data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, locationUuids, indicator, gender]);

  function navigateBack() {
    navigate('/moh-731');
  }

  const transformDate = (date: string): string => {
    if (!date) return '';

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  };
  return (
    <>
      <div className={styles.buttonContainer}>
        <Button onClick={navigateBack}>Back</Button>
      </div>
      {isLoading && <Loading />}
      <div className={styles.container}>
        <b>Ministry Of Health</b>
        <b>MOH 267 PrEP Daily Activity Register</b>
        <b>Ver. July 2023</b>
      </div>
      <table className={classNames(styles.table, styles.tableBordered, styles.textCentre)}>
        <thead>
          <tr>
            <th rowSpan={2} colSpan={2}>
              PrEP No
            </th>
            <th rowSpan={2} colSpan={2}>
              Date of Visit
            </th>
            <th rowSpan={2} colSpan={2}>
              AMRSID
            </th>
            <th colSpan={3} style={{ maxWidth: '120px' }}>
              National Identification Number
            </th>
            <th rowSpan={2} colSpan={2}>
              Age
            </th>
            <th rowSpan={2} colSpan={2}>
              Sex <br />
              (M/F)
            </th>
            <th rowSpan={2} colSpan={3}>
              Population type
              <br />
              (Use the codes): <br />
              1. General Population <br />
              2. Discordant Couple <br />
              3. MSM/MSW <br />
              4. FSW
              <br />
              5. PWID/PWUD
              <br />
              6. VP
            </th>
            <th rowSpan={2} colSpan={2}>
              Client PrEP Status: <br />
              N- New <br />
              C- Continuing <br />
              D-Discontinued
              <br />
              R-Restart
            </th>
            <th rowSpan={2} colSpan={3}>
              PrEP Method: <br />
              1. Daily oral PrEP <br />
              2. Event driven oral PrEP
              <br />
              3. Dapivirine Vaginal ring <br />
              4. Cabotegravir Injectable
            </th>
            <th rowSpan={2} colSpan={2}>
              HIV Results <br />
              (N/P/Ic/NA)
            </th>
            <th rowSpan={2} colSpan={2}>
              Diagnosed with <br />
              STI
              <br />
              (N/Y)
            </th>
            <th rowSpan={2} colSpan={4}>
              Remarks
            </th>
          </tr>
          <tr>
            <th colSpan={3} style={{ maxWidth: '120px' }}>
              National Unique Patient Identifier (NUPI)
            </th>
          </tr>
          <tr>
            <th colSpan={2} className={styles.textCenter}>
              (a)
            </th>
            <th colSpan={2} className={styles.textCenter}>
              (b)
            </th>
            <th colSpan={2} className={styles.textCenter}>
              (l)
            </th>
            <th colSpan={3} className={styles.textCenter}>
              (c)
            </th>
            <th colSpan={2} className={styles.textCenter}>
              (d)
            </th>
            <th colSpan={2} className={styles.textCenter}>
              (e)
            </th>
            <th colSpan={3} className={styles.textCenter}>
              (f)
            </th>
            <th colSpan={2} className={styles.textCenter}>
              (g)
            </th>
            <th colSpan={3} className={styles.textCenter}>
              (h)
            </th>
            <th colSpan={2} className={styles.textCenter}>
              (i)
            </th>
            <th colSpan={2} className={styles.textCenter}>
              (j)
            </th>
            <th colSpan={4} className={styles.textCenter}>
              (k)
            </th>
          </tr>
        </thead>
        <tbody>
          {patientlist?.map((data, i) => (
            <React.Fragment key={data?.PrEP_Number || i}>
              <tr>
                <td colSpan={2} rowSpan={2}>
                  {data.PrEP_Number}
                </td>

                <td colSpan={2} rowSpan={2}>
                  {transformDate(data.Date_Of_Visit)}
                </td>

                <td colSpan={2} rowSpan={2}>
                  {data.amrsId}
                </td>

                <td colSpan={3}>{data.National_ID}</td>

                <td colSpan={2} rowSpan={2}>
                  {data.Age}
                </td>

                <td colSpan={2} rowSpan={2}>
                  {data.Sex}
                </td>

                <td colSpan={3} rowSpan={2}>
                  {data.population_type}
                </td>

                <td colSpan={2} rowSpan={2}>
                  {data.client_prep_status}
                </td>

                <td colSpan={3} rowSpan={2}>
                  {data.prep_method}
                </td>

                <td colSpan={2} rowSpan={2}>
                  {data.HIV_result}
                </td>

                <td colSpan={2} rowSpan={2}>
                  {data.with_STI}
                </td>

                <td colSpan={4} rowSpan={2} style={{ maxWidth: '200px' }}>
                  {data.remarks}
                </td>
              </tr>

              <tr>
                <td colSpan={3}>{data.NUPI}</td>
              </tr>
            </React.Fragment>
          ))}

          <tr>
            <td colSpan={7}>
              <b>TOTAL this Page</b>
            </td>

            <td colSpan={2} className={styles.textCenter}>
              {patientlist.length}
            </td>

            <td colSpan={2} className={styles.textCenter}></td>

            <td colSpan={3} className={styles.textCenter}></td>

            <td colSpan={2} className={styles.textCenter}></td>

            <td colSpan={3} className={styles.textCenter}></td>

            <td colSpan={2} className={styles.textCenter}></td>

            <td colSpan={2} className={styles.textCenter}></td>

            <td colSpan={4} className={styles.textCenter}></td>
          </tr>

          <tr>
            <td colSpan={7}>
              <b>TOTAL this Month</b>
            </td>

            <td colSpan={2} className={styles.textCenter}>
              {patientlist.length}
            </td>

            <td colSpan={2} className={styles.textCenter}></td>

            <td colSpan={3} className={styles.textCenter}></td>

            <td colSpan={2} className={styles.textCenter}></td>

            <td colSpan={3} className={styles.textCenter}></td>

            <td colSpan={2} className={styles.textCenter}></td>

            <td colSpan={2} className={styles.textCenter}></td>

            <td colSpan={4} className={styles.textCenter}></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PrepRegisterComponent;
