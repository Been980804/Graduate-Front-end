import axios from "axios";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Qna({ show, onHide }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  async function handleQna(data){
      await axios({
          method: "post",
          url: "http://localhost8080/board/createQna",
          withCredentials: true,
          data: {
              qes_title : data.qes_title,
              qes_content : data.qes_content,
          }
      }).then((response) => {
          if(response.status === 200) return response.data;
      }).then((result) => {
          if(result.common.res_code === 200){
              alert('문의가 작성되었습니다.');
              navigate("/qna");
          } else{
              console.log('문의 작성 실패');
          }
      });
      onHide();
  }

  function handlecancle(){
    onHide();
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>문의하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>제목</Form.Label>
          <Form.Control
            placeholder="제목"
            autoFocus
            {...register("qes_title", { required: true })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ marginTop: "10px" }}>내용</Form.Label>
          <Form.Control
            placeholder="내용"
            autoFocus
            {...register("qes_content", { required: true })}
            style={{ height: "200px" }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit(handleQna)}>
          확인
        </Button>
        <Button variant="secondary" onClick={handlecancle}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
