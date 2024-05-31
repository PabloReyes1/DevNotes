# Notes and Task Lists Manager

Este proyecto es una aplicación web para gestionar notas y listas de tareas. La aplicación permite crear, editar y eliminar notas y listas de tareas, así como establecer recordatorios.

## Requisitos

- Node.js (versión 12 o superior)
- npm (Node Package Manager)

## Instrucciones para levantar la aplicación

Sigue estos pasos para levantar y ejecutar la aplicación en tu máquina local.

### Paso 1: Clonar el repositorio

Clona el repositorio de GitHub en tu máquina local. Abre una terminal y ejecuta el siguiente comando:

```bash
git clone <URL_DEL_REPOSITORIO>


# Paso 2: Navegar al directorio del proyecto
Cambia al directorio del proyecto clonado:

cd <NOMBRE_DEL_REPOSITORIO>

Paso 3: Instalar dependencias
Instala las dependencias del proyecto utilizando npm:

npm install


Paso 4: Ejecutar la aplicación
Una vez que se hayan instalado todas las dependencias, puedes iniciar la aplicación con el siguiente comando:

npm start

Esto abrirá la aplicación en tu navegador predeterminado en http://localhost:3000.

Estructura del Proyecto:

src/: Directorio principal del código fuente

components/: Contiene los componentes reutilizables de la aplicación
AddNoteModal.js: Componente para agregar notas y listas de tareas
EditNoteModal.js: Componente para editar notas y listas de tareas
NoteCard.js: Componente para representar una nota
TaskListCard.js: Componente para representar una lista de tareas


pages/: Contiene las páginas principales de la aplicación
NotesPage.js: Página principal para gestionar notas y listas de tareas
App.js: Componente principal de la aplicación
index.js: Punto de entrada de la aplicación
NotesPage.css: Estilos específicos para la página de notas
NoteCard.css: Estilos específicos para las tarjetas de notas y listas de tareas
EditNoteModal.css: Estilos específicos para el modal de edición


Descripción de la Funcionalidad:

Agregar Nota: Puedes agregar una nueva nota utilizando el botón "Add Note". Se abrirá un modal donde podrás ingresar el título, descripción y un recordatorio opcional.

Agregar Lista de Tareas: Puedes agregar una nueva lista de tareas utilizando el botón "Add Task List". Se abrirá un modal donde podrás ingresar el título, descripción, tareas y un recordatorio opcional.

Editar Nota/Lista de Tareas: Puedes editar una nota o lista de tareas haciendo clic en la tarjeta correspondiente. Se abrirá un modal donde podrás editar los detalles.

Eliminar Nota/Lista de Tareas: Puedes eliminar una nota o lista de tareas desde el modal de edición.

Marcar Tareas como Completadas: Puedes marcar las tareas como completadas haciendo clic en el checkbox correspondiente en la tarjeta de la lista de tareas.
