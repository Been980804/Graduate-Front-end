import React, { useState } from "react";
import "../assets/css/Review.css";
import axios from "axios";
import basket from "/src/assets/images/basket.png";

export default function ReviewForm({ mov_no, mem_no, onSubmit }) {
  const [score, setScore] = useState(0);
  const [reviewContent, setReviewContent] = useState("");

  const handleStarClick = (index) => {
    setScore(index + 1);
  };

  const handleReviewSubmit = async (data) => {
    if (score === 0 || reviewContent.trim() === "") {
      alert("별점과 리뷰를 모두 입력해주세요.");
      return;
    }

    // const reviewData = {
    //   mov_no,
    //   mem_no,
    //   score,
    //   reviewContent,
    // };
    // onSubmit() =
    // axios({
    //   url: "http://localhost:8080/detail/createReview",
    //   method: "post",
    //   withCredentials: true,
    //   data:{
    //     mov_no: mov_no,
    //     mem_no: mem_no,
    //     score: data.score,
    //     reviewContent: data.reviewContent,
    //   }

    // }).then((response) => {
    //     console.log('리뷰작성 완료');
    // })

    // 초기화
    setScore(0);
    setReviewContent("");
  };

  return (
    <div className="review_form">
      <div className="review_body">
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <span
              className={`star ${
                index < score ? "after_click" : "before_click"
              }`}
              key={index}
              onClick={() => handleStarClick(index)}
            >
              ★
            </span>
          ))}
          <div className="starCnt">{score}</div>
        </div>
        <div className="review_content">
          <input
            placeholder="리뷰를 작성해주세요."
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          ></input>
        </div>
        <div className="review_buttonBox">
          <button onClick={handleReviewSubmit} className="reviewBtn">
            확인
          </button>
        </div>
      </div>
      <div className="reviewList">
        {/* for문 돌려서 모든 리뷰 출력 */}
        <div className="reviewUser">
          <div className="userName">회원명</div>
          <div className="userId">회원</div>
        </div>
        <div className="reviewContent">
          <div className="reviewText">리뷰내용 출력(별점, 내용)</div>
          {/* 관리자 or 자기가 작성한 글일 경우 보임 */}
          <div className="reviewDelete">
            <img src={basket} />
          </div>
        </div>
      </div>
    </div>
  );
}
