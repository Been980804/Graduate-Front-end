import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../assets/css/MovieCard.css";
export default function MovieCard({ mov }) {
	console.log(mov);

	return (
		<Card>
			<Link to={"/details/" + mov.mov_no}>
				<Card.Img src={mov.mov_posterURL}></Card.Img>
				<Card.Body>
					<Card.Title>{mov.mov_title}</Card.Title>
				</Card.Body>
			</Link>
		</Card>
	);
}
