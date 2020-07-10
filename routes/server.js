const express = require('express');
const router = express.Router();

const serverController = require('../controllers/ServerController')


router.get('/api', serverController.getIndex)



module.exports = router