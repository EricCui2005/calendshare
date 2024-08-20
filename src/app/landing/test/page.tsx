"use client"
import React, { useState, useContext } from "react";
import Link from "next/link";
import { TextField } from "@mui/material";
import { MyContext } from "../../MyContext";

export default function Home() {

    const { groupId } = useContext(MyContext);

    const getGroupMembers = async () => {
        
        // Constructing request info
        const url = `../api/get-group-members?groupId=${groupId}`;
        const init = {
            method: "GET",
        };
        const result = await fetch(url, init);
        console.log(result);
    }
    return (
        <>
            <div className="flex justify-center">
                <button onClick={() => getGroupMembers()} className="border border-black rounded-md w-64 h-8">Retrieve Group Members</button>
            </div> 
        </>
    )
}