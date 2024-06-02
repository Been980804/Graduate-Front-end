import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "../assets/css/Header.css";
import logo from "../assets/images/logo.png";
import Search from "./Search";
import loginImg from "/src/assets/images/login.png";
import logoutImg from "/src/assets/images/logout.png";
import popcorn from "/src/assets/images/popcorn.png";
export default function Header() {
	const navigate = useNavigate();
	const response = useLoaderData();
	console.log(response);
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
						{response.isLogin && (
							<Link to={"/info"}>
								<div className="user_name">
									<img src={popcorn} />
									{response.mem_name}
								</div>
							</Link>
						)}
						<div>
							{response.isLogin ? (
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
	const authRes = await axios({
		method: "get",
		url: "http://localhost:8080/user/auth",
		withCredentials: true,
	})
		.then((respond) => {
			if (respond.status === 200) return respond.data;
		})
		.then((result) => {
			if (result.common.res_code === 200) return result.data;
		})
		.then((userInfo) => {
			if (userInfo) {
				return {
					isLogin: true,
					mem_no: userInfo.mem_no,
					mem_name: userInfo.mem_name,
					mem_class: userInfo.mem_class,
					mem_id: userInfo.mem_id,
				};
			} else {
				return {
					isLogin: false,
				};
			}
		});
	return authRes;
}
