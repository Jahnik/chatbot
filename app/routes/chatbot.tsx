import { authClient } from "~/lib/auth-client";
import type { Route } from "./+types/chatbot";
import { useState } from "react";
import { redirect, useNavigate } from "react-router";
import SignIn from "../ui/signIn";
import SignUp from "~/ui/signUp";


export default function Chatbot() {
    const [signUp, setSignUp] = useState(false)

    return (
        <div className="flex min-h-screen items-center justify-center flex-col">
            <div className="flex flex-col items-center">
                <h1 className="mb-6 text-center text-4xl font-semibold">
                    ChatPCT
                </h1>
                {signUp && <SignUp></SignUp>}
                {!signUp && <SignIn></SignIn>}
                <div className="flex justify-center py-2">
                    {!signUp && "Not a user yet?"}
                </div>
                <div onClick={() => setSignUp(!signUp)} className="flex justify-center w-9/10 border px-4 py-2 font-medium hover:bg-white hover:text-black">
                    {signUp ? "Return to Sign In" : "Sign Up!"}
                </div>
            </div>
        </div>
    )
}