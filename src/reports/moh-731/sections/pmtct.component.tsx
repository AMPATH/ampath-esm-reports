import React from 'react';

import styles from '../moh-731.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

interface PmtctComponentProps {
  MOH731Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const PmtctComponent: React.FC<PmtctComponentProps> = ({ MOH731Data, startDate, endDate, locationUuids }) => {
  const navigate = useNavigate();

  const navigateToRegister = (indicator: string, gender: string) => {
    navigate(
      `/moh-366-register?startDate=${startDate}&endDate=${endDate}&locationUuids=${locationUuids}&indicator=${indicator}&gender=${gender}`,
    );
  };
  return (
    <>
      <table>
        <tbody>
          <div className={styles.flexRow}>
            <div className={styles.flexColumn}>
              <tr>
                <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                  2.1 Maternal HIV Testing
                </td>
              </tr>
              <tr>
                <td>Known Positive at 1st ANC</td>
                <td className={styles.textBox}>
                  <span>HV02-01</span>
                  <div onClick={() => navigateToRegister('known_positive_1st_anc', 'F')} className={styles.rectangle}>
                    {MOH731Data.known_positive_1st_anc}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td style={{ fontWeight: 'bold' }}>Initial</td>
                <td style={{ paddingLeft: '60px', fontWeight: 'bold' }}>Retest</td>
              </tr>
              <tr>
                <td>Tested at ANC</td>
                <td className={styles.textBox}>
                  <span>HV02-02</span>
                  <div onClick={() => navigateToRegister('initial_test_anc', 'F')} className={styles.rectangle}>
                    {MOH731Data.initial_test_anc}
                  </div>
                </td>
                <td>
                  <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                    <span>HV02-03</span>
                    <div onClick={() => navigateToRegister('retest_anc', 'F')} className={styles.rectangle}>
                      {MOH731Data.retest_anc}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tested at L&D</td>
                <td className={styles.textBox}>
                  <span>HV02-04</span>
                  <div onClick={() => navigateToRegister('initial_test_LD', 'F')} className={styles.rectangle}>
                    {MOH731Data.initial_test_LD}
                  </div>
                </td>
                <td>
                  <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                    <span>HV02-05</span>
                    <div onClick={() => navigateToRegister('retest_LD', 'F')} className={styles.rectangle}>
                      {MOH731Data.retest_LD}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tested at PNC_&le;6weeks</td>
                <td className={styles.textBox}>
                  <span>HV02-06</span>
                  <div
                    onClick={() => navigateToRegister('initial_test_pnc_less_6_weeks', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.initial_test_pnc_less_6_weeks}
                  </div>
                </td>
                <td>
                  <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                    <span>HV02-07</span>
                    <div
                      onClick={() => navigateToRegister('retest_pnc_less_6_weeks', 'F')}
                      className={styles.rectangle}
                    >
                      {MOH731Data.retest_pnc_less_6_weeks}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tested at PNC_&gt;6weeks</td>
                <td className={styles.textBox}>
                  <span>HV02-08</span>
                  <div
                    onClick={() => navigateToRegister('initial_test_pnc_greater_6_weeks', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.initial_test_pnc_greater_6_weeks}
                  </div>
                </td>
                <td>
                  <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                    <span>HV02-09</span>
                    <div
                      onClick={() => navigateToRegister('retest_pnc_greater_6_weeks', 'F')}
                      className={styles.rectangle}
                    >
                      {MOH731Data.retest_pnc_greater_6_weeks}
                    </div>
                  </div>
                </td>
              </tr>
              ____________________________________________________________________
              <tr>
                <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                  2.2 HIV Positive Results
                </td>
              </tr>
              <tr>
                <td>Tested at ANC</td>
                <td className={styles.textBox}>
                  <span>HV02-10</span>
                  <div onClick={() => navigateToRegister('positive_anc', 'F')} className={styles.rectangle}>
                    {MOH731Data.positive_anc}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Tested at L&D</td>
                <td className={styles.textBox}>
                  <span>HV02-11</span>
                  <div onClick={() => navigateToRegister('positive_LD', 'F')} className={styles.rectangle}>
                    {MOH731Data.positive_LD}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Tested at PNC_&le;6weeks</td>
                <td className={styles.textBox}>
                  <span>HV02-12</span>
                  <div
                    onClick={() => navigateToRegister('positive_pnc_less_6_weeks', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.positive_pnc_less_6_weeks}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Tested at PNC_&gt;6weeks</td>
                <td className={styles.textBox}>
                  <span>HV02-13</span>
                  <div
                    onClick={() => navigateToRegister('positive_pnc_greater_6_weeks', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.positive_pnc_greater_6_weeks}
                  </div>
                </td>
                <td></td>
              </tr>
              ____________________________________________________________________
              <tr>
                <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                  2.3 Maternal HAART
                </td>
              </tr>
              <tr>
                <td>On HAART at 1st ANC</td>
                <td className={styles.textBox}>
                  <span>HV02-14</span>
                  <div onClick={() => navigateToRegister('maternal_haart_1st_anc', 'F')} className={styles.rectangle}>
                    {MOH731Data.maternal_haart_1st_anc}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Start HAART_ANC</td>
                <td className={styles.textBox}>
                  <span>HV02-15</span>
                  <div
                    onClick={() => navigateToRegister('start_maternal_haart_1st_anc', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.start_maternal_haart_1st_anc}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Start HAART_L&D</td>
                <td className={styles.textBox}>
                  <span>HV02-16</span>
                  <div onClick={() => navigateToRegister('start_maternal_haart_LD', 'F')} className={styles.rectangle}>
                    {MOH731Data.start_maternal_haart_LD}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Start HAART_PNC_&le;6weeks</td>
                <td className={styles.textBox}>
                  <span>HV02-17</span>
                  <div
                    onClick={() => navigateToRegister('maternal_haart_less_6_weeks', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.maternal_haart_less_6_weeks}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Start HAART_PNC_&gt;6weeks</td>
                <td className={styles.textBox}>
                  <span>HV02-18</span>
                  <div
                    onClick={() => navigateToRegister('maternal_haart_more_6_weeks', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.maternal_haart_more_6_weeks}
                  </div>
                </td>
                <td></td>
              </tr>
              ____________________________________________________________________
            </div>
            <div className={styles.flexColumn}>
              <tr>
                <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                  2.4 HBV Screening at ANC
                </td>
              </tr>
              <tr>
                <td>Screened_HBV_ANC</td>
                <td className={styles.textBox}>
                  <span>HV02-19</span>
                  <div className={styles.rectangle}></div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>HBV Screened_Positive</td>
                <td className={styles.textBox}>
                  <span>HV02-20</span>
                  <div
                    onClick={() => navigateToRegister('hbv_screened_positive_anc', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.hbv_screened_positive_anc}
                  </div>
                </td>
                <td></td>
              </tr>
              ____________________________________________________________________
              <tr>
                <td style={{ fontWeight: 'bold' }}>
                  2.5 Adolescents girls & Young Women (10-24 Yrs)
                  <br />
                  testing & results
                </td>
              </tr>
              <tr>
                <td></td>
                <td>10-19yrs</td>
                <td style={{ paddingLeft: '60px' }}>20-24yrs</td>
              </tr>
              <tr>
                <td>1st ANC KP</td>
                <td className={styles.textBox}>
                  <span>HV02-21</span>
                  <div onClick={() => navigateToRegister('known_positive_anc_10_19', 'F')} className={styles.rectangle}>
                    {MOH731Data.known_positive_anc_10_19}
                  </div>
                </td>
                <td>
                  <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                    <span>HV02-22</span>
                    <div
                      onClick={() => navigateToRegister('known_positive_anc_20_24', 'F')}
                      className={styles.rectangle}
                    >
                      {MOH731Data.known_positive_anc_20_24}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>New HIV Positive</td>
                <td className={styles.textBox}>
                  <span>HV02-23</span>
                  <div
                    onClick={() => navigateToRegister('positive_anc_ld_pnc_10_19', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.positive_anc_ld_pnc_10_19}
                  </div>
                </td>
                <td>
                  <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                    <span>HV02-24</span>
                    <div
                      onClick={() => navigateToRegister('positive_anc_ld_pnc_20_24', 'F')}
                      className={styles.rectangle}
                    >
                      {MOH731Data.positive_anc_ld_pnc_20_24}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>On HAART 1st ANC KP</td>
                <td className={styles.textBox}>
                  <span>HV02-25</span>
                  <div onClick={() => navigateToRegister('on_art_anc_10_19', 'F')} className={styles.rectangle}>
                    {MOH731Data.on_art_anc_10_19}
                  </div>
                </td>
                <td>
                  <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                    <span>HV02-26</span>
                    <div onClick={() => navigateToRegister('on_art_anc_20_24', 'F')} className={styles.rectangle}>
                      {MOH731Data.on_art_anc_20_24}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Started HAART New</td>
                <td className={styles.textBox}>
                  <span>HV02-27</span>
                  <div onClick={() => navigateToRegister('start_art_10_19', 'F')} className={styles.rectangle}>
                    {MOH731Data.start_art_10_19}
                  </div>
                </td>
                <td>
                  <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                    <span>HV02-28</span>
                    <div onClick={() => navigateToRegister('start_art_20_24', 'F')} className={styles.rectangle}>
                      {MOH731Data.start_art_20_24}
                    </div>
                  </div>
                </td>
              </tr>
              ____________________________________________________________________
              <tr>
                <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                  2.6 Infant Prophylaxis
                </td>
              </tr>
              <tr>
                <td>Infant ARV Prophylaxis_ANC</td>
                <td className={styles.textBox}>
                  <span>HV02-29</span>
                  <div onClick={() => navigateToRegister('infant_arv_anc', 'F')} className={styles.rectangle}>
                    {MOH731Data.infant_arv_anc}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Infant ARV Prophylaxis_L&D</td>
                <td className={styles.textBox}>
                  <span>HV02-30</span>
                  <div onClick={() => navigateToRegister('infant_arv_ld', 'F')} className={styles.rectangle}>
                    {MOH731Data.infant_arv_ld}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Infant ARV Prophylaxis_L&PNC</td>
                <td className={styles.textBox}>
                  <span>HV02-31</span>
                  <div onClick={() => navigateToRegister('infant_arv_pnc', 'F')} className={styles.rectangle}>
                    {MOH731Data.infant_arv_pnc}
                  </div>
                </td>
                <td></td>
              </tr>
              ____________________________________________________________________
              <tr>
                <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                  2.7 Infant Feeding
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>Below 6 months</td>
              </tr>
              <tr>
                <td>Exclusive Breastfeeding (EBF)</td>
                <td className={styles.textBox}>
                  <span>HV02-32</span>
                  <div onClick={() => navigateToRegister('exclusive_bf', 'F')} className={styles.rectangle}>
                    {MOH731Data.exclusive_bf}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold' }}>6 to 24 months</td>
              </tr>
              <tr>
                <td>Breastfeeding (BF)</td>
                <td className={styles.textBox}>
                  <span>HV02-33</span>
                  <div onClick={() => navigateToRegister('bf', 'F')} className={styles.rectangle}>
                    {MOH731Data.bf}
                  </div>
                </td>
                <td></td>
              </tr>
              <tr>
                <td className={styles.spaceAfter}>Not Breastfeeding (NBF)</td>
                <td className={styles.textBox}>
                  <span>HV02-34</span>
                  <div onClick={() => navigateToRegister('weaning', 'F')} className={styles.rectangle}>
                    {MOH731Data.weaning}
                  </div>
                </td>
                <td></td>
              </tr>
              ____________________________________________________________________
            </div>
          </div>
        </tbody>
      </table>
    </>
  );
};

export default PmtctComponent;
