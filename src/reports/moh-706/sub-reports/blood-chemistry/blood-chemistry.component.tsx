import React, { useMemo } from "react";
import TableWrapper from "../../../table-wrapper/table-wrapper.component";
import styles from '../../../table-wrapper/table-wrapper.scss';
import TableRowMapper from "../../../table-wrapper/table-row-mapper.component";
import { getCell } from "../../../../utils/utils";

interface BloodChemistryProps {
    data?: any,
    locationUuids?: string,
    startDate?: string,
    endDate?: string
}

const BloodChemistry: React.FC<BloodChemistryProps> = ({ data, locationUuids, startDate, endDate }) => {
    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [
                    getCell("", "2. BLOOD CHEMISTRY", 4, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "", 4),
                ]
            },
            {
                tableCells: [
                    getCell("", "Blood Sugar Test", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Low", 1, 1, true),
                    getCell("", "High", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.1 Blood sugar"),
                    getCell("total_blood_sugar"),
                    getCell("min_blood_sugar"),
                    getCell("max_blood_sugar"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.2 OGTT"),
                    getCell("total_ogtt"),
                    getCell("min_ogtt"),
                    getCell("max_ogtt"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.3 Renal Function Test", 1, 1, true),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.4 Creatinine"),
                    getCell("total_creatinine"),
                    getCell("min_creatinine"),
                    getCell("max_creatinine"),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.4 Proteins"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.5 Urea"),
                    getCell("total_urea"),
                    getCell("min_urea"),
                    getCell("max_urea"),
                ]
            },

            {
                tableCells: [
                    getCell("", "2.6 Sodium"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.7 Potassium"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.8 Chlorides"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.8 Liver Function Test", 1, 1, true),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.9 Direct bilirubin"),
                    getCell("total_direct_bili"),
                    getCell("min_direct_bili"),
                    getCell("max_direct_bili"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.10 Total bilirubin"),
                    getCell("total_total_bili"),
                    getCell("min_total_bili"),
                    getCell("max_total_bili"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.11 ASAT (SGOT)"),
                    getCell("total_ast"),
                    getCell("min_ast"),
                    getCell("max_ast"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.12 ALAT (SGPT)"),
                    getCell("total_alt"),
                    getCell("min_alt"),
                    getCell("max_alt"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.13 Serum Protein"),
                    getCell("total_total_protein"),
                    getCell("min_total_protein"),
                    getCell("max_total_protein"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.14 Albumin"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.15 Alkaline Phosphatase"),
                    getCell("total_alk_phos"),
                    getCell("min_alk_phos"),
                    getCell("max_alk_phos"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.16 Lipid Profile", 1, 1, true),
                    getCell("total_lipid_profile"),
                    getCell("min_lipid_profile"),
                    getCell("max_lipid_profile"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.17 Total cholesterol"),
                    getCell("total_total_cholesterol"),
                    getCell("min_total_cholesterol"),
                    getCell("max_total_cholesterol"),
                ]
            },

            {
                tableCells: [
                    getCell("", "2.18 Triglycerides"),
                    getCell("total_triglycerides"),
                    getCell("min_triglycerides"),
                    getCell("max_triglycerides"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.19 LDL"),
                    getCell("total_ldl"),
                    getCell("min_ldl"),
                    getCell("max_ldl"),
                ]
            },
            {
                tableCells: [
                    getCell("", "Hormonal Test", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Low", 1, 1, true),
                    getCell("", "High", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.20 T3"),
                    getCell("total_t3"),
                    getCell("min_t3"),
                    getCell("max_t3"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.21 T4"),
                    getCell("total_t4"),
                    getCell("min_t4"),
                    getCell("max_t4"),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.22 TSH"),
                    getCell("total_tsh"),
                    getCell("min_tsh"),
                    getCell("max_tsh"),
                ]
            },
            {
                tableCells: [
                    getCell("", "Tumor Markers", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Number Positive", 2, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.23 PSA"),
                    getCell("total_psa"),
                    getCell("positive_psa", "", 2),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.24 CA 15-3"),
                    getCell(),
                    getCell("", "", 2),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.25 CA 19-9"),
                    getCell(),
                    getCell("", "", 2),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.26 CA 125"),
                    getCell(),
                    getCell("", "", 2),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.27 CEA"),
                    getCell(),
                    getCell("", "", 2),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.28 AFP"),
                    getCell(),
                    getCell("", "", 2),
                ]
            },
            {
                tableCells: [
                    getCell("", "CSF Chemistry", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Low", 1, 1, true),
                    getCell("", "High", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.29 Proteins"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.30 Glucose"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
        ]
    }, []);

    return <TableWrapper>
        <TableRowMapper tableRows={tableRows} data={data} locationUuids={locationUuids} startDate={startDate} endDate={endDate} />
    </TableWrapper>
}

export default BloodChemistry;