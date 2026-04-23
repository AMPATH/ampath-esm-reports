import React, { useMemo } from "react";
import TableWrapper from "../table-wrapper/table-wrapper.component";
import TableRowMapper from "../table-wrapper/table-row-mapper.component";
import { getCell } from "../../utils/utils";
import ReportFiltersComponent from "../../common/report-filters/report-filters.component";
import MOH505Header from "./moh-505-header.component";

const Moh505Report: React.FC = () => {
    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [
                    getCell("", "Diseases, Conditions or Events", 1, 2, true),
                    getCell("", "< 5 years", 2, 1, true),
                    getCell("", "≥ 5 years", 6, 1, true),
                    getCell("", "Diseases, Conditions or Events", 1, 2, true),
                    getCell("", "< 5 years", 2, 1, true),
                    getCell("", "≥ 5 years", 2, 1, true),
                ]
            },
            {
                tableCells: [
                    ,
                    getCell("", "Cases", 1, 1, true),
                    getCell("", "Deaths", 1, 1, true),
                    getCell("", "Cases", 1, 1, true),
                    getCell("", "Deaths", 5, 1, true),
                    ,
                    getCell("", "Cases", 1, 1, true),
                    getCell("", "Deaths", 1, 1, true),
                    getCell("", "Cases", 1, 1, true),
                    getCell("", "Deaths", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "AEFI*"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "Meningococcal Meningitis"), getCell(), getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "Acute Jaundice"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "Neonatal deaths"), getCell(), getCell(), getCell("", "", 2, 2)
                ]
            },
            {
                tableCells: [
                    getCell("", "Acute Malnutrition"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "Neonatal Tetanus"), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "AFP (Poliomyelitis)**"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "Plague"), getCell(), getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "Anthrax"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "Rabies"), getCell(), getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "Cholera"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "Rift Valley Fever"), getCell(), getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "Dengue"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "SARI (Cluster ≥3 cases)*****"), getCell(), getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "Dysentery (Bacillary)"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "Suspected MDR/XDR TB"), getCell(), getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "Guinea Worm Disease"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "Typhoid"), getCell(), getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "Measles"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "VHF******", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2)
                ]
            },
            {
                tableCells: [
                    getCell("", "Suspected Malaria***"), getCell(), getCell(), getCell(),
                    getCell("", "", 5)
                ]
            },
            {
                tableCells: [
                    getCell("", "Deaths due to Malaria****", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2),
                    getCell("", "", 5, 2),
                    getCell("", "Yellow Fever", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2)
                ]
            },
            {
                tableCells: [
                    ,
                ]
            },
            {
                tableCells: [
                    getCell("", "Maternal deaths"), getCell(), getCell(), getCell(),
                    getCell("", "", 5),
                    getCell("", "Others (Specify)*******"), getCell(), getCell(), getCell(), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "", 14)
                ]
            },
            {
                tableCells: [
                    getCell("", "Disease", 1, 1, true), getCell("", "Microscopy", 3, 1, true),
                    getCell("", "mRDT", 5, 1, true),
                    getCell("", "Disease", 2, 1, true), getCell("", "Laboratory diagnosis", 3, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "Malaria", 1, 1, true), getCell("", "<5 yrs"), getCell("", "≥5 yrs"), getCell("", "Total"),
                    getCell("", "<5 yrs", 2), getCell("", "≥5 yrs", 3),
                    getCell("", "Shigella Dysentery", 2, 1, true),
                    getCell("", "<5 yrs", 2), getCell("", "≥5 yrs", 1),
                ]
            },
            {
                tableCells: [
                    getCell("", "Tested"), getCell(), getCell(), getCell(),
                    getCell("", "", 2), getCell("", "", 3),
                    getCell("", "Tested", 2), getCell("", "", 2), getCell("", "", 1)
                ]
            },
            {
                tableCells: [
                    getCell("", "Positive"), getCell(), getCell(), getCell(),
                    getCell("", "", 2), getCell("", "", 3),
                    getCell("", "Positive", 2), getCell("", "", 2), getCell("", "", 1)
                ]
            },
            {
                tableCells: [
                    getCell("", "Bacterial Meningitis", 1, 2, true), getCell("", "No CSF", 1, 2, true),
                    getCell("", "No contaminated", 1, 2, true), getCell("", "No Tested", 1, 2, true), getCell("", "+ve Nm", 1, 2, true),
                    getCell("", "+ve Sp", 1, 2, true), getCell("", "+ve H influenza", 3, 2, true), getCell("", "Tuberculosis (MDR/XDR)", 2, 2, true),
                    getCell("", "<5 yrs", 2, 2,), getCell("", "≥5 yrs", 1, 2,)
                ]
            },
            {
                tableCells: [
                    ,
                ]
            },
            {
                tableCells: [
                    getCell("", "", 1, 2), getCell("", "", 1, 2),
                    getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2),
                    getCell("", "", 1, 2), getCell("", "", 2, 2), getCell("", "Tested", 2), getCell("", "", 2), getCell()
                ]
            },
            {
                tableCells: [
                    , , , , , , , , getCell("", "Positive", 2), getCell("", "", 2), getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "No of CSF Sub-Typed", 1, 2, true),
                    getCell("", "+ve NmA", 1, 2, true),
                    getCell("", "+ve NmB", 1, 2, true),
                    getCell("", "+ve NmC", 1, 2, true),
                    getCell("", "+ve NmW 135", 1, 2, true),
                    getCell("", "+ve NmX", 1, 2, true),
                    getCell("", "+ve NmY", 1, 2, true),
                    getCell("", "Indeterminate", 1, 2, true),
                    getCell("", "Hib", 1, 2, true),
                    getCell("", "Typhoid", 2, 2, true),
                    getCell("", "< 5 years", 2, 2),
                    getCell("", "≥ 5 years", 1, 2)
                ]
            },
            {
                tableCells: [
                    ,
                ]
            },
            {
                tableCells: [
                    getCell("", "", 1, 2), getCell("", "", 1, 2),
                    getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2),
                    getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "", 1, 2), getCell("", "Tested", 2), getCell("", "", 2), getCell("", "", 1)
                ]
            },
            {
                tableCells: [
                    , , , , , , , , , getCell("", "Positive", 2, 1,), getCell("", "", 2, 1), getCell("", "", 1, 1)
                ]
            },
            {
                tableCells: [
                    ,
                ]
            }
        ]
    }, []);


    return <>
        <ReportFiltersComponent reportName="MOH-505 Report" mode="monthly" />
        <MOH505Header />
        <TableWrapper>
            <TableRowMapper tableRows={tableRows} />
        </TableWrapper>
    </>
}

export default Moh505Report;