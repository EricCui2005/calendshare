'use client'
import { createContext, ReactNode, useState, useContext } from "react";

// Creating the context
export const MyContext = createContext<any>(null);

// Creating the context provider component
export const MyContextProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState(null);

    return (
        <MyContext.Provider value={{ userId, setUserId }}>
            {children}
        </MyContext.Provider>
    )
}

