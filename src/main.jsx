import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MovieCarousel, {
	loader as movieLoader,
} from "./components/MovieCarousel.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
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
				path: "/movie/details:id",
				element: <MovieDetails />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={routes} />
	</React.StrictMode>
);
