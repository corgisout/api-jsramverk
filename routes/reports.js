const express = require('express');
const router = express.Router();
const reports = require('../model/reports')
const tokenCheck = require("../model/tokenCheck.js");

router.post('/reports',
    (req, res, next) => tokenCheck.tokenCheck(req, res, next),
    (req, res) => reports.addReport(res, req.body));

router.put("/reports/update/:kmom", (req, res) => {
    reports.getReport(res, req.params.kmom);
});


router.get("/reports/week/:kmom", (req, res) => {
    reports.getReport(res, req.params.kmom);
});

module.exports = router;
