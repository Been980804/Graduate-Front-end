import axios from "axios";

export default async function auth() {
	let res;
	await axios({
		method: "get",
		url: "http://localhost:8080/user/auth",
		withCredentials: true,
		data: {},
	}).then((response) => {
		res = response;
	});
	const resData = res.data.data;
	console.log(resData);
	return resData;
}
