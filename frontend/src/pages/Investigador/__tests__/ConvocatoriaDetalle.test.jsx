import React from 'react';
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { vi, afterEach, test, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// Mocks for layout components
vi.mock('../../../components/NavBar', () => ({ default: () => <div data-testid="navbar" /> }));
vi.mock('../../../components/Footer', () => ({ default: () => <div data-testid="footer" /> }));

// Mock react-router hooks used by the component
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => vi.fn(),
  };
});

import ConvocatoriaDetalle from '../ConvocatoriaDetalle';

const originalFetch = global.fetch;

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  global.fetch = originalFetch;
});

function isoDateWithOffset(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString();
}

test('muestra spinner mientras carga', async () => {
  global.fetch = vi.fn(() => new Promise(() => {}));

  render(<ConvocatoriaDetalle />);

  expect(screen.getByRole('status')).toBeInTheDocument();
});

test('muestra error si la petición falla', async () => {
  global.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 500 }));

  render(<ConvocatoriaDetalle />);

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(screen.getByRole('alert')).toHaveTextContent(/HTTP 500/);
});

test('muestra datos, link de archivo y aplicar abre ventana', async () => {
  const data = {
    id: 123,
    clave_convocatoria: 'CL-1',
    convocatoria: 'Convocatoria Test',
    fechaInicioConvocatoria: isoDateWithOffset(-10),
    fechaFinConvocatoria: isoDateWithOffset(10),
    fechaInicioFinanciamiento: isoDateWithOffset(-1),
    fechaFinFinanciamiento: isoDateWithOffset(1),
    descripcion: 'Descripción de prueba',
    institucionFinanciamiento: 'Instituto X',
    presupuesto: 1000,
    requisitos: 'Requisitos',
    archivo: 'http://example.com/doc.pdf',
  };

  global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(data) }));

  const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

  render(<ConvocatoriaDetalle />);

  // wait for heading to avoid matching the duplicated label inside the list group
  await screen.findByRole('heading', { name: /Convocatoria Test/ });

  // Link to file
  const link = screen.getByText(/Ver \/ Descargar/i);
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', data.archivo);

  // Click apply opens window
  const applyBtn = screen.getByText(/Aplicar a convocatoria/i);
  fireEvent.click(applyBtn);
  expect(openSpy).toHaveBeenCalledWith(data.archivo, '_blank');
});

test('aplicar sin archivo muestra alert', async () => {
  const data = {
    id: 124,
    convocatoria: 'Sin Archivo',
    fechaInicioConvocatoria: isoDateWithOffset(-10),
    fechaFinConvocatoria: isoDateWithOffset(10),
    fechaInicioFinanciamiento: isoDateWithOffset(-1),
    fechaFinFinanciamiento: isoDateWithOffset(1),
  };

  global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(data) }));

  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => null);

  render(<ConvocatoriaDetalle />);

  // wait for the heading to ensure the correct instance is present
  await screen.findByRole('heading', { name: /Sin Archivo/ });

  const applyBtn = screen.getByText(/Aplicar a convocatoria/i);
  fireEvent.click(applyBtn);
  expect(alertSpy).toHaveBeenCalledWith('Función de aplicar no disponible.');
});

test('cuando financiamiento fuera de rango muestra presupuesto en rojo', async () => {
  const data = {
    id: 125,
    convocatoria: 'Fin pasado',
    fechaInicioConvocatoria: isoDateWithOffset(-20),
    fechaFinConvocatoria: isoDateWithOffset(-10),
    fechaInicioFinanciamiento: isoDateWithOffset(-20),
    fechaFinFinanciamiento: isoDateWithOffset(-10),
    presupuesto: 500,
  };

  global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(data) }));

  render(<ConvocatoriaDetalle />);

  // use heading lookup to avoid matching multiple nodes containing the same text
  await screen.findByRole('heading', { name: /Fin pasado/ });

  const presupuestoNode = screen.getByText(/\$ 500/);
  // estilo aplicado en el Col que rodea el valor
  expect(presupuestoNode).toBeInTheDocument();
  const styledParent = presupuestoNode.closest('[style]');
  expect(styledParent).not.toBeNull();
  // jsdom normalizes 'red' to rgb(...) so match the rgb value
  expect(styledParent).toHaveStyle('color: rgb(255, 0, 0)');
});
