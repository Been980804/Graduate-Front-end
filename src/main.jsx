import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Logout from "./components/Logout.jsx";

import { loader as headerLoader } from "./components/Header.jsx";
import MovieCarousel, {
	loader as movieLoader,
} from "./components/MovieCarousel.jsx";
import "./index.css";
import DetailPage, { loader as detailLoader } from "./routes/DetailPage.jsx";
import JoinPage from "./routes/JoinPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import MyPage from "./routes/MyPage.jsx";
import RouteLayout from "./routes/RouteLayout.jsx";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <RouteLayout />,
		loader: headerLoader,
		children: [
			{
				path: "/",
				element: <MovieCarousel />,
				loader: movieLoader,
			},
			{
				path: "/details/:mov_id",
				element: <DetailPage />,
				loader: detailLoader,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/logout",
				element: <Logout />,
			},
			{
				path: "/join",
				element: <JoinPage />,
			},
			{
				path: "/mypage",
				element: <MyPage />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CookiesProvider>
			<RouterProvider router={routes} />
		</CookiesProvider>
	</React.StrictMode>
);
