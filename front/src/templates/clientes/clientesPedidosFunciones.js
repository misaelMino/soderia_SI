export function habilitarEdicion(fila) {
    fila.querySelectorAll('input').forEach(input => {
      input.removeAttribute('readonly');
    });
  }
  
  export function guardarPedido() {
    // Lógica para guardar los cambios del pedido
    alert('Pedido modificado guardado');
  }
  
  export function eliminarFila(button) {
    const fila = button.closest('tr');
    fila.remove();
    calcularTotal(); // Asegúrate de tener una función para recalcular el total
  }

  export function calcularTotal() {
    let total = 0;
    document.querySelectorAll('.subtotal').forEach(function(subtotalElement) {
      total += parseFloat(subtotalElement.innerText) || 0;
    });
    document.getElementById('modTotalPedido').innerText = total.toFixed(2);
  }

  export function agregarFilaPedido() {
    const detallePedidoBody = document.getElementById('detallePedidoBody');
  
    const nuevaFila = document.createElement('tr');
  
    nuevaFila.innerHTML = `
      <td><input type="text" class="form-control" name="codigo"></td>
      <td><input type="text" class="form-control" name="descripcion"></td>
      <td><input type="number" class="form-control" name="cantidad" oninput="calcularSubtotal(this)"></td>
      <td><input type="number" class="form-control" name="precioUnitario" oninput="calcularSubtotal(this)"></td>
      <td class="subtotal">0</td>
      <td><button type="button" class="btn btn-danger" onclick="eliminarFila(this)">Eliminar</button></td>
    `;
  
    detallePedidoBody.appendChild(nuevaFila);
  }
  
  export function calcularSubtotal(elemento) {
    const fila = elemento.closest('tr');
    const cantidad = fila.querySelector('input[name="cantidad"]').value;
    const precioUnitario = fila.querySelector('input[name="precioUnitario"]').value;
    const subtotal = cantidad * precioUnitario;
  
    fila.querySelector('.subtotal').innerText = subtotal.toFixed(2);
    calcularTotal();
  }
  
  export async function getProductos() {
    try {
        const response = await fetch(`http://localhost:4000/utils/productos`); 
        if (!response.ok) {
            throw new Error('Error al obtener los barrios');  
        }
        const datos = await response.json();  // Parsear la respuesta como JSON
        console.log(datos);  // Ver los datos en la consola
        cargarCombo(datos,'comboProdPedido', 'IdProducto', 'Descripcion')
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


  // export function eliminarFila(button) {
  //   const fila = button.closest('tr');
  //   fila.remove();
  //   calcularTotal();
  // }
  


  // export function calcularTotal() {
  //   let total = 0;
  //   document.querySelectorAll('.subtotal').forEach(function(subtotalElement) {
  //     total += parseFloat(subtotalElement.innerText) || 0;
  //   });
  //   document.getElementById('totalPedido').innerText = total.toFixed(2);
  // }
    


  

  
  