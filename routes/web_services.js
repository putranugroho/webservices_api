const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config;
const { URL_CMS } = process.env

const web_services = require('../controller/web_services')

router.use('/web_services', web_services)



module.exports = router
