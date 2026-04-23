import React, { useMemo } from "react";
import TableWrapper from "../table-wrapper/table-wrapper.component";
import TableRowMapper from "../table-wrapper/table-row-mapper.component";
import { getCell } from "../../utils/utils";
import styles from './moh-706.scss';

const MOH706Header: React.FC = () => {
    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [
                    getCell("", "County:", 1, 1, true),
                    getCell("", "", 3),
                ],
            },
            {
                tableCells: [
                    getCell("", "Sub-County:", 1, 1, true),
                    getCell("", "", 3),
                ],
            },
            {
                tableCells: [
                    getCell("", "Health Facility:", 1, 1, true),
                    getCell("", "", 3),
                ],
            },
            {
                tableCells: [
                    getCell("", "KMHFL Code:", 1, 1, true),
                    getCell("", "", 3),
                ],
            },
            {
                tableCells: [
                    getCell("", "Facility Type:", 1, 1, true),
                    getCell("", ""),
                    getCell("", "Man. Agency:", 1, 1, true),
                    getCell("", ""),
                ],
            },
            {
                tableCells: [
                    getCell("", "Start Date:", 1, 1, true),
                    getCell("", ""),
                    getCell("", "End Date:", 1, 1, true),
                    getCell("", ""),
                ],
            },
        ];
    }, []);

    return <div className={styles.headerSection}>
        <h3>MOH 706 _Laboratory (LAB) Services Summary</h3>
        <TableWrapper>
            <TableRowMapper tableRows={tableRows} />
        </TableWrapper>
    </div>
}

export default MOH706Header;