import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom"; // para redirecionar

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loadingReport, setLoadingReport] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reportHtml, setReportHtml] = useState(""); // guarda o HTML gerado

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
      console.log("Resposta /generate-report:", response.data);
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
      navigator.clipboard.writeText(reportHtml)
        .then(() => alert("Recado copiado para a área de transferência!"))
        .catch(() => alert("Falha ao copiar."));
    }
  };

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Header com título e botão logout */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Turmas do dia</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#cc0000",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <ul>
        {Array.isArray(classes) && classes.length > 0 ? (
          classes.map((c) => (
            <li key={c.id} style={{ marginBottom: 10 }}>
              {c.name}
              <button
                onClick={() => handleGenerateReport(c.id)}
                disabled={loadingReport === c.id}
                style={{ marginLeft: 10, padding: "5px 10px", cursor: "pointer" }}
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
        <div style={{ marginTop: 30, border: "1px solid #333", padding: 20, borderRadius: 5 }}>
          <h3 style={{ color: "#fff" }}>Recado Gerado (HTML)</h3>
          <div
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "#000",
              color: "#fff",
              padding: 10,
              borderRadius: 5,
              maxHeight: "300px",
              overflowY: "auto",
              border: "1px solid #444",
            }}
            dangerouslySetInnerHTML={{ __html: reportHtml }}
          />
          <button
            onClick={handleCopyToClipboard}
            style={{
              marginTop: 10,
              padding: "5px 10px",
              cursor: "pointer",
              backgroundColor: "#222",
              color: "#fff",
              border: "none",
              borderRadius: 3,
            }}
          >
            Copiar Recado
          </button>
        </div>
      )}
    </div>
  );
}
