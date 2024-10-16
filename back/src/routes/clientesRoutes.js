const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController'); 

router.get('/get', clienteController.getClientes);  

router.get('/get/:id', clienteController.getClienteById);

router.post('/add', (req, res) => {
    const data = req.body; 
    debugger;
    clienteController.addCliente(req, res); 
});

router.put('/modify/:id', (req, res) => {
  const data = req.body; 
  clienteController.updateCliente(req, res);  
});

module.exports = router;
