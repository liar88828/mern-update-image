import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
	const [currentUser, setCurrentUser] = useState(
			JSON.parse(localStorage.getItem("user")) || null
	);

	const login = async (inputs) => {
		//TO DO
		const res = await axios.post(
'http://localhost:5000/api/auth/login',		
inputs, 
{withCredentials: true} 
							)
		setCurrentUser(res.data) // untuk menyimpan token
	};

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(currentUser));
	}, [currentUser]);

	// console.log(currentUser ,'authContex')
	return (
			<AuthContext.Provider value={{currentUser, login}}>
				{children}
			</AuthContext.Provider>
	);
};
