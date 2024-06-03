import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../assets/css/Header.css";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import logo from "../assets/images/logo.png";
import loginImg from "/src/assets/images/login.png";
import logoutImg from "/src/assets/images/logout.png";
import popcorn from "/src/assets/images/popcorn.png";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Header() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState({
    mem_no: "",
    mem_id: "",
    mem_name: "",
    mem_class: "",
    auth: false,
  });

  function handleClose() {
    setLoading(false);
    setShow(false);
  }
  function handleShow() {
    setLoading(true);
    setShow(true);
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
          <Button variant="secondary" onClick={Logout} className="loginBtn">
            <img src={loginImg} className="loginImg" />
          </Button>
          <Button variant="primary" onClick={handleShow} className="loginBtn">
            <img src={logoutImg} className="loginImg" />
          </Button>
          <Login show={show} onHide={handleClose} />
        </div>
      </div>
    </header>
  );
}
