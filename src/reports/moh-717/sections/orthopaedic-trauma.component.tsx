import React from 'react';

import styles from '../moh717.scss';
import classNames from 'classnames';

interface OrthopaedicTraumaComponentProps {
  moh717ReportData: any;
}

const OrthopaedicTraumaComponent: React.FC<OrthopaedicTraumaComponentProps> = ({ moh717ReportData }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th className={styles.totals}>B4. ORTHOPAEDIC TRAUMA SERVICES</th>
            <th colSpan={2}>&lt;5 Years</th>
            <th colSpan={2}>&gt;5 Years</th>
          </tr>
          <tr>
            <th className={styles.alighnLeft}>Description</th>
            <th>New</th>
            <th>Revisit</th>
            <th>New</th>
            <th>Revisit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>No of Casts fixed</td>
            <td>{moh717ReportData.casts_fixed_less_5_years_new}</td>
            <td>{moh717ReportData.casts_fixed_less_5_years_revisit}</td>
            <td>{moh717ReportData.casts_fixed_over_5_years_new}</td>
            <td>{moh717ReportData.casts_fixed_over_5_years_revisit}</td>
          </tr>
          <tr>
            <td>No of Tractions fixed</td>
            <td>{moh717ReportData.tractions_fixed_less_5_years_new}</td>
            <td>{moh717ReportData.tractions_fixed_less_5_years_revisit}</td>
            <td>{moh717ReportData.tractions_fixed_over_5_years_new}</td>
            <td>{moh717ReportData.tractions_fixed_over_5_years_revisit}</td>
          </tr>
          <tr>
            <td>No of Closed Reductions (Fructures, Dislocation)</td>
            <td>{moh717ReportData.closed_reductions_less_5_years_new}</td>
            <td>{moh717ReportData.closed_reductions_less_5_years_revisit}</td>
            <td>{moh717ReportData.closed_reductions_over_5_years_new}</td>
            <td>{moh717ReportData.closed_reductions_over_5_years_revisit}</td>
          </tr>
          <tr>
            <td>No of Orthopeadic cases assisted in theatre</td>
            <td>{moh717ReportData.orthopaedic_assisted_in_theatre_less_5_years_new}</td>
            <td>{moh717ReportData.orthopaedic_assisted_in_theatre_less_5_years_revisit}</td>
            <td>{moh717ReportData.orthopaedic_assisted_in_theatre_over_5_years_new}</td>
            <td>{moh717ReportData.orthopaedic_assisted_in_theatre_over_5_years_revisit}</td>
          </tr>
          <tr>
            <td>No of club foot seen /corrected (Ponsseti method)</td>
            <td>{moh717ReportData.club_foot_seen_less_5_years_new}</td>
            <td>{moh717ReportData.club_foot_seen_less_5_years_revisit}</td>
            <td>{moh717ReportData.club_foot_seen_over_5_years_new}</td>
            <td>{moh717ReportData.club_foot_seen_over_5_years_revisit}</td>
          </tr>
          <tr>
            <td>No of Crepe bandages and arm slings applied</td>
            <td>{moh717ReportData.crepe_bandages_applied_less_5_years_new}</td>
            <td>{moh717ReportData.crepe_bandages_applied_less_5_years_revisit}</td>
            <td>{moh717ReportData.crepe_bandages_applied_over_5_years_new}</td>
            <td>{moh717ReportData.crepe_bandages_applied_over_5_years_revisit}</td>
          </tr>
          <tr>
            <th className={styles.alignLeft}>Removals</th>
            <th colSpan={2}>Casts</th>
            <th colSpan={2}>Tractions</th>
            <th>Ex-Fixator</th>
          </tr>
          <tr>
            <td rowSpan={2}></td>
            <th>&lt;5 years</th>
            <th>&gt;5 years</th>
            <th>&lt;5 years</th>
            <th>&gt;5 years</th>
            <th>&gt;5 years</th>
          </tr>
          <tr>
            <th>{moh717ReportData.removals_done_cast_less_5_years}</th>
            <th>{moh717ReportData.removals_done_cast_over_5_years}</th>
            <th>{moh717ReportData.removals_done_tractions_less_5_years}</th>
            <th>{moh717ReportData.orthopaedic_removals_tractions_over_5_years}</th>
            <th>{moh717ReportData.ex_fixator_removed_over_5_years}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default OrthopaedicTraumaComponent;
