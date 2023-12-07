const express=require('express')
const router=express.Router()
const mosqueControllers=require('../Controllers/mosque.controllers.js')
const upload = require('../Middlewares/multerMiddleware')

router.post('/',mosqueControllers.createMosque)
router.get('/',mosqueControllers.getAllMosques)
router.get('/name/:name',mosqueControllers.mosqueExistsbyName)
router.get('/email/:email',mosqueControllers.mosqueExistsbyEmail)
router.delete('/:name',mosqueControllers.deleteMosqueByName)
router.put('/:email',mosqueControllers.mosqueUpdatebyEmail);
//router.put('/:email',multerMiddleware,mosqueControllers.mosqueUpdatebyEmail)
//router.put('/:email', upload.single('photo'), mosqueControllers.mosqueUpdatebyEmail);

module.exports=router