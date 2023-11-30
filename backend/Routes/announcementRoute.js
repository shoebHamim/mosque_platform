const express=require('express')
const router=express.Router()
const announcementControllers=require('../Controllers/announcement.controllers.js')


router.post('/',announcementControllers.createannouncement)
router.get('/',announcementControllers.getAllannouncements)


module.exports=router
