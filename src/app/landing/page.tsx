'use client'
import React, { useState, useContext } from "react";
import Link from "next/link";
import { TextField } from "@mui/material";
import { MyContext } from "../MyContext";

export default function Landing(){

    // Login id to be used throughout the application
    const { userId }  = useContext(MyContext);
    console.log(userId);

    return (
        <>
            <div className="flex flex-col gap-4 items-center justify-center w-screen h-screen">
                <Link href="/landing/login-group" className="border border-black p-2 rounded-md w-36 text-center">
                    Group Login
                </Link>
                <Link href="/landing/new-group" className="border border-black p-2 rounded-md w-36 text-center">
                    New Group
                </Link>
                <Link href="/landing/join-group" className="border border-black p-2 rounded-md w-36 text-center">
                    Join Group
                </Link>
                <Link href="/landing/test" className="border border-black p-2 rounded-md w-36 text-center">
                    Test
                </Link>
            </div>
        </>
    )
}