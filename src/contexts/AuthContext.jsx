import { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken as saveToken, clearToken } from "../utils/TokenStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);

  // Inicializa com token do localStorage
  useEffect(() => {
    const savedToken = getToken();
    if (savedToken) {
      setTokenState(savedToken);
    }
  }, []);

  const login = (accessToken) => {
    if (accessToken) {
      saveToken(accessToken);
      setTokenState(accessToken);
    }
  };

  const logout = () => {
    clearToken();
    setTokenState(null);
  };

  const isLoggedIn = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
