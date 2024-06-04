import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/css/common.css";

export default function RouteLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
