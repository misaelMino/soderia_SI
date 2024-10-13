const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController'); 



router.post('/add', (req, res) => {
    const data = req.body; 
    clienteController.addCliente(req, res); 
});