import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(false);

	// 로그인 처리 로직
	const handleLogin = async (data) => {
		await axios({
			url: "http://localhost:8080/user/login",
			method: "post",
			withCredentials: true,
			data: {
				mem_id: data.mem_id,
				pwd: data.pwd,
			},
		}).then((response) => {
			if (response.status === 200) {
				if (response.data.common.res_code === 200) {
					navigate("/");
				} else {
					alert("ID 혹은 비밀번호가 일치하지 않습니다.");
				}
			} else {
				alert(response.status);
			}
		});
	};

	return (
		<>
			<div>
				<form onSubmit={handleSubmit(handleLogin)}>
					<h2>Login</h2>
					<label>ID</label>
					<input {...register("mem_id", { required: true })} />
					{errors.mem_id && <p>ID를 입력하세요</p>}
					<label>Password</label>
					<input type="password" {...register("pwd", { required: true })} />
					{errors.pwd && <p>비밀번호를 입력하세요</p>}
					<input type="submit" />
				</form>
			</div>
		</>
	);
}
