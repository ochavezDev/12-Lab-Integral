/* 01. Capturar los elementos y crear variables */

let inptTituloLibro = document.querySelector("#tituloLibro");
let inptAutorLibro = document.querySelector("#autorLibro");
let inptIsbnLibro = document.querySelector("#isbnLibro");
let btnAgregarLibro = document.querySelector("#btnAgregarLibro");

let librosDisponibles =
  JSON.parse(localStorage.getItem("librosDisponibles")) || [];

/* 02. Manipulacion de Eventos */

btnAgregarLibro.addEventListener("click", agregarLibro);


/* 03. Funciones */
function agregarLibro(){

  let titulo = inptTituloLibro.value.trim();
  let autor = inptAutorLibro.value.trim();
  let isbn = inptIsbnLibro.value.trim();

  if (titulo == "" || autor == "" || isbn == "") {
    alert("Por favor complete todos los campos");
    return;
  }

  let nuevoLibro = {
    isbn,
    titulo,
    autor,
    estado: "disponible",
  };

  librosDisponibles.push(nuevoLibro);

  // Guardar en el localStorage

  localStorage.setItem("librosDisponibles", JSON.stringify(librosDisponibles));

  alert("Registro completado con exito");

  inptTituloLibro.value.trim();
  inptAutorLibro.value.trim();
  inptIsbnLibro.value.trim();
}