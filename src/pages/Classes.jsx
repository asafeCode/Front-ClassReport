import { classes as getClasses } from "../api/services/classesService.js"
import { generateReport } from "../api/services/generateReportService.js";
import { teacherInfo } from "../api/services/teacherInfoService.js"
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/themeChange.jsx"

export default function Classes() {
  const { logout, token } = useAuth();
  const [teacher, setTeacher] = useState("")
  const [classes, setClasses] = useState([]);
  const [loadingReport, setLoadingReport] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reportHtml, setReportHtml] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    teacherInfo(token)
      .then((response) => setTeacher(response.first_name))
    getClasses(token)
      .then((res) => setClasses(res.results))
      .catch((err) => console.error("Erro ao buscar turmas:", err));
  }, []);

  const handleGenerateReport = async (classId) => {
    setError("");
    setSuccess("");
    setReportHtml("");
    setLoadingReport(classId);

    try {
      const response = await generateReport(token, classId);
      setSuccess("Recado gerado com sucesso!");
      setReportHtml(response.data);
    } catch (err) {
      if (err.response) {
        setError(`Erro: ${err.response.data.message || "Erro ao processar"}`);
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
    <div className="min-h-screen w-screen  flex flex-col items-center p-6 bg-linear-to-b from-blue-400 to-purple-900">
      <header className="w-full max-w-5xl flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10">
        <h1 className="text-2xl font-bold text-center md:text-left text-white">
          Painel do Professor
        </h1>
        <div className="flex items-center gap-4 self-center md:self-auto">
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="btn bg-red-500 border-none hover:bg-red-700 shadow-gray-600 shadow-sm text-white "
          >
            Sair
          </button>
        </div>
      </header>

      <div className="bg-base-100 text-base-content rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 w-full max-w-5xl transition-transform ">
        <h1 className="pb-2 font-light text-xl" >Olá {teacher}, Seja bem Vindo! </h1>
        <p className="text-base-content mb-4 leading-relaxed">
          Aqui você pode gerar o recado de aula para enviar aos responsáveis pelos alunos.
          Selecione uma turma e clique em <strong>“Gerar Recado”</strong>.
        </p>
        <h2 className="text-base-content font-medium mb-4 text-xl text-center">Suas Turmas do Dia</h2>

        {error && <p className="text-red-500 font-medium mb-4">{error}</p>}
        {success && <p className="text-green-500 font-medium mb-4">{success}</p>}

        <ul className="flex flex-col gap-3">
          {Array.isArray(classes) && classes.length > 0 ? (
            classes.map((c) => (
              <li
                key={c.id}
                className="p-4 flex flex-col sm:flex-row justify-between items-center"
              >
                <span className="font-medium text-base-content">{c.name}</span>
                <button
                  onClick={() => handleGenerateReport(c.id)}
                  disabled={loadingReport === c.id}
                  className="btn bg-linear-to-r from-[#4A00E0] to-[#8E2DE2] border-none text-white rounded-full px-5 hover:opacity-90"
                >
                  {loadingReport === c.id ? <span className="loading loading-spinner"></span> : "Gerar Recado"}
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-base-content">Nenhuma turma encontrada.</p>
          )}
        </ul>

        {reportHtml && (
          <div className="mt-8 bg-base-100 border-none rounded-xl p-5">
            <div
              className="bg-base-300 text-base-content p-3 rounded-md max-h-72 overflow-y-auto font-mono text-sm whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: reportHtml }}
            />
            <button
              onClick={handleCopyToClipboard}
              className="btn btn-outline btn-sm btn-accent  mt-3 w-full"
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
