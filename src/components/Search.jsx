import axios from "axios";
import { useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../assets/css/Search.css";

export default function Search({ ref }) {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();
	useImperativeHandle(ref, () => {
		reset();
	});
	async function handleSearch(data) {
		const search = data.title || "all";
		await axios({
			method: "get",
			url: `http://localhost:8080/common/search/${search}`,
			withCredentials: true,
		})
			.then((response) => {
				if (response.status === 200) return response.data;
			})
			.then((result) => {
				if (result.common.res_code === 200) return result.data;
			})
			.then((movList) => {
				navigate(`/search?title=${search}`, { state: movList });
			});
	}
	return (
		<>
			<form onSubmit={handleSubmit(handleSearch)}>
				<input
					className="searchInput"
					{...register("title", { required: false })}
				/>
				<button type="submit" className="searchBtn">
					Search
				</button>
			</form>
		</>
	);
}
