import { useState } from "react";
import "../assets/css/Schedule.css";
import cgv from "../assets/images/cgv_logo.png";
import lotte from "../assets/images/lottecinema_logo.png";
import mega from "../assets/images/megabox_logo.png";

export default function Schedule({ schedules, th_brand }) {
  let logo;
  let url;
  let style;
  const theaters = schedules.reduce((acc, obj) => {
    const key = `${obj.th_brand}_${obj.th_name}`;
    if (!acc[key]) {
      acc[key] = {};
    }
    if (!acc[key][obj.hall_name]) {
      acc[key][obj.hall_name] = [];
    }
    acc[key][obj.hall_name].push(obj);
    return acc;
  }, {});

  switch (th_brand) {
    case 1:
      if (Object.keys(theaters).some((key) => parseInt(key.split("_")[0]) === 1)) {
        logo = cgv;
        url = "http://www.cgv.co.kr/ticket/";
      } else {
        logo = null;
      }
      break;
    case 2:
      if (Object.keys(theaters).some((key) => parseInt(key.split("_")[0]) === 2)) {
        logo = lotte;
        url = "https://www.lottecinema.co.kr/NLCHS/Ticketing";
      } else {
        logo = null;
      }
      break;
    case 3:
      if (Object.keys(theaters).some((key) => parseInt(key.split("_")[0]) === 3)) {
        logo = mega;
        url = "https://www.megabox.co.kr/booking";
      } else {
        logo = null;
      }
      break;
    default:
      url = "";
      break;
  }

  const [hoveredSchedule, setHoveredSchedule] = useState(null);

  const handleMouseOver = (schedule) => {
    setHoveredSchedule(schedule);
  };

  const handleMouseOut = () => {
    setHoveredSchedule(null);
  };

  return (
    <div className="schedule_container">
      {logo && (
        <div className="logoWrapper" >
          <img src={logo} alt="Logo" className="brandLogo" style={{height:'70px'}}/>
        </div>
      )}
      {Object.keys(theaters).map((theaterKey) => {
        const brand = parseInt(theaterKey.split("_")[0]);
        const theaterName = theaterKey.split("_")[1];
        if (brand === th_brand) {
          return (
            <div
              key={theaterKey}
              className="theaterWrapper"
            >
              <div>
                <div className="theaterName">
                  <strong>{theaterName}</strong>
                </div>
                {Object.keys(theaters[theaterKey]).map((hallKey) => {
                  return (
                    <div key={hallKey} className="hallWrapper">
                      <div className="hallInfo">
                        <div className="hallName">{hallKey.split(" ")[0]}</div>
                        <div className="hallSeat">
                          총 {theaters[theaterKey][hallKey][0].hall_seats}
                        </div>
                      </div>
                      <div className="scheduleWrapper">
                        {theaters[theaterKey][hallKey].map((schedule) => {
                          return (
                            <div
                              key={schedule.id}
                              className="schedule"
                              onMouseOver={() => handleMouseOver(schedule)}
                              onMouseOut={handleMouseOut}
                              onClick={() => window.open(url)}
                            >
                              {hoveredSchedule === schedule
                                ? `${schedule.sch_start} ~ ${schedule.sch_end}`
                                : schedule.sch_start}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}
