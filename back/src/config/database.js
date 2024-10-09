const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
dotenv.config();

let connection;

const getConnection = async () => {
    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host: process.env.HOST,
                database: process.env.DATABASE,
                user: process.env.USER,
                password: process.env.PASSWORD
            });
            console.log("Conexión a la base de datos establecida");
        } catch (error) {
            console.error("Error al conectar con la base de datos:", error);
            throw error; // Manejar bien el error aca
        }
    }
    return connection;
};

module.exports = {
    getConnection
};
