import { useSession } from '@openmrs/esm-framework';
import React, { useState } from 'react';
import { getMoh705a } from '../../resources/moh-705.resource';

import styles from './moh-705a.scss';
import ReportFiltersComponent from '../../common/report-filters/report-filters.component';
import { Loading } from '@carbon/react';
import classNames from 'classnames';

const Moh705AComponent: React.FC = () => {
  let errorMessage: string = '';
  const [moh705aData, setMoh705aData] = useState<any>([]);
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
      const data = await getMoh705a(params);
      const flatData = Object.assign({}, ...data.result);
      setMoh705aData(flatData);
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
        reportName="MOH-705A Report"
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
              <td>Diarrhoea with no dehydration</td>
              <td>{moh705aData.diarrhoea_with_no_dehydration}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Diarrhoea with some dehydration</td>
              <td>{moh705aData.diarrhoea_with_some_dehydration}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Diarrhoea with severe dehydration</td>
              <td>{moh705aData.diarrhoea_with_severe_dehydration}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Cholera</td>
              <td>{moh705aData.cholera}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Dysentary (Blood diarrhoea)</td>
              <td>{moh705aData.dysentry}</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Gastroenterities</td>
              <td>{moh705aData.gastroenterities}</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Pneomonia</td>
              <td>{moh705aData.pneumonia}</td>
            </tr>
            <tr>
              <td>8</td>
              <td>Severe pneumonia</td>
              <td>{moh705aData.severe_pneumonia}</td>
            </tr>
            <tr>
              <td>9</td>
              <td>Upper Respiratory Tract Infections</td>
              <td>{moh705aData.upper_respiratory_tract_infections}</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Lower Respiratory Tract Infections</td>
              <td>{moh705aData.lower_respiratory_tract_infections}</td>
            </tr>
            <tr>
              <td>11</td>
              <td>Asthma</td>
              <td>{moh705aData.asthma}</td>
            </tr>
            <tr>
              <td>12</td>
              <td>Presumed Tuberculosis</td>
              <td>{moh705aData.presumed_tuberculosis}</td>
            </tr>
            <tr>
              <td>13</td>
              <td>Suspected Malaria</td>
              <td>{moh705aData.suspected_malaria}</td>
            </tr>
            <tr>
              <td>14</td>
              <td>Tested for Malaria</td>
              <td>{moh705aData.tested_for_malaria}</td>
            </tr>
            <tr>
              <td>15</td>
              <td>Confirmed malaria</td>
              <td>{moh705aData.confirmed_malaria}</td>
            </tr>
            <tr>
              <td>16</td>
              <td>Ear infection</td>
              <td>{moh705aData.ear_infection}</td>
            </tr>
            <tr>
              <td>17</td>
              <td>Malnutrition</td>
              <td>{moh705aData.malnutrition}</td>
            </tr>
            <tr>
              <td>18</td>
              <td>Anaemia</td>
              <td>{moh705aData.anaemia}</td>
            </tr>
            <tr>
              <td>19</td>
              <td>Meningococcal Menengitis</td>
              <td>{moh705aData.meningococcal_meningitis}</td>
            </tr>
            <tr>
              <td>20</td>
              <td>Other Meningitis</td>
              <td>{moh705aData.other_meningitis}</td>
            </tr>
            <tr>
              <td>21</td>
              <td>Neonatal Sepsis</td>
              <td>{moh705aData.neonatal_sepsis}</td>
            </tr>
            <tr>
              <td>22</td>
              <td>Neonatal Tetanus</td>
              <td>{moh705aData.neonatal_tetanus}</td>
            </tr>
            <tr>
              <td>23</td>
              <td>Poliomyelitis (AFP)</td>
              <td>{moh705aData.poliomyelitis}</td>
            </tr>
            <tr>
              <td>24</td>
              <td>Chicken Pox</td>
              <td>{moh705aData.chicken_pox}</td>
            </tr>
            <tr>
              <td>25</td>
              <td>Measles</td>
              <td>{moh705aData.measles}</td>
            </tr>
            <tr>
              <td>26</td>
              <td>Hepatitis</td>
              <td>{moh705aData.hepatitis}</td>
            </tr>
            <tr>
              <td>27</td>
              <td>Amoebiasis</td>
              <td>{moh705aData.amoebiasis}</td>
            </tr>
            <tr>
              <td>28</td>
              <td>Mumps</td>
              <td>{moh705aData.mumps}</td>
            </tr>
            <tr>
              <td>29</td>
              <td>Typhoid fever</td>
              <td>{moh705aData.typhoid_fever}</td>
            </tr>
            <tr>
              <td>30</td>
              <td>Bilharzia (Schistosomiasis)</td>
              <td>{moh705aData.bilharzia}</td>
            </tr>
            <tr>
              <td>31</td>
              <td>Intestinal worms</td>
              <td>{moh705aData.intestinal_worms}</td>
            </tr>
            <tr>
              <td>32</td>
              <td>Eye Infections</td>
              <td>{moh705aData.eye_infections}</td>
            </tr>
            <tr>
              <td>33</td>
              <td>Tonsilitis</td>
              <td>{moh705aData.tonsilities}</td>
            </tr>
            <tr>
              <td>34</td>
              <td>Urinary Tract Infection</td>
              <td>{moh705aData.urinary_tract_infections}</td>
            </tr>
            <tr>
              <td>35</td>
              <td>Mental Disorders</td>
              <td>{moh705aData.mental_disorders}</td>
            </tr>
            <tr>
              <td>36</td>
              <td>Dental Disorders</td>
              <td>{moh705aData.dental_disorders}</td>
            </tr>
            <tr>
              <td>37</td>
              <td>Jiggers Infestation</td>
              <td>{moh705aData.jiggers_infestation}</td>
            </tr>
            <tr>
              <td>38</td>
              <td>Diseases fo the skin</td>
              <td>{moh705aData.diseases_of_the_skin}</td>
            </tr>
            <tr>
              <td>39</td>
              <td>Down's syndrome</td>
              <td>{moh705aData.downs_syndrome}</td>
            </tr>
            <tr>
              <td>40</td>
              <td>Poisoning</td>
              <td>{moh705aData.poisoning}</td>
            </tr>
            <tr>
              <td>41</td>
              <td>Road Traffic Injuries</td>
              <td>{moh705aData.road_traffic_injuries}</td>
            </tr>
            <tr>
              <td>42</td>
              <td>Deaths due to Road Traffic Injuries</td>
              <td>{moh705aData.deaths_due_to_road_traffic_injuries}</td>
            </tr>
            <tr>
              <td>43</td>
              <td>Violence related injuries</td>
              <td>{moh705aData.violence_related_injuries}</td>
            </tr>
            <tr>
              <td>44</td>
              <td>Other injuries</td>
              <td>{moh705aData.other_injuries}</td>
            </tr>
            <tr>
              <td>45</td>
              <td>Sexual Violence</td>
              <td>{moh705aData.sexual_violence}</td>
            </tr>
            <tr>
              <td>46</td>
              <td>Burns</td>
              <td>{moh705aData.burns}</td>
            </tr>
            <tr>
              <td>47</td>
              <td>Snake Bites</td>
              <td>{moh705aData.snake_bites}</td>
            </tr>
            <tr>
              <td>48</td>
              <td>Dog bites</td>
              <td>{moh705aData.dog_bites}</td>
            </tr>
            <tr>
              <td>49</td>
              <td>Other Bites</td>
              <td>{moh705aData.other_bites}</td>
            </tr>
            <tr>
              <td>50</td>
              <td>Diabetes</td>
              <td>{moh705aData.diabetes}</td>
            </tr>
            <tr>
              <td>51</td>
              <td>Epilepsy</td>
              <td>{moh705aData.epilepsy}</td>
            </tr>
            <tr>
              <td>52</td>
              <td>Other Convulsive Disorders</td>
              <td>{moh705aData.other_convulsive_disorders}</td>
            </tr>
            <tr>
              <td>53</td>
              <td>Rheumatic Fever</td>
              <td>{moh705aData.rheumatic_fever}</td>
            </tr>
            <tr>
              <td>54</td>
              <td>Brucellosis</td>
              <td>{moh705aData.brucellosis}</td>
            </tr>
            <tr>
              <td>55</td>
              <td>Rickets</td>
              <td>{moh705aData.rickets}</td>
            </tr>
            <tr>
              <td>56</td>
              <td>Cerebral Palsy</td>
              <td>{moh705aData.cerebral_palsy}</td>
            </tr>
            <tr>
              <td>57</td>
              <td>Autism</td>
              <td>{moh705aData.autism}</td>
            </tr>
            <tr>
              <td>58</td>
              <td>Tryponosomiasis</td>
              <td>{moh705aData.tryponosomiasis}</td>
            </tr>
            <tr>
              <td>59</td>
              <td>Yellow Fever</td>
              <td>{moh705aData.yellow_fever}</td>
            </tr>
            <tr>
              <td>60</td>
              <td>Viral Haemorrhagic Fever</td>
              <td>{moh705aData.viral_haemorrhagic_fever}</td>
            </tr>
            <tr>
              <td>61</td>
              <td>Rift valley fever</td>
              <td>{moh705aData.rift_valley_fever}</td>
            </tr>
            <tr>
              <td>62</td>
              <td>Chikungunya</td>
              <td>{moh705aData.chikungunya}</td>
            </tr>
            <tr>
              <td>63</td>
              <td>Dengue fever</td>
              <td>{moh705aData.dengue_fever}</td>
            </tr>
            <tr>
              <td>64</td>
              <td>Leishmaniasis(Kalaazar)</td>
              <td>{moh705aData.leishmaniasis}</td>
            </tr>
            <tr>
              <td>65</td>
              <td>Cutaneous leishmaniasis</td>
              <td>{moh705aData.cutaneous_leishmaniasis}</td>
            </tr>
            <tr>
              <td>66</td>
              <td>Suspected anthrax</td>
              <td>{moh705aData.suspected_anthrax}</td>
            </tr>
            <tr>
              <td>67</td>
              <td>Suspected Childhood Cancers</td>
              <td>{moh705aData.suspected_childhood_cancers}</td>
            </tr>
            <tr>
              <td>68</td>
              <td>Hypoxaemia (Spo2&lt;90%)</td>
              <td>{moh705aData.hypoxaemia}</td>
            </tr>
            <tr>
              <td>69</td>
              <td>All Other Diseases</td>
              <td>{moh705aData.all_other_diseases}</td>
            </tr>
            <tr>
              <td>70</td>
              <td>No. of New Attendances</td>
              <td>{moh705aData.new_attendances}</td>
            </tr>
            <tr>
              <td>71</td>
              <td>No of Re-Attendances</td>
              <td>{moh705aData.re_attendances}</td>
            </tr>
            <tr>
              <td>72</td>
              <td>Referrals From Other Health Facility</td>
              <td>{moh705aData.referrals_from_other_health_facility}</td>
            </tr>
            <tr>
              <td>73</td>
              <td>Referrals To Other Health Facility</td>
              <td>{moh705aData.referrals_to_other_health_facility}</td>
            </tr>
            <tr>
              <td>74</td>
              <td>Referrals From Community Unit</td>
              <td>{moh705aData.referrals_from_community_unit}</td>
            </tr>
            <tr>
              <td>74</td>
              <td>Referrals To Community Unit</td>
              <td>{moh705aData.referrals_to_community_unit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Moh705AComponent;
