import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import styles from "../pages/Login.styles";
import Button from "../components/Button";
import InputField from "../components/InputField";
import {login as apiLogin} from "../api/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try{
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
            <Button 
              label="Entrar"
              loading={loading}>
              </Button>
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
