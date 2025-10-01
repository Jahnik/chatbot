import { authClient } from "~/lib/auth-client";
import { useState } from "react";
import { Form, redirect, useNavigate, type ActionFunctionArgs } from "react-router";
import { signInEmail } from "better-auth/api";


export default function SignIn() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    async function signIn() {
        await authClient.signIn.email({
            email: email,
            password: password,
            callbackURL: "/protected"
        }, {
            onSuccess: (ctx) => {
                console.log("Sign In Successful");
            },
            onError: (ctx) => {
                console.log(ctx.error)
                alert(JSON.stringify(ctx.error.message))
            }
        })
    }

    return (
        <div>
            <div className="w-full max-w-md border-2 p-8">

                <Form onSubmit={signIn} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block font-medium"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full border px-3 py-2"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block font-medium"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full border px-3 py-2"
                            placeholder="********"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full border px-4 py-2 font-bold hover:bg-white hover:text-black"
                    >
                        Sign In
                    </button>
                </Form>
            </div>
        </div>
    )
}