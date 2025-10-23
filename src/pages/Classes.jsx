import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Classes.styles";

export default function Classes() {
  const { logout } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loadingReport, setLoadingReport] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reportHtml, setReportHtml] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
     api.get("/classes")
      .then((res) => {
        setClasses(res.data.results);
      })
      .catch((err) => console.error("Erro ao buscar turmas:", err));
  }, []);

  const handleGenerateReport = async (classId) => {
    setError("");
    setSuccess("");
    setReportHtml("");
    setLoadingReport(classId);

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/generate-report",
        { classid: String(classId) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Recado gerado com sucesso!");
      setReportHtml(response.data);
    } catch (err) {
      if (err.response) {
        console.error("Erro response data:", err.response.data);
        setError(`Erro: ${err.response.data.message || "400 Bad Request"}`);
      } else {
        console.error(err);
        setError("Erro ao gerar o recado.");
      }
    } finally {
      setLoadingReport(null);
    }
  };

  const handleCopyToClipboard = () => {
    if (reportHtml) {
      navigator.clipboard
        .writeText(reportHtml)
        .then(() => alert("Recado copiado para a área de transferência!"))
        .catch(() => alert("Falha ao copiar."));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.title}>Painel do Professor</h1>
        <button
          style={styles.logoutBtn}
          onClick={handleLogout}
          onMouseOver={(e) => (e.target.style.background = styles.logoutBtnHover.background)}
          onMouseOut={(e) => (e.target.style.background = styles.logoutBtn.background)}
        >
          Sair
        </button>
      </header>

      {/* CARD PRINCIPAL */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Suas Turmas do Dia</h2>
        <p style={styles.cardText}>
          Aqui você pode gerar o recado de aula para enviar aos responsáveis
          pelos alunos. Selecione uma turma e clique em{" "}
          <strong>“Gerar Recado”</strong>.
        </p>

        {error && <p style={{ ...styles.message, ...styles.errorMsg }}>{error}</p>}
        {success && <p style={{ ...styles.message, ...styles.successMsg }}>{success}</p>}

        <ul style={styles.list}>
          {Array.isArray(classes) && classes.length > 0 ? (
            classes.map((c) => (
              <li key={c.id} style={styles.listItem}>
                <span style={{ fontWeight: 500 }}>{c.name}</span>
                <button
                  onClick={() => handleGenerateReport(c.id)}
                  disabled={loadingReport === c.id}
                  style={styles.generateBtn}
                >
                  {loadingReport === c.id ? "Gerando..." : "Gerar Recado"}
                </button>
              </li>
            ))
          ) : (
            <p>Nenhuma turma encontrada.</p>
          )}
        </ul>

        {reportHtml && (
          <div style={styles.reportBox}>
            <h3 style={styles.reportTitle}>Recado Gerado</h3>
            <div
              style={styles.reportOutput}
              dangerouslySetInnerHTML={{ __html: reportHtml }}
            />
            <button onClick={handleCopyToClipboard} style={styles.copyBtn}>
              Copiar Recado
            </button>
          </div>
        )}
      </div>

      {/* RODAPÉ */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} Sistema de Recados | Desenvolvido para
        facilitar a comunicação entre professores e responsáveis.
      </footer>
    </div>
  );
}
