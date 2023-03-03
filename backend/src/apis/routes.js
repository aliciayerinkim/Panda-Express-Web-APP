/**
* This file will contain a route that will be used to access Google Translate API for translation
* @author Aaron Su - 930006201
*/
const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post("/translate", controller.translateText);

module.exports = router;
