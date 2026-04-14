import React, { useMemo } from "react";
import { TableRow, TableCell } from '@carbon/react';
import TableWrapper from "../../table-wrapper/table-wrapper.component";
import styles from '../../table-wrapper/table-wrapper.scss';

const Bacteriology: React.FC = () => {
    const getCell = (key = "", value = "", colSpan = 1, strong = false) => ({
        key,
        value,
        strong,
        colSpan
    });

    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [getCell("", "5 BACTERIOLOGY", 4, true)]
            },
            {
                tableCells: [
                    getCell("", "Bacteriological Sample", 1, true),
                    getCell("", "Total Exam", 1, true),
                    getCell("", "Total Cultures", 1, true),
                    getCell("", "Number Culture Positive", 1, true),
                ]
            },
            { tableCells: [getCell("", "5.1 Urine"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "5.2 Pus swabs"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "5.3 High Vaginal Swabs"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "5.4 Throat swab"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "5.5 Rectal swab"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "5.6 Blood"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "5.7 Water"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "5.8 Food"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "5.9 Urethral swabs"), getCell(), getCell(), getCell()] },
            {
                tableCells: [
                    getCell("", "Bacterial enteric pathogens", 2, true),
                    getCell("", "Total Exam", 1, true),
                    getCell("", "Number Positive", 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "5.10 Stool Cultures", 2),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "Stool Isolates", 3, true),
                    getCell("", "Number Positive", 1, true),
                ]
            },
            { tableCells: [getCell("", "5.11 Salmonella typhi", 3), getCell()] },
            { tableCells: [getCell("", "5.12 Shigella - dysenteriae type1", 3), getCell()] },
            { tableCells: [getCell("", "5.13 E. coli O157:H7", 3), getCell()] },
            { tableCells: [getCell("", "5.14 V. cholerae O1", 3), getCell()] },
            { tableCells: [getCell("", "5.15 V. cholerae O139", 3), getCell()] },

            {
                tableCells: [getCell("", "Bacterial meningitis", 4, true)]
            },
            {
                tableCells: [
                    getCell("", "Bacterial meningitis", 1, true),
                    getCell("", "Total Exam", 1, true),
                    getCell("", "Number Positive", 1, true),
                    getCell("", "Number Contaminated", 2, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "5.16 CSF"),
                    getCell(),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "Bacterial meningitis Serotypes", 1, true),
                    getCell("", "Number Positive", 3, true),
                ]
            },
            { tableCells: [getCell("", "5.17 Neisseria meningitidis A"), getCell("", "", 3)] },
            { tableCells: [getCell("", "5.18 Neisseria meningitidis B"), getCell("", "", 3)] },
            { tableCells: [getCell("", "5.19 Neisseria meningitidis C"), getCell("", "", 3)] },
            { tableCells: [getCell("", "5.20 Neisseria meningitidis W135"), getCell("", "", 3)] },
            { tableCells: [getCell("", "5.21 Neisseria meningitidis X"), getCell("", "", 3)] },
            { tableCells: [getCell("", "5.22 Neisseria meningitidis Y"), getCell("", "", 3)] },
            { tableCells: [getCell("", "5.23 Neisseria meningitidis (indeterminate)"), getCell("", "", 3)] },
            { tableCells: [getCell("", "5.24 Streptococcus pneumoniae"), getCell("", "", 3)] },
            { tableCells: [getCell("", "5.25 Haemophilus influenzae (type b)"), getCell("", "", 3)] },
            { tableCells: [getCell("", "5.26 Cryptococcal Meningitis"), getCell("", "", 3)] },
            {
                tableCells: [getCell("", "Bacterial Pathogens from other types of specimen", 4, true)]
            },
            { tableCells: [getCell("", "5.27 B. anthracis"), getCell("", "", 3)] },
            { tableCells: [getCell("", "5.28 Y. pestis"), getCell("", "", 3)] },
            { tableCells: [getCell("", "TB SPUTUM", 4)] },
            {
                tableCells: [
                    getCell("", "TB SPUTUM", 1, true),
                    getCell("", "Total Exam", 1, true),
                    getCell("", "Number Positive", 1, true),
                ]
            },
            { tableCells: [getCell("", "5.29 Total TB smears"), getCell(), getCell()] },
            { tableCells: [getCell("", "5.30 New presumptive TB cases"), getCell(), getCell()] },
            { tableCells: [getCell("", "5.31 TB Follow up"), getCell(), getCell()] },
            { tableCells: [getCell("", "5.32 Rifampicin Resistant TB"), getCell(), getCell()] },
            { tableCells: [getCell("", "5.33 MDR TB"), getCell(), getCell()] },
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

export default Bacteriology;