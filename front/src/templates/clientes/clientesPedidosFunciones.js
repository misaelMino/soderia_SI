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
  
  function calcularTotal() {
    let total = 0;
    document.querySelectorAll('.subtotal').forEach(function(subtotalElement) {
      total += parseFloat(subtotalElement.innerText) || 0;
    });
    document.getElementById('modTotalPedido').innerText = total.toFixed(2);
  }
  