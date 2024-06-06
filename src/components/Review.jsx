import axios from "axios";
import React, { useState } from "react";
import "../assets/css/Review.css";
import basket from "../assets/images/basket.png";
import { useUserState } from "../contexts/UserContext.jsx";

export default function Review({ mov_no, ...reviewList }) {
  const [score, setScore] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [userContext] = useUserState();

  const isUserAdmin = userContext && userContext.mem_class == 9;

  const handleStarClick = (index) => {
    setScore(index + 1);
  };

  const handleReviewSubmit = async (data) => {
    if (score === 0 || reviewContent.trim() === "") {
      alert("별점과 리뷰를 모두 입력해주세요.");
      return;
    }

    await axios({
      method: "post",
      url: "http://localhost:8080/detail/createReview",
      withCredentials: true,
      data: {
        mem_no: userContext.mem_no,
        mov_no,
        rev_rating: score,
        rev_content: reviewContent,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.data;
      })
      .then((result) => {
        if (result.common.res_code === 200) {
          alert("리뷰가 작성되었습니다.");
          window.location.reload();
        } else {
          console.log("리뷰 작성 실패");
        }
      });

    // 초기화
    setScore(0);
    setReviewContent("");
  };

  async function deleteReview(review) {
    if (userContext.mem_class == 9) {
      // 관리자 삭제
      await axios({
        method: "post",
        url: "http://localhost:8080/manage/manageReview",
        withCredentials: true,
        data: {
          rev_no: review.rev_no,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.data;
        })
        .then((result) => {
          if (result.common.res_code === 200) {
            alert("관리자 권한으로 리뷰가 삭제되었습니다.");
          } else {
            console.log("리뷰 삭제 실패(관리자)");
          }
        });
    } else {
      // 유저 삭제
      await axios({
        method: "post",
        url: "http://localhost:8080/detail/deleteReview",
        withCredentials: true,
        data: {
          rev_no: review.rev_no,
          mov_no,
          mem_no: userContext.mem_no,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.data;
        })
        .then((result) => {
          if (result.common.res_code === 200) {
            alert("리뷰가 삭제되었습니다.");
          } else {
            console.log("리뷰 삭제 실패");
          }
        });
    }
  }
  const reviews = reviewList.reviewList;
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
            const isCurrentUserAuthor =
              userContext && userContext.mem_no === review.mem_no;
            return (
              <>
                <div className="reviewItem">
                  <div className="reviewUser">
                    <div className="userName">{review.mem_name}</div>
                    <div className="userId">{review.mem_id}</div>
                  </div>
                  <div className="review_box">
                    <div className="reviewText">
                      <div className="reviewRating">
                        별점 : {review.rev_rating}
                      </div>
                      <div className="reviewContent">{review.rev_content}</div>
                    </div>
                    <div className="reviewDate">{review.reg_date}</div>
                    <div className="reviewDelete">
                      {(isUserAdmin || isCurrentUserAuthor) && (
                        <img
                          src={basket}
                          onClick={() => deleteReview(review)}
                        />
                      )}
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
