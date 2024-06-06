import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Schedule from "./Schedule";
import cgv from "../assets/images/cgv_logo.png";
import lotte from "../assets/images/lottecinema_logo.png";
import mega from "../assets/images/megabox_logo.png";

export default function Compare({ show, onHide, movieData }) {
  const { register, watch } = useForm({
    defaultValues: {
      date: null,
      region: "부평구", // 기본값 설정
    },
  });
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    async function handleLoad() {
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:8080/schedule/compare",
          data: {
            mov_no: movieData.mov_no,
            sch_date: null,
            th_region: null,
          },
          withCredentials: true,
        });

        if (response.status === 200 && response.data.common.res_code === 200) {
          setSchedule(response.data.data.scheduleList);
        }
      } catch (error) {
        console.error("초기 스케줄 로드 중 오류 발생:", error);
      }
    }

    handleLoad();
  }, [movieData.mov_no]);

  async function handleSearch({ date, region }) {
    console.log("Searching with date:", date, "region:", region); // 로깅 추가
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/schedule/compare",
        data: {
          mov_no: movieData.mov_no,
          sch_date: date || null,
          th_region: region || null,
        },
        withCredentials: true,
      });

      if (response.status === 200 && response.data.common.res_code === 200) {
        setSchedule(response.data.data.scheduleList);
      }
    } catch (error) {
      console.error("스케줄 검색 중 오류 발생:", error);
    }
  }

  const date = watch("date");
  const region = watch("region");

  useEffect(() => {
    handleSearch({ date, region });
  }, [date, region]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>상영시간표 비교</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>지역</Form.Label>
            <Form.Select {...register("region")}>
              <option value={"부평구"}>부평구</option>
              <option value={"서구"}>서구</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>날짜</Form.Label>
            <div>
              <input type="date" {...register("date")} />
            </div>
          </Form.Group>
        </Form>
        <div style={{margin: '20px', fontSize: '50px'}}>
          <strong>{movieData.mov_title},{region}, {date ? date : today}</strong>
        </div>
        {/* 스케줄 표시 */}
        <img src={cgv} style={{ height: "70px" }} />
        <Schedule schedules={schedule} th_brand={1} />
        <img src={lotte} style={{ height: "70px" }} />
        <Schedule schedules={schedule} th_brand={2} />
        <img src={mega} style={{ height: "70px" }} />
        <Schedule schedules={schedule} th_brand={3} />
      </Modal.Body>
    </Modal>
  );
}
