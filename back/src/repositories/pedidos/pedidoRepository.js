const database = require("../../config/database");



const addPedido = async (data, detallePedido) => {
    const connection = await database.getConnection();

    try {
        // Iniciar la transacción
        await connection.beginTransaction();

        // Insertar el pedido en la tabla 'Pedido'
        const result = await connection.query(
            `INSERT INTO Pedido (descripcion, fechapedido, idmediodepago, idcondicionpago, idestadopedido, idcliente)
            VALUES (?, curdate(), ?, ?, ?, ?);`,
            [data.descripcion, data.idmediodepago, data.idcondicionpago, data.idestadopedido, data.idcliente]
        );

        const [prueba] = result;
        const pedidoId = prueba.insertId;  //la funcion insertID nos da el valor del ultimo PK insertado, en este caso IdPedido
        console.log(pedidoId);
        // Iterar sobre los productos y agregarlos a la tabla 'ProductoxPedido'
        const productoQueries = detallePedido.map((producto) => {
            return connection.query(
                `INSERT INTO ProductoxPedido (IdPedido, IdProducto, cantidadPedido)
                VALUES (?, ?, ?);`,
                [pedidoId, producto.idProducto, producto.cantidadPedido]
            );
        });

        console.log(productoQueries);

        // Ejecutar todas las inserciones de productos en paralelo
        await Promise.all(productoQueries);

        // Confirmar la transacción
        await connection.commit();

        console.log("Pedido y productos agregados correctamente");
    } catch (error) {
        // Si hay algún error, se revierte la transacción
        await connection.rollback();
        console.error("Error al agregar el pedido:", error);
        throw error;
    }
};


const updatePedido = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(
        `UPDATE cliente 
        SET Nombre = ?, Apellido = ?, Direccion = ?, DNI = ?, Telefono = ?, IdBarrio = ?, IdTipoDoc = ?
        WHERE IdCliente = 1;`,
        [data.Nombre, data.Apellido, data.Direccion, data.DNI, data.Telefono, data.IdBarrio, data.IdTipoDoc]
    );
};

const deletePedido = async (data) =>{




};







module.exports = {
    addPedido,
    updatePedido,
    deletePedido
}