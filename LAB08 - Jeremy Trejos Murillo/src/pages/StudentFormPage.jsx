// src/pages/StudentFormPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  guardarEstudiante,
  obtenerEstudiantePorId,
} from "../services/estudianteService";
import StudentForm from "../components/StudentForm";

const INITIAL_FORM = {
  nombre: "",
  apellido: "",
  correo: "",
  carrera: "",
  fechaNac: "",
};

function StudentFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEditing) return;

    const cargarEstudiante = async () => {
      try {
        setLoadingData(true);
        setError(null);
        const data = await obtenerEstudiantePorId(id);
        setForm({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          correo: data.correo || "",
          carrera: data.carrera || "",
          fechaNac: data.fecha_nacimiento || "",  // ← corregido
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingData(false);
      }
    };

    cargarEstudiante();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.apellido.trim() || !form.correo.trim()) {
      alert("Nombre, apellido y correo son obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await guardarEstudiante(isEditing ? { ...form, id } : form);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => navigate("/");

  if (loadingData) {
    return (
      <div className="container">
        <p className="status status-muted">⏳ Cargando datos del estudiante...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="header-title">
          {isEditing ? "✏️ Editar estudiante" : "➕ Nuevo estudiante"}
        </h1>
        <p className="header-subtitle">
          {isEditing
            ? "Modifica los datos del estudiante y guarda los cambios"
            : "Completa el formulario para agregar un nuevo estudiante"}
        </p>
      </div>

      <div className="card">
        {error && <p className="status status-error">❌ {error}</p>}

        <StudentForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={isEditing}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default StudentFormPage;