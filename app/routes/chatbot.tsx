import { authClient } from "~/lib/auth-client";
import type { Route } from "./+types/chatbot";
import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import SignIn from "../ui/signIn";
import SignUp from "~/ui/signUp";


export default function Chatbot() {
    const [signUp, setSignUp] = useState(false)

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 flex-col">
            <div className="flex flex-col items-center">
                {signUp && <SignUp></SignUp>}
                {!signUp && <SignIn></SignIn>}
                <div className="flex justify-center py-2">
                    {!signUp && "Not a user yet?"}
                </div>
                <div onClick={() => setSignUp(!signUp)} className="flex justify-center w-9/10 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    {signUp ? "Return to Sign In" : "Sign Up!"}
                </div>
            </div>
        </div>
    )
}