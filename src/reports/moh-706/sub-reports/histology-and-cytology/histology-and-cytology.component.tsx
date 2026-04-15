import React, { useMemo } from "react";
import TableWrapper from "../../../table-wrapper/table-wrapper.component";
import TableRowMapper from "../../../table-wrapper/table-row-mapper.component";
import { getCell } from "../../../../utils/utils";

const HistologyAndCytology: React.FC = () => {
    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [getCell("", "6 HISTOLOGY AND CYTOLOGY", 4, 1, true)]
            },
            {
                tableCells: [
                    getCell("", "Smears", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Malignant", 1, 1, true),
                    getCell(),
                ]
            },
            { tableCells: [getCell("", "6.1 PAP smear"), getCell(), getCell(), getCell(),] },
            { tableCells: [getCell("", "6.2 Touch preparations"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.3 Tissue impressions"), getCell(), getCell(), getCell()] },
            {
                tableCells: [
                    getCell("", "Fine Needle Aspirates", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Malignant", 1, 1, true),
                    getCell()
                ]
            },
            { tableCells: [getCell("", "6.4 Thyroid"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.5 Lymph nodes"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.6 Liver"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.7 Breast"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.8 Soft tissue masses"), getCell(), getCell(), getCell()] },
            {
                tableCells: [
                    getCell("", "Fluid Cytology", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Malignant", 2, 1, true),
                    getCell()
                ]
            },
            { tableCells: [getCell("", "6.9 Ascitic fluid"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.10 CSF"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.11 Pleural fluid"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.12 Urine"), getCell(), getCell(), getCell()] },
            {
                tableCells: [
                    getCell("", "Tissue Histology", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Malignant", 1, 1, true),
                    getCell("", "TNM Stage", 1, 1, true),
                ]
            },
            { tableCells: [getCell("", "6.13 Prostate"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.14 Breast tissue"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.15 Ovary"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.16 Uterus (Cervix)"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.17 Uterus (Endometrium)"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.18 Skin"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.19 Head and Neck"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.20 Oral"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.21 Esophagus"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.22 Colorectal"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.23 Hepatobiliary"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.24 Soft tissue and bone"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.25 Lymph nodes tissue"), getCell(), getCell(), getCell()] },
            {
                tableCells: [
                    getCell("", "Bone Marrow Studies", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Malignant", 1, 1, true),
                    getCell()
                ]
            },
            { tableCells: [getCell("", "6.26 Bone marrow aspirate"), getCell(), getCell(), getCell()] },
            { tableCells: [getCell("", "6.27 Trephine biopsy"), getCell(), getCell(), getCell()] },
        ]
    }, []);


    return <TableWrapper>
        <TableRowMapper tableRows={tableRows} />
    </TableWrapper>
}

export default HistologyAndCytology;