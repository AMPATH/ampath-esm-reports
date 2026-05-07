import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loading } from '@carbon/react';
import Moh240Register from "./sub-reports/moh-240-register.component";
import Moh240PageSummary from "./sub-reports/page-summary.component";
import { getMoh706PatientList } from "../../resources/moh-706.resource";
import { getMoh505PatientList } from "../../resources/moh-505.resource";
import MOH240Header from "./moh-240-header.component";

const Moh240Report: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [patientList, setPatientList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [indicator, setIndicator] = useState<string>('');

    useEffect(() => {
        const locationUuids = searchParams.get('locationUuids');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const indicators = searchParams.get('indicators');
        const report = searchParams.get('report');

        if (locationUuids && startDate && endDate && indicators) {
            setIndicator(indicators);
            fetchPatientList({ locationUuids, startDate, endDate, indicators, report: report || 'moh-706' });
        }
    }, [searchParams]);

    const fetchPatientList = async (params: { locationUuids: string; startDate: string; endDate: string; indicators: string; report: string }) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            let result;
            if (params.report === 'moh-505') {
                result = await getMoh505PatientList(params);
            } else {
                result = await getMoh706PatientList(params);
            }
            setPatientList(result);
        } catch (error: any) {
            setErrorMessage(error instanceof Error ? error.message : String(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loading description="Fetching patient list...." />}
            {!isLoading && errorMessage && (
                <div>
                    <a href="#" className="close" data-dismiss="alert">
                        &times;
                    </a>
                    <h4>
                        <strong>
                            <span className="glyphicon glyphicon-warning-sign"></span>{' '}
                        </strong>{' '}
                        An error occurred while trying to load the patient list. Please try again.
                    </h4>
                    <p>
                        <small>{errorMessage}</small>
                    </p>
                </div>
            )}

            <MOH240Header />
            <Moh240Register patientList={patientList} indicator={indicator} />
            <Moh240PageSummary />
        </>
    );
}

export default Moh240Report;