export async function loadScript(content, ref, callback) {
    try {
        const response2 = await fetch(`./src/templates/${ref}/${ref}.html`);
        const html = await response2.text();
        content.innerHTML = html;
        listenerBusquedaCliente();
        // Ejecutar el callback después de que el contenido se ha cargado
        if (callback && typeof callback === 'function') {
            callback();
        }
    } catch (error) {
        console.error(`Error cargando el HTML de ${ref}: ${error}`);
    }
}

export async function loadScriptDrop(content, folder, ref, callback) {
    try {
        const response2 = await fetch(`./src/templates/${folder}/${ref}.html`);
        const html = await response2.text();
        content.innerHTML = html;
        listenerBusquedaCliente();
        // Ejecutar el callback después de que el contenido se ha cargado
        if (callback && typeof callback === 'function') {
            callback();
        }
    } catch (error) {
        console.error(`Error cargando el HTML de ${ref}: ${error}`);
    }
}

function listenerBusquedaCliente(){
    // Habilitar o deshabilitar inputs según el estado del checkbox
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const inputId = this.id.replace('check', 'input');
            const inputField = document.getElementById(inputId);
            inputField.disabled = !this.checked;
            if (!this.checked) inputField.value = ''; // Limpiar input si se desactiva
        });
    });
  
    // Capturar filtros y enviarlos en el GET de la API
    document.getElementById('btnBuscar').addEventListener('click', () => {
        let queryParams = [];
  
        if (document.getElementById('checkNombre').checked) {
            queryParams.push(`nombre=${encodeURIComponent(document.getElementById('inputNombre').value)}`);
        }
        if (document.getElementById('checkApellido').checked) {
            queryParams.push(`apellido=${encodeURIComponent(document.getElementById('inputApellido').value)}`);
        }
        if (document.getElementById('checkDireccion').checked) {
            queryParams.push(`direccion=${encodeURIComponent(document.getElementById('inputDireccion').value)}`);
        }
        if (document.getElementById('checkBarrio').checked) {
            queryParams.push(`barrio=${encodeURIComponent(document.getElementById('inputBarrio').value)}`);
        }
        if (document.getElementById('checkCuenta').checked) {
            queryParams.push(`cuenta=${encodeURIComponent(document.getElementById('inputCuenta').value)}`);
        }
  
        const queryString = queryParams.join('&');
        const apiUrl = `https://tu-api.com/endpoint?${queryString}`;
  
        console.log('URL de la API:', apiUrl);
        // Aquí podrías usar fetch o axios para hacer la petición a la API
        /*
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        */
    });
  }
