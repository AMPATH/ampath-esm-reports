import { type RegisterColumn } from '../../../common/report-register/register-columns';

/**
 * MOH 512 Family Planning (FP) Register as it prints: one column per cell, A to AS, in the
 * order they appear. Values read the aliases of moh_512_patient_list_template.
 *
 * Columns without a corresponding template alias export blank until the template exposes
 * the required field.
 */
export const moh512ExportColumns: RegisterColumn[] = [
  { header: 'Date (DD/MM/YYYY) - A', value: (row) => row.date ?? '' },
  { header: 'Client Number - B', value: (row) => row.cr_id ?? row.amrs_id ?? '' },
  { header: 'Name of Client - C', value: (row) => row.name_of_client ?? '' },
  { header: 'Client Type - D', value: (row) => row.client_type ?? '' },
  { header: '1st Ever User of Contraceptive - E', value: (row) => row.first_ever_use_of_contraceptive ?? '' },
  { header: 'Age - F', value: (row) => row.age ?? '' },
  { header: 'Sex - G', value: (row) => row.sex ?? '' },
  { header: 'Disability Status - H', value: (row) => row.disability_status ?? '' },
  { header: 'Telephone Number - I', value: (row) => row.phone_number ?? '' },
  { header: 'Village / Estate / Landmark - J', value: (row) => row.village_estate_landmark ?? '' },
  { header: 'Counselled for FP - K', value: (row) => row.counselled_on_fp ?? '' },

  // Combined oral contraceptive pills
  {
    header: 'COC Type of Visit - L',
    value: (row) => row.type_of_visit_for_method_combined_oral_contraceptive ?? '',
  },
  {
    header: 'COC Qty Disp. (Cycles) - M',
    value: (row) => row.quantity_dispensed_combined_oral_contraceptive ?? '',
  },

  // Progestin only pills
  { header: 'POP Type of Visit - N', value: (row) => row.type_of_visit_for_method_progestine ?? '' },
  { header: 'POP Qty Disp. (Cycles) - O', value: (row) => row.quantity_dispensed_progestine ?? '' },

  // Emergency contraceptive pill
  {
    header: 'Emergency Contraceptive Doses Disp. - P',
    value: (row) => row.quantity_dispensed_emergency_contraceptive_pills ?? '',
  },

  // Injectables (DMPA)
  { header: 'Injectables Type of Visit - Q', value: () => '' },
  { header: 'DMPA IM Qty Disp. (Vials) - R', value: () => '' },
  { header: 'DMPA SC Qty Disp. (Vials) - S', value: () => '' },

  // Implants: the register has one type-of-visit column for all implants
  {
    header: 'Implants Type of Visit - T',
    value: (row) => row.type_of_visit_for_method_1_rod ?? row.type_of_visit_for_method_2_rod ?? '',
  },
  { header: 'Qty Disp. 1 Rod (Sets) - U', value: (row) => row.quantity_dispensed_1_rod ?? '' },
  { header: 'Qty Disp. 2 Rods, 3 yrs (Sets) - V', value: () => '' },
  { header: 'Qty Disp. 2 Rods, 5 yrs (Sets) - W', value: () => '' },

  // IUDs
  { header: 'IUD Type of Visit - X', value: (row) => row.type_of_visit_for_method_iud ?? '' },
  { header: 'IUD Qty Disp. Non-Hormonal (Sets) - Y', value: (row) => row.quantity_dispensed_non_hormonal ?? '' },
  { header: 'IUD Qty Disp. Hormonal (Sets) - Z', value: (row) => row.quantity_dispensed_hormonal ?? '' },
  { header: 'Reasons for LARC Removal - AA', value: (row) => row.reason_for_larc_removal ?? '' },

  // Condoms
  { header: 'Condom Clients - AB', value: (row) => row.type_of_condom ?? '' },
  { header: 'Qty Disp. Male Condoms - AC', value: (row) => row.quantity_dispensed_male_condoms ?? '' },
  { header: 'Qty Disp. Female Condoms - AD', value: (row) => row.quantity_dispensed_female_condoms ?? '' },

  { header: 'VSC (BTL or Vasectomy) - AE', value: (row) => row.voluntary_surgical_contraception ?? '' },

  // Natural FP
  { header: 'Counselled on Natural FP - AF', value: (row) => row.counseled_on_natural_fp ?? '' },
  { header: 'Cycle Beads Given - AG', value: (row) => row.given_cycle_beads ?? '' },

  { header: 'Timing of PPFP - AH', value: (row) => row.received_post_partum_fp ?? '' },
  { header: 'TB Screening - AI', value: (row) => row.tb_screening ?? '' },

  // HIV testing
  { header: 'Counselled for HIV - AJ', value: (row) => row.counselled_on_hiv ?? '' },
  { header: 'Counselled and Tested for HIV - AK', value: (row) => row.tested_for_hiv ?? '' },
  { header: 'HIV Status - AL', value: (row) => row.hiv_results ?? '' },

  { header: 'IPV or Reproductive Coercion - AM', value: (row) => row.intimate_partner_violence ?? '' },

  // Cervical cancer screening
  { header: 'Cervical Cancer Screened - AN', value: (row) => row.screened_for_cervical_cancer ?? '' },
  { header: 'Cervical Cancer Results - AO', value: (row) => row.cervical_cancer_screening_result ?? '' },

  // Referrals
  { header: 'Referral From - AP', value: (row) => row.referral_from ?? '' },
  { header: 'Referral To - AQ', value: (row) => row.referral_to ?? '' },
  { header: 'Reason for Referral - AR', value: (row) => row.reason_for_referral ?? '' },

  { header: 'Remarks - AS', value: (row) => row.comments ?? '' },
];
