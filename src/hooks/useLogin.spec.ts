import { renderHook, act } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { useLogin } from '../hooks/useLogin';
import * as usersService from '../service/users';
import * as authContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../service/users', async () => {
  return {
    getUserLogin: vi.fn(),
  };
});

describe('useLogin tests', () => {
  const setUserMock = vi.fn();
  const navigateMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(authContext, 'useAuth').mockReturnValue({
      setUser: setUserMock,
      user: {
        id: '',
        email: ''
      },
      logout: function (): void {
        throw new Error('Logout error test');
      }
    });
    (useNavigate as unknown as Mock).mockReturnValue(navigateMock);
  });

  it('should update user input fields', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.updateUser('email', 'test@example.com');
      result.current.updateUser('password', '123456');
    });

  });

  it('should show error message when login fails', async () => {
    vi.spyOn(usersService, 'getUserLogin').mockResolvedValue(null);

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.updateUser('email', 'fail@example.com');
      result.current.updateUser('password', 'wrongpass');
    });

    const event = { preventDefault: vi.fn() } as any;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(result.current.errorMessage).toBe('Email ou senha inválidos.');
  });

  it('should login successfully and redirect', async () => {
    const mockUser = { id: '1', email: 'henrique@example.com', name: 'Henrique' };
    vi.spyOn(usersService, 'getUserLogin').mockResolvedValue(mockUser);

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.updateUser('email', 'valid@example.com');
      result.current.updateUser('password', 'correctpass');
    });

    const event = { preventDefault: vi.fn() } as any;

    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(setUserMock).toHaveBeenCalledWith(mockUser);
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    expect(localStorage.getItem('user')).toBe(JSON.stringify(mockUser));
  });
});