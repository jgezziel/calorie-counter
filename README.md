# Calorie-Counter

Ejemplo de un contador de calorias.

Un pequeño proyecto que permite calcular las calorias de alimentos y ejercicios de acuerdo a la información que se ingrese.

Este proyecto permite lo siguiente:

- **Agregar** información de la actividad seleccionando una categoria _(alimentación o ejercicio)_.
- **Editar** la información de forma individual de cada actividad.
- **Eliminar** de forma individual las actividades.
- **Reiniciar** los datos de la app.
- Se muestra la sumatoria de cada categoria al igual que la diferencia del total de ambos.
- Los datos se guardan en el _localstorage_ en caso de recargar el navegador.

\*Existen algunas ventanas de aviso y/o confirmación con información extra.

## Información tecnica

Las tecnologias y herramientas usadas en el proyecto son las siguientes:

- **React**
  - useEffect
  - useReducer
  - useMemo
- **Typescript**
- **Tailwind CSS**
  - Responsive Design
  - Interface inspired by Material Design
- **Vite**
- **NPM extra dependencies**
  - @heroicons/react
  - uuid
