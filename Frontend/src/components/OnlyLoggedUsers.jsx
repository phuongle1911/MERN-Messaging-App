import { Navigate } from "react-router";
import api from "../api";
import { createContext, useEffect, useState } from "react";

const isUserLoggedInContext = createContext();

export function OnlyLoggedUsers({children}) {
    const [isUserLoggedIn, setUserLoggedIn] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
        await api.get("/users/me").then((response) => {
            console.log(response)
            // if (response.data.error) {
            //     setUserLoggedIn(false);
            //     // return <Navigate to="/" replace />;
            // } else {
            //         setUserLoggedIn(true);
            //     }
            
        })
    }
    }, [])

    // const token = localStorage.getItem("token");

    // if (!token) {
    //     return <Navigate to="/" replace />;
    // }

    return <isUserLoggedInContext.Provider value={[isUserLoggedIn,setUserLoggedIn]}>
        {(isUserLoggedIn === false) && <Navigate to="/" replace />}
        {children}
    </isUserLoggedInContext.Provider>
}