const express = require('express');
const router = express.Router();
const login = require('../model/login')


router.post('/login', function (req, res) {
    login.login(res, req.body);
});

module.exports = router;
