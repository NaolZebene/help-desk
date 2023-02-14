const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const TokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Token = model("Token", TokenSchema);

module.exports = Token;
