const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let itemSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    content: String
});

let Item = mongoose.model('Item', itemSchema);

module.exports = Item;