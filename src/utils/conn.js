export default async function conn(method, url, data) {
	try {
		const response = await axios({
			method: method,
			url: "http://localhost:8080" + url,
			withCredentials: true,
			data: { data },
		}).then((response) => {
			return { state: response.status, data: response.data.data };
		});
		return response;
	} catch (e) {}
	return null;
}
