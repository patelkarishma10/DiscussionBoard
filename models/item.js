const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let itemSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

let Item = mongoose.model('Item', itemSchema);

module.exports = Item;