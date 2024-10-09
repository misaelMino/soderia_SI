const database = require("../../config/database");


const getAllClientes = async () => {
    const connection = await database.getConnection();
    const [result] = await connection.query("SELECT * FROM angelitadb.cliente;");
    return result;
};


const addCliente = async (data) =>{
    const connection = await database.getConnection();
    const addCliente = await connection.query(
        `INSERT INTO cliente (Nombre, Apellido, Direccion, DNI, Telefono, FechaDeAlta, IdBarrio, IdTipoDoc) 
         VALUES (?, ?, ?, ?, ?, CURDATE(), ?, ?)`,
        [data.nombre, data.apellido, data.direccion, data.DNI, data.telefono, data.idbarrio, data.idtipodoc]
      );      
}



module.exports = {
    getAllClientes,
    addCliente
};

