import React, { useMemo } from "react";
import TableWrapper from "../../../table-wrapper/table-wrapper.component";
import TableRowMapper from "../../../table-wrapper/table-row-mapper.component";
import { getCell } from "../../../../utils/utils";

const DrugSusceptibilityTesting: React.FC = () => {
    const cells = Array.from({ length: 25 }, (_, i) => getCell());

    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [getCell("", "9. DRUG SUSCEPTIBILITY TESTING", 12, 1, true)]
            },
            {
                tableCells: [
                    getCell("", "Drug Resistance Pattern", 1, 1, true),
                    getCell("", "a. Ciprofloxacin", 1, 1, true),
                    getCell("", "b. Levofloxacin", 1, 1, true),
                    getCell("", "c. Gentamicin", 1, 1, true),
                    getCell("", "d. Tetracycline", 1, 1, true),
                    getCell("", "e. Ceftazidime", 1, 1, true),
                    getCell("", "f. Cefuroxime", 1, 1, true),
                    getCell("", "g. Cefotaxime", 1, 1, true),
                    getCell("", "h. Ampicillin", 1, 1, true),
                    getCell("", "i. Cefazolin", 1, 1, true),
                    getCell("", "j. Amoxillin-Clavulanate", 1, 1, true),
                    getCell("", "k. Amikacin", 1, 1, true),
                    getCell("", "m. Chloramphenicol", 1, 1, true),
                    getCell("", "n. Cefepime", 1, 1, true),
                    getCell("", "p. Piperacillin-tazobactam", 1, 1, true),
                    getCell("", "q. obramycin", 1, 1, true),
                    getCell("", "r. Ampicillin Sulbactam", 1, 1, true),
                    getCell("", "s. Trimethoprim Sulfamethoxazole", 1, 1, true),
                    getCell("", "t. Penicillin", 1, 1, true),
                    getCell("", "u. Vancomycin", 1, 1, true),
                    getCell("", "v. Meropenem", 1, 1, true),
                    getCell("", "w. Clindamycin", 1, 1, true),
                    getCell("", "x. Doxycycline/tetracyclin", 1, 1, true),
                    getCell("", "y. Ceftazidime-avibactam", 1, 1, true),
                    getCell("", "z. Erythromycin", 1, 1, true),
                    getCell("", "aa. Gentamicin", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "9.1 E. coli O157:H7"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.2 Proteus spp"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.3 Salmonella spp"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.4 Shigella spp"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.5 Klebsiella pneumoniae"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.6 Pseudomonas spp"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.7 Staphylococcus aureus"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.8 Vibrio cholerae spp"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.9 Neisseria meningitidis"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.10 Neisseria gonorrhoeae"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.11 Streptococcus pneumoniae"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.12 Haemophilus influenzae"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.13 Haemophilus parainfluenzae"),
                    ...cells
                ]
            },
            {
                tableCells: [
                    getCell("", "9.14 Bacterial vaginosis"),
                    ...cells
                ]
            },
        ]
    }, []);


    return <TableWrapper>
        <TableRowMapper tableRows={tableRows} />
    </TableWrapper>
}

export default DrugSusceptibilityTesting;