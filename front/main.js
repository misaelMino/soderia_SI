import { showAddProvForm, addProv, deleteProv } from './src/templates/proveedores/proveedores.js';
import { clientesPedidosModal } from './src/templates/clientes/clientesPedido.js';
import { cargarCombo } from './src/templates/clientes/clientesBody.js';
import { cargarProductos } from './src/templates/productos/productos.js';
import { loadScriptDrop } from './src/loadScript.js';
import { loadScript } from './src/loadScript.js';





function navigate(page) {
    let content = document.getElementById('content');

    switch (page) {
        case 'inicio':
            loadScript(content, page);
            break;
        case 'clientes':
            // Cargar el script de clientes dinámicamente cuando se navega a esta sección
            import('./src/templates/clientes/clientesBody.js').then((module) => {
                const { simularPresion, getClientes, getClienteById, updateCliente, getTipoDoc, getBarrios, showAddClientForm, addClient, deleteClient } = module;

                // Asignar funciones al ámbito global
                window.showAddClientForm = showAddClientForm;
                window.addClient = addClient;
                window.deleteClient = deleteClient;
                window.getClienteById = getClienteById;
                window.updateCliente = updateCliente;
                window.simularPresion = simularPresion;
                loadScriptDrop(content, 'clientes', page);
                getClientes();
                getBarrios("");
                getTipoDoc("");
                loadScriptDrop(content, 'clientes', page, clientesPedidosModal);
            }).catch((error) => {
                console.error('Error al cargar el módulo de clientes:', error);
            });

            break;
        case 'clientesPedidos':
                import('./src/templates/clientes/clientesPedidosFunciones.js').then((module) => {
                    const { getClientesCombo, getMedioPago, getProductos, addPedido, getAllPedidos} = module;
    
                    // Asignar funciones al ámbito global
                    window.getProductos = getProductos;
                    window.getClientesCombo = getClientesCombo;
                    window.getMedioPago = getMedioPago;
                    window.addPedido = addPedido;
                    getAllPedidos();
                    loadScriptDrop(content, 'clientes', page);


                    loadScriptDrop(content, 'clientes', page, clientesPedidosModal);
                }).catch((error) => {
                    console.error('Error al cargar el módulo de clientes:', error);
                });
            break;
        case 'cuentascorrientes':
            loadScriptDrop(content, 'clientes', page, clientesPedidosModal);
            break;
        case 'proveedores':
            loadScript(content, page);
            break;
        case 'reparto':
            loadScriptDrop(content, 'recorridos', page);
            break;
        case 'rutas':
            loadScriptDrop(content, 'recorridos', page);
            break;
        case 'productos':
            loadScript(content, page, cargarProductos);
            break;
        default:
            content.innerHTML = '<h1>Inicio</h1><p>Bienvenido a la página de inicio.</p>';
    }
}

// Añadir EventListeners al cargar el DOM
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-nav]').forEach(function (element) {
        element.addEventListener('click', function () {
            navigate(this.getAttribute('data-nav'));
        });
    });
    navigate('clientesPedidos');
});


window.showAddProvForm = showAddProvForm;
window.addProv = addProv;
window.deleteProv = deleteProv;
window.clientesPedidosModal = clientesPedidosModal;
window.cargarProductos = cargarProductos;
window.cargarCombo = cargarCombo;


