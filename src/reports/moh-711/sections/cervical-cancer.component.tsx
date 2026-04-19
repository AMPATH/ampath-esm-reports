import React from 'react';

import styles from '../moh711.scss';
import classNames from 'classnames';

interface CervicalCancerComponentProps {
  moh711Data: any;
}

const CervicalCancerComponent: React.FC<CervicalCancerComponentProps> = ({ moh711Data }) => {
  return (
    <>
      <table className={classNames(`${styles.table}`, `${styles.tableBordered}`, `${styles.tableStriped}`)}>
        <thead>
          <tr>
            <th></th>
            <th colSpan={4}>G. Cervical cancer screening</th>
          </tr>
          <tr>
            <th></th>
            <th className={styles.greyBackground}></th>
            <th>&lt;25 yrs</th>
            <th>25-49 Years</th>
            <th>50+yrs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>No. of Clients receiving VIA/VILI/HPV VILI/HPV</td>
            <td>{moh711Data.via_villi_hpv_less_25}</td>
            <td>{moh711Data.via_villi_hpv_25_49}</td>
            <td>{moh711Data.via_villi_hpv_50_above}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>No. screened for Pap smear</td>
            <td>{moh711Data.pap_smear_less_25}</td>
            <td>{moh711Data.pap_smear_25_49}</td>
            <td>{moh711Data.pap_smear_50_above}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>No. screend for HPV test</td>
            <td>{moh711Data.hpv_test_less_25}</td>
            <td>{moh711Data.hpv_test_25_49}</td>
            <td>{moh711Data.hpv_test_50_above}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>No. of clients with Positive VIA/VILI results</td>
            <td>{moh711Data.positive_via_villi_less_25}</td>
            <td>{moh711Data.positive_via_villi_25_49}</td>
            <td>{moh711Data.positive_via_villi_50_above}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>No. of clients with Positive Cytology result</td>
            <td>{moh711Data.positive_cytology_less_25}</td>
            <td>{moh711Data.positive_cytology_25_49}</td>
            <td>{moh711Data.positive_cytology_50_above}</td>
          </tr>
          <tr>
            <td>6</td>
            <td>No. of clients with Positive HPV results</td>
            <td>{moh711Data.positive_hpv_less_25}</td>
            <td>{moh711Data.positive_hpv_25_49}</td>
            <td>{moh711Data.positive_hpv_50_above}</td>
          </tr>
          <tr>
            <td>7</td>
            <td>No. of clients with suspicious cancer lessions</td>
            <td>{moh711Data.suspicious_cancer_lessions_less_25}</td>
            <td>{moh711Data.suspicious_cancer_lessions_25_49}</td>
            <td>{moh711Data.suspicious_cancer_lessions_50_above}</td>
          </tr>
          <tr>
            <td>8</td>
            <td>No. of clients treated using Cryotherapy</td>
            <td>{moh711Data.cryotherapy_treatment_less_25}</td>
            <td>{moh711Data.cryotherapy_treatment_25_49}</td>
            <td>{moh711Data.cryotherapy_treatment_50_above}</td>
          </tr>
          <tr>
            <td>9</td>
            <td>No. of clients treated using LEEP</td>
            <td>{moh711Data.leep_treatment_less_25}</td>
            <td>{moh711Data.leep_treatment_25_49}</td>
            <td>{moh711Data.leep_treatment_50_above}</td>
          </tr>
          <tr>
            <td>10</td>
            <td>No of HIV positive clients screened</td>
            <td>{moh711Data.hiv_positive_screened_cervical_cancer_less_25}</td>
            <td>{moh711Data.hiv_positive_screened_cervical_cancer_25_49}</td>
            <td>{moh711Data.hiv_positive_screened_cervical_cancer_50_above}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CervicalCancerComponent;
