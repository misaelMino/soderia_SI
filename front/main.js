import { showAddProvForm, addProv, deleteProv } from './src/templates/proveedores/proveedores.js';
import { clientesPedidosModal } from './src/templates/clientes/clientesPedido.js';
import { habilitarEdicion, guardarPedido, eliminarFila } from './src/templates/clientes/clientesPedidosFunciones.js';
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
                const { getClientes, showAddClientForm, addClient, deleteClient } = module;

                // Asignar funciones al ámbito global
                window.showAddClientForm = showAddClientForm;
                window.addClient = addClient;
                window.deleteClient = deleteClient;
                loadScriptDrop(content, 'clientes', page);
                getClientes();
            }).catch((error) => {
                console.error('Error al cargar el módulo de clientes:', error);
            });
            break;
        case 'clientesPedidos':
            loadScriptDrop(content, 'clientes', page, clientesPedidosModal);
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
    navigate('clientes');
});


window.showAddProvForm = showAddProvForm;
window.addProv = addProv;
window.deleteProv = deleteProv;
window.clientesPedidosModal = clientesPedidosModal;
window.cargarProductos = cargarProductos;
window.habilitarEdicion = habilitarEdicion;
window.eliminarFila = eliminarFila;

