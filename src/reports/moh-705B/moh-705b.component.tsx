import React, { useState } from 'react';
import styles from './moh-705b.scss';
import { useSession } from '@openmrs/esm-framework';
import { getMoh705b } from '../../resources/moh-705.resource';
import classNames from 'classnames';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';
import { Loading } from '@carbon/react';

const Moh705BComponent: React.FC = () => {
  let errorMessage: string = '';
  const [moh705bData, setMoh705bData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();
  const locationUuids = session?.sessionLocation?.uuid;
  const fetchMoh705bReportData = async (filters: { startDate?: string; endDate?: string; month?: string }) => {
    setIsLoading(true);
    let startDate = filters.startDate;
    let endDate = filters.endDate;

    if (filters.month) {
      const [year, monthIndex] = filters.month.split('-').map(Number);

      const start = new Date(year, monthIndex - 1, 1);
      const end = new Date(year, monthIndex, 0);

      const formatLocalDate = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      startDate = formatLocalDate(start);
      endDate = formatLocalDate(end);
    }

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
      errorMessage = error instanceof Error ? error.message : String(error);
      setIsLoading(false);
      throw new Error(`Failed to fetch MOH-710 report data: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <>
      <ReportFiltersComponent
        reportName="MOH-705B Report"
        mode="monthly"
        onGenerate={fetchMoh705bReportData}
        isLoding={isLoading}
      />
      {isLoading && <Loading description="Fetching data...." />}
      {!isLoading && errorMessage && (
        <div>
          <a href="#" className="close" data-dismiss="alert">
            &times;
          </a>
          <h4>
            <strong>
              <span className="glyphicon glyphicon-warning-sign"></span>{' '}
            </strong>{' '}
            An error occurred while trying to load the report. Please try again.
          </h4>
          <p>
            <small>{errorMessage}</small>
          </p>
        </div>
      )}
      <h3>KHIS Aggregate</h3>
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
              <td>{moh705bData.diarrhoea}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Tuberculosis</td>
              <td>{moh705bData.tuberculosis}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Dysentry (Bloody diarrhoea)</td>
              <td>{moh705bData.dysentry}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Cholera</td>
              <td>{moh705bData.cholera}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Meningococcal Meningitis</td>
              <td>{moh705bData.meningococcal_meningitis}</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Other Meningitis</td>
              <td>{moh705bData.other_meningitis}</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Tetanus</td>
              <td>{moh705bData.tetanus}</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Poliomyelitis (AFP)</td>
              <td>{moh705bData.poliomyelitis}</td>
            </tr>
            <tr>
              <td>9</td>
              <td>Chicken Pox</td>
              <td>{moh705bData.chicken_pox}</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Measles</td>
              <td>{moh705bData.measles}</td>
            </tr>
            <tr>
              <td>11</td>
              <td>Hepatitis</td>
              <td>{moh705bData.hepatitis}</td>
            </tr>
            <tr>
              <td>12</td>
              <td>Mumps</td>
              <td>{moh705bData.mumps}</td>
            </tr>
            <tr>
              <td>13</td>
              <td>Suspected Malaria</td>
              <td>{moh705bData.suspected_malaria}</td>
            </tr>
            <tr>
              <td>14</td>
              <td>Confirmed Malaria</td>
              <td>{moh705bData.confirmed_malaria}</td>
            </tr>
            <tr>
              <td>15</td>
              <td>Malaria in Pregnancy</td>
              <td>{moh705bData.malaria_in_pregnancy}</td>
            </tr>
            <tr>
              <td>16</td>
              <td>Amoebiasis</td>
              <td>{moh705bData.amoebiasis}</td>
            </tr>
            <tr>
              <td>17</td>
              <td>Typhoid fever</td>
              <td>{moh705bData.typhoid_fever}</td>
            </tr>
            <tr>
              <td>18</td>
              <td>Sexually Transmitted Infections</td>
              <td>{moh705bData.sexually_transmitted_infections}</td>
            </tr>
            <tr>
              <td>19</td>
              <td>Urinary Tract Infections</td>
              <td>{moh705bData.urinary_tract_infections}</td>
            </tr>
            <tr>
              <td>20</td>
              <td>Bilharzia (Schistosomiasis)</td>
              <td>{moh705bData.bilharzia}</td>
            </tr>
            <tr>
              <td>21</td>
              <td>Intestinal worms</td>
              <td>{moh705bData.intestinal_worms}</td>
            </tr>
            <tr>
              <td>22</td>
              <td>Malnutrition</td>
              <td>{moh705bData.malnutrition}</td>
            </tr>
            <tr>
              <td>23</td>
              <td>Anaemia</td>
              <td>{moh705bData.anaemia}</td>
            </tr>
            <tr>
              <td>24</td>
              <td>Eye Infections/Conditions</td>
              <td>{moh705bData.eye_infections}</td>
            </tr>
            <tr>
              <td>25</td>
              <td>Ear Infections/Conditions</td>
              <td>{moh705bData.ear_infections}</td>
            </tr>
            <tr>
              <td>26</td>
              <td>Upper Respiratory Tract Infections </td>
              <td>{moh705bData.upper_respiratory_tract_infections}</td>
            </tr>
            <tr>
              <td>27</td>
              <td>Asthma</td>
              <td>{moh705bData.asthma}</td>
            </tr>
            <tr>
              <td>28</td>
              <td>Pneumonia</td>
              <td>{moh705bData.pneumonia}</td>
            </tr>
            <tr>
              <td>29</td>
              <td>Other Lower Respiratory tract infections</td>
              <td>{moh705bData.other_lower_respiratory_tract_infections}</td>
            </tr>
            <tr>
              <td>30</td>
              <td>Abortion</td>
              <td>{moh705bData.abortion}</td>
            </tr>
            <tr>
              <td>31</td>
              <td>Dis. of Puerperium & Childbirth</td>
              <td>{moh705bData.puerperium_childbirth}</td>
            </tr>
            <tr>
              <td>32</td>
              <td>Hypertension</td>
              <td>{moh705bData.hypertention}</td>
            </tr>
            <tr>
              <td>33</td>
              <td>Mental Disorders</td>
              <td>{moh705bData.mental_disorders}</td>
            </tr>
            <tr>
              <td>34</td>
              <td>Dental Disorders</td>
              <td>{moh705bData.dental_disorders}</td>
            </tr>
            <tr>
              <td>35</td>
              <td>Jiggers Infestation</td>
              <td>{moh705bData.jiggers_infestation}</td>
            </tr>
            <tr>
              <td>36</td>
              <td>Disease of the skin</td>
              <td>{moh705bData.diseases_of_the_skin}</td>
            </tr>
            <tr>
              <td>37</td>
              <td>Athritis, Joint pains etc.</td>
              <td>{moh705bData.athritis}</td>
            </tr>
            <tr>
              <td>38</td>
              <td>Poisoning</td>
              <td>{moh705bData.poisoning}</td>
            </tr>
            <tr>
              <td>39</td>
              <td>Road Traffic Injuries</td>
              <td>{moh705bData.road_traffic_injuries}</td>
            </tr>
            <tr>
              <td>40</td>
              <td>Deaths due to Road Traffic Injuries</td>
              <td>{moh705bData.deaths_due_to_road_traffic_injuries}</td>
            </tr>
            <tr>
              <td>41</td>
              <td>Other Injuries</td>
              <td>{moh705bData.other_injuries}</td>
            </tr>
            <tr>
              <td>42</td>
              <td>Sexual Violence</td>
              <td>{moh705bData.sexual_violence}</td>
            </tr>
            <tr>
              <td>43</td>
              <td>Violence related Injuries</td>
              <td>{moh705bData.violence_related_injuries}</td>
            </tr>
            <tr>
              <td>44</td>
              <td>Burns</td>
              <td>{moh705bData.burns}</td>
            </tr>
            <tr>
              <td>45</td>
              <td>Snake Bites</td>
              <td>{moh705bData.snake_bites}</td>
            </tr>
            <tr>
              <td>46</td>
              <td>Dog Bites</td>
              <td>{moh705bData.dog_bites}</td>
            </tr>
            <tr>
              <td>47</td>
              <td>Other Bites</td>
              <td>{moh705bData.other_bites}</td>
            </tr>
            <tr>
              <td>48</td>
              <td>Diabetes</td>
              <td>{moh705bData.diabetes}</td>
            </tr>
            <tr>
              <td>49</td>
              <td>Epilepsy</td>
              <td>{moh705bData.epilepsy}</td>
            </tr>
            <tr>
              <td>50</td>
              <td>Brucellosis</td>
              <td>{moh705bData.brucellosis}</td>
            </tr>
            <tr>
              <td>51</td>
              <td>Cardiovascular conditions</td>
              <td>{moh705bData.cardiovascular_conditions}</td>
            </tr>
            <tr>
              <td>52</td>
              <td>Central Nervous System Conditions</td>
              <td>{moh705bData.central_nervous_system_conditions}</td>
            </tr>
            <tr>
              <td>53</td>
              <td>Overweight (BMI &gt; 25)</td>
              <td>{moh705bData.overweight}</td>
            </tr>
            <tr>
              <td>54</td>
              <td>Muscular skeletal conditions</td>
              <td>{moh705bData.mascular_skeletal_conditions}</td>
            </tr>
            <tr>
              <td>55</td>
              <td>Fistula (Birth related)</td>
              <td>{moh705bData.fistula}</td>
            </tr>
            <tr>
              <td>56</td>
              <td>Suspected Neoplams/Cancers</td>
              <td>{moh705bData.suspected_neoplams_cancers}</td>
            </tr>
            <tr>
              <td>57</td>
              <td>Physical Disability</td>
              <td>{moh705bData.physical_disability}</td>
            </tr>
            <tr>
              <td>58</td>
              <td>Trypanosomiasis</td>
              <td>{moh705bData.trypanosomiasis}</td>
            </tr>
            <tr>
              <td>59</td>
              <td>Rift valley fever</td>
              <td>{moh705bData.rift_valley_fever}</td>
            </tr>
            <tr>
              <td>60</td>
              <td>Yellow Fever</td>
              <td>{moh705bData.yellow_fever}</td>
            </tr>
            <tr>
              <td>61</td>
              <td>Viral Haemorrhagic Fever</td>
              <td>{moh705bData.viral_haemorrhagic_fever}</td>
            </tr>
            <tr>
              <td>62</td>
              <td>Chikungunya</td>
              <td>{moh705bData.chikungunya}</td>
            </tr>
            <tr>
              <td>63</td>
              <td>Dengue fever</td>
              <td>{moh705bData.dengue_fever}</td>
            </tr>
            <tr>
              <td>64</td>
              <td>Leishmaniasis(Kala-azar)</td>
              <td>{moh705bData.leishmaniasis}</td>
            </tr>
            <tr>
              <td>65</td>
              <td>Cuteneous leishmaniasis</td>
              <td>{moh705bData.cutaneous_leishmaniasis}</td>
            </tr>
            <tr>
              <td>66</td>
              <td>Suspected Anthrax</td>
              <td>{moh705bData.suspected_anthrax}</td>
            </tr>
            <tr>
              <td>67</td>
              <td>ALL OTHER DISEASES</td>
              <td>{moh705bData.all_other_diseases}</td>
            </tr>
            <tr>
              <td>68</td>
              <td>Tested for Malaria</td>
              <td>{moh705bData.tested_for_malaria}</td>
            </tr>
            <tr>
              <td>69</td>
              <td>NO. OF FIRST ATTENDANCES</td>
              <td>{moh705bData.no_of_first_attendances}</td>
            </tr>
            <tr>
              <td>70</td>
              <td>RE-ATTENDANCES</td>
              <td>{moh705bData.re_attendances}</td>
            </tr>
            <tr>
              <td>71</td>
              <td>Referrals from other health facilities</td>
              <td>{moh705bData.referrals_from_other_health_facility}</td>
            </tr>
            <tr>
              <td>72</td>
              <td>Referrals to other health facilities</td>
              <td>{moh705bData.referrals_to_other_health_facility}</td>
            </tr>
            <tr>
              <td>73</td>
              <td>Referrals from community unit</td>
              <td>{moh705bData.referrals_from_community_unit}</td>
            </tr>
            <tr>
              <td>74</td>
              <td>Referrals to community unit</td>
              <td>{moh705bData.referrals_to_community_unit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Moh705BComponent;
