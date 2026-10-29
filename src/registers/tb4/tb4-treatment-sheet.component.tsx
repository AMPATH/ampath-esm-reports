import React from 'react';
import dayjs from 'dayjs';

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

/** Initial phase drug collections ruled per patient (W) */
const INITIAL_COLLECTIONS = 8;

const MONTH_LETTERS = 'JFMAMJJASOND'.split('');

/**
 * Column widths, measured off page 9 of the form: U, V, the eight initial phase
 * collections (W), the 24 months of the continuation phase (X), then Y to AH
 */
const COLUMN_WIDTHS = [
  92,
  93,
  ...Array<number>(INITIAL_COLLECTIONS).fill(21.75),
  ...Array<number>(12).fill(24.1),
  ...Array<number>(12).fill(23.6),
  91,
  93,
  113,
  97,
  67,
  81,
  80,
  91,
  78,
  133,
];

/** An entry over its date, split across the row as printed (U, Y, Z, AA, AB) */
const UpperLower: React.FC<{ upper: React.ReactNode; lower: React.ReactNode; tags?: [string, string] }> = ({
  upper,
  lower,
  tags,
}) => (
  <Stack
    parts={[
      { share: 0.45, boxes: [{ tag: tags?.[0], value: upper }] },
      { share: 0.55, boxes: [{ tag: tags?.[1], value: lower }] },
    ]}
  />
);

const TestUpperLower: React.FC<{ test?: Tb4Test | null }> = ({ test }) => (
  <UpperLower upper={text(test?.result)} lower={formDate(test?.date)} />
);

/**
 * The continuation phase grid's two years, from the earliest collection on the
 * page; blank (as printed, "Year:……") when the page has none
 */
const continuationYears = (rows: Tb4Row[]): [number, number] | null => {
  const years = rows
    .flatMap((row) => row?.continuation_collections ?? [])
    .map((date) => dayjs(date).year())
    .filter((year) => Number.isFinite(year));
  if (!years.length) {
    return null;
  }
  const first = Math.min(...years);
  return [first, first + 1];
};

/** One patient: U to AH across one tall row, divided inside as printed */
const TreatmentRow: React.FC<{ row?: Tb4Row; years: [number, number] | null }> = ({ row, years }) => {
  const initial = row?.initial_phase_collections ?? [];
  /* each month's collections, as days of the month, upper then lower */
  const continuation = (year: number, month: number) =>
    (row?.continuation_collections ?? [])
      .map((date) => dayjs(date))
      .filter((date) => date.year() === year && date.month() === month)
      .map((date) => date.format('D'));

  return (
    <tr>
      <td>
        <UpperLower upper={text(row?.started_treatment)} lower={text(row?.not_started_reason)} />
      </td>
      <td>
        <UpperLower upper={text(row?.regimen)} lower={formDate(row?.treatment_start_date)} tags={['Regimen', 'Date']} />
      </td>
      {Array.from({ length: INITIAL_COLLECTIONS }, (_, index) => (
        <td key={`w${index}`} className={styles.collection}>
          <span className={styles.vertical}>{formDate(initial[index])}</span>
        </td>
      ))}
      {[0, 1].map((yearIndex) =>
        MONTH_LETTERS.map((_, month) => {
          const days = years ? continuation(years[yearIndex], month) : [];
          return (
            <td key={`x${yearIndex}-${month}`}>
              <UpperLower upper={days[0] ?? ''} lower={days[1] ?? ''} />
            </td>
          );
        }),
      )}
      <td>
        <TestUpperLower test={row?.hiv} />
      </td>
      <td>
        <TestUpperLower test={row?.partner_hiv} />
      </td>
      <td>
        <UpperLower upper={text(row?.cpt)} lower={formDate(row?.cpt_start_date)} />
      </td>
      <td>
        <UpperLower upper={text(row?.art)} lower={text(row?.art_start)} />
      </td>
      <td>
        <Value>{text(row?.nutrition_support)}</Value>
      </td>
      <td>
        <NutritionStack nutrition={row?.nutrition_end} />
      </td>
      <td>
        <Value wrap>{text(row?.risk_factors)}</Value>
      </td>
      <td>
        <Value wrap>{text(row?.comorbidities)}</Value>
      </td>
      <td>
        <Stack
          parts={[
            { share: 0.17, boxes: [{ heading: 'Outcome' }] },
            { share: 0.28, boxes: [{ value: text(row?.outcome) }] },
            { share: 0.17, boxes: [{ heading: 'Date' }] },
            { share: 0.38, boxes: [{ value: formDate(row?.outcome_date) }] },
          ]}
        />
      </td>
      <td>
        <Value left wrap>
          {text(row?.remarks)}
        </Value>
      </td>
    </tr>
  );
};

/** Keys 6b to 10, beneath the register on the right-hand pages */
const TreatmentKeys: React.FC = () => (
  <div className={styles.keys}>
    <KeyTable
      title="Key 6 b: Molecular test results"
      widthMm={69}
      rows={[
        ['A', 'MTB Detected; INH, FLQ, AMK, KAN, CAP, and ETH Resistance NOT Detected'],
        ['B', 'MTB Detected; INH, FLQ, AMK, KAN, CAP, and ETH Resistance Detected'],
        ['C', 'MTB Detected; INH Resistance Detected'],
        ['D', 'MTB Detected; INH and KAN Resistance Detected; AMK and CAP Indeterminate'],
        ['E', 'MTB Detected; INH and Low FLQ Resistance Detected'],
        ['F', 'MTB Detected; INH, FLQ, AMK, and KAN Resistance Detected'],
      ]}
    />
    <KeyTable
      title="Key 7 a: DST"
      widthMm={26}
      leftTitle
      rows={[['R = Rifampicin'], ['H = Isoniazid'], ['Z = Pyrazinamide'], ['E = Ethambutol']]}
    />
    <KeyTable
      title="Key 7 b: Culture Results"
      widthMm={27}
      rows={[['Growth'], ['No Growth'], ['Done No Results'], ['Not done'], ['Contaminated']]}
    />
    <KeyTable
      title="Key 8: Nutritional Support"
      widthMm={51}
      rows={[
        ['Therapeutic feeds', 'RUTF'],
        ['Supplementary Food', 'FBF'],
        ['Nutritional Counseling', 'NC'],
        ['Vitamin A', 'VIT A'],
        ['Pyridoxine', 'Pyridoxine'],
        ['Not Done', 'ND'],
      ]}
    />
    <KeyTable
      title="Key 9: Comorbidities/Risk Factors"
      widthMm={70}
      leftTitle
      subheadings={[0, 6]}
      rows={[
        ['Comorbidities'],
        ['Malnutrition', 'Kidney Diseases'],
        ['Diabetes', 'Asthma'],
        ['Hypertension', 'Liver Disease(s)'],
        ['Mental Health Conditions.', 'Renal Disease(s)'],
        ['Lung Cancer (If other cancers, specify)', 'Otherr (specify)'],
        ['Risk Factors'],
        ['Undernutrition', 'Alcoholism'],
        ['Drug & Substance Abuse', 'Smoking'],
        ['Pregnancy', 'Others (specify)'],
      ]}
    />
    <KeyTable
      title="Key 10: Treatment Outcome"
      widthMm={48}
      leftTitle
      rows={[
        ['Cured', 'C'],
        ['Treatment completed', 'TC'],
        ['Treatment failure', 'F'],
        ['Lost to follow-up', 'LTFU'],
        ['Died', 'D'],
        ['Moved to MTB4', 'MTB4'],
        ['Not Evaluated', 'NE'],
        ['Not a TB Case', 'NTB'],
      ]}
    />
  </div>
);

/**
 * The right-hand pages of the TB4 register (page 9 of the form): treatment and
 * follow-up, columns U to AH, for the same five patients a page as the
 * left-hand pages, with Keys 6b to 10 beneath.
 */
const Tb4TreatmentSheet: React.FC<{ rows: Tb4Row[] }> = ({ rows }) => {
  const { ref, scale } = usePageScale<HTMLDivElement>(PAGE_WIDTH_MM);
  const pages = paginate(rows);

  return (
    <div className={styles.viewport} ref={ref}>
      {pages.map((pageRows, index) => {
        const years = continuationYears(pageRows);
        return (
          <Tb4Page
            key={index}
            page={index + 1}
            pages={pages.length}
            side="Treatment and follow-up (U–AH)"
            scale={scale}
            keys={<TreatmentKeys />}
            table={
              <table className={styles.register}>
                <Columns widths={COLUMN_WIDTHS} />
                <thead>
                  <tr style={{ height: '15mm' }}>
                    <Heading letter="U" rowSpan={3} centre>
                      Started treatment
                      <br />
                      <br />
                      Yes/No
                      <br />
                      <br />
                      If No, provide reason (Specify)
                    </Heading>
                    <Heading letter="V" rowSpan={3} centre>
                      Regimen and Date treatment started+
                    </Heading>
                    <Heading letter="W" rowSpan={3} colSpan={INITIAL_COLLECTIONS} centre>
                      Initial phase date of drugs collection
                    </Heading>
                    <Heading letter="X" colSpan={24} centre>
                      Continuation phase date of drugs collection
                      <br />
                      <br />
                      Indicate the date when the patient collected drugs
                    </Heading>
                    <Heading letter="Y" rowSpan={3} centre>
                      HIV Test New Pos/ Known Pos/ Neg/ Unknown (Date done)
                    </Heading>
                    <Heading letter="Z" rowSpan={3} centre>
                      Partner tested for HIV Pos/ Neg/Unknown/ No Partner
                      <br />
                      <br />
                      (Date done)
                    </Heading>
                    <Heading letter="AA" rowSpan={3} centre>
                      Cotrimoxazole Preventive Therapy/ Dapsone Yes/No
                      <br />
                      <br />
                      (Date Started)
                    </Heading>
                    <Heading letter="AB" rowSpan={3} centre>
                      ART : Yes/No (Date started &amp; Regimen)
                    </Heading>
                    <Heading letter="AC" rowSpan={3} centre>
                      Nutrition Support (Key 8)
                    </Heading>
                    <Heading letter="AD" rowSpan={3} centre>
                      Nutritional status at end Treatment Height/ Length (Cm)
                    </Heading>
                    <Heading letter="AE" rowSpan={3} centre>
                      Risk Factors (Key 9)
                    </Heading>
                    <Heading letter="AF" rowSpan={3} centre>
                      Co-Morbidities
                      <br />
                      <br />
                      (Key 9)
                    </Heading>
                    <Heading letter="AG" rowSpan={3} centre>
                      Date and Outcome of treatment (Key10)
                    </Heading>
                    <Heading letter="AH" rowSpan={3} centre>
                      Remarks
                    </Heading>
                  </tr>
                  <tr style={{ height: '13.5mm' }}>
                    {[0, 1].map((yearIndex) => (
                      <th key={yearIndex} colSpan={12} className={styles.centreHeading}>
                        Year:{years ? years[yearIndex] : '……...'}
                      </th>
                    ))}
                  </tr>
                  <tr style={{ height: '13.5mm' }}>
                    {[0, 1].map((yearIndex) =>
                      MONTH_LETTERS.map((letter, month) => (
                        <th key={`${yearIndex}-${month}`} className={styles.monthHeading}>
                          {letter}
                        </th>
                      )),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: ROWS_PER_PAGE }, (_, rowIndex) => (
                    <TreatmentRow key={rowIndex} row={pageRows[rowIndex]} years={years} />
                  ))}
                </tbody>
              </table>
            }
          />
        );
      })}
    </div>
  );
};

export default Tb4TreatmentSheet;
