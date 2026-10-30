import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import TbLabRegister from './tb-lab-register.component';
import { TB_LAB_COLUMNS, tbLabCsvColumns } from './tb-lab-register.columns';
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

/** A TB smear row as the lab-706 patient list returns it: a spot sputum, ZN stain */
const aRow = (overrides: Record<string, unknown> = {}) => ({
  lab_no: 'L-0007',
  test_datetime: '2026-10-01T09:00:00.000Z',
  date_sample_received: '2026-10-01',
  full_name: 'Jane Akinyi',
  opd_ip_ref_no: 'OPD-12',
  sex: 'F',
  age: 34,
  village_estate_landmark: 'Mama Ngina',
  county_sub_county: 'Kisumu East',
  telephone_number: '0700123456',
  referrals: 'Kisumu County Hospital',
  type_of_specimen: 'Spot',
  condition_of_specimen: 'B',
  investigation_required: 'Ziehl-Neelsen stain',
  results: '1+',
  date_sample_analysed: '2026-10-02',
  date_results_dispatched: '2026-10-03',
  testing_officer: 'J. Otieno',
  comments: '',
  ...overrides,
});

const renderRegister = () =>
  render(
    <MemoryRouter>
      <TbLabRegister />
    </MemoryRouter>,
  );

const page = (results: Array<Record<string, unknown>>, total = results.length) => ({
  results,
  total,
  isTotalExact: true,
});

const cellValues = (row: HTMLTableRowElement) =>
  within(row)
    .getAllByRole('cell')
    .map((cell) => cell.textContent);

describe('TbLabRegister', () => {
  beforeEach(() => {
    jest.mocked(downloadCsv).mockClear();
    jest.mocked(getMoh706PatientList).mockReset();
  });

  it('asks for the register to be generated before showing anything', () => {
    renderRegister();

    expect(screen.getByText('No report generated yet')).toBeInTheDocument();
    expect(getMoh706PatientList).not.toHaveBeenCalled();
  });

  it('fetches the whole TB workload and lays the template out', async () => {
    jest
      .mocked(getMoh706PatientList)
      .mockResolvedValue(
        page([
          aRow(),
          aRow({
            type_of_specimen: 'Morning',
            investigation_required: 'Fluorescent microscopy',
            results: 'No AFB seen',
            condition_of_specimen: 'S',
          }),
        ]),
      );

    const { container } = renderRegister();
    await userEvent.click(screen.getByRole('button', { name: 'generate' }));

    await waitFor(() => expect(screen.getByText('2 records')).toBeInTheDocument());

    /* the register's own row filter: every TB smear of the period */
    expect(getMoh706PatientList).toHaveBeenCalledWith(
      expect.objectContaining({
        locationUuids: 'loc-uuid',
        startDate: '2026-10-01',
        endDate: '2026-10-02',
        indicators: 'total_tb_smear',
      }),
    );

    const table = within(container.querySelector('table') as HTMLTableElement);
    const headerRows = within(table.getAllByRole('rowgroup')[0]).getAllByRole('row');
    expect(headerRows).toHaveLength(2);

    /* the top tier: the standalone columns, with the two groups sitting
       between the columns they span */
    const tallLabels = TB_LAB_COLUMNS.filter((column) => !column.group).map((column) => column.header);
    const groups = [...new Set(TB_LAB_COLUMNS.filter((column) => column.group).map((column) => column.group!))];
    const topCells = within(headerRows[0])
      .getAllByRole('columnheader')
      .map((cell) => cell.textContent);
    expect(topCells).toEqual([...tallLabels.slice(0, 14), ...groups, ...tallLabels.slice(14)]);
    /* the bottom tier: the five sub-columns under the groups */
    expect(
      within(headerRows[1])
        .getAllByRole('columnheader')
        .map((cell) => cell.textContent),
    ).toEqual(['Spot', 'Morning', 'Type ZN/FM', 'Spot', 'Morning']);

    const bodyRows = within(table.getAllByRole('rowgroup')[1]).getAllByRole('row');
    /* the spot row: appearance and result under Spot, the stain read off the test, two-day TAT */
    expect(cellValues(bodyRows[0] as HTMLTableRowElement)).toEqual([
      'L-0007',
      '01/10/2026',
      '01/10/2026',
      '',
      'Jane Akinyi',
      'OPD-12',
      'F',
      '34',
      '',
      'Mama Ngina, Kisumu East',
      '0700123456',
      'Kisumu County Hospital',
      '',
      '',
      'B',
      '',
      'ZN',
      '1+',
      '',
      '',
      '',
      '',
      '02/10/2026',
      '03/10/2026',
      '',
      '2',
      'J. Otieno',
      '',
    ]);
    /* the morning row: appearance and result under Morning, stain FM */
    expect(cellValues(bodyRows[1] as HTMLTableRowElement)[15]).toBe('S');
    expect(cellValues(bodyRows[1] as HTMLTableRowElement)[16]).toBe('FM');
    expect(cellValues(bodyRows[1] as HTMLTableRowElement)[18]).toBe('No AFB seen');
  });

  it('exports every page with the two-tier header flattened into one label per column', async () => {
    jest.mocked(getMoh706PatientList).mockResolvedValue(page([aRow()]));

    renderRegister();
    await userEvent.click(screen.getByRole('button', { name: 'generate' }));
    await waitFor(() => expect(screen.getByRole('button', { name: /Export CSV/ })).toBeInTheDocument());

    await userEvent.click(screen.getByRole('button', { name: /Export CSV/ }));

    await waitFor(() => expect(jest.mocked(downloadCsv)).toHaveBeenCalledTimes(1));
    const [csv, filename] = jest.mocked(downloadCsv).mock.calls[0];
    const lines = (csv as string).split('\r\n');
    /* labels holding commas come out quoted, as CSV requires */
    expect(lines[0]).toBe(
      tbLabCsvColumns()
        .map((column) => (column.header.includes(',') ? `"${column.header}"` : column.header))
        .join(','),
    );
    /* phones and lab numbers survive Excel as text */
    expect(lines[1]).toContain('="0700123456"');
    expect(filename).toBe('tb-laboratory-register-2026-10-01-2026-10-02.csv');
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
