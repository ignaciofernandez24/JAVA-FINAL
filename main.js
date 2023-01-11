const consultarJson = async () => {
  const response = await fetch("./productos.json");
  const productos = await response.json();
  return productos;
};

// creamos nuestros productos

const productos = consultarJson();

// creamos array

const productosContainer = document.querySelector(".productos_container");
const btnMenor = document.querySelector("#btnMenor");
const btnMayor = document.querySelector("#btnMayor");
const carritoContainer = document.querySelector("#carritoContainer");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

consultarJson().then((productos) => {
  productos.forEach((producto) => {
    productosContainer.innerHTML += `
    <div class= "producto_card" >
    <h3>${producto.nombre}...</h3>
    <img src="${producto.imagen}"/>
    
    <p class="curso_price">$${producto.precio}</p>
    <a href= "#" class= "btn-comprar" id= ${producto.id}'>comprar</a>
    </div>`;
  });
  btnComprar(productos);
});

function ordenarDeMayorAMenor() {
  productosContainer.innerHTML = "";
  consultarJson().then((productos) => {
    productos.sort(function (a, b) {
      if (a.precio < b.precio) {
        return 1;
      }
      if (a.precio > b.precio) {
        return -1;
      }
      return 0;
    });

    productos.forEach((producto) => {
      productosContainer.innerHTML += `
      <div class= "producto_card" >
      <h3>${producto.nombre}...</h3>
      <img src="${producto.imagen}"/>
      
      <p class="curso_price">$${producto.precio}</p>
      <a href= "#" class= "btn-comprar" id= ${producto.id}'>comprar</a>
      </div>`;
    });
    btnComprar(productos);
  });
}

function ordenarDeMenorAMayor() {
  productosContainer.innerHTML = "";
  consultarJson().then((productos) => {
    productos.sort(function (a, b) {
      if (a.precio > b.precio) {
        return 1;
      }
      if (a.precio < b.precio) {
        return -1;
      }
      return 0;
    });

    productos.forEach((producto) => {
      productosContainer.innerHTML += `
      <div class= "producto_card" >
      <h3>${producto.nombre}...</h3>
      <img src="${producto.imagen}"/>
      
      <p class="curso_price">$${producto.precio}</p>
      <a href= "#" class= "btn-comprar" id= ${producto.id}'>comprar</a>
      </div>`;
    });
    btnComprar(productos);
  });
}

btnMayor.addEventListener("click", ordenarDeMayorAMenor);
btnMenor.addEventListener("click", ordenarDeMenorAMayor);

// carrito de compras

function btnComprar(productos) {
  const botonesAgregar = document.querySelectorAll(".btn-comprar");

  botonesAgregar.forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      const productoSeleccionado = productos.find(
        (prod) => prod.id === parseInt(btn.id)
      );
      const productoCarrito = { ...productoSeleccionado, cantidad: 1 };
      const indexCarrito = carrito.findIndex(
        (prod) => prod.id === productoCarrito.id
      );
      if (indexCarrito === -1) {
        carrito.push(productoCarrito);
      } else {
        carrito[indexCarrito].cantidad++;
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
    };
  });
}
