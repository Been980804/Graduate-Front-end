import axios from "axios";

export default async function auth(method, url, data) {
	let res;
	await axios({
		method: method,
		url: "http://localhost:8080" + url,
		withCredentials: true,
		data: { ...data },
	}).then((response) => {
		res = response;
	});
	const resData = res.data.data;
	console.log(resData);
	return resData;
}
