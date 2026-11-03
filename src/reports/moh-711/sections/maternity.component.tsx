import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';
import { useOpenMoh711MaternityLinelist } from '../linelist/use-open-moh-711-maternity-linelist';

interface MaternityComponentProps {
  moh711Data: any;
  startDate: string;
  endDate: string;
  locationUuids: string;
}

const MaternityComponent: React.FC<MaternityComponentProps> = ({ moh711Data, startDate, endDate, locationUuids }) => {
  const openLinelist = useOpenMoh711MaternityLinelist(startDate, endDate, locationUuids);

  return (
    <div className={styles.section}>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={3}>B. Maternity and NewBorn</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td colSpan={2}>Normal Deliveries</td>
            <td onClick={() => openLinelist('normal_deliveries')}>{moh711Data.normal_deliveries ?? 0}</td>
          </tr>
          <tr>
            <td>2</td>
            <td colSpan={2}>Caesarean Sections</td>
            <td onClick={() => openLinelist('caesarian_sections')}>{moh711Data.caesarian_sections ?? 0}</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Breach Delivery</td>
            <td onClick={() => openLinelist('breach_delivery')}>{moh711Data.breach_delivery ?? 0}</td>
          </tr>
          <tr>
            <td>4</td>
            <td colSpan={2}>Assisted Vaginal Deliveries(Vacuum Extraction)</td>
            <td onClick={() => openLinelist('assisted_vaginal_delivery')}>
              {moh711Data.assisted_vaginal_delivery ?? 0}
            </td>
          </tr>
          <tr>
            <th colSpan={3}>Total Deliveries</th>
            <th>
              {(moh711Data?.normal_deliveries ?? 0) +
                (moh711Data?.caesarian_sections ?? 0) +
                (moh711Data?.breach_delivery ?? 0) +
                (moh711Data?.assisted_vaginal_delivery ?? 0)}
            </th>
          </tr>
          <tr>
            <td rowSpan={2}>5</td>
            <td rowSpan={2}>No. of mothers given uterotonics within 1 minute</td>
            <td>Oxytocin</td>
            <td onClick={() => openLinelist('oxytocin_uterotonic')}>{moh711Data.oxytocin_uterotonic ?? 0}</td>
          </tr>
          <tr>
            <td>Carbatosin</td>
            <td onClick={() => openLinelist('carbatocin_uterotonic')}>{moh711Data.carbatocin_uterotonic ?? 0}</td>
          </tr>
          <tr>
            <td>6</td>
            <td colSpan={2}>Live Births</td>
            <td onClick={() => openLinelist('live_birth')}>{moh711Data.live_birth ?? 0}</td>
          </tr>
          <tr>
            <td>7</td>
            <td colSpan={2}>No. of Low Birth Weight Babies (below 2500gms)</td>
            <td onClick={() => openLinelist('low_birth_weight')}>{moh711Data.low_birth_weight ?? 0}</td>
          </tr>
          <tr>
            <td>8</td>
            <td colSpan={2}>
              No. of Low APGAR Score(<strong>&le; 6 at 5 Min</strong>)
            </td>
            <td onClick={() => openLinelist('low_apgar_score')}>{moh711Data.low_apgar_score ?? 0}</td>
          </tr>
          <tr>
            <td>9</td>
            <td colSpan={2}>No. of Birth with diformities</td>
            <td onClick={() => openLinelist('birth_with_deformity')}>{moh711Data.birth_with_deformity ?? 0}</td>
          </tr>
          <tr>
            <td>10</td>
            <td colSpan={2}>No. of Babies applied chlorhexidine for cord care</td>
            <td onClick={() => openLinelist('chlorhexidine_applied')}>{moh711Data.chlorhexidine_applied ?? 0}</td>
          </tr>
          <tr>
            <td>11</td>
            <td colSpan={2}>No. of Neonates given Vit "K"</td>
            <td onClick={() => openLinelist('vitamin_k')}>{moh711Data.vitamin_k ?? 0}</td>
          </tr>
          <tr>
            <td>12</td>
            <td colSpan={2}>No. of Babies given tetracycline at birth</td>
            <td onClick={() => openLinelist('tetracycline_given')}>{moh711Data.tetracycline_given ?? 0}</td>
          </tr>
          <tr>
            <td>13</td>
            <td colSpan={2}>Pre-Term babies</td>
            <td onClick={() => openLinelist('pre_term_babies')}>{moh711Data.pre_term_babies ?? 0}</td>
          </tr>
          <tr>
            <td>14</td>
            <td colSpan={2}>No. of Babies discharge Alive</td>
            <td onClick={() => openLinelist('discharge_alive')}>{moh711Data.discharge_alive ?? 0}</td>
          </tr>
          <tr>
            <td>15</td>
            <td colSpan={2}>No. of Infants initiated on breast feeding within 1 hour after birth</td>
            <td onClick={() => openLinelist('bf_within_1_hour')}>{moh711Data.bf_within_1_hour ?? 0}</td>
          </tr>
          <tr>
            <td>16</td>
            <td colSpan={2}>Total Deliveries from HIV +ve Women</td>
            <td onClick={() => openLinelist('deliveries_from_positive_women')}>
              {moh711Data.deliveries_from_positive_women ?? 0}
            </td>
          </tr>
          <tr>
            <td>17</td>
            <td rowSpan={3}>Perinatal Deaths</td>
            <td>Fresh Still Birth</td>
            <td onClick={() => openLinelist('fresh_still_birth')}>{moh711Data.fresh_still_birth ?? 0}</td>
          </tr>
          <tr>
            <td>18</td>
            <td>Macerated still Birth</td>
            <td onClick={() => openLinelist('macerated_still_birth')}>{moh711Data.macerated_still_birth ?? 0}</td>
          </tr>
          <tr>
            <td>19</td>
            <td>Deaths 0-7 days</td>
            <td onClick={() => openLinelist('perinatal_deaths_0_7_days')}>
              {moh711Data.perinatal_deaths_0_7_days ?? 0}
            </td>
          </tr>
          <tr>
            <td>20</td>
            <td colSpan={2}>Neonatal deaths 0-28 Days</td>
            <td onClick={() => openLinelist('neonatal_deaths_0_28_days')}>
              {moh711Data.neonatal_deaths_0_28_days ?? 0}
            </td>
          </tr>
          <tr>
            <td>21</td>
            <td colSpan={2}>Maternal deaths 10-14 Years</td>
            <td onClick={() => openLinelist('maternal_deaths_10_14_years')}>
              {moh711Data.maternal_deaths_10_14_years ?? 0}
            </td>
          </tr>
          <tr>
            <td>22</td>
            <td colSpan={2}>Maternal deaths 15-19 Years</td>
            <td onClick={() => openLinelist('maternal_deaths_15_19_years')}>
              {moh711Data.maternal_deaths_15_19_years ?? 0}
            </td>
          </tr>
          <tr>
            <td>23</td>
            <td colSpan={2}>Maternal deaths 20-24 Years</td>
            <td onClick={() => openLinelist('maternal_deaths_20_24_years')}>
              {moh711Data.maternal_deaths_20_24_years ?? 0}
            </td>
          </tr>
          <tr>
            <td>24</td>
            <td colSpan={2}>Maternal deaths 25+ Years</td>
            <td onClick={() => openLinelist('maternal_deaths_25_above_years')}>
              {moh711Data.maternal_deaths_25_above_years ?? 0}
            </td>
          </tr>
          <tr>
            <td>25</td>
            <td colSpan={2}>Maternal Deaths Audited Within 7 Days</td>
            <td onClick={() => openLinelist('maternal_deaths_audited_within_7_days')}>
              {moh711Data.maternal_deaths_audited_within_7_days ?? 0}
            </td>
          </tr>
          <tr>
            <td>26</td>
            <td colSpan={2}>No. of Neonatal deaths audited within 7 days</td>
            <td onClick={() => openLinelist('neonatal_deaths_audited_within_7_days')}>
              {moh711Data.neonatal_deaths_audited_within_7_days ?? 0}
            </td>
          </tr>
        </tbody>
      </table>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={2}>Maternal complications</th>
            <th>Alive</th>
            <th>Dead</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>27</td>
            <td>A.P.H (Ante partum Haemorrage)</td>
            <td onClick={() => openLinelist('ante_partum_haemorrage')}>{moh711Data.ante_partum_haemorrage ?? 0}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>28</td>
            <td>P.P.H (Post Partum Haemorrage)</td>
            <td onClick={() => openLinelist('post_partum_haemorrage')}>{moh711Data.post_partum_haemorrage ?? 0}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>29</td>
            <td>Eclampsia</td>
            <td onClick={() => openLinelist('eclampsia')}>{moh711Data.eclampsia ?? 0}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>30</td>
            <td>Ruptured Uterus</td>
            <td onClick={() => openLinelist('ruptured_uterus')}>{moh711Data.ruptured_uterus ?? 0}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>31</td>
            <td>Obstructed Labour</td>
            <td onClick={() => openLinelist('obstructed_labour')}>{moh711Data.obstructed_labour ?? 0}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>32</td>
            <td>Sepsis</td>
            <td onClick={() => openLinelist('sepsis')}>{moh711Data.sepsis ?? 0}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>33</td>
            <td>
              Number of Mothers with delivery complications associated
              <br /> with FGM
            </td>
            <td onClick={() => openLinelist('fgm_delivery_complications')}>
              {moh711Data.fgm_delivery_complications ?? 0}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th colSpan={2}>Neonate Care and Outcome</th>
            <th></th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>34</td>
            <td rowSpan={3}>Causes of neonatal deaths</td>
            <td>No. of neonatal deaths due to Sepsis</td>
            <td onClick={() => openLinelist('neonatal_deaths_sepsis')}>{moh711Data.neonatal_deaths_sepsis ?? 0}</td>
          </tr>
          <tr>
            <td>35</td>
            <td>No. of neonatal deaths due to Prematurity</td>
            <td onClick={() => openLinelist('neonatal_deaths_prematurity')}>
              {moh711Data.neonatal_deaths_prematurity ?? 0}
            </td>
          </tr>
          <tr>
            <td>36</td>
            <td>No. of neonatal deaths due to Asphyxia</td>
            <td onClick={() => openLinelist('neonatal_deaths_asphyxia')}>
              {moh711Data.neonatal_deaths_asphyxia ?? 0}
            </td>
          </tr>
          <tr>
            <td>37</td>
            <td colSpan={2}>No. of Neonates initiated on Kangaroo Mother Care</td>
            <td onClick={() => openLinelist('kangaroo_mother_care')}>{moh711Data.kangaroo_mother_care ?? 0}</td>
          </tr>
          <tr>
            <td>38</td>
            <td colSpan={2}>Maternal Referrals From Community Unit</td>
            <td onClick={() => openLinelist('referrals_from_community')}>
              {moh711Data.referrals_from_community ?? 0}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MaternityComponent;
