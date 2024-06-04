import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import "../assets/css/BoardDetail.css";
import { extractDateOnly } from "../util/functionUtil";

export default function NotiDetail() {
  const response = useLoaderData();
  const qnaDetail = response.qnaDetail;
  const navigate = useNavigate();

  function goNotiBoard() {
    navigate("/qna");
  }

  return (
    <div className="boardDetail-container">
      <strong className="board-header">Q&A</strong>
      <div className="boardDetail-table">
        <div className="boardDetail-column">
          <strong className="boardDetail-th title">제목</strong>
          <strong className="boardDetail-td title">
            {qnaDetail.qes_title}
          </strong>
        </div>
        <div className="boardDetail-column">
          <span className="boardDetail-th">작성자</span>
          <span className="boardDetail-td">{qnaDetail.qes_mem_name}</span>
        </div>
        <div className="boardDetail-column">
          <span className="boardDetail-th">작성일</span>
          <span className="boardDetail-td">
            {extractDateOnly(qnaDetail.qes_reg_date)}
          </span>
        </div>
        <div className="boardDetail-column">
          <span className="boardDetail-th">내용</span>
          <span className="boardDetail-td">{qnaDetail.qes_content}</span>
        </div>
        {qnaDetail.ans_mem_no != null && (
          <div className="qna_answer">
            <div className="boardDetail-column">
              <span className="boardDetail-th">답변자</span>
              <span className="boardDetail-td">{qnaDetail.ans_mem_name}</span>
            </div>
            <div className="boardDetail-column">
              <span className="boardDetail-th">답변인</span>
              <span className="boardDetail-td">{extractDateOnly(qnaDetail.ans_reg_date)}</span>
            </div>
            <div className="boardDetail-column">
              <span className="boardDetail-th">답변내용</span>
              <span className="boardDetail-td">{qnaDetail.ans_content}</span>
            </div>
          </div>
        )}
        <div className="goBoardBtn">
          <button onClick={() => goNotiBoard()}>목록으로</button>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const qnaDetail = await axios({
    method: "get",
    url: "http://localhost:8080/board/detailQna/" + params.qna_no,
    withCredentials: true,
  }).then((response) => {
    return response.data.data.detailQna;
  });

  const resData = { qnaDetail: qnaDetail };
  return resData;
}
