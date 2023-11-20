const express = require('express')
const router = express.Router()
const updateMosque = require('../controller/mosqueIdEditController')

router.put('/mosqueIdEditController/:id', updateMosque)
    

module.exports = router