// src/services/estudianteService.js
import { supabase } from "../supabaseClient";

const TABLA_NOMBRE = "estudiantes";
// Línea COLUMNAS_MOSTRAR
const COLUMNAS_MOSTRAR = "id, nombre, apellido, correo, carrera, fecha_nacimiento";

// Función mapEstudiantePayload
const mapEstudiantePayload = (estudiante) => ({
  nombre: estudiante.nombre?.trim() || "",
  apellido: estudiante.apellido?.trim() || "",
  correo: estudiante.correo?.trim() || "",
  carrera: estudiante.carrera?.trim() || "",
  fecha_nacimiento: estudiante.fechaNac?.trim() || null, 
});

export const obtenerEstudiantes = async (search = "") => {
  let query = supabase
    .from(TABLA_NOMBRE)
    .select(COLUMNAS_MOSTRAR)
    .order("id", { ascending: true });

  const term = search.trim();
  if (term) {
    query = query.or(`nombre.ilike.%${term}%,apellido.ilike.%${term}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al cargar estudiantes:", error);
    throw new Error("No se pudieron cargar los estudiantes");
  }

  return data;
};

export const obtenerEstudiantePorId = async (id) => {
  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .select(COLUMNAS_MOSTRAR)
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error al obtener estudiante:", error);
    throw new Error("No se pudo obtener el estudiante");
  }

  return data;
};

export const crearEstudiante = async (estudiante) => {
  const payload = mapEstudiantePayload(estudiante);

  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .insert([payload])
    .select(COLUMNAS_MOSTRAR)
    .single();

  if (error) {
    console.error("Error al crear estudiante:", error);
    throw new Error("No se pudo crear el estudiante");
  }

  return data;
};

export const actualizarEstudiante = async (id, estudiante) => {
  const payload = mapEstudiantePayload(estudiante);

  const { data, error } = await supabase
    .from(TABLA_NOMBRE)
    .update(payload)
    .eq("id", id)
    .select(COLUMNAS_MOSTRAR)
    .single();

  if (error) {
    console.error("Error al actualizar estudiante:", error);
    throw new Error("No se pudo actualizar el estudiante");
  }

  return data;
};

export const eliminarEstudiante = async (id) => {
  const { error } = await supabase
    .from(TABLA_NOMBRE)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar estudiante:", error);
    throw new Error("No se pudo eliminar el estudiante");
  }

  return true;
};

export const guardarEstudiante = async (estudiante) => {
  if (estudiante.id) {
    return await actualizarEstudiante(estudiante.id, estudiante);
  }
  return await crearEstudiante(estudiante);
};
