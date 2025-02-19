const express = require('express');
const { getUsers, getUserById } = require('../controller/userController');
const jwtMiddleware = require('../middlewares/jwtMiddlewares');
const { register, login } = require('../controller/userController');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/', jwtMiddleware, getUsers);
router.get('/:id', jwtMiddleware, getUserById);

module.exports = router;
