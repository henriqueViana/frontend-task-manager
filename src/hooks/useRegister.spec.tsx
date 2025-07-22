import { renderHook, act } from "@testing-library/react";
import { vi, Mock } from "vitest";
import { useRegister } from "../hooks/useRegister";
import * as tasksHook from "../hooks/useTasks";
import { useNavigate, useLocation } from "react-router-dom";

// Mocks
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

vi.mock("../hooks/useTasks", async () => {
  return {
    useTasks: vi.fn(),
  };
});

describe("useRegister tests", () => {
  const navigateMock = vi.fn();
  const editTaskMock = vi.fn();
  const createNewTaskMock = vi.fn();
  const getTaskByIdMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useLocation as unknown as Mock).mockReturnValue({
      pathname: "/register/123",
    });

    (useNavigate as unknown as Mock).mockReturnValue(navigateMock);

    vi.spyOn(tasksHook, "useTasks").mockReturnValue({
      getTaskById: getTaskByIdMock,
      editTask: editTaskMock,
      createNewTask: createNewTaskMock,
      tasks: [],
      redirectToCreateTask: vi.fn(),
      redirectToEditTask: vi.fn(),
      deleteTask: vi.fn(),
    });
  });

  it("should populate task if id in path", () => {
    const taskMock = {
      id: "123",
      title: "Task title",
      description: "Description",
      priority: "High",
      category: "Work",
      status: "Pending",
    };

    getTaskByIdMock.mockReturnValue(taskMock);

    const { result } = renderHook(() => useRegister());

    expect(result.current.task).toEqual(taskMock);
  });

  it("should update task fields", () => {
    getTaskByIdMock.mockReturnValue(null);

    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.updateFieldRegister("title", "New Title");
    });

    expect(result.current.task.title).toBe("New Title");
  });

  it("should edit existing task on submit", () => {
    const taskMock = {
      id: "123",
      title: "Task title",
      description: "",
      priority: "",
      category: "",
      status: "",
    };

    getTaskByIdMock.mockReturnValue(taskMock);

    const { result } = renderHook(() => useRegister());

    const fakeEvent = { preventDefault: vi.fn() } as any;

    act(() => {
      result.current.handleSubmit(fakeEvent);
    });

    expect(editTaskMock).toHaveBeenCalledWith(taskMock);
    expect(navigateMock).toHaveBeenCalledWith("/tarefas");
  });

  it("should create new task on submit when no id", () => {
    getTaskByIdMock.mockReturnValue(null);

    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.updateFieldRegister("title", "My Task");
    });

    const fakeEvent = { preventDefault: vi.fn() } as any;

    act(() => {
      result.current.handleSubmit(fakeEvent);
    });

    expect(navigateMock).toHaveBeenCalledWith("/tarefas");
  });
});
