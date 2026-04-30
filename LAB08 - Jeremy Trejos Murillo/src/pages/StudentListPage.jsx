// src/pages/StudentListPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerEstudiantes,
  eliminarEstudiante,
} from "../services/estudianteService";
import StudentTable from "../components/StudentTable";
import SearchBar from "../components/SearchBar";

function StudentListPage() {
  const navigate = useNavigate();
  const [estudiantes, setEstudiantes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarEstudiantes = async (texto = "") => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerEstudiantes(texto);
      setEstudiantes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const handleEliminar = async (id) => {
    if (!confirm("¿Desea eliminar este estudiante?")) return;
    try {
      await eliminarEstudiante(id);
      await cargarEstudiantes(search);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSearch = () => cargarEstudiantes(search);

  const handleClear = () => {
    setSearch("");
    cargarEstudiantes("");
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="header-title">🎓 Gestión de Estudiantes</h1>
        <p className="header-subtitle">
          Administración de estudiantes — React + Supabase + React Router
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>📋 Listado de estudiantes</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/nuevo")}
          >
            ➕ Agregar estudiante
          </button>
        </div>

        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
          onClear={handleClear}
        />

        {loading && <p className="status status-muted">⏳ Cargando estudiantes...</p>}
        {error && <p className="status status-error">❌ {error}</p>}
        {!loading && !error && (
          <StudentTable
            estudiantes={estudiantes}
            onEliminar={handleEliminar}
          />
        )}
      </div>
    </div>
  );
}

export default StudentListPage;
