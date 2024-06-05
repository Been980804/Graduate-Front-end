import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Header.css";
import logo from "../assets/images/logo.png";
import Search from "./Search";
import loginImg from "/src/assets/images/login.png";
import logoutImg from "/src/assets/images/logout.png";
import pwd from "/src/assets/images/password.png";
import id from "/src/assets/images/profile.png";

export default function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const { register, handleSubmit } = useForm();
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		mem_no: "",
		mem_name: "",
		mem_class: "",
		mem_id: "",
	});

	function handleClose() {
		setShow(false);
	}
	function handleShow() {
		setShow(true);
	}

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
					setIsLoggedIn(true);
					setUserInfo({
						mem_class: result.data.mem_class,
						mem_id: result.data.mem_id,
						mem_name: result.data.mem_name,
						mem_no: result.data.mem_no,
					});
					navigate("/");
				} else {
					alert("ID 혹은 PW가 일치하지 않습니다.");
					return;
				}
			});
		handleClose();
	}

	async function handleLogout() {
		await axios({
			method: "post",
			url: "http://localhost:8080/user/logout",
			data: {},
			withCredentials: true,
		})
			.then((response) => {
				if (response.status === 200) return response.data;
				else return;
			})
			.then((result) => {
				if (result.common.res_code === 200) {
					sessionStorage.removeItem("isLoggedIn");
					setIsLoggedIn(false);
					alert("Logout");
				}
			});
	}
	function handleJoin() {
		//join 관련 처리
		handleClose();
	}

	useEffect(() => {
		const storedInfo = sessionStorage.getItem("isLoggedIn");
		if (storedInfo) {
			setIsLoggedIn(true);
		}
	}, []);
	return (
		<header>
			<div className="header-container">
				<div className="logo-container">
					<Link to={"/"}>
						<img src={logo} alt="logo" className="logoImg" />
					</Link>
				</div>
				<div className="search-container">
					<Search />
				</div>
				{/* 로그인시 사용자 정보 보이기 / 로그인유무에 로그인 로그아웃 버튼 변경 */}

				{isLoggedIn ? (
					<div className="user-container">
						<div>{userInfo.mem_name}</div>
						<Button
							onClick={handleLogout}
							variant="secondary"
							className="loginBtn logout">
							<img src={logoutImg} className="loginImg" />
						</Button>
					</div>
				) : (
					<div className="user-container">
						<Button
							variant="primary"
							onClick={handleShow}
							className="loginBtn login">
							<img src={loginImg} className="loginImg" />
						</Button>
					</div>
				)}

				<Modal show={show} onHide={handleClose} centered>
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
								<img
									src={pwd}
									style={{ width: "25px", margin: "10px 0 0 5px" }}
								/>
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
			</div>
		</header>
	);
}
