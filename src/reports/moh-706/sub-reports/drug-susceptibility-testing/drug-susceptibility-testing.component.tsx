import React, { useMemo } from "react";
import { TableRow, TableCell } from '@carbon/react';
import TableWrapper from "../../table-wrapper/table-wrapper.component";
import styles from '../../table-wrapper/table-wrapper.scss';

const DrugSusceptibilityTesting: React.FC = () => {
    const getCell = (key = "", value = "", colSpan = 1, strong = false) => ({
        key,
        value,
        strong,
        colSpan
    });

    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [getCell("", "9. DRUG SUSCEPTIBILITY TESTING", 12, true)]
            },
            {
                tableCells: [
                    getCell("", "Drug Resistance Pattern", 1, true),
                    getCell("", "a. Ciprofloxacin", 1, true),
                    getCell("", "b. Levofloxacin", 1, true),
                    getCell("", "c. Gentamicin", 1, true),
                    getCell("", "d. Tetracycline", 1, true),
                    getCell("", "e. Ceftazidime", 1, true),
                    getCell("", "f. Cefuroxime", 1, true),
                    getCell("", "g. Cefotaxime", 1, true),
                    getCell("", "h. Ampicillin", 1, true),
                    getCell("", "i. Cefazolin", 1, true),
                    getCell("", "j. Amoxillin-Clavulanate", 1, true),
                    getCell("", "k. Amikacin", 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "9.1 E. coli O157:H7"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.2 Proteus spp"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.3 Salmonella spp"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.4 Shigella spp"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.5 Klebsiella pneumoniae"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.6 Pseudomonas spp"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.7 Staphylococcus aureus"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.8 Vibrio cholerae spp"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.9 Neisseria meningitidis"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.10 Neisseria gonorrhoeae"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.11 Streptococcus pneumoniae"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.12 Haemophilus influenzae"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.13 Haemophilus parainfluenzae"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "9.14 Bacterial vaginosis"),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell(), getCell(),
                    getCell(), getCell(), getCell()
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

export default DrugSusceptibilityTesting;