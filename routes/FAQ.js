'use strict'

var express = require('express');
var FAQController = require('../controllers/FAQ');

var api = express.Router();

var md_auth = require('../middleware/authenticated');

api.post('/newFAQ', md_auth.ensureAuth, FAQController.newFAQ);
api.get('/getFaq/:id', md_auth.ensureAuth, FAQController.getFaq);
api.get('/getFaqs', md_auth.ensureAuth, FAQController.getFaqs);
api.post('/updateFaq/:id', md_auth.ensureAuth, FAQController.updateFaq);
api.post('/deleteFaq/:id', md_auth.ensureAuth, FAQController.deleteFaq);
api.get('/getFaq/idCongreso/:id', md_auth.ensureAuth, FAQController.getFaqsCongreso);

module.exports = api;