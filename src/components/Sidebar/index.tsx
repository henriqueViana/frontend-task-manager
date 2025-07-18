import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path: string) =>
    `block px-4 py-2 text-white rounded hover:bg-blue-100 ${
      location.pathname === path ? "bg-blue-500 text-white" : "text-gray-700"
    }`;

  return (
    <aside className="bg-default-black shadow-md w-64 h-full p-4 hidden md:block">
      <h2 className="font-bold text-lg mb-6">Menu</h2>
      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>
          📊 Dashboard
        </Link>
        <Link to="/tasks" className={linkClass("/tasks")}>
          ✅ Tarefas
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
