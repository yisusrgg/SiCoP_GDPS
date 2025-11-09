import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { vi, afterEach, test, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// Mockear useNavigate de react-router-dom
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

import ConvocatoriasCard from '../ConvocatoriasCard';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test('muestra valores por defecto cuando no se pasan props', () => {
  render(<ConvocatoriasCard />);

  expect(screen.getByText(/Sin título/i)).toBeInTheDocument();
  expect(screen.getByText(/Sin autor/i)).toBeInTheDocument();
  expect(screen.getByText(/No hay descripción disponible/i)).toBeInTheDocument();
});

test('renderiza correctamente con props individuales', () => {
  render(<ConvocatoriasCard nombre="T1" investigador="Autor X" descripcion="Desc corta" />);

  expect(screen.getByText('T1')).toBeInTheDocument();
  expect(screen.getByText('Autor X')).toBeInTheDocument();
  expect(screen.getByText('Desc corta')).toBeInTheDocument();
});

test('renderiza correctamente cuando se pasa un objeto `convocatoria`', () => {
  const obj = { convocatoria: 'Obj Title', investigador: 'Obj Autor', descripcion: 'Obj Desc' };
  render(<ConvocatoriasCard convocatoria={obj} />);

  expect(screen.getByText('Obj Title')).toBeInTheDocument();
  expect(screen.getByText('Obj Autor')).toBeInTheDocument();
  expect(screen.getByText('Obj Desc')).toBeInTheDocument();
});

test('al hacer click navega a `to` cuando se proporciona', () => {
  render(<ConvocatoriasCard nombre="Ir" to="/ruta/test" />);

  fireEvent.click(screen.getByText('Ir'));
  expect(navigateMock).toHaveBeenCalledWith('/ruta/test');
});

test('al hacer click llama a onClick si se proporciona', () => {
  const handler = vi.fn();
  render(<ConvocatoriasCard nombre="ClickMe" onClick={handler} />);

  fireEvent.click(screen.getByText('ClickMe'));
  expect(handler).toHaveBeenCalled();
});

test('al hacer click sin `to` ni `onClick` navega al detalle por defecto', () => {
  render(<ConvocatoriasCard nombre="NavPorDefecto" />);

  fireEvent.click(screen.getByText('NavPorDefecto'));
  expect(navigateMock).toHaveBeenCalledWith('../Administracion/ConvocatoriasDetalle');
});
