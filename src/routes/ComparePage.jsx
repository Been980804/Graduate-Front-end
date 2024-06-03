import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useLocation } from "react-router-dom";
import Schedule from "../components/Schedule";
import cgv_logo from "/src/assets/images/CGV_logo.png";
import lotte_logo from "/src/assets/images/LotteCinema_logo.png";
import mega_logo from "/src/assets/images/MegaBox_logo.png";

export default function ComparePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [schedule, setSchedule] = useState([]);

  const params = useParams();
  const location = useLocation();
  const { movieInfo } = location.state;

  async function handleClick(data) {
    const scheduleRes = await axios({
      method: "post",
      url: "http://localhost:8080/schedule/compare",
      data: {
        mov_no: params.mov_no,
        sch_date: data.date,
        th_region: data.region,
      },
      withCredentials: true,
    }).then((response) => response.data.data.scheduleList);
    setSchedule(scheduleRes);
  }

  return (
    <>
      <div className="wrapper">
        <div className="movieInfoWrapper">
          <div className="PosterWrapper">
            <div className="introWrapper">
              <h2 className="title">{movieInfo.mov_title}</h2>
              <h3 className="titleEng">{movieInfo.mov_titleEng}</h3>
              <div className="intro">{movieInfo.mov_intro}</div>
            </div>
          </div>
          <img
            className="poster"
            src={movieInfo.mov_posterURL}
            alt={movieInfo.mov_title}
          />
        </div>

        <form>
          <label>지역을 선택하세요</label>
          <select
            id="region"
            className="region"
            {...register("region", { required: true })}
          >
            <option value={"부평구"}>부평구</option>
            <option value={"서구"}>서구</option>
          </select>
          <label>요일 선택</label>
          <input type="date" {...register("date", { required: true })} />
          <button onClick={handleSubmit(handleClick)}>검색</button>
        </form>
        {/* <img src={cgv_logo}/> */}
        <Schedule schedules={schedule} th_brand="1" />
        {/* <img src={lotte_logo}/> */}
        <Schedule schedules={schedule} th_brand="2" />
        {/* <img src={mega_logo}/> */}
        <Schedule schedules={schedule} th_brand="3" />
      </div>
    </>
  );
}

export async function loader() {
  return null;
}
