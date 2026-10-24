import React from 'react';

import styles from '../moh-731.scss';
import classNames from 'classnames';
import { useOpenMoh731Linelist } from '../linelist/use-open-moh-731-linelist';

interface HivAndTBTreatmentComponentProps {
  /** Sign-off strip, rendered along the foot of the first two columns */
  footer?: React.ReactNode;
  MOH731Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const HivAndTBTreatmentComponent: React.FC<HivAndTBTreatmentComponentProps> = ({
  MOH731Data,
  startDate,
  endDate,
  locationUuids,
  footer,
}) => {
  const openLinelist = useOpenMoh731Linelist(startDate, endDate, locationUuids);
  return (
    <>
      <h5 className={styles.sectionHeader}>3. HIV and TB treatment</h5>
      <div className={styles.flexRow}>
        <div className={styles.colGroup}>
          <div className={styles.colPair}>
            <div className={classNames(`${styles.flexColumn}`, `${styles.borderRight}`)}>
              <table className={styles.block}>
                <tbody>
                  <tr>
                    <td className={styles.blockTitle} colSpan={3}>
                      3.1 Starting ART
                    </td>
                  </tr>
                  <tr>
                    <td>Start ART_&lt;1</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-01</span>
                      <div
                        onClick={() => openLinelist('HV03-01')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.art_new_less_1_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-02</span>
                        <div
                          onClick={() => openLinelist('HV03-02')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.art_new_less_1_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Start ART 1-4</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-03</span>
                      <div
                        onClick={() => openLinelist('HV03-03')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.art_new_1_4_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-04</span>
                        <div
                          onClick={() => openLinelist('HV03-04')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.art_new_1_4_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Start ART 5-9</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-05</span>
                      <div
                        onClick={() => openLinelist('HV03-05')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.art_new_5_9_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-06</span>
                        <div
                          onClick={() => openLinelist('HV03-06')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.art_new_5_9_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Start ART 10-14</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-07</span>
                      <div
                        onClick={() => openLinelist('HV03-07')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.art_new_10_14_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-08</span>
                        <div
                          onClick={() => openLinelist('HV03-08')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.art_new_10_14_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Start ART 15-19</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-09</span>
                      <div
                        onClick={() => openLinelist('HV03-09')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.art_new_15_19_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-10</span>
                        <div
                          onClick={() => openLinelist('HV03-10')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.art_new_15_19_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Start ART 20-24</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-11</span>
                      <div
                        onClick={() => openLinelist('HV03-11')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.art_new_20_24_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-12</span>
                        <div
                          onClick={() => openLinelist('HV03-12')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.art_new_20_24_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Start ART 25+</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-013</span>
                      <div
                        onClick={() => openLinelist('HV03-013')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.art_new_25_above_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-014</span>
                        <div
                          onClick={() => openLinelist('HV03-014')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.art_new_25_above_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className={styles.divider} />
              <table className={styles.block}>
                <tbody>
                  <tr>
                    <td className={styles.blockTitle} colSpan={3}>
                      3.2 Curently on ART ([ALL])
                    </td>
                  </tr>
                  <tr>
                    <td>On ART_&lt;1</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-015</span>
                      <div
                        onClick={() => openLinelist('HV03-015')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.on_art_less_1_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-016</span>
                        <div
                          onClick={() => openLinelist('HV03-016')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.on_art_less_1_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>On ART 1-4</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-017</span>
                      <div
                        onClick={() => openLinelist('HV03-017')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.on_art_1_4_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-018</span>
                        <div
                          onClick={() => openLinelist('HV03-018')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.on_art_1_4_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>On ART 5-9</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-019</span>
                      <div
                        onClick={() => openLinelist('HV03-019')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.on_art_5_9_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-020</span>
                        <div
                          onClick={() => openLinelist('HV03-020')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.on_art_5_9_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>On ART 10-14</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-021</span>
                      <div
                        onClick={() => openLinelist('HV03-021')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.on_art_10_14_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-022</span>
                        <div
                          onClick={() => openLinelist('HV03-022')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.on_art_10_14_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>On ART 15-19</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-023</span>
                      <div
                        onClick={() => openLinelist('HV03-023')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.on_art_15_19_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-024</span>
                        <div
                          onClick={() => openLinelist('HV03-024')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.on_art_15_19_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>On ART 20-24</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-025</span>
                      <div
                        onClick={() => openLinelist('HV03-025')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.on_art_20_24_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-026</span>
                        <div
                          onClick={() => openLinelist('HV03-026')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.on_art_20_24_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>On ART 25+</td>
                    <td className={styles.textBox}>
                      <span>(M) HV03-027</span>
                      <div
                        onClick={() => openLinelist('HV03-027')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.on_art_25_above_male}
                      </div>
                    </td>
                    <td>
                      <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                        <span>(F) HV03-028</span>
                        <div
                          onClick={() => openLinelist('HV03-028')}
                          className={styles.rectangle}
                          title="Click to open linelist"
                        >
                          {MOH731Data.on_art_25_above_female}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className={styles.divider} />
              <table className={styles.block}>
                <tbody>
                  <tr>
                    <td className={styles.blockTitle} colSpan={3}>
                      3.3 TB Screening
                    </td>
                  </tr>
                  <tr>
                    <td>Screened for TB_&lt;15</td>
                    <td className={styles.textBox}>
                      <span>HV03-029</span>
                      <div
                        onClick={() => openLinelist('HV03-029')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.screened_tb_less_15}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Screened for TB_15+</td>
                    <td className={styles.textBox}>
                      <span>HV03-030</span>
                      <div
                        onClick={() => openLinelist('HV03-030')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.screened_tb_greater_15}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <hr className={styles.divider} />
              <table className={styles.block}>
                <tbody>
                  <tr>
                    <td className={styles.blockTitle} colSpan={3}>
                      3.4 Starting TPT
                    </td>
                  </tr>
                  <tr>
                    <td>Start TPT_&lt;15</td>
                    <td className={styles.textBox}>
                      <span>HV03-031</span>
                      <div
                        onClick={() => openLinelist('HV03-031')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.start_tpt_less_15}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Start TPT_15+</td>
                    <td className={styles.textBox}>
                      <span>HV03-032</span>
                      <div
                        onClick={() => openLinelist('HV03-032')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.start_tpt_greater_15}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <hr className={styles.divider} />
              <table className={styles.block}>
                <tbody>
                  <tr>
                    <td className={styles.blockTitle} colSpan={3}>
                      3.5 Differentiated Service Delivery
                    </td>
                  </tr>
                  <tr>
                    <td>Established</td>
                    <td className={styles.textBox}>
                      <span>HV03-033</span>
                      <div
                        onClick={() => openLinelist('HV03-033')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.established}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Not Established</td>
                    <td className={styles.textBox}>
                      <span>HV03-034</span>
                      <div
                        onClick={() => openLinelist('HV03-034')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.not_established}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Community</td>
                    <td className={styles.textBox}>
                      <span>HV03-035</span>
                      <div
                        onClick={() => openLinelist('HV03-035')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.community}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Facility</td>
                    <td className={styles.textBox}>
                      <span>HV03-036</span>
                      <div
                        onClick={() => openLinelist('HV03-036')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.facility}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <hr className={styles.divider} />
            </div>
            <div className={styles.flexColumn}>
              <table className={styles.block}>
                <tbody>
                  <tr>
                    <td className={styles.blockTitle} colSpan={3}>
                      3.6 Nutrition and HIV
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.groupTitle} colSpan={3}>
                      Number SAM +
                    </td>
                  </tr>
                  <tr>
                    <td>0-5Months</td>
                    <td className={styles.textBox}>
                      <span>HV03-037</span>
                      <div
                        onClick={() => openLinelist('HV03-037')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_sam_0_5_months}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>6-59Months</td>
                    <td className={styles.textBox}>
                      <span>HV03-038</span>
                      <div
                        onClick={() => openLinelist('HV03-038')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_sam_6_59_months}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>5-9Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-039</span>
                      <div
                        onClick={() => openLinelist('HV03-039')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_sam_5_9_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>10-17Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-040</span>
                      <div
                        onClick={() => openLinelist('HV03-040')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_sam_10_17_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>18+Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-041</span>
                      <div
                        onClick={() => openLinelist('HV03-041')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_sam_18_and_above_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Pregnant & Lactating</td>
                    <td className={styles.textBox}>
                      <span>HV03-042</span>
                      <div
                        onClick={() => openLinelist('HV03-042')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_sam_preg_lact}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div></div>
              <table className={styles.block}>
                <tbody>
                  <tr>
                    <td className={styles.groupTitle} colSpan={3}>
                      Number MAM +
                    </td>
                  </tr>
                  <tr>
                    <td>0-5Months</td>
                    <td className={styles.textBox}>
                      <span>HV03-043</span>
                      <div
                        onClick={() => openLinelist('HV03-043')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_smm_0_5_months}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>6-59Months</td>
                    <td className={styles.textBox}>
                      <span>HV03-044</span>
                      <div
                        onClick={() => openLinelist('HV03-044')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_smm_6_59_months}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>5-9Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-045</span>
                      <div
                        onClick={() => openLinelist('HV03-045')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_smm_5_9_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>10-17Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-046</span>
                      <div
                        onClick={() => openLinelist('HV03-046')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_smm_10_17_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>18+Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-047</span>
                      <div
                        onClick={() => openLinelist('HV03-047')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_smm_18_and_above_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Pregnant & Lactating</td>
                    <td className={styles.textBox}>
                      <span>HV03-048</span>
                      <div
                        onClick={() => openLinelist('HV03-048')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.has_smm_preg_lact}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div></div>
              <table className={styles.block}>
                <tbody>
                  <tr>
                    <td className={styles.groupTitle} colSpan={3}>
                      Number SAM + receiving therapeutic foods
                    </td>
                  </tr>
                  <tr>
                    <td>0-5Months</td>
                    <td className={styles.textBox}>
                      <span>HV03-049</span>
                      <div
                        onClick={() => openLinelist('HV03-049')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_acute_supp_0_5_months}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>6-59Months</td>
                    <td className={styles.textBox}>
                      <span>HV03-050</span>
                      <div
                        onClick={() => openLinelist('HV03-050')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_acute_supp_6_59_months}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>5-9Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-051</span>
                      <div
                        onClick={() => openLinelist('HV03-051')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_acute_supp_5_9_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>10-17Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-052</span>
                      <div
                        onClick={() => openLinelist('HV03-052')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_acute_supp_10_17_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>18+Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-053</span>
                      <div
                        onClick={() => openLinelist('HV03-053')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_acute_supp_18_and_above_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Pregnant & Lactating</td>
                    <td className={styles.textBox}>
                      <span>HV03-054</span>
                      <div
                        onClick={() => openLinelist('HV03-054')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_acute_supp_preg_lact}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div></div>
              <table className={styles.block}>
                <tbody>
                  <tr>
                    <td className={styles.groupTitle} colSpan={3}>
                      Number MAM + receiving Supplimental foods
                    </td>
                  </tr>
                  <tr>
                    <td>0-5Months</td>
                    <td className={styles.textBox}>
                      <span>HV03-055</span>
                      <div
                        onClick={() => openLinelist('HV03-055')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_moderate_supp_0_5_months}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>6-59Months</td>
                    <td className={styles.textBox}>
                      <span>HV03-056</span>
                      <div
                        onClick={() => openLinelist('HV03-056')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_moderate_supp_6_59_months}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>5-9Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-057</span>
                      <div
                        onClick={() => openLinelist('HV03-057')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_moderate_supp_5_9_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>10-17Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-058</span>
                      <div
                        onClick={() => openLinelist('HV03-058')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_moderate_supp_10_17_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>18+Years</td>
                    <td className={styles.textBox}>
                      <span>HV03-059</span>
                      <div
                        onClick={() => openLinelist('HV03-059')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_moderate_supp_18_and_above_years}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Pregnant & Lactating</td>
                    <td className={styles.textBox}>
                      <span>HV03-060</span>
                      <div
                        onClick={() => openLinelist('HV03-060')}
                        className={styles.rectangle}
                        title="Click to open linelist"
                      >
                        {MOH731Data.severe_moderate_supp_preg_lact}
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {footer}
        </div>
        <div className={classNames(`${styles.flexColumn}`, `${styles.borderLeft}`)}>
          <table className={styles.block}>
            <tbody>
              <tr>
                {/* Not reported yet: the earlier figures were misleading, so each box
                    shows - until this section's queries are corrected */}
                <td className={styles.blockTitle} colSpan={3}>
                  3.7 HIV in TB Clinic
                </td>
              </tr>
              <tr>
                <td>TB cases_New</td>
                <td className={styles.textBox}>
                  <span>HV03-061</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  TB_New_Known HIV
                  <br />
                  Positive(KPs)
                </td>
                <td className={styles.textBox}>
                  <span>HV03-062</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>TB_New HIV Positive</td>
                <td className={styles.textBox}>
                  <span>HV03-063</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  TB_New_Known HIV
                  <br />
                  Positive(KP) on HAART
                </td>
                <td className={styles.textBox}>
                  <span>HV03-064</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>TB New_Start_HAART</td>
                <td className={styles.textBox}>
                  <span>HV03-065</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          {/* Not reported by the system yet, so each box shows - */}
          <h5 className={styles.columnHeader}>4. Medical Male Circumcision</h5>
          <table className={styles.block}>
            <tbody>
              <tr>
                <td className={styles.blockTitle} colSpan={3}>
                  4.1 Number circumcised
                </td>
              </tr>
              <tr>
                <td>Circumcised_0-60 days</td>
                <td className={styles.textBox}>
                  <span>HV04-01</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Circumcised_61 days -9 yrs</td>
                <td className={styles.textBox}>
                  <span>HV04-02</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Circumcised_10-14</td>
                <td className={styles.textBox}>
                  <span>HV04-03</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Circumcised_15 +</td>
                <td className={styles.textBox}>
                  <span>HV04-04</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <hr className={styles.divider} />
          <table className={styles.block}>
            <tbody>
              <tr>
                <td className={styles.spaceAfter}>Tested_ HIV+</td>
                <td className={styles.textBox}>
                  <span>HV04-05</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td className={styles.spaceAfter}>Tested_ HIV-</td>
                <td className={styles.textBox}>
                  <span>HV04-06</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <hr className={styles.divider} />
          <table className={styles.block}>
            <tbody>
              <tr>
                <td className={styles.blockTitle} colSpan={3}>
                  4.2 Type of circumcission
                </td>
              </tr>
              <tr>
                <td>Surgical</td>
                <td className={styles.textBox}>
                  <span>HV04-07</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Devices</td>
                <td className={styles.textBox}>
                  <span>HV04-08</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <hr className={styles.divider} />
          <table className={styles.block}>
            <tbody>
              <tr>
                <td className={styles.blockTitle} colSpan={3}>
                  4.3 Circumcission Adverse Events
                </td>
              </tr>
              <tr>
                <td>AE_During_Moderate</td>
                <td className={styles.textBox}>
                  <span>HV04-09</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>AE_During_Severe</td>
                <td className={styles.textBox}>
                  <span>HV04-10</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <hr className={styles.divider} />
          <table className={styles.block}>
            <tbody>
              <tr>
                <td className={styles.spaceAfter}>AE_Post_Moderate</td>
                <td className={styles.textBox}>
                  <span>HV04-11</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td className={styles.spaceAfter}>AE_Post_Severe</td>
                <td className={styles.textBox}>
                  <span>HV04-12</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <hr className={styles.divider} />
          <table className={styles.block}>
            <tbody>
              <tr>
                <td className={styles.spaceAfter}>Follow up visit &lt; 14d</td>
                <td className={styles.textBox}>
                  <span>HV04-13</span>
                  <div className={styles.rectangle}>-</div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <h5 className={styles.columnHeader}>5.Post Exposure Prophylaxis</h5>
          <table className={styles.block}>
            <tbody>
              <tr>
                <td>Exposed_Occupational</td>
                <td className={styles.textBox}>
                  <span>HV05-01</span>
                  <div
                    onClick={() => openLinelist('HV05-01')}
                    className={styles.rectangle}
                    title="Click to open linelist"
                  >
                    {MOH731Data.exposed_occupational}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Exposed Other</td>
                <td className={styles.textBox}>
                  <span>HV05-02</span>
                  <div
                    onClick={() => openLinelist('HV05-02')}
                    className={styles.rectangle}
                    title="Click to open linelist"
                  >
                    {MOH731Data.exposed_non_occupational}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>PEP_Occupational</td>
                <td className={styles.textBox}>
                  <span>HV05-03</span>
                  <div
                    onClick={() => openLinelist('HV05-03')}
                    className={styles.rectangle}
                    title="Click to open linelist"
                  >
                    {MOH731Data.pep_occupational}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>PEP_Other</td>
                <td className={styles.textBox}>
                  <span>HV05-04</span>
                  <div
                    onClick={() => openLinelist('HV05-04')}
                    className={styles.rectangle}
                    title="Click to open linelist"
                  >
                    {MOH731Data.pep_non_occupational}
                  </div>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HivAndTBTreatmentComponent;
