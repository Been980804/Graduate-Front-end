import React from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
export default function SearchPage() {
	const movList = useLocation("movList").state.searchList;

	return (
		<>
			<Pagination items={movList} itemsPerPage={10} />
		</>
	);
}
