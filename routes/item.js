const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const itemValidation = require("../validation/item");

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
    const {errors, isValid} = itemValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const item = new Item({
        username: req.body.username,
        content: req.body.content
    });
    item.save()
        .then(()=> {
            res.json(item);
             console.log('complete')
        })
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

router.delete("/delete", (req,res) =>{
    Item.deleteOne({'username': req.body.username})
    .then(({ok, n}) => {
        res.json({ noItems: "Deleted :)" });
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

router.put("/update", (req,res) => {
    Item.replaceOne({'username': req.body.username},
    {'username': req.body.upUsername, 'content': req.body.upContent})
    .then(({ok, n}) => {
        res.json({ noItems: "updated :)" });
    })
    .catch(err => res.status(404).json({ noItems: "There are no items" }));
});
module.exports = router;
