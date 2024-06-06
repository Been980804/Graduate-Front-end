import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Schedule from "./Schedule";
export default function Compare({ show, onHide, movieData }) {
	const { register, handleSubmit } = useForm();
	const [schedule, setSchedule] = useState([]);
	useEffect(() => {
		async function handleLoad() {
			await axios({
				method: "post",
				url: "http://localhost:8080/schedule/compare",
				data: {
					mov_no: movieData.mov_no,
				},
				withCredentials: true,
			})
				.then((response) => {
					if (response.status === 200) return response.data;
					else return;
				})
				.then((result) => {
					if (result.common.res_code === 200)
						return setSchedule(result.data.scheduleList);
					else return;
				});
		}
		handleLoad();
	}, []);

	async function handleClick(data) {
		await axios({
			method: "post",
			url: "http://localhost:8080/schedule/compare",
			data: {
				mov_no: movieData.mov_no,
				sch_date: data.date,
				th_region: data.region,
			},
			withCredentials: true,
		})
			.then((response) => {
				if (response.status === 200) return response.data;
				else return;
			})
			.then((result) => {
				if (result.common.res_code === 200)
					return setSchedule(result.data.scheduleList);
				else return;
			});
	}

	return (
		<>
			<Modal show={show} onHide={onHide} size="xl">
				<Modal.Header closeButton>
					<Modal.Title>{movieData.mov_title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit(handleClick)}>
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
						<button>검색</button>
					</Form>
					{/* <img src={cgv_logo}/> */}
					<Schedule schedules={schedule} th_brand={1} />
					<Schedule schedules={schedule} th_brand={2} />
					<Schedule schedules={schedule} th_brand={3} />
				</Modal.Body>
			</Modal>
		</>
	);
}
