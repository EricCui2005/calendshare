'use client'
import React, { useState, useContext } from "react";
import Link from "next/link";
import { TextField } from "@mui/material";
import { MyContext } from "./MyContext";
import { useRouter } from  "next/navigation";

export default function Home(){

    // Login id to be used throughout the application
    const { userId, setUserId }  = useContext(MyContext);

    // Initializing router
    const router = useRouter();

    // Form values
    const [formValues, setFormValues] = useState({
        username: null,
        password: null
    });

    const handleInputChange = (e: any) => {

        // Destructuring and setting values
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleFormSubmit = async (e: any) => {
        e.preventDefault();

        // Constructing request info
        const url = `api/login?username=${formValues.username}&password=${formValues.password}`;
        const init = {
            method: "GET",
        };

        // Hitting the API endpoint
        const response = await fetch(url, init);
        const responseObject = await response.json();

        // Invalid credentials
        if (responseObject.rowCount == 0) {
            console.log("Invalid username and password");
            return;
        }

        // Valid credentials
        const result = responseObject.rows[0].personid;
        console.log(result);
        setUserId(result);

        router.push("/landing");
    }

    return (
        <>
            <div className="flex flex-col gap-4 items-center justify-center w-screen h-screen">
            <h1>Login</h1>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 justify-center items-center">
                    <TextField name="username" value={formValues.username} onChange={handleInputChange} id="outlined-basic" label="Username" variant="outlined"/>
                    <TextField name="password" value={formValues.password} onChange={handleInputChange} id="outlined-basic" label="Password" variant="outlined"/>
                    <button type="submit" className="border border-black rounded-md w-36 h-8">Login</button>
                </form>
                <Link href="/new-person" className="border border-black p-2 rounded-md w-36 text-center">
                    New User
                </Link>
            </div>
        </>
    )
}