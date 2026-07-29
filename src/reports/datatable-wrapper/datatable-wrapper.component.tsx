import {
  DataTable,
  type DataTableHeader,
  type DataTableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react';
import React from 'react';

interface DatatableWrapperProps {
  rows: Omit<DataTableRow<any[]>, 'cells'>[];
  headers: DataTableHeader[];
  subHeaders?: string[];
  /** Applied to the table, so a register can use its own stylesheet */
  className?: string;
}

const DatatableWrapper: React.FC<DatatableWrapperProps> = ({ rows, headers, subHeaders = [], className }) => {
  return (
    <DataTable rows={rows} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps, getCellProps }) => (
        <Table {...getTableProps()} className={className}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
              ))}
            </TableRow>
            {subHeaders && subHeaders.length && (
              <TableRow>
                {subHeaders.map((head, i) => (
                  <TableHeader key={i}>{head}</TableHeader>
                ))}
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};

export default DatatableWrapper;
