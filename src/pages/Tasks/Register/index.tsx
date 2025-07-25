import { Form } from "../../../components/ReactForm/Form";
import Sidebar from "../../../components/Sidebar";
import { useRegister } from "../../../hooks/useRegister";

const Register = () => {
  const { handleSubmit } = useRegister();

  return (
    <main className="flex min-h-screen h-screen bg-gray-50">
      <Sidebar />
      <section className="p-6 bg-gray-50 min-h-screen flex-1">
        <h1 className="text-2xl font-bold mb-6 text-default-black">
          Cadastro de Tarefas
        </h1>
        <Form onSubmit={handleSubmit} />
      </section>
    </main>
  );
};

export default Register;
