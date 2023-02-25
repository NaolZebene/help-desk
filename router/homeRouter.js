const homeController = require("../control/homeController");
const router = require('express').Router()
const {isAdmin}= require("../util/Authorization");
const isUserAuth = require("../util/isUser-Auth")
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "gallary");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getMonth() + "-" + file.originalname);
  },
});

var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "event");
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getMonth() + "-" + file.originalname);
    },
  });

const upload = multer({ storage: storage });
const upload_ev = multer({storage:storage2})

const gallary = upload.array("file");
const singleimg = upload.single("backimg")
const event = upload.array("images")

router.post("/gallary/create",isUserAuth,isAdmin,gallary,homeController.createGallary)
router.get("/gallary/get",isUserAuth,isAdmin,homeController.Getgallary);
router.delete("/gallary/:id",isUserAuth,isAdmin,homeController.deletGallary)

router.post("/contactus",isUserAuth,isAdmin,homeController.ContactUs);

router.post("/event/create",isUserAuth,isAdmin,event,homeController.EventPost);
router.put("/event/edit/:id",isUserAuth,isAdmin,event,homeController.EditEvent);
router.delete("/event/delete/:id",isUserAuth,isAdmin, homeController.deletGallary);
router.get("/event",isUserAuth,isAdmin, homeController.getEvents);
router.get("/event/:id",isUserAuth,isAdmin,homeController.getOneEvent);

router.post("/createbackground/create",isUserAuth,isAdmin,singleimg,homeController.CreateBackground);



module.exports = router;