import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import api from "../api/api";

export default function Login() {
  const [email, setEmail] = useState(""); // 👈 nome correto
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Enviando username = email
      const res = await api.post("/login", {
        username: email,
        password: password,
      });

      const token = res.data.accessToken;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/classes");
      } else {
        setError("Token inválido. Verifique suas credenciais.");
      }
    } catch (err) {
      console.error(err);
      setError("E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>ACESSE SUA CONTA</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <FaEnvelope style={styles.icon} />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            <FaSignInAlt style={{ marginRight: 8 }} />
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#121212",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: "40px 30px",
    borderRadius: 10,
    boxShadow: "0 0 20px rgba(0,0,0,0.7)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    color: "#ff7a00",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 15,
  },
  inputGroup: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: 10,
    color: "#ccc",
    fontSize: 16,
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 35px",
    borderRadius: 5,
    border: "1px solid #333",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    fontSize: 15,
    outline: "none",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ff7a00",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s",
  },
  error: {
    color: "#ff6b6b",
    marginTop: 15,
  },
};
