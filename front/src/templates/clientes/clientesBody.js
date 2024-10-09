export function showAddClientForm() {
    document.getElementById('addClientForm').classList.toggle('d-none');
}

export function addClient(event) {
    event.preventDefault();
    const clientTableBody = document.getElementById('clientTableBody');

    const name = document.getElementById('clientName').value;
    const lastName = document.getElementById('clientLastName').value;
    const address = document.getElementById('clientAddress').value;
    const clientRazonSoc = document.getElementById('clientRazonSoc').value;
    const barrio = document.getElementById('clientBarrio').value;

    const newRow = document.createElement('li');
    newRow.classList.add('table-row');

    newRow.innerHTML = `
        <div class="col col-1" data-label="Numero Cuenta">${Math.floor(Math.random() * 1000)}</div>
        <div class="col col-2" data-label="Nombre">${name}</div>
        <div class="col col-3" data-label="Apellido">${lastName}</div>
        <div class="col col-4" data-label="Razón Social">${clientRazonSoc}</div>
        <div class="col col-5" data-label="Barrio">${barrio}</div>
        <div class="col col-6" data-label="Direccion">${address}</div>
        <a href="" class="col col-7 botoncito">Ver</a>
    `;



    clientTableBody.appendChild(newRow);

    document.getElementById('addClientForm').classList.add('d-none');
    event.target.reset();
}

export function deleteClient(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}


// document.addEventListener('DOMContentLoaded', function() {
//   setTimeout(() => {
//       getClientes(); 
//   }, 500);  // Retrasar la llamada 500ms
// });




export async function getClientes() {
  try {
      const response = await fetch('http://localhost:4000/clientes');  // Hacer la solicitud al backend
      if (!response.ok) {
          throw new Error('Error al obtener los clientes');  // Manejar errores de respuesta
      }
      const datos = await response.json();  // Parsear la respuesta como JSON
      console.log(datos);  // Ver los datos en la consola
      cargarClientes(datos);  // Llamar a la función para mostrar los clientes en la tabla
  } catch (error) {
      console.error('Error al obtener los clientes:', error);  // Mostrar el error en la consola
  }
}
  
  

function cargarClientes(datos) {
    //nombre, appelido, cuenta, barrio, direccion

    const clientTableBody = document.getElementById('clientTableBody');



    datos.forEach(data => {
        const newRow = document.createElement('li');
        newRow.classList.add('table-row');

        newRow.innerHTML = `
        <div class="col col-1 text-start" data-label="Nombre">${data.Nombre}</div>
        <div class="col col-2 text-start" data-label="Apellido">${data.Apellido}</div>
        <div class="col col-3 text-start" data-label="Cuenta">${data.IdCliente}</div>
        <div class="col col-4 text-start" data-label="Barrio">${data.IdBarrio}</div>
        <div class="col col-5 text-start" data-label="Direccion">${data.Direccion}</div>
        <div class="col col-6 text-center" data-label="Cuenta corriente"><a href="" class="col col-5 botoncito">Ver</a></div>
        <div class="col col-7 text-center" data-label="Estado">-</div>
    `;

        clientTableBody.appendChild(newRow);

        document.getElementById('addClientForm').classList.add('d-none');
    });
 

}

