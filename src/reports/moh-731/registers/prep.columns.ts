import { type RegisterColumn } from '../../../common/report-register';

/**
 * The PrEP register's columns, with the headings the register prints.
 *
 * This register prints two rows per client with cells spanning both, so the
 * headings could not be paired to fields by position; they are taken from the
 * header row by the column letter each one carries.
 */
export const prepExportColumns: RegisterColumn[] = [
  { header: 'PrEP No (a)', value: (row) => row.PrEP_Number ?? '' },
  { header: 'Date of Visit (b)', value: (row) => row.Date_Of_Visit ?? '' },
  { header: 'AMRSID (l)', value: (row) => row.amrsId ?? '' },
  { header: 'National Identification Number (c)', value: (row) => row.National_ID ?? '' },
  { header: 'National Unique Patient Identifier (NUPI) (c)', value: (row) => row.NUPI ?? '' },
  { header: 'Age (d)', value: (row) => row.Age ?? '' },
  { header: 'Sex (M/F) (e)', value: (row) => row.Sex ?? '' },
  {
    header: 'Population type (f): 1. General Population 2. Discordant Couple 3. MSM/MSW 4. FSW 5. PWID/PWUD 6. VP',
    value: (row) => row.population_type ?? '',
  },
  {
    header: 'Client PrEP Status (g): N-New C-Continuing D-Discontinued R-Restart',
    value: (row) => row.client_prep_status ?? '',
  },
  {
    header:
      'PrEP Method (h): 1. Daily oral PrEP 2. Event driven oral PrEP 3. Dapivirine Vaginal ring 4. Cabotegravir Injectable',
    value: (row) => row.prep_method ?? '',
  },
  { header: 'HIV Results (N/P/Ic/NA) (i)', value: (row) => row.HIV_result ?? '' },
  { header: 'Diagnosed with STI (N/Y) (j)', value: (row) => row.with_STI ?? '' },
  { header: 'Remarks (k)', value: (row) => row.remarks ?? '' },
];
