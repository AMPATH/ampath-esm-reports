import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface MaternityComponentProps {
  moh711Data: any;
}

const MaternityComponent: React.FC<MaternityComponentProps> = ({ moh711Data }) => {
  return (
    <>
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
            <td>{moh711Data.normal_deliveries}</td>
          </tr>
          <tr>
            <td>2</td>
            <td colSpan={2}>Caesarean Sections</td>
            <td>{moh711Data.caesarian_sections}</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Breach Delivery</td>
            <td>{moh711Data.breach_delivery}</td>
          </tr>
          <tr>
            <td>4</td>
            <td colSpan={2}>Assisted Vaginal Deliveries(Vacuum Extraction)</td>
            <td>{moh711Data.assisted_vaginal_delivery}</td>
          </tr>
          <tr>
            <td></td>
            <td colSpan={2}></td>
            <td></td>
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
            <td>{moh711Data.oxytocin_uterotonic}</td>
          </tr>
          <tr>
            <td>Carbatosin</td>
            <td>{moh711Data.carbatocin_uterotonic}</td>
          </tr>
          <tr>
            <td>6</td>
            <td colSpan={2}>Live Births</td>
            <td>{moh711Data.live_birth}</td>
          </tr>
          <tr>
            <td>7</td>
            <td colSpan={2}>No. of Low Birth Weight Babies (below 2500gms)</td>
            <td>{moh711Data.low_birth_weight}</td>
          </tr>
          <tr>
            <td>8</td>
            <td colSpan={2}>
              No. of Low APGAR Score(<strong>&le; 6 at 5 Min</strong>)
            </td>
            <td>{moh711Data.low_apgar_score}</td>
          </tr>
          <tr>
            <td>9</td>
            <td colSpan={2}>No. of Birth with diformities</td>
            <td>{moh711Data.birth_with_deformity}</td>
          </tr>
          <tr>
            <td>10</td>
            <td colSpan={2}>No. of Babies applied chlorhexidine for cord care</td>
            <td>{moh711Data.chlorhexidine_applied}</td>
          </tr>
          <tr>
            <td>11</td>
            <td colSpan={2}>No. of Neonates given Vit "K"</td>
            <td>{moh711Data.vitamin_k}</td>
          </tr>
          <tr>
            <td>12</td>
            <td colSpan={2}>No. of Babies given tetracycline at birth</td>
            <td>{moh711Data.tetracycline_given}</td>
          </tr>
          <tr>
            <td>13</td>
            <td colSpan={2}>Pre-Term babies</td>
            <td>{moh711Data.pre_term_babies}</td>
          </tr>
          <tr>
            <td>14</td>
            <td colSpan={2}>No. of Babies discharge Alive</td>
            <td>{moh711Data.discharge_alive}</td>
          </tr>
          <tr>
            <td>15</td>
            <td colSpan={2}>No. of Infants initiated on breast feeding within 1 hour after birth</td>
            <td>{moh711Data.bf_within_1_hour}</td>
          </tr>
          <tr>
            <td>16</td>
            <td colSpan={2}>Total Deliveries from HIV +ve Women</td>
            <td>{moh711Data.deliveries_from_positive_women}</td>
          </tr>
          <tr>
            <td>17</td>
            <td rowSpan={3}>Perinatal Deaths</td>
            <td>Fresh Still Birth</td>
            <td>{moh711Data.fresh_still_birth}</td>
          </tr>
          <tr>
            <td>18</td>
            <td>Macerated still Birth</td>
            <td>{moh711Data.macerated_still_birth}</td>
          </tr>
          <tr>
            <td>19</td>
            <td>Deaths 0-7 days</td>
            <td>{moh711Data.perinatal_deaths_0_7_days}</td>
          </tr>
          <tr>
            <td>20</td>
            <td colSpan={2}>Neonatal deaths 0-28 Days</td>
            <td>{moh711Data.neonatal_deaths_0_28_days}</td>
          </tr>
          <tr>
            <td>21</td>
            <td colSpan={2}>Maternal deaths 10-14 Years</td>
            <td>{moh711Data.maternal_deaths_10_14_years}</td>
          </tr>
          <tr>
            <td>22</td>
            <td colSpan={2}>Maternal deaths 15-19 Years</td>
            <td>{moh711Data.maternal_deaths_15_19_years}</td>
          </tr>
          <tr>
            <td>23</td>
            <td colSpan={2}>Maternal deaths 20-24 Years</td>
            <td>{moh711Data.maternal_deaths_20_24_years}</td>
          </tr>
          <tr>
            <td>24</td>
            <td colSpan={2}>Maternal deaths 25+ Years</td>
            <td>{moh711Data.maternal_deaths_25_above_years}</td>
          </tr>
          <tr>
            <td>25</td>
            <td colSpan={2}>Maternal Deaths Audited Within 7 Days</td>
            <td>{moh711Data.maternal_deaths_audited_within_7_days}</td>
          </tr>
          <tr>
            <td>26</td>
            <td colSpan={2}>No. of Neonatal deaths audited within 7 days</td>
            <td>{moh711Data.neonatal_deaths_audited_within_7_days}</td>
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
            <td>{moh711Data.ante_partum_haemorrage}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>28</td>
            <td>P.P.H (Post Partum Haemorrage)</td>
            <td>{moh711Data.post_partum_haemorrage}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>29</td>
            <td>Eclampsia</td>
            <td>{moh711Data.eclampsia}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>30</td>
            <td>Ruptured Uterus</td>
            <td>{moh711Data.ruptured_uterus}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>31</td>
            <td>Obstructed Labour</td>
            <td>{moh711Data.obstructed_labour}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>32</td>
            <td>Sepsis</td>
            <td>{moh711Data.sepsis}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>33</td>
            <td>
              Number of Mothers with delivery complications associated
              <br /> with FGM
            </td>
            <td>{moh711Data.fgm_delivery_complications}</td>
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
            <td>{moh711Data.neonatal_deaths_sepsis}</td>
          </tr>
          <tr>
            <td>35</td>
            <td>No. of neonatal deaths due to Prematurity</td>
            <td>{moh711Data.neonatal_deaths_prematurity}</td>
          </tr>
          <tr>
            <td>36</td>
            <td>No. of neonatal deaths due to Asphyxia</td>
            <td>{moh711Data.neonatal_deaths_asphyxia}</td>
          </tr>
          <tr>
            <td>37</td>
            <td colSpan={2}>No. of Neonates initiated on Kangaroo Mother Care</td>
            <td>{moh711Data.kangaroo_mother_care}</td>
          </tr>
          <tr>
            <td>38</td>
            <td colSpan={2}>Maternal Referrals From Community Unit</td>
            <td>{moh711Data.referrals_from_community}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MaternityComponent;
