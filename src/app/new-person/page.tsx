'use client'
import React, { useState } from "react";
import Link from "next/link";
import { TextField } from "@mui/material";

export default function Home(){

    const [formValues, setFormValues] = useState({
        username: null,
        password: null
    })

    const handleInputChange = (e: any) => {

        // Destructuring
        const { name, value } = e.target;

        // Setting values
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        // Constructing request info
        const url = "api/new-person";
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: formValues.username,
                password: formValues.password
            })
        };

        // Hitting the API endpoint
        const response = await fetch(url, init);
        const result = await response.json();
        console.log(result);
    }

    return (
        <>
            <div className="flex flex-col gap-4 items-center justify-center w-screen h-screen">
                <h1>New User</h1>
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 justify-center items-center">
                    <TextField name="username" value={formValues.username} onChange={handleInputChange} id="outlined-basic" label="Username" variant="outlined"/>
                    <TextField name="password" value={formValues.password} onChange={handleInputChange} id="outlined-basic" label="Password" variant="outlined"/>
                    <button type="submit" className="border border-black rounded-md w-36 h-8">Submit</button>
                </form>
                <Link href="/" className="border border-black p-2 rounded-md w-36 text-center w-28">
                    Back
                </Link>
            </div>
        </>
    )
}