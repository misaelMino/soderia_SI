const productos = [
    { codigo: 'SIFPLASTICO1_5L',descripcion: 'Sifón de soda 1.5L', volumen: "1.50", stock: '325', deposito: '94', circulacion: '231', precio: '$920.73' },    
    { codigo: 'SIFPLASTICO1L', descripcion: 'Sifón de soda 1L', volumen: "1.25", stock: '210', deposito: '32', circulacion: '178', precio: '$444.98' },
    { codigo: 'SIFPLASTICO05L', descripcion: 'Sifón de soda 0.5L', volumen: "0.50", stock: '34', deposito: '0', circulacion: '34', precio: '$222.48' },
    { codigo: 'BIDPLASTICO20L', descripcion: 'Bidon de agua 20L retornable', volumen: "20.00", stock: '632', deposito: '145', circulacion: '487', precio: '$444.00' },
    { codigo: 'BIDPLASTICO10L', descripcion: 'Bidon de agua 10L retornable', volumen: "10.00", stock: '412', deposito: '89', circulacion: '323', precio: '$444.42' },
];

export function cargarProductos() {
    const productosBody = document.getElementById('productosBody');
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.descripcion}</td>
            <td class="text-end">${producto.volumen}</td>
            <td class="text-center">${producto.stock}</td>
            <td class="text-center">${producto.deposito}</td>
            <td class="text-center">${producto.circulacion}</td>
            <td class="text-end">${producto.precio}</td>
            <td class="text-center">
                <button class="btn btn-warning btn-sm">Modificar</button>
                <button class="btn btn-warning btn-sm">Copiar</button>
            </td>
        `;
        productosBody.appendChild(fila);
    });
}


//window.onload = cargarProductos;
