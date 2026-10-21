import React, { useMemo } from 'react';
import TableWrapper from '../../../table-wrapper/table-wrapper.component';
import styles from '../../../table-wrapper/table-wrapper.scss';
import TableRowMapper from '../../../table-wrapper/table-row-mapper.component';
import { getCell } from '../../../../utils/utils';

interface BloodChemistryProps {
  data?: any;
  locationUuids?: string;
  startDate?: string;
  endDate?: string;
}

const BloodChemistry: React.FC<BloodChemistryProps> = ({ data, locationUuids, startDate, endDate }) => {
  const tableRows = useMemo(() => {
    return [
      {
        tableCells: [getCell('', '2. BLOOD CHEMISTRY', 4, 1, true)],
      },
      {
        tableCells: [getCell('', '', 4)],
      },
      {
        tableCells: [
          getCell('', 'Blood Sugar Test', 1, 1, true),
          getCell('', 'Total Exam', 1, 1, true),
          getCell('', 'Low', 1, 1, true),
          getCell('', 'High', 1, 1, true),
        ],
      },
      {
        tableCells: [
          getCell('', '2.1 Blood sugar'),
          getCell('total_blood_sugar'),
          getCell('blood_sugar_low'),
          getCell('blood_sugar_high'),
        ],
      },
      {
        tableCells: [getCell('', '2.2 OGTT'), getCell('total_ogtt'), getCell('ogtt_low'), getCell('ogtt_high')],
      },
      {
        tableCells: [getCell('', '2.3 Renal Function Test', 1, 1, true), getCell(), getCell(), getCell()],
      },
      {
        tableCells: [
          getCell('', '2.4 Creatinine'),
          getCell('total_creatinine'),
          getCell('creatinine_low'),
          getCell('creatinine_high'),
        ],
      },
      {
        tableCells: [getCell('', '1.4 Proteins'), getCell(), getCell(), getCell()],
      },
      {
        tableCells: [getCell('', '2.5 Urea'), getCell('total_urea'), getCell('urea_low'), getCell('urea_high')],
      },

      {
        tableCells: [getCell('', '2.6 Sodium'), getCell('total_sodium'), getCell('sodium_low'), getCell('sodium_high')],
      },
      {
        tableCells: [
          getCell('', '2.7 Potassium'),
          getCell('total_potassium'),
          getCell('potassium_low'),
          getCell('potassium_high'),
        ],
      },
      {
        tableCells: [
          getCell('', '2.8 Chlorides'),
          getCell('total_chlorides'),
          getCell('chlorides_low'),
          getCell('chlorides_high'),
        ],
      },
      {
        tableCells: [getCell('', '2.8 Liver Function Test', 1, 1, true), getCell(), getCell(), getCell()],
      },
      {
        tableCells: [
          getCell('', '2.9 Direct bilirubin'),
          getCell('total_direct_bili'),
          getCell('direct_bili_low'),
          getCell('direct_bili_high'),
        ],
      },
      {
        tableCells: [
          getCell('', '2.10 Total bilirubin'),
          getCell('total_total_bili'),
          getCell('total_bili_low'),
          getCell('total_bili_high'),
        ],
      },
      {
        tableCells: [getCell('', '2.11 ASAT (SGOT)'), getCell('total_ast'), getCell('ast_low'), getCell('ast_high')],
      },
      {
        tableCells: [getCell('', '2.12 ALAT (SGPT)'), getCell('total_alt'), getCell('alt_low'), getCell('alt_high')],
      },
      {
        tableCells: [
          getCell('', '2.13 Serum Protein'),
          getCell('total_total_protein'),
          getCell('total_protein_low'),
          getCell('total_protein_high'),
        ],
      },
      {
        tableCells: [
          getCell('', '2.14 Albumin'),
          getCell('total_albumin'),
          getCell('albumin_low'),
          getCell('albumin_high'),
        ],
      },
      {
        tableCells: [
          getCell('', '2.15 Alkaline Phosphatase'),
          getCell('total_alk_phos'),
          getCell('alk_phos_low'),
          getCell('alk_phos_high'),
        ],
      },
      {
        tableCells: [
          getCell('', '2.16 Lipid Profile', 1, 1, true),
          getCell('total_lipid_profile'),
          getCell('lipid_profile_low'),
          getCell('lipid_profile_high'),
        ],
      },
      {
        tableCells: [
          getCell('', '2.17 Total cholesterol'),
          getCell('total_total_cholesterol'),
          getCell('total_cholesterol_low'),
          getCell('total_cholesterol_high'),
        ],
      },

      {
        tableCells: [
          getCell('', '2.18 Triglycerides'),
          getCell('total_triglycerides'),
          getCell('triglycerides_low'),
          getCell('triglycerides_high'),
        ],
      },
      {
        tableCells: [getCell('', '2.19 LDL'), getCell('total_ldl'), getCell('ldl_low'), getCell('ldl_high')],
      },
      {
        tableCells: [
          getCell('', 'Hormonal Test', 1, 1, true),
          getCell('', 'Total Exam', 1, 1, true),
          getCell('', 'Low', 1, 1, true),
          getCell('', 'High', 1, 1, true),
        ],
      },
      {
        tableCells: [getCell('', '2.20 T3'), getCell('total_t3'), getCell('t3_low'), getCell('t3_high')],
      },
      {
        tableCells: [getCell('', '2.21 T4'), getCell('total_t4'), getCell('t4_low'), getCell('t4_high')],
      },
      {
        tableCells: [getCell('', '2.22 TSH'), getCell('total_tsh'), getCell('tsh_low'), getCell('tsh_high')],
      },
      {
        tableCells: [
          getCell('', 'Tumor Markers', 1, 1, true),
          getCell('', 'Total Exam', 1, 1, true),
          getCell('', 'Number Positive', 2, 1, true),
        ],
      },
      {
        tableCells: [getCell('', '2.23 PSA'), getCell('total_psa'), getCell('positive_psa', '', 2)],
      },
      {
        tableCells: [getCell('', '2.24 CA 15-3'), getCell(), getCell('', '', 2)],
      },
      {
        tableCells: [getCell('', '2.25 CA 19-9'), getCell('total_ca_19_9'), getCell('positive_ca_19_9', '', 2)],
      },
      {
        tableCells: [getCell('', '2.26 CA 125'), getCell(), getCell('', '', 2)],
      },
      {
        tableCells: [getCell('', '2.27 CEA'), getCell('total_cea'), getCell('positive_cea', '', 2)],
      },
      {
        tableCells: [getCell('', '2.28 AFP'), getCell('total_afp'), getCell('positive_afp', '', 2)],
      },
      {
        tableCells: [
          getCell('', 'CSF Chemistry', 1, 1, true),
          getCell('', 'Total Exam', 1, 1, true),
          getCell('', 'Low', 1, 1, true),
          getCell('', 'High', 1, 1, true),
        ],
      },
      {
        tableCells: [
          getCell('', '2.29 Proteins'),
          getCell('total_proteins'),
          getCell('proteins_low'),
          getCell('proteins_high'),
        ],
      },
      {
        tableCells: [
          getCell('', '2.30 Glucose'),
          getCell('total_glucose'),
          getCell('glucose_low'),
          getCell('glucose_high'),
        ],
      },
    ];
  }, []);

  return (
    <TableWrapper>
      <TableRowMapper
        tableRows={tableRows}
        data={data}
        locationUuids={locationUuids}
        startDate={startDate}
        endDate={endDate}
      />
    </TableWrapper>
  );
};

export default BloodChemistry;
