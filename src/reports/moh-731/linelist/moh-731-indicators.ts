import { type Moh731SectionId } from './moh-731-linelist-sections';

/** One figure on the MOH 731 sheet: what it counts, and the linelist behind it */
export interface Moh731Indicator {
  /** The ETL indicator the figure is read from, and the linelist is filtered by */
  indicator: string;
  /** `M` or `F` where the sheet splits the figure by sex */
  gender?: 'M' | 'F';
  /** The row label printed beside the figure */
  label: string;
  /** The block of the sheet the figure sits in */
  block: string;
  /** Which linelist definition (source and columns) the figure opens */
  section: Moh731SectionId;
  /**
   * Columns of the section, by header, that start visible for this figure even
   * though the section hides them by default -- e.g. Delivery Date, which is
   * what places a PNC test either side of six weeks.
   */
  showColumns?: string[];
}

/**
 * Every clickable figure on the MOH 731 sheet, keyed by the code printed beside it.
 *
 * The code is what links a box to its linelist: the sheet passes only the code,
 * and everything the linelist needs -- indicator, sex, heading and which
 * section's columns to use -- is read from here.
 */
export const MOH_731_INDICATORS: Record<string, Moh731Indicator> = {
  // 1.1 HIV Tests
  'HV01-01': { indicator: 'hiv_male', gender: 'M', label: 'Tests', block: '1.1 HIV Tests', section: 'hivTests' },
  'HV01-02': { indicator: 'hiv_female', gender: 'F', label: 'Tests', block: '1.1 HIV Tests', section: 'hivTests' },
  'HV01-03': {
    indicator: 'hiv_setting_facility',
    label: 'Tests_Facility',
    block: '1.1 HIV Tests',
    section: 'hivTests',
  },
  'HV01-04': {
    indicator: 'hiv_setting_community',
    label: 'Tests_Community',
    block: '1.1 HIV Tests',
    section: 'hivTests',
  },
  'HV01-05': { indicator: 'hiv_setting_kvp', label: 'Tested KVP', block: '1.1 HIV Tests', section: 'hivTests' },

  // 1.3 No. Initiated on PrEP(NEW)
  'HV01-19': {
    indicator: 'prep_new_male_general_pop',
    gender: 'M',
    label: 'General popn',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-20': {
    indicator: 'prep_new_female_general_pop',
    gender: 'F',
    label: 'General popn',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-21': {
    indicator: 'prep_new_msm',
    gender: 'M',
    label: 'MSM/MSW',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-22': {
    indicator: 'prep_new_fsw',
    gender: 'F',
    label: 'FSW',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-23': {
    indicator: 'prep_new_pwud_male',
    gender: 'M',
    label: 'PWID/PWUD',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-24': {
    indicator: 'prep_new_pwud_female',
    gender: 'F',
    label: 'PWID/PWUD',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-25': {
    indicator: 'prep_new_discordant_male',
    gender: 'M',
    label: 'Discordant Couple',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-26': {
    indicator: 'prep_new_discordant_female',
    gender: 'F',
    label: 'Discordant Couple',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-27': {
    indicator: 'prep_new_vulnerable_male',
    gender: 'M',
    label: 'Vulnerable Pop.',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-28': {
    indicator: 'prep_new_vulnerable_female',
    gender: 'F',
    label: 'Vulnerable Pop.',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-29': {
    indicator: 'prep_new_ayp_male',
    gender: 'M',
    label: 'AYP (10-24yrs)',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-30': {
    indicator: 'prep_new_ayp_female',
    gender: 'F',
    label: 'AYP (10-24yrs)',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },
  'HV01-31': {
    indicator: 'prep_new_preg_breastfeeding',
    gender: 'F',
    label: 'Pregnant and breastfeeding women',
    block: '1.3 No. Initiated on PrEP(NEW)',
    section: 'prepVisits',
  },

  // 1.5 No. Seroconverted while on PrEP
  'HV01-45': {
    indicator: 'seroconverted_male',
    gender: 'M',
    label: 'HIV Positive',
    block: '1.5 No. Seroconverted while on PrEP',
    section: 'prepVisits',
  },
  'HV01-46': {
    indicator: 'seroconverted_female',
    gender: 'F',
    label: 'HIV Positive',
    block: '1.5 No. Seroconverted while on PrEP',
    section: 'prepVisits',
  },

  // 1.2 HIV Positive Results
  'HV01-06': {
    indicator: 'male_2_9',
    gender: 'M',
    label: 'Positive_2-9',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-07': {
    indicator: 'female_2_9',
    gender: 'F',
    label: 'Positive_2-9',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-08': {
    indicator: 'male_10_14',
    gender: 'M',
    label: 'Positive_10-14',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-09': {
    indicator: 'female_10_14',
    gender: 'F',
    label: 'Positive_10-14',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-10': {
    indicator: 'male_15_19',
    gender: 'M',
    label: 'Positive_15-19',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-11': {
    indicator: 'female_15_19',
    gender: 'F',
    label: 'Positive_15-19',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-12': {
    indicator: 'male_20_24',
    gender: 'M',
    label: 'Positive_20-24',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-13': {
    indicator: 'female_20_24',
    gender: 'F',
    label: 'Positive_20-24',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-14': {
    indicator: 'male_25_above',
    gender: 'M',
    label: 'Positive_25+',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-15': {
    indicator: 'female_25_above',
    gender: 'F',
    label: 'Positive_25+',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-16': {
    indicator: 'positive_kvp',
    label: 'Positive_KVP',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-17': {
    indicator: 'discordant_male',
    gender: 'M',
    label: 'Discordant',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-18': {
    indicator: 'discordant_female',
    gender: 'F',
    label: 'Discordant',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-47': {
    indicator: 'inconclusive_male',
    gender: 'M',
    label: 'Inconclusive Test Results',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV01-48': {
    indicator: 'inconclusive_female',
    gender: 'F',
    label: 'Inconclusive Test Results',
    block: '1.2 HIV Positive Results',
    section: 'hivTests',
  },

  // 1.4 No. on PrEP Diagnosed with STI
  'HV01-32': {
    indicator: 'prep_sti_male_general_pop',
    gender: 'M',
    label: 'General popn',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-33': {
    indicator: 'prep_sti_female_general_pop',
    gender: 'F',
    label: 'General popn',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-34': {
    indicator: 'prep_sti_msm',
    gender: 'M',
    label: 'MSM/MSW',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-35': {
    indicator: 'prep_sti_fsw',
    gender: 'F',
    label: 'FSW',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-36': {
    indicator: 'prep_sti_pwud_male',
    gender: 'M',
    label: 'PWID/PWUD',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-37': {
    indicator: 'prep_sti_pwud_female',
    gender: 'F',
    label: 'PWID/PWUD',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-38': {
    indicator: 'prep_sti_discordant_male',
    gender: 'M',
    label: 'Discordant Couple',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-39': {
    indicator: 'prep_sti_discordant_female',
    gender: 'F',
    label: 'Discordant Couple',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-40': {
    indicator: 'prep_sti_vulnerable_male',
    gender: 'M',
    label: 'Vulnerable Pop.',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-41': {
    indicator: 'prep_sti_vulnerable_female',
    gender: 'F',
    label: 'Vulnerable Pop.',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-42': {
    indicator: 'prep_sti_ayp_male',
    gender: 'M',
    label: 'AYP(10-24 yrs)',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-43': {
    indicator: 'prep_sti_ayp_female',
    gender: 'F',
    label: 'AYP(10-24 yrs)',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },
  'HV01-44': {
    indicator: 'prep_sti_preg_breastfeeding',
    gender: 'F',
    label: 'Pregnant and breastfeeding women',
    block: '1.4 No. on PrEP Diagnosed with STI',
    section: 'prepVisits',
  },

  // 2.1 Maternal HIV Testing
  'HV02-01': {
    indicator: 'known_positive_1st_anc',
    gender: 'F',
    label: 'Known Positive at 1st ANC',
    block: '2.1 Maternal HIV Testing',
    section: 'ancKnownPositives',
  },
  'HV02-02': {
    indicator: 'initial_test_anc',
    gender: 'F',
    label: 'Tested at ANC',
    block: '2.1 Maternal HIV Testing',
    section: 'hivTests',
  },
  'HV02-03': {
    indicator: 'retest_anc',
    gender: 'F',
    label: 'Tested at ANC',
    block: '2.1 Maternal HIV Testing',
    section: 'hivTests',
  },
  'HV02-04': {
    indicator: 'initial_test_LD',
    gender: 'F',
    label: 'Tested at L&D',
    block: '2.1 Maternal HIV Testing',
    section: 'hivTests',
  },
  'HV02-05': {
    indicator: 'retest_LD',
    gender: 'F',
    label: 'Tested at L&D',
    block: '2.1 Maternal HIV Testing',
    section: 'hivTests',
  },
  'HV02-06': {
    indicator: 'initial_test_pnc_less_6_weeks',
    gender: 'F',
    label: 'Tested at PNC_\u22646weeks',
    block: '2.1 Maternal HIV Testing',
    section: 'hivTests',
    showColumns: ['Delivery Date'],
  },
  'HV02-07': {
    indicator: 'retest_pnc_less_6_weeks',
    gender: 'F',
    label: 'Tested at PNC_\u22646weeks',
    block: '2.1 Maternal HIV Testing',
    section: 'hivTests',
    showColumns: ['Delivery Date'],
  },
  'HV02-08': {
    indicator: 'initial_test_pnc_greater_6_weeks',
    gender: 'F',
    label: 'Tested at PNC_>6weeks',
    block: '2.1 Maternal HIV Testing',
    section: 'hivTests',
    showColumns: ['Delivery Date'],
  },
  'HV02-09': {
    indicator: 'retest_pnc_greater_6_weeks',
    gender: 'F',
    label: 'Tested at PNC_>6weeks',
    block: '2.1 Maternal HIV Testing',
    section: 'hivTests',
    showColumns: ['Delivery Date'],
  },

  // 2.2 HIV Positive Results
  'HV02-10': {
    indicator: 'positive_anc',
    gender: 'F',
    label: 'Tested at ANC',
    block: '2.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV02-11': {
    indicator: 'positive_LD',
    gender: 'F',
    label: 'Tested at L&D',
    block: '2.2 HIV Positive Results',
    section: 'hivTests',
  },
  'HV02-12': {
    indicator: 'positive_pnc_less_6_weeks',
    gender: 'F',
    label: 'Tested at PNC_\u22646weeks',
    block: '2.2 HIV Positive Results',
    section: 'hivTests',
    showColumns: ['Delivery Date'],
  },
  'HV02-13': {
    indicator: 'positive_pnc_greater_6_weeks',
    gender: 'F',
    label: 'Tested at PNC_>6weeks',
    block: '2.2 HIV Positive Results',
    section: 'hivTests',
    showColumns: ['Delivery Date'],
  },

  // 2.3 Maternal HAART
  'HV02-14': {
    indicator: 'maternal_haart_1st_anc',
    gender: 'F',
    label: 'On HAART at 1st ANC',
    block: '2.3 Maternal HAART',
    section: 'ancKnownPositives',
  },
  'HV02-15': {
    indicator: 'start_maternal_haart_1st_anc',
    gender: 'F',
    label: 'Start HAART_ANC',
    block: '2.3 Maternal HAART',
    section: 'hivTests',
  },
  'HV02-16': {
    indicator: 'start_maternal_haart_LD',
    gender: 'F',
    label: 'Start HAART_L&D',
    block: '2.3 Maternal HAART',
    section: 'hivTests',
  },
  'HV02-17': {
    indicator: 'maternal_haart_less_6_weeks',
    gender: 'F',
    label: 'Start HAART_PNC_\u22646weeks',
    block: '2.3 Maternal HAART',
    section: 'hivTests',
    showColumns: ['Delivery Date'],
  },
  'HV02-18': {
    indicator: 'maternal_haart_more_6_weeks',
    gender: 'F',
    label: 'Start HAART_PNC_>6weeks',
    block: '2.3 Maternal HAART',
    section: 'hivTests',
    showColumns: ['Delivery Date'],
  },

  // 2.4 HBV Screening at ANC
  'HV02-19': {
    indicator: 'hbv_screened_anc',
    gender: 'F',
    label: 'Screened_HBV_ANC',
    block: '2.4 HBV Screening at ANC',
    section: 'ancHbv',
  },
  'HV02-20': {
    indicator: 'hbv_screened_positive_anc',
    gender: 'F',
    label: 'HBV Screened_Positive',
    block: '2.4 HBV Screening at ANC',
    section: 'ancHbv',
  },

  // 2.5 Adolescents girls & Young Women (10-24 Yrs)
  'HV02-21': {
    indicator: 'known_positive_anc_10_19',
    gender: 'F',
    label: '1st ANC KP',
    block: '2.5 Adolescents girls & Young Women (10-24 Yrs)',
    section: 'ancKnownPositives',
  },
  'HV02-22': {
    indicator: 'known_positive_anc_20_24',
    gender: 'F',
    label: '1st ANC KP',
    block: '2.5 Adolescents girls & Young Women (10-24 Yrs)',
    section: 'ancKnownPositives',
  },
  'HV02-23': {
    indicator: 'positive_anc_ld_pnc_10_19',
    gender: 'F',
    label: 'New HIV Positive',
    block: '2.5 Adolescents girls & Young Women (10-24 Yrs)',
    section: 'hivTests',
  },
  'HV02-24': {
    indicator: 'positive_anc_ld_pnc_20_24',
    gender: 'F',
    label: 'New HIV Positive',
    block: '2.5 Adolescents girls & Young Women (10-24 Yrs)',
    section: 'hivTests',
  },
  'HV02-25': {
    indicator: 'on_art_anc_10_19',
    gender: 'F',
    label: 'On HAART 1st ANC KP',
    block: '2.5 Adolescents girls & Young Women (10-24 Yrs)',
    section: 'ancKnownPositives',
  },
  'HV02-26': {
    indicator: 'on_art_anc_20_24',
    gender: 'F',
    label: 'On HAART 1st ANC KP',
    block: '2.5 Adolescents girls & Young Women (10-24 Yrs)',
    section: 'ancKnownPositives',
  },
  'HV02-27': {
    indicator: 'start_art_10_19',
    gender: 'F',
    label: 'Started HAART New',
    block: '2.5 Adolescents girls & Young Women (10-24 Yrs)',
    section: 'hivTests',
  },
  'HV02-28': {
    indicator: 'start_art_20_24',
    gender: 'F',
    label: 'Started HAART New',
    block: '2.5 Adolescents girls & Young Women (10-24 Yrs)',
    section: 'hivTests',
  },

  // 2.6 Infant Prophylaxis
  'HV02-29': {
    indicator: 'infant_arv_anc',
    gender: 'F',
    label: 'Infant ARV Prophylaxis_ANC',
    block: '2.6 Infant Prophylaxis',
    section: 'hivPositiveMothers',
  },
  'HV02-30': {
    indicator: 'infant_arv_ld',
    gender: 'F',
    label: 'Infant ARV Prophylaxis_L&D',
    block: '2.6 Infant Prophylaxis',
    section: 'hivPositiveMothers',
  },
  'HV02-31': {
    indicator: 'infant_arv_pnc',
    gender: 'F',
    label: 'Infant ARV Prophylaxis_PNC',
    block: '2.6 Infant Prophylaxis',
    section: 'hivPositiveMothers',
    showColumns: ['Delivery Date'],
  },

  // 2.7 Infant Feeding
  'HV02-32': {
    indicator: 'exclusive_bf',
    gender: 'F',
    label: 'Exclusive Breastfeeding (EBF)',
    block: '2.7 Infant Feeding',
    section: 'infantFeeding',
  },
  'HV02-33': {
    indicator: 'bf',
    gender: 'F',
    label: 'Breastfeeding (BF)',
    block: '2.7 Infant Feeding',
    section: 'infantFeeding',
  },
  'HV02-34': {
    indicator: 'weaning',
    gender: 'F',
    label: 'Not Breastfeeding (NBF)',
    block: '2.7 Infant Feeding',
    section: 'infantFeeding',
  },

  // 3.1 Starting ART
  'HV03-01': {
    indicator: 'art_new_less_1_male',
    gender: 'M',
    label: 'Start ART_<1',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-02': {
    indicator: 'art_new_less_1_female',
    gender: 'F',
    label: 'Start ART_<1',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-03': {
    indicator: 'art_new_1_4_male',
    gender: 'M',
    label: 'Start ART 1-4',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-04': {
    indicator: 'art_new_1_4_female',
    gender: 'F',
    label: 'Start ART 1-4',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-05': {
    indicator: 'art_new_5_9_male',
    gender: 'M',
    label: 'Start ART 5-9',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-06': {
    indicator: 'art_new_5_9_female',
    gender: 'F',
    label: 'Start ART 5-9',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-07': {
    indicator: 'art_new_10_14_male',
    gender: 'M',
    label: 'Start ART 10-14',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-08': {
    indicator: 'art_new_10_14_female',
    gender: 'F',
    label: 'Start ART 10-14',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-09': {
    indicator: 'art_new_15_19_male',
    gender: 'M',
    label: 'Start ART 15-19',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-10': {
    indicator: 'art_new_15_19_female',
    gender: 'F',
    label: 'Start ART 15-19',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-11': {
    indicator: 'art_new_20_24_male',
    gender: 'M',
    label: 'Start ART 20-24',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-12': {
    indicator: 'art_new_20_24_female',
    gender: 'F',
    label: 'Start ART 20-24',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-013': {
    indicator: 'art_new_25_above_male',
    gender: 'M',
    label: 'Start ART 25+',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },
  'HV03-014': {
    indicator: 'art_new_25_above_female',
    gender: 'F',
    label: 'Start ART 25+',
    block: '3.1 Starting ART',
    section: 'artMonthly',
  },

  // 3.2 Curently on ART ([ALL])
  'HV03-015': {
    indicator: 'on_art_less_1_male',
    gender: 'M',
    label: 'On ART_<1',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-016': {
    indicator: 'on_art_less_1_female',
    gender: 'F',
    label: 'On ART_<1',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-017': {
    indicator: 'on_art_1_4_male',
    gender: 'M',
    label: 'On ART 1-4',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-018': {
    indicator: 'on_art_1_4_female',
    gender: 'F',
    label: 'On ART 1-4',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-019': {
    indicator: 'on_art_5_9_male',
    gender: 'M',
    label: 'On ART 5-9',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-020': {
    indicator: 'on_art_5_9_female',
    gender: 'F',
    label: 'On ART 5-9',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-021': {
    indicator: 'on_art_10_14_male',
    gender: 'M',
    label: 'On ART 10-14',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-022': {
    indicator: 'on_art_10_14_female',
    gender: 'F',
    label: 'On ART 10-14',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-023': {
    indicator: 'on_art_15_19_male',
    gender: 'M',
    label: 'On ART 15-19',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-024': {
    indicator: 'on_art_15_19_female',
    gender: 'F',
    label: 'On ART 15-19',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-025': {
    indicator: 'on_art_20_24_male',
    gender: 'M',
    label: 'On ART 20-24',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-026': {
    indicator: 'on_art_20_24_female',
    gender: 'F',
    label: 'On ART 20-24',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-027': {
    indicator: 'on_art_25_above_male',
    gender: 'M',
    label: 'On ART 25+',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },
  'HV03-028': {
    indicator: 'on_art_25_above_female',
    gender: 'F',
    label: 'On ART 25+',
    block: '3.2 Curently on ART ([ALL])',
    section: 'artMonthly',
  },

  // 3.3 TB Screening
  'HV03-029': {
    indicator: 'screened_tb_less_15',
    label: 'Screened for TB_<15',
    block: '3.3 TB Screening',
    section: 'tbDsd',
  },
  'HV03-030': {
    indicator: 'screened_tb_greater_15',
    label: 'Screened for TB_15+',
    block: '3.3 TB Screening',
    section: 'tbDsd',
  },

  // 3.4 Starting TPT
  'HV03-031': { indicator: 'start_tpt_less_15', label: 'Start TPT_<15', block: '3.4 Starting TPT', section: 'tbDsd' },
  'HV03-032': {
    indicator: 'start_tpt_greater_15',
    label: 'Start TPT_15+',
    block: '3.4 Starting TPT',
    section: 'tbDsd',
  },

  // 3.5 Differentiated Service Delivery
  'HV03-033': {
    indicator: 'established',
    label: 'Established',
    block: '3.5 Differentiated Service Delivery',
    section: 'tbDsd',
  },
  'HV03-034': {
    indicator: 'not_established',
    label: 'Not Established',
    block: '3.5 Differentiated Service Delivery',
    section: 'tbDsd',
  },
  'HV03-035': {
    indicator: 'community',
    label: 'Community',
    block: '3.5 Differentiated Service Delivery',
    section: 'tbDsd',
  },
  'HV03-036': {
    indicator: 'facility',
    label: 'Facility',
    block: '3.5 Differentiated Service Delivery',
    section: 'tbDsd',
  },

  // 3.6 Nutrition and HIV
  'HV03-037': {
    indicator: 'has_sam_0_5_months',
    label: '0-5Months',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-038': {
    indicator: 'has_sam_6_59_months',
    label: '6-59Months',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-039': {
    indicator: 'has_sam_5_9_years',
    label: '5-9Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-040': {
    indicator: 'has_sam_10_17_years',
    label: '10-17Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-041': {
    indicator: 'has_sam_18_and_above_years',
    label: '18+Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-043': {
    indicator: 'has_smm_0_5_months',
    label: '0-5Months',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-044': {
    indicator: 'has_smm_6_59_months',
    label: '6-59Months',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-045': {
    indicator: 'has_smm_5_9_years',
    label: '5-9Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-046': {
    indicator: 'has_smm_10_17_years',
    label: '10-17Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-047': {
    indicator: 'has_smm_18_and_above_years',
    label: '18+Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-049': {
    indicator: 'severe_acute_supp_0_5_months',
    label: '0-5Months',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-050': {
    indicator: 'severe_acute_supp_6_59_months',
    label: '6-59Months',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-051': {
    indicator: 'severe_acute_supp_5_9_years',
    label: '5-9Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-052': {
    indicator: 'severe_acute_supp_10_17_years',
    label: '10-17Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-053': {
    indicator: 'severe_acute_supp_18_and_above_years',
    label: '18+Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-055': {
    indicator: 'severe_moderate_supp_0_5_months',
    label: '0-5Months',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-056': {
    indicator: 'severe_moderate_supp_6_59_months',
    label: '6-59Months',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-057': {
    indicator: 'severe_moderate_supp_5_9_years',
    label: '5-9Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-058': {
    indicator: 'severe_moderate_supp_10_17_years',
    label: '10-17Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },
  'HV03-059': {
    indicator: 'severe_moderate_supp_18_and_above_years',
    label: '18+Years',
    block: '3.6 Nutrition and HIV',
    section: 'nutrition',
  },

  // 3.7 HIV in TB Clinic
  'HV03-061': { indicator: 'start_tb', label: 'TB cases_New', block: '3.7 HIV in TB Clinic', section: 'tb' },
  'HV03-062': {
    indicator: 'start_tb_known_positive',
    label: 'TB_New_Known HIV Positive(KPs)',
    block: '3.7 HIV in TB Clinic',
    section: 'tb',
  },
  'HV03-063': {
    indicator: 'start_tb_positive',
    label: 'TB_New HIV Positive',
    block: '3.7 HIV in TB Clinic',
    section: 'tb',
  },
  'HV03-064': {
    indicator: 'start_tb_on_art',
    label: 'TB_New_Known HIV Positive(KP) on HAART',
    block: '3.7 HIV in TB Clinic',
    section: 'tb',
  },
  'HV03-065': {
    indicator: 'start_tb_art_new',
    label: 'TB New_Start_HAART',
    block: '3.7 HIV in TB Clinic',
    section: 'tb',
  },

  // 5. Post Exposure Prophylaxis
  'HV05-01': {
    indicator: 'exposed_occupational',
    label: 'Exposed_Occupational',
    block: '5. Post Exposure Prophylaxis',
    section: 'pep',
  },
  'HV05-02': {
    indicator: 'exposed_non_occupational',
    label: 'Exposed Other',
    block: '5. Post Exposure Prophylaxis',
    section: 'pep',
  },
  'HV05-03': {
    indicator: 'pep_occupational',
    label: 'PEP_Occupational',
    block: '5. Post Exposure Prophylaxis',
    section: 'pep',
  },
  'HV05-04': {
    indicator: 'pep_non_occupational',
    label: 'PEP_Other',
    block: '5. Post Exposure Prophylaxis',
    section: 'pep',
  },
};
