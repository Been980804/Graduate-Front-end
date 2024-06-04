import { useState } from "react";
import ReactPaginate from "react-paginate";
import MovieCard from "./MovieCard";
function Items({ currentItems }) {
	return (
		<>
			{currentItems &&
				currentItems.map((item) => {
					return <MovieCard mov={item} />;
				})}
		</>
	);
}

export default function Pagination({ items, itemsPerPage }) {
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
			<Items currentItems={currentItems} />
			<ReactPaginate
				nextLabel=">"
				previousLabel="<"
				onPageChange={handlePageClick}
				pageCount={pageCount}
				renderOnZeroPageCount={null}
			/>
		</>
	);
}
