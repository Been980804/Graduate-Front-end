import axios from "axios";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link, useLoaderData } from "react-router-dom";
import "../assets/css/MovieCarousel.css";
import { truncateTitle } from "../util/functionUtil";

export default function MovieCarousel() {
  const [index, setIndex] = useState(0);
  const response = useLoaderData();
  const screeningList = response.screeningList;
  const boxofficeList = response.boxofficeList;
  const toBeScreenedList = response.toBeScreenedList;
  function handleSelect(selectedIndex) {
    setIndex(selectedIndex);
  }


  return (
    <>
      <Carousel
        className="ItemWrapper"
        activeIndex={index}
        onSelect={handleSelect}
      >
        {boxofficeList &&
          boxofficeList.map((boxoffice) => {
            return (
              <Carousel.Item key={boxoffice.mov_no}>
                <Link
                  to={`/details/${boxoffice.mov_no}`}
                  key={boxoffice.mov_no}
                >
                  <div className="ImageWrapper">
                    <img
                      className="movieBanner"
                      src={boxoffice.mov_posterURL}
                      alt={boxoffice.mov_no}
                      key={boxoffice.mov_no}
                    />
                  </div>
                </Link>
              </Carousel.Item>
            );
          })}
      </Carousel>

      <h2 className="movieTop5">
        현재 상영작 Top5
      </h2>
      <div className="movie_grid">
        {screeningList &&
          screeningList.map((screening, idx) => {
            return (
              <Link to={`/details/${screening.mov_no}`} key={screening.mov_no}>
                <div>
                  <span
                    className="rankImg"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0.9) 100%),
				   url(${screening.mov_posterURL})`,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="rankTitle">{truncateTitle(screening.mov_title)}</span>
                </div>
              </Link>
            );
          })}
      </div>

      <h2 className="movieTop5">
        상영 예정작 Top5
      </h2>
      <div className="movie_grid">
        {toBeScreenedList &&
          toBeScreenedList.map((toBeScreened, idx) => {
            return (
              <Link
                to={`/details/${toBeScreened.mov_no}`}
                key={toBeScreened.mov_no}
              >
                <div>
                  <span
                    className="rankImg"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 0, 0, 0.9) 100%),
				   url(${toBeScreened.mov_posterURL})`,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="rankTitle">{truncateTitle(toBeScreened.mov_title)}</span>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}

export async function loader() {
  const boxofficeList = await axios({
    url: "http://localhost:8080/main/posterURL",
    method: "get",
    withCredentials: true,
  }).then((response) => {
    return response.data.data.posterURLList;
  });
  const screeningList = await axios({
    url: "http://localhost:8080/main/screening",
    method: "get",
    withCredentials: true,
  }).then((response) => {
    return response.data.data.screeningList;
  });
  const toBeScreenedList = await axios({
    url: "http://localhost:8080/main/toBeScreened",
    method: "get",
    withCredentials: true,
  }).then((response) => {
    return response.data.data.toBeScreenedList;
  });

  const resData = {
    boxofficeList: boxofficeList,
    screeningList: screeningList,
    toBeScreenedList: toBeScreenedList,
  };

  return resData;
}
