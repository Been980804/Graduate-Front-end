import { useState } from "react";
import "../assets/css/Schedule.css";

export default function Schedule({ schedules, th_brand }) {
  let url;
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
      url = "http://www.cgv.co.kr/ticket/";
      break;
    case 2:
      url = "https://www.lottecinema.co.kr/NLCHS/Ticketing";
      break;
    case 3:
      url = "https://www.megabox.co.kr/booking";
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
      {Object.keys(theaters).map((theaterKey) => {
        const brand = parseInt(theaterKey.split("_")[0]);
        const theaterName = theaterKey.split("_")[1];
        if (brand === th_brand) {
          return (
            <div
              key={theaterKey}
              className="theaterWrapper"
              onClick={() => window.open(url)}
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
