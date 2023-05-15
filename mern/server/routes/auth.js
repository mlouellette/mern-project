const router = require("express").Router();
const { User } = require("../models/user");

// Importing the bcrypt package for password hashing
const bcrypt = require("bcrypt");

// Importing the Joi package for request body validation
const Joi = require("joi");

// Creating an HTTP POST route to handle login requests
router.post("/", async (req, res) => {
	try {
		// Validating the request body using Joi schema
		const { error } = validate(req.body);
		if (error)
			// Returning a 400 error response if validation fails
			return res.status(400).send({ message: error.details[0].message });

		// Searching for a user with the given email in the database
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			// Returning a 401 error response if user is not found
			return res.status(400).send({ message: "Invalid Email or Password" });

		// Comparing the given password with the hashed password in the database
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			// Returning a 401 error response if password is invalid
			return res.status(400).send({ message: "Invalid Email or Password" });

		// Generating a JSON Web Token (JWT) for the authenticated user
		const token = user.generateAuthToken();
		console.log(token)
		// Returning a success response with the JWT
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		// Handling any internal server errors that occur
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// Defining a Joi schema for validating the request body
const validate = (data) => {
	// Creating a Joi object that defines the expected shape of the request body
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	// Validating the request body against the schema
	return schema.validate(data);
};

module.exports = router;
