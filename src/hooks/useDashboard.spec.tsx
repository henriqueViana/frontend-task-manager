import { renderHook, act } from "@testing-library/react";
import { vi, Mock } from "vitest";
import { useDashboard } from "./useDashboard";
import { getTasks } from "../service/tasks";
import { addTask } from "../store/tasksSlice";

vi.mock("../config/index");

// Mocks
vi.mock("../service/tasks");
vi.mock("../store/tasksSlice", () => ({
  addTask: vi.fn(),
}));
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(() => vi.fn()),
}));
vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));
vi.mock("./useStore", () => ({
  useStore: vi.fn(),
}));

import { useStore } from "./useStore";
import { useAuth } from "../context/AuthContext";
import { useDispatch } from "react-redux";

describe("useDashboard", () => {
  const mockedDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDispatch as unknown as Mock).mockReturnValue(mockedDispatch);
  });

  it("should fetch tasks when tasks are empty and user.id exists", async () => {
    const fakeTasks = [{ id: 1, status: "Concluído", category: "Work" }];
    const fakeUser = { id: 123 };

    (useStore as Mock).mockReturnValue({ tasks: [] });
    (useAuth as Mock).mockReturnValue({ user: fakeUser });
    (getTasks as Mock).mockResolvedValue({
      data: [{ items: fakeTasks }],
    });

    await act(async () => {
      renderHook(() => useDashboard());
    });

    expect(getTasks).toHaveBeenCalledWith({ userId: fakeUser.id });
    expect(addTask).toHaveBeenCalledWith(fakeTasks);
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it("should not fetch tasks if tasks exist or user has no id", async () => {
    (useStore as Mock).mockReturnValue({ tasks: [{ id: 1 }] });
    (useAuth as Mock).mockReturnValue({ user: { id: 456 } });

    await act(async () => {
      renderHook(() => useDashboard());
    });

    expect(getTasks).not.toHaveBeenCalled();
    expect(mockedDispatch).not.toHaveBeenCalled();
  });

  it("should calculate task counts and group data correctly", () => {
    const fakeTasks = [
      { id: 1, status: "Concluído", category: "Work" },
      { id: 2, status: "Pendente", category: "Personal" },
      { id: 3, status: "Concluído", category: "Work" },
    ];

    (useStore as Mock).mockReturnValue({ tasks: fakeTasks });
    (useAuth as Mock).mockReturnValue({ user: { id: 123 } });

    const { result } = renderHook(() => useDashboard());

    expect(result.current.completedTasks).toBe(2);
    expect(result.current.pendingTasks).toBe(1);

    expect(result.current.categoryData).toEqual([
      { name: "Work", value: 2 },
      { name: "Personal", value: 1 },
    ]);

    expect(result.current.statusData).toEqual([
      { name: "Concluído", value: 2 },
      { name: "Pendente", value: 1 },
    ]);
  });
});
