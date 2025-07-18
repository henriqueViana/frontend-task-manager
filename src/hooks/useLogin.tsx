import { useCallback, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type UserType = {
  email: string;
  password: string;
};

type UseLoginType = {
  updateUser: (field: keyof UserType, value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const userLocalRef: UserType = {
  email: "",
  password: "",
};

export const useLogin = (): UseLoginType => {
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

  return {
    updateUser,
    handleSubmit,
  };
};
