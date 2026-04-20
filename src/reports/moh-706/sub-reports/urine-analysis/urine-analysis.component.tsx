import React, { useMemo } from "react";
import TableWrapper from "../../../table-wrapper/table-wrapper.component";
import TableRowMapper from "../../../table-wrapper/table-row-mapper.component";
import { getCell } from "../../../../utils/utils";

interface UrineAnalysisProps {
    data?: any
}

const UrineAnalysis: React.FC<UrineAnalysisProps> = ({ data }) => {
    const tableRows = useMemo(() => {
        return [
            {
                tableCells: [
                    getCell("", "1 URINE ANALYSIS", 2, 1, true),
                    getCell()
                ]
            },
            {
                tableCells: [
                    getCell(),
                    getCell("", "Total Exam", 1, 1, true),
                    getCell("", "Number Positive", 1, 1, true)
                ]
            },
            {
                tableCells: [
                    getCell("", "1.1 Urine Chemistry", 1, 1, true),
                    getCell("total_urinalysis"),
                    getCell("positive_urinalysis"),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.2 Glucose", 1, 1, false),
                    getCell("total_urine_glucose"),
                    getCell("positive_urine_glucose"),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.3 Ketones", 1, 1, false),
                    getCell("total_urine_ketones"),
                    getCell("positive_urine_ketones"),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.4 Proteins", 1, 1, false),
                    getCell("total_urine_proteins"),
                    getCell("positive_urine_proteins"),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.5 Urine Microscopy", 1, 1, true),
                    getCell(),
                    getCell("", "Number Positive", 1, 1, true),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.6 Pus cells (>5/hpf)", 1, 1, false),
                    getCell("total_urine_pus_cells"),
                    getCell("positive_urine_pus_cells"),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.7 Shistosoma haematobium", 1, 1, false),
                    getCell("total_urine_s_haematobium"),
                    getCell("positive_urine_s_haematobium"),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.8 Trichomona vaginalis", 1, 1, false),
                    getCell("total_urine_t_vaginalis"),
                    getCell("positive_urine_t_vaginalis"),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.9 Yeast cells", 1, 1, false),
                    getCell("total_urine_yeast_cells"),
                    getCell("positive_urine_yeast_cells"),
                ]
            },
            {
                tableCells: [
                    getCell("", "1.10 Bacteria", 1, 1, false),
                    getCell(),
                    getCell(),
                ]
            },
        ]
    }, []);


    return <TableWrapper>
         <TableRowMapper tableRows={tableRows} data={data} />
    </TableWrapper>
}

export default UrineAnalysis;