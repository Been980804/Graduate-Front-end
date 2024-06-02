import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Schedule from "../components/Schedule";
export default function ComparePage() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const [schedule, setSchedule] = useState([]);

	const params = useParams();

	async function handleClick(data) {
		const scheduleRes = await axios({
			method: "post",
			url: "http://localhost:8080/schedule/compare",
			data: {
				mov_no: params.mov_no,
				sch_date: data.date,
				th_region: data.region,
			},
			withCredentials: true,
		}).then((response) => response.data.data.scheduleList);
		setSchedule(scheduleRes);
	}

	return (
		<>
			<form>
				<label>지역을 선택하세요</label>
				<select
					id="region"
					className="region"
					{...register("region", { required: true })}>
					<option value={"부평구"}>부평구</option>
					<option value={"서구"}>서구</option>
				</select>
				<label>요일 선택</label>
				<input type="date" {...register("date", { required: true })} />
				<button onClick={handleSubmit(handleClick)}>검색</button>
			</form>
			<Schedule schedules={schedule} th_brand="1" />
			<Schedule schedules={schedule} th_brand="2" />
			<Schedule schedules={schedule} th_brand="3" />
		</>
	);
}

export async function loader() {
	return null;
}
