import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as footerLoader } from "./components/Footer.jsx";
import MovieCarousel, {
	loader as movieLoader,
} from "./components/MovieCarousel.jsx";
import "./index.css";
import DetailPage, { loader as detailLoader } from "./routes/DetailPage.jsx";
import InfoPage, { loader as infoLoader } from "./routes/InfoPage.jsx";
import JoinPage from "./routes/JoinPage.jsx";
import ModInfoPage from "./routes/ModInfoPage.jsx";
import RouteLayout from "./routes/RouteLayout.jsx";
import SearchPage from "./routes/SearchPage.jsx";
// 공지사항 게시판
import NotiBoard, { loader as notiLoader } from "./routes/NotiBoard.jsx";
import NotiDetail, {
	loader as notiDetailLoader,
} from "./routes/NotiDetail.jsx";
// 문의사항 게시판
import QnaBoard, { loader as qnaLoader } from "./routes/QnaBoard.jsx";
import QnaDetail, { loader as qnaDetailLoader } from "./routes/QnaDetail.jsx";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <RouteLayout />,
		loader: footerLoader,
		children: [
			{
				path: "/",
				element: <MovieCarousel />,
				loader: movieLoader,
			},
			{
				path: "/details/:mov_no",
				element: <DetailPage />,
				loader: detailLoader,
			},
			{
				path: "/join",
				element: <JoinPage />,
			},
			{
				path: "/search",
				element: <SearchPage />,
			},

			{
				path: "/info",
				element: <InfoPage />,
				loader: infoLoader,
				children: [
					{
						path: "/info/mod",
						element: <ModInfoPage />,
					},
				],
			},
			{
				path: "/noti",
				element: <NotiBoard />,
				loader: notiLoader,
			},
			{
				path: "/detailNoti/:noti_no",
				element: <NotiDetail />,
				loader: notiDetailLoader,
			},
			{
				path: "/qna",
				element: <QnaBoard />,
				loader: qnaLoader,
			},
			{
				path: "detailQna/:qna_no",
				element: <QnaDetail />,
				loader: qnaDetailLoader,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={routes} />
	</React.StrictMode>
);
