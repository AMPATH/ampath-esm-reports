import React from 'react';

import styles from '../../../common/report-register/register-table.scss';
import { useSearchParams } from 'react-router-dom';
import { getPrepPatientList } from '../../../resources/moh-731.resource';
import classNames from 'classnames';
import { prepExportColumns } from './prep.columns';
import { RegisterLayout, usePatientList } from '../../../common/report-register';
const PrepRegisterComponent: React.FC = () => {
  const [searchParams] = useSearchParams();

  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const locationUuids = searchParams.get('locationUuids');
  const indicator = searchParams.get('indicator');
  const gender = searchParams.get('gender');

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
    ({ startIndex, limit }) =>
      getPrepPatientList({
        startDate,
        endDate,
        locationUuids,
        indicator,
        gender,
        startIndex,
        limit,
      }),
    [startDate, endDate, locationUuids, indicator, gender],
  );

  const transformDate = (date: string): string => {
    if (!date) return '';

    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  };
  return (
    <RegisterLayout
      parentLabel="MOH-731 Report"
      parentPath="/moh-731"
      title="MOH 267 PrEP Daily Activity Register"
      isLoading={isLoading}
      isEmpty={patientlist.length === 0}
      page={page}
      pageSize={pageSize}
      total={total}
      isTotalExact={isTotalExact}
      onPageChange={onPageChange}
      fetchAll={fetchAll}
      columns={prepExportColumns}
    >
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
            <th colSpan={2} className={styles.textCentre}>
              (a)
            </th>
            <th colSpan={2} className={styles.textCentre}>
              (b)
            </th>
            <th colSpan={2} className={styles.textCentre}>
              (l)
            </th>
            <th colSpan={3} className={styles.textCentre}>
              (c)
            </th>
            <th colSpan={2} className={styles.textCentre}>
              (d)
            </th>
            <th colSpan={2} className={styles.textCentre}>
              (e)
            </th>
            <th colSpan={3} className={styles.textCentre}>
              (f)
            </th>
            <th colSpan={2} className={styles.textCentre}>
              (g)
            </th>
            <th colSpan={3} className={styles.textCentre}>
              (h)
            </th>
            <th colSpan={2} className={styles.textCentre}>
              (i)
            </th>
            <th colSpan={2} className={styles.textCentre}>
              (j)
            </th>
            <th colSpan={4} className={styles.textCentre}>
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

            <td colSpan={2} className={styles.textCentre}>
              {patientlist.length}
            </td>

            <td colSpan={2} className={styles.textCentre}></td>

            <td colSpan={3} className={styles.textCentre}></td>

            <td colSpan={2} className={styles.textCentre}></td>

            <td colSpan={3} className={styles.textCentre}></td>

            <td colSpan={2} className={styles.textCentre}></td>

            <td colSpan={2} className={styles.textCentre}></td>

            <td colSpan={4} className={styles.textCentre}></td>
          </tr>

          <tr>
            <td colSpan={7}>
              <b>TOTAL this Month</b>
            </td>

            <td colSpan={2} className={styles.textCentre}>
              {patientlist.length}
            </td>

            <td colSpan={2} className={styles.textCentre}></td>

            <td colSpan={3} className={styles.textCentre}></td>

            <td colSpan={2} className={styles.textCentre}></td>

            <td colSpan={3} className={styles.textCentre}></td>

            <td colSpan={2} className={styles.textCentre}></td>

            <td colSpan={2} className={styles.textCentre}></td>

            <td colSpan={4} className={styles.textCentre}></td>
          </tr>
        </tbody>
      </table>
    </RegisterLayout>
  );
};

export default PrepRegisterComponent;
