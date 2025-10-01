import { redirect, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/protected";
import { auth } from "~/lib/auth.server";
import { useState } from "react";
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from "ai";
import Terminal from "~/ui/terminal";


export async function loader({ request }: LoaderFunctionArgs) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (session?.user) {
        return { user: session.user }
    } else {
        throw redirect("/")
    }
}

export default function Protected({ loaderData }: Route.ComponentProps) {
    const [input, setInput] = useState('');
    const { messages, sendMessage } = useChat({
        transport: new DefaultChatTransport({ api: '/ai' })
    });

    const userName = loaderData.user.email.split("@")[0];

    return (
        <div className="terminal min-h-screen flex flex-col">
            <div className="flex justify-center text-2xl">
                Welcome to ChatPCT, {(loaderData.user.name)}!
            </div>
            <div className="grid grid-cols-2 grid-rows-2 flex-1">
                <Terminal color={"red"} aiName={"authLeft"} userName={userName} messages={messages} />
                <Terminal color={"blue"} aiName={"authRight"} userName={userName} messages={messages} />
                <Terminal color={"green"} aiName={"libLeft"} userName={userName} messages={messages} />
                <Terminal color={"yellow"} aiName={"libRight"} userName={userName} messages={messages} />
            </div>
            <div className="flex items-center p-2 w-full gap-2">
                <div>{">"}</div>
                <form className="flex w-full"
                    onSubmit={e => {
                        e.preventDefault();
                        sendMessage({ text: input });
                        setInput('');
                    }}
                >
                    <input
                        className="border w-full overflow-y-auto"
                        value={input}
                        placeholder="Ask me your burning political questions!"
                        onChange={e => setInput(e.currentTarget.value)}
                    />
                </form>
            </div>
        </div >
    )
}