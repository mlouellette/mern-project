import { useState, useEffect } from "react";
import axios from "axios"; // to make HTTP requests
import { Link, useNavigate } from "react-router-dom"; 
import styles from "./styles.module.css"; // to use CSS styles for this component

import Alert from 'react-bootstrap/Alert';
import Fade from 'react-bootstrap/Fade';

//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import toast, { Toaster } from 'react-hot-toast';


// Define a React functional component called Login
const Login = () => {
	// Declare and initialize state variables using state hooks
	const [data, setData] = useState({ email: "", password: "" }); // stores email and password entered by user
	const [success, setSuccess] = useState(false); // stores Login message, if any
	const [showAlert, setShowAlert] = useState(false);
	const [error, setError] = useState('');
	const [show, setShow] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
		  setShowAlert(true);
		  setTimeout(() => {
			setShowAlert(false);
			setError('');
		  }, 5000);
		}
	  }, [error]);

	// Define a function that updates state whenever user types in email or password
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	// Define a function that gets executed when user submits login form
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			
			const url = "http://localhost:5000/api/auth";
			// Make a POST request to the API with email and password data
			const { data: res } = await axios.post(url, data);
			// If successful, save the token returned from the API to local storage and display success message
			localStorage.setItem("token", res.data);
			setError("");

			toast.success('Logged Successfully', {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				});

			console.log("caca")
			
			setTimeout(() => {
				window.location = "/"
			  }, 3000);
		
		} catch (error) {
			// If there is an error, check if it is a response error (HTTP status code >= 400) and <= 500
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				// If it is a response error, display the error message to the user
				setError(error.response.data.message);
				setShow(true);
				setTimeout(() => setShow(false), 5000); // Set show to false after 5 seconds
			}
		}
	};

	// Render the login form on the page with input fields, error message (if any), success message (if any), and sign in button
	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
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

						{showAlert &&
							<Alert variant="danger" onClose={() => setShowAlert(false)}>
							<Alert.Heading>{error}</Alert.Heading>
							</Alert>
						}

						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
						<ToastContainer
							position="bottom-center"
							autoClose={3000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="colored"
							/>

					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
