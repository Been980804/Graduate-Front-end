import React from "react";
import { useLoaderData } from "react-router-dom";

export default function MovieDetails() {
	const movieData = useLoaderData();
	return (
		<>
			<div className="container">
				<div className="wrapper">
					<div className="PosterWrapper">
						<img
							className="poster"
							src={movieData.mov_posterURL}
							alt={movieData.mov_title}
						/>
					</div>
					<h2 className="title">{movieData.mov_title}</h2>
					<h3 className="titleEng">{movieData.mov_titleEng}</h3>
					<div className="director">{movieData.mov_director}</div>
					<div className="actor">{movieData.mov_actor}</div>
					<div className="status">
						{movieData.mov_state === 1 ? "상영중" : "개봉예정"}
					</div>
					<div className="untilRelease">
						{movieData.mov_state === 1
							? null
							: "개봉까지 " + movieData.mov_dday + "일 남았습니다."}
					</div>
					<div className="nation">{movieData.mov_nation}</div>
					<div className="company">{movieData.mov_company}</div>
					<div className="runtime">{movieData.mov_runtime}</div>
					<div className="rating">{movieData.mov_rating}</div>
					<div className="genre">{movieData.mov_genre}</div>
				</div>
			</div>
		</>
	);
}

export async function loader({ params }) {
	const response = await fetch(
		"http://localhost:8080/movies/detail/" + params.mov_no
	);
	const resData = await response.json();
	return resData;
}
