const utilsRepository = require('../repositories/utilsRepository');

const getLocalidades = async (req, res) => {
    try {
        const localidadesData = await utilsRepository.getLocalidades(); // datos JSON desde la base de datos
        res.json(localidadesData);  // devolvemos los clientes como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener localidades' });
    }
};

const getBarrios = async (req, res) => {
    try {
        const barriosData = await utilsRepository.getBarrios(); // datos JSON desde la base de datos
        res.json(barriosData);  // devolvemos los clientes como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener barrios' });
    }
};

const getTipoDoc = async (req, res) => {
    try {
        const tipoDocData = await utilsRepository.getTipoDoc(); // datos JSON desde la base de datos
        res.json(tipoDocData);  // devolvemos los clientes como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipo de documento' });
    }
};

const getProductos = async (req, res) => {
    try {
        const productosData = await utilsRepository.getProductos(); // datos JSON desde la base de datos
        res.json(productosData);  // devolvemos los clientes como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipo de documento' });
    }
};

const getMedioPago = async (req, res) => {
    try {
        const mediodepagoData = await utilsRepository.getMedioPago(); // datos JSON desde la base de datos
        res.json(mediodepagoData);  // devolvemos los clientes como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipo de documento' });
    }
};



module.exports = {
    getLocalidades,
    getBarrios,
    getTipoDoc,
    getProductos,
    getMedioPago
}