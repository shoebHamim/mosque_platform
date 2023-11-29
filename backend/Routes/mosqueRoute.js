const express=require('express')
const router=express.Router()
const mosqueControllers=require('../Controllers/mosque.controllers.js')
const createMulterMiddleware = require('../Middlewares/multerMiddleware')

const multerMiddleware = createMulterMiddleware();

router.post('/',mosqueControllers.createMosque)
router.get('/',mosqueControllers.getAllMosques)
router.get('/name/:name',mosqueControllers.mosqueExistsbyName)
router.get('/email/:email',mosqueControllers.mosqueExistsbyEmail)
router.delete('/:name',mosqueControllers.deleteMosqueByName)
//router.put('/:email',multerMiddleware,mosqueControllers.mosqueUpdatebyEmail)
router.put('/:email', (req, res, next) => {
   
    multerMiddleware(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error processing file upload' });
      }
      // Continue to the next middleware or route handler
      next();
    });
  }, mosqueControllers.mosqueUpdatebyEmail);

module.exports=router