const express=require('express')
const router=express.Router()
const registeredController=require('../Controllers/registered.controllers')


router.get('/',registeredController.getAllRegistered)
router.get('/:id',registeredController.getOneRegistered)




module.exports=router;