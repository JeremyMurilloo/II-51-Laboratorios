import { supabase } from "./supabase.js";

//****************************************
// Referencias a elementos del DOM
//****************************************
// Botones
const btnClear = document.getElementById("btnClear");
const btnAdd = document.getElementById("btnAdd");
const btnCancel = document.getElementById("btnCancel");
const btnLoad = document.getElementById("btnLoad");
// Campo de búsqueda
const txtSearch = document.getElementById("txtSearch");
//Formulario
const txtId = document.getElementById("txtId");
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtCorreo = document.getElementById("txtCorreo");
const txtCarrera = document.getElementById("txtCarrera");
const txtFechaNac = document.getElementById("txtFechaNac");
// Tabla
const tbody = document.getElementById("tbodyStudents");
const tituloForm = document.getElementById("tituloForm");

//Consultar estudiantes al cargar la página
window.onload = () => {
  consultarEstudiantes();
};

//****************************************
//Eventos
//****************************************
btnLoad.addEventListener("click", async () => consultarEstudiantes());
btnAdd.addEventListener("click", async () => guardarEstudiante());
btnClear.addEventListener("click", async () => {
  txtSearch.value = "";
  await consultarEstudiantes();
});
btnCancel.addEventListener("click", async () => limpiarFormulario());

tbody.addEventListener("click", async (event) => {
  const target = event.target;
  if (!target.classList.contains("btnEliminar")) return;

  const id = target.getAttribute("data-id");

  await eliminarEstudiante(id);
});

/*
editar - consulto por el id-
1. obtengo el id del estudiante a editar
2. consulto los datos del estudiante con ese id
3. lleno el formulario con los datos obtenidos
4. el usuario edita los datos y hace click en "Guardar"
*/

tbody.addEventListener("click", async (event) => {
  const target = event.target;
  if (!target.classList.contains("btnEditar")) return;

  const id = target.getAttribute("data-id");

  const { data, error } = await supabase
    .from("estudiantes")
    .select("id,nombre,apellido,correo,carrera,fecha_nacimiento")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    Swal.fire("Error al cargar estudiante");
    return;
  }

  txtId.value = data.id;
  txtNombre.value = data.nombre;
  txtApellido.value = data.apellido;
  txtCorreo.value = data.correo;
  txtCarrera.value = data.carrera;
  txtFechaNac.value = data.fecha_nacimiento || "";

  btnAdd.textContent = "Actualizar";
  tituloForm.textContent = "Editar estudiante";
});

//****************************************
//Funciones
//****************************************
const consultarEstudiantes = async () => {
  const search = txtSearch.value.trim() || "";
  const query = supabase
    .from("estudiantes")
    .select("id,nombre,apellido,correo,carrera,fecha_nacimiento");

  if (search.length > 0) {
    query.or(`nombre.ilike.%${search}%,apellido.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    Swal.fire("Error cargando estudiantes", "", "error");
    return;
  }

  tbody.innerHTML = "";

  data.forEach((r) => {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", r.id);

    tr.innerHTML = `
        <td>${r.nombre ?? ""}</td>
        <td>${r.apellido ?? ""}</td>
        <td>${r.correo ?? ""}</td>
        <td>${r.carrera ?? ""}</td>
        <td>${r.fecha_nacimiento ?? ""}</td>
        <td>
          <button class="btnEditar" data-id="${r.id}">Editar</button>
          <button class="btnEliminar" data-id="${r.id}">Eliminar</button>
        </td>
      `;

    tbody.appendChild(tr);
  });
};

const guardarEstudiante = async () => {
  const estudiante = {
    nombre: txtNombre.value.trim(),
    apellido: txtApellido.value.trim(),
    correo: txtCorreo.value.trim(),
    carrera: txtCarrera.value.trim(),
    fecha_nacimiento: txtFechaNac.value || null
  };

  if (!estudiante.nombre || !estudiante.apellido || !estudiante.correo || !estudiante.carrera) {
    Swal.fire("Por favor, complete todos los campos", "", "warning");
    return;
  }

  if (txtId.value) {
    const { error } = await supabase
      .from("estudiantes")
      .update(estudiante)
      .eq("id", txtId.value);

    if (error) {
      console.error(error);
      Swal.fire("Error guardando estudiante", "", "error");
      return;
    }
  } else {
    const { error } = await supabase.from("estudiantes").insert(estudiante);

    if (error) {
      console.error(error);
      Swal.fire("Error guardando estudiante", "", "error");
      return;
    }
  }

  Swal.fire("Estudiante guardado exitosamente", "", "success");
  txtNombre.value = "";
  consultarEstudiantes();
};

const eliminarEstudiante = async (id) => {
  if (!confirm("¿Está seguro de eliminar este estudiante?")) return;
  const { error } = await supabase.from("estudiantes").delete().eq("id", id);

  if (error) {
    console.error(error);
    Swal.fire("Error al eliminar", "", "error");
  } else {
    consultarEstudiantes();
  }
};

const limpiarFormulario = () => {
  txtId.value = "";
  txtNombre.value = "";
  txtApellido.value = "";
  txtCorreo.value = "";
  txtCarrera.value = "";
  txtFechaNac.value = "";
  btnAdd.textContent = "Agregar";
};
