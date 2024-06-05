import axios from "axios";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Schedule from "./Schedule";

export default function Compare({ show, onHide, movieData }) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const [schedule, setSchedule] = useState([]);
	async function handleClick(data) {
		const scheduleRes = await axios({
			method: "post",
			url: "http://localhost:8080/schedule/compare",
			data: {
				mov_no: movieData.mov_no,
				sch_date: data.date,
				th_region: data.region,
			},
			withCredentials: true,
		}).then((response) => response.data.data.scheduleList);
		setSchedule(scheduleRes);
	}

	return (
		<>
			<Modal show={show} onHide={onHide}>
				<Modal.Header closeButton>
					<Modal.Title>{movieData.mov_title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>지역</Form.Label>
						<Form.Select {...register("region", { required: true })}>
							<option value={"부평구"}>부평구</option>
							<option value={"서구"}>서구</option>
						</Form.Select>
					</Form.Group>
					<Form.Group>
						<Form.Label>날짜</Form.Label>
						<input type="date" {...register("date")} />
					</Form.Group>
					<button onClick={handleSubmit(handleClick)}>검색</button>
					{/* <img src={cgv_logo}/> */}
					<Schedule schedules={schedule} />
				</Modal.Body>
			</Modal>
		</>
	);
}
