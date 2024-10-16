export async function getAllPedidos() {
  try {
      const response = await fetch('http://localhost:4000/pedidos/get'); 
      if (!response.ok) {
          throw new Error('Error al obtener los clientes'); 
      }
      const datos = await response.json();  
      cargarPedidos(datos); 
  } catch (error) {
      console.error('Error al obtener los clientes:', error);  
  }
}


export async function getPedidoById() {
  try {
      const response = await fetch(`http://localhost:4000/pedidos/get/${IdPedidoo}`); 
      if (!response.ok) {
          throw new Error('Error al obtener los barrios');  
      }
      const datos = await response.json();  // Parsear la respuesta como JSON
      console.log(datos);  // Ver los datos en la consola
      
      cargarModalPedido(datos);  // Llamar a la función para mostrar los clientes en la tabla
  } catch (error) {
      console.error('Error al obtener los clientes:', error);  // Mostrar el error en la consola
  }
}


function cargarModalPedido(data) {
  const ClienteInfo = data.Pedido; // Accede a la propiedad 'Pedido'
  const DetallePedido = data.DetallePedido; // Accede a la propiedad 'DetallePedido'

  console.debug(ClienteInfo);
  console.debug(DetallePedido);

  let Cliente = document.getElementById('modificarModCliente');
  let MedioDePago = document.getElementById('modificarMedioDePago');
  
  
  //let Direccion = document.getElementById('modDireccionCliente');
  //let DNI = document.getElementById('modDNICliente');
  //let Telefono = document.getElementById('modTelefonoCliente');
  //let IdBarrio = document.getElementById('modIdBarrio');
  //let IdTipoDoc = document.getElementById('modIdTipoDoc');
  
  Cliente.textContent = ClienteInfo.Cliente;
  MedioDePago.textContent = ClienteInfo.MedioDePago;
  //Direccion.value = data[0].Direccion;
  //DNI.value = data[0].DNI;
  //Telefono.value = data[0].Telefono;
  //IdBarrio.value = data[0].IdBarrio;
  //IdTipoDoc.value = data[0].IdTipoDoc;
  
  //document.getElementById('addClientForm').classList.add('d-none');
  
}



let IdPedidoo;
export function simularPresion2(IdPedido) {
  IdPedidoo = IdPedido
  document.getElementById("prueba1234").click();
}

function cargarPedidos(datos) {
    //nombre, appelido, cuenta, barrio, direccion
    const clientTableBody = document.getElementById('tablaPedidosCargar');
    clientTableBody.innerHTML = '';
    datos.forEach(data => {
        const newRow = document.createElement('li');
        newRow.classList.add('table-row');
        newRow.innerHTML = `
        <div class="col col-1 text-start" data-label="NumeroPedido">${data.NumeroPedido}</div>
        <div class="col col-2 text-start" data-label="Cliente">${data.Cliente}</div>
        <div class="col col-3 text-start" data-label="Barrio">${data.Barrio}</div>
        <div class="col col-4 text-start" data-label="Direccion">${data.Direccion}</div>
        <div class="col col-5 text-start" data-label="FechaPedido">${data.FechaPedido}</div>
        <div class="col col-6 text-start" data-label="EstadoPedido" >${data.EstadoPedido}</div>
       <button type="button" class="btn generar-btn mt-4 col col-7" onclick="simularPresion2(${data.NumeroPedido})">Ver pedido</button>
    `;
        clientTableBody.appendChild(newRow);
        
    });
}
//data-modal-ref="Modificar"
//<button type="button" class="btn generar-btn mt-4 col col-7" onclick="simularPresion2()">Ver pedido</button>

 export async function getProductos() {
    try {
        const response = await fetch(`http://localhost:4000/utils/productos`); 
        if (!response.ok) {
            throw new Error('Error al obtener los barrios');  
        }
        const datos = await response.json();  // Parsear la respuesta como JSON
        console.log(datos);  // Ver los datos en la consola
        //cargarCombo(datos,'comboProdPedido', 'IdProducto', 'Descripcion')
        return datos;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);  // Mostrar el error en la consola
    }
}

export async function getClientesCombo() {
  try {
      const response = await fetch('http://localhost:4000/clientes/get'); 
      if (!response.ok) {
          throw new Error('Error al obtener los clientes'); 
      }
      cargaDetallePedido();

      const datos = await response.json();  
      cargarComboCliente(datos,'selectCliente','IdCliente','Nombre', 'Apellido'); 
  } catch (error) {
      console.error('Error al obtener los clientes:', error);  
  }
}

export async function getMedioPago() {
  try {
      const response = await fetch('http://localhost:4000/utils/mediodepago'); 
      if (!response.ok) {
          throw new Error('Error al obtener los clientes'); 
      }
      const datos = await response.json();  
      cargarCombo(datos,'medioDePago', 'IdMedioDePago', 'Nombre') 
  } catch (error) {
      console.error('Error al obtener los clientes:', error);  
  }
}


function cargarComboCliente(datos, idElemento, campoId, campoNombre, campoApellido) {
  const comboSelect = document.getElementById(idElemento);
  comboSelect.innerHTML = '';
  datos.forEach(data => {
      const newOption = document.createElement('option');
      newOption.value = data[campoId];  
      newOption.textContent = `${data[campoApellido]} ${data[campoNombre]}`;
      comboSelect.appendChild(newOption);
  });
}

export async function cargoDetalleModal() {
    cargaDetallePedido(); // Aquí llamas a tu función o lógica
}

async function cargaDetallePedido() {
  const productosBaseDatos = await getProductos();

  document.getElementById('agregarProductoBtn').addEventListener('click', function () {
    const tbody = document.getElementById('detallePedidoBody');

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>
        <select class="form-select selectProducto">
         <option value="" disabled selected>Seleccione producto</option>
        </select>
      </td>
      <td class="descripcionProducto">detalle</td>
      <td class="precioUnitario">0</td>
      <td>
        <input type="number" class="form-control cantidadProducto" min="1" value="1">
      </td>
      <td class="subtotal">0</td>
      <td>
        <button type="button" class="btn btn-danger btn-sm eliminarProductoBtn">Eliminar</button>
      </td>
    `;
    tbody.appendChild(newRow);
   
    
   

    function llenarComboProductos(comboElement) {
      
      //comboElement.innerHTML = ''; // Limpia las opciones anteriores, si las hay
      productosBaseDatos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.IdProducto;
        option.textContent = producto.Descripcion;
        comboElement.appendChild(option);
      });
    }



    // Lógica para actualizar descripción y precio unitario cuando se selecciona un producto
    const selectProducto = newRow.querySelector('.selectProducto');
    const cantidadInput = newRow.querySelector('.cantidadProducto');
    const precioUnitario = newRow.querySelector('.precioUnitario');
    const descripcionProducto = newRow.querySelector('.descripcionProducto');
    const subtotal = newRow.querySelector('.subtotal');


    llenarComboProductos(selectProducto);
    //llenarDescripcion();

    // Evento para actualizar el precio cuando se selecciona el producto
    selectProducto.addEventListener('change', function () {
      const productoSeleccionado = selectProducto.value; 
      precioUnitario.textContent = obtenerPrecioProducto(productoSeleccionado); 
      descripcionProducto.textContent = obtenerDescripcionProducto(productoSeleccionado);
      subtotal.textContent = calcularSubtotal(precioUnitario.textContent, cantidadInput.value);
      actualizarTotal();
    });

    // Evento para actualizar el subtotal cuando se cambia la cantidad
    cantidadInput.addEventListener('input', function () {
      subtotal.textContent = calcularSubtotal(precioUnitario.textContent, cantidadInput.value);
      actualizarTotal();
    });

    // Eliminar la fila
    newRow.querySelector('.eliminarProductoBtn').addEventListener('click', function () {
      newRow.remove();
      actualizarTotal();
    });
  });








  function calcularSubtotal(precioUnitario, cantidad) {
    return (parseFloat(precioUnitario) * parseInt(cantidad)).toFixed(2);
  }

  function actualizarTotal() {
    let total = 0;
    document.querySelectorAll('.subtotal').forEach(function (subtotalElement) {
      total += parseFloat(subtotalElement.textContent);
    });
    document.getElementById('totalPedido').textContent = total.toFixed(2);
  }

  function obtenerPrecioProducto(productoId) {
    const producto = productosBaseDatos.find(producto => producto.IdProducto === parseInt(productoId));
    if (producto) {
      return producto.Precio;
    } else {
      console.error(`Producto con Id ${productoId} no encontrado.`);
      return 0;
    }
  }

  function obtenerDescripcionProducto(productoId) {
    const producto = productosBaseDatos.find(producto => producto.IdProducto === parseInt(productoId));
    if (producto) {
      return producto.Descripcion;
    } else {
      console.error(`Producto con Id ${productoId} no encontrado.`);
      return 0;
    }
  }

}

export function addPedido() {
  const data = {
    Descripcion: "probando, todavia no agrego descripcion pq no lleeeeego",
    IdMedioDePago: parseInt(document.getElementById('medioDePago').value),  // Medio de pago seleccionado
    IdCondicionPago: 1,  //dps mejoro esto, aca es a cuantos dias el pago
    IdEstadoPedido: 1,   //estado pedido despues veo que onda, me falta una banda
    IdCliente: parseInt(document.getElementById('selectCliente').value)  // id cliente
  };

  const detallePedido = obtenerDetallePedido(); 

  // json para el put
  const pedidoJson = {
    data: data,
    detallePedido: detallePedido
  };


  console.log(pedidoJson);
  try {
    fetch('http://localhost:4000/pedidos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(pedidoJson) 
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
        getAllPedidos(); //ACA ACTUALIZO LOS PEDIDOS DE LA GRILLA
        return response.json(); 
      })
      .then(data => {
        console.log('pedido agregado con éxito:', data); 
      })
      .catch(error => {
        console.error('Error al agregar cliente:', error); 
      });

  } catch (error) {
    console.error('Errado:', error);  
  }
}

function obtenerDetallePedido() {
  const detallePedido = [];

  const filasProductos = document.querySelectorAll('#detallePedidoBody tr');

  filasProductos.forEach(fila => {
      const idProducto = fila.querySelector('.selectProducto').value;
      const cantidadPedido = fila.querySelector('.cantidadProducto').value; 

      if (idProducto && cantidadPedido > 0) {
          detallePedido.push({
              idProducto: parseInt(idProducto),
              cantidadPedido: parseInt(cantidadPedido)
          });
      }
  });

  return detallePedido;  // Retorna el array con el detalle del pedido
}


  