function CursoTabla({ cursos, onEditar, onEliminar }) {
  if (cursos.length === 0) {
    return <p className="status status-muted">📭 No hay cursos registrados</p>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Créditos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso, index) => (
            <tr key={curso.id}>
              <td>{index + 1}</td>
              <td>{curso.nombre}</td>
              <td><span className="badge">{curso.codigo}</span></td>
              <td>{curso.creditos} cr.</td>
              <td style={{ display: "flex", gap: "6px" }}>
                <button className="btnActualizar" onClick={() => onEditar(curso)}>
                  Editar
                </button>
                <button className="btnEliminar" onClick={() => onEliminar(curso.id)}>
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

export default CursoTabla;