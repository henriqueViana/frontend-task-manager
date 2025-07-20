import { createContext, useContext, useState, type ReactNode } from "react";

type UserType = {
  id: string;
  email: string;
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
  id: "",
  email: "",
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: PropsType) => {
  const storedUser = localStorage.getItem("user");
  const initialUserData = storedUser
    ? JSON.parse(storedUser)
    : defaultUserValue;

  const [user, setUser] = useState<UserType>(initialUserData);

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
