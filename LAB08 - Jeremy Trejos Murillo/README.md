# Lab08 – Refactorización con React Router

Laboratorio final integrador — Jeremy Trejos Murillo

## Tecnologías
- React 19
- React Router DOM 7
- Supabase
- Vite

## Estructura del proyecto

```
src/
├── components/
│   ├── StudentForm.jsx     ← Formulario reutilizable de estudiante
│   ├── StudentTable.jsx    ← Tabla con acciones de editar/eliminar
│   └── SearchBar.jsx       ← Buscador con botones de búsqueda/limpiar
├── pages/
│   ├── StudentListPage.jsx ← Ruta /  (listado + búsqueda + eliminar)
│   └── StudentFormPage.jsx ← Ruta /nuevo y /editar/:id
├── services/
│   └── estudianteService.js ← Operaciones con Supabase
├── supabaseClient.js
├── App.jsx                 ← Configuración de rutas
└── main.jsx
```

## Rutas
| Ruta | Descripción |
|------|-------------|
| `/` | Listado de estudiantes |
| `/nuevo` | Formulario para agregar |
| `/editar/:id` | Formulario para editar |

## Instalación

```bash
npm install
npm run dev
```

Asegúrate de tener configurado el archivo `.env` con tus credenciales de Supabase:

```
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_clave
```
