// src/courseService.js

// Importamos el cliente de Supabase ya configurado
import { supabase } from "./supabaseClient";


/*
  ------------------------------------------------------------
  Nombre de la tabla y columnas
  ------------------------------------------------------------
*/
const TABLA_NOMBRE = "cursos";
const COLUMNAS_MOSTRAR = "id, nombre, codigo, creditos";

/*
  ------------------------------------------------------------
  mapCursoPayload
  ------------------------------------------------------------
  Recibe un objeto curso y devuelve solo los campos
  necesarios para la base de datos, con limpieza de valores.
*/
const mapCursoPayload = (curso) => ({
  nombre: curso.nombre?.trim() || "",
  codigo: curso.codigo?.trim() || "",
  creditos: parseInt(curso.creditos) || 0,
});

/*
  ------------------------------------------------------------
  Obtener cursos
  ------------------------------------------------------------
  Permite obtener todos los cursos.
  Parámetro opcional:
  - search: texto para filtrar por nombre o código
*/
export const obtenerCursos = async (search = "") => {
  // Creamos la consulta base
  let query = supabase
    .from(TABLA_NOMBRE)
    .select(COLUMNAS_MOSTRAR)
    .order("id", { ascending: true });

  const term = search.trim();

  // Si hay texto, aplicamos filtro por nombre o código
  if (term) {
    query = query.or(`nombre.ilike.%${term}%,codigo.ilike.%${term}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al cargar cursos:", error);
    throw new Error("No se pudieron cargar los cursos");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Crear curso
  ------------------------------------------------------------
  Inserta un nuevo registro en la base de datos
*/
export const crearCurso = async (curso) => {
  const payload = mapCursoPayload(curso);

  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .insert([payload])
    .select(COLUMNAS_MOSTRAR)
    .single();

  if (error) {
    console.error("Error al crear curso:", error);
    throw new Error("No se pudo crear el curso");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Actualizar curso
  ------------------------------------------------------------
  Actualiza un registro existente por ID
*/
export const actualizarCurso = async (id, curso) => {
  const payload = mapCursoPayload(curso);

  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .update(payload)
    .eq("id", id)
    .select(COLUMNAS_MOSTRAR)
    .single();

  if (error) {
    console.error("Error al actualizar curso:", error);
    throw new Error("No se pudo actualizar el curso");
  }

  return data;
};

/*
  ------------------------------------------------------------
  Eliminar curso
  ------------------------------------------------------------
  Elimina un registro por ID
*/
export const eliminarCurso = async (id) => {
  const { error } = await supabase
    .from(TABLA_NOMBRE)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar curso:", error);
    throw new Error("No se pudo eliminar el curso");
  }

  return true;
};

/*
  ------------------------------------------------------------
  Guardar curso (create o update)
  ------------------------------------------------------------
  Esta función decide automáticamente si:
  - Crear (si no tiene id)
  - Actualizar (si ya tiene id)

  Esto simplifica el código en React
*/
export const guardarCurso = async (curso) => {
  if (curso.id) {
    return await actualizarCurso(curso.id, curso);
  }

  return await crearCurso(curso);
};