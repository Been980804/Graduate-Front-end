import axios from "axios";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import "../assets/css/Footer.css";
import { extractDateOnly } from "../util/functionUtil";

export default function Footer() {
  const response = useLoaderData();
  const notiList = response.notiList;
  const qnaList = response.qnaList;
  const navigate = useNavigate();

  function goNotiBoard() {
    navigate("/noti");
  }
  function goQnaBoard() {
    navigate("/qna");
  }

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-board">
          <div className="goBoardView_noti">
            <strong onClick={() => goNotiBoard()}>+ 더 보기</strong>{" "}
          </div>
          <div className="footer-board-title">
            <strong>NOTICE</strong>
          </div>
          {notiList &&
            notiList.map((noti) => (
              <Link
                to={`/detailNoti/${noti.noti_no}`}
                key={noti.noti_no}
                className="footer-board-link"
              >
                <ul className="board-info">
                  <li className="board-info-title">{noti.noti_title}</li>
                  <li className="board-info-date">
                    {extractDateOnly(noti.reg_date)}
                  </li>
                </ul>
              </Link>
            ))}
        </div>

        <div className="footer-board">
          <div className="goBoardView_qna">
            <strong onClick={() => goQnaBoard()}>+ 더 보기</strong>{" "}
          </div>
          <div className="footer-board-title">
            <strong>Q&A</strong>
          </div>
          {qnaList &&
            qnaList.map((qna) => (
              <Link
                to={`/detailQna/${qna.qna_no}`}
                key={qna.qna_no}
                className="footer-board-link"
              >
                <ul className="board-info">
                  <li className="board-info-title">{qna.qes_title}</li>
                  <li className="board-info-date">
                    {extractDateOnly(qna.qes_reg_date)}
                  </li>
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
