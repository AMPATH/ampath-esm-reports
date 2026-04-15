import React, { useMemo } from "react";
import TableWrapper from "../../../table-wrapper/table-wrapper.component";
import TableRowMapper from "../../../table-wrapper/table-row-mapper.component";
import { getCell } from "../../../../utils/utils";

const Parasitology: React.FC = () => {
    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [
                    getCell("", "3 PARASITOLOGY", 3, 1, true)
                ]
            },
            {
                tableCells: [
                    getCell("", "Malaria Test", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Number Positive", 1, 1, true)
                ]
            },
            {
                tableCells: [
                    getCell("", "3.1 Malaria BS (Under five years)"),
                    getCell(),
                    getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "3.2 Malaria BS (5 years and above)"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.3 Malaria Rapid Diagnostic Tests (Under five years)"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.4 Malaria Rapid Diagnostic Tests (5 years and above)"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "Stool Examination", 1, 1, true),
                    getCell(),
                    getCell("", "Number Positive", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.5 Taenia spp."),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.6 Hymenolepis nana"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.7 Hookworm"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.8 Roundworm"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.9 S. mansoni"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.10 Trichuris trichura"),
                    getCell(),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.11 Amoeba"),
                    getCell(),
                    getCell(),
                ]
            },
        ]
    }, []);


    return <TableWrapper>
         <TableRowMapper tableRows={tableRows} />
    </TableWrapper>
}

export default Parasitology;