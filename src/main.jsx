import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteLayout from "./routes/RouteLayout.jsx";
import MovieCarousel from "./components/MovieCarousel.jsx";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <RouteLayout />,
		children: [
			{
				path: "/",
				element: <MovieCarousel />,
			},
			{
				path: "/movie/:id",
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
