import axios from "axios";
import { useEffect, useState } from "react";
// 세션을 통해 사용자의 정보를 받아오고 인증하는 custom hook
export default function useAuth() {
	const [user, setUser] = useState({
		mem_no: "",
		mem_name: "",
		mem_class: "",
		mem_id: "",
	});
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		async function handleAuth() {
			await axios({
				method: "get",
				url: "http://localhost:8080/user/auth",
				withCredentials: true,
			})
				.then((response) => {
					if (response.status === 200) return response.data;
				})
				.then((result) => {
					if (result.common.res_code === 200) return result.data;
				})
				.then((userInfo) => {
					if (userInfo) {
						setUser({
							mem_no: userInfo.mem_no,
							mem_name: userInfo.mem_name,
							mem_class: userInfo.mem_class,
							mem_id: userInfo.mem_id,
						});
					}
				});
		}
		handleAuth();
	}, [isLoggedIn]);

	return user;
}
