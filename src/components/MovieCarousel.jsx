import axios from "axios";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link, useLoaderData } from "react-router-dom";
import "../assets/css/MovieCarousel.css";

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
							<Link to={`/details/${movie.mov_no}`} key={movie.mov_no}>
								<div className="ImageWrapper">
									<img
										className="movieBanner"
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
	let res;
	await axios({
		url: "http://localhost:8080/main/screening",
		method: "get",
		withCredentials: true,
	}).then((response) => (res = response.data.data.screeningList));

	return res;
}
