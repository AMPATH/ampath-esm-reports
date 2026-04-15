import React from "react";
import { TableRow, TableCell } from "@carbon/react";
import styles from './table-wrapper.scss';
import { navigate } from "@openmrs/esm-framework";

interface TableRowMapperProps {
    tableRows: {
        tableCells: Array<{
            key: string;
            label: any;
            strong: boolean;
            colSpan: number;
            rowSpan: number;
        }>
    }[],
    data?: any
}

const TableRowMapper: React.FC<TableRowMapperProps> = ({ tableRows, data }) => {
    return <>
        {tableRows.map((tR) => (
            <TableRow>
                {tR.tableCells.map((tC, i) => {
                    const value = data ? data[tC.key] : "";

                    const onClick = () => {
                        if (!tC.label) {
                            navigate({ to: "home/reports/moh-240" });
                        }
                    };

                    return <TableCell className={styles.dataCell} colSpan={tC.colSpan} key={i} onClick={onClick}>
                        {tC.label ? (tC.strong ? <strong>{tC.label}</strong> : tC.label) : value}
                    </TableCell>

                })}
            </TableRow>
        ))}
    </>
}

export default TableRowMapper;