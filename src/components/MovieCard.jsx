import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../assets/css/MovieCard.css";
import { truncateTitle } from "../util/functionUtil";

export default function MovieCard({ mov }) {

	return (
		<Card>
			<Link to={"/details/" + mov.mov_no}>
				<Card.Img src={mov.mov_posterURL}></Card.Img>
				<Card.Body>
					<Card.Title>{truncateTitle(mov.mov_title)}</Card.Title>
				</Card.Body>
			</Link>
		</Card>
	);
}
