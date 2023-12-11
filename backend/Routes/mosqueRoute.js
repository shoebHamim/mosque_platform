const express=require('express')
const router=express.Router()
const mosqueControllers=require('../Controllers/mosque.controllers.js')


router.post('/',mosqueControllers.createMosque)
router.get('/idtomail/:id',mosqueControllers.idToEmail)
router.get('/',mosqueControllers.getAllMosques)
router.get('/:email',mosqueControllers.mosqueExistsbyEmail)
router.get('/name/:name',mosqueControllers.mosqueExistsbyName)
router.delete('/:id',mosqueControllers.deleteMosqueById)
router.put('/:email',mosqueControllers.mosqueUpdatebyEmail);

module.exports=router