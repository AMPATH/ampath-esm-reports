import React from "react";
import DatatableWrapper from "../../datatable-wrapper/datatable-wrapper.component";

interface Moh240RegisterProps {
    patientList?: any[];
    indicator?: string;
}

const Moh240Register: React.FC<Moh240RegisterProps> = ({ patientList = [], indicator = '' }) => {
    const headers = [
        { key: 'date', header: 'Date (DD/MM/YYYY)' },
        { key: 'opd_ip_ref_no', header: 'OPD / IPD Ref. No.' },
        { key: 'lab_no', header: 'Lab. No. (new client)' },
        { key: 'revisit_no', header: 'Revisit No.' },
        { key: 'full_name', header: 'Full Names (Three names)' },
        { key: 'age', header: 'Age' },
        { key: 'sex', header: 'Sex' },
        { key: 'county_sub_county', header: 'County / Sub County' },
        { key: 'village_estate_landmark', header: 'Village / Estate / Landmark' },
        { key: 'telephone_number', header: 'Telephone Number' },
        { key: 'clinical_diagnosis', header: 'Clinical Diagnosis' },
        { key: 'prior_treatment', header: 'Prior Treatment' },
        { key: 'type_of_specimen', header: 'Type of Specimen' },
        { key: 'condition_of_specimen', header: 'Condition of Specimen' },
        { key: 'investigation_required', header: 'Investigation Required' },
        { key: 'test_datetime', header: 'Date Sample Collected' },
        { key: 'date_sample_received', header: 'Date Sample Received' },
        { key: 'clinician_name', header: 'Clinician Name' },
        { key: 'date_sample_analysed', header: 'Date Sample Analysed' },
        { key: 'results', header: 'Results' },
        { key: 'date_results_dispatched', header: 'Date Results Dispatched' },
        { key: 'amount_charged', header: 'Amount Charged' },
        { key: 'receipt_number', header: 'Receipt Number' },
        { key: 'referrals', header: 'Referrals (From Other HF / To Other HF / 3rd Tier Reference Laboratories)' },
        { key: 'comments', header: 'Comments' },
        { key: 'testing_officer', header: 'Name of Analysing/Testing Officer' },
        { key: 'signature', header: 'Signature' }
    ];

    const getResultField = (ind: string) => {
        if (ind.startsWith('min_') || ind.startsWith('max_')) {
            return ind.substring(4);
        }
        if (ind.startsWith('total_')) {
            return ind.substring(6);
        }
        if (ind.startsWith('positive_')) {
            return ind.substring(9);
        }
        return ind;
    };

    const resultField = getResultField(indicator);

    const subHeaders = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', 'AA'];

    const rows = patientList.map(patient => {
        const row: any = {};
        headers.forEach(header => {
            if (header.key === 'results') {
                row[header.key] = patient[resultField] || '';
            } else {
                row[header.key] = patient[header.key] || '';
            }
        });
        return row;
    });

    return <DatatableWrapper headers={headers} rows={rows} subHeaders={subHeaders}/>
}

export default Moh240Register;