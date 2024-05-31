import axios from "axios";
import { useForm } from "react-hook-form";

export default function Search() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	async function handleSearch(data) {
		await axios({
			url: "http://localhost:8080/common/search/" + data.title,
			method: "get",
		}).then((response) => {
			console.log(response);
		});
	}
	return (
		<>
			<form onSubmit={handleSubmit(handleSearch)}>
				<input {...register("title", { required: true })} />
				<button> Search</button>
			</form>
		</>
	);
}
