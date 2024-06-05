import axios from "axios";
import { useLoaderData , useNavigate  } from "react-router-dom";
import "../assets/css/BoardDetail.css";
import { extractDateOnly } from "../util/functionUtil";
import { useUserState } from "../contexts/UserContext.jsx";

export default function NotiDetail() {
  const response = useLoaderData();
  const notiDetail = response.notiDetail;
  const navigate = useNavigate();
  const [userContext] = useUserState();

  const isUserAdmin = userContext && userContext.mem_class == 9;

  function goNotiBoard(){
    navigate('/noti');
  }

  async function deleteNoti(noti_no){
    await axios({
      method: "post",
      url: "http://localhost:8080/manage/deleteNoti",
      withCredentials: true,
      data: {
       noti_no : noti_no,
      }
  }). then((response) => {
    if (response.status === 200) return response.data;
  })
  .then((result) => {
    if (result.common.res_code === 200) {
      alert("공지가 삭제되었습니다.");
      navigate("/noti");
    } else {
      console.log("공지 삭제 실패");
    }
  });
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
          {isUserAdmin && <button onClick={() => deleteNoti(notiDetail.noti_no)}>삭제하기</button>}
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
