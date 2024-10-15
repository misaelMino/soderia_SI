const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController'); 



router.post('/add', (req, res) => {
    pedidoController.addPedido(req, res); 
});

router.put('/update/:id', (req, res) => {
    pedidoController.updatePedido(req, res);
});


module.exports = router;