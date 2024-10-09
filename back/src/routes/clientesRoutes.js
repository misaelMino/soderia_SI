const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController'); // Llamamos al controlador

router.get('/', clienteController.getClientes);  // Al hacer GET en /clientes, llamamos al método getClientes del controlador

//router.post('/', clienteController.addCliente(data)); este es el que hice yo

//este me ense;o GPT
router.post('/add', (req, res) => {
    const data = req.body;  // Captura los datos del cuerpo de la solicitud
    clienteController.addCliente(req, res);  // Pasa req y res al controlador
  });

module.exports = router;
