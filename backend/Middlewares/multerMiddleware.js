const multer = require('multer');

const createMulterMiddleware = () => {
  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  };

  return multer({
    storage: storage,
    fileFilter: fileFilter,
  }).fields([
    { name: 'pictures1', maxCount: 1 },
    { name: 'pictures2', maxCount: 1 },
    { name: 'pictures3', maxCount: 1 },
  ]);
};

module.exports = createMulterMiddleware;
