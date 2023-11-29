const express=require('express')
const router=express.Router()
const announcementController=require('../Controllers/announcement.controller')


router.get('/',announcementController.getAllAnnouncement)
router.get('/:date',announcementController.getSelectedAnnouncement)
router.delete('/:id',announcementController.deleteAnnouncementById)
router.post('/:date',announcementController.createAnnouncement)


module.exports=router;