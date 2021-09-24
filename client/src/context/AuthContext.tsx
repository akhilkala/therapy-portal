import React, {
  ReactElement,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { Nullable, User, Children } from "../utils/types";
import { post } from "../utils/requests";
import jwt from "jwt-decode";
import { useHistory } from "react-router-dom";

type Value = {
  user: Nullable<User>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: Boolean;
  updateUser: (userData: any) => void;
  isAdmin: () => boolean;
};

const AuthContext = createContext<Nullable<Value>>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: Children): ReactElement {
  const [user, setUser] = useState<Nullable<User>>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(jwt(token));
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await post("/auth/login", {
        username: username.trim(),
        password,
      });

      const user = jwt(res.token);
      setUser(user);
      localStorage.setItem("token", res.token);

      history.push("/");
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      history.push("/");
      localStorage.removeItem("token");
    } catch (err) {
      throw err;
    }
  };

  const isAdmin = () => user?.role === 1;

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    updateUser,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
