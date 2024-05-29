// http://localhost:8080/user/login
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function Login() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const onSubmit = (data) => {
		axios({
			method: "post",
			url: "http://localhost:8080/user/login",
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
				return;
			}
		});
	};

	return (
		<>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
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
