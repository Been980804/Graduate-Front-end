import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLoaderData } from "react-router-dom";
import logo from "../assets/logo.png";
import "../css/Header.css";
import Search from "./Search";
export default function Header() {
	const user = useLoaderData();

	return (
		<>
			<header>
				<div className="header-container">
					<Link to={"/"}>
						<img src={logo} />
					</Link>

					<div className="search-container">
						<Search />
					</div>
				</div>
			</header>
		</>
	);
}

export async function loader() {
	return null;
}
