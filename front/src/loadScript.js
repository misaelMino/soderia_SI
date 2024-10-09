export async function loadScript(content, ref, callback) {
    try {
        const response2 = await fetch(`./src/templates/${ref}/${ref}.html`);
        const html = await response2.text();
        content.innerHTML = html;
        
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
        
        // Ejecutar el callback después de que el contenido se ha cargado
        if (callback && typeof callback === 'function') {
            callback();
        }
    } catch (error) {
        console.error(`Error cargando el HTML de ${ref}: ${error}`);
    }
}

