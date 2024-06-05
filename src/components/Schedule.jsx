import { Card, ListGroup } from "react-bootstrap";
import "../assets/css/Schedule.css";
import cgv from "../assets/images/CGV_logo.png";
import lotte from "../assets/images/LotteCinema_logo.png";
import mega from "../assets/images/MegaBox_logo.png";
export default function Schedule({ schedules, th_brand }) {
	//schedules {th_brand, th_name, hall_name, hall_seats, sch_start, }
	let logo;
	let url;
	const halls = schedules.reduce((acc, obj) => {
		const key = `${obj.th_brand}_${obj.th_name}_${obj.hall_name}_${obj.hall_seats}`;
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(obj);
		return acc;
	}, {});
	const keys = Object.keys(halls);

	switch (th_brand) {
		case 1:
			logo = cgv;
			url = "http://www.cgv.co.kr/ticket/";
			break;
		case 2:
			logo = lotte;
			url = "https://www.lottecinema.co.kr/NLCHS/Ticketing";
			break;
		case 3:
			logo = mega;
			url = "https://www.megabox.co.kr/booking";
			break;
	}
	function getSch(hallName) {
		// 결과를 담을 배열 초기화
		let schStarts = [];

		// halls 객체를 순회하면서 조건에 맞는 sch_start를 추출
		for (const key in halls) {
			if (halls.hasOwnProperty(key)) {
				const hallInfoArray = halls[key];

				// hallInfoArray 배열을 순회하면서 조건에 맞는 sch_start를 추출
				hallInfoArray.forEach((hallInfo) => {
					const combinedKey = `${hallInfo.th_brand}_${hallInfo.th_name}_${hallInfo.hall_name}_${hallInfo.hall_seats}`;
					if (combinedKey === hallName) {
						schStarts.push(hallInfo.sch_start);
					}
				});
			}
		}

		return schStarts;
	}
	return (
		<div className="cards-wrapper">
			{keys.map((key) => {
				return (
					<Card onClick={() => window.open(url)}>
						<Card.Img src={logo} variant="top" />
						<Card.Body>
							<Card.Title>
								{key.split("_")[1]} {key.split("_")[2].split(" ")[0]}
							</Card.Title>
							<ListGroup>
								{getSch(key).map((sch) => {
									return <ListGroup.Item>{sch}</ListGroup.Item>;
								})}
							</ListGroup>
						</Card.Body>
					</Card>
				);
			})}
		</div>
	);
}
