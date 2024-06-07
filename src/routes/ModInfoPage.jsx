import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
export default function ModInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm();

  const userInfo = location.state.response;

  function validatePassword(mem_pwd, confirmPassword) {
    if (mem_pwd && confirmPassword && mem_pwd !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  }
  async function handleLogout() {
    await axios({
      method: "post",
      url: "http://localhost:8080/user/logout",
      data: {},
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200) return response.data;
        else return;
      })
      .then((result) => {
        if (result.common.res_code === 200) {
          sessionStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
          alert("Logout");
        }
      });
  }
  async function handleClick(data) {
    if (validatePassword(data.mem_pwd, data.mem_pwd_confirm)) {
      await axios({
        method: "put",
        url: "http://localhost:8080/user/modifyUserInfo",
        data: {
          mem_birth: data.mem_birth,
          mem_email: data.mem_email,
          mem_pwd: data.mem_pwd,
          mem_phone: data.mem_phone,
          mem_name: data.mem_name,
        },
        withCredentials: true,
      })
        .then((response) => {
          if (response.status === 200) return response.data;
          else return;
        })
        .then((result) => {
          if (result.common.res_code === 200) {
            alert("회원정보 수정 완료");
            handleLogout();
            navigate("/");
          } else return;
        });
    }
  }

  async function handleResign() {
    await axios({
      method: "post",
      url: "http://localhost:8080/user/deleteAccount",
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200) return response.data;
        else return;
      })
      .then((result) => {
        if (result.common.res_code === 200) {
          alert("탈퇴 완료");
          handleLogout();
          navigate("/");
        } else return;
      });
  }
  return (
    <div className="info-wrapper">
      <div className="info-box">
        <form onSubmit={handleSubmit(handleClick)}>
          <div className="userInfo">회원 정보 수정</div>
          <ul className="userInfo-ul">
            <li className="info-li">
              <label className="id li-label">아이디</label>
              <input
                disabled
                readOnly
                className="li-p"
                value={userInfo.mem_id}
              />
            </li>
            <li className="info-li">
              <label className="name li-label">비밀번호</label>
              <input
                type="password"
                {...register("mem_pwd", {
                  required: true,
                })}
                className="li-p"
              />
            </li>
            <li className="info-li">
              <label className="name li-label">비밀번호 확인</label>
              <input
                type="password"
                {...register("mem_pwd_confirm", {
                  required: true,
                })}
                className="li-p"
              />
            </li>
            <li className="info-li">
              <label className="name li-label">이름</label>
              <input
                {...register("mem_name", { required: true })}
                className="li-p"
                defaultValue={userInfo.mem_name}
              />
            </li>
            <li className="info-li">
              <label className="phone li-label">전화번호</label>
              <input
                type="tel"
                {...register("mem_phone", { required: true })}
                className="li-p"
                defaultValue={userInfo.mem_phone}
              />
            </li>
            <li className="info-li">
              <label className="email li-label">이메일</label>
              <input
                type="email"
                {...register("mem_email", { required: true })}
                className="li-p"
                defaultValue={userInfo.mem_email}
              />
            </li>
            <li className="info-li">
              <label className="birth li-label">생일</label>
              <input
                type="date"
                {...register("mem_birth", { required: true })}
                className="li-p"
                defaultValue={userInfo.mem_birth}
              />
            </li>
            <div style={{display:'flex', justifyContent:'right', marginTop: '20px'}}>
              <button onClick={handleResign} className="resignBtn">
                회원탈퇴
              </button>
              <button className="goModiBtn">완료</button>
            </div>
          </ul>
        </form>
      </div>
    </div>
  );
}
