const database = require("../../config/database");


const getAllClientes = async () => {
    const connection = await database.getConnection();
    const [result] = await connection.query(`SELECT c.IdCliente, c.Nombre, c.Apellido, c.Direccion, c.DNI, c.IdTipoDoc, c.Telefono, c.FechaDeAlta, b.Nombre as NombreBarrio, b.IdBarrio
                                            FROM cliente AS c 
                                            JOIN barrio as b ON c.idbarrio=b.idbarrio;`);
    return result;
};

const getClienteById = async (IdCliente) => {
    const connection = await database.getConnection();
    console.log(IdCliente + " ACA DESDE EL REPOSITORY");
    const [result] = await connection.query(`SELECT c.IdCliente, c.Nombre, c.Apellido, c.Direccion, c.DNI, c.IdTipoDoc, c.Telefono, c.FechaDeAlta, b.Nombre as NombreBarrio, b.IdBarrio
                                            FROM cliente AS c 
                                            JOIN barrio as b ON c.idbarrio=b.idbarrio
                                            WHERE c.IdCliente=?;`, [IdCliente]);
    return result;
};



const addCliente = async (data) =>{
    const connection = await database.getConnection();
    const addCliente = await connection.query(
        `INSERT INTO cliente (Nombre, Apellido, Direccion, DNI, Telefono, FechaDeAlta, IdBarrio, IdTipoDoc) 
         VALUES (?, ?, ?, ?, ?, CURDATE(), ?, ?);`,
        [data.Nombre, data.Apellido, data.Direccion, data.DNI, data.Telefono, data.IdBarrio, data.IdTipoDoc]
      );      
}


const updateCliente = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(
        `UPDATE cliente 
        SET Nombre = ?, Apellido = ?, Direccion = ?, DNI = ?, Telefono = ?, IdBarrio = ?, IdTipoDoc = ?
        WHERE IdCliente = ?;`, //ver ese uno 1 no se que mierda hice
        [data.Nombre, data.Apellido, data.Direccion, data.DNI, data.Telefono, data.IdBarrio, data.IdTipoDoc, data.IdCliente]
    );
    console.log("Filas afectadas:", result.affectedRows);  // Log para ver cuántas filas se actualizaron
};




module.exports = {
    getAllClientes,
    addCliente,
    updateCliente,
    getClienteById 
};

