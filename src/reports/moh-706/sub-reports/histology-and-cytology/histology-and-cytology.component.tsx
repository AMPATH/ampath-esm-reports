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
            { tableCells: [getCell("", "6.4 Thyroid"), getCell("total_cyt_thyroid"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.5 Lymph nodes"), getCell("total_cyt_lymph_nodes"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.6 Liver"), getCell("total_cyt_liver"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.7 Breast"), getCell("total_cyt_breast"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.8 Soft tissue masses"), getCell("total_cyt_soft_tissue"), getCell(), getCell()] },
            {
                tableCells: [
                    getCell("", "Fluid Cytology", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Malignant", 2, 1, true),
                    getCell()
                ]
            },
            { tableCells: [getCell("", "6.9 Ascitic fluid"), getCell("total_cyt_ascitic_fluid"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.10 CSF"), getCell("total_cyt_csf"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.11 Pleural fluid"), getCell("total_cyt_pleural_fluid"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.12 Urine"), getCell("total_cyt_urine"), getCell(), getCell()] },
            {
                tableCells: [
                    getCell("", "Tissue Histology", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Malignant", 1, 1, true),
                    getCell("", "TNM Stage", 1, 1, true),
                ]
            },
            { tableCells: [getCell("", "6.13 Prostate"), getCell("total_cyt_prostate"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.14 Breast tissue"), getCell("total_cyt_breast_tissue"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.15 Ovary"), getCell("total_cyt_ovary"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.16 Uterus (Cervix)"), getCell("total_cyt_uterus_cervix"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.17 Uterus (Endometrium)"), getCell("total_cyt_uterus_endometrium"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.18 Skin"), getCell("total_cyt_skin"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.19 Head and Neck"), getCell("total_cyt_head_neck"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.20 Oral"), getCell("total_cyt_oral"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.21 Esophagus"), getCell("total_cyt_esophagus"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.22 Colorectal"), getCell("total_cyt_colorectal"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.23 Hepatobiliary"), getCell("total_cyt_hepatobiliary"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.24 Soft tissue and bone"), getCell("total_cyt_soft_tissue_bone"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.25 Lymph nodes tissue"), getCell("total_cyt_lymph_nodes_tissue"), getCell(), getCell()] },
            {
                tableCells: [
                    getCell("", "Bone Marrow Studies", 1, 1, true),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Malignant", 1, 1, true),
                    getCell()
                ]
            },
            { tableCells: [getCell("", "6.26 Bone marrow aspirate"), getCell("total_cyt_bone_marrow"), getCell(), getCell()] },
            { tableCells: [getCell("", "6.27 Trephine biopsy"), getCell(), getCell(), getCell()] },
        ]
    }, []);


    return <TableWrapper>
        <TableRowMapper tableRows={tableRows} />
    </TableWrapper>
}

export default HistologyAndCytology;