import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	const [userState, setUserState] = useState({
		id: "",
		name: "",
		class: "",
		no: "",
		auth: false,
	});

	const isAuth = async () => {
		console.log("isAuth called");
		const response = await axios({
			method: "get",
			url: "http://localhost:8080/user/auth",
			withCredentials: true,
		})
			.then((response) => {
				if (response.status === 200) return response.data;
			})
			.then((result) => {
				if (result.common.res_code === 200) return result.data;
			})
			.then((info) => {
				if (info) {
					return info;
				}
			});
		setUserState({
			id: response.mem_id,
			name: response.mem_name,
			class: response.mem_class,
			no: response.mem_no,
			auth: true,
		});
		console.log(userState);
	};

	return (
		<AuthContext.Provider value={{ userState, setUserState, isAuth }}>
			{children}
		</AuthContext.Provider>
	);
};
