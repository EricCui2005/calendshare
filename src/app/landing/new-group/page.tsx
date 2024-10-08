'use client'
import React, { useState } from "react";
import Link from "next/link";
import { TextField } from "@mui/material";

export default function NewGroup(){

    const [formValues, setFormValues] = useState({
        groupName: null,
        groupPassword: null
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
        const url = "../api/new-group";
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                groupName: formValues.groupName,
                groupPassword: formValues.groupPassword
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
                <h1>New Group</h1>
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 justify-center items-center">
                    <TextField name="groupName" value={formValues.groupName} onChange={handleInputChange} id="outlined-basic" label="Group Name" variant="outlined"/>
                    <TextField name="groupPassword" value={formValues.groupPassword} onChange={handleInputChange} id="outlined-basic" label="Group Password" variant="outlined"/>
                    <button type="submit" className="border border-black rounded-md w-36 h-8">Submit</button>
                </form>
                <Link href="/landing" className="border border-black p-2 rounded-md w-36 text-center w-28">
                    Back
                </Link>
            </div>
        </>
    )
}