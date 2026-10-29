import { type RegisterColumn } from '../../../../common/report-register';

/**
 * MOH 204A as the register prints it: one column per cell, in the order they appear.
 */
export const Moh413xportColumns: RegisterColumn[] = [
  { header: 'Date (DD/MM/YYYY) - A', value: (row) => row.date ?? '' },
  {
    header: 'NEMIS Number - B',
    value: (row) => row.cr_id ?? '',
  },
  { header: 'Name of girl - C', value: (row) => row.child_names ?? '' },
  { header: 'Date of Birth - D', value: (row) => row.date_of_birth ?? '' },
  { header: 'Name of School - E', value: (row) => row.name_of_school ?? '' },
  { header: 'Class - F', value: (row) => row.date_first_seen ?? '' },
  { header: 'Name of Parent/Guardian - F', value: (row) => row.parent_name ?? '' },
  { header: 'Parent/Guardian Telephone Number - G', value: (row) => row.parent_phone_number ?? '' },
  { header: 'Physical Address - H', value: (row) => row.address ?? '' },
  { header: 'HPV Vaccine Dose 1 - I', value: (row) => row.hpv_1 ?? '' },
  { header: 'HPV Vaccine Dose 2 -J', value: (row) => row.hpv_2 ?? '' },
  { header: 'Remarks - K', value: (row) => row.remarks ?? '' },
];
