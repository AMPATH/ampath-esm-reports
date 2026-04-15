import React, { useMemo } from "react";
import TableWrapper from "../../../table-wrapper/table-wrapper.component";
import TableRowMapper from "../../../table-wrapper/table-row-mapper.component";
import { getCell } from "../../../../utils/utils";

const SpecimenReferralToHigherLevels: React.FC = () => {
    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [getCell("", "8. SPECIMEN REFERRAL TO HIGHER LEVELS", 3, 1, true)]
            },
            {
                tableCells: [
                    getCell("", "Specimen referral", 1, 1, true),
                    getCell("", "No. of specimens", 1, 1, true),
                    getCell("", "No. of results received", 1, 1, true),
                ]
            },
            { tableCells: [getCell("", "8.1 CD4"), getCell(), getCell()] },
            { tableCells: [getCell("", "8.2 Viral load"), getCell(), getCell()] },
            { tableCells: [getCell("", "8.3 EID"), getCell(), getCell()] },
            { tableCells: [getCell("", "8.4 Discodant/discrepant"), getCell(), getCell()] },
            { tableCells: [getCell("", "8.5 TB Culture"), getCell(), getCell()] },
            { tableCells: [getCell("", "8.6 Virological"), getCell(), getCell()] },
            { tableCells: [getCell("", "8.7 Clinical Chemistry"), getCell(), getCell()] },
            { tableCells: [getCell("", "8.8 Histology/cytology"), getCell(), getCell()] },
            { tableCells: [getCell("", "8.9 Haematological"), getCell(), getCell()] },
            { tableCells: [getCell("", "8.10 Parasitological"), getCell(), getCell()] },
            { tableCells: [getCell("", "8.11 Blood samples for transfusion screening"), getCell(), getCell()] },
        ]
    }, []);


    return <TableWrapper>
         <TableRowMapper tableRows={tableRows} />
    </TableWrapper>
}

export default SpecimenReferralToHigherLevels;