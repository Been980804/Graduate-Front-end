import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/css/Header.css";
import Search from "./Search";
import loginImg from "/src/assets/images/login.png";
import logoutImg from "/src/assets/images/logout.png";
import popcorn from "/src/assets/images/popcorn.png";

export default function Header() {
	const navigate = useNavigate();
	const [login, setLogin] = useState({
		isLogin: false,
		mem_no: "",
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
					mem_no: response.data.data.mem_no,
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

	const handleLogin = () => {
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
							<img src={logo} alt="logo" className="logoImg" />
						</Link>
					</div>
					<div className="search-container">
						<Search />
					</div>
					<div className="user-container">
						{login.isLogin && (
							<Link to={"/info"}>
								<div className="user_name">
									<img src={popcorn} />
									{login.mem_name}
								</div>
							</Link>
						)}
						<div>
							{login.isLogin ? (
								<img
									src={logoutImg}
									onClick={handleLogout}
									className="loginImg"
								/>
							) : (
								<img
									src={loginImg}
									onClick={handleLogin}
									className="loginImg"
								/>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
}

export async function loader() {
	return null;
}
