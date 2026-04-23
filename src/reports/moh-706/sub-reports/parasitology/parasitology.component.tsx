import React, { useMemo } from "react";
import TableWrapper from "../../../table-wrapper/table-wrapper.component";
import TableRowMapper from "../../../table-wrapper/table-row-mapper.component";
import { getCell } from "../../../../utils/utils";

interface ParasitologyProps {
    data?: any,
    locationUuids?: string,
    startDate?: string,
    endDate?: string
}

const Parasitology: React.FC<ParasitologyProps> = ({ data, locationUuids, startDate, endDate }) => {
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
                    getCell("total_malaria_bs_under_5"),
                    getCell("positive_malaria_bs_under_5")
                ]
            },
            {
                tableCells: [
                    getCell("", "3.2 Malaria BS (5 years and above)"),
                    getCell("total_malaria_bs_5_and_above"),
                    getCell("positive_malaria_bs_5_and_above"),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.3 Malaria Rapid Diagnostic Tests (Under five years)"),
                    getCell("total_malaria_rdt_under_5"),
                    getCell("positive_malaria_rdt_under_5"),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.4 Malaria Rapid Diagnostic Tests (5 years and above)"),
                    getCell("total_malaria_rdt_5_and_above"),
                    getCell("positive_malaria_rdt_5_and_above"),
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
                    getCell("total_hookworm"),
                    getCell("positive_hookworm"),
                ]
            },
            {
                tableCells: [
                    getCell("", "3.8 Roundworm"),
                    getCell("total_roundworms"),
                    getCell("positive_roundworms"),
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
         <TableRowMapper tableRows={tableRows} data={data} locationUuids={locationUuids} startDate={startDate} endDate={endDate} />
    </TableWrapper>
}

export default Parasitology;