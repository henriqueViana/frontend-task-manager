import { useCallback, useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserLogin } from "../service/users";

type UserInputType = {
  email: string;
  password: string;
};

type UserType = {
  email: string;
  password: string;
};

type UseLoginType = {
  updateUser: (field: keyof UserType, value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  errorMessage: string;
  isLoading: boolean;
};

const userInput: UserType = {
  email: "",
  password: "",
};

export const useLogin = (): UseLoginType => {
  const { setUserLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const updateUser = useCallback(
    (field: keyof UserInputType, value: string) => {
      userInput[field] = value;
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!userInput.email || !userInput.password) {
        return;
      }
      setIsLoading(true);
      const userData = await getUserLogin(userInput.email, userInput.password);
      setIsLoading(false);

      if (!userData) {
        setError("Email ou senha inválidos.");
        return;
      }

      setUserLogin(userData);
      navigate("/dashboard");
    },
    []
  );

  return {
    updateUser,
    handleSubmit,
    errorMessage: error,
    isLoading,
  };
};
