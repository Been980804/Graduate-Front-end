import axios from "axios";

export default function Logout() {
	async function handleLogout() {
		await axios({
			method: "post",
			url: "http://localhost:8080/user/logout",
			withCredentials: true,
		})
			.then((response) => {
				if (response.status === 200) return response.data;
			})
			.then((result) => {
				if (result.common.res_code === 200) return console.log(result.common);
			});
	}
	handleLogout();
}
