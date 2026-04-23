import React, { useMemo } from "react";
import TableWrapper from "../table-wrapper/table-wrapper.component";
import TableRowMapper from "../table-wrapper/table-row-mapper.component";
import { getCell } from "../../utils/utils";
import styles from './moh-505.scss';

const MOH505Header: React.FC = () => {
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
                    getCell("", "KMHFL code:", 1, 1, true),
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
                    getCell("", "Start date:", 1, 1, true),
                    getCell("", ""),
                    getCell("", "End date:", 1, 1, true),
                    getCell("", ""),
                ],
            },
        ];
    }, []);

    return <div className={styles.headerSection}>
        <h3>MOH 505 IDSR</h3>
        <h3>Weekly Epidemic Monitoring Form</h3>
        <TableWrapper>
            <TableRowMapper tableRows={tableRows} />
        </TableWrapper>
    </div>
}

export default MOH505Header;