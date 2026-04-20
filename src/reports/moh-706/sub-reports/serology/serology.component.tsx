import React, { useMemo } from "react";
import TableWrapper from "../../../table-wrapper/table-wrapper.component";
import TableRowMapper from "../../../table-wrapper/table-row-mapper.component";
import { getCell } from "../../../../utils/utils";

interface SerologyProps {
    data?: any
}

const Serology: React.FC<SerologyProps> = ({ data }) => {
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
            { tableCells: [getCell("", "7.1 VDRL"), getCell("total_vdrl"), getCell("positive_vdrl")] },
            { tableCells: [getCell("", "7.2 TPHA"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.3 ASOT"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.4 HIV"), getCell("total_hiv"), getCell("positive_hiv")] },
            { tableCells: [getCell("", "7.5 Brucella"), getCell("total_brucella"), getCell("positive_brucella")] },
            { tableCells: [getCell("", "7.6 Rheumatoid factor"), getCell("total_rheumatoid_factor"), getCell("positive_rheumatoid_factor")] },
            { tableCells: [getCell("", "7.7 Helicobacter pylori"), getCell("total_h_pylori"), getCell("positive_h_pylori")] },
            { tableCells: [getCell("", "7.8 Hepatitis A test"), getCell(), getCell()] },
            { tableCells: [getCell("", "7.9 Hepatitis B test"), getCell("total_hep_b"), getCell("positive_hep_b")] },
            { tableCells: [getCell("", "7.10 Hepatitis C test"), getCell("total_hep_c"), getCell("positive_hep_c")] },
            { tableCells: [getCell("", "7.11 HCG"), getCell("total_hcg"), getCell("positive_hcg")] },
            { tableCells: [getCell("", "7.12 CRAG Test"), getCell("total_crag"), getCell("positive_crag")] },
        ]
    }, []);


    return <TableWrapper>
         <TableRowMapper tableRows={tableRows} data={data} />
    </TableWrapper>
}

export default Serology;