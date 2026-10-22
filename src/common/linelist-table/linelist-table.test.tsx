import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LinelistTable from './linelist-table.component';
import { type LinelistColumn } from './linelist-columns';
import { downloadCsv } from '../report-register';

jest.mock('../report-register', () => ({
  ...jest.requireActual('../report-register'),
  downloadCsv: jest.fn(),
}));

const columns: LinelistColumn[] = [
  { header: 'Name', field: 'name' },
  { header: 'Sex', field: 'sex' },
  { header: 'Age', field: 'age' },
];

const rows = [
  { name: 'Achieng', sex: 'F', age: 34 },
  { name: 'Kiprop', sex: 'M', age: 9 },
  { name: 'Wanjiru', sex: 'F', age: null },
  { name: 'Otieno', sex: 'M', age: 41 },
];

const renderTable = () =>
  render(<LinelistTable rows={rows} columns={columns} layoutKey="test" exportName="Test linelist" />);

const headings = () =>
  within(screen.getAllByRole('rowgroup')[0])
    .getAllByRole('columnheader')
    .map((cell) => cell.textContent);

const names = () =>
  within(screen.getAllByRole('rowgroup')[1])
    .getAllByRole('row')
    .map((row) => within(row).getAllByRole('cell')[1].textContent);

describe('LinelistTable', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.mocked(downloadCsv).mockClear();
  });

  it('lists every row under the configured columns', () => {
    renderTable();

    expect(headings()).toEqual(['#', 'Name', 'Sex', 'Age']);
    expect(names()).toEqual(['Achieng', 'Kiprop', 'Wanjiru', 'Otieno']);
    expect(screen.getByText('4 records')).toBeInTheDocument();
  });

  it('searches across columns', async () => {
    renderTable();

    await userEvent.type(screen.getByRole('searchbox', { name: /search the linelist/i }), 'kip');

    expect(names()).toEqual(['Kiprop']);
    expect(screen.getByText('1 of 4 records')).toBeInTheDocument();
  });

  it('filters by a single column', async () => {
    renderTable();

    await userEvent.click(screen.getByRole('button', { name: /filters/i }));
    await userEvent.type(screen.getByRole('searchbox', { name: 'Filter Sex' }), 'm');

    expect(names()).toEqual(['Kiprop', 'Otieno']);
  });

  it('sorts numerically, both ways, with blanks last', async () => {
    renderTable();
    const age = screen.getByRole('button', { name: /^age/i });

    await userEvent.click(age);
    expect(names()).toEqual(['Kiprop', 'Achieng', 'Otieno', 'Wanjiru']);

    await userEvent.click(age);
    expect(names()).toEqual(['Otieno', 'Achieng', 'Kiprop', 'Wanjiru']);

    await userEvent.click(age);
    expect(names()).toEqual(['Achieng', 'Kiprop', 'Wanjiru', 'Otieno']);
  });

  it('hides and reorders columns, and remembers the layout', async () => {
    const { unmount } = renderTable();

    await userEvent.click(screen.getByRole('button', { name: /^columns/i }));
    await userEvent.click(screen.getByRole('checkbox', { name: 'Sex' }));
    // Age is last in the menu; two steps left puts it before Name
    await userEvent.click(screen.getAllByRole('button', { name: 'Move left' })[2]);
    await userEvent.click(screen.getAllByRole('button', { name: 'Move left' })[1]);

    expect(headings()).toEqual(['#', 'Age', 'Name']);

    unmount();
    renderTable();
    expect(headings()).toEqual(['#', 'Age', 'Name']);

    await userEvent.click(screen.getByRole('button', { name: /^columns/i }));
    await userEvent.click(screen.getByRole('button', { name: /reset columns/i }));
    expect(headings()).toEqual(['#', 'Name', 'Sex', 'Age']);
  });

  it('exports what is on screen: visible columns in order, filtered and sorted rows', async () => {
    renderTable();

    await userEvent.click(screen.getByRole('button', { name: /^columns/i }));
    await userEvent.click(screen.getByRole('checkbox', { name: 'Sex' }));
    await userEvent.type(screen.getByRole('searchbox', { name: /search the linelist/i }), 'o');
    await userEvent.click(screen.getByRole('button', { name: /^age/i }));
    await userEvent.click(screen.getByRole('button', { name: /export csv/i }));

    const [csv, filename] = jest.mocked(downloadCsv).mock.calls[0];
    expect(filename).toBe('test-linelist.csv');
    // "o" matches Kiprop and Otieno; the hidden Sex column is neither searched nor exported
    expect(csv.split('\r\n')).toEqual(['No,Name,Age', '1,Kiprop,9', '2,Otieno,41']);
  });
});
