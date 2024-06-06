import axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../contexts/UserContext.jsx";

export default function QnaAnswer({ show, onHide, qna }) {
  const { register, handleSubmit , reset} = useForm();
  const navigate = useNavigate();
  const [userContext] = useUserState();

  async function handleQnaAnswer(data) {
    await axios({
      method: "post",
      url: "http://localhost:8080/manage/answerQna",
      withCredentials: true,
      data: {
        ans_mem_no: userContext.mem_no,
        qna_no : qna.qna_no,
        ans_content: data.ans_content,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.data;
      })
      .then((result) => {
        if (result.common.res_code === 200) {
          alert("답변 완료");
          window.location.reload();
          navigate("/qna");
        } else {
          console.log("답변 실패");
        }
      });
    onHide();
  }

  function handlecancle() {
    reset();
    onHide();
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>문의 답변</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>제목: {qna.qes_title}</h5>
          <p>내용: {qna.qes_content}</p>
        </div>
        <Form.Group>
          <Form.Label style={{ marginTop: "10px" }}>내용</Form.Label>
          <Form.Control
            placeholder="내용"
            autoFocus
            {...register("ans_content", { required: true })}
            style={{ height: "200px" }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit(handleQnaAnswer)}>
          확인
        </Button>
        <Button variant="secondary" onClick={handlecancle}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
