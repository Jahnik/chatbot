import { useState } from "react";
import { Form, redirect, useNavigate, type ActionFunctionArgs } from "react-router";
import { signInEmail } from "better-auth/api";
import { authClient } from "~/lib/auth-client";

export default function SignUp() {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

    async function signUp() {

        await authClient.signUp.email({
            name: name,
            email: email,
            password: password,
        }, {
            onSuccess: (ctx) => {
                console.log("Sign Up Successful");
                navigate("/protected")
            },
            onError: (ctx) => {
                console.log(ctx.error)
                alert(JSON.stringify(ctx.error.message))
            }
        })
    }



    return (
        <div>
            <div className="max-w-md border p-8">
                <h1 className="mb-6 text-center text-2xl font-semibold">
                    Sign Up
                </h1>
                <Form onSubmit={signUp} className="space-y-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full border px-3 py-2"
                            placeholder="John Smith"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email:
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
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Password:
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
                        className="w-full border px-4 py-2 font-medium hover:bg-white hover:text-black"
                    >
                        Sign Up
                    </button>
                </Form>

            </div>

        </div>

    )
}