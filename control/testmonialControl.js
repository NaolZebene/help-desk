const Testimonial = require("../model/Testimonials");
const wrapAsync = require("../util/wrapAsync");

module.exports.CreateTestimonials = async function (req, res) {
  const data = req.body;
  const new_testimonial = new Testimonial(data);
  await new_testimonial.save();
  return res
    .json({
      msg: "Testimonial Created Successfully",
    })
    .status(200);
};

module.exports.EditTestimonials = wrapAsync(async function (req, res) {
  const { id } = req.params;
  const data = req.body;
  const updatedData = await Testimonial.findByIdAndUpdate(id, data, {
    runValidators: true,
  });
  if (updatedData) {
    return res
      .json({
        msg: "Updated Testimonial Successfully",
      })
      .status(200);
  }
  return res
    .json({
      msg: "No such Testimonial",
    })
    .status(401);
});

module.exports.getTestimonials = wrapAsync(async function (req, res) {
  const all_testimonials = await Testimonial.find({ isDeleted: false });
  return res
    .json({
      msg: all_testimonials,
    })
    .status(200);
});

module.exports.getTestimonial = wrapAsync(async function (req, res) {
  const { id } = req.params;
  const all_testimonials = await Testimonial.findById(id);
  return res
    .json({
      msg: all_testimonials,
    })
    .status(200);
});

module.exports.deleteTestimonial = wrapAsync(async function (req, res) {
  const { id } = req.params;
  const testimonial = await Testimonial.findById(id);
  if (!testimonial) {
    return res
      .json({
        msg: "No Such Testimonial",
      })
      .status(401);
  }
  testimonial.isDeleted = true;
  await testimonial.save();
  return res
    .json({
      msg: "Testimonial Deleted Successfully",
    })
    .status(200);
});
