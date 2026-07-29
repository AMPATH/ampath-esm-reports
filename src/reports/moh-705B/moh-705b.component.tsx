import React, { useState } from 'react';
import styles from './moh-705b.scss';
import { formatDate, useSession } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import { getMoh705b } from '../../resources/moh-705.resource';
import classNames from 'classnames';
import { ReportFiltersComponent, type ReportPeriod, useRestorePeriod } from '../../common/report-filters';
import { showReportError } from '../../common/report-error';
import { hasReportData, ReportPlaceholder } from '../../common/report-placeholder';
import { useNavigate } from 'react-router-dom';
import { ReportSkeleton } from '../../common/report-skeleton';
import { ReportPage } from '../../common/report-page';

const Moh705BComponent: React.FC = () => {
  const [moh705bData, setMoh705bData] = useState<any>([]);
  const isReportGenerated = hasReportData(moh705bData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;
  const navigate = useNavigate();

  /* Masthead and sign-off fill themselves in, as on the other reports */
  const facility = session?.sessionLocation?.display ?? '';
  const reportMonth = startDate ? dayjs(startDate).format('MMMM') : '';
  const reportYear = startDate ? dayjs(startDate).format('YYYY') : '';
  const compiledBy = session?.user?.person?.display ?? session?.user?.display ?? '';
  const compiledOn = formatDate(new Date(), { mode: 'standard', time: false, noToday: true });

  const fetchMoh705bReportData = async ({ startDate, endDate }: ReportPeriod) => {
    setIsLoading(true);
    setStartDate(startDate);
    setEndDate(endDate);

    const params = {
      locationUuids: locationUuids || '',
      startDate,
      endDate,
    };
    try {
      const data = await getMoh705b(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh705bData(flatData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showReportError('the MOH-705B report', error);
    }
  };

  /* A register's breadcrumb links back here with the period it was opened
     for, so the report comes back showing the figures rather than the
     placeholder. */
  useRestorePeriod(fetchMoh705bReportData);

  const navigateToRegister = (indicator: string) => {
    navigate(
      `/moh-204b?startDate=${startDate}&endDate=${endDate}&locationUuids=${locationUuids}&indicator=${indicator}&from=moh-705b`,
    );
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-705B Report"
        mode="both"
        onGenerate={fetchMoh705bReportData}
        isLoading={isLoading}
        isReportGenerated={isReportGenerated}
        generatedPeriod={{ startDate, endDate }}
      />
      {isLoading && <ReportSkeleton />}
      {!isLoading && !isReportGenerated && <ReportPlaceholder reportName="MOH-705B" />}
      {!isLoading && isReportGenerated && (
        <ReportPage>
          <div className={styles.mainTitleBox}>
            <p className={styles.ministry}>Ministry of Health</p>
            <h3 className={styles.reportTitle}>KHIS Aggregate</h3>
          </div>

          <p className={styles.location}>
            <span>
              Facility Name:<span className={styles.line}>{facility}</span>
            </span>
            <span>
              County:
              <span className={styles.line} />
            </span>
            <span>
              Sub County:
              <span className={styles.line} />
            </span>
            <span>
              Month:<span className={styles.shortLine}>{reportMonth}</span>
            </span>
            <span>
              Year:<span className={styles.shortLine}>{reportYear}</span>
            </span>
          </p>

          <div className={styles.container}>
            <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
              <thead>
                <tr>
                  <th colSpan={2}>DISEASES (New Cases Only)</th>
                  <th>Number of Cases</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Diarrhoea</td>
                  <td onClick={() => navigateToRegister('diarrhoea')}>{moh705bData.diarrhoea}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Tuberculosis</td>
                  <td onClick={() => navigateToRegister('tuberculosis')}>{moh705bData.tuberculosis}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Dysentry (Bloody diarrhoea)</td>
                  <td onClick={() => navigateToRegister('dysentry')}>{moh705bData.dysentry}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Cholera</td>
                  <td onClick={() => navigateToRegister('cholera')}>{moh705bData.cholera}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Meningococcal Meningitis</td>
                  <td onClick={() => navigateToRegister('meningococcal_meningitis')}>
                    {moh705bData.meningococcal_meningitis}
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Other Meningitis</td>
                  <td onClick={() => navigateToRegister('other_meningitis')}>{moh705bData.other_meningitis}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Tetanus</td>
                  <td onClick={() => navigateToRegister('tetanus')}>{moh705bData.tetanus}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Poliomyelitis (AFP)</td>
                  <td onClick={() => navigateToRegister('poliomyelitis')}>{moh705bData.poliomyelitis}</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Chicken Pox</td>
                  <td onClick={() => navigateToRegister('chicken_pox')}>{moh705bData.chicken_pox}</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Measles</td>
                  <td onClick={() => navigateToRegister('measles')}>{moh705bData.measles}</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Hepatitis</td>
                  <td onClick={() => navigateToRegister('hepatitis')}>{moh705bData.hepatitis}</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Mumps</td>
                  <td onClick={() => navigateToRegister('mumps')}>{moh705bData.mumps}</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>Suspected Malaria</td>
                  <td onClick={() => navigateToRegister('suspected_malaria')}>{moh705bData.suspected_malaria}</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>Confirmed Malaria</td>
                  <td onClick={() => navigateToRegister('confirmed_malaria')}>{moh705bData.confirmed_malaria}</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Malaria in Pregnancy</td>
                  <td onClick={() => navigateToRegister('malaria_in_pregnancy')}>{moh705bData.malaria_in_pregnancy}</td>
                </tr>
                <tr>
                  <td>16</td>
                  <td>Amoebiasis</td>
                  <td onClick={() => navigateToRegister('amoebiasis')}>{moh705bData.amoebiasis}</td>
                </tr>
                <tr>
                  <td>17</td>
                  <td>Typhoid fever</td>
                  <td onClick={() => navigateToRegister('typhoid_fever')}>{moh705bData.typhoid_fever}</td>
                </tr>
                <tr>
                  <td>18</td>
                  <td>Sexually Transmitted Infections</td>
                  <td onClick={() => navigateToRegister('sexually_transmitted_infections')}>
                    {moh705bData.sexually_transmitted_infections}
                  </td>
                </tr>
                <tr>
                  <td>19</td>
                  <td>Urinary Tract Infections</td>
                  <td onClick={() => navigateToRegister('urinary_tract_infections')}>
                    {moh705bData.urinary_tract_infections}
                  </td>
                </tr>
                <tr>
                  <td>20</td>
                  <td>Bilharzia (Schistosomiasis)</td>
                  <td onClick={() => navigateToRegister('bilharzia')}>{moh705bData.bilharzia}</td>
                </tr>
                <tr>
                  <td>21</td>
                  <td>Intestinal worms</td>
                  <td onClick={() => navigateToRegister('intestinal_worms')}>{moh705bData.intestinal_worms}</td>
                </tr>
                <tr>
                  <td>22</td>
                  <td>Malnutrition</td>
                  <td onClick={() => navigateToRegister('malnutrition')}>{moh705bData.malnutrition}</td>
                </tr>
                <tr>
                  <td>23</td>
                  <td>Anaemia</td>
                  <td onClick={() => navigateToRegister('anaemia')}>{moh705bData.anaemia}</td>
                </tr>
                <tr>
                  <td>24</td>
                  <td>Eye Infections/Conditions</td>
                  <td onClick={() => navigateToRegister('eye_infections')}>{moh705bData.eye_infections}</td>
                </tr>
                <tr>
                  <td>25</td>
                  <td>Ear Infections/Conditions</td>
                  <td onClick={() => navigateToRegister('ear_infections')}>{moh705bData.ear_infections}</td>
                </tr>
                <tr>
                  <td>26</td>
                  <td>Upper Respiratory Tract Infections </td>
                  <td onClick={() => navigateToRegister('upper_respiratory_tract_infections')}>
                    {moh705bData.upper_respiratory_tract_infections}
                  </td>
                </tr>
                <tr>
                  <td>27</td>
                  <td>Asthma</td>
                  <td onClick={() => navigateToRegister('asthma')}>{moh705bData.asthma}</td>
                </tr>
                <tr>
                  <td>28</td>
                  <td>Pneumonia</td>
                  <td onClick={() => navigateToRegister('pneumonia')}>{moh705bData.pneumonia}</td>
                </tr>
                <tr>
                  <td>29</td>
                  <td>Other Lower Respiratory tract infections</td>
                  <td onClick={() => navigateToRegister('other_lower_respiratory_tract_infections')}>
                    {moh705bData.other_lower_respiratory_tract_infections}
                  </td>
                </tr>
                <tr>
                  <td>30</td>
                  <td>Abortion</td>
                  <td onClick={() => navigateToRegister('abortion')}>{moh705bData.abortion}</td>
                </tr>
                <tr>
                  <td>31</td>
                  <td>Dis. of Puerperium & Childbirth</td>
                  <td onClick={() => navigateToRegister('puerperium_childbirth')}>
                    {moh705bData.puerperium_childbirth}
                  </td>
                </tr>
                <tr>
                  <td>32</td>
                  <td>Hypertension</td>
                  <td onClick={() => navigateToRegister('hypertention')}>{moh705bData.hypertention}</td>
                </tr>
                <tr>
                  <td>33</td>
                  <td>Mental Disorders</td>
                  <td onClick={() => navigateToRegister('mental_disorders')}>{moh705bData.mental_disorders}</td>
                </tr>
                <tr>
                  <td>34</td>
                  <td>Dental Disorders</td>
                  <td onClick={() => navigateToRegister('dental_disorders')}>{moh705bData.dental_disorders}</td>
                </tr>
                <tr>
                  <td>35</td>
                  <td>Jiggers Infestation</td>
                  <td onClick={() => navigateToRegister('jiggers_infestation')}>{moh705bData.jiggers_infestation}</td>
                </tr>
                <tr>
                  <td>36</td>
                  <td>Disease of the skin</td>
                  <td onClick={() => navigateToRegister('diseases_of_the_skin')}>{moh705bData.diseases_of_the_skin}</td>
                </tr>
                <tr>
                  <td>37</td>
                  <td>Athritis, Joint pains etc.</td>
                  <td onClick={() => navigateToRegister('athritis')}>{moh705bData.athritis}</td>
                </tr>
                <tr>
                  <td>38</td>
                  <td>Poisoning</td>
                  <td onClick={() => navigateToRegister('poisoning')}>{moh705bData.poisoning}</td>
                </tr>
                <tr>
                  <td>39</td>
                  <td>Road Traffic Injuries</td>
                  <td onClick={() => navigateToRegister('road_traffic_injuries')}>
                    {moh705bData.road_traffic_injuries}
                  </td>
                </tr>
                <tr>
                  <td>40</td>
                  <td>Deaths due to Road Traffic Injuries</td>
                  <td onClick={() => navigateToRegister('deaths_due_to_road_traffic_injuries')}>
                    {moh705bData.deaths_due_to_road_traffic_injuries}
                  </td>
                </tr>
                <tr>
                  <td>41</td>
                  <td>Other Injuries</td>
                  <td onClick={() => navigateToRegister('other_injuries')}>{moh705bData.other_injuries}</td>
                </tr>
                <tr>
                  <td>42</td>
                  <td>Sexual Violence</td>
                  <td onClick={() => navigateToRegister('sexual_violence')}>{moh705bData.sexual_violence}</td>
                </tr>
                <tr>
                  <td>43</td>
                  <td>Violence related Injuries</td>
                  <td onClick={() => navigateToRegister('violence_related_injuries')}>
                    {moh705bData.violence_related_injuries}
                  </td>
                </tr>
                <tr>
                  <td>44</td>
                  <td>Burns</td>
                  <td onClick={() => navigateToRegister('burns')}>{moh705bData.burns}</td>
                </tr>
                <tr>
                  <td>45</td>
                  <td>Snake Bites</td>
                  <td onClick={() => navigateToRegister('snake_bites')}>{moh705bData.snake_bites}</td>
                </tr>
                <tr>
                  <td>46</td>
                  <td>Dog Bites</td>
                  <td onClick={() => navigateToRegister('dog_bites')}>{moh705bData.dog_bites}</td>
                </tr>
                <tr>
                  <td>47</td>
                  <td>Other Bites</td>
                  <td onClick={() => navigateToRegister('other_bites')}>{moh705bData.other_bites}</td>
                </tr>
                <tr>
                  <td>48</td>
                  <td>Diabetes</td>
                  <td onClick={() => navigateToRegister('diabetes')}>{moh705bData.diabetes}</td>
                </tr>
                <tr>
                  <td>49</td>
                  <td>Epilepsy</td>
                  <td onClick={() => navigateToRegister('epilepsy')}>{moh705bData.epilepsy}</td>
                </tr>
                <tr>
                  <td>50</td>
                  <td>Brucellosis</td>
                  <td onClick={() => navigateToRegister('brucellosis')}>{moh705bData.brucellosis}</td>
                </tr>
                <tr>
                  <td>51</td>
                  <td>Cardiovascular conditions</td>
                  <td onClick={() => navigateToRegister('cardiovascular_conditions')}>
                    {moh705bData.cardiovascular_conditions}
                  </td>
                </tr>
                <tr>
                  <td>52</td>
                  <td>Central Nervous System Conditions</td>
                  <td onClick={() => navigateToRegister('central_nervous_system_conditions')}>
                    {moh705bData.central_nervous_system_conditions}
                  </td>
                </tr>
                <tr>
                  <td>53</td>
                  <td>Overweight (BMI &gt; 25)</td>
                  <td onClick={() => navigateToRegister('overweight')}>{moh705bData.overweight}</td>
                </tr>
                <tr>
                  <td>54</td>
                  <td>Muscular skeletal conditions</td>
                  <td onClick={() => navigateToRegister('mascular_skeletal_conditions')}>
                    {moh705bData.mascular_skeletal_conditions}
                  </td>
                </tr>
                <tr>
                  <td>55</td>
                  <td>Fistula (Birth related)</td>
                  <td onClick={() => navigateToRegister('fistula')}>{moh705bData.fistula}</td>
                </tr>
                <tr>
                  <td>56</td>
                  <td>Suspected Neoplams/Cancers</td>
                  <td onClick={() => navigateToRegister('suspected_neoplams_cancers')}>
                    {moh705bData.suspected_neoplams_cancers}
                  </td>
                </tr>
                <tr>
                  <td>57</td>
                  <td>Physical Disability</td>
                  <td onClick={() => navigateToRegister('physical_disability')}>{moh705bData.physical_disability}</td>
                </tr>
                <tr>
                  <td>58</td>
                  <td>Trypanosomiasis</td>
                  <td onClick={() => navigateToRegister('trypanosomiasis')}>{moh705bData.trypanosomiasis}</td>
                </tr>
                <tr>
                  <td>59</td>
                  <td>Rift valley fever</td>
                  <td onClick={() => navigateToRegister('rift_valley_fever')}>{moh705bData.rift_valley_fever}</td>
                </tr>
                <tr>
                  <td>60</td>
                  <td>Yellow Fever</td>
                  <td onClick={() => navigateToRegister('yellow_fever')}>{moh705bData.yellow_fever}</td>
                </tr>
                <tr>
                  <td>61</td>
                  <td>Viral Haemorrhagic Fever</td>
                  <td onClick={() => navigateToRegister('viral_haemorrhagic_fever')}>
                    {moh705bData.viral_haemorrhagic_fever}
                  </td>
                </tr>
                <tr>
                  <td>62</td>
                  <td>Chikungunya</td>
                  <td onClick={() => navigateToRegister('chikungunya')}>{moh705bData.chikungunya}</td>
                </tr>
                <tr>
                  <td>63</td>
                  <td>Dengue fever</td>
                  <td onClick={() => navigateToRegister('dengue_fever')}>{moh705bData.dengue_fever}</td>
                </tr>
                <tr>
                  <td>64</td>
                  <td>Leishmaniasis(Kala-azar)</td>
                  <td onClick={() => navigateToRegister('leishmaniasis')}>{moh705bData.leishmaniasis}</td>
                </tr>
                <tr>
                  <td>65</td>
                  <td>Cuteneous leishmaniasis</td>
                  <td onClick={() => navigateToRegister('cutaneous_leishmaniasis')}>
                    {moh705bData.cutaneous_leishmaniasis}
                  </td>
                </tr>
                <tr>
                  <td>66</td>
                  <td>Suspected Anthrax</td>
                  <td onClick={() => navigateToRegister('suspected_anthrax')}>{moh705bData.suspected_anthrax}</td>
                </tr>
                <tr>
                  <td>67</td>
                  <td>ALL OTHER DISEASES</td>
                  <td onClick={() => navigateToRegister('all_other_diseases')}>{moh705bData.all_other_diseases}</td>
                </tr>
                <tr>
                  <td>68</td>
                  <td>Tested for Malaria</td>
                  <td onClick={() => navigateToRegister('tested_for_malaria')}>{moh705bData.tested_for_malaria}</td>
                </tr>
                <tr>
                  <td>69</td>
                  <td>NO. OF FIRST ATTENDANCES</td>
                  <td onClick={() => navigateToRegister('no_of_first_attendances')}>
                    {moh705bData.no_of_first_attendances}
                  </td>
                </tr>
                <tr>
                  <td>70</td>
                  <td>RE-ATTENDANCES</td>
                  <td onClick={() => navigateToRegister('re_attendances')}>{moh705bData.re_attendances}</td>
                </tr>
                <tr>
                  <td>71</td>
                  <td>Referrals from other health facilities</td>
                  <td onClick={() => navigateToRegister('referrals_from_other_health_facility')}>
                    {moh705bData.referrals_from_other_health_facility}
                  </td>
                </tr>
                <tr>
                  <td>72</td>
                  <td>Referrals to other health facilities</td>
                  <td onClick={() => navigateToRegister('referrals_to_other_health_facility')}>
                    {moh705bData.referrals_to_other_health_facility}
                  </td>
                </tr>
                <tr>
                  <td>73</td>
                  <td>Referrals from community unit</td>
                  <td onClick={() => navigateToRegister('referrals_from_community_unit')}>
                    {moh705bData.referrals_from_community_unit}
                  </td>
                </tr>
                <tr>
                  <td>74</td>
                  <td>Referrals to community unit</td>
                  <td onClick={() => navigateToRegister('referrals_to_community_unit')}>
                    {moh705bData.referrals_to_community_unit}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.signOff}>
            <span>
              Compiled by:<span className={styles.line}>{compiledBy}</span>
            </span>
            <span>
              Signature:
              <span className={styles.line} />
            </span>
            <span>
              Date:<span className={styles.shortLine}>{compiledOn}</span>
            </span>
          </div>
        </ReportPage>
      )}
    </>
  );
};
export default Moh705BComponent;
