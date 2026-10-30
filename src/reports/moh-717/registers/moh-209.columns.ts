import { type RegisterColumn } from '../../../common/report-register';

/** MOH 209 Radiology Register columns, in the order printed on the form. */
export const moh209ExportColumns: RegisterColumn[] = [
  { header: 'Date', value: (row) => row.date ?? '' },
  { header: 'OPD/IP No', value: (row) => row.opd_ip_number ?? '', text: true },
  { header: 'Radiology Number', value: (row) => row.radiology_number ?? '', text: true },
  { header: 'Full Name', value: (row) => row.full_names ?? '' },
  { header: 'Age', value: (row) => row.age ?? '' },
  { header: 'Sex', value: (row) => row.sex ?? '' },
  { header: 'Residence (Village/Estate/Landmark)', value: (row) => row.residence_village_estate_landmark ?? '' },
  { header: 'Telephone Number', value: (row) => row.telephone_number ?? '', text: true },
  { header: 'Client referred from', value: (row) => row.client_referred_from ?? '' },
  { header: 'Previous Report', value: (row) => row.previous_report ?? '' },
  { header: 'Type of Examination', value: (row) => row.type_of_examination ?? '' },
  { header: 'Provisional diagnosis', value: (row) => row.provisional_diagnosis ?? '', wrap: true },
  { header: 'Receiving Radiotherapy (Y/N)', value: (row) => row.receiving_radiotherapy ?? '' },
  { header: 'Receiving interventional radiology (Y/N)', value: (row) => row.receiving_interventional_radiology ?? '' },
  { header: 'Current Report', value: (row) => row.current_report ?? '', wrap: true },
  { header: 'Referrals: 1=From Other HF 2=To Other HF', value: (row) => row.referral_direction ?? '' },
  { header: 'Reason(s) for referral', value: (row) => row.referral_reason ?? '', wrap: true },
  { header: 'Size of Film/recording plate', value: (row) => row.film_recording_plate_size ?? '' },
  { header: 'Amount charged', value: (row) => row.amount_charged ?? '' },
  { header: 'Receipt number', value: (row) => row.receipt_number ?? '', text: true },
  { header: 'Name of Requesting clinician', value: (row) => row.requesting_clinician ?? '' },
  { header: 'Name of Radiographer', value: (row) => row.radiographer_name ?? '' },
  { header: 'Name of Radiologist', value: (row) => row.radiologist_name ?? '' },
];

export const moh209SubHeaders = Array.from({ length: 23 }, (_, index) => String.fromCharCode(65 + index));
