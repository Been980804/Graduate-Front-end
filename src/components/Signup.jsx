import { useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../assets/css/Signup.css";
import logo_small from "../assets/images/logo_small.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Signup({ show, onHide }) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isChecking, setIsChecking] = useState(false);
  const mem_id = watch("mem_id");
  const mem_pwd = watch("mem_pwd");
  const confirmPassword = watch("confirmPassword");
  const mem_phone = watch("mem_phone");
  const mem_email = watch("mem_email");
  const [startDate, setStartDate] = useState(new Date());

  // 비밀번호 확인
  const validatePassword = () => {
    if (mem_pwd && confirmPassword && mem_pwd !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다.",
      });
      return false;
    } else {
      clearErrors("confirmPassword");
      return true;
    }
  };

  // 전화번호 형식 체크
  const validatePhoneNumber = () => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (mem_phone && !mem_phone.match(phoneRegex)) {
      setError("mem_phone", {
        type: "manual",
        message: "올바른 전화번호 형식이 아닙니다. (010-1111-1111)",
      });
      return false;
    } else {
      clearErrors("mem_phone");
      return true;
    }
  };

  // 이메일 정규식 체크
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (mem_email && !mem_email.match(emailRegex)) {
      setError("mem_email", {
        type: "manual",
        message: "올바른 이메일 형식이 아닙니다.",
      });
      return false;
    } else {
      clearErrors("mem_email");
      return true;
    }
  };

  // 폼 제출 시 실행
  const onSubmit = async (data) => {
    const isPasswordValid = validatePassword();
    const isPhoneNumberValid = validatePhoneNumber();
    const isEmailValid = validateEmail();

    if (isPasswordValid && isPhoneNumberValid && isEmailValid) {
      try {
        const response = await axios.post(
          `http://localhost:8080/user/signup`,
          data
        );

        if (response.status === 200) {
          if (response.data.common.res_code === 200) {
            alert("회원가입 성공");
            reset();
            onHide();
          } else {
            console.log(response.data.common.res_code);
            console.log("실패");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // 아이디 중복 체크
  async function checkDuplicate() {
    setIsChecking(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/user/idCheck/${mem_id}`
      );
      if (response.status === 200) {
        if (response.data.common.res_code === 300) {
          setError("mem_id", {
            type: "manual",
            message: "이미 사용 중인 아이디입니다.",
          });
        } else {
          clearErrors("mem_id");
        }
      }
    } catch (error) {
      console.error(error);
      setError("mem_id", {
        type: "manual",
        message: "아이디 중복 체크에 실패했습니다.",
      });
    } finally {
      setIsChecking(false);
    }
  }

  const handleSignupClose = () => {
    reset();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleSignupClose} centered>
      <Modal.Header className="signup">
        <img src={logo_small} />
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>이름</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="이름을 입력하세요"
                {...register("mem_name", { required: true })}
                style={{ marginRight: "10px", flex: "1" }}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="mem_id" className="mb-3">
            <Form.Label>아이디</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="아이디를 입력하세요"
                {...register("mem_id", { required: true })}
                style={{ marginRight: "10px", flex: "1" }}
              />
              <Button variant="outline-primary" onClick={checkDuplicate}>
                중복 체크
              </Button>
            </div>
            {errors.mem_id && (
              <p className="text-danger">{errors.mem_id.message}</p>
            )}
          </Form.Group>

          <Form.Group controlId="mem_pwd" className="mb-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register("mem_pwd", { required: true })}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              {...register("confirmPassword", { required: true })}
              onChange={validatePassword}
            />
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword.message}</p>
            )}
          </Form.Group>

          <Form.Group controlId="mem_phone" className="mb-3">
            <Form.Label>전화번호</Form.Label>
            <Form.Control
              type="tel"
              placeholder="전화번호를 입력하세요 (010-1111-1111)"
              {...register("mem_phone", { required: true })}
              onChange={validatePhoneNumber}
            />
            {errors.mem_phone && (
              <p className="text-danger">{errors.mem_phone.message}</p>
            )}
          </Form.Group>

          <Form.Group controlId="mem_email" className="mb-3">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              placeholder="이메일을 입력하세요"
              {...register("mem_email", { required: true })}
              onBlur={validateEmail} // 이 부분을 onBlur 이벤트로 변경
            />
            {errors.mem_email && (
              <p className="text-danger">{errors.mem_email.message}</p>
            )}
          </Form.Group>

          <Form.Group controlId="mem_birth" className="mb-3">
            <Form.Label>생년월일</Form.Label>
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </Form.Group>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button variant="primary" type="submit">
              회원가입
            </Button>
            <Button
              variant="secondary"
              onClick={handleSignupClose}
              className="me-md-2"
            >
              취소
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
