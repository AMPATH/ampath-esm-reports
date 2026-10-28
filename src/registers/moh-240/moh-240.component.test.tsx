import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import Moh240LabRegister from './moh-240.component';
import { MOH_240_HEADERS, MOH_240_SUB_HEADERS } from '../../reports/moh-240/moh-240.columns';
import { downloadCsv } from '../../common/report-register';
import { getMoh706PatientList } from '../../resources/moh-706.resource';

jest.mock('../../common/report-register', () => ({
  ...jest.requireActual('../../common/report-register'),
  downloadCsv: jest.fn(),
}));

jest.mock('../../resources/moh-706.resource', () => ({
  getMoh706PatientList: jest.fn(),
}));

jest.mock('@openmrs/esm-framework', () => ({
  useSession: () => ({ sessionLocation: { uuid: 'loc-uuid', display: 'Test Facility' } }),
  openmrsFetch: jest.fn().mockResolvedValue({ ok: false }),
  showSnackbar: jest.fn(),
}));

/* The filter bar is Carbon-heavy and its period picking is not what this page
   is about, so it is stood in by a button that generates a fixed period. The
   restore-from-URL hook stays real, as it is part of the page's behaviour. */
jest.mock('../../common/report-filters', () => {
  const actual = jest.requireActual('../../common/report-filters');
  return {
    ...actual,
    ReportFiltersComponent: ({
      onGenerate,
    }: {
      onGenerate: (period: { startDate: string; endDate: string; label?: string }) => void;
    }) => (
      <button onClick={() => onGenerate({ startDate: '2026-10-01', endDate: '2026-10-02', label: 'period' })}>
        generate
      </button>
    ),
  };
});

/** A row carrying every register field, so a missing column shows as a blank cell */
const aRow = (overrides: Record<string, unknown> = {}) => {
  const row: Record<string, any> = {};
  MOH_240_HEADERS.forEach(({ key }, index) => {
    row[key] = `${key}-${index}`;
  });
  return { ...row, ...overrides };
};

const renderRegister = () =>
  render(
    <MemoryRouter>
      <Moh240LabRegister />
    </MemoryRouter>,
  );

/** The register table itself: the page also holds the masthead and page
    summary tables, so the queries are scoped to it rather than to the page */
const registerTable = (container: HTMLElement) => {
  const table = container.querySelector('table.table');
  expect(table).not.toBeNull();
  return table as HTMLTableElement;
};

const page = (results: Array<Record<string, unknown>>, total = results.length) => ({
  results,
  total,
  isTotalExact: true,
});

describe('Moh240LabRegister', () => {
  beforeEach(() => {
    jest.mocked(downloadCsv).mockClear();
    jest.mocked(getMoh706PatientList).mockReset();
  });

  it('asks for the register to be generated before showing anything', () => {
    renderRegister();

    expect(screen.getByText('No report generated yet')).toBeInTheDocument();
    expect(getMoh706PatientList).not.toHaveBeenCalled();
  });

  it('renders the printed register under its own columns (A-AA) once generated', async () => {
    jest
      .mocked(getMoh706PatientList)
      .mockResolvedValue(page([aRow({ date: '01/10/2026', full_name: 'Jane Akinyi' }), aRow()]));

    const { container } = renderRegister();
    await userEvent.click(screen.getByRole('button', { name: 'generate' }));

    await waitFor(() => expect(screen.getByText('2 records')).toBeInTheDocument());

    /* the whole register asked for, not a drill-down's indicator subset */
    expect(getMoh706PatientList).toHaveBeenCalledWith(
      expect.objectContaining({ locationUuids: 'loc-uuid', startDate: '2026-10-01', endDate: '2026-10-02' }),
    );

    const table = within(registerTable(container));
    const headerRows = within(table.getAllByRole('rowgroup')[0]).getAllByRole('row');
    expect(
      headerRows.map((row) =>
        within(row)
          .getAllByRole('columnheader')
          .map((cell) => cell.textContent),
      ),
    ).toEqual([MOH_240_HEADERS.map(({ header }) => header), [...MOH_240_SUB_HEADERS]]);

    const firstRow = within(table.getAllByRole('rowgroup')[1]).getAllByRole('row')[0];
    const cells = within(firstRow)
      .getAllByRole('cell')
      .map((cell) => cell.textContent);
    expect(cells[0]).toBe('01/10/2026');
    expect(cells[4]).toBe('Jane Akinyi');
  });

  it('exports every page as the form\u2019s columns with the letter row beneath', async () => {
    jest
      .mocked(getMoh706PatientList)
      .mockImplementation(({ startIndex }: any) =>
        Promise.resolve(page([aRow({ lab_no: '001234' })], startIndex === 0 ? 2 : 2)),
      );

    renderRegister();
    await userEvent.click(screen.getByRole('button', { name: 'generate' }));
    await waitFor(() => expect(screen.getByRole('button', { name: /Export CSV/ })).toBeInTheDocument());

    await userEvent.click(screen.getByRole('button', { name: /Export CSV/ }));

    await waitFor(() => expect(jest.mocked(downloadCsv)).toHaveBeenCalledTimes(1));
    const [csv, filename] = jest.mocked(downloadCsv).mock.calls[0];
    const lines = (csv as string).split('\r\n');
    expect(lines[0]).toBe(MOH_240_HEADERS.map(({ header }) => header).join(','));
    expect(lines[1]).toBe(MOH_240_SUB_HEADERS.join(','));
    /* identifier columns survive Excel as text */
    expect(lines[2]).toContain('="001234"');
    expect(filename).toBe('laboratory-lab-register-moh-240-2026-10-01-2026-10-02.csv');
  });

  it('pagers past the first page when the period holds more rows than one page', async () => {
    jest.mocked(getMoh706PatientList).mockResolvedValue(
      page(
        Array.from({ length: 50 }, () => aRow()),
        120,
      ),
    );

    renderRegister();
    await userEvent.click(screen.getByRole('button', { name: 'generate' }));

    await waitFor(() => expect(screen.getByText(/120 items/)).toBeInTheDocument());
  });

  it('falls back to the placeholder when the register cannot be fetched', async () => {
    jest.mocked(getMoh706PatientList).mockRejectedValue(new Error('etl down'));

    renderRegister();
    await userEvent.click(screen.getByRole('button', { name: 'generate' }));

    await waitFor(() => expect(screen.getByText('No report generated yet')).toBeInTheDocument());
  });
});
