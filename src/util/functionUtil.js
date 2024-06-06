// 날짜 표현 형식
export function extractDateOnly(dateString) {
	console.log(dateString);
	return dateString.split(" ")[0];
}

// 제목 긴거 처리
export function truncateTitle(title, maxLength = 11) {
	if (title.length > maxLength) {
		return title.slice(0, maxLength) + "...";
	}
	return title;
}
