import React, { useMemo } from "react";
import { TableRow, TableCell } from '@carbon/react';
import TableWrapper from "../../table-wrapper/table-wrapper.component";
import styles from '../../table-wrapper/table-wrapper.scss';

const UrineAnalysis: React.FC = () => {
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
                    getCell("", "1 URINE ANALYSIS", 2, true),
                    getCell()
                ]
            },
            {
                tableCells: [
                    getCell(),
                    getCell("", "Total Exam", 1, true),
                    getCell("", "Number Positive", 1, true)
                ]
            },
            {
                tableCells: [
                    getCell("", "1.1 Urine Chemistry", 1, true),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.2 Glucose", 1, false),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.3 Ketones", 1, false),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.4 Proteins", 1, false),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.5 Urine Microscopy", 1, true),
                    getCell(),
                    getCell("", "Number Positive", 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.6 Pus cells (>5/hpf)", 1, false),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.7 Shistosoma haematobium", 1, false),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.8 Trichomona vaginalis", 1, false),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.9 Yeast cells", 1, false),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.10 Bacteria", 1, false),
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

export default UrineAnalysis;