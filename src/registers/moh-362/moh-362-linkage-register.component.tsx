import React from 'react';

import { clientName, formDate, text, type Moh362Row } from './moh-362.types';
import styles from './moh-362-register.scss';

interface Moh362LinkageRegisterProps {
  rows: Moh362Row[];
}

const COLUMN_IDS = 'abcdefghij'.split('');

/**
 * REFERRAL AND LINKAGE REGISTER (Ver. July 2023), page 6 of the MOH 362 form:
 * the clients who tested HIV positive and were linked to care (started on ART),
 * columns (a) to (j), with the total linked at the foot.
 */
const Moh362LinkageRegister: React.FC<Moh362LinkageRegisterProps> = ({ rows }) => {
  const linked = rows.length;

  return (
    <div className={styles.sheet}>
      <div className={styles.runningHead}>
        <span>Ministry Of Health</span>
        <span>MOH 362 HTS LAB, REFERRAL AND LINKAGE REGISTER</span>
        <span>Ver. July 2023</span>
      </div>
      <h4 className={`${styles.sheetTitle} ${styles.serifTitle}`}>REFERRAL AND LINKAGE REGISTER</h4>

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
              <th className={styles.wide}>Client Names</th>
              <th className={styles.splitHeader}>
                <span>Telephone Number</span>
                <span>Residence</span>
              </th>
              <th>
                Identification
                <br />
                Strategy
                <br />
                (VCT/IT/HIVST
                <br />
                /SNS)
              </th>
              <th className={styles.wide}>Patient referred to</th>
              <th className={styles.wide}>
                Handed over to:
                <br />
                (Indicate Name (upper cell)
                <br />
                and Cadre (lower cell)
              </th>
              <th>
                Date started on
                <br />
                ART
              </th>
              <th>CCC Number</th>
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
                  <td rowSpan={2}>{index + 1}</td>
                  <td className={styles.upperCell}>{text(row.id_number)}</td>
                  <td rowSpan={2} className={styles.left}>
                    {clientName(row)}
                  </td>
                  <td className={styles.upperCell}>{text(row.telephone)}</td>
                  <td rowSpan={2}>{text(row.client_tested_as)}</td>
                  <td rowSpan={2} className={styles.left}>
                    {text(row.referral_to)}
                  </td>
                  <td className={`${styles.upperCell} ${styles.left}`}>{text(row.handed_to)}</td>
                  <td rowSpan={2}>{formDate(row.art_start_date)}</td>
                  <td rowSpan={2}>{text(row.ccc_number)}</td>
                  <td rowSpan={2} className={styles.left}>
                    {text(row.screening_remarks)}
                  </td>
                </tr>
                <tr>
                  <td className={styles.lowerCell}>{text(row.nupi)}</td>
                  <td className={styles.lowerCell}>{text(row.residence)}</td>
                  {/* the receiving health worker's cadre is not recorded */}
                  <td className={styles.lowerCell} />
                </tr>
              </React.Fragment>
            ))}
            <tr className={styles.totalRow}>
              <th colSpan={9} className={styles.left}>
                Totals Clients Linked
              </th>
              <td>{linked}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Moh362LinkageRegister;
