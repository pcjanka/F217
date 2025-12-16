const express = require('express');
const router = express.Router();

const alpacaController = require('../controllers/alpacaController');

router.get('/', alpacaController.index);

router.get('/alpaca/new', alpacaController.newForm);
router.post('/alpaca/new', alpacaController.add);

router.get('/alpaca/:id', alpacaController.details);

router.get('/alpaca/:id/edit', alpacaController.editForm);
router.post('/alpaca/:id/edit', alpacaController.update);

router.post('/alpaca/:id/delete', alpacaController.remove);

module.exports = router;
