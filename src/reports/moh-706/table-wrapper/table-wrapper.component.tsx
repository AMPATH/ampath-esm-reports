import React from 'react';
import { Table, TableBody } from '@carbon/react';
import styles from './table-wrapper.scss';

interface TableWrapperProps {
    children: React.ReactNode;
}

const TableWrapper: React.FC<TableWrapperProps> = ({ children }) => {
    return <>
        <div className={styles.tableWrapper}>
            <Table size="sm" className={styles.tableComponent}>
                <TableBody>
                    {children}
                </TableBody>
            </Table>
        </div>
    </>
}

export default TableWrapper;