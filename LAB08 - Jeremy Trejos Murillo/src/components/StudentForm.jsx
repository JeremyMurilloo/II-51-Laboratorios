
const CAMPOS = [
  { name: "nombre", label: "Nombre", type: "text", placeholder: "Ej: Juan" },
  { name: "apellido", label: "Apellido", type: "text", placeholder: "Ej: Pérez" },
  { name: "correo", label: "Correo", type: "email", placeholder: "Ej: juan@correo.com" },
  { name: "carrera", label: "Carrera", type: "text", placeholder: "Ej: Ingeniería en Sistemas" },
  { name: "fechaNac", label: "Fecha de Nacimiento", type: "date", placeholder: "" },
];

function StudentForm({ form, onChange, onSubmit, onCancel, isEditing, loading }) {
  return (
    <form onSubmit={onSubmit} className="student-form">
      <div className="form-grid">
        {CAMPOS.map(({ name, label, type, placeholder }) => (
          <div className="field" key={name}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={onChange}
              disabled={loading}
            />
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Agregar estudiante"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
