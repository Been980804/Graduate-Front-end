import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import "../assets/css/NotiBoard.css";

export default function NotiBoard() {
    const response = useLoaderData();
    const notiList = response.notiList;
  
    function extractDateOnly(dateString) {
      return dateString.split(" ")[0];
    }
  
    return (
      <div className="board-container">
        <strong className="board-title">공지사항</strong>
        <div className="board-table">
          <div className="board-table-header">
            <div className="noti-num">번호</div>
            <div className="noti-title">제목</div>
            <div className="noti-user">작성자</div>
            <div className="noti-cnt">조회수</div>
            <div className="noti-regDate">작성일</div>
          </div>
          {notiList &&
            notiList.map((noti, idx) => {
              return (
                <div className="noti-column" key={idx}>
                  <div className="noti-num">{idx + 1}</div>
                  <div className="noti-title">{noti.noti_title}</div>
                  <div className="noti-user">{noti.mem_name}</div>
                  <div className="noti-cnt">{noti.noti_cnt}</div>
                  <div className="noti-regDate">{extractDateOnly(noti.reg_date)}</div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  
export async function loader() {
  const notiList = await axios({
    url: "http://localhost:8080/board/notiList",
    method: "get",
    withCredentials: true,
  }).then((res) => {
    return res.data.data.notiList;
  });

  const resData = { notiList: notiList };
  return resData;
}
