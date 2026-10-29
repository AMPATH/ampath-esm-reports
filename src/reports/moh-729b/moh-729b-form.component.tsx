import React, { createContext, useContext } from 'react';
import dayjs from 'dayjs';

import { usePageScale } from '../../common/report-page';
import {
  ADULT_ART,
  HEPATITIS_B,
  INFANT_AGES,
  OPPORTUNISTIC_INFECTIONS,
  PAEDIATRIC_ART,
  PEP,
  PMTCT_INFANTS,
  PMTCT_MOTHERS,
  PREP,
  WEIGHT_BANDS,
  type Regimen,
  type TotalledGroup,
  TPT_HIV_POSITIVE,
} from './moh-729b.config';
import { type Moh729bCell } from './moh-729b.types';
import styles from './moh-729b.scss';

/** A3 portrait less its 8mm margins: the page as drawn on screen, inside the report card */
const PAGE_WIDTH_MM = 297 - 2 * 8;

/** The form's measuring unit (row heights in the config) in millimetres */
const MM_PER_UNIT = 0.144;
const height = (units: number): React.CSSProperties => ({ height: `${units * MM_PER_UNIT}mm` });

/** Column widths, measured off the form, as fractions of each half */
const LEFT_COLUMNS = [79, 212, 77, 77, 76, 77, 77, 77, 80, 75];
const RIGHT_COLUMNS = [83, 342, 84, 84, 84, 84, 84, 84];

const ColumnWidths: React.FC<{ widths: number[] }> = ({ widths }) => {
  const total = widths.reduce((sum, width) => sum + width, 0);
  return (
    <colgroup>
      {widths.map((width, index) => (
        <col key={index} style={{ width: `${(width / total) * 100}%` }} />
      ))}
    </colgroup>
  );
};

/** The column headings both halves start with, and the half's first band */
const HalfHead: React.FC<{ span: number; band: string }> = ({ span, band }) => (
  <thead>
    <tr className={styles.columnHead} style={height(40)}>
      <th>Regimen Code</th>
      <th>ARV or OI Treatment Regimen</th>
      <th colSpan={span}>
        Number of Current Active Patients/Clients on this regimen at the end of this Reporting period
      </th>
    </tr>
    <tr className={styles.band} style={height(30)}>
      <th colSpan={span + 2}>{band}</th>
    </tr>
  </thead>
);

const RegimenCells: React.FC<{ regimen: Regimen }> = ({ regimen: [code, name] }) => (
  <>
    <td className={styles.code}>{code}</td>
    <td>{name}</td>
  </>
);

/** The form's counts, and what a count opens; absent while the form is blank */
export interface Moh729bCounts {
  count: (cell: Moh729bCell) => number;
  open: (cell: Moh729bCell) => void;
}

const CountsContext = createContext<Moh729bCounts | null>(null);

/** A count on the form, opening the linelist of its clients when clicked */
const Count: React.FC<{ cell: Moh729bCell; colSpan?: number }> = ({ cell, colSpan }) => {
  const counts = useContext(CountsContext);
  if (!counts) {
    return <td colSpan={colSpan} />;
  }
  return (
    <td
      colSpan={colSpan}
      className={styles.count}
      title="Click to open linelist"
      role="button"
      tabIndex={0}
      onClick={() => counts.open(cell)}
      onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && counts.open(cell)}
    >
      {counts.count(cell)}
    </td>
  );
};

const blanks = (count: number, className?: string) =>
  Array.from({ length: count }, (_, index) => <td key={index} className={className} />);

/** ART: adults by line with a single Total, children by weight band, then PrEP */
const ArtHalf: React.FC = () => {
  /* the adults' shaded block runs unbroken beside all three lines */
  const adultRows = ADULT_ART.reduce((count, section) => count + section.rows.length + 1, 0);

  return (
    <table className={styles.grid}>
      <ColumnWidths widths={LEFT_COLUMNS} />
      <HalfHead span={8} band="ADULT ART" />
      <tbody>
        {ADULT_ART.map((section, sectionIndex) => (
          <React.Fragment key={section.title}>
            <tr className={styles.heading} style={height(section.h)}>
              <th colSpan={2}>{section.title}</th>
              <th colSpan={3}>Total</th>
              {sectionIndex === 0 && <td colSpan={5} rowSpan={adultRows} className={styles.shade} />}
            </tr>
            {section.rows.map((regimen) => (
              <tr key={regimen[0]} style={height(regimen[2] ?? 39.6)}>
                <RegimenCells regimen={regimen} />
                <Count colSpan={3} cell={{ code: regimen[0] }} />
              </tr>
            ))}
          </React.Fragment>
        ))}

        <tr className={styles.band} style={height(30)}>
          <th colSpan={10}>PAEDIATRIC ART</th>
        </tr>
        {PAEDIATRIC_ART.map((section) => (
          <React.Fragment key={section.title}>
            <tr className={styles.heading} style={height(section.h)}>
              <th colSpan={2}>{section.title}</th>
              {[...WEIGHT_BANDS, 'Total'].map((band) => (
                <th key={band} className={styles.small}>
                  {band}
                </th>
              ))}
            </tr>
            {section.rows.map((regimen) => (
              <tr key={regimen[0]} style={height(regimen[2] ?? 41)}>
                <RegimenCells regimen={regimen} />
                {WEIGHT_BANDS.map((band) => (
                  <Count key={band} cell={{ code: regimen[0], band }} />
                ))}
                <Count cell={{ code: regimen[0] }} />
              </tr>
            ))}
          </React.Fragment>
        ))}

        <tr className={styles.heading} style={height(PREP.h)}>
          <th colSpan={2} className={styles.bandCell}>
            {PREP.title}
          </th>
          <th className={styles.leftText}>Total</th>
          {blanks(7, styles.shade)}
        </tr>
        {PREP.rows.map((regimen) => (
          <tr key={regimen[0]} style={height(regimen[2] ?? 35.4)}>
            <RegimenCells regimen={regimen} />
            <Count cell={{ code: regimen[0] }} />
            {blanks(7, styles.shade)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/**
 * A numbered group of the right half: its heading with Total, then a count and
 * a Total per regimen, the columns between shaded as one block. `extraRows`
 * lengthens the block over rows that follow the group (Hepatitis B's).
 * `isCounted` fills each regimen's Total from the data (PEP, Hepatitis B and TPT HIV Positive).
 */
const TotalledRows: React.FC<{ group: TotalledGroup; extraRows?: number; isCounted?: boolean }> = ({
  group,
  extraRows = 0,
  isCounted = false,
}) => (
  <>
    <tr className={styles.heading} style={height(group.h)}>
      <td className={styles.code}>{group.number}</td>
      <th colSpan={5} className={styles.leftText}>
        {group.title}
      </th>
      {group.noTotal ? <td colSpan={2} className={styles.shade} /> : <th colSpan={2}>Total</th>}
    </tr>
    {group.rows.map((regimen, index) => (
      <tr key={regimen[0]} style={height(regimen[2] ?? 40)}>
        <RegimenCells regimen={regimen} />
        <td />
        {index === 0 && <td colSpan={3} rowSpan={group.rows.length + extraRows} className={styles.shade} />}
        {isCounted ? <Count colSpan={2} cell={{ code: regimen[0] }} /> : <td colSpan={2} />}
      </tr>
    ))}
  </>
);

/** PMTCT for mothers and infants, PEP, Hepatitis B and the OIs */
const PmtctHalf: React.FC = () => (
  <table className={styles.grid}>
    <ColumnWidths widths={RIGHT_COLUMNS} />
    <HalfHead span={6} band="PMTCT" />
    <tbody>
      <tr className={styles.heading} style={height(PMTCT_MOTHERS.h)}>
        <td className={styles.code}>1</td>
        <th className={styles.italicHeading}>{PMTCT_MOTHERS.title}</th>
        <th>1st Line</th>
        <th>2nd Line</th>
        <th>3rd Line</th>
        <th colSpan={3}>Total</th>
      </tr>
      {PMTCT_MOTHERS.rows.map((regimen) => (
        <tr key={regimen[0]} style={height(39.6)}>
          <RegimenCells regimen={regimen} />
          {[1, 2, 3].map((line) => (
            <Count key={line} cell={{ code: regimen[0], line }} />
          ))}
          <td colSpan={3} className={styles.shade} />
        </tr>
      ))}
      <tr style={height(39)}>
        {blanks(5, styles.lightShade)}
        <td colSpan={3} className={styles.shade} />
      </tr>

      <tr className={styles.heading} style={height(PMTCT_INFANTS.h)}>
        <td className={styles.code}>2</td>
        <th className={styles.leftText}>{PMTCT_INFANTS.title}</th>
        {[...INFANT_AGES, 'Total'].map((age) => (
          <th key={age} className={styles.small}>
            {age}
          </th>
        ))}
      </tr>
      {PMTCT_INFANTS.rows.map((regimen) => (
        <tr key={regimen[0]} style={height(regimen[2] ?? 38)}>
          <RegimenCells regimen={regimen} />
          {blanks(5)}
          <td className={styles.shade} />
        </tr>
      ))}

      <tr className={styles.band} style={height(38)}>
        <td className={styles.blankCell} />
        <th colSpan={7}>PEP</th>
      </tr>
      {PEP.map((group) => (
        <TotalledRows key={group.title} group={group} isCounted />
      ))}

      <TotalledRows group={HEPATITIS_B} extraRows={1} isCounted />
      <tr style={height(30)}>
        <td colSpan={3} className={styles.shade} />
        <td colSpan={2} />
      </tr>

      <tr className={styles.band} style={height(40)}>
        <td className={styles.blankCell} />
        <th colSpan={7}>Management of Opportunistic infections (OIs)</th>
      </tr>
      {OPPORTUNISTIC_INFECTIONS.map((group) => (
        <TotalledRows key={group.title} group={group} isCounted={group.title === TPT_HIV_POSITIVE} />
      ))}
    </tbody>
  </table>
);

/** A label and the ruled line it is written on */
const Field: React.FC<{ label: React.ReactNode; value?: string; caption?: string }> = ({ label, value, caption }) => (
  <>
    <span className={styles.fieldLabel}>{label}</span>
    <span className={caption ? `${styles.fieldLine} ${styles.captioned}` : styles.fieldLine}>
      {value}
      {caption && <span className={styles.caption}>{caption}</span>}
    </span>
  </>
);

const SIGN_OFF = ['Signature:', 'Date:', 'Designation:', 'Contact Telephone:'];

interface Moh729bFormProps {
  facility: string;
  startDate: string;
  endDate: string;
  /** The counts of the ART and PMTCT regimens; without them the form is drawn blank */
  counts?: Moh729bCounts;
}

/**
 * MoH 729B Facility Monthly ARV Patient Summary (F-MAPS), Ver. July 2023: the
 * report page of the form as one A3 portrait sheet, ART on the left and PMTCT,
 * PEP, Hepatitis B and the OIs on the right, with the shaded cells as printed.
 * The ART regimens (adult, paediatric and PMTCT mothers) are counted from the
 * clients active on ART in the month, and PrEP from the clients on PrEP in the
 * month by MOH 731's PrEP section, and PEP from the clients given PEP in the
 * month by its PEP section, and Hepatitis B from the HIV-negative clients its
 * HBV screening at ANC finds positive, and TPT HIV Positive from its 3.4
 * Starting TPT by the drug started; infants, universal prophylaxis, TPT HIV
 * Negative and Cryptococcal Meningitis stay blank until their queries are added.
 */
const Moh729bForm: React.FC<Moh729bFormProps> = ({ facility, startDate, endDate, counts }) => {
  const { ref, scale } = usePageScale<HTMLDivElement>(PAGE_WIDTH_MM);
  const formDate = (value: string) => (value ? dayjs(value).format('DD/MM/YYYY') : '');

  return (
    <div className={styles.viewport} ref={ref}>
      <section className={styles.page} data-register-page style={{ '--page-zoom': scale } as React.CSSProperties}>
        <div className={styles.titleLine}>
          <span>Ministry of Health</span>
          <span>FACILITY MONTHLY ARV PATIENT SUMMARY (F-MAPS) Report (MoH 729B)</span>
          <span>Ver. July 2023</span>
        </div>
        <div className={styles.formCode}>MoH 729B</div>

        <div className={styles.fields}>
          <div className={styles.fieldGrid}>
            <Field label="Facility Name:" value={facility} />
            <Field label="County:" />
          </div>
          <div className={styles.fieldGrid}>
            <Field label="Facility (MFL) code:" />
            <Field label="Sub-County:" />
          </div>
        </div>
        <div className={styles.period}>
          <Field
            label={
              <>
                Period of Reporting:
                <br />
                Beginning:
              </>
            }
            value={formDate(startDate)}
            caption="(Day/Month/Year)"
          />
          <Field label="Ending:" value={formDate(endDate)} caption="(Day/Month/Year)" />
        </div>

        <CountsContext.Provider value={counts ?? null}>
          <div className={styles.halves}>
            <div className={styles.half} style={{ flexGrow: LEFT_COLUMNS.reduce((a, b) => a + b, 0) }}>
              <ArtHalf />
            </div>
            <div className={styles.half} style={{ flexGrow: RIGHT_COLUMNS.reduce((a, b) => a + b, 0) }}>
              <PmtctHalf />
              <div className={styles.filler} />
            </div>
          </div>
        </CountsContext.Provider>

        <p className={styles.instruction}>
          1. For each Regimen, sum the Number of Patients/Clients from the MoH367A (DAR for ARV and OI medicines) placed
          at ALL the ART Dispensing points in your Health Facility to get the Total numbers by Regimen for the Facility
          <br />
          This information is important for purposes of planning your stock orders and forecasting your requirements.
        </p>

        <div className={styles.signOff}>
          {[
            ['Report prepared by:', 'Name of Reporting Officer'],
            ['Report approved by:', 'Name of Approving officer'],
          ].map(([label, caption]) => (
            <div key={label} className={styles.fieldGrid}>
              <Field label={label} caption={caption} />
              {SIGN_OFF.map((line) => (
                <Field key={line} label={line} />
              ))}
            </div>
          ))}
        </div>
        <p className={styles.notes}>Notes:</p>

        <div className={styles.pageFoot}>
          <span>For Satellite sites Central site Dispensing points</span>
          <span>Ver. July 2023</span>
        </div>
      </section>
    </div>
  );
};

export default Moh729bForm;
