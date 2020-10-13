const express = require('express');
const router = express.Router();
const register = require('../model/register')


router.post('/register', function (req, res) {
    register.register(res, req.body);
});

module.exports = router;
