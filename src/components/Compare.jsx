import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import "../assets/css/Compare.css";
import left from "../assets/images/left.png";
import right from "../assets/images/right.png";
import Schedule from "./Schedule";

export default function Compare({ show, onHide, movieData }) {
	const { register, setValue, watch } = useForm({
		defaultValues: {
			date: new Date().toISOString().slice(0, 10),
		},
	});
	const [schedule, setSchedule] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState("부평구");
	const [selectedDate, setSelectedDate] = useState(
		new Date("2024-05-27").toISOString().slice(0, 10) // 기본값
	);
	const [startDate, setStartDate] = useState(
		new Date("2024-05-27").toISOString().slice(0, 10)
	);
	const [endDate, setEndDate] = useState(
		new Date("2024-06-09").toISOString().slice(0, 10)
	); // 2주 범위 설정
	const today = new Date().toISOString().slice(0, 10);

	useEffect(() => {
		async function handleLoad() {
			console.log("Initial Load - selectedDate:", selectedDate);
			try {
				const response = await axios({
					method: "post",
					url: "http://localhost:8080/schedule/compare",
					data: {
						mov_no: movieData.mov_no,
						sch_date: selectedDate,
						th_region: selectedRegion,
					},
					withCredentials: true,
				});

				if (response.status === 200 && response.data.common.res_code === 200) {
					setSchedule(response.data.data.scheduleList);
				} else {
					setSchedule([]);
				}
			} catch (error) {
				console.error("초기 스케줄 로드 중 오류 발생:", error);
				setSchedule([]);
			}
		}

		handleLoad();
	}, [movieData.mov_no, selectedDate, selectedRegion]);

	async function handleSearch() {
		console.log("Search - selectedDate:", selectedDate);
		try {
			const response = await axios({
				method: "post",
				url: "http://localhost:8080/schedule/compare",
				data: {
					mov_no: movieData.mov_no,
					sch_date: selectedDate,
					th_region: selectedRegion,
				},
				withCredentials: true,
			});

			if (response.status === 200 && response.data.common.res_code === 200) {
				const receivedRegion = response.data.data.region;
				if (receivedRegion === selectedRegion) {
					setSchedule(response.data.data.scheduleList || []);
				} else {
					setSchedule([]);
				}
			} else {
				setSchedule([]);
			}
		} catch (error) {
			console.error("스케줄 검색 중 오류 발생:", error);
			setSchedule([]);
		}
	}

	const date = watch("date");

	useEffect(() => {
		setValue("date", selectedDate);
		console.log("useEffect - setValue:", selectedDate);
	}, [selectedDate, setValue]);

	const handlePrevWeek = () => {
		const prevStartDate = new Date(startDate);
		prevStartDate.setDate(prevStartDate.getDate() - 7);

		// 5월 27일 주를 넘어가지 않도록
		if (prevStartDate < new Date("2024-05-27")) {
			return;
		}

		setStartDate(prevStartDate.toISOString().slice(0, 10));

		const prevEndDate = new Date(endDate);
		prevEndDate.setDate(prevEndDate.getDate() - 7);
		setEndDate(prevEndDate.toISOString().slice(0, 10));
	};

	const handleNextWeek = () => {
		const nextStartDate = new Date(startDate);
		nextStartDate.setDate(nextStartDate.getDate() + 7);

		// 2주 후의 날짜 이상이라면 버튼 비활성화
		if (nextStartDate > new Date("2024-06-09")) {
			return;
		}

		setStartDate(nextStartDate.toISOString().slice(0, 10));

		const nextEndDate = new Date(endDate);
		nextEndDate.setDate(nextEndDate.getDate() + 7);
		setEndDate(nextEndDate.toISOString().slice(0, 10));
	};

	const getWeekDays = (start) => {
		const days = [];
		for (let i = 0; i < 7; i++) {
			const date = new Date(start);
			date.setDate(date.getDate() + i);
			if (date >= new Date("2024-05-27") && date <= new Date("2024-06-09")) {
				// 범위 내 날짜만 추가
				days.push(date.toISOString().slice(0, 10));
			}
		}
		return days;
	};

	const weekDays = getWeekDays(startDate);

	return (
		<Modal show={show} onHide={onHide} size="xl">
			<Modal.Header closeButton>
				<Modal.Title>상영시간표 비교</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Form.Label>지역</Form.Label>
						<div style={{ display: "flex" }}>
							{[
								"부평구",
								"서구",
								"연수구",
								"미추홀구",
								"계양구",
								"중구",
								"남동구",
							].map((regionName) => (
								<div
									key={regionName}
									style={{
										padding: "10px",
										border: "1px solid #ccc",
										cursor: "pointer",
										backgroundColor:
											selectedRegion === regionName ? "#1f1f1f" : "white",
										color: selectedRegion === regionName ? "white" : "black",
										width: "160px",
										textAlign: "center",
									}}
									onClick={() => {
										setSelectedRegion(regionName);
										handleSearch();
									}}>
									{regionName}
								</div>
							))}
						</div>
					</Form.Group>
					<Form.Group>
						<Form.Label style={{ marginTop: "10px" }}>
							날짜{" "}
							<span
								style={{
									fontSize: "15px",
									fontWeight: "bold",
									marginLeft: "44px",
								}}>
								{new Date(selectedDate).getFullYear()}
							</span>
						</Form.Label>
						<div className="date-navigation">
							<img
								src={left}
								style={{ width: "10px", cursor: "pointer" }}
								onClick={handlePrevWeek}
							/>
							<div className="week-days">
								{weekDays.map((day, index) => {
									const dateObj = new Date(day);
									const dayOfMonth = dateObj.getDate();
									const month = dateObj.getMonth() + 1; // 월은 0부터 시작하므로 +1
									const isMonthLabelVisible =
										index === 0 ||
										(index > 0 &&
											new Date(weekDays[index - 1]).getMonth() !==
												dateObj.getMonth());
									const dayOfWeek = dateObj.getDay();
									const dayClass =
										dayOfWeek === 6
											? "saturday"
											: dayOfWeek === 0
											? "sunday"
											: "";

									return (
										<div
											key={day}
											className="day-wrapper"
											onClick={() => {
												setSelectedDate(day);
												handleSearch();
												console.log("Clicked Date:", day); // 날짜 클릭 시 로그 출력
											}}>
											{isMonthLabelVisible && (
												<div className="month-label">{month}월</div>
											)}
											<div
												className={`day ${
													selectedDate === day ? "selected" : ""
												} ${dayClass}`}>
												{dayOfMonth}
											</div>
										</div>
									);
								})}
							</div>
							<img
								src={right}
								style={{ width: "10px", cursor: "pointer" }}
								onClick={handleNextWeek}
							/>
						</div>
					</Form.Group>
				</Form>
				<div style={{ margin: "20px", fontSize: "25px" }}>
					<strong>
						{movieData.mov_title}, {selectedRegion},{" "}
						{selectedDate ? selectedDate : today}
					</strong>
				</div>
				{schedule.length > 0 ? (
					<>
						<Schedule schedules={schedule} th_brand={1} />
						<Schedule schedules={schedule} th_brand={2} />
						<Schedule schedules={schedule} th_brand={3} />
					</>
				) : (
					<div
						style={{ margin: "20px", fontSize: "30px", textAlign: "center" }}>
						해당 날짜의 스케줄이 없습니다.
					</div>
				)}
			</Modal.Body>
		</Modal>
	);
}
