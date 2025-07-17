// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState, type FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";

type UserType = {
  email: string;
  password: string;
};

const userLocalRef: UserType = {
  email: "",
  password: "",
};

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const updateUser = useCallback((field: keyof UserType, value: string) => {
    userLocalRef[field] = value;
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUser(userLocalRef);
    navigate("/dashboard");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4 text-default-black">
          Acessar o Sistema
        </h2>
        <Input
          type="email"
          placeholder="E-mail"
          onValueChange={(value) => updateUser("email", value)}
          className="w-full mb-4 border rounded p-2 text-default-black"
        />
        <Input
          type="password"
          placeholder="Senha"
          onValueChange={(value) => updateUser("password", value)}
          className="w-full mb-4 border rounded p-2 text-default-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full rounded p-2"
        >
          Entrar
        </button>
      </Form>
    </div>
  );
};

export default Login;
