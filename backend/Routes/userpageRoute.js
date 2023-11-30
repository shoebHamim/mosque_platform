const express=require('express')
const router=express.Router()
const userpageControllers=require('../Controllers/userpage.controllers.js')


router.get('/',userpageControllers.getAllUserinfo)
router.post('/',userpageControllers.createUserinfo)
router.get('/:email', userpageControllers.userpageExistsbyEmail)


module.exports=router