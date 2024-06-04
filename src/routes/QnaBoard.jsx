import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import "../assets/css/Board.css";
import { extractDateOnly } from "../util/dateUtils";

export default function QnaBoard() {
  const response = useLoaderData();
  const qnaList = response.qnaList;

  return (
    <div className="board-container">
      <strong className="board-header">Q&A</strong>
      <div className="board-table">
        <div className="board-table-header">
          <div className="board-num">번호</div>
          <div className="board-title">제목</div>
          <div className="board-user">작성자</div>
          <div className="board-regDate">작성일</div>
        </div>
        {qnaList &&
          qnaList.map((qna, idx) => {
            return (
              <div className="board-column" key={qna.qna_no}>
                <div className="board-num">{idx + 1}</div>
                <div className="board-title">{qna.qes_title}</div>
                <div className="board-user">{qna.mem_name}</div>
                <div className="board-regDate">
                  {extractDateOnly(qna.reg_date)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export async function loader() {
  const qnaList = await axios({
    url: "http://localhost:8080/board/qnaList",
    method: "get",
    withCredentials: true,
  }).then((res) => {
    return res.data.data.qnaList;
  });

  const resData = { qnaList: qnaList };
  return resData;
}
