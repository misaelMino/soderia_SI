const Cliente = require('../models/clienteModel');
const ClienteRepository = require('../repositories/clientes/clienteRepository');

const getClientes = async (req, res) => {
    try {
        const clientesData = await ClienteRepository.getAllClientes(); 
        res.json(clientesData);  // devolvemos los clientes como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
};

const getClienteById = async (req, res) => {
    const data = req.body;
    const IdCliente = req.params.id
    data.IdCliente = IdCliente;
    console.log(data.IdCliente + " este es el ID");
    try {
        const clientesData = await ClienteRepository.getClienteById(data.IdCliente); 
        res.json(clientesData);
        console.log(clientesData);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cliente, ID inexistente' });
    }
};

const getClienteParametrizado = async (req, res) => {
    const data = req.body;
    try {
        const clientesData = await ClienteRepository.getClienteParametrizado(data.Nombre , data.Apellido, data.NombreBarrio, data.Direccion); 
        console.log(clientesData);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cliente, parametros erróneos' });
    }
};


const addCliente = async (req, res) => {
  const data = req.body;
  if (!data.Nombre || !data.Apellido || !data.Direccion || !data.DNI || !data.Telefono || !data.IdBarrio || !data.IdTipoDoc) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
  }
  data.DNI = parseInt(data.DNI);
  data.IdBarrio = parseInt(data.IdBarrio);
  data.IdTipoDoc = parseInt(data.IdTipoDoc);
  if (isNaN(data.DNI) || isNaN(data.IdBarrio) || isNaN(data.IdTipoDoc)) {
      return res.status(400).json({ message: 'Los campos DNI, IdBarrio y IdTipoDoc deben ser números válidos' });
  }
  try {
      await ClienteRepository.addCliente(data);
      res.status(201).json({ message: 'Cliente agregado correctamente' });
  } catch (error) {
      res.status(500).json({ message: 'Error al cargar cliente', error: error.message });
  }
};

const updateCliente = async (req, res) => {
  const data = req.body;
  const IdCliente = req.params.id
  data.IdCliente = IdCliente;  
  console.log("esta es la data: " + data.IdCliente);
  console.log("esta es la data: " + data.Nombre);
  console.log(req.url);
  try {
    await ClienteRepository.updateCliente(data);     
    res.status(201).json({ message: 'Información del cliente actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al cargar los nuevos datos del cliente' });
  }
};


module.exports = {
    addCliente,
    getClientes,
    updateCliente,
    getClienteById,
    getClienteParametrizado
};

