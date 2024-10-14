export function showAddClientForm() {
    document.getElementById('addClientForm').classList.toggle('d-none');
}

export function addClient(event) {
    event.preventDefault();
    //nombre, apellido, direccion, dni, telefino, barrio, tipodoc
    const Nombre = document.getElementById('nombreCliente').value;
    const Apellido = document.getElementById('apellidoCliente').value;
    const Direccion = document.getElementById('direccionCliente').value;
    const Telefono = document.getElementById('telefonoCliente').value;
    const IdBarrio = document.getElementById('IdBarrio').value;
    const IdTipoDoc = document.getElementById('IdTipoDoc').value;
    const DNI = document.getElementById('clientBarrio').value;
   
}

export function deleteClient(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}


export async function getBarrios() {
    try {
        const response = await fetch('http://localhost:4000/utils/barrios'); 
        if (!response.ok) {
            throw new Error('Error al obtener los barrios');  
        }
        const datos = await response.json();  // Parsear la respuesta como JSON
        console.log(datos);  // Ver los datos en la consola
        cargarCombo(datos,'IdBarrio');  // Llamar a la función para mostrar los clientes en la tabla
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
        cargarCombo(datos,'IdTipoDoc');  
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

function cargarCombo(datos, idElemento){
    //<option value="apple">Apple</option>
    const comboSelect = document.getElementById(idElemento);
    datos.forEach(data => {
        const newOption = document.createElement('option');
        newOption.value = data.id; 
        newOption.textContent = data.Nombre;
        comboSelect.appendChild(newOption);
    });
}

//idTipoDocumento