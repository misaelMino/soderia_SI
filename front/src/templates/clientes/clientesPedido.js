
export function clientesPedidosModal() {
    document.querySelectorAll('[data-modal-ref]').forEach(button => {
        button.addEventListener('click', async function () {
            const ref = this.getAttribute('data-modal-ref'); // Obtener el valor de data-modal-ref
            
            try {
                // Espera a que el contenido HTML se cargue con fetch
                const response = await fetch(`./src/templates/clientes/clientesPedidosModal${ref}.html`);
                const html = await response.text();

                // Insertar el contenido del modal en el cuerpo del documento
                document.body.insertAdjacentHTML('beforeend', html);

                // Espera a que el DOM inserte el modal y luego inicializa Bootstrap modal
                const modalElement = document.getElementById(`${ref}`);
                const modal = new bootstrap.Modal(modalElement);
                
                // Mostrar el modal solo después de que esté completamente cargado
                modal.show();
                console.log('Modal cargado y mostrado.');
                
            } catch (error) {
                console.error('Error al cargar el modal:', error);
            }
        });
    });   
}

