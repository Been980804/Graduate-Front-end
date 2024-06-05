import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../assets/css/Header.css";
import logo from "../assets/images/logo.png";
import Logout from "../components/Logout.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search";
import loginImg from "/src/assets/images/login.png";
import logoutImg from "/src/assets/images/logout.png";

export default function Header() {
	const [showLogin, setShowLogin] = useState(false);
	const [showSignup, setShowSignup] = useState(false);
	const [isAuth, setIsAuth] = useState(false);
	const [user, setUser] = useState({
		no: "",
		id: "",
		name: "",
		class: "",
	});

	// useEffect(() => {
	// 	async function handleAuth() {}
	// }, isAuth);

	function handleCloseLogin() {
		setShowLogin(false);
	}
	function handlesetShowLogin() {
		setShowLogin(true);
	}
	function handleCloseSignup() {
        setShowSignup(false);
    }
    function handleShowSignup() {
        setShowSignup(true);
    }
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
				<div className="user-container">
					<Button variant="primary" onClick={handlesetShowLogin} className="loginBtn login">
						<img src={loginImg} className="loginImg" />
					</Button>

					<Button variant="secondary" onClick={Logout} className="loginBtn logout">
						<img src={logoutImg} className="loginImg" />
					</Button>
					<Login show={showLogin} onHide={handleCloseLogin} onShowSignup={handleShowSignup}/>
					<Signup show={showSignup} onHide={handleCloseSignup}></Signup>
				</div>
			</div>
		</header>
	);
}
