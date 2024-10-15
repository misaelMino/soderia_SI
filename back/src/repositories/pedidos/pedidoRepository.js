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
//DELETE ProductosXPedidos
//WHERE IdPedido=?;

const updatePedido = async (detallePedido) => {
    const connection = await database.getConnection();
    const IdPedido = detallePedido.IdPedido;
    const arrayProductoXPedido = detallePedido.producto;
    console.log(arrayProductoXPedido);

    try {
        await connection.beginTransaction();
        
        // Elimino los productos que no estan en la actualizacion
        await connection.query(
            `DELETE FROM ProductoXPedido
            WHERE IdPedido = ?
            AND IdProducto NOT IN (?);`,
            [IdPedido, arrayProductoXPedido.map(producto => producto.IdProducto)]
        );
        // Iterar sobre los productos y realizar UPDATE o INSERT. Si existe updatea y si no inserta. cortina la bochina
        const productoQueries = arrayProductoXPedido.map((producto) => {
            return connection.query(
                `INSERT INTO ProductoXPedido (IdPedido, IdProducto, cantidadPedido)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE cantidadPedido = VALUES(cantidadPedido);`,
                [IdPedido, producto.IdProducto, producto.cantidadPedido]
            );
        });
        await Promise.all(productoQueries);
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error; 
    }
};


const deletePedido = async (data) => {
//baja logica del sistema, no lo muestro mais

};







module.exports = {
    addPedido,
    updatePedido,
    deletePedido
}