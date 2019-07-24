const express = require("express");
const router = express.Router();
const _ = require("lodash");


let itemArray = [];
router.post("/addItem", (req, res) => {
    let newItem = {
        "username": req.body.username,
        "content": req.body.content
    };
    itemArray.push(newItem);
    res.send(itemArray);
});

router.get("/", (req, res) => {
    res.send(itemArray);
});

router.put("/updateItem/:index", (req, res) => {
    let index = req.params.index;
    let newItem = {
        "username": req.body.username,
        "content": req.body.content
    };
    _.set(itemArray, index, newItem);
    res.send(itemArray);

});

router.delete("/deleteItem/:index", (req, res) => {
    let index = req.params.index;
    _.pullAt(itemArray, index);
    res.send(itemArray);
})

module.exports = router;