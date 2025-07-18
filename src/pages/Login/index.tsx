import Form from "../../components/Form";
import Input from "../../components/Input";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { handleSubmit, updateUser } = useLogin();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl max-w-lg min-w-lg"
      >
        <h2 className="text-xl font-bold text-default-black">
          Acessar o Sistema
        </h2>
        <Input
          type="email"
          placeholder="E-mail"
          onValueChange={(value) => updateUser("email", value)}
          className="w-full mt-4 border rounded p-2 text-default-black"
        />
        <Input
          type="password"
          placeholder="Senha"
          onValueChange={(value) => updateUser("password", value)}
          className="w-full mt-4 border rounded p-2 text-default-black"
        />
        <button
          type="submit"
          className="bg-blue-500 mt-4 text-white w-full rounded p-2"
        >
          Entrar
        </button>
      </Form>
    </div>
  );
};

export default Login;
