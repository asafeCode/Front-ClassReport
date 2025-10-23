import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import styles from "../pages/Login.styles";
import Button from "../components/Button";
import InputField from "../components/InputField";
import api from "../api/api";

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
      const res = await api.post("/login", {
        username: email,
        password,
      });

      const { accessToken } = res.data;

      if (accessToken) {
        login(accessToken); // atualiza contexto e localStorage
        navigate("/classes"); // redireciona automaticamente
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
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.leftPanel}>
          <h2 style={styles.title}>Entrar</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <FaEnvelope style={styles.icon} />
              <InputField
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={FaEnvelope}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <FaLock style={styles.icon} />
              <InputField
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={FaLock}
                required
              />
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>

            {error && <p style={styles.error}>{error}</p>}
          </form>
        </div>

        <div style={styles.rightPanel}>
          <h2 style={styles.welcome}>Olá, Seja Bem-Vindo!</h2>
          <p style={styles.text}>
            Acesse sua conta para gerar seu recado de aula!
          </p>
        </div>
      </div>
    </div>
  );
}

// ...styles aqui (igual ao que você já tinha)
