import React from "react";
import Moh240Register from "./sub-reports/moh-240-register.component";
import Moh240PageSummary from "./sub-reports/page-summary.component";

const Moh240Report: React.FC = () => {
    return <>
        <Moh240Register />
        <Moh240PageSummary />
    </>
}

export default Moh240Report;