import { useNavigate } from "react-router-dom";

export default function ModInfoPage() {
	const navigate = useNavigate();
	const {
		state: {
			response: { mem_id, mem_name, mem_phone, mem_email, mem_birth },
		},
	} = useLocation();

	return (
		<>
			<form>
				<input value={mem_id} />
			</form>
		</>
	);
}
