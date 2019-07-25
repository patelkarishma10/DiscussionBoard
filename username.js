const Validator = require("validator");
const isEmpty = require("./is-empty");
 module.exports = function validateLoginInput(item) {
let errors = {};
 // if these values are not present in the data object we are validating then they will be set to empty strings for the Validator.isEmpty
item.username = !isEmpty(item.username) ? item.username : "";

 //Username validation rules
if (!Validator.isAlphanumeric(item.username)) {
errors.username = "Username is invalid";
}

if (Validator.isEmpty(item.username)) {
errors.username = "Username field is required";
}

 return {
errors, 
isValid: isEmpty(errors)
}
};


