const express = require('express');
const router = express.Router();

const { asyncHandler } = require('../auth/checkAuth');

const usersController = require('../controllers/user.controller');

router.post('/register', asyncHandler(usersController.register));
router.post('/login', asyncHandler(usersController.login));

module.exports = router;
