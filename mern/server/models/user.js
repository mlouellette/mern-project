const mongoose = require("mongoose"); // MongoDB object modeling tool
const jwt = require("jsonwebtoken"); // JSON web token generator
const Joi = require("joi"); // Data validation library
const passwordComplexity = require("joi-password-complexity"); // Password complexity validation rules

// Define a Mongoose schema for a user object
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Define a method on the schema to generate a JWT token for the user
userSchema.methods.generateAuthToken = function () {
  // Generate a token using the user's ID and a private key
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  // Return the token
  return token;
};

// Create a Mongoose model from the schema
const User = mongoose.model("user", userSchema);

// Define a function to validate user input data using Joi
const validate = (data) => {
  // Define a Joi schema with validation rules for first name, last name, email, and password
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  // Validate the data against the schema
  return schema.validate(data);
};

module.exports = { User, validate };
