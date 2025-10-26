import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Classes from "./pages/Classes";
import "./App.css";

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/classes" element={<Classes />} />
          <Route path="*" element={<Navigate to="/classes" replace />} />
        </>) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
