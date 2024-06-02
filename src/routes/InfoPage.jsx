import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

export default function InfoPage() {
	const response = useLoaderData().data.data.userInfo;
	const navigate = useNavigate();

	function handleEdit() {
		navigate("/info/mod", { state: { response } });
	}

	return (
		<>
			<div className="info-wrapper">
				<label className="id">아이디</label>
				<p>{response.mem_id}</p>
				<label className="name">이름</label>
				<p>{response.mem_name}</p>
				<label className="phone">전화번호</label>
				<p>{response.mem_name}</p>
				<label className="email">이메일</label>
				<p>{response.mem_email}</p>
				<label className="birth">생일</label>
				<p>{response.mem_birth}</p>
				<button onClick={handleEdit}>수정</button>
			</div>
		</>
	);
}

export async function loader() {
	let res;
	await axios({
		url: "http://localhost:8080/user/userInfo",
		method: "get",
		data: {},
		withCredentials: true,
	}).then((response) => {
		res = response;
	});
	return res;
}
