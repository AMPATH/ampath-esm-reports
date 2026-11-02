import React from 'react';
import ClientCategoryComponent from './sections/client-category.component';

import styles from './moh-733.scss';
import NutritionStatusComponent from './sections/nutrition-status.component';
import NutritionStatusWeightComponent from './sections/nutrition-status-weight.component';
import NutritionInterventionComponent from './sections/nutrition-intervention.component';
import NutritionInterventionPregnantBrestfeedingComponent from './sections/nutrition-intervention-pregnant-breastfeeding.component';

const Moh733Component: React.FC = () => {
  return (
    <>
      <div className={styles.parentBorder}>
        <p>CLIENT CATEGORY</p>
        <ClientCategoryComponent moh733Data={[]} startDate="" endDate="" locationUuids="" />
        <p>NUTRITION STATUS</p>
        <NutritionStatusComponent moh733Data={[]} startDate="" endDate="" locationUuids="" />
        <p>NUTRITION STATUS</p>
        <NutritionStatusWeightComponent moh733Data={[]} startDate="" endDate="" locationUuids="" />
        <p>NUTRITION INTERVENTION</p>
        <NutritionInterventionComponent moh733Data={[]} startDate="" endDate="" locationUuids="" />
        <p>NUTRITION INTERVENTION</p>
        <NutritionInterventionPregnantBrestfeedingComponent moh733Data={[]} startDate="" endDate="" locationUuids="" />
      </div>
    </>
  );
};

export default Moh733Component;
