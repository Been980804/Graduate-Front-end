import React from "react";
import { useLoaderData } from "react-router-dom";
import "../assets/css/DetailPage.css";

export default function MovieDetails() {
  const movieData = useLoaderData();
  return (
    <>
      <div className="detail_container">
        <div className="wrapper">
          <div className="movieInfoWrapper">
            <div className="PosterWrapper">
              <div className="introWrapper">
                <h2 className="title">{movieData.mov_title}</h2>
                <h3 className="titleEng">{movieData.mov_titleEng}</h3>
                <div className="like">좋아요들어갈 부분</div>
                <div className="intro">{movieData.mov_intro}</div>
              </div>
              <img
                className="poster"
                src={movieData.mov_posterURL}
                alt={movieData.mov_title}
              />
            </div>
          </div>

          <div className="movieDetailWrapper">
			<strong className="detailInfo">상세정보</strong>
            <div className={`status ${movieData.mov_state === 1 ? 'screening' : 'toBeScreen'}`}>
              {movieData.mov_state === 1 ? "상영중" : "개봉예정"}
              {movieData.mov_state === 1 ? null : " (" + movieData.mov_dday + ")"}
            </div>
            <div className="director"><strong>감독 : </strong>{movieData.mov_director}</div>
            <div className="actor"><strong>배우 : </strong>{movieData.mov_actor}</div>
            <div className="genre"><strong>장르 : </strong>{movieData.mov_genre}</div>
            <div className="date"><strong>개봉일 : </strong>{movieData.mov_date}</div>
            <div className="etcInfo">{movieData.mov_nation} | {movieData.mov_runtime} | {movieData.mov_rating}</div>
          </div>

		  <div className="reviewWrapper">
			리뷰부분
		  </div>
        </div>
      </div>
    </>
  );
}

export async function loader({ params }) {
  const response = await fetch(
    "http://localhost:8080/detail/getDetailInfo/" + params.mov_id
  );
  const resData = await response.json();
  return resData.data.detailInfo;
}
