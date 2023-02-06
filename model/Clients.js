const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const clientSchema = new Schema({
  name: {
    type: String,
  },
  logo: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Clients", clientSchema);
