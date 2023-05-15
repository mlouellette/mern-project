import { useState } from "react"; 
import axios from "axios"; 
import { Link, useNavigate } from "react-router-dom"; 
import styles from "./styles.module.css"; 

// Define a React functional component called Signup
const Signup = () => {
	// Declare and initialize state variables using state hooks
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState(""); // stores error message, if any
	const navigate = useNavigate(); // hook to navigate to another page in the app

	// Define a function that updates state whenever user types in any input field
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	// Define a function that gets executed when user submits signup form
	const handleSubmit = async (e) => {
		e.preventDefault(); 
		try {
			// Define URL for API endpoint
			const url = "http://localhost:5000/api/users";
			// Make a POST request to the API with all user data
			const { data: res } = await axios.post(url, data);
			// If successful, navigate user to login page and log success message to console
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			// If there is an error, check if it is a response error (HTTP status code >= 400) and <= 500
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				// If it is a response error, display the error message to the user
				setError(error.response.data.message);
			}
		}
	};

	// Render the signup form on the page with input fields, error message (if any), and sign up button
	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;