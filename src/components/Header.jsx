import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Header.css";
import logo from "../assets/images/logo.png";
import Login from "./Login";
import Search from "./Search";
import loginImg from "/src/assets/images/login.png";
import logoutImg from "/src/assets/images/logout.png";
export default function Header() {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [show, setShow] = useState(false);
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

				<Login
					show={show}
					onHide={handleClose}
					userInfo={userInfo}
					setUserInfo={setUserInfo}
					setIsLoggedIn={setIsLoggedIn}
				/>
			</div>
		</header>
	);
}
