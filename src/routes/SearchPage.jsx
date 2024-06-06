import React from "react";
import { useLocation } from "react-router-dom";
import exclamation from "../assets/images/exclamation.png";
import Pagination from "../components/Pagination";

export default function SearchPage() {
	const { state } = useLocation();
	const movList = state?.searchList;
	const searchParams = new URLSearchParams(location.search);
	const searchTitle = searchParams.get("title");

	return (
		<>
			{movList ? (
				<div
					style={{
						marginTop: "20px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<h2
						style={{
							textAlign: "center",
							border: "2px solid gray",
							width: "fit-content",
							padding: "10px",
							borderRadius: "10px",
						}}>
						{searchTitle != "all"
							? `"${searchTitle}" 에 대한 검색 결과입니다.`
							: "모든 영화를 가져옵니다."}
					</h2>
					<Pagination items={movList} itemsPerPage={10} />
				</div>
			) : (
				<div
					style={{
						fontSize: "40px",
						textAlign: "center",
						minHeight: "400px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<img src={exclamation} style={{ width: "50px" }} />
					검색어에 해당하는 영화가 없습니다.
				</div>
			)}
		</>
	);
}
