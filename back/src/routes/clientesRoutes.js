const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController'); 

router.get('/get', clienteController.getClientes);  
//este me ense;o GPT
router.post('/add', (req, res) => {
    const data = req.body; 
    clienteController.addCliente(req, res); 
});


router.put('/modify/:id', (req, res) => {
  const data = req.body; 
  clienteController.updateCliente(req, res);  
});

module.exports = router;
