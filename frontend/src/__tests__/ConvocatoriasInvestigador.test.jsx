import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, afterEach, test, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Integrate jest-dom matchers with Vitest's expect
expect.extend(matchers);

// Mocks for child components to keep tests focused and fast
vi.mock('../components/ConvocatoriasCard', () => ({
  default: ({ nombre }) => <div data-testid="card">{nombre}</div>,
}));
vi.mock('../components/SideBar', () => ({
  default: () => <div data-testid="sidebar" />,
}));

import ConvocatoriasInvestigador from '../pages/Investigador/ConvocatoriasInvestigador';

const originalFetch = global.fetch;

afterEach(() => {
  vi.restoreAllMocks();
  global.fetch = originalFetch;
});

function isoDateWithOffset(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString();
}

test('muestra un spinner mientras carga', async () => {
  // fetch que nunca resuelve: comprobamos que el spinner está presente inicialmente
  global.fetch = vi.fn(() => new Promise(() => {}));

  render(<ConvocatoriasInvestigador user={{ type: 'Investigador' }} />);

  // MUI CircularProgress renderiza con role="progressbar"
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('muestra mensaje cuando no hay convocatorias activas', async () => {
  const items = [
    {
      id: 1,
      convocatoria: 'Pasada',
      fechaInicioConvocatoria: isoDateWithOffset(-10),
      fechaFinConvocatoria: isoDateWithOffset(-5),
    },
  ];

  global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(items) }));

  render(<ConvocatoriasInvestigador user={{ type: 'Investigador' }} />);

  await waitFor(() => expect(screen.getByText(/No hay convocatorias disponibles/i)).toBeInTheDocument());
});

test('muestra solo convocatorias activas', async () => {
  const items = [
    {
      id: 1,
      convocatoria: 'Activa',
      fechaInicioConvocatoria: isoDateWithOffset(-1),
      fechaFinConvocatoria: isoDateWithOffset(1),
      clave_convocatoria: 'C1',
    },
    {
      id: 2,
      convocatoria: 'Futura',
      fechaInicioConvocatoria: isoDateWithOffset(10),
      fechaFinConvocatoria: isoDateWithOffset(20),
    },
  ];

  global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(items) }));

  render(<ConvocatoriasInvestigador user={{ type: 'Investigador' }} />);

  await waitFor(() => expect(screen.getAllByTestId('card').length).toBe(1));
  expect(screen.getByText('Activa')).toBeInTheDocument();
});

test('muestra error si la petición falla', async () => {
  global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));

  render(<ConvocatoriasInvestigador user={{ type: 'Investigador' }} />);

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(screen.getByRole('alert')).toHaveTextContent(/HTTP 500/);
});
