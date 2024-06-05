import { createContext, useContext, useState } from "react";
const UserContext = createContext();

export function UserProvider({ children }) {
	const userState = useState({
		mem_no: "",
		mem_name: "",
		mem_class: "",
		mem_id: "",
	});
	return (
		<UserContext.Provider value={userState}>{children}</UserContext.Provider>
	);
}

export function useUserState() {
	const user = useContext(UserContext);
	if (user === undefined)
		throw new Error("useUserState should be used within UserProvider");

	return user;
}
