const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/register', userController.registerForm);
router.post('/register', userController.register);

router.get('/users', userController.usersList);
router.post('/users/:id/delete', userController.deleteUser);

module.exports = router;
