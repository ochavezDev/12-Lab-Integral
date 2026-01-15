/*
HU-04: Registrar un préstamo
Como bibliotecario, quiero registrar un préstamo para controlar los libros fuera.

Criterios de aceptación:
✅ En prestamos.html, el <select> muestra solo libros disponibles.
✅ Se debe ingresar el nombre de la persona.
✅ Se registra la fecha del préstamo.
✅ El estado del libro cambia a prestado.
✅ El nuevo Prestamo se guarda en localStorage.

*/

let slctLibro = document.querySelector("#selectLibro");
let inptPersona = document.querySelector("#personaPrestamo");

let btnPrestar = document.querySelector("#btnPrestar");

let librosDisponibles = JSON.parse(localStorage.getItem("librosDisponibles")) || [];
let librosPrestados = JSON.parse(localStorage.getItem("librosPrestados")) || [];

function mostrarLibrosDisponibles() {
   slctLibro.innerHTML = "";

   let librosDisponiblesFiltrado = librosDisponibles.filter(elmt => elmt.estado === "disponible")

   librosDisponiblesFiltrado.forEach(elmt => {
      slctLibro.innerHTML += `
         <option value="${elmt.titulo}">${elmt.titulo}</option>
      `
   })
}

btnPrestar.addEventListener("click", () => {
   /*
      1. Obtener los datos del formulario
      2. Mostrar una alerta "Pretamo exitoso"
      3. Cambiar el estado del localStorage
   */
   let libroSeleccionado = slctLibro.value;
   let personaAdquiere = inptPersona.value.trim();

   // alert("Préstamo exitoso");

   // Cambiar el estado del libro a "prestado
   
   let indxLibroLocalStorage= librosDisponibles.findIndex( elemnt => elemnt.titulo === libroSeleccionado)

   /*
      {
      autor     :       "Mario Vargas Llosa"
      estado     :       "disponible"
      isbn      :       "123456789"
      titulo      :       "La ciudad y los Perros"
      }
   */

   librosDisponibles[indxLibroLocalStorage].estado = "prestado";

   localStorage.setItem("librosDisponibles", JSON.stringify(librosDisponibles));

   mostrarLibrosDisponibles();

   inptPersona.value = "";

   /* Logica para guardar en el localStorgare lo libros Prestado */
   let libroPrestado = {
      titulo: libroSeleccionado,
      persona: personaAdquiere,
      fechaPrestamo: new Date().toLocaleDateString()
   }

   librosPrestados.push(libroPrestado);

   localStorage.setItem("librosPrestados", JSON.stringify(librosPrestados));

   alert("Prestamo exitoso")

})

mostrarLibrosDisponibles();