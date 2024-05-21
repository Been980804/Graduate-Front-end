import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "../css/MovieCarousel.css";

export default function MovieCarousel() {
	const [index, setIndex] = useState(0);

	function handleSelect(selectedIndex) {
		setIndex(selectedIndex);
	}

	return (
		<Carousel className="MovieWrapper" activeIndex={index} onSelect={handleSelect}>
			<Carousel.Item>
				<Link to={"/movie/1"}>
					<img
						src={"http://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88214/88214_1000.jpg"}
					></img>
				</Link>
			</Carousel.Item>
			<Carousel.Item>
				<Link to={"movie/2"}>
					<img
						src={"http://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88148/88148_1000.jpg"}
					></img>
				</Link>
			</Carousel.Item>
			<Link to={"movie/3"}>
				<Carousel.Item>
					<img
						src={"http://img.cgv.co.kr/Movie/Thumbnail/Poster/000088/88104/88104_1000.jpg"}
					></img>
				</Carousel.Item>
			</Link>
		</Carousel>
	);
}
