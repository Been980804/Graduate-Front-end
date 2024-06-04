import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import "../assets/css/Footer.css";

export default function Footer() {
  const response = useLoaderData();
  const notiList = response.notiList;
  const qnaList = response.qnaList;
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-board">
          <div className="goBoardView_noti">
            <strong>+ 더 보기</strong> {/* 공지사항 게시판으로 navigate */}
          </div>
          <div className="footer-board-title">
            <strong>NOTICE</strong>
          </div>
          {notiList &&
            notiList.map((noti) => (
              <Link to="#" key={noti.noti_no} className="board-link">
                <ul className="board-info">
                  {/* 각각의 상세보기 */}
                  <li className="board-info-title">{noti.noti_title}</li>
                  <li className="board-info-date">{noti.reg_date}</li>
                </ul>
              </Link>
            ))}
        </div>

        <div className="footer-board">
          <div className="goBoardView_qna">
            <strong>+ 더 보기</strong> {/* 문의사항 게시판으로 navigate */}
          </div>
          <div className="footer-board-title">
            <strong>Q&A</strong>
          </div>
          {qnaList &&
            qnaList.map((qna) => (
              <Link to="#" key={qna.qna_no} className="board-link">
                <ul className="board-info">
                  {/* 각각의 상세보기 */}
                  <li className="board-info-title">{qna.qes_title}</li>
                  <li className="board-info-date">{qna.qes_reg_date}</li>
                </ul>
              </Link>
            ))}
        </div>
      </div>
    </footer>
  );
}

export async function loader() {
  const notiList = await axios({
    url: "http://localhost:8080/common/currentNoti",
    method: "get",
    withCredentials: true,
  }).then((response) => {
    return response.data.data.notiList;
  });
  const qnaList = await axios({
    url: "http://localhost:8080/common/currentQna",
    method: "get",
    withCredentials: true,
  }).then((response) => {
    return response.data.data.qnaList;
  });

  const resData = {
    notiList: notiList,
    qnaList: qnaList,
  };

  return resData;
}
