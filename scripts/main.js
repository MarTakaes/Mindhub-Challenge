function detectarCinco(array) {
  array.forEach((element) => {
    if (element.stock <= 5) {
      console.log(element.nombre);
    }
  });
}

function filtrarElementos(lista) {
  let tipo = document.title.includes("Juguetes") ? "Juguete" : "Medicamento";
  lista.forEach((element) => {
    if (tipo === element.tipo) {
      renderizarCartas(element);
      console.log("primer if");
    }
  });
}

function renderizarCartas(element) {
  if (
    document.title == "Pet-Shop Franco | Farmacia" ||
    document.title == "Pet-Shop Franco | Juguetes"
  ) {
    //   let li = document.createElement('li')
    //   li.innerHTML = `1`

    //   let cantidadDeLi = ``
    let articulosBox = document.querySelector(".articulos_box");
    articulosBox.innerHTML += `<div class="card m-2 shadow p-3 mb-5 bg-body rounded col-sm-6 col-md-4 col-lg-3 col-xl-3.2 col-xxl-2">
                  <img src="${
                    element.imagen
                  }" class="card-img-top img-thumbnail" style="max-height:15rem; object-fit: scale-down;" alt="${
      element.nombre
    }">
                  <div class="card-body d-flex flex-column justify-content-between get-title">
                      <div class="d-flex flex-column justify-content-evenly">
                      <h5 class="card-title">${element.nombre}</h5>
                      <p class="card-text">${element.descripcion}</p>
                      </div>
                      <div class="d-flex flex-column justify-content-end">
                      <p class="card-text luchp">Precio: $${element.precio}</p>
                      
                      <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Cantidad
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            GENERAR LI
                        </ul>
                    </div>

                      <p class="text-danger text-center"> ${
                        element.stock <= 5 ? "ÚLTIMAS UNIDADES!!!" : ""
                      } </p>
                      <a href="#" class="btnadd btn addToCart" >Añadir al carrito</a>
                      </div>
                  </div>
                  </div>`;
  }
}

function renderizarCarro(carro) {
  let carritoBox = document.querySelector(".carrito-box");
  carro.length == 0
    ? (carritoBox.innerHTML = `<p>No hay artículos que mostrar</p>`)
    : (carritoBox.innerHTML = ``);
  carro.forEach((e) => {
    carritoBox.innerHTML += `
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${e.imagen}" class="img-fluid rounded-start" alt="${e.nombre}">
          </div>
          <div class="col-md-7">
            <div class="card-body">
            
              <h5 class="card-title">${e.nombre}</h5>
              <p class="card-text">$${e.precio}</p>
              <p class="card-text"><small class="text-muted">cantidad seleccionada</small></p>
            </div>
          </div>
          <div class="col-1 d-flex justify-content-end pt-2 pe-3" >
            <span type="button" style="width:2px; height:2px" class="btn-close delete-element"></span>
          </div>
        </div>
    </div> `;
  });
}

function deleteFromList(lista, name, evento) {
  console.log("dentro de la funcion deleteFromList");
  let index;
  lista.forEach((e) => {
    if (e.nombre === name) {
      console.log("el elemento a borrar es" + name);
      index = lista.indexOf(e);
      console.log("el index es" + index);
    }
  });
  console.log(
    "se elimina el objeto con nombre" +
      name +
      "e index " +
      index +
      "de la lista " +
      lista
  );
  lista.splice(index, 1);
  evento.target.parentElement.parentElement.parentElement.remove();
}

// genera una nueva lista, y la idea es eliminar de la lista ya existente
function deleteFromListConFilter(lista, nombre) {
  let nuevaLista = lista.filter((e) => {
    return e.nombre != nombre;
  });
  return nuevaLista;
}

let carro = [];

function agregarAlCarritoClicked(event) {
  const button = event.target;
  console.log("agregarAlCarritoClicked -> button", button);
}

let endpoint = `https://apipetshop.herokuapp.com/api/articulos`;

let init = {
  method: "GET",
};
let cartButton = document.querySelector(".shopping-cart");
console.log(cartButton);

fetch(endpoint, init)
  .then((res) => res.json())
  .then((data) => {
    const articulos = data.response;

    filtrarElementos(articulos);
    detectarCinco(articulos);
    let stockDisponible = []
    articulos.forEach(articulo=>{
        stockDisponible.push(articulo.stock)
    })
    console.log(stockDisponible)
    let listaRangos =[]
    
    stockDisponible.forEach(e=>{
     
        listaRangos.push([...Array(e).keys()]);
    })

    console.log(listaRangos)
    
    const agregarAlCarrito = document.querySelectorAll(".addToCart");
    let title = document.querySelectorAll(".card-title");
    agregarAlCarrito.forEach((addToCartButton) => {
      addToCartButton.addEventListener("click", (a) => {
        //   probando contador
        contador();
        let elementName =
          addToCartButton.closest(".get-title").children[0].firstElementChild
            .innerHTML;
        console.log("nombre elemento " + elementName);

        let selectedElement = articulos.filter((articulo) => {
          return articulo.nombre == elementName;
        });

        carro.push(selectedElement[0]);
        console.log(carro[0].precio);
      });
    });

    cartButton.addEventListener("click", (e) => {
      renderizarCarro(carro);
      var buttonCloseList = document.querySelectorAll(".delete-element");
      buttonCloseList.forEach((span) => {
        span.addEventListener("click", (evento) => {
          let elementoABorrar =
            span.closest(".row").children[1].children[0].firstElementChild
              .innerHTML;
          deleteFromList(carro, elementoABorrar, evento);
        });
      });
    });
  });

let abrirPopup = document.getElementById("popup");

let popUp = document.getElementById("btnAbrirPopup");
let cerrar = document.getElementById("btnCerrarPopup");


if(document.title === "Pet-Shop Franco | Contacto"){

    popUp.addEventListener("click", (e) => {
      console.log("clikea");
      abrirPopup.style.visibility = "visible";
    });
    
    cerrar.addEventListener("click", (e) => {
      abrirPopup.style.visibility = "hidden";
    });
}
