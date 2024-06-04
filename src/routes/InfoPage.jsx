import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import "../assets/css/InfoPage.css";

export default function InfoPage() {
  const response = useLoaderData().data.data.userInfo;
  const navigate = useNavigate();

  function handleEdit() {
    navigate("/info/mod", { state: { response } });
  }

  return (
    <>
	<div className="info-wrapper">
      <div className="info-box">
		<div  className="userInfo">회원 정보 조회</div>
        <ul className="userInfo-ul">
          <li className="info-li">
            <label className="id li-label">아이디</label>
            <p className="li-p">{response.mem_id}</p>
          </li>
		  <li className="info-li">
          <label className="name li-label">이름</label>
          <p className="li-p">{response.mem_name}</p>
		  </li>
		  <li className="info-li">
          <label className="phone li-label">전화번호</label>
          <p className="li-p">{response.mem_phone}</p>
		  </li>
		  <li className="info-li">
          <label className="email li-label">이메일</label>
          <p className="li-p">{response.mem_email}</p>
		  </li>
		  <li className="info-li">
          <label className="birth li-label">생일</label>
          <p className="li-p">{response.mem_birth}</p>
		  </li>
          <button className="goModiBtn" onClick={handleEdit}>수정</button>
        </ul>
      </div>
	  </div>
    </>
  );
}

export async function loader() {
  let res;
  await axios({
    url: "http://localhost:8080/user/userInfo",
    method: "get",
    data: {},
    withCredentials: true,
  }).then((response) => {
    res = response;
  });
  return res;
}
