import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Header.css";
import logo from "../assets/images/logo.png";
import { useUserState } from "../contexts/UserContext";
import Login from "./Login";
import Search from "./Search";
import Signup from "./Signup";
import loginImg from "/src/assets/images/login.png";
import logoutImg from "/src/assets/images/logout.png";
import popcorn from "/src/assets/images/popcorn.png";
export default function Header() {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userContext, setUserContext] = useUserState();
	const [showLogin, setShowLogin] = useState(false);
	const [showSignup, setShowSignup] = useState(false);
	const ref = useRef({});

	function handleCloseLogin() {
		setShowLogin(false);
	}
	function handleShowLogin() {
		setShowLogin(true);
	}
	function handleCloseSignup() {
		setShowSignup(false);
	}
	function handleShowSignup() {
		setShowSignup(true);
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
		async function handleAuth() {
			await axios({
				method: "get",
				url: "http://localhost:8080/user/auth",
				withCredentials: true,
			})
				.then((response) => {
					if (response.status === 200) return response.data;
					else return;
				})
				.then((result) => {
					if (result.common.res_code === 200) {
						sessionStorage.setItem("isLoggedIn", true);

						setUserContext({
							mem_class: result.data.mem_class,
							mem_id: result.data.mem_id,
							mem_name: result.data.mem_name,
							mem_no: result.data.mem_no,
						});
					} else {
						sessionStorage.removeItem("isLoggedIn");
						setUserContext({
							mem_class: "",
							mem_id: "",
							mem_name: "",
							mem_no: "",
						});
					}
				});
		}
		handleAuth();
	}, []);

	function reset() {
		ref.current.reset();
	}

	return (
		<header>
			<div className="header-container">
				<div className="logo-container">
					<Link to={"/"} onClick={reset}>
						<img src={logo} alt="logo" className="logoImg" />
					</Link>
				</div>
				<div className="search-container">
					<Search ref={ref} />
				</div>

				{isLoggedIn ? (
					<div className="user-container">
						<Link to={"/info"}>
							<div className="user_name">
								<img src={popcorn} />
								{userContext.mem_name}
							</div>
						</Link>
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
							onClick={handleShowLogin}
							className="loginBtn login">
							<img src={loginImg} className="loginImg" />
						</Button>
					</div>
				)}

				<Login
					show={showLogin}
					onHide={handleCloseLogin}
					setIsLoggedIn={setIsLoggedIn}
					onShowSignup={handleShowSignup}
				/>
				<Signup show={showSignup} onHide={handleCloseSignup} />
			</div>
		</header>
	);
}
