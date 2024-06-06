import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "../assets/css/DetailPage.css";
import Compare from "../components/Compare.jsx";
import Review from "../components/Review.jsx";
import ScrollToTop from "../util/ScrollToTop.js";
export default function MovieDetails() {
	const response = useLoaderData();
	const [show, setShow] = useState(false);
	const movieData = response.movieData;
	const reviewData = response.reviewData;

	function handleReviewSubmit() {}

	function handleClose() {
		setShow(false);
	}
	function handleShow() {
		setShow(true);
	}

	ScrollToTop();

	return (
		<>
			<Compare show={show} onHide={handleClose} movieData={movieData} />
			<div className="detail_container">
				<div className="wrapper">
					<div className="movieInfoWrapper">
						<div className="PosterWrapper">
							<div className="introWrapper">
								<h2 className="title">{movieData.mov_title}</h2>
								<h3 className="titleEng">{movieData.mov_titleEng}</h3>

								<div className="intro">{movieData.mov_intro}</div>
							</div>
							<div className="poster_box">
								<img
									className="poster"
									src={movieData.mov_posterURL}
									alt={movieData.mov_title}
								/>
								<button className="compareBtn" onClick={handleShow}>
									상영시간표 비교하기
								</button>
							</div>
						</div>
					</div>

					<div className="movieDetailWrapper">
						<strong className="detailInfo">상세정보</strong>
						<div
							className={`status ${
								movieData.mov_state === 1 ? "screening" : "toBeScreen"
							}`}>
							{movieData.mov_state === 1 ? "상영중" : "개봉예정"}
							{movieData.mov_state === 1
								? null
								: " (" + movieData.mov_dday + ")"}
						</div>
						<div className="director">
							<strong>감독 : </strong>
							{movieData.mov_director}
						</div>
						<div className="actor">
							<strong>배우 : </strong>
							{movieData.mov_actor}
						</div>
						<div className="genre">
							<strong>장르 : </strong>
							{movieData.mov_genre}
						</div>
						<div className="date">
							<strong>개봉일 : </strong>
							{movieData.mov_date}
						</div>
						<div className="etcInfo">
							{movieData.mov_nation} | {movieData.mov_runtime} |{" "}
							{movieData.mov_rating}
						</div>
					</div>

					<div className="reviewWrapper">
						<strong>관람평</strong>
						<span style={{ fontSize: "40px", marginLeft: "10px" }}>
							{movieData.reviewCnt > 0 ? `( ${movieData.reviewCnt} )` : ""}
						</span>
						<Review
							mov_no={movieData.mov_no}
							onSubmit={handleReviewSubmit}
							reviewList={reviewData}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export async function loader({ params }) {
	const detailRes = await axios({
		method: "get",
		url: "http://localhost:8080/detail/getDetailInfo/" + params.mov_no,
		withCredentials: true,
	}).then((response) => {
		return response.data.data.detailInfo;
	});
	const reviewRes = await axios({
		method: "get",
		url: "http://localhost:8080/detail/getReview/" + params.mov_no,
		withCredentials: true,
	}).then((response) => {
		return response.data.data.reviewList;
	});

	const resData = { movieData: detailRes, reviewData: reviewRes };
	return resData;
}
