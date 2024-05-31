import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";

export default function Logout() {
	const navigate = useNavigate();
	const handleLogout = async () => {
		axios({
			method: "post",
			url: "http://localhost:8080/user/logout",
			data: {},
			withCredentials: true,
		}).then((response) => {
			if (response.status === 200) {
				navigate("/");
			}
		});
	};

	useEffect(() => {
		handleLogout();
	});
	
	return null;
}
