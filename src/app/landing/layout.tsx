"use client"
import React, { useState, useContext } from "react";
import { MyContext } from "../MyContext";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    const { userId } = useContext(MyContext);
    const { groupId } = useContext(MyContext);

    return (
        <>
            <h1>User: {userId}</h1>
            <h1>Group: {groupId}</h1>
            {children}  
        </>
    );
}
