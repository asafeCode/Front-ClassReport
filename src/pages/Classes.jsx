import api from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Classes() {
  const { logout } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loadingReport, setLoadingReport] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reportHtml, setReportHtml] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/classes")
      .then((res) => setClasses(res.data.results))
      .catch((err) => console.error("Erro ao buscar turmas:", err));
  }, []);

  const handleGenerateReport = async (classId) => {
    setError("");
    setSuccess("");
    setReportHtml("");
    setLoadingReport(classId);

    try {
      const response = await api.post("/generate-report", { classid: String(classId) });
      setSuccess("Recado gerado com sucesso!");
      setReportHtml(response.data);
    } catch (err) {
      if (err.response) {
        setError(`Erro: ${err.response.data.message || "400 Bad Request"}`);
      } else {
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
    <div data-theme="dark" className="min-h-screen w-screen  flex flex-col items-center p-6 bg-linear-to-b from-blue-400 to-purple-900">
      <header className="w-full max-w-5xl flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
        <h1 className="text-2xl font-bold text-center md:text-left text-white">Painel do Professor</h1>
        <button
          onClick={handleLogout}
          className="btn btn-soft btn-error bg-red-500 border-none text-white"
        >
          Sair
        </button>
      </header>

      <div className="bg-base-100 text-base-content rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 w-full max-w-5xl transition-transform ">
        <h2 className="text-[#4A00E0] text-xl font-bold mb-3">Suas Turmas do Dia</h2>
        <p className="text-base-content mb-6 leading-relaxed">
          Aqui você pode gerar o recado de aula para enviar aos responsáveis pelos alunos. 
          Selecione uma turma e clique em <strong>“Gerar Recado”</strong>.
        </p>

        {error && <p className="text-red-500 font-medium mb-4">{error}</p>}
        {success && <p className="text-green-500 font-medium mb-4">{success}</p>}

        <ul className="flex flex-col gap-3">
          {Array.isArray(classes) && classes.length > 0 ? (
            classes.map((c) => (
              <li
                key={c.id}
                className="bg-gray-100 hover:bg-gray-200 transition-all p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-3"
              >
                <span className="font-medium">{c.name}</span>
                <button
                  onClick={() => handleGenerateReport(c.id)}
                  disabled={loadingReport === c.id}
                  className="btn bg-linear-to-r from-[#4A00E0] to-[#8E2DE2] border-none text-white rounded-full px-5 hover:opacity-90"
                >
                  {loadingReport === c.id ? "Gerando..." : "Gerar Recado"}
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-base-content">Nenhuma turma encontrada.</p>
          )}
        </ul>

        {reportHtml && (
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h3 className="text-[#4A00E0] text-lg font-semibold mb-3">Recado Gerado</h3>
            <div
              className="bg-black text-green-400 p-3 rounded-md max-h-72 overflow-y-auto font-mono text-sm whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: reportHtml }}
            />
            <button
              onClick={handleCopyToClipboard}
              className="btn mt-4 bg-[#4A00E0] hover:bg-[#5A10F0] text-white border-none rounded-full px-5"
            >
              Copiar Recado
            </button>
          </div>
        )}
      </div>

       <footer className="footer pb-4 footer-center bg-transparent text-white fixed bottom-0">
        <aside>
          <p>Equipe Ctrl+Play Guarapari © {new Date().getFullYear()} - Gerador de Relatórios para Professores</p>
        </aside>
      </footer>
    </div>
  );
}
