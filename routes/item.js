const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const itemValidation = require("../validation/item");
const bcrypt = require("bcryptjs");

router.get("/all", (req, res) => {
  const errors = {};
  //{}, '-email'
  Item.find({}, '-email')
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
        content: req.body.content,
        email: req.body.email
    });
   
   bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(item.email, salt, (err, hash) => {
         if (err) throw err;
         item.email = hash; 
         item.save()
        .then(()=> {
            res.json(item);
        })
        .catch(err => res.status(404).json(err));
      });
   });

});

router.delete("/deleteItem", (req, res) => {

  let errors = {};

  const email = req.body.email;
  const id = req.body._id;

  Item.findById(id).then(item => {

    bcrypt.compare(email, item.email).then(isMatch => {
      if (isMatch) {

        item.remove()
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ itemnotfound: "No item found" })
          );

      } else {
        errors.email = "Email Incorrect";
        return res.status(400).json(errors);
      }
    });

  }).catch(err => res.status(404).json({ noItem: "There is no item with this ID" }));

});



// router.put("/update", (req,res) => {
//     const {errors, isValid} = itemValidation(req.body);
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }
//     Item.replaceOne({'username': req.body.oldUsername},
//     {'username': req.body.username, 'content': req.body.content, 'email' : req.body.email})
//     .then(({ok, n}) => {
//         res.json({ noItems: "updated :)" });
//     })
//     .catch(err => res.status(404).json({ noItems: "There are no items" }));
// });


router.put("/update", (req,res) => {
    const {errors, isValid} = itemValidation(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
const item = new Item({
        username: req.body.username,
        content: req.body.content,
        email: req.body.email
    });
   

bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(item.email, salt, (err, hash) => {
         if (err) throw err;
         item.email = hash; 
        Item.replaceOne({'username': req.body.oldUsername},
    {'username': req.body.username, 'content': req.body.content, 'email' : item.email})
    .then(({ok, n}) => {
        res.json({ noItems: "updated :)" });
    })
    .catch(err => res.status(404).json(err));
      });
   });


    
});

module.exports = router;
