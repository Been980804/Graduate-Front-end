import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link, useLoaderData } from "react-router-dom";
import "../css/MovieCarousel.css";

export default function MovieCarousel() {
	const [index, setIndex] = useState(0);
	const movies = useLoaderData();

	function handleSelect(selectedIndex) {
		setIndex(selectedIndex);
	}

	return (
		<Carousel
			className="ItemWrapper"
			activeIndex={index}
			onSelect={handleSelect}>
			{movies &&
				movies.map((movie) => {
					return (
						<Carousel.Item key={movie.mov_no}>
							<Link to={`/movies/detail/${movie.mov_no}`} key={movie.mov_no}>
								<div className="ImageWrapper">
									<img
										src={movie.mov_posterURL}
										alt={movie.mov_no}
										key={movie.mov_no}
									/>
								</div>
							</Link>
						</Carousel.Item>
					);
				})}
		</Carousel>
	);
}

export async function loader() {
	const response = await fetch("http://localhost:8080/main/posterURL");
	const resData = await response.json();
	return resData.data.posterURLList;
}
