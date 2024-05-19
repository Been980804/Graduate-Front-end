import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../css/Header.css";

export default function Header() {
	return (
		<>
			<header>
				<div className="header-container">
					<div>logo</div>
					<div className="search-container">
						<input></input>
						<Button>Search</Button>
					</div>
				</div>
			</header>
		</>
	);
}
