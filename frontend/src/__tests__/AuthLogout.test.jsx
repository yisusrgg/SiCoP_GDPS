import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { vi, afterEach, test, expect } from 'vitest';
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
    logOut: vi.fn(),
    chechSession: vi.fn(),
    checkRol: vi.fn(),
}));

import { MemoryRouter } from 'react-router-dom';
import NavBar from '../components/NavBar';
import RequireRole from '../components/RequireRole';
import { logOut, chechSession } from '../api/Credenciales.api';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

test('NavBar: cerrar sesión llama a logOut y navega al login', async () => {
    logOut.mockResolvedValue(true);

    render(
        <MemoryRouter>
        <NavBar user={{ name: 'Test User' }} />
        </MemoryRouter>
    );

    const btn = screen.getByText(/Cerrar sesión/i);
    fireEvent.click(btn);

    await waitFor(() => expect(logOut).toHaveBeenCalled());
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/'));
});

test('RequireRole: redirige a / si no hay sesión activa', async () => {
    chechSession.mockResolvedValue(false);

    render(
        <MemoryRouter>
        <RequireRole allowedRoles={["Administrador"]}>
            <div>Contenido protegido</div>
        </RequireRole>
        </MemoryRouter>
    );

    await waitFor(() => expect(chechSession).toHaveBeenCalled());
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/'));
});
