import React from "react";
import { Outlet } from "react-router-dom";
import "../assets/css/common.css";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
export default function RouteLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
