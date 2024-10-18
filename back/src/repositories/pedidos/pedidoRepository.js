const database = require("../../config/database");

const getAllPedidos = async () => {
    const connection = await database.getConnection();
    const [result] = await connection.query(`SELECT pe.IdPedido as NumeroPedido, concat(cl.Apellido, ', ', cl.Nombre) as Cliente, ba.Nombre as Barrio, cl.Direccion, pe.FechaPedido, ep.Nombre as EstadoPedido
    FROM cliente as cl
    JOIN pedido as pe ON cl.IdCliente = pe.IdCliente
    JOIN barrio as ba ON cl.IdBarrio = ba.IdBarrio
    JOIN estadopedido as ep ON pe.IdEstadoPedido=ep.IdEstadoPedido
    ORDER BY pe.FechaPedido, EstadoPedido, Barrio;`);
    return result;
};

const getPedidoCompletoById = async (IdPedido) => {
    const connection = await database.getConnection();
    console.debug("id pedido: " + IdPedido);
    const [resultPedido] = await connection.query(`SELECT concat(cl.Apellido, ', ', cl.Nombre) as Cliente, me.Nombre as MedioDePago
    FROM cliente as cl
    JOIN pedido as pe ON cl.IdCliente = pe.IdCliente
    JOIN mediodepago as me ON pe.IdMedioDePago = me.IdMedioDePago
    WHERE pe.IdPedido = ?;`, [IdPedido]);


    const [detallePedido] = await connection.query(`SELECT det.IdProducto, det.CantidadPedido
    FROM productoxpedido as det
    WHERE det.IdPedido = ?;`, [IdPedido]

    );

    const pedidoCompleto = {
        Pedido: resultPedido[0],
        DetallePedido: detallePedido
    };

    console.debug(pedidoCompleto);
    return pedidoCompleto;
};


const addPedido = async (data, detallePedido) => {
    const connection = await database.getConnection();

    try {
        // Iniciar la transacción
        await connection.beginTransaction();

        // Insertar el pedido en la tabla 'Pedido'
        const result = await connection.query(
            `INSERT INTO Pedido (descripcion, fechapedido, idmediodepago, idcondicionpago, idestadopedido, idcliente)
            VALUES (?, curdate(), ?, ?, ?, ?);`,
            [data.Descripcion, data.IdMedioDePago, data.IdCondicionPago, data.IdEstadoPedido, data.IdCliente]
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
            [IdPedido, arrayProductoXPedido.map(producto => producto.idProducto)]
        );
        // Iterar sobre los productos y realizar UPDATE o INSERT. Si existe updatea y si no inserta. cortina la bochina
        const productoQueries = arrayProductoXPedido.map((producto) => {
            return connection.query(
                `INSERT INTO ProductoXPedido (IdPedido, IdProducto, cantidadPedido)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE cantidadPedido = VALUES(cantidadPedido);`,
                [IdPedido, producto.idProducto, producto.cantidadPedido]
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
    deletePedido,
    getAllPedidos,
    getPedidoCompletoById
}