import { Navigate } from "react-router";
import api from "../api";
import React, { createContext, useEffect, useState } from "react";

const isUserLoggedInContext = createContext();

export function OnlyLoggedUsers({children}) {
    const [isUserLoggedIn, setUserLoggedIn] = useState(null);

    useEffect(() => {
        async () => {
        await api.get("/users/me").then((response) => {
            console.log(response)

            
        })
    }
    }, [])


    return <isUserLoggedInContext.Provider value={[isUserLoggedIn,setUserLoggedIn]}>
      {(isUserLoggedIn === false) && <Navigate to="/" replace />}
      {children}
    </isUserLoggedInContext.Provider>
}