export function clientesPedidosModal() {
    document.querySelectorAll('[data-modal-ref]').forEach(button => {
        button.addEventListener('click', function () {
            const ref = this.getAttribute('data-modal-ref');  // Obtener el valor de data-modal-ref
            fetch(`./src/templates/clientes/clientesPedidosModal${ref}.html`)
            //../src/templates/clientes/clientesPedidosModal${ref}.html
                .then(response => response.text())
                .then(html => {
                    // Insertar el contenido del modal en el cuerpo del documento
                    document.body.insertAdjacentHTML('beforeend', html);

                    // Inicializar el modal de Bootstrap
                    var modalElement = document.getElementById('pedidoModal');
                    var modal = new bootstrap.Modal(modalElement);
                    modal.show();
                })
                .catch(error => {
                    console.error('Error al cargar el modal:', error);
                });
        });
    });

   
}


