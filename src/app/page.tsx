'use client'
import React, { useState } from "react";
import Link from "next/link";
import { TextField } from "@mui/material";

export default function Home(){

    const [username, setUsername] = useState(null);

    // Functions to detect username change and submission
    const handleUsernameFieldChange = (event: any) => {
        setUsername(event.target.value);
    }
    const handleUsernameSubmit = async (event: any) => {
        event.preventDefault();
        const response = await fetch('api/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'Felicity'
            })
        });
        const result = await response.json();
        console.log(result);
    }

    // Temporary function to test querying

    return (
        <>
            <div className="flex flex-col gap-4 items-center justify-center w-screen h-screen">
                <Link href="/calendar" className="border border-black p-2 rounded-md w-36 text-center">
                    Login
                </Link>
                <form onSubmit={handleUsernameSubmit} className="flex flex-col gap-2 justify-center items-center">
                    <TextField onChange={handleUsernameFieldChange} id="outlined-basic" label="Username" variant="outlined"/>
                    <button type="submit" className="border border-black rounded-md w-24">Submit</button>
                </form>
               
            </div>
        </>
    )
}