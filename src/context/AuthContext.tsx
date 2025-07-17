import { createContext, useContext, useState, type ReactNode } from "react";

type UserType = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  logout: () => void;
};

type PropsType = {
  children: ReactNode;
};

const defaultUserValue = {
  email: "",
  password: "",
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: PropsType) => {
  const [user, setUser] = useState<UserType>(defaultUserValue);

  const logout = () => setUser(defaultUserValue);

  const context: AuthContextType = {
    user,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
