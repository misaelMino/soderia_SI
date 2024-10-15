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
         VALUES (?, ?, ?, ?, ?, CURDATE(), ?, ?);`,
        [data.Nombre, data.Apellido, data.Direccion, data.DNI, data.Telefono, data.IdBarrio, data.IdTipoDoc]
      );      
}


const updateCliente = async (data) => {
    const connection = await database.getConnection();
    const result = await connection.query(
        `UPDATE cliente 
        SET Nombre = ?, Apellido = ?, Direccion = ?, DNI = ?, Telefono = ?, IdBarrio = ?, IdTipoDoc = ?
        WHERE IdCliente = 1;`, //ver ese uno 1 no se que mierda hice
        [data.Nombre, data.Apellido, data.Direccion, data.DNI, data.Telefono, data.IdBarrio, data.IdTipoDoc]
    );
    console.log("Filas afectadas:", result.affectedRows);  // Log para ver cuántas filas se actualizaron
};




module.exports = {
    getAllClientes,
    addCliente,
    updateCliente
};

