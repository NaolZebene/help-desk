const { model, Schema } = require('mongoose');

const categorySchema = new Schema({
    title: {
        type: String,
        required: true
    }
})

const UserCategory = new model('UserCategory', categorySchema);

module.exports = UserCategory