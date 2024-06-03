export default function Schedule({ schedules, th_brand }) {
	return (
		<ul>
			{schedules &&
				schedules.map((schedule) => {
					if (schedule.th_brand == th_brand) {
						return (
							<li key={schedule.th_name + schedule.sch_start}>
								<div className="th-name">{schedule.th_name}</div>
								<div className="hall-name">{schedule.hall_name}</div>
								<div className="start">{schedule.sch_start}</div>
								<div className="end">{schedule.sch_end}</div>
								<div className="seats">좌석수: {schedule.hall_seats}석</div>
							</li>
						);
					}
				})}
		</ul>
	);
}
