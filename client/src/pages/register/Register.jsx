import {Link} from "react-router-dom";
import "./register.scss";
import {useState} from "react";
import axios from "axios";


const Register = () => {

	const [inputs, setInputs] = useState({
		username: '',
		email: '',
		password: '',
		name: ''
	});
	const [err, setErr] = useState(null);
	const handleChange = (e) => {
		setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}))
	}

	console.log(inputs)


	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post(
					'http://localhost:5000/api/auth/register', inputs)
		} catch (e) {
			setErr(e.response.data)
		}
	}
	console.log(err)
	return (
			<div className="register">
				<div className="card">
					<div className="left">
						<h1>Lama Social.</h1>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
							alias totam numquam ipsa exercitationem dignissimos, error nam,
							consequatur.
						</p>
						<span>Do you have an account?</span>
						<Link to="/login">
							<button>Login</button>
						</Link>
					</div>
					<div className="right">
						<h1>Register</h1>
						<form>
							<input onChange={handleChange} name={'username'} type="text" placeholder="Username"/>
							<input onChange={handleChange} name={'email'} type="email" placeholder="Email"/>
							<input onChange={handleChange} name={'password'} type="password" placeholder="Password"/>
							<input onChange={handleChange} name={'name'} type="text" placeholder="Name"/>
							{err && err}
							<button onClick={handleSubmit}>Register</button>
						</form>
					</div>
				</div>
			</div>
	);
};

export default Register;
