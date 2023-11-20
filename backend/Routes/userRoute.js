const express=require('express')
const router=express.Router()
const userControllers=require('../Controllers/user.controllers.js')


router.get('/',userControllers.getAllUsers)
router.post('/',userControllers.createUser)
router.get('/:email', userControllers.userExistsbyEmail)


module.exports=router