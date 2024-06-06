import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { extractDateOnly } from "../util/functionUtil";
import MovieCard from "./MovieCard";
function Items({ currentItems, type }) {
	return (
		<>
			{currentItems &&
				currentItems.map((item, idx) => {
					switch (type) {
						case "qna":
							return (
								<Link
									to={`/detailQna/${item.qna_no}`}
									key={item.qna_no}
									className="board-link">
									<div className="board-column">
										<div className="board-num">{idx + 1}</div>
										<div className="board-title">{item.qes_title}</div>
										<div className="board-user">{item.mem_name}</div>
										<div className="board-regDate">
											{extractDateOnly(item.reg_date)}
										</div>
									</div>
								</Link>
							);
						case "noti": {
							return (
								<Link
									to={`/detailNoti/${item.noti_no}`}
									key={noti.noti_no}
									className="board-link">
									<div className="board-column">
										<div className="board-num">{idx + 1}</div>
										<div className="board-title">{item.noti_title}</div>
										<div className="board-user">{item.mem_name}</div>
										<div className="board-cnt">{item.noti_cnt}</div>
										<div className="board-regDate">
											{extractDateOnly(item.reg_date)}
										</div>
									</div>
								</Link>
							);
						}
						case "mov":
							return <MovieCard mov={item} />;
					}
				})}
		</>
	);
}

export default function Pagination({ items, itemsPerPage, type }) {
	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = items.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(items.length / itemsPerPage);
	function handlePageClick(e) {
		const newOffset = (e.selected * itemsPerPage) % items.length;
		setItemOffset(newOffset);
	}

	return (
		<>
			<div className="page-container">
				<Items currentItems={currentItems} type={type} />

				<ReactPaginate
					className="pagingBox"
					nextLabel=">"
					previousLabel="<"
					previousClassName="page-item"
					previousLinkClassName="page-link"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					nextClassName="page-item"
					nextLinkClassName="page-link"
					onPageChange={handlePageClick}
					pageCount={pageCount}
					renderOnZeroPageCount={null}
				/>
			</div>
		</>
	);
}
