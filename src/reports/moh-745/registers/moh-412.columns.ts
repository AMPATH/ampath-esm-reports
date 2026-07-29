import { type RegisterColumn } from '../../../common/report-register';

/**
 * MOH 412 as the register prints it: one column per cell, in the order they appear.
 *
 * One column is rendered by the table but has no heading above it -- the
 * header row is 24 columns wide against 25 of data. It carries its field name
 * rather than a heading borrowed from a neighbouring column.
 */
export const moh412ExportColumns: RegisterColumn[] = [
  { header: 'Client Details - a)S/No No', value: (row) => row.serial_no ?? '' },
  { header: 'Client Details - b)Visit Date', value: (row) => row.visit_date ?? '' },
  { header: 'Client Details - c)Visit Type', value: (row) => row.visit_type ?? '' },
  { header: 'Client Details - d)Client No', value: (row) => row.client_no ?? '' },
  { header: 'Client Details - e)Client Names', value: (row) => row.full_names ?? '' },
  { header: "Client Details - f)Client's Phone Number", value: (row) => row.phone_number ?? '' },
  { header: "Client Details - g)Client's Age", value: (row) => row.age ?? '' },
  { header: 'Client Details - h)Location Residence', value: (row) => row.location_residence ?? '' },
  {
    header: "Client Details - i)Treatment Suppoter's Phone Number",
    value: (row) => row.treatment_supporter_phone_number ?? '',
  },
  {
    header: 'CERVICAL CANCER - Screening Methods and Results - j)Via or VIA/VILLI',
    value: (row) => row.via_villi ?? '',
  },
  { header: 'CERVICAL CANCER - Screening Methods and Results - k)Pap Smear', value: (row) => row.pap_smear ?? '' },
  {
    header: 'CERVICAL CANCER - Screening Methods and Results - l)HPV Test (over 30 years)',
    value: (row) => row.hpv ?? '',
  },
  { header: 'CERVICAL CANCER - Pre-Cancer Treatment - m)cryotherapy', value: (row) => row.cryotherapy ?? '' },
  {
    header: 'CERVICAL CANCER - Pre-Cancer Treatment - n)Thermo- ablation',
    value: (row) => row.thermocoagulation ?? '',
  },
  { header: 'CERVICAL CANCER - Pre-Cancer Treatment - o)LEEP', value: (row) => row.leep ?? '' },
  { header: 'Breast Cancer - Methods and Results - p)CBE', value: (row) => row.cbe ?? '' },
  { header: 'Breast Cancer - Methods and Results - q)Ultrasound', value: (row) => row.ultrasound ?? '' },
  { header: 'Breast Cancer - Methods and Results - r)Mammogram', value: (row) => row.mammogram ?? '' },
  { header: 'Colorectal Cancer - Methods and Results - s)Colonoscopy', value: (row) => row.colonoscopy ?? '' },
  { header: 'Colorectal Cancer - Methods and Results - t)FOBT', value: (row) => row.fobt ?? '' },
  { header: 'u)HIV Status', value: (row) => row.hiv_status ?? '' },
  { header: 'v)Referral To/From', value: (row) => row.referral_from ?? '' },
  { header: 'w)Follow- up Date', value: (row) => row.referral_to ?? '' },
  {
    header:
      'Remarks(e.g Colposcopy done, Cervicography results, Call Client for follow up, Return for post-treatment screening, Communicate with the referral site)',
    value: (row) => row.follow_up_date ?? '',
  },
  { header: 'Remarks', value: (row) => row.remarks ?? '' },
];
