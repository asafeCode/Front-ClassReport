import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setTokenState(savedToken);
    }
  }, []);

  const login = (accessToken) => {
    if (accessToken) {
      localStorage.setItem("token", accessToken);
      setTokenState(accessToken);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
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
