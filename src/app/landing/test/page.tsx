"use client"
import React, { useState, useContext } from "react";
import Link from "next/link";
import { TextField } from "@mui/material";
import { MyContext } from "../../MyContext";

export default function Test() {

    const { groupId } = useContext(MyContext);

    const getGroupMembers = async () => {

        // Constructing request info
        const url = `../api/get-group-members?groupId=${groupId}`;
        const init = {
            method: "GET",
        };
        const result = await fetch(url, init);
        const groupMembers = await result.json();
        console.log(groupMembers);
    }
    return (
        <>
            <div className="flex justify-center">
                <button onClick={() => getGroupMembers()} className="border border-black rounded-md w-64 h-8">Retrieve Group Members</button>
            </div> 
        </>
    )
}