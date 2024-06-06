import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "../assets/css/Board.css";
import Pagination from "../components/Pagination.jsx";
import Qna from "../components/Qna.jsx";
import { useUserState } from "../contexts/UserContext.jsx";

export default function QnaBoard() {
  const response = useLoaderData();
  const qnaList = response.qnaList;
  const [show, setShow] = useState(false);
  const [userContext] = useUserState();
  console.log(qnaList);

  function handleShow() {
    if (userContext.mem_no != "") {
      setShow(true);
    } else {
      alert("로그인 후 이용해주세요.");
    }
  }
  function handleClose() {
    setShow(false);
  }

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
        <Pagination items={qnaList} itemsPerPage={10} type={"qna"} />
      </div>
      <div className="boardBtn">
        <button onClick={handleShow}>문의하기</button>
        <Qna show={show} onHide={handleClose} />
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
