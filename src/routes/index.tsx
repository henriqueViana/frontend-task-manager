import {
  BrowserRouter,
  Navigate,
  Routes as ReactRoutes,
  Route,
} from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import Login from "../pages/Login";
import AuthGuard from "./auth-guard";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Tasks/Register";
import TasksPage from "../pages/Tasks";

const Routes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ReactRoutes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />

          <Route
            path="/tarefas"
            element={
              <AuthGuard>
                <TasksPage />
              </AuthGuard>
            }
          />

          <Route
            path="/tarefas/cadastro"
            element={
              <AuthGuard>
                <Register />
              </AuthGuard>
            }
          />

          <Route path="*" element={<Login />} />
        </ReactRoutes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routes;
