// http://localhost:8080/user/login
import axios from "axios";
import { useRef } from "react";
export default function Login() {
	const id = useRef();
	const password = useRef();

	async function handleSubmit(event) {
		event.preventDefault();
		const enteredId = id.current.value;
		const enteredPassword = password.current.value;
		// const response = await fetch("http://localhost:8080/user/login", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: {
		// 		mem_id: enteredId,
		// 		pwd: enteredPassword,
		// 	},
		// });
		// console.log(enteredId, enteredPassword);
		// const resultMsg = await response.json();
		// console.log(resultMsg);
		axios({
			method: "post",
			url: "http://localhost:8080/user/login",
			data: {
				mem_id: enteredId,
				pwd: enteredPassword,
			},
		}).then(function (response) {
			console.log(response);
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>

			<div>
				<div>
					<label htmlFor="id">Id</label>
					<input id="id" type="id" ref={id} />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input id="pwd" type="password" ref={password} />
				</div>
			</div>
			<button className="submit">Login</button>
		</form>
	);
}
