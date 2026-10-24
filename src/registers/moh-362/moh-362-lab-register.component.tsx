import React from 'react';

import {
  AGE_BANDS,
  clientName,
  finalResult,
  formDate,
  inBand,
  testResult,
  text,
  type Moh362Row,
} from './moh-362.types';
import styles from './moh-362-register.scss';

interface Moh362LabRegisterProps {
  rows: Moh362Row[];
}

const COLUMN_IDS = 'abcdefghijklmnopqr'.split('');

const count = (rows: Moh362Row[], test: (row: Moh362Row) => boolean) => rows.filter(test).length;

/** One HIV test's header cell: the test, then kit, lot and expiry lines, then its result codes */
const TestHeader: React.FC<{ test: string; codes: string }> = ({ test, codes }) => (
  <th className={styles.testHeader}>
    <span>{test}</span>
    <span>Kit Name:</span>
    <span>Lot No.</span>
    <span>Expiry Date</span>
    <span className={styles.dateRule}>____/____/____</span>
    <span>{codes}</span>
  </th>
);

/** One client's HIV test: the result, with the kit, lot and expiry used beneath it */
const TestCell: React.FC<{ result: unknown; kit: unknown; lot: unknown; expiry: unknown }> = ({
  result,
  kit,
  lot,
  expiry,
}) => {
  const detail = [text(kit), text(lot), formDate(expiry)].filter(Boolean).join(' · ');
  return (
    <td rowSpan={2} className={styles.testCell}>
      <strong>{testResult(result)}</strong>
      {detail && <span className={styles.testDetail}>{detail}</span>}
    </td>
  );
};

/** A Tests (n) / Positive (n) block: age bands by sex, with totals */
const AgeSexSummary: React.FC<{ title: string; rows: Moh362Row[] }> = ({ title, rows }) => {
  const sexes: Array<{ label: string; code: string }> = [
    { label: 'Male', code: 'M' },
    { label: 'Female', code: 'F' },
  ];
  return (
    <table className={styles.summaryTable}>
      <thead>
        <tr>
          <th className={styles.summaryLabel}>{title}</th>
          {AGE_BANDS.map((band) => (
            <th key={band.label}>{band.label}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {sexes.map((sex) => {
          const ofSex = rows.filter((row) => row.sex === sex.code);
          return (
            <tr key={sex.code}>
              <th className={styles.summaryLabel}>{sex.label}</th>
              {AGE_BANDS.map((band) => (
                <td key={band.label}>{count(ofSex, (row) => inBand(row, band))}</td>
              ))}
              <td>{ofSex.length}</td>
            </tr>
          );
        })}
        <tr>
          <th className={styles.summaryLabel}>Total</th>
          {AGE_BANDS.map((band) => (
            <td key={band.label}>{count(rows, (row) => inBand(row, band))}</td>
          ))}
          <td>{rows.length}</td>
        </tr>
      </tbody>
    </table>
  );
};

/**
 * MOH 362: HTS LAB REGISTER (Ver. July 2023), page 5 of the MOH 362 form: one
 * row per client tested, columns (a) to (r), and the summary blocks beneath.
 */
const Moh362LabRegister: React.FC<Moh362LabRegisterProps> = ({ rows }) => {
  const positives = rows.filter((row) => row.final_result === 'P');
  const isKvp = (row: Moh362Row) => String(row.population_type ?? '') === '2';
  const testTotals = (field: 'hiv_test1' | 'hiv_test2' | 'hiv_test3') => {
    const by = (code: string) => count(rows, (row) => testResult(row[field]) === code);
    const n = by('N');
    const p = by('P');
    const i = by('I');
    return { n, p, i, total: n + p + i };
  };
  const tests = [
    { label: 'HIV Test 1 (k)', ...testTotals('hiv_test1') },
    { label: 'HIV Test 2 (l)', ...testTotals('hiv_test2') },
    { label: 'HIV Test 3 (m)', ...testTotals('hiv_test3') },
  ];

  return (
    <div className={styles.sheet}>
      <div className={styles.runningHead}>
        <span>Ministry Of Health</span>
        <span>MOH 362 HTS LAB, REFERRAL AND LINKAGE REGISTER</span>
        <span>Ver. July 2023</span>
      </div>
      <h4 className={styles.sheetTitle}>MOH 362: HTS LAB REGISTER</h4>

      <div className={styles.tableScroll}>
        <table className={styles.register}>
          <thead>
            <tr>
              <th>
                Serial
                <br />
                Number
              </th>
              <th className={styles.splitHeader}>
                <span>National Identification Number</span>
                <span>National Unique Patient Identifier (NUPI) Number</span>
              </th>
              <th>
                Date of visit
                <br />
                (DD/MM/YYYY)
              </th>
              <th className={styles.wide}>
                Client Name
                <br />
                (First, Middle, Last)
              </th>
              <th>Age</th>
              <th>
                Sex
                <br />
                (M/F)
              </th>
              <th>Telephone Number</th>
              <th className={styles.codes}>
                Marital Status
                <br />
                1=Married
                <br />
                2=Widowed
                <br />
                3=Single
                <br />
                4=Divorced
                <br />
                5=Separated
              </th>
              <th className={styles.codes}>
                Population Type
                <br />
                1. Gen Pop
                <br />
                2. Key and Vulnerable Pop.
                <br />
                Codes for KVP
                <br />- DC
                <br />- MSM/MSW
                <br />- FSW
                <br />- PWID/PWUD
                <br />- VP
              </th>
              <th className={styles.codes}>
                Setting
                <br />
                (1=Facility
                <br />
                2=Community)
              </th>
              <TestHeader test="HIV Test 1" codes="(N,P,I)" />
              <TestHeader test="HIV Test 2" codes="(N,P,I,NA)" />
              <TestHeader test="HIV Test 3" codes="(N,P,I,NA)" />
              <th>
                Final HIV
                <br />
                Result
                <br />
                <br />
                (N,P,Ic,NA)
              </th>
              <th>
                Discordant
                <br />
                Couple
                <br />
                <br />
                (Y/N/NA)
              </th>
              <th className={styles.codes}>
                Referred for Prevention Services
                <br />
                1. PrEP
                <br />
                2. PEP
                <br />
                3. VMMC
                <br />
                4. PMTCT
                <br />
                5.NA
              </th>
              <th className={styles.wide}>
                HTS Provider
                <br />
                (Name)
              </th>
              <th className={styles.wide}>Remarks</th>
            </tr>
            <tr className={styles.columnIds}>
              {COLUMN_IDS.map((id) => (
                <th key={id}>({id})</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <React.Fragment key={`${row.patient_id}-${row.serial_number}-${index}`}>
                <tr>
                  <td rowSpan={2}>{text(row.serial_number) || index + 1}</td>
                  <td className={styles.upperCell}>{text(row.id_number)}</td>
                  <td rowSpan={2}>{formDate(row.date_of_visit)}</td>
                  <td rowSpan={2} className={styles.left}>
                    {clientName(row)}
                  </td>
                  <td rowSpan={2}>{text(row.age)}</td>
                  <td rowSpan={2}>{text(row.sex)}</td>
                  <td rowSpan={2}>{text(row.telephone)}</td>
                  <td rowSpan={2}>{text(row.marital_status)}</td>
                  <td className={styles.upperCell}>{text(row.population_type)}</td>
                  <td rowSpan={2}>{text(row.setting)}</td>
                  <TestCell result={row.hiv_test1} kit={row.kit1_name} lot={row.lot1} expiry={row.expiry1} />
                  <TestCell result={row.hiv_test2} kit={row.kit2_name} lot={row.lot2} expiry={row.expiry2} />
                  <TestCell result={row.hiv_test3} kit={row.kit3_name} lot={row.lot3} expiry={row.expiry3} />
                  <td rowSpan={2}>{finalResult(row.final_result)}</td>
                  <td rowSpan={2}>{text(row.discordant_couple)}</td>
                  <td rowSpan={2}>{text(row.referral_services)}</td>
                  <td rowSpan={2} className={styles.left}>
                    {text(row.hts_provider)}
                  </td>
                  <td rowSpan={2} className={styles.left}>
                    {text(row.initial_remarks)}
                  </td>
                </tr>
                <tr>
                  <td className={styles.lowerCell}>{text(row.nupi)}</td>
                  <td className={styles.lowerCell}>{text(row.sub_population)}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* The summary blocks at the foot of the sheet, laid out as on the form */}
      <div className={styles.summary}>
        <div className={styles.summaryColumn}>
          <AgeSexSummary title="Tests (n )" rows={rows} />
          <AgeSexSummary title="Positive (n)" rows={positives} />
        </div>

        <div className={styles.summaryColumn}>
          <table className={styles.summaryTable}>
            <thead>
              <tr>
                <th>Total Negative (n)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.bigFigure}>{count(rows, (row) => row.final_result === 'N')}</td>
              </tr>
            </tbody>
          </table>
          <table className={styles.summaryTable}>
            <thead>
              <tr>
                <th>Inconclusive test (n)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.bigFigure}>{count(rows, (row) => finalResult(row.final_result) === 'Ic')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.summaryColumn}>
          <table className={styles.summaryTable}>
            <tbody>
              <tr>
                <th className={styles.summaryLabel}>Tests Facility (j)</th>
                <td>{count(rows, (row) => String(row.setting ?? '') === '1')}</td>
              </tr>
              <tr>
                <th className={styles.summaryLabel}>Tests Community (j)</th>
                <td>{count(rows, (row) => String(row.setting ?? '') === '2')}</td>
              </tr>
            </tbody>
          </table>
          <table className={styles.summaryTable}>
            <tbody>
              <tr>
                <th className={styles.summaryLabel}>Discordant (o)</th>
                <td>{count(rows, (row) => row.discordant_couple === 'Y')}</td>
              </tr>
            </tbody>
          </table>
          <table className={styles.summaryTable}>
            <tbody>
              <tr>
                <th className={styles.summaryLabel}>Tests Key pops (i)</th>
                <td>{count(rows, isKvp)}</td>
              </tr>
              <tr>
                <th className={styles.summaryLabel}>
                  Positive Key pops
                  <br />
                  (i) &amp; (n)
                </th>
                <td>{count(positives, isKvp)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.summaryColumn}>
          <table className={styles.summaryTable}>
            <thead>
              <tr>
                {tests.map((test) => (
                  <React.Fragment key={test.label}>
                    <th className={styles.summaryLabel}>{test.label}</th>
                    <th>Number</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ['N: Negative', 'n'],
                  ['P: Positive', 'p'],
                  ['I: Invalid', 'i'],
                  ['Wastage:', null],
                  ['Total:', 'total'],
                ] as Array<[string, 'n' | 'p' | 'i' | 'total' | null]>
              ).map(([label, key]) => (
                <tr key={label}>
                  {tests.map((test) => (
                    <React.Fragment key={test.label}>
                      <th className={styles.summaryLabel}>{label}</th>
                      {/* wastage is counted on the kits, not recorded per client */}
                      <td>{key ? test[key] : ''}</td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.signOff}>
        <span>
          Supervisor&apos;s Name: <span className={styles.rule} />
        </span>
        <span>
          Signature: <span className={styles.rule} />
        </span>
      </div>
    </div>
  );
};

export default Moh362LabRegister;
