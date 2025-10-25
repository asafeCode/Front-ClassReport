import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { login as apiLogin } from "../api/authService";

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
    <div data-theme="dark" className="overflow-hidden">
      <div className="w-screen h-screen flex items-center justify-center bg-linear-to-b from-blue-400 to-purple-900">
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset bg-base-200 border-none rounded-box w-xs border p-4 shadow-lg">
            <h2 className="text-center font-medium text-lg pb-4">Gere seu Relatório!</h2>
            {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

            <label className="input input-ghost">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
            </label>


            <label className="input input-ghost mt-4">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                  ></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
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
