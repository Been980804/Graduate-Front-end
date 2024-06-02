import { useState } from "react";
import Button from "react-bootstrap/Button";
import "../assets/css/Header.css";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
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
		<div>
			<div>
				<Button variant="primary" onClick={handleShow}>
					Login
				</Button>

				<Button variant="secondary" onClick={Logout}>
					Logout
				</Button>
			</div>
			<Login show={show} onHide={handleClose} />
		</div>
	);
}
