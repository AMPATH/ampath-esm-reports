/**
 * The regimen codes of the MoH 729B Facility Monthly ARV Patient Summary
 * (F-MAPS, Ver. July 2023), section by section as printed on its report page.
 *
 * `h` is each row's height as measured off the form (in its own units, scaled
 * to millimetres by the sheet), so the two halves of the page keep the
 * printed proportions: a two-line regimen gets a taller row.
 */

export type Regimen = [code: string, name: string, h?: number];

export interface RegimenSection {
  title: string;
  /** the heading row's height */
  h: number;
  rows: Regimen[];
}

/* Left half: ART */

export const ADULT_ART: RegimenSection[] = [
  {
    title: 'Adult ART 1st Line regimens',
    h: 39,
    rows: [
      ['AF2E', 'TDF + 3TC + DTG'],
      ['AF2B', 'TDF + 3TC + EFV'],
      ['AF1D', 'AZT + 3TC + DTG'],
      ['AF4C', 'ABC + 3TC + DTG'],
      ['AF2D', 'TDF + 3TC + ATV/r'],
      ['AF2F', 'TDF + 3TC + LPV/r'],
      ['AS2G', 'TAF + 3TC + DTG'],
      ['AF1E', 'AZT + 3TC + LPV/r'],
      ['AF1F', 'AZT + 3TC + ATV/r'],
      ['AF5X', 'Any other 1st line Adult regimens'],
    ],
  },
  {
    title: 'Adult ART 2nd Line regimens',
    h: 40,
    rows: [
      ['AS1A', 'AZT + 3TC + LPV/r', 63],
      ['AS1B', 'AZT + 3TC + ATV/r', 64],
      ['AS1C', 'AZT + 3TC + DTG', 38],
      ['AS2A', 'TDF + 3TC + LPV/r', 38],
      ['AS2B', 'TDF + 3TC + DTG', 38],
      ['AS2C', 'TDF + 3TC + ATV/r', 38],
      ['AS5A', 'ABC + 3TC + LPV/r', 38],
      ['AS5B', 'ABC + 3TC + ATV/r', 38],
      ['AS5C', 'ABC + 3TC + DTG', 38],
      ['AS6X', 'Any other 2nd line Adult regimens', 45],
    ],
  },
  {
    title: 'Adult ART 3rd Line regimens',
    h: 44,
    rows: [
      ['AT2D', 'TDF+3TC+DTG+DRV+RTV', 45],
      ['AT2F', 'TDF+3TC+DTG+ETV+DRV+RTV', 45],
      ['AT2G', 'TDF + 3TC + DTG', 44],
      ['AT2H', 'AZT + 3TC + DTG', 45],
      ['AT2I', 'AZT + 3TC + DTG + DRV + RTV', 45],
      ['AT2X', 'Any other 3rd line Adult regimens', 45],
    ],
  },
];

/** The children's weight bands, then their Total */
export const WEIGHT_BANDS = ['3-5.9kg', '6-9.9kg', '10-13.9kg', '14-19.9kg', '20-24.9kg', '25-29.9kgs', '≥30kgs'];

export const PAEDIATRIC_ART: RegimenSection[] = [
  {
    title: 'Paediatric ART 1st Line regimens',
    h: 40,
    rows: [
      ['CF2G', 'ABC+3TC+DTG', 41],
      ['CF1D', 'AZT + 3TC + DTG', 41],
      ['CF4E', 'TDF + 3TC + DTG', 41],
      ['CF5X', 'Any other 1st line Paediatric regimens', 41],
    ],
  },
  {
    title: 'Paediatric ART 2nd Line regimens',
    h: 46,
    rows: [
      ['CS1A', 'AZT + 3TC + LPV/r', 41],
      ['CS1B', 'AZT + 3TC + DTG', 41],
      ['CS2A', 'ABC + 3TC + LPV/r', 41],
      ['CS2B', 'ABC+3TC+DTG', 41],
      ['CS4X', 'Any other 2nd line Paediatric regimens', 41],
    ],
  },
  {
    title: 'Paediatric ART 3rd Line regimens',
    h: 54,
    rows: [
      ['CT1H', 'AZT + 3TC + DRV+RTV+RAL', 41.5],
      ['CT2D', 'ABC + 3TC + DRV+RTV+RAL', 41.5],
      ['CT3X', 'Any other 3rd line Paediatric regimens', 41.5],
    ],
  },
];

export const PREP: RegimenSection = {
  title: 'PrEP',
  h: 37,
  rows: [
    ['PRP1A', 'TDF + FTC', 29.5],
    ['PRP1B', 'TDF + 3TC', 29.5],
    ['PRP1D', 'Dapivirine ring', 29.5],
    ['PRP1E', 'Cabotegravir', 29.5],
    /* not printed on the form: added for clients on Lenacapavir */
    ['PRP1F', 'Lenacapavir', 29.5],
    ['PRP1X', 'Others', 29.5],
  ],
};

/* Right half: PMTCT, PEP, Hepatitis B and OIs */

export const PMTCT_MOTHERS: RegimenSection = {
  title: 'Pregnant women or HEI Mothers',
  h: 39,
  rows: [
    ['PM9', 'PMTCT HAART: TDF + 3TC + EFV'],
    ['PM12', 'PMTCT HAART: TDF + 3TC + DTG'],
    ['PM13', 'PMTCT HAART: AZT + 3TC + DTG'],
    ['PM14', 'PMTCT HAART: ABC + 3TC + DTG'],
    ['PM11', 'PMTCT HAART: TDF + 3TC + ATV/r'],
    ['PM7', 'PMTCT HAART:  TDF + 3TC + LPV/r'],
    ['PM10', 'PMTCT HAART: AZT + 3TC + ATV/r'],
    ['PM5', 'PMTCT HAART: AZT + 3TC + LPV/r'],
    ['PM1X', 'Any other PMTCT regimens for Women'],
  ],
};

/** The infants' age bands, then their Total */
export const INFANT_AGES = ['0-12 weeks', '12 weeks-6months', '7- 9 months', '10-12 months', 'Above 12 months'];

export const PMTCT_INFANTS: RegimenSection = {
  title: 'Infants',
  h: 40,
  rows: [
    [
      'PC8',
      'AZT liquid BID + NVP liquid OD for 6 weeks then NVP liquid OD until 6 weeks after complete cessation of Breastfeeding',
      63,
    ],
    ['PC7', 'AZT liquid BID + NVP liquid OD for 6 weeks then NVP liquid OD for 6 weeks(If not breastfeeding)', 64],
    ['PC1X', 'Any other PMTCT regimens for Infants', 38],
  ],
};

/** A numbered group of the right half, each regimen with a single count and a Total */
export interface TotalledGroup extends RegimenSection {
  number?: string;
  /** the heading's Total cell is shaded (Cryptococcal Meningitis) */
  noTotal?: boolean;
}

export const PEP: TotalledGroup[] = [
  {
    number: '1',
    title: 'PEP for Adults',
    h: 38,
    rows: [
      ['PA3D', 'TDF + 3TC + DTG', 38],
      ['PA3C', 'TDF + 3TC + ATV/r', 38],
      ['PA1C', 'AZT + 3TC + ATV/r', 38],
      ['PA4X', 'Any other PEP regimens for Adults', 38],
    ],
  },
  {
    number: '2',
    title: 'PEP for Children',
    h: 45,
    rows: [
      ['PC3A', 'ABC + 3TC + LPV/r', 45],
      ['PC3C', 'ABC + 3TC + DTG', 45],
      ['PC4X', 'Any other PEP regimens for Children', 45],
    ],
  },
];

export const HEPATITIS_B: TotalledGroup = {
  title: 'Hepatitis B Patients who are HIV-ve',
  h: 44,
  rows: [
    ['HPB1A', 'TDF + 3TC (HIV-ve HepB patients)', 45],
    ['HPB1B', 'TDF + FTC (HIV-ve HepB patients)', 45],
    ['HPB1C', 'Any other HEP B regimens', 45],
  ],
};

/** The TPT group counted from MOH 731 3.4 Starting TPT */
export const TPT_HIV_POSITIVE = 'TPT HIV Positive';

export const OPPORTUNISTIC_INFECTIONS: TotalledGroup[] = [
  {
    number: '1',
    title: 'Universal prophylaxis',
    h: 43,
    rows: [
      ['OI1A', 'Adult patients on Cotrimoxazole prophylaxis', 40],
      ['OI1C', 'Paediatric patients on Cotrimoxazole prophylaxis', 40],
      ['OI2A', 'Adult patients on Dapsone prophylaxis', 40],
    ],
  },
  {
    number: '2',
    title: TPT_HIV_POSITIVE,
    h: 46,
    rows: [
      ['ATPT1A', 'Adult patients (=>15 Yrs) newly started on 6H in the month', 41],
      ['ATPT1B', 'Adult patients (=>15 Yrs) newly started on 3HP in the month', 41],
      ['CTPT1A', 'Paed patients (<15 Yrs) newly started on 6H in the month', 41],
      ['CTPT1B', 'Paed patients (<15 Yrs) newly started on 3HP in the month', 41],
    ],
  },
  {
    number: '3',
    title: 'TPT HIV Negative',
    h: 41,
    rows: [['ATPT1C', 'HIV Negative Adult patients (=>15 Yrs) newly started on 3HP in the month', 54]],
  },
  {
    number: '4',
    title: 'Cryptococcal Menengitis New Clients only',
    h: 40,
    noTotal: true,
    rows: [
      ['OI6B', 'New CM patients (=>15 Yrs) on liposomal Ampotericin+Flucytosine + fluconazole in the month', 84],
      ['OI6X', 'New CM patients (=>15 Yrs) on any other treatment in the month', 72],
    ],
  },
];
