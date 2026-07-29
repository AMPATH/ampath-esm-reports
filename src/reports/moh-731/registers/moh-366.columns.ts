import { ageBandColumns, type RegisterColumn } from '../../../common/report-register';

const tbColumn = (heading: string, field: string, under15: boolean): RegisterColumn => ({
  header: `${heading} ${under15 ? '< 15 yrs' : '15+ yrs'}`,
  value: (row) => ((under15 ? row.age < 15 : row.age >= 15) ? (row.started_on_art === 'Y' ? row[field] : 'NA') : ''),
});

/**
 * The columns the MOH 366 register prints, in order.
 *
 * Kept beside the table it mirrors: most cells are not fields but a
 * presentation of them -- an age band crossed with a gender -- so an export
 * that listed the raw response would not line up with the printed register at
 * all.
 */
export const moh366Columns: RegisterColumn[] = [
  { header: 'No', value: (_row, index) => index + 1 },
  { header: 'Date', value: (row) => (row.date ? new Date(row.date).toLocaleDateString('en-GB') : '') },
  { header: 'AMRSID', value: (row) => row.amrsID },
  { header: 'National Identification Number', value: (row) => row.national_id_number },
  { header: 'Client CCC Number', value: (row) => row.ccc_number?.replace('-', '') },
  { header: 'Age', value: (row) => row.age },

  ...ageBandColumns('Starting ART', (row) => (row.started_on_art === 'Y' ? 'Y' : '')),

  tbColumn('Screened for TB', 'screened_for_tb', true),
  tbColumn('Screened for TB', 'screened_for_tb', false),
  tbColumn('Started TPT', 'started_on_tpt', true),
  tbColumn('Started TPT', 'started_on_tpt', false),

  ...ageBandColumns('Currently on ART', (row) =>
    row.revisit ? row.revisit : row.current_on_art > 0 ? row.current_on_art : 1,
  ),

  { header: 'DSD Status', value: (row) => row.dsd_status },
  { header: 'DSD Type', value: (row) => row.dsd_type },
  { header: 'Remarks', value: (row) => row.remarks },
];
