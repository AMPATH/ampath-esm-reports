import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Moh240Report from './moh-240.component';
import { getMoh706PatientList } from '../../resources/moh-706.resource';
import { getMoh505PatientList } from '../../resources/moh-505.resource';

jest.mock('../../resources/moh-706.resource', () => ({
  getMoh706PatientList: jest.fn(),
}));

jest.mock('../../resources/moh-505.resource', () => ({
  getMoh505PatientList: jest.fn(),
}));

jest.mock('@openmrs/esm-framework', () => ({
  useSession: () => ({ sessionLocation: { uuid: 'session-loc', display: 'Session Facility' } }),
  openmrsFetch: jest.fn().mockResolvedValue({ ok: false }),
  showSnackbar: jest.fn(),
  formatDate: (value: Date) => (value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? '')),
}));

const aRow = (overrides: Record<string, unknown> = {}) => ({
  lab_no: 'LAB-12',
  date: '2026-08-01T09:00:00.000Z',
  full_name: 'Jane Akinyi',
  sex: 'F',
  age: 34,
  investigation_required: 'Random Blood Sugar',
  results: '6.5',
  clinical_diagnosis: 'Type 2 diabetes',
  clinician_name: 'Dr. Otieno',
  ...overrides,
});

const page = (results: Array<Record<string, unknown>>) => ({ results, total: results.length, isTotalExact: true });

const renderAt = (query: string) =>
  render(
    <MemoryRouter initialEntries={[`/moh-240?${query}`]}>
      <Moh240Report />
    </MemoryRouter>,
  );

describe('Moh240Report', () => {
  beforeEach(() => {
    jest.mocked(getMoh706PatientList).mockReset();
    jest.mocked(getMoh505PatientList).mockReset();
  });

  it('renders the requirements' + ' ' + 'line list behind a clicked 706 figure', async () => {
    jest.mocked(getMoh706PatientList).mockResolvedValue(page([aRow()]));

    renderAt(
      'report=moh-706&indicators=total_tb_smear&label=5.29+Total+TB+smears&startDate=2026-08-01&endDate=2026-08-31&locationUuids=loc-1',
    );

    await waitFor(() => expect(screen.getByText('Jane Akinyi')).toBeInTheDocument());

    expect(getMoh706PatientList).toHaveBeenCalledWith(
      expect.objectContaining({
        locationUuids: 'loc-1',
        startDate: '2026-08-01',
        endDate: '2026-08-31',
        indicators: 'total_tb_smear',
      }),
    );
    expect(getMoh505PatientList).not.toHaveBeenCalled();

    /* the clicked figure names the list */
    expect(screen.getAllByText('5.29 Total TB smears').length).toBeGreaterThan(0);

    const table = within(screen.getByRole('table'));
    const headers = table.getAllByRole('columnheader').map((cell) => cell.textContent);
    /* the requirements' minimum set is on screen... */
    expect(headers).toContain('CR Number');
    expect(headers).toContain('Systolic BP (mmHg)');
    expect(headers).toContain('SHA Enrolled');
    /* ...and a TB drill-down opens with the lab detail columns shown */
    expect(headers).toContain('Results');
    expect(headers).toContain('Type of Specimen');

    /* the RBS column reads the row's own blood-sugar result */
    const firstRow = within(table.getAllByRole('rowgroup')[1]).getAllByRole('row')[0];
    expect(
      within(firstRow)
        .getAllByRole('cell')
        .map((cell) => cell.textContent)
        .join('|'),
    ).toContain('6.5');
  });

  it('reads the MOH 505 endpoint when the drill-down came from the 505 report', async () => {
    jest.mocked(getMoh505PatientList).mockResolvedValue(page([aRow()]));

    renderAt('report=moh-505&indicators=total_exam&startDate=2026-08-01&endDate=2026-08-31&locationUuids=loc-1');

    await waitFor(() => expect(getMoh505PatientList).toHaveBeenCalled());
    expect(getMoh706PatientList).not.toHaveBeenCalled();
  });

  it('fetches nothing without a period and facility', () => {
    renderAt('report=moh-706');

    expect(getMoh706PatientList).not.toHaveBeenCalled();
    expect(getMoh505PatientList).not.toHaveBeenCalled();
  });
});
