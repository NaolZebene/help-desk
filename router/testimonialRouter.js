const router = require("express").Router();
const testimonialController = require("../control/testmonialControl");

router.get("/", testimonialController.getTestimonials);
router.get("/:id", testimonialController.getTestimonial);
router.post("/post", testimonialController.CreateTestimonials);
router.put("/:id", testimonialController.EditTestimonials);
router.delete("/:id", testimonialController.deleteTestimonial);

module.exports = router;
