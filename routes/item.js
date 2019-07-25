const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const itemValidation = require("../validation/item");
const bcrypt = require("bcryptjs");

router.get("/all", (req, res) => {
  const errors = {};
  //{}, '-email'
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

// router.delete("/delete", (req,res) =>{
//     Item.deleteOne({'username': req.body.username})
//     .then(({ok, n}) => {
//         res.json({ noItems: "Deleted :)" });
//     })
//     .catch(err => res.status(404).json({ noItems: "There are no items" }));
// });

router.delete("/delete", (req,res) =>{
    errors = {};
const email = req.body.email;
  const hashedValue = req.body.hashedValue;
  //Check Value
  bcrypt.compare(email, hashedValue).then(isMatch => {
    if (isMatch) {
    Item.deleteOne({'email': req.body.hashedValue})
    .then(({ok, n}) => {
        res.json({ message: "Deleted :)" });
    })
    .catch(err => res.status(404).json(err));
    } else {
    errors.value = "Incorrect";
    return res.status(400).json(errors);
    }
  });
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
