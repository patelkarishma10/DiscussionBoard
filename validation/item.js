const Validator = require("validator");
const isEmpty = require("../is-empty");
 module.exports = function validateLoginInput(item) {
let errors = {};
 // if these values are not present in the data object we are validating then they will be set to empty strings for the Validator.isEmpty
item.username = !isEmpty(item.username) ? item.username : "";
item.content = !isEmpty(item.content) ? item.content : "";
item.email = !isEmpty(item.email) ? item.email : "";

 //Username validation rules
if (!Validator.isAlphanumeric(item.username)) {
errors.username = "Username is invalid";
}

if (Validator.isEmpty(item.username)) {
errors.username = "Username field is required";
}

if (Validator.isEmpty(item.content)) {
errors.content = "content field is required";
}

if (Validator.isEmpty(item.email)) {
errors.email = "email field is required";
}

if (!Validator.isEmail(item.email)) {
errors.email = "email is invalid";
}

 return {
errors, 
isValid: isEmpty(errors)
}
};


