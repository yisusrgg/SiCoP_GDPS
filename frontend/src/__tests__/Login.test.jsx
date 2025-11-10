import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { vi, afterEach, test, expect, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigateMock,
    };
});

vi.mock('../api/Credenciales.api', () => ({
    doLogin: vi.fn(),
    checkRol: vi.fn(),
}));

import Login from '../Login';
import { doLogin, checkRol } from '../api/Credenciales.api';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    try {
        vi.useRealTimers();
    } catch (e) {}
});

test('renderiza campos y botón de iniciar sesión', () => {
    render(<Login />);

    expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingrese su usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ingrese su contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
});

test('no llama a la API si se envía el formulario vacío', async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    await waitFor(() => {
        expect(doLogin).not.toHaveBeenCalled();
    });
});

test('login exitoso redirige según rol (Administrador) después de timeout', async () => {
    doLogin.mockResolvedValue(true);
    checkRol.mockResolvedValue({ Rol: 'Administrador' });

    vi.useFakeTimers();

    render(<Login />);

    const usuarioInput = screen.getByPlaceholderText(/Ingrese su usuario/i);
    const passwordInput = screen.getByPlaceholderText(/Ingrese su contraseña/i);
    const btn = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(usuarioInput, { target: { value: 'usuario1' } });
    fireEvent.change(passwordInput, { target: { value: 'pass1' } });

    fireEvent.click(btn);

    await waitFor(() => expect(doLogin).toHaveBeenCalledWith('usuario1', 'pass1'));
    await waitFor(() => expect(checkRol).toHaveBeenCalled());

    vi.advanceTimersByTime(2000);

    expect(navigateMock).toHaveBeenCalledWith('/Administracion/Proyectos');

    vi.useRealTimers();
});

test('login exitoso redirige a /Proyectos para rol no administrador', async () => {
    doLogin.mockResolvedValue(true);
    checkRol.mockResolvedValue({ Rol: 'Usuario' });

    vi.useFakeTimers();

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Ingrese su usuario/i), { target: { value: 'u2' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese su contraseña/i), { target: { value: 'p2' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    await waitFor(() => expect(doLogin).toHaveBeenCalledWith('u2', 'p2'));
    vi.advanceTimersByTime(2000);

    expect(navigateMock).toHaveBeenCalledWith('/Proyectos');
    vi.useRealTimers();
});

test('muestra modal de error cuando doLogin devuelve falsy', async () => {
    doLogin.mockResolvedValue(false);

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Ingrese su usuario/i), { target: { value: 'noex' } });
    fireEvent.change(screen.getByPlaceholderText(/Ingrese su contraseña/i), { target: { value: 'bad' } });
    fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    await waitFor(() => {
        expect(screen.getByText(/Usuario o contraseña incorrectos/i)).toBeInTheDocument();
    });
});
