const botonFinalizar = document.querySelector("#finalizarCompra");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
  carritoContainer.innerHTML = "";
  carrito.forEach((item) => {
    carritoContainer.innerHTML += `<li><div><img src="${item.imagen}" /> ${
      item.nombre
    } x ${item.cantidad}</div> <div>$${
      item.cantidad * item.precio
    }<i class='bx bx-x' data-id='${item.id}'></i></div></li>`;
  });
  if (carrito !== []) {
    const btnEliminar = document.querySelectorAll(".bx-x");
    btnEliminar.forEach((btn) => {
      btn.onclick = (e) => {
        const productoId = e.target.getAttribute("data-id");
        carrito = carrito.filter((prod) => prod.id != productoId);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        imprimirCarrito();
      };
    });
  }
  crearTotal();
}
function crearTotal() {
  sumatotal = 0;
  carrito.forEach((producto) => {
    sumatotal += producto.precio * producto.cantidad;
  });
  const total = document.querySelector("#total");

  sumatotal !== 0 ? carritoLleno() : carritoVacio();
}

mostrarCarrito();

function carritoLleno() {
  total.innerHTML = `<span>El total es de $${sumatotal}</span>`;
  botonFinalizar.style.display = "block";
}

function carritoVacio() {
  total.innerHTML = `El carrito esta vacio`;
  botonFinalizar.style.display = "none";
}

function finalizarCompra() {
  swal(
    "Compra realizada con exito",
    "Recibirá los datos de la compra por mail",
    "success"
  );
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
  mostrarCarrito();
  carritoVacio();
}

botonFinalizar.addEventListener("click", finalizarCompra);
