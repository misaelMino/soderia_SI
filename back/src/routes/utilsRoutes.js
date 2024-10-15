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



module.exports = router;