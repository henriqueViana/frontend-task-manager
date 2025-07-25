import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type UserType = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: UserType;
  setUserLogin: (userData: UserType) => void;
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

  const setUserLogin = useCallback((userData: UserType) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const logout = () => {
    setUser(defaultUserValue);
    localStorage.removeItem("user");
  };

  const context: AuthContextType = {
    user,
    setUserLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
