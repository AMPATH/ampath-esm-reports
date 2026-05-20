import React, { useEffect, useState } from 'react';

import styles from './moh-366.scss';
import classNames from 'classnames';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getMoh366PatientList } from '../../../resources/moh-731.resource';
import { Button, Loading } from '@carbon/react';

interface Moh366RegisterProps {}
const Moh366Register: React.FC<Moh366RegisterProps> = () => {
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
      if (!startDate || !endDate || !locationUuids || !indicator || gender === null) return;

      setIsLoading(true);

      try {
        const params = {
          startDate,
          endDate,
          locationUuids,
          indicator,
          gender,
        };

        const data = await getMoh366PatientList(params);

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
  return (
    <>
      <div className={styles.buttonContainer}>
        <Button onClick={navigateBack}>Back</Button>
      </div>
      {isLoading && <Loading />}
      <div className={styles.container}>
        <b>Ministry Of Health</b>
        <b>HIV Care Treatment Daily Activity Register MOH 366</b>
        <b>Ver. July 2023</b>
      </div>
      <table className={classNames(styles.table, styles.tableBordered, styles.textCentre)}>
        <thead>
          <tr>
            <th rowSpan={4}>No</th>
            <th colSpan={2} rowSpan={4}>
              Date
            </th>
            <th colSpan={2} rowSpan={4}>
              AMRSID
            </th>
            <th colSpan={3}>National Identification Number</th>
            <th colSpan={3} rowSpan={4}>
              Client CCC Number
            </th>
            <th rowSpan={4}>Age</th>
            <th colSpan={14} className={styles.textCentre}>
              Starting ART
            </th>
            <th colSpan={4} className={styles.textCentre}>
              TB in HIV Care <br />
              (Newly Initiated on ART)
            </th>
            <th colSpan={14} className={styles.textCentre}>
              Currently on ART (Starting and Continuing ART)
            </th>
            <th colSpan={4} className={styles.textCentre}>
              DSD
            </th>
            <th colSpan={4} rowSpan={4} className={styles.textCentre}>
              Remarks
            </th>
          </tr>
          <tr>
            <th colSpan={3} rowSpan={3}>
              Client Unique Number (NUPI)
            </th>
            <th colSpan={14} rowSpan={2} className={styles.textCentre}>
              Tick as appropriate for age
            </th>
            <th colSpan={2}>Screened for TB</th>
            <th colSpan={2}>Started TPT</th>
            <th colSpan={14} rowSpan={2} className={styles.textCentre}>
              Indicate No. of months of till next appointment or <br />
              "R"for patients making unscheduled visits
            </th>
            <th colSpan={2}>Status</th>
            <th colSpan={2}>Type</th>
          </tr>
          <tr>
            <th colSpan={4} className={styles.textCentre}>
              Indicate Y/N/NA
            </th>
            <th colSpan={2} rowSpan={2} className={classNames(styles.textCenter, styles.verticalText)}>
              E=Established <br />
              NE=Not Established
            </th>
            <th colSpan={2} rowSpan={2} className={styles.textCentre}>
              C<br />
              FT
              <br />
              HFAG
              <br />
              PFAG
              <br />
              HCAG
              <br />
              PCAG
              <br />
              CP
              <br />
              CADP
              <br />
              IACD
            </th>
          </tr>
          <tr>
            <th className={classNames(styles.textCenter, styles.verticalText)}>&lt; 1 yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>&lt; 1 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>1-4 yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>1-4 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>5-9 yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>5-9 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>10-14 yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>10-14 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>15-19 yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>15-19 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>20-24 yrs(M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>20-24 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>25+ yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>25+ yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>&lt 15 yrs</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>15+ yrs</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>&lt; 15 yrs</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>15+ yrs</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>&lt; 1 yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>&lt; 1 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>1-4 yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>1-4 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>5-9 yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>5-9 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>10-14 yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>10-14 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>15-19 yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>15-19 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>20-24 yrs(M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>20-24 yrs (F)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>25+ yrs (M)</th>
            <th className={classNames(styles.textCenter, styles.verticalText)}>25+ yrs (F)</th>
          </tr>
          <tr>
            <th className={styles.textCentre}>(a)</th>
            <th colSpan={2} className={styles.textCentre}>
              (b)
            </th>
            <th colSpan={2} className={styles.textCentre}>
              (c)
            </th>
            <th colSpan={3} className={styles.textCentre}>
              (d)
            </th>
            <th colSpan={3} className={styles.textCentre}>
              (e)
            </th>
            <th className={styles.textCentre}>(f)</th>
            <th className={styles.textCentre}>(g)</th>
            <th className={styles.textCentre}>(h)</th>
            <th className={styles.textCentre}>(i)</th>
            <th className={styles.textCentre}>(j)</th>
            <th className={styles.textCentre}>(k)</th>
            <th className={styles.textCentre}>(l)</th>
            <th className={styles.textCentre}>(m)</th>
            <th className={styles.textCentre}>(n)</th>
            <th className={styles.textCentre}>(o)</th>
            <th className={styles.textCentre}>(q)</th>
            <th className={styles.textCentre}>(r)</th>
            <th className={styles.textCentre}>(s)</th>
            <th className={styles.textCentre}>(t)</th>
            <th className={styles.textCentre}>(u)</th>
            <th className={styles.textCentre}>(v)</th>
            <th className={styles.textCentre}>(w)</th>
            <th className={styles.textCentre}>(x)</th>
            <th className={styles.textCentre}>(y)</th>
            <th className={styles.textCentre}>(z)</th>
            <th className={styles.textCentre}>(aa)</th>
            <th className={styles.textCentre}>(ab)</th>
            <th className={styles.textCentre}>(ac)</th>
            <th className={styles.textCentre}>(ad)</th>
            <th className={styles.textCentre}>(ae)</th>
            <th className={styles.textCentre}>(af)</th>
            <th className={styles.textCentre}>(ag)</th>
            <th className={styles.textCentre}>(ah)</th>
            <th className={styles.textCentre}>(ai)</th>
            <th className={styles.textCentre}>(aj)</th>
            <th className={styles.textCentre}>(ak)</th>
            <th className={styles.textCentre}>(al)</th>
            <th className={styles.textCentre}>(am)</th>
            <th colSpan={2} className={styles.textCentre}>
              (an)
            </th>
            <th colSpan={2} className={styles.textCentre}>
              (ao)
            </th>
            <th colSpan={4} className={styles.textCentre}>
              (ap)
            </th>
          </tr>
        </thead>
        <tbody>
          {patientlist?.map((data, a) => (
            <React.Fragment key={a}>
              <tr>
                <td rowSpan={2}>{a + 1}</td>

                <td colSpan={2} rowSpan={2}>
                  {new Date(data.date).toLocaleDateString('en-GB')}
                </td>

                <td colSpan={2} rowSpan={2}>
                  {data.amrsID}
                </td>

                <td colSpan={3}>{data.national_id_number}</td>

                <td colSpan={3} rowSpan={2}>
                  {data.ccc_number?.replace('-', '')}
                </td>

                <td rowSpan={2}>{data.age}</td>

                {/* Started on ART */}
                <td rowSpan={2}>{data.age < 1 && data.gender === 'M' && (data.started_on_art === 'Y' ? '✓' : '')}</td>

                <td rowSpan={2}>{data.age < 1 && data.gender === 'F' && (data.started_on_art === 'Y' ? '✓' : '')}</td>

                <td rowSpan={2}>
                  {data.age >= 1 && data.age <= 4 && data.gender === 'M' && (data.started_on_art === 'Y' ? '✓' : '')}
                </td>

                <td rowSpan={2}>
                  {data.age >= 1 && data.age <= 4 && data.gender === 'F' && (data.started_on_art === 'Y' ? '✓' : '')}
                </td>

                <td rowSpan={2}>
                  {data.age >= 5 && data.age <= 9 && data.gender === 'M' && (data.started_on_art === 'Y' ? '✓' : '')}
                </td>

                <td rowSpan={2}>
                  {data.age >= 5 && data.age <= 9 && data.gender === 'F' && (data.started_on_art === 'Y' ? '✓' : '')}
                </td>

                <td rowSpan={2}>
                  {data.age >= 10 && data.age <= 14 && data.gender === 'M' && (data.started_on_art === 'Y' ? '✓' : '')}
                </td>

                <td rowSpan={2}>
                  {data.age >= 10 && data.age <= 14 && data.gender === 'F' && (data.started_on_art === 'Y' ? '✓' : '')}
                </td>

                <td rowSpan={2}>
                  {data.age >= 15 && data.age <= 19 && data.gender === 'M' && (data.started_on_art === 'Y' ? '✓' : '')}
                </td>

                <td rowSpan={2}>
                  {data.age >= 15 && data.age <= 19 && data.gender === 'F' && (data.started_on_art === 'Y' ? '✓' : '')}
                </td>

                <td rowSpan={2}>
                  {data.age >= 20 && data.age <= 24 && data.gender === 'M' && (data.started_on_art === 'Y' ? '✓' : '')}
                </td>

                <td rowSpan={2}>
                  {data.age >= 20 && data.age <= 24 && data.gender === 'F' && (data.started_on_art === 'Y' ? '✓' : '')}
                </td>

                <td rowSpan={2}>{data.age >= 25 && data.gender === 'M' && (data.started_on_art === 'Y' ? '✓' : '')}</td>

                <td rowSpan={2}>{data.age >= 25 && data.gender === 'F' && (data.started_on_art === 'Y' ? '✓' : '')}</td>

                {/* TB Screening */}
                <td rowSpan={2}>{data.age < 15 ? (data.started_on_art === 'Y' ? data.screened_for_tb : 'NA') : ''}</td>

                <td rowSpan={2}>{data.age >= 15 ? (data.started_on_art === 'Y' ? data.screened_for_tb : 'NA') : ''}</td>

                {/* TPT */}
                <td rowSpan={2}>{data.age < 15 ? (data.started_on_art === 'Y' ? data.started_on_tpt : 'NA') : ''}</td>

                <td rowSpan={2}>{data.age >= 15 ? (data.started_on_art === 'Y' ? data.started_on_tpt : 'NA') : ''}</td>

                {/* Current On ART */}
                <td rowSpan={2}>
                  {data.age < 1 && data.gender === 'M'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age < 1 && data.gender === 'F'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 1 && data.age <= 4 && data.gender === 'M'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 1 && data.age <= 4 && data.gender === 'F'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 5 && data.age <= 9 && data.gender === 'M'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 5 && data.age <= 9 && data.gender === 'F'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 10 && data.age <= 14 && data.gender === 'M'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 10 && data.age <= 14 && data.gender === 'F'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 15 && data.age <= 19 && data.gender === 'M'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 15 && data.age <= 19 && data.gender === 'F'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 20 && data.age <= 24 && data.gender === 'M'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 20 && data.age <= 24 && data.gender === 'F'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 25 && data.gender === 'M'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td rowSpan={2}>
                  {data.age >= 25 && data.gender === 'F'
                    ? data.revisit
                      ? data.revisit
                      : data.current_on_art > 0
                        ? data.current_on_art
                        : 1
                    : ''}
                </td>

                <td colSpan={2} rowSpan={2}>
                  {data.dsd_status}
                </td>

                <td colSpan={2} rowSpan={2}>
                  {data.dsd_type}
                </td>

                <td colSpan={4} rowSpan={2}>
                  {data.remarks}
                </td>
              </tr>

              <tr>
                <td colSpan={3}>{data.NUPI}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Moh366Register;
