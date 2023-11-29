const express=require('express')
const router=express.Router()
const featuredController=require('../Controllers/featured.controllers')


router.get('/',featuredController.getAllFeatured)
router.get('/:id',featuredController.getOneFeatured)




module.exports=router;