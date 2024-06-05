import { useUserState } from "../contexts/UserContext";

export default function Schedule({ schedules }) {
	const [userContext, setUserContext] = useUserState();
	console.log(userContext);
	//schedules {th_brand, th_name, hall_name, hall_seats, sch_start, }
	const thSet = new Set();
	schedules.map((schedule) => {
		thSet.add(
			schedule.th_brand +
				"." +
				schedule.th_name +
				"." +
				schedule.hall_name +
				"." +
				schedule.hall_seats
		);
	});
	console.log(thSet);

	return (
		<>
			{schedules &&
				schedules.map((schedule) => {
					return (
						<>
							<div className="th-brand">{schedule.th_brand}</div>
							<div className="th-name">{schedule.th_name}</div>
							<div className="hall-name">{schedule.hall_name}</div>
							<div className="start">{schedule.sch_start}</div>
							<div className="seats">좌석수: {schedule.hall_seats}석</div>
						</>
					);
				})}
		</>
	);
}
