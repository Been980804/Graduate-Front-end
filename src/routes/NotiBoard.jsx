import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import "../assets/css/Board.css";

export default function NotiBoard() {
    const response = useLoaderData();
    const notiList = response.notiList;
  
    function extractDateOnly(dateString) {
      return dateString.split(" ")[0];
    }
  
    return (
      <div className="board-container">
        <strong className="board-header">공지사항</strong>
        <div className="board-table">
          <div className="board-table-header">
            <div className="board-num">번호</div>
            <div className="board-title">제목</div>
            <div className="board-user">작성자</div>
            <div className="board-cnt">조회수</div>
            <div className="board-regDate">작성일</div>
          </div>
          {notiList &&
            notiList.map((noti, idx) => {
              return (
                <div className="board-column" key={noti.noti_no}>
                  <div className="board-num">{idx + 1}</div>
                  <div className="board-title">{noti.noti_title}</div>
                  <div className="board-user">{noti.mem_name}</div>
                  <div className="board-cnt">{noti.noti_cnt}</div>
                  <div className="board-regDate">{extractDateOnly(noti.reg_date)}</div>
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
