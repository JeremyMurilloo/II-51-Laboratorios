// src/components/StudentTable.jsx
import { useNavigate } from "react-router-dom";

function StudentTable({ estudiantes, onEliminar }) {
  const navigate = useNavigate();

  if (estudiantes.length === 0) {
    return (
      <p className="status status-muted">📭 No hay estudiantes registrados</p>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Carrera</th>
            <th>Fecha Nac.</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est, index) => (
            <tr key={est.id}>
              <td>{index + 1}</td>
              <td>{est.nombre}</td>
              <td>{est.apellido}</td>
              <td>{est.correo}</td>
              <td>
                <span className="badge">{est.carrera}</span>
              </td>
              <td>{est.fecha_nacimiento ?? "—"}</td>
              <td style={{ display: "flex", gap: "6px" }}>
                <button
                  className="btnActualizar"
                  onClick={() => navigate(`/editar/${est.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btnEliminar"
                  onClick={() => onEliminar(est.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
