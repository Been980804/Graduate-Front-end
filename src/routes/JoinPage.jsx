// http://localhost:8080/user/join
import axios from "axios";
import { Form, useForm } from "react-hook-form";

export default function JoinPage() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	async function handleJoin(data) {
		await axios({
			method: "post",
			url: "http://localhost:8080/user/signup",
			withCredentials: true,
			data: {
				mem_name: data.name,
				mem_id: data.id,
				mem_pwd: data.pwd,
				mem_phone: data.phone,
				mem_birth: data.birth,
				mem_email: data.email,
			},
		}).then((response) => {});
	}
	return (
		<>
			<div className="form-wrapper" onSubmit={handleSubmit(handleJoin)}>
				<Form onSubmit={handleSubmit} className="info">
					<div>
						<label>id</label>
						<input className="id" {...register("id", { required: true })} />
					</div>
					<div>
						<label>비밀번호</label>
						<input
							className="pwd"
							type="password"
							{...register("pwd", { required: true })}
						/>
					</div>
					<div>
						<label>비밀번호 확인</label>
						<input
							className="pwd-confirm"
							type="password"
							{...register("pwd_confirm", { required: true })}
						/>
					</div>
					<div>
						<label>이름</label>
						<input className="name" {...register("name", { required: true })} />
					</div>
					<div className="phone-wrapper">
						<label>전화번호</label>
						<input className="phone" maxLength={13} {...register("phone")} />
					</div>
					<div>
						<label>이메일</label>
						<input className="email" type="email" {...register("email")} />
					</div>
					<div>
						<label>생년월일</label>
						<input className="birth" type="date" {...register("birth")} />
					</div>
					<button>가입</button>
				</Form>
			</div>
		</>
	);
}
