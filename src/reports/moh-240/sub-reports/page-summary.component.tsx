import React, { useMemo } from "react";
import TableWrapper from "../../table-wrapper/table-wrapper.component";
import TableRowMapper from "../../table-wrapper/table-row-mapper.component";
import { getCell } from "../../../utils/utils";
import styles from "../moh-240.scss";

const Moh240PageSummary: React.FC = () => {
    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [
                    getCell("", "Page Summary", 8, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "Malaria Testing", 3, 1, true),
                    getCell("", "Type of test", 2, 1, true),
                    getCell("", "Referrals", 3, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "", 1, 2, true),
                    getCell("", "Number", 2, 1, true),
                    getCell("", "", 1, 2, true),
                    getCell("", "Number", 1, 2, true),
                    getCell("", "", 1, 1, true),
                    getCell("", "Number", 2, 1, true),
                ]
            },
            {
                tableCells: [
                    ,
                    getCell("", "OPD", 1, 1, true),
                    getCell("", "IP", 1, 1, true),
                    ,
                    ,
                    getCell(),
                    getCell("", "Routine", 1, 1, true),
                    getCell("", "Specialized", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "Malaria BS (Under five years)"),
                    getCell(),
                    getCell(),
                    getCell("", "No. of Routine tests", 1, 2),
                    getCell("", "", 1, 2),
                    getCell("", "From Other HF"),
                    getCell(),
                    getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "Malaria BS (5 years and above)"),
                    getCell(),
                    getCell(),
                    ,
                    ,
                    getCell("", "To Other HF"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "Malaria Rapid Diagnostic Tests (Under five years)"),
                    getCell(),
                    getCell(),
                    getCell("", "No. of Special tests", 1, 2),
                    getCell("", "", 1, 2),
                    getCell("", "To Reference Laboratories", 1, 2),
                    getCell("", "", 1, 2),
                    getCell("", "", 1, 2)
                ]
            },
            {
                tableCells: [
                    getCell("", "Malaria Rapid Diagnostic Tests (5 years and above)"),
                    getCell(),
                    getCell()
                ]
            },
        ]
    }, []);


    return <div className={styles.summarySection}>
        <TableWrapper className={styles.formTable}>
            <TableRowMapper tableRows={tableRows} />
        </TableWrapper>
    </div>
}

export default Moh240PageSummary;