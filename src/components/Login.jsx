import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../assets/css/Header.css";
import pwd from "/src/assets/images/password.png";
import id from "/src/assets/images/profile.png";

export default function Login({
	show,
	onHide,
	userInfo,
	setUserInfo,
	setIsLoggedIn,
}) {
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
				else return;
			})
			.then((result) => {
				if (result.common.res_code === 200) {
					alert("환영합니다.");
					sessionStorage.setItem("isLoggedIn", true);
					console.log(result);
					setIsLoggedIn(true);
					setUserInfo({
						mem_class: result.data.resMap.mem_class,
						mem_id: result.data.resMap.mem_id,
						mem_name: result.data.resMap.mem_name,
						mem_no: result.data.resMap.mem_no,
					});
					navigate("/");
				} else {
					alert("ID 혹은 PW가 일치하지 않습니다.");
					return;
				}
			});
		onHide();
	}
	function handleJoin() {
		//join 관련 처리
		onHide();
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
				<Button variant="secondary" onClick={handleJoin}>
					회원가입
				</Button>
				<Button variant="primary" onClick={handleSubmit(handleLogin)}>
					로그인
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
