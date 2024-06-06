import { useLocation, useNavigate } from "react-router-dom";
export default function ModInfoPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const userInfo = location.state.response;
	console.log(userInfo);
	return (
		<div className="info-wrapper">
			<div className="info-box">
				<div className="userInfo">회원 정보 조회</div>
				<ul className="userInfo-ul">
					<li className="info-li">
						<label className="id li-label">아이디</label>
						<p className="li-p">{userInfo.mem_id}</p>
					</li>
					<li className="info-li">
						<label className="name li-label">이름</label>
						<p className="li-p">{userInfo.mem_name}</p>
					</li>
					<li className="info-li">
						<label className="phone li-label">전화번호</label>
						<p className="li-p">{userInfo.mem_phone}</p>
					</li>
					<li className="info-li">
						<label className="email li-label">이메일</label>
						<p className="li-p">{userInfo.mem_email}</p>
					</li>
					<li className="info-li">
						<label className="birth li-label">생일</label>
						<p className="li-p">{userInfo.mem_birth}</p>
					</li>
					<button className="goModiBtn" onClick={handleEdit}>
						수정
					</button>
				</ul>
			</div>
		</div>
	);
}
/*
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
	  */
