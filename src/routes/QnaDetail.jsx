import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import "../assets/css/BoardDetail.css";
import { extractDateOnly } from "../util/functionUtil";
import { useUserState } from "../contexts/UserContext.jsx";
import QnaAnswer from "../components/QnaAnswer.jsx";
import { useState } from "react";

export default function NotiDetail() {
  const response = useLoaderData();
  const qnaDetail = response.qnaDetail;
  const navigate = useNavigate();
  const [userContext] = useUserState();
  const [show, setShow] = useState(false);

  const isUserAdmin = userContext && userContext.mem_class == 9;
  const isCurrentUserAuthor =
    userContext && userContext.mem_no === qnaDetail.qes_mem_no;

  function goNotiBoard() {
    navigate("/qna");
  }
  function qnaAnwer() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }
  async function deleteQna() {
    await axios({
      method: "post",
      url: "http://localhost:8080/board/deleteQna",
      withCredentials: true,
      data: {
        qes_mem_no: userContext.mem_no,
        qna_no: qnaDetail.qna_no,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.data;
      })
      .then((result) => {
        if (result.common.res_code === 200) {
          alert("문의가 삭제되었습니다.");
          navigate("/qna");
        } else {
          console.log("문의 삭제 실패");
        }
      });
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
              <span className="boardDetail-td">
                {extractDateOnly(qnaDetail.ans_reg_date)}
              </span>
            </div>
            <div className="boardDetail-column">
              <span className="boardDetail-th">답변내용</span>
              <span className="boardDetail-td">{qnaDetail.ans_content}</span>
            </div>
          </div>
        )}
        <div className="goBoardBtn">
          {isUserAdmin && <button onClick={() => qnaAnwer()}>답변하기</button>}
          <QnaAnswer show={show} onHide={handleClose} qna={qnaDetail} />
          {isCurrentUserAuthor && (
            <button onClick={() => deleteQna()}>삭제하기</button>
          )}
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
