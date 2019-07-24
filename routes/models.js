const express = require("express");
const router = express.Router();
const Item = require("../mongoschema");

router.get("/all", (req, res) => {
  const errors = {};
  Item.find()
    .then(items => {
      if (!items) {
        errors.noItems = "There are no items";
        res.status(404).json(errors);
      }
      res.json(items);
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

router.post("/create", (req, res) =>{
    const item = new Item({
        username: req.body.username,
        content: req.body.content
    })
item.save().then(()=> console.log('complete'));
res.json(item);
});
module.exports = router;
