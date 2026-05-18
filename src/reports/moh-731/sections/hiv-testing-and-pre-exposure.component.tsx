import React from 'react';

import styles from '../moh-731.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

interface HivTestingandPreExposusreProphylaxisProps {
  MOH731Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const HivTestingandPreExposusreProphylaxis: React.FC<HivTestingandPreExposusreProphylaxisProps> = ({
  MOH731Data,
  startDate,
  endDate,
  locationUuids,
}) => {
  const navigate = useNavigate();

  const navigateToRegister = (indicator: string, gender: string) => {
    navigate(
      `/moh-366-register?startDate=${startDate}&endDate=${endDate}&locationUuids=${locationUuids}&indicator=${indicator}&gender=${gender}`,
    );
  };

  const navigateToPrepRegister = (indicator: string, gender: string) => {
    navigate(
      `/prep-register?startDate=${startDate}&endDate=${endDate}&locationUuids=${locationUuids}&indicator=${indicator}&gender=${gender}`,
    );
  };
  return (
    <table>
      <tbody>
        <div className={styles.flexRow}>
          <div className={styles.flexColumn}>
            <tr>
              <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                1.1 HIV Tests
              </td>
            </tr>
            <tr>
              <td className={styles.emptyColumn}></td>
              <td className={styles.subTitle}>Male</td>
              <td className={styles.subTitle} style={{ paddingLeft: '60px' }}>
                Female(Including <br /> PMTCT)
              </td>
            </tr>
            <tr>
              <td>Tests</td>
              <td className={styles.textBox}>
                <span>HV01-01</span>
                <div onClick={() => navigateToRegister('hiv_male', 'M')} className={styles.rectangle}>
                  {MOH731Data.hiv_male}
                </div>
              </td>
              <td>
                <div className={classNames(styles.textBox, styles.textBox2)}>
                  <span>HV01-02</span>
                  <div onClick={() => navigateToRegister('hiv_female', 'F')} className={styles.rectangle}>
                    {MOH731Data.hiv_female}
                  </div>
                </div>
              </td>
            </tr>
            <tr className={styles.margin}>
              <td>Tests_Facility</td>
              <td className={styles.textBox}>
                <span>HV01-03</span>
                <div onClick={() => navigateToRegister('hiv_setting_facility', '')} className={styles.rectangle}>
                  {MOH731Data.hiv_setting_facility}
                </div>
              </td>
            </tr>
            <tr>
              <td>Tests_Community</td>
              <td className={styles.textBox}>
                <span>HV01-04</span>
                <div onClick={() => navigateToRegister('hiv_setting_community', '')} className={styles.rectangle}>
                  {MOH731Data.hiv_setting_community}
                </div>
              </td>
            </tr>
            <tr>
              <td>Tested KVP</td>
              <td className={styles.textBox}>
                <span>HV01-05</span>
                <div onClick={() => navigateToRegister('hiv_setting_kvp', '')} className={styles.rectangle}>
                  {MOH731Data.hiv_setting_kvp}
                </div>
              </td>
            </tr>
            ____________________________________________________________________
            <tr>
              <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                1.3 No. Initiated on PrEP(NEW)
              </td>
            </tr>
            <tr>
              <td className={styles.emptyColumn}></td>
              <td className={styles.subTitle}>Male</td>
              <td className={styles.subTitle} style={{ paddingLeft: '60px' }}>
                Female
              </td>
            </tr>
            <tr>
              <td>General popn</td>
              <td className={styles.textBox}>
                <span>HV01-19</span>
                <div
                  onClick={() => navigateToPrepRegister('prep_new_male_general_pop', 'M')}
                  className={styles.rectangle}
                >
                  {MOH731Data.prep_new_male_general_pop}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-20</span>
                  <div
                    onClick={() => navigateToPrepRegister('prep_new_female_general_pop', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.prep_new_female_general_pop}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>MSM/MSW</td>
              <td className={styles.textBox}>
                <span>HV01-21</span>
                <div onClick={() => navigateToPrepRegister('prep_new_msm', 'M')} className={styles.rectangle}>
                  {MOH731Data.prep_new_msm}
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>FSW</td>
              <td></td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-22</span>
                  <div onClick={() => navigateToPrepRegister('prep_new_fsw', 'F')} className={styles.rectangle}>
                    {MOH731Data.prep_new_fsw}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>PWID/PWUD</td>
              <td className={styles.textBox}>
                <span>HV01-23</span>
                <div onClick={() => navigateToPrepRegister('prep_new_pwud_male', 'M')} className={styles.rectangle}>
                  {MOH731Data.prep_new_pwud_male}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-24</span>
                  <div onClick={() => navigateToPrepRegister('prep_new_pwud_female', 'F')} className={styles.rectangle}>
                    {MOH731Data.prep_new_pwud_female}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Discordant Couple</td>
              <td className={styles.textBox}>
                <span>HV01-25</span>
                <div
                  onClick={() => navigateToPrepRegister('prep_new_discordant_male', 'M')}
                  className={styles.rectangle}
                >
                  {MOH731Data.prep_new_discordant_male}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-26</span>
                  <div
                    onClick={() => navigateToPrepRegister('prep_new_discordant_female', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.prep_new_discordant_female}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Vulnerable Pop.</td>
              <td className={styles.textBox}>
                <span>HV01-27</span>
                <div
                  onClick={() => navigateToPrepRegister('prep_new_vulnerable_male', 'M')}
                  className={styles.rectangle}
                >
                  {MOH731Data.prep_new_vulnerable_male}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-28</span>
                  <div
                    onClick={() => navigateToPrepRegister('prep_new_vulnerable_female', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.prep_new_vulnerable_female}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>AYP (10-24yrs)</td>
              <td className={styles.textBox}>
                <span>HV01-29</span>
                <div onClick={() => navigateToPrepRegister('prep_new_ayp', 'F')} className={styles.rectangle}>
                  {MOH731Data.prep_new_ayp}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-30</span>
                  <div onClick={() => navigateToPrepRegister('prep_new_ayp', 'F')} className={styles.rectangle}>
                    {MOH731Data.prep_new_ayp}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Pregnant and breastfeeding women</td>
              <td></td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-31</span>
                  <div
                    onClick={() => navigateToPrepRegister('prep_new_preg_breastfeeding', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.prep_new_preg_breastfeeding}
                  </div>
                </div>
              </td>
            </tr>
            ____________________________________________________________________
            <tr>
              <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                1.5 No. Seroconverted while on PrEP
              </td>
            </tr>
            <tr>
              <td className={styles.emptyColumn}></td>
              <td className={styles.subTitle}>Male</td>
              <td className={styles.subTitle} style={{ paddingLeft: '60px' }}>
                Female
              </td>
            </tr>
            <tr>
              <td>HIV Positive</td>
              <td className={styles.textBox}>
                <span>HV01-45</span>
                <div onClick={() => navigateToPrepRegister('seroconverted_male', 'M')} className={styles.rectangle}>
                  {MOH731Data.seroconverted_male}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-46</span>
                  <div onClick={() => navigateToPrepRegister('seroconverted_female', 'F')} className={styles.rectangle}>
                    {MOH731Data.seroconverted_female}
                  </div>
                </div>
              </td>
            </tr>
            ____________________________________________________________________
          </div>
          <div className={styles.flexColumn}>
            <tr>
              <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                1.2 HIV Positive Results
              </td>
            </tr>
            <tr>
              <td className={styles.emptyColumn}></td>
              <td className={styles.subTitle}>Male</td>
              <td className={styles.subTitle} style={{ paddingLeft: '60px' }}>
                Female
              </td>
            </tr>
            <tr>
              <td>Positive_2-9</td>
              <td className={styles.textBox}>
                <span>HV01-06</span>
                <div onClick={() => navigateToRegister('male_2_9', 'M')} className={styles.rectangle}>
                  {MOH731Data.male_2_9}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-07</span>
                  <div onClick={() => navigateToRegister('female_2_9', 'F')} className={styles.rectangle}>
                    {MOH731Data.female_2_9}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Positive_10-14</td>
              <td className={styles.textBox}>
                <span>HV01-08</span>
                <div onClick={() => navigateToRegister('male_10_14', 'M')} className={styles.rectangle}>
                  {MOH731Data.male_10_14}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-09</span>
                  <div onClick={() => navigateToRegister('female_10_14', 'F')} className={styles.rectangle}>
                    {MOH731Data.female_10_14}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Positive_15-19</td>
              <td className={styles.textBox}>
                <span>HV01-10</span>
                <div onClick={() => navigateToRegister('male_15_19', 'M')} className={styles.rectangle}>
                  {MOH731Data.male_15_19}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-11</span>
                  <div onClick={() => navigateToRegister('female_15_19', 'F')} className={styles.rectangle}>
                    {MOH731Data.female_15_19}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Positive_20-24</td>
              <td className={styles.textBox}>
                <span>HV01-12</span>
                <div onClick={() => navigateToRegister('male_20_24', 'M')} className={styles.rectangle}>
                  {MOH731Data.male_20_24}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-13</span>
                  <div onClick={() => navigateToRegister('female_20_24', 'F')} className={styles.rectangle}>
                    {MOH731Data.female_20_24}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Positive_25+</td>
              <td className={styles.textBox}>
                <span>HV01-14</span>
                <div onClick={() => navigateToRegister('male_25_above', 'M')} className={styles.rectangle}>
                  {MOH731Data.male_25_above}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-15</span>
                  <div onClick={() => navigateToRegister('female_25_above', 'F')} className={styles.rectangle}>
                    {MOH731Data.female_25_above}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Positive_KVP</td>
              <td className={styles.textBox}>
                <span>HV01-16</span>
                <div className={styles.rectangle}></div>
              </td>
            </tr>
            <tr style={{ paddingTop: '10px', paddingBottom: '10px' }}>
              <td>Discordant</td>
              <td className={styles.textBox}>
                <span>HV01-17</span>
                <div className={styles.rectangle}></div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-18</span>
                  <div className={styles.rectangle}></div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Inconclusive Test Results</td>
              <td className={styles.textBox}>
                <span>HV01-47</span>
                <div className={styles.rectangle}></div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-48</span>
                  <div className={styles.rectangle}></div>
                </div>
              </td>
            </tr>
            ____________________________________________________________________
            <tr>
              <td className={styles.spaceAfter} style={{ fontWeight: 'bold' }}>
                1.4 No. on PrEP Diagnosed with STI
              </td>
            </tr>
            <tr>
              <td className={styles.emptyColumn}></td>
              <td className={styles.subTitle}>Male</td>
              <td className={styles.subTitle} style={{ paddingLeft: '60px' }}>
                Female
              </td>
            </tr>
            <tr>
              <td>General popn</td>
              <td className={styles.textBox}>
                <span>HV01-32</span>
                <div
                  onClick={() => navigateToPrepRegister('prep_sti_male_general_pop', 'M')}
                  className={styles.rectangle}
                >
                  {MOH731Data.prep_sti_male_general_pop}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-33</span>
                  <div
                    onClick={() => navigateToPrepRegister('prep_sti_female_general_pop', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.prep_sti_female_general_pop}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>MSM/MSW</td>
              <td className={styles.textBox}>
                <span>HV01-34</span>
                <div onClick={() => navigateToPrepRegister('prep_sti_msm', 'M')} className={styles.rectangle}>
                  {MOH731Data.prep_sti_msm}
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>FSW</td>
              <td className={styles.textBox}>
                <span>HV01-35</span>
                <div onClick={() => navigateToPrepRegister('prep_sti_fsw', 'F')} className={styles.rectangle}>
                  {MOH731Data.prep_sti_fsw}
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>PWID/PWUD</td>
              <td className={styles.textBox}>
                <span>HV01-36</span>
                <div onClick={() => navigateToPrepRegister('prep_sti_pwud_male', 'M')} className={styles.rectangle}>
                  {MOH731Data.prep_sti_pwud_male}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-37</span>
                  <div onClick={() => navigateToPrepRegister('prep_sti_pwud_female', 'F')} className={styles.rectangle}>
                    {MOH731Data.prep_sti_pwud_female}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Discordant Couple</td>
              <td className={styles.textBox}>
                <span>HV01-38</span>
                <div
                  onClick={() => navigateToPrepRegister('prep_sti_discordant_male', 'M')}
                  className={styles.rectangle}
                >
                  {MOH731Data.prep_sti_discordant_male}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-39</span>
                  <div
                    onClick={() => navigateToPrepRegister('prep_sti_discordant_female', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.prep_sti_discordant_female}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Vulnerable Pop.</td>
              <td className={styles.textBox}>
                <span>HV01-40</span>
                <div
                  onClick={() => navigateToPrepRegister('prep_sti_vulnerable_male', 'M')}
                  className={styles.rectangle}
                >
                  {MOH731Data.prep_sti_vulnerable_male}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-41</span>
                  <div
                    onClick={() => navigateToPrepRegister('prep_sti_vulnerable_female', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.prep_sti_vulnerable_female}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>AYP(10-24 yrs)</td>
              <td className={styles.textBox}>
                <span>HV01-42</span>
                <div onClick={() => navigateToPrepRegister('prep_sti_ayp', 'F')} className={styles.rectangle}>
                  {MOH731Data.prep_sti_ayp}
                </div>
              </td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-43</span>
                  <div onClick={() => navigateToPrepRegister('prep_sti_ayp', 'F')} className={styles.rectangle}>
                    {MOH731Data.prep_sti_ayp}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Pregnant and breastfeeding women</td>
              <td></td>
              <td>
                <div className={classNames(`${styles.textBox}`, `${styles.textBox2}`)}>
                  <span>HV01-44</span>
                  <div
                    onClick={() => navigateToPrepRegister('prep_sti_preg_breastfeeding', 'F')}
                    className={styles.rectangle}
                  >
                    {MOH731Data.prep_sti_preg_breastfeeding}
                  </div>
                </div>
              </td>
            </tr>
            ____________________________________________________________________
          </div>
        </div>
      </tbody>
    </table>
  );
};

export default HivTestingandPreExposusreProphylaxis;
