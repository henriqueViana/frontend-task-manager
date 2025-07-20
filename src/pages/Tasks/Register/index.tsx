import Form from "../../../components/Form";
import Select from "../../../components/Form/Select";
import Input from "../../../components/Input";
import Sidebar from "../../../components/Sidebar";
import { useRegister } from "../../../hooks/useRegister";

const priorityOptions = [
  { label: "Alta", value: "Alta" },
  { label: "Média", value: "Média" },
  { label: "Baixa", value: "Baixa" },
];

const statusOptions = [
  { label: "Pendente", value: "Pendente" },
  { label: "Em Progresso", value: "Em Progresso" },
  { label: "Concluído", value: "Concluído" },
];

const Register = () => {
  const { handleSubmit, updateFieldRegister } = useRegister();
  return (
    <div className="flex min-h-screen h-screen bg-gray-50">
      <Sidebar />
      <div className="p-6 bg-gray-50 min-h-screen flex-1">
        <h1 className="text-2xl font-bold mb-6 text-default-black">
          Cadastro de Tarefas
        </h1>

        <div>
          <Form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-xl w-full"
          >
            <Input
              type="text"
              label="Título"
              onValueChange={(value) => updateFieldRegister("title", value)}
              className="w-full mt-1 border rounded p-2 text-default-black"
            />
            <Input
              type="text"
              label="Descrição"
              onValueChange={(value) =>
                updateFieldRegister("description", value)
              }
              className="w-full mt-1 border rounded p-2 text-default-black"
            />
            <Input
              type="text"
              label="Categoria"
              onValueChange={(value) => updateFieldRegister("category", value)}
              className="w-full mt-1 border rounded p-2 text-default-black"
            />
            <Select
              label="Prioridade"
              options={priorityOptions}
              onValueChange={(value) => updateFieldRegister("priority", value)}
            />
            <Select
              label="Status"
              options={statusOptions}
              onValueChange={(value) => updateFieldRegister("status", value)}
            />

            <button
              type="submit"
              className="bg-blue-500 mt-4 text-white w-full rounded p-2"
            >
              Entrar
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
