import { useEffect, useState } from "react";
import {
  obtenerCursos,
  guardarCurso,
  eliminarCurso,
} from "./courseService";
import CursoTabla from "./components/curso/CursoTabla";

const initialForm = { id: "", nombre: "", codigo: "", creditos: "" };

function App() {
  const [form, setForm] = useState(initialForm);
  const [cursos, setCursos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCursos = async (searchText = "") => {
    try {
      setLoading(true);
      const data = await obtenerCursos(searchText);
      setCursos(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCursos(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.codigo.trim() || !form.creditos) {
      alert("Debe completar nombre, código y créditos");
      return;
    }
    try {
      await guardarCurso(form);
      setForm(initialForm);
      await loadCursos(search);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (curso) => {
    setForm({
      id: curso.id || "",
      nombre: curso.nombre || "",
      codigo: curso.codigo || "",
      creditos: curso.creditos || "",
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Desea eliminar este curso?")) return;
    try {
      await eliminarCurso(id);
      await loadCursos(search);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => setForm(initialForm);
  const handleSearch = async () => await loadCursos(search);
  const handleClearSearch = async () => {
    setSearch("");
    await loadCursos("");
  };

  return (
    <div className="container">

      {/* Header */}
      <div className="header">
        <h1 className="header-title">📚 Gestión de Cursos</h1>
        <p className="header-subtitle">Administración de cursos académicos — React + Supabase</p>
      </div>

      {/* Formulario */}
      <div className="card">
        <h2 style={{ marginBottom: "14px", fontSize: "16px", fontWeight: "700" }}>
          {form.id ? "✏️ Editar curso" : "➕ Agregar curso"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="controls">
            <div className="field">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej: Matemáticas Discretas"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>Código</label>
              <input
                type="text"
                name="codigo"
                placeholder="Ej: MAT-101"
                value={form.codigo}
                onChange={handleChange}
              />
            </div>
            <div className="field" style={{ maxWidth: "120px" }}>
              <label>Créditos</label>
              <input
                type="number"
                name="creditos"
                placeholder="4"
                min="1"
                max="10"
                value={form.creditos}
                onChange={handleChange}
              />
            </div>
            <div className="field buttons">
              <button type="submit" className="btn btn-primary">
                {form.id ? "Guardar" : "Agregar"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Lista */}
      <div className="card">
        <h2 style={{ marginBottom: "14px", fontSize: "16px", fontWeight: "700" }}>
          🔍 Consulta de cursos
        </h2>

        <div className="controls">
          <div className="field">
            <label>Buscar</label>
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="field buttons">
            <button className="btn btn-primary" onClick={handleSearch}>Buscar</button>
            <button className="btn btn-secondary" onClick={handleClearSearch}>Limpiar</button>
          </div>
        </div>

        {loading ? (
          <p className="status status-muted">⏳ Cargando cursos...</p>
        ) : (
          <CursoTabla
            cursos={cursos}
            onEditar={handleEdit}
            onEliminar={handleDelete}
          />
        )}
      </div>

    </div>
  );
}

export default App;