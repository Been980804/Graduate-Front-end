import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";
// import Logout from "./Logout";
import logo from "/src/assets/cinema-logo2-1.png";
import loginImg from "/src/assets/login.png";
import logoutImg from "/src/assets/logout.png";
import popcorn from "/src/assets/popcorn.png";

export default function Header() {
	const navigate = useNavigate();
	const [login, setLogin] = useState({
		isLogin: false,
		mem_name: "",
		mem_id: "",
		mem_class: "",
	});
	const auth = async () => {
		await axios({
			method: "get",
			url: "http://localhost:8080/user/auth",
			data: {},
			withCredentials: true,
		}).then((response) => {
			if (response.data.common.res_code === 200) {
				setLogin({
					isLogin: true,
					mem_name: response.data.data.mem_name,
					mem_id: response.data.data.mem_id,
					mem_class: response.data.data.mem_class,
				});
			}
		});
	};

	useEffect(() => {
		auth();
	}, []);

	const handleClick = () => {
		navigate("/login");
	};
	const handleLogout = () => {
		navigate("/logout");
	};
	return (
		<>
			<header>
				<div className="header-container">
					<div className="logo-container">
						<Link to={"/"}>
							<img src={logo} alt='logo' className="logoImg"/>
						</Link>
					</div>
					<div className="search-container">
						<input></input>
						<Button>Search</Button>
					</div>
					<div className="user-container">
						{login.isLogin && (
							<div className="user_name">
								<img src={popcorn}/>
								{login.mem_name}
							</div>
						)}
						<div>
							{login.isLogin ? (
								<img src={logoutImg} onClick={handleLogout} className="loginImg"/>
							) : (
								<img src={loginImg} onClick={handleClick} className="loginImg"/>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
