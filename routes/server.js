const express = require('express');
const router = express.Router();

const serverController = require('../controllers/ServerController')


router.get('/api/tree', serverController.getTree)

router.get('/api/table', serverController.getTable)


module.exports = router