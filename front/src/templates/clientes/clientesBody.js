//import clientesPedidosModal
import { clientesPedidosModal } from './clientesPedido';
//front\src\templates\clientes\clientesPedido.js

export function showAddClientForm() {
    document.getElementById('addClientForm').classList.toggle('d-none');
}

export function addClient(event) {
    event.preventDefault();
    //nombre, apellido, direccion, dni, telefino, barrio, tipodoc
    //[data.nombre, data.apellido, data.direccion, data.DNI, data.telefono, data.idbarrio, data.idtipodoc]
    const data = {
        Nombre: document.getElementById('nombreCliente').value,
        Apellido: document.getElementById('apellidoCliente').value,
        Direccion: document.getElementById('direccionCliente').value,
        DNI: document.getElementById('DNICliente').value,
        Telefono: document.getElementById('telefonoCliente').value,
        IdBarrio: document.getElementById('IdBarrio').value,
        IdTipoDoc: document.getElementById('IdTipoDoc').value
    }
    console.log(data);
    try {
        fetch('http://localhost:4000/clientes/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Especifica que los datos se envían en formato JSON
            },
            body: JSON.stringify(data) // Convierte los datos a JSON para enviarlos
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
                getClientes();
                return response.json(); // Convertir la respuesta a JSON
            })
            .then(data => {
                console.log('Cliente agregado con éxito:', data); // Maneja la respuesta exitosa del servidor
            })
            .catch(error => {
                console.error('Error al agregar cliente:', error); // Maneja los errores
            });
           
    } catch (error) {
        console.error('Error al obtener los clientes:', error);  // Mostrar el error en la consola
    }
    event.target.reset();
    
}

export function deleteClient(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}


export async function getClienteById(IdCliente) {
    try {
        const response = await fetch(`http://localhost:4000/clientes/get/${IdCliente}`); 
        if (!response.ok) {
            throw new Error('Error al obtener los barrios');  
        }
        const datos = await response.json();  // Parsear la respuesta como JSON
        console.log(datos);  // Ver los datos en la consola
        
        cargarModalCliente(datos);  // Llamar a la función para mostrar los clientes en la tabla
    } catch (error) {
        console.error('Error al obtener los clientes:', error);  // Mostrar el error en la consola
    }
}



export async function getBarrios() {
    try {
        const response = await fetch('http://localhost:4000/utils/barrios'); 
        if (!response.ok) {
            throw new Error('Error al obtener los barrios');  
        }
        const datos = await response.json();  // Parsear la respuesta como JSON
        console.log(datos);  // Ver los datos en la consola
        cargarCombo(datos,'IdBarrio','IdBarrio','Nombre');  // Llamar a la función para mostrar los clientes en la tabla
    } catch (error) {
        console.error('Error al obtener los clientes:', error);  // Mostrar el error en la consola
    }
}
export async function getTipoDoc() {
    try {
        const response = await fetch('http://localhost:4000/utils/tipodoc'); 
        if (!response.ok) {
            throw new Error('Error al obtener los tipos de documentos');  
        }
        const datos = await response.json();
        console.log(datos);  
        cargarCombo(datos,'IdTipoDoc','IdTipoDoc','Nombre');  
    } catch (error) {
        console.error('Error al obtener los tipos de documento:', error); 
    }
  }

export async function getClientes() {
  try {
      const response = await fetch('http://localhost:4000/clientes/get'); 
      if (!response.ok) {
          throw new Error('Error al obtener los clientes'); 
      }
      const datos = await response.json();  
      cargarClientes(datos); 
  } catch (error) {
      console.error('Error al obtener los clientes:', error);  
  }
}

function cargarClientes(datos) {
    //nombre, appelido, cuenta, barrio, direccion
    const clientTableBody = document.getElementById('clientTableBody');
    clientTableBody.innerHTML = '';
    datos.forEach(data => {
        const newRow = document.createElement('li');
        newRow.classList.add('table-row');
        newRow.innerHTML = `
        <div class="col col-1 text-start" data-label="Nombre">${data.Nombre}</div>
        <div class="col col-2 text-start" data-label="Apellido">${data.Apellido}</div>
        <div class="col col-3 text-start" data-label="Cuenta">${data.IdCliente}</div>
        <div class="col col-4 text-start" data-label="Barrio">${data.NombreBarrio}</div>
        <div class="col col-5 text-start" data-label="Direccion">${data.Direccion}</div>
        <div class="col col-6 text-center" data-label="Cuenta corriente"><a href="" class="col col-5 botoncito">Ver</a></div>
        <button type="button" class="btn generar-btn mt-4" data-modal-ref="Generar">Modificar</button>
    `;
        clientTableBody.appendChild(newRow);
        
    });
    const modificarButton = newRow.querySelector('.generar-btn');
    modificarButton.addEventListener('click', function() {
        clientesPedidosModal();
        
    });



}

function cargarModalCliente(data) {
    //nombre, appelido, cuenta, barrio, direccion
    //const clientTableBody = document.getElementById('clientTableBody');
    //cargarCombo(datos,'IdBarrio','IdBarrio','Nombre');
    //cargarCombo(datos,'IdTipoDoc','IdTipoDoc','Nombre');  
    getBarrios();
    getTipoDoc();


    let Nombre = document.getElementById('modNombreCliente');
    let Apellido = document.getElementById('modApellidoCliente');
    let Direccion = document.getElementById('modDireccionCliente');
    let DNI = document.getElementById('DNICliente');
    let Telefono = document.getElementById('modTelefonoCliente');
    let IdBarrio = document.getElementById('IdBarrio');
    let IdTipoDoc = document.getElementById('IdTipoDoc');
    
    Nombre.value = data.Nombre;
    Apellido.value = data.Apellido;
    Direccion.value = data.Direccion;
    DNI.value = data.DNI;
    Telefono.value = data.Telefono;
    IdBarrio.value = data.IdBarrio;
    IdTipoDoc.value = data.IdTipoDoc;
    
    //document.getElementById('addClientForm').classList.add('d-none');
    
}

function cargarCombo(datos, idElemento, campoId, campoNombre) {
    const comboSelect = document.getElementById(idElemento);
    datos.forEach(data => {
        const newOption = document.createElement('option');
        newOption.value = data[campoId];  
        newOption.textContent = data[campoNombre];
        comboSelect.appendChild(newOption);
    });
}

//idTipoDocumento