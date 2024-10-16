const database = require("../config/database");

const getLocalidades = async () => {
    const connection = await database.getConnection();
    const [result] = await connection.query("SELECT * FROM localidad;");
    return result;
};

const getBarrios = async () => {
    const connection = await database.getConnection();
    const [result] = await connection.query("SELECT * FROM barrio;");
    return result;
};

const getTipoDoc = async () => {
    const connection = await database.getConnection();
    const [result] = await connection.query("SELECT * FROM tipodoc;");
    return result;
}

const getProductos = async () => {
    const connection = await database.getConnection();
    const [result] = await connection.query("SELECT * FROM producto;");
    return result;
}


const getMedioPago = async () => {
    const connection = await database.getConnection();
    const [result] = await connection.query("SELECT * FROM mediodepago;");
    return result;
}



module.exports = {
    getLocalidades,
    getBarrios,
    getTipoDoc,
    getProductos,
    getMedioPago
}
