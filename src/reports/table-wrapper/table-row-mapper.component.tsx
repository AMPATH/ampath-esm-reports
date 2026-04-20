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
    data?: any,
    redirectTo?: string
}

const TableRowMapper: React.FC<TableRowMapperProps> = ({ tableRows, data, redirectTo = "home/reports/moh-240" }) => {
    return <>
        {tableRows.map((tR) => (
            <TableRow>
                {tR.tableCells.map((tC, i) => {
                    const value = data ? data[tC.key] : "";

                    const onClick = () => {
                        if (!tC.label) {
                            navigate({ to: redirectTo });
                        }
                    };

                    return <TableCell className={styles.dataCell} colSpan={tC.colSpan} key={i} onClick={onClick} {...({ rowSpan: tC.rowSpan } as any)}>
                        {tC.label ? (tC.strong ? <strong>{tC.label}</strong> : tC.label) : value}
                    </TableCell>

                })}
            </TableRow>
        ))}
    </>
}

export default TableRowMapper;