import React, { useMemo } from "react";
import TableWrapper from "../../../table-wrapper/table-wrapper.component";
import { getCell } from "../../../../utils/utils";
import TableRowMapper from "../../../table-wrapper/table-row-mapper.component";

const Haematology: React.FC = () => {
    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [
                    getCell("", "4 HAEMATOLOGY", 4, 1, true)
                ]
            },
            {
                tableCells: [
                    getCell("", "Haematology tests", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "HB <5 g/dl", 1, 1, true),
                    getCell("", "HB between 5 and 10 g/dl", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "4.1 Full blood count"),
                    getCell(),
                    getCell(),
                    getCell()
                ]
            },
            {
                tableCells: [
                    getCell("", "4.2 HB estimation tests (other techniques)"),
                    getCell(),
                    getCell(),
                    getCell()
                ]
            },
            {
                tableCells: [
                    getCell(),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Pre-diabetes", 1, 1, true),
                    getCell("", "Diabetes", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "Hemoglobin A1c (HbA1c)"),
                    getCell(),
                    getCell(),
                    getCell()
                ]
            },
            {
                tableCells: [
                    getCell(),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Number <500", 2, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "4.4 CD4"),
                    getCell(),
                    getCell("", "", 2),
                ]
            },
            {
                tableCells: [
                    getCell("", "Other Haematology tests", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Number Positive", 2, 1, true),
                ]
            },
            {
                tableCells: [getCell("", "4.5 Sickling test"), getCell(), getCell("", "", 2)]
            },
            {
                tableCells: [getCell("", "4.6 Peripheral blood films"), getCell(), getCell("", "", 2)]
            },
            {
                tableCells: [getCell("", "4.7 BMA"), getCell(), getCell("", "", 2)]
            },
            {
                tableCells: [getCell("", "4.8 Coagulation profile"), getCell(), getCell("", "", 2)]
            },
            {
                tableCells: [getCell("", "4.9 Reticulocyte"), getCell(), getCell("", "", 2)]
            },
            {
                tableCells: [
                    getCell(),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "High", 2, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "4.10 Erythrocyte Sedimentation Rate"),
                    getCell(),
                    getCell("", "", 2),
                ]
            },
            {
                tableCells: [
                    getCell("", "Blood Grouping", 3, 1, true),
                    getCell("", "Number", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "4.11 Total blood group tests", 3),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "4.12 Blood units grouped", 3),
                    getCell(),
                ]
            },
            {
                tableCells: [
                    getCell("", "Blood Safety", 4, 1, true),
                ]
            },
            {
                tableCells: [getCell("", "4.13 Blood units received from blood transfusion centres", 3), getCell()]
            },
            {
                tableCells: [getCell("", "4.14 Blood units collected at facility", 3), getCell()]
            },
            {
                tableCells: [getCell("", "4.15 Blood units transfused", 3), getCell()]
            },
            {
                tableCells: [getCell("", "4.16 Transfusion reactions reported and investigated", 3), getCell()]
            },
            {
                tableCells: [getCell("", "4.17 Blood grouping and cross matched", 3), getCell()]
            },
            {
                tableCells: [getCell("", "4.18 Blood units discarded", 3), getCell()]
            },
            {
                tableCells: [
                    getCell("", "Blood Screening at facility", 3, 1, true),
                    getCell("", "Number Positive", 1, 1, true),
                ]
            },
            {
                tableCells: [getCell("", "4.19 HIV", 3), getCell()]
            },
            {
                tableCells: [getCell("", "4.20 Hepatitis B", 3), getCell()]
            },
            {
                tableCells: [getCell("", "4.21 Hepatitis C", 3), getCell()]
            },
            {
                tableCells: [getCell("", "4.22 Syphilis", 3), getCell()]
            },
        ]
    }, []);


    return <TableWrapper>
        <TableRowMapper tableRows={tableRows} />
    </TableWrapper>
}

export default Haematology;