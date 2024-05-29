import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import MovieCarousel, {
	loader as movieLoader,
} from "./components/MovieCarousel.jsx";
import MovieDetails, {
	loader as detailLoader,
} from "./components/MovieDetails.jsx";
import MyPage from "./components/MyPage.jsx";
import SignUp from "./components/SignUp.jsx";
import "./index.css";
import RouteLayout from "./routes/RouteLayout.jsx";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <RouteLayout />,
		children: [
			{
				path: "/",
				element: <MovieCarousel />,
				loader: movieLoader,
			},
			{
				path: "/details/:mov_id",
				element: <MovieDetails />,
				loader: detailLoader,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/join",
				element: <SignUp />,
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
