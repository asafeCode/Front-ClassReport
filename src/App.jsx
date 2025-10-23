import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Classes from "./pages/Classes";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/classes" element={<Classes />} />
            <Route path="*" element={<Navigate to="/classes" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
