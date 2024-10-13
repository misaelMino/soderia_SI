const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController'); 



router.post('/add', (req, res) => {

    const data = req.body; 
    debugger;
    pedidoController.addPedido(req, res); 
});

module.exports = router;