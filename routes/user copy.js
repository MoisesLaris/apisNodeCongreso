'use strict'

var express = require('express');
var FAQController = require('../controllers/FAQ');

var api = express.Router();

var md_auth = require('../middleware/authenticated');

api.post('/newFAQ', FAQController.newFAQ);

module.exports = api;