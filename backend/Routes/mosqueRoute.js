const express=require('express')
const router=express.Router()
const mosqueControllers=require('../Controllers/mosque.controllers.js')


router.post('/',mosqueControllers.createMosque)
router.get('/',mosqueControllers.getAllMosques)
router.get('/:email',mosqueControllers.mosqueExistsbyEmail)
router.get('/:id',mosqueControllers.getOneMosque)



module.exports=router