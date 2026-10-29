import React from 'react';

import { usePageScale } from '../../common/report-page';
import {
  Columns,
  Heading,
  KeyTable,
  NutritionStack,
  PAGE_WIDTH_MM,
  ROWS_PER_PAGE,
  Stack,
  Tb4Page,
  Value,
  paginate,
} from './tb4-parts';
import { formDate, text, type Tb4Row, type Tb4Test } from './tb4.types';
import styles from './tb4-register.scss';

/** Column widths, measured off page 8 of the form: A to O, P (X-ray, others), Q, R, S (molecular, five smears), T */
const COLUMN_WIDTHS = [
  51, 62, 59, 218, 48, 64, 85, 105, 68, 68, 76, 57, 55, 122, 60, 47, 46, 89, 50, 77, 52, 52, 50, 45, 48, 136,
];

const SMEAR_MONTHS = [0, 2, 3, 5, 6] as const;

/** A test's serial number, date and result, down the row (S) */
const TestStack: React.FC<{ test?: Tb4Test | null }> = ({ test }) => (
  <Stack
    parts={[
      { share: 0.292, boxes: [{ value: text(test?.serial) }] },
      { share: 0.295, boxes: [{ value: formDate(test?.date) }] },
      { share: 0.413, boxes: [{ value: text(test?.result) }] },
    ]}
  />
);

/** One patient: A to T across one tall row, divided inside as printed */
const PatientRow: React.FC<{ row?: Tb4Row }> = ({ row }) => (
  <tr>
    <td>
      <Value>{text(row?.serial_number)}</Value>
    </td>
    <td>
      <Value>{formDate(row?.registration_date)}</Value>
    </td>
    <td>
      <Value>{text(row?.sub_county_tb_number)}</Value>
    </td>
    <td>
      <Value left wrap>
        {text(row?.full_name)}
      </Value>
    </td>
    <td>
      <Value>{text(row?.sex)}</Value>
    </td>
    <td>
      <Value>{text(row?.age)}</Value>
    </td>
    <td>
      <Stack
        parts={[
          { share: 0.146, boxes: [{ heading: 'Nationality' }] },
          { share: 0.295, boxes: [{ value: text(row?.nationality) }] },
          { share: 0.146, boxes: [{ heading: 'Number' }] },
          { share: 0.413, boxes: [{ value: text(row?.id_number) }] },
        ]}
      />
    </td>
    <td>
      <Value left wrap>
        {[row?.physical_address, row?.patient_phone, row?.supporter_phone]
          .map(text)
          .filter(Boolean)
          .map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </Value>
    </td>
    <td>
      <Value>{text(row?.key_population)}</Value>
    </td>
    <td>
      <Value>{text(row?.referred_by)}</Value>
    </td>
    <td>
      <NutritionStack nutrition={row?.nutrition_start} />
    </td>
    <td>
      <Value>{text(row?.severity)}</Value>
    </td>
    <td>
      <Value>{text(row?.tb_type)}</Value>
    </td>
    <td>
      <Stack
        parts={[
          { share: 0.441, boxes: [{ value: text(row?.eptb_subtype) }] },
          { share: 0.146, boxes: [{ value: text(row?.lymph_node_type) }] },
          { share: 0.146 },
          { share: 0.267 },
        ]}
      />
    </td>
    <td>
      <Value>{text(row?.patient_type)}</Value>
    </td>
    <td>
      <Stack
        parts={[
          { share: 0.183, boxes: [{ tag: 'Date', value: formDate(row?.xray_date) }] },
          { share: 0.258, boxes: [{ tag: 'Score', value: text(row?.xray_score) }] },
          { share: 0.559, boxes: [{ tag: 'Finding', value: text(row?.xray_finding) }] },
        ]}
      />
    </td>
    <td>
      <Value>{text(row?.other_imaging)}</Value>
    </td>
    <td>
      <Stack
        parts={[
          { share: 0.146 },
          { share: 0.295, boxes: [{ value: formDate(row?.tb_lamp?.date) }] },
          { share: 0.146 },
          { share: 0.413, boxes: [{ value: text(row?.tb_lamp?.result) }] },
        ]}
      />
    </td>
    <td>
      <Value>
        {text(row?.lf_lam?.result)}
        <br />
        {formDate(row?.lf_lam?.date)}
      </Value>
    </td>
    <td>
      <TestStack test={row?.molecular} />
    </td>
    {SMEAR_MONTHS.map((month) => (
      <td key={month}>
        <TestStack test={row?.smears?.[month]} />
      </td>
    ))}
    <td>
      <Stack
        parts={[
          { share: 0.146, boxes: [{ value: text(row?.culture?.result) }] },
          { share: 0.146, boxes: [{ heading: 'Date' }] },
          { share: 0.149, boxes: [{ value: formDate(row?.culture?.date) }] },
          { share: 0.146 },
          {
            share: 0.146,
            boxes: [{ heading: 'R' }, { heading: 'H' }, { heading: 'Z' }, { heading: 'E', grow: 2.2 }],
          },
          {
            share: 0.267,
            boxes: [
              { value: text(row?.dst?.r) },
              { value: text(row?.dst?.h) },
              { value: text(row?.dst?.z) },
              { value: text(row?.dst?.e), grow: 2.2 },
            ],
          },
        ]}
      />
    </td>
  </tr>
);

/** Keys 1 to 6a, beneath the register on the left-hand pages */
const PatientKeys: React.FC = () => (
  <div className={styles.keys}>
    <div className={styles.keyColumn}>
      <p className={styles.keyTitle}>KEY:</p>
      <KeyTable
        title="Key 1: Patient referred by"
        widthMm={68}
        rows={[
          ['HTC', 'HTC'],
          ['Comprehensive care unit', 'CCC'],
          ['Diabetes', 'DC'],
          ['Private Sector', 'PS'],
          ['Antenatal/PMTCT clinic', 'PMTCT'],
          ['Self referral', 'SR'],
          ['Contact Invitation', 'CI'],
          ['Chemist/Pharmacy', 'CP'],
          ['Community Health Promoter', 'CHP'],
        ]}
      />
    </div>
    <div className={styles.keyColumn}>
      <KeyTable
        title="Key 2: Severity Score"
        widthMm={79}
        rows={[
          [
            'Non- Severe',
            <>
              No danger signs
              <br />
              Diagnosed and managed at the outpatient/ No hospitalization
            </>,
          ],
          [
            'Severe',
            <>
              Requiring hospitalization at diagnosis
              <br />
              Hospitalized at diagnosis/Diagnosed while an inpatient
              <br />
              Severely ill at diagnosis with any danger signs children who are BC
            </>,
          ],
        ]}
      />
      <KeyTable
        title="Key 3: lymphadenitis"
        widthMm={79}
        rows={[
          [
            'Complicated',
            <>
              a) Has a Leaking Sinus/ associated abscess
              <br />
              b) Causing nerve/ nearby structure compression
              <br />
              c) TB Spread to any other organ
            </>,
          ],
          ['Uncomplicated', 'Simple nodes with none of the above'],
        ]}
      />
    </div>
    <KeyTable
      title="Key 4: Type of patient:"
      widthMm={74}
      leftTitle
      rows={[
        ['New', 'N'],
        ['Treatment after loss follow up', 'TLF'],
        ['Recurrent', 'R'],
        ['Previous Treatment History unknown', 'THU'],
        ['Treatment after Failure', 'TF'],
        ['Transfer In', 'TI'],
        ['Others previously treated', 'PT'],
      ]}
    />
    <KeyTable
      title="Key 5 : X-Ray"
      widthMm={68}
      subheadings={[4]}
      rows={[
        ['N', 'Normal'],
        ['SG', 'Abnormal Suggestive TB'],
        ['AO', 'Abnormal Others'],
        ['ND', 'Not Done'],
        ['CT - Scan'],
        ['FSTB', 'Finding Suggestive of TB'],
        ['FSM', 'Finding Suggestive of Malignancy'],
      ]}
    />
    <KeyTable
      title="Key 6 a: Molecular test results"
      widthMm={82}
      rows={[
        ['TS', 'MTB detected, rifampicin resistance not detected;'],
        ['RR', 'MTB detected, rifampicin resistance detected;'],
        ['TI', 'MTB detected, rifampicin resistance indeterminate'],
        ['N', 'MTB not detected;'],
        ['I', 'Invalid/no result/error'],
        ['NA', 'Not Applicable'],
        ['TR', 'MTB detected Trace'],
      ]}
    />
  </div>
);

/**
 * The left-hand pages of the TB4 register (page 8 of the form): the patient,
 * diagnosis and investigations, columns A to T, five patients a page, with
 * Keys 1 to 6a beneath.
 */
const Tb4PatientSheet: React.FC<{ rows: Tb4Row[] }> = ({ rows }) => {
  const { ref, scale } = usePageScale<HTMLDivElement>(PAGE_WIDTH_MM);
  const pages = paginate(rows);

  return (
    <div className={styles.viewport} ref={ref}>
      {pages.map((pageRows, index) => (
        <Tb4Page
          key={index}
          page={index + 1}
          pages={pages.length}
          side="Patient, diagnosis and investigations (A–T)"
          scale={scale}
          keys={<PatientKeys />}
          table={
            <table className={styles.register}>
              <Columns widths={COLUMN_WIDTHS} />
              <thead>
                <tr style={{ height: '14mm' }}>
                  <Heading letter="A" rowSpan={3}>
                    Serial No.
                  </Heading>
                  <Heading letter="B" rowSpan={3}>
                    Date of Sub- County Reg.
                  </Heading>
                  <Heading letter="C" rowSpan={3}>
                    Sub County TB Reg No.
                  </Heading>
                  <Heading letter="D" rowSpan={3} centre>
                    &quot;Name (Write 3 names)&quot;
                  </Heading>
                  <Heading letter="E" rowSpan={3}>
                    Sex (M/F Other)
                  </Heading>
                  <Heading letter="F" rowSpan={3}>
                    Age in years and months
                  </Heading>
                  <Heading letter="G" rowSpan={3} centre>
                    Nationality and National ID/ Passport / UPI/NEMIS Number/Alien ID Number
                  </Heading>
                  <Heading letter="H" rowSpan={3}>
                    Physical address (Neighbour/ School/ Church/ Mosque)
                    <br />
                    <br />
                    Phone No. of patient
                    <br />
                    <br />
                    Phone No. treatment supporter
                  </Heading>
                  <Heading letter="I" rowSpan={3}>
                    Is the patient a key vulnerable population (HCW, Truck driver prisoner or miner) or None
                  </Heading>
                  <Heading letter="J" rowSpan={3} centre>
                    Patient Referred By (Key 1)
                  </Heading>
                  <Heading letter="K" rowSpan={3}>
                    Nutritional status at the start of TB Treatment (Kgs)/ Height/ Length (Cm)
                  </Heading>
                  <Heading letter="L" rowSpan={3} centre>
                    Severity Score (Severe/ Non- Severe Key 2)
                  </Heading>
                  <Heading letter="M" rowSpan={3}>
                    Type of TB (PTB/ EPTB
                  </Heading>
                  <Heading letter="N" rowSpan={3}>
                    EPTB Sub-type
                    <br />
                    <br />
                    (If lymph nodes, specify complicated/ uncomplicated Key 3)
                  </Heading>
                  <Heading letter="O" rowSpan={3} centre>
                    Type of patient (Key 4)
                  </Heading>
                  <Heading letter="P" rowSpan={2} colSpan={2}>
                    Imaging (Key5)
                  </Heading>
                  <Heading letter="Q" rowSpan={3}>
                    TB LAMP
                    <br />
                    <br />
                    Date
                    <br />
                    <br />
                    Results (Pos/ Neg/ND)
                  </Heading>
                  <Heading letter="R" rowSpan={3} centre>
                    LF LAM
                    <br />
                    <br />
                    (Pos/ Neg/ ND) and date
                  </Heading>
                  <Heading letter="S" colSpan={6} centre>
                    Molecular/Microbiological Tests (Serial no., date and result sputum smear examination,
                    quantification)
                  </Heading>
                  <Heading letter="T" rowSpan={3} centre>
                    <br />
                    Culture/DST Results Resistant (R)/Sensitive (S) and Date collected (Growth/No Growth/ Done No
                    Results/ Contaminated/Not done) (Key7a/7b)
                  </Heading>
                </tr>
                <tr style={{ height: '9.5mm' }}>
                  <th className={styles.boldHeading}>Molecular test (Key 6a/6b)</th>
                  <th colSpan={5} className={styles.boldHeading}>
                    Smear
                  </th>
                </tr>
                <tr style={{ height: '18.5mm' }}>
                  <th className={styles.tinyHeading}>X-ray Finding</th>
                  <th className={styles.tinyHeading}>Others Specify)</th>
                  <th className={styles.boldHeading}>Month 0</th>
                  {SMEAR_MONTHS.map((month) => (
                    <th key={month} className={styles.boldHeading}>
                      Month {month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: ROWS_PER_PAGE }, (_, rowIndex) => (
                  <PatientRow key={rowIndex} row={pageRows[rowIndex]} />
                ))}
              </tbody>
            </table>
          }
        />
      ))}
    </div>
  );
};

export default Tb4PatientSheet;
