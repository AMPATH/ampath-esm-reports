import { lineListShowColumns, moh240LineListColumns, moh240LineListLabColumns } from './line-list.columns';
import { MOH_240_HEADERS } from './moh-240.columns';

/** The DHA requirements' column order, transcribed from the CSV */
const REQUIRED_HEADERS = [
  'Serial No',
  'Facility Name',
  'Visit Date',
  'Encounter Type',
  'CR Number',
  'Client Name',
  'Sex',
  'Age (years)',
  'Nutrition Assessment Type',
  'Nutrition Value',
  'Nutrition Status',
  'Systolic BP (mmHg)',
  'Diastolic BP (mmHg)',
  'RBS (mmol/L)',
  'RBS Date',
  'TB Screening Date',
  'TB Screening Result',
  'Ebola Screening Status',
  'Cervical Screening Eligible',
  'Cervical Screening Date',
  'Cervical Screening Method',
  'Cervical Screening Result',
  'Diagnosis',
  'Return-to-Clinic Date',
  'Days to RTC',
  'SHA Enrolled',
  'SHA Status',
  'Provider Name',
];

const valueOf = (header: string, row: Record<string, any>) => {
  const column = moh240LineListColumns('Test Facility').find((column) => column.header === header);
  /* the way LinelistTable's cellValue renders it: undefined and null show blank */
  return String((column?.value ? column.value(row) : row[column?.field ?? '']) ?? '');
};

describe('moh240LineListColumns', () => {
  it('carries the requirements' + ' ' + 'columns in their order', () => {
    expect(moh240LineListColumns('Test Facility').map((column) => column.header)).toEqual(REQUIRED_HEADERS);
  });

  it('names the facility on every row and fills the register' + ' ' + 'fields', () => {
    const row = {
      lab_no: 'LAB-12',
      date: '2026-08-01T09:00:00.000Z',
      encounter_type: 6,
      full_name: 'Jane Akinyi',
      sex: 'F',
      age: 34,
      clinical_diagnosis: 'Type 2 diabetes',
      clinician_name: 'Dr. Otieno',
    };

    expect(valueOf('Serial No', row)).toBe('LAB-12');
    expect(valueOf('Facility Name', row)).toBe('Test Facility');
    expect(valueOf('Visit Date', row)).toBe('01/08/2026');
    expect(valueOf('Encounter Type', row)).toBe('6');
    expect(valueOf('Client Name', row)).toBe('Jane Akinyi');
    expect(valueOf('Diagnosis', row)).toBe('Type 2 diabetes');
    expect(valueOf('Provider Name', row)).toBe('Dr. Otieno');
  });

  it('shows the resolved encounter type name, falling back to the raw id', () => {
    expect(valueOf('Encounter Type', { encounter_type: 6, encounter_type_name: 'POC OPD Triage' })).toBe(
      'POC OPD Triage',
    );
    expect(valueOf('Encounter Type', { encounter_type: 6, encounter_type_name: '' })).toBe('6');
  });

  it('fills RBS from the row' + ' ' + 's own blood-sugar result, and never from a fasting one', () => {
    const random = {
      investigation_required: 'Random Blood Sugar',
      results: '6.5',
      test_datetime: '2026-08-01T09:00:00.000Z',
    };
    const fasting = {
      investigation_required: 'Fasting Blood Sugar',
      results: '4.1',
      test_datetime: '2026-08-01T09:00:00.000Z',
    };

    expect(valueOf('RBS (mmol/L)', random)).toBe('6.5');
    expect(valueOf('RBS Date', random)).toBe('01/08/2026');
    expect(valueOf('RBS (mmol/L)', fasting)).toBe('');
    expect(valueOf('RBS Date', fasting)).toBe('');
  });

  it('prefers the patient' + ' ' + 's CDM values over the row' + ' ' + 's own result', () => {
    const row = { rbs: 7.2, rbs_date: '2026-07-30', investigation_required: 'Random Blood Sugar', results: '6.5' };

    expect(valueOf('RBS (mmol/L)', row)).toBe('7.2');
    expect(valueOf('RBS Date', row)).toBe('30/07/2026');
  });

  it('counts days to the return-to-clinic date only when it exists', () => {
    expect(valueOf('Days to RTC', { date: '01/10/2026', rtc_date: '05/10/2026' })).toBe('4');
    expect(valueOf('Days to RTC', { date: '01/10/2026', rtc_date: '2026-10-05' })).toBe('4');
    expect(valueOf('Days to RTC', { date: '01/10/2026' })).toBe('');
    expect(valueOf('Days to RTC', { date: '01/10/2026', rtc_date: '25/09/2026' })).toBe('');
  });

  it('leaves the columns the ETL does not carry yet blank', () => {
    const row = { full_name: 'Jane Akinyi' };
    [
      'CR Number',
      'Nutrition Assessment Type',
      'Systolic BP (mmHg)',
      'TB Screening Date',
      'Ebola Screening Status',
      'Cervical Screening Date',
      'Return-to-Clinic Date',
      'SHA Enrolled',
      'SHA Status',
    ].forEach((header) => expect(valueOf(header, row)).toBe(''));
  });
});

describe('moh240LineListLabColumns', () => {
  it('keeps the register' + ' ' + 's own columns available but hidden', () => {
    const labColumns = moh240LineListLabColumns('total_tb_smear');

    expect(labColumns.map((column) => column.header)).toEqual(MOH_240_HEADERS.map(({ header }) => header));
    expect(labColumns.every((column) => column.hidden)).toBe(true);
  });
});

describe('lineListShowColumns', () => {
  it('opens TB drill-downs onto the specimen, stain and result', () => {
    expect(lineListShowColumns('total_tb_smear')).toEqual([
      'Type of Specimen',
      'Investigation Required',
      'Results',
      'Date Sample Collected',
      'Date Sample Analysed',
    ]);
  });

  it('opens urinalysis and sugar drill-downs onto the result', () => {
    expect(lineListShowColumns('positive_urine_glucose_with_members')).toEqual([
      'Type of Specimen',
      'Investigation Required',
      'Results',
    ]);
    expect(lineListShowColumns('total_blood_sugar')).toContain('Results');
  });

  it('auto-shows nothing for a clinical indicator', () => {
    expect(lineListShowColumns('total_exam')).toEqual([]);
    expect(lineListShowColumns('')).toEqual([]);
  });
});
