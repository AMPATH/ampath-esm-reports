import React, { useMemo } from "react";
import { TableRow, TableCell } from '@carbon/react';
import TableWrapper from "../../table-wrapper/table-wrapper.component";
import styles from '../../table-wrapper/table-wrapper.scss';

const BloodChemistry: React.FC = () => {
    const getCell = (key = "", value = "", colSpan = 1, strong = false) => ({
        key,
        value,
        strong,
        colSpan
    });

    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [
                    getCell("", "2. BLOOD CHEMISTRY", 4, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "", 4),
                ]
            },
            {
                tableCells: [
                    getCell("", "Blood Sugar Test", 1, true),
                    getCell("", "Total Exam", 1, true),
                    getCell("", "Low", 1, true),
                    getCell("", "High", 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.1 Blood sugar"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.2 OGTT"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.3 Renal Function Test", 1, true),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.4 Creatinine"),
                    getCell(),
                    getCell(),
                    getCell(),
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
                    getCell(),
                    getCell(),
                    getCell(),
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
                    getCell("", "2.8 Liver Function Test", 1, true),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.9 Direct bilirubin"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.10 Total bilirubin"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.11 ASAT (SGOT)"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.12 ALAT (SGPT)"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.13 Serum Protein"),
                    getCell(),
                    getCell(),
                    getCell(),
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
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.16 Lipid Profile", 1, true),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.17 Total cholesterol"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.18 Triglycerides"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.19 LDL"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "Hormonal Test", 1, true),
                    getCell("", "Total Exam", 1, true),
                    getCell("", "Low", 1, true),
                    getCell("", "High", 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.20 T3"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.21 T4"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.22 TSH"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "Tumor Markers", 1, true),
                    getCell("", "Total Exam", 1, true),
                    getCell("", "Number Positive", 2, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "2.23 PSA"),
                    getCell(),
                    getCell("", "", 2),
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
                    getCell("", "CSF Chemistry", 1, true),
                    getCell("", "Total Exam", 1, true),
                    getCell("", "Low", 1, true),
                    getCell("", "High", 1, true),
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
        {tableRows.map((tR) => (
            <TableRow>
                {tR.tableCells.map((tC) => (
                    <TableCell className={styles.dataCell} colSpan={tC.colSpan}>
                        {tC.strong ? <strong>{tC.value}</strong> : tC.value}
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </TableWrapper>
}

export default BloodChemistry;