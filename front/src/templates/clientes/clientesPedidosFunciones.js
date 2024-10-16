 
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

  