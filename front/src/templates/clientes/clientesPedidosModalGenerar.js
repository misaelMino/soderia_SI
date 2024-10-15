document.getElementById('generarPedidoBtn').addEventListener('click', function() {
    // Aquí iría la lógica para guardar el pedido
    alert('Cliente modificado');
  });
  
  function agregarFilaPedido() {
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
  
  function calcularSubtotal(elemento) {
    const fila = elemento.closest('tr');
    const cantidad = fila.querySelector('input[name="cantidad"]').value;
    const precioUnitario = fila.querySelector('input[name="precioUnitario"]').value;
    const subtotal = cantidad * precioUnitario;
  
    fila.querySelector('.subtotal').innerText = subtotal.toFixed(2);
    calcularTotal();
  }
  
  function calcularTotal() {
    let total = 0;
    document.querySelectorAll('.subtotal').forEach(function(subtotalElement) {
      total += parseFloat(subtotalElement.innerText) || 0;
    });
    document.getElementById('totalPedido').innerText = total.toFixed(2);
  }
  
  function eliminarFila(button) {
    const fila = button.closest('tr');
    fila.remove();
    calcularTotal();
  }
  