import conn from "../utils/conn";

export default function SearchPage() {
	const data = { mem_id: "smpark", pwd: "1234" };
	conn("post", "/user/login", data);

	return (
		<>
			<div></div>
		</>
	);
}
