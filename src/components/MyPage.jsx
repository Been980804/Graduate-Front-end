import { useLocation } from "react-router-dom";

export default function MyPage() {
	const location = useLocation();
	console.log(location);
	return (
		<>
			<div>{location.state?.userName}</div>
		</>
	);
}
