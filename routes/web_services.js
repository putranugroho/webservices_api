const express = require('express');
const router = express.Router();
require('dotenv').config;
const { validateApiKey } = require('../Utility/validateApiKey');

const {report, report_periode} = require('../controller/web_services')

router.post('/report', validateApiKey, report)
router.post('/report/periode', validateApiKey, report_periode)


module.exports = router
