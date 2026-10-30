import { type RegisterColumn } from '../../../common/report-register/register-columns';

/**
 * MOH 204A as the register prints it: one column per cell, in the order they appear.
 */
export const TBExportColumns: RegisterColumn[] = [
  { header: 'Date (DD/MM/YYYY) - A', value: (row) => row.date ?? '' },
  {
    header: 'CR Number - B',
    value: (row) => row.child_number ?? '',
  },
  { header: 'TB Screening - C', value: (row) => row.child_names ?? '' },
  { header: 'TB Status - D', value: (row) => row.sex ?? '' },
  { header: 'Date of Birth - E', value: (row) => row.date_of_birth ?? '' },
  { header: 'Gender - F', value: (row) => row.date_first_seen ?? '' },
  { header: 'TCA - F', value: (row) => row.date_first_seen ?? '' },
];
