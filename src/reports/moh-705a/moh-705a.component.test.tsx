import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import Moh705AComponent from './moh-705a.component';
import Moh705BComponent from '../moh-705B/moh-705b.component';
import { getMoh705a, getMoh705b } from '../../resources/moh-705.resource';

jest.mock('../../resources/moh-705.resource', () => ({
  getMoh705a: jest.fn(),
  getMoh705b: jest.fn(),
}));

jest.mock('@openmrs/esm-framework', () => ({
  useSession: () => ({
    sessionLocation: { uuid: 'loc-1', display: 'Test Facility' },
    user: { display: 'Test User' },
  }),
  formatDate: (value: Date) => (value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? '')),
}));

describe('Moh705 disease labels', () => {
  beforeEach(() => {
    jest.mocked(getMoh705a).mockResolvedValue({ result: { diseases_of_the_skin: 12 } });
    jest.mocked(getMoh705b).mockResolvedValue({ result: { diseases_of_the_skin: 12 } });
  });

  it('uses the corrected disease names in both reports', async () => {
    const user = userEvent.setup();

    const { unmount } = render(
      <MemoryRouter>
        <Moh705AComponent />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /generate report/i }));
    await waitFor(() => expect(screen.getByText('Dysentery (Blood diarrhoea)')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Tonsillitis')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Diseases of the skin')).toBeInTheDocument());

    unmount();

    render(
      <MemoryRouter>
        <Moh705BComponent />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /generate report/i }));
    await waitFor(() => expect(screen.getByText('Dysentery (Bloody diarrhoea)')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Musculoskeletal conditions')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Diseases of the skin')).toBeInTheDocument());
  });
});
