import React, { useMemo } from "react";
import { TableRow, TableCell } from '@carbon/react';
import TableWrapper from "../../table-wrapper/table-wrapper.component";
import styles from '../../table-wrapper/table-wrapper.scss';

const Parasitology: React.FC = () => {
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
                    getCell("", "3 PARASITOLOGY", 3, true)
                ]
            },
            {
                tableCells: [
                    getCell("", "Malaria Test", 1, true),
                    getCell("", "Total Exam", 1, true),
                    getCell("", "Number Positive", 1, true)
                ]
            },
            {
                tableCells: [
                    getCell("", "3.1 Malaria BS (Under five years)"),
                    getCell(),
                    getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "3.2 Malaria BS (5 years and above)"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.3 Malaria Rapid Diagnostic Tests (Under five years)"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.4 Malaria Rapid Diagnostic Tests (5 years and above)"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "Stool Examination", 1, true),
                    getCell(),
                    getCell("", "Number Positive", 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.5 Taenia spp."),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.6 Hymenolepis nana"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.7 Hookworm"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.8 Roundworm"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.9 S. mansoni"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.10 Trichuris trichura"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.11 Amoeba"),
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

export default Parasitology;