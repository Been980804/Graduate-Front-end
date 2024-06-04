import axios from "axios";
import { useLoaderData , useNavigate  } from "react-router-dom";
import "../assets/css/BoardDetail.css";
import { extractDateOnly } from "../util/functionUtil";

export default function NotiDetail() {
  const response = useLoaderData();
  const notiDetail = response.notiDetail;
  const navigate = useNavigate();

  function goNotiBoard(){
    navigate('/noti');
  }

  return (
    <div className="boardDetail-container">
      <strong className="board-header">공지사항</strong>
      <div className="boardDetail-table">
        <div className="boardDetail-column">
          <strong className="boardDetail-th title">제목</strong>
          <strong className="boardDetail-td title">
            {notiDetail.noti_title}
          </strong>
        </div>
        <div className="boardDetail-column">
          <span className="boardDetail-th">작성자</span>
          <span className="boardDetail-td">{notiDetail.mem_name}</span>
        </div>
        <div className="boardDetail-column">
          <span className="boardDetail-th">작성일</span>
          <span className="boardDetail-td">
            {extractDateOnly(notiDetail.reg_date)}
          </span>
        </div>
        <div className="boardDetail-column">
          <span className="boardDetail-th">내용</span>
          <span className="boardDetail-td content">
            {notiDetail.noti_content}
          </span>
        </div>
        <div className="goBoardBtn">
          <button onClick={() => goNotiBoard()}>목록으로</button>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const notiDetail = await axios({
    method: "get",
    url: "http://localhost:8080/board/detailNoti/" + params.noti_no,
    withCredentials: true,
  }).then((response) => {
    return response.data.data.detailNoti;
  });

  const resData = { notiDetail: notiDetail };
  return resData;
}
