// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentListPage from "./pages/StudentListPage";
import StudentFormPage from "./pages/StudentFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: listado de estudiantes */}
        <Route path="/" element={<StudentListPage />} />

        {/* Ruta para agregar nuevo estudiante */}
        <Route path="/nuevo" element={<StudentFormPage />} />

        {/* Ruta para editar un estudiante por ID */}
        <Route path="/editar/:id" element={<StudentFormPage />} />

        {/* Cualquier otra ruta redirige al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
