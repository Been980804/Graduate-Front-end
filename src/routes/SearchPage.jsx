import React from "react";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
	const movList = useLocation("movList").state.searchList;
	console.log(movList);

	return <></>;
}
