import React, { useState } from "react";
import "../assets/css/Review.css";
import basket from "../assets/images/basket.png";
export default function ReviewForm({ ...reviewList }) {
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
  const reviews = reviewList.reviewList;
  console.log(reviews);
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
        {reviews &&
          reviews.map((review) => {
            return (
              <>
                <div className="reviewItem">
                  <div className="reviewUser">
                    <div className="userName">{review.mem_name}</div>
                    <div className="userId">{review.mem_id}</div>
                  </div>
                  <div className="review_box">
                    <div className="reviewText">
                      <div className="reviewRating">별점 : {review.rev_rating}</div>
                      <div className="reviewContent">{review.rev_content}</div>
                    </div>
                  <div className="reviewDelete">
                    <img src={basket} />
                  </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
