const router = require("express").Router();
const { User, validate } = require("../models/user");

// Importing the bcrypt package for password hashing
const bcrypt = require("bcrypt");

// Creating an HTTP POST route to handle user registration requests
router.post("/", async (req, res) => {
	try {
		// Validating the request body using the validate function from the user model
		const { error } = validate(req.body);
		if (error)
			// Returning a 400 error response if validation fails
			return res.status(400).send({ message: error.details[0].message });

		// Searching for a user with the given email in the database
		const user = await User.findOne({ email: req.body.email });
		if (user)
			// Returning a 409 error response if user already exists
			return res
				.status(400)
				.send({ message: "User with given email already Exist!" });

		// Generating a salt for password hashing using the bcrypt package
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		// Hashing the user's password using the generated salt
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		// Creating a new user object with the hashed password and saving it to the database
		await new User({ ...req.body, password: hashPassword }).save();
		// Returning a success response with a message indicating the user was created
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		// Handling any internal server errors that occur
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
