import React, { useMemo } from "react";
import TableWrapper from "../../../table-wrapper/table-wrapper.component";
import TableRowMapper from "../../../table-wrapper/table-row-mapper.component";
import { getCell } from "../../../../utils/utils";

const Serology: React.FC = () => {
    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [getCell("", "7. SEROLOGY", 3, 1, true)]
            },
            {
                tableCells: [
                    getCell("", "Serological Test", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Number Positive", 1, 1, true),
                ]
            },
            { tableCells: [getCell("", "7.1 VDRL"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.2 TPHA"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.3 ASOT"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.4 HIV"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.5 Brucella"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.6 Rheumatoid factor"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.7 Helicobacter pylori"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.8 Hepatitis A test"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.9 Hepatitis B test"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.10 Hepatitis C test"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.11 HCG"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.12 CRAG Test"), getCell(), getCell()] },
        ]
    }, []);


    return <TableWrapper>
         <TableRowMapper tableRows={tableRows} />
    </TableWrapper>
}

export default Serology;