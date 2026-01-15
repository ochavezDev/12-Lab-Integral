/* 01. Capturar los elementos  y crear variables*/ 
let inptTituloLibro = document.querySelector("#tituloLibro");
let inptAutorLibro = document.querySelector("#autorLibro");
let inptIsbnLibro = document.querySelector("#isbnLibro");
let tbBodyLibros = document.querySelector("#tablaLibros")

let btnAgregarLibro = document.querySelector("#btnAgregarLibro");

let librosDisponibles = JSON.parse(localStorage.getItem("librosDisponibles")) || [];
/* 02. Manipulacion de Eventos */

btnAgregarLibro.addEventListener("click", agregarLibro )

/* 03. Funciones */
function agregarLibro() {
   let titulo = inptTituloLibro.value.trim();
   let autor = inptAutorLibro.value.trim();
   let isbn = inptIsbnLibro.value.trim();

   /* Validacion de campos obligatorios */
   if ( titulo == "" || autor == "" || isbn == "" ) {
      alert("Por favor, completa todos los campos");
      return;
   }

   let libroNuevo = {
      isbn: isbn,
      titulo: titulo,
      autor: autor,
      estado: "disponible"
   }

   librosDisponibles.push(libroNuevo);

   // Guardar en el localStorage
   localStorage.setItem("librosDisponibles", JSON.stringify(librosDisponibles));

   console.log(librosDisponibles);

   // Limpiar los campos del formulario
   inptTituloLibro.value = "";
   inptAutorLibro.value = "";
   inptIsbnLibro.value = "";

   alert("Libro agregado exitosamente")

   mostrarLibros();
}

/* Funcion para mostrar todos los libros */
function mostrarLibros(){
   // Limpiar el tbody antes de renderizar
   tbBodyLibros.innerHTML = "";

   librosDisponibles.forEach( (elemnt, index) => {
      tbBodyLibros.innerHTML += `
        <tr>
          <td class="border p-2">${elemnt.titulo}</td>
          <td class="border p-2">${elemnt.autor}</td>
          <td class="border p-2">${elemnt.isbn}</td>
          <td class="border p-2">${elemnt.estado}</td>
          <td class="border p-2">
            <button 
               class="bg-red-500 text-white px-2" 
               onclick="eliminarLibro(${index})"
            >
               Eliminar
            </button>
          </td>
        </tr>
      `
   })
}

function eliminarLibro(index){
   if (librosDisponibles[index].estado === "prestado"){
      alert("No se puede eliminar un libro prestado");
      return;
   }
   alert(`Libro con indice ${index} eliminado`)
   librosDisponibles.splice(index, 1);
   localStorage.setItem("librosDisponibles", JSON.stringify(librosDisponibles));
   mostrarLibros();
}

mostrarLibros();