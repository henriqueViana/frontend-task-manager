import { renderHook, act } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { useTasks } from '../hooks/useTasks';
import * as storeHook from '../hooks/useStore';
import * as authContext from '../context/AuthContext';
import * as toastHook from '../hooks/useToast';
import * as service from '../service/tasks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TaskType } from '../store/tasksSlice';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../hooks/useStore', () => ({
  useStore: vi.fn(),
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../hooks/useToast', () => ({
  useToasty: vi.fn(),
}));

vi.mock('../service/tasks', async () => ({
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

describe('useTasks tests', () => {
  const navigateMock = vi.fn();
  const dispatchMock = vi.fn();
  const successMock = vi.fn();
  const errorMock = vi.fn();

  const mockTasks = [
    {
      id: "1",
      title: "Tarefa 1",
      description: "Descrição da tarefa 1",
      priority: "Média",
      category: "Trabalho",
      status: "Concluído"
    },
    {
      id: "2",
      title: "Tarefa 2",
      description: "Descrição da tarefa 1",
      priority: "Média",
      category: "Trabalho",
      status: "Concluído"
    }
  ];

  const mockUser = { id: '123', email: 'user@example.com' };

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as unknown as Mock).mockReturnValue(navigateMock);
    (useDispatch as unknown as Mock).mockReturnValue(dispatchMock);

    vi.spyOn(storeHook, 'useStore').mockReturnValue({ tasks: mockTasks, filters: {} });
    vi.spyOn(authContext, 'useAuth').mockReturnValue({
      user: mockUser,
      setUser: vi.fn(),
      logout: vi.fn(),
    });
    vi.spyOn(toastHook, 'useToasty').mockReturnValue({
      success: successMock,
      error: errorMock,
      loading: vi.fn(),
    });
  });

  it('should redirect to create task', () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.redirectToCreateTask();
    });

    expect(navigateMock).toHaveBeenCalledWith('/tarefas/cadastro');
  });

  it('should redirect to edit task', () => {
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.redirectToEditTask('1');
    });

    expect(navigateMock).toHaveBeenCalledWith('/tarefas/cadastro/1');
  });

  it('should return task by id', () => {
    const { result } = renderHook(() => useTasks());
    const task = result.current.getTaskById('2');
    expect(task).toEqual(mockTasks[1]);
  });

  it('should edit task and show success toast', () => {
    const { result } = renderHook(() => useTasks());

    const updatedTask: TaskType = {
      id: "1",
      title: "Tarefa 1",
      description: "Descrição da tarefa 1",
      priority: "Média",
      category: "Trabalho",
      status: "Concluído"
    };

    act(() => {
      result.current.editTask(updatedTask);
    });

    expect(service.updateTask).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalled();
    expect(successMock).toHaveBeenCalledWith('Tarefa editada com sucesso!');
  });

  it('should create new task and show success toast', () => {
    const { result } = renderHook(() => useTasks());

    const createdTask: TaskType = {
      id: "1",
      title: "Tarefa 1",
      description: "Descrição da tarefa 1",
      priority: "Média",
      category: "Trabalho",
      status: "Concluído"
    };

    act(() => {
      result.current.createNewTask(createdTask);
    });

    expect(service.createTask).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalled();
    expect(successMock).toHaveBeenCalledWith('Tarefa criada com sucesso!');
  });

  it('should delete task and show success toast', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.deleteTask('1');
    });

    expect(service.deleteTask).toHaveBeenCalled();
    expect(dispatchMock).toHaveBeenCalled();
    expect(successMock).toHaveBeenCalledWith('Tarefa deletada com sucesso!');
  });
});