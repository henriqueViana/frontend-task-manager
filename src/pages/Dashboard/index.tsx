import Sidebar from "../../components/Sidebar";
import { PieChart } from "../../components/Charts/Pie";
import { BarChart } from "../../components/Charts/Bar";

const COLORS = ["#3b82f6", "#f97316", "#10b981"];

const Dashboard = () => {
  // Exemplo de dados mockados
  const statusData = [
    { name: "Pendente", value: 5 },
    { name: "Em Progresso", value: 8 },
    { name: "Concluído", value: 12 },
  ];

  const categoryData = [
    { name: "Trabalho", value: 10 },
    { name: "Pessoal", value: 7 },
    { name: "Outros", value: 8 },
  ];

  const totalTasks = statusData.reduce((sum, item) => sum + item.value, 0);
  const completedTasks =
    statusData.find((item) => item.name === "Concluído")?.value || 0;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="flex min-h-screen h-screen bg-gray-50">
      <Sidebar />
      <div className="p-6 bg-gray-50 min-h-screen flex-1">
        <h1 className="text-2xl font-bold mb-6 text-default-black">
          Dashboard de Tarefas
        </h1>

        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold mb-2 text-default-black">
              Tarefas Concluídas
            </h2>
            <p className="text-3xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold mb-2 text-default-black">
              Tarefas Pendentes (Pendentes + Em Progresso)
            </h2>
            <p className="text-3xl font-bold text-red-500">{pendingTasks}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="font-semibold mb-2 text-default-black">
              Distribuição por Status
            </h2>
            <PieChart data={statusData} colors={COLORS} />
          </div>

          {/* Category Distribution Bar Chart */}
          <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="font-semibold mb-2 text-default-black">
              Distribuição por Categoria
            </h2>
            <BarChart data={categoryData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
