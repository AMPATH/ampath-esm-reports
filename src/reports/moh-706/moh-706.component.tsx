import React from "react";
import UrineAnalysis from "./sub-reports/urine-analysis/urine-analysis.component";
import BloodChemistry from "./sub-reports/blood-chemistry/blood-chemistry.component";
import Parasitology from "./sub-reports/parasitology/parasitology.component";
import Haematology from "./sub-reports/haematology/haematology.component";
import Bacteriology from "./sub-reports/bacteriology/bacteriology.component";
import HistologyAndCytology from "./sub-reports/histology-and-cytology/histology-and-cytology.component";
import Serology from "./sub-reports/serology/serology.component";
import SpecimenReferralToHigherLevels from "./sub-reports/specimen-referral-to-higher-levels/specimen-referral-to-higher-levels.component";
import DrugSusceptibilityTesting from "./sub-reports/drug-susceptibility-testing/drug-susceptibility-testing.component";

const MoH706Report: React.FC = () => {
    return <>
        <UrineAnalysis />
        <BloodChemistry />
        <Parasitology />
        <Haematology />
        <Bacteriology />
        <HistologyAndCytology />
        <Serology />
        <SpecimenReferralToHigherLevels />
        <DrugSusceptibilityTesting />
    </>;
}

export default MoH706Report;