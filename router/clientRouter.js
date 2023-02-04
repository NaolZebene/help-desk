const router = require('express').Router()
const clientController = require('../control/clientController'); 

const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getMonth() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  const logo = upload.single("logo");


router.get('/', clientController.getClients); 
router.post('/post',logo, clientController.CreateClients); 
router.put('/:id',logo,clientController.EditClients);
router.delete('/:id', clientController.deleteClients);

module.exports = router;