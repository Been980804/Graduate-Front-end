import axios from "axios";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import pwd from "/src/assets/images/password.png";
import id from "/src/assets/images/profile.png";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login({ show, onHide, onShowSignup }) {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	async function handleLogin(data) {
		await axios({
			method: "post",
			url: "http://localhost:8080/user/login",
			withCredentials: true,
			data: {
				mem_id: data.mem_id,
				pwd: data.pwd,
			},
		})
			.then((response) => {
				if (response.status === 200) return response.data;
			})
			.then((result) => {
				if (result.common.res_code === 200) {
					alert("환영합니다.");
					localStorage.setItem("isAuth", true);
					navigate("/");
				} else {
					alert("ID 혹은 PW가 일치하지 않습니다.");
				}
			});
		onHide();
	}

	function handleSignup() {
		//join 관련 처리
		onHide();
		onShowSignup();
	}
	return (
		<Modal show={show} onHide={onHide} centered>
			<Modal.Header>
				<Modal.Title>Login</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group>
					<Form.Label>
						<img src={id} style={{ width: "25px", margin: "0 0 0 5px" }} />
					</Form.Label>
					<Form.Control
						placeholder="ID"
						autoFocus
						{...register("mem_id", { required: true })}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						<img src={pwd} style={{ width: "25px", margin: "10px 0 0 5px" }} />
					</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						{...register("pwd", { required: true })}
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleSignup}>
					회원가입
				</Button>
				<Button variant="primary" onClick={handleSubmit(handleLogin)}>
					로그인
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
