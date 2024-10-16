const express = require('express');
const router = express.Router();
const utilsController = require('../controllers/utilsController'); 


router.get('/localidades', (req, res) => {
    utilsController.getLocalidades(req, res);
});

router.get('/barrios', (req, res) => {
    utilsController.getBarrios(req, res);
});

router.get('/tipodoc', (req, res) => {
    utilsController.getTipoDoc(req, res);
});

router.get('/productos', (req, res) => {
    utilsController.getProductos(req, res);
});

router.get('/mediodepago', (req, res) => {
    utilsController.getMedioPago(req, res);
});



module.exports = router;