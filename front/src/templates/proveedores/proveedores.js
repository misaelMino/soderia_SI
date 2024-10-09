export function showAddProvForm() {
    document.getElementById('addProvForm').classList.toggle('d-none');
}

export function addProv(event) {
    event.preventDefault();
    const provTableBody = document.getElementById('provTableBody');

    const provNombre = document.getElementById('provNombre').value;
    const provDireccion = document.getElementById('provDireccion').value;
    const provRazonSoc = document.getElementById('provRazonSoc').value;
    const provCUITCUIL = document.getElementById('provCUITCUIL').value;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${provRazonSoc}</td>
        <td>${Math.floor(Math.random() * 1000)}</td>
        <td>${provNombre}</td>
        <td>${provCUITCUIL}</td>
        <td>${provDireccion}</td>
        <td><button class="btn acciones-btns mb-3" onclick="deleteProv(this)">Ver más</button></td>
    `;

    provTableBody.appendChild(newRow);

    document.getElementById('addProvForm').classList.add('d-none');
    event.target.reset();
}

export function deleteProv(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}
