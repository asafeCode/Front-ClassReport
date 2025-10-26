import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { login as apiLogin } from "../api/services/loginService.js";
import ThemeToggle from "../components/themeChange.jsx";
import InputEmail from "../components/inputEmail.jsx";
import InputPassword from "../components/inputPassword.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const accessToken = await apiLogin(email, password);
      if (accessToken) {
        login(accessToken);
        navigate("/classes");
      } else {
        setError("Token inválido. Verifique suas credenciais.");
      }
    } catch (err) {
      setError("E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <header className="fixed w-full">
        <div className="flex flex-row-reverse m-5">
          <ThemeToggle/>
        </div>
      </header>
      <div className="w-screen h-screen flex items-center justify-center bg-linear-to-b from-blue-400 to-purple-900">
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset bg-base-200 border-none rounded-box w-xs border p-4 shadow-lg">
            <h2 className="text-center font-medium text-lg pb-4">Gere seu Relatório!</h2>
            {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
            <InputEmail onChange={(e) => setEmail(e.target.value)}/>
            <InputPassword onChange={(e) => setPassword(e.target.value)}/>
            <button
              className="btn btn-soft btn-primary border-blue-700 mt-4"
              disabled={loading}
              type="submit"
            >{loading ? <span className="loading loading-spinner"></span> : "Entrar"}</button>

          </fieldset>
        </form>
      </div>
      <footer className="footer pb-4 footer-center bg-transparent text-white fixed bottom-0">
        <aside>
          <p>Equipe Ctrl+Play Guarapari © {new Date().getFullYear()} - Gerador de Relatórios para Professores</p>
        </aside>
      </footer>
    </div>
  );
}

