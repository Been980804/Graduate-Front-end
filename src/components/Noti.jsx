import axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../contexts/UserContext.jsx";

export default function Qna({ show, onHide }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userContext = useUserState();

  async function handleNoti(data) {
    await axios({
      method: "post",
      url: "http://localhost8080/manage/createNoti",
      withCredentials: true,
      data: {
        mem_no : userContext.mem_no,
        noti_title: data.noti_title,
        noti_content: data.noti_content,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.data;
      })
      .then((result) => {
        if (result.common.res_code === 200) {
          alert("공지가 작성되었습니다.");
          navigate("/noti");
        } else {
          console.log("공지 작성 실패");
        }
      });
    onHide();
  }

  function handlecancle() {
    onHide();
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>공지하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>제목</Form.Label>
          <Form.Control
            placeholder="제목"
            autoFocus
            {...register("noti_title", { required: true })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ marginTop: "10px" }}>내용</Form.Label>
          <Form.Control
            placeholder="내용"
            autoFocus
            {...register("noti_content", { required: true })}
            style={{ height: "200px" }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit(handleNoti)}>
          확인
        </Button>
        <Button variant="secondary" onClick={handlecancle}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
