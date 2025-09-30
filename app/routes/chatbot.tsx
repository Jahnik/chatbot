import { authClient } from "~/lib/auth-client";
import type { Route } from "./+types/home";
import { useState } from "react";
import { redirect, useNavigate } from "react-router";


export default function Chatbot() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState("")

    function handleSignUp() {
        console.log('Click')
        console.log(email);
        console.log(password);
        signUp(email, password)
    }

    function handleSignIn() {
        console.log('Click')
        console.log("Sign-In:", email);
        console.log("Sign-In:", password);
        signIn(email, password)
    }

    const signUp = async (email: string, password: string) => {
        await authClient.signUp.email({
            email: email,
            name: "Jahnik",
            password: password,
        }, {
            onSuccess: (ctx) => {
                console.log("Sign Up Successful")

            },
            onError: (ctx) => {
                console.log(ctx.error)
                alert(ctx.error)
            }
        })
    }

    const signIn = async (email: string, password: string) => {
        await authClient.signIn.email({
            email: email,
            password: password,
        }, {
            onSuccess: (ctx) => {
                console.log("Sign In Successful");
                navigate("/protected")
            },
            onError: (ctx) => {
                console.log(ctx.error)
                alert(ctx.error)
            }
        })
    }

    return (
        <div>
            <div>
                Hello This is where my chatbot will go!
            </div>
            <div className="flex flex-col justify-around p-1 gap-0.5">
                <input className="flex border" type="text" onChange={(event) => setEmail(event.target.value)} />
                <input className="flex border" type="text" onChange={(event) => setPassword(event.target.value)} />

                <div className="flex border justify-evenly">
                    <button onClick={handleSignUp}>
                        Sign Up
                    </button>
                    <button onClick={handleSignIn}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}