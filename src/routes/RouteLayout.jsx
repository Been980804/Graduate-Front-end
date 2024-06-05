import React from "react";
import { Outlet } from "react-router-dom";
import "../assets/css/common.css";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { UserProvider } from "../contexts/UserContext.jsx";
export default function RouteLayout() {
	return (
		<UserProvider>
			<Header />
			<Outlet />
			<Footer />
		</UserProvider>
	);
}
