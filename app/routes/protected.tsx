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
    const terminalName = loaderData.user.email.split("@")[0];
    const [input, setInput] = useState('');
    const authLeft = useChat({
        transport: new DefaultChatTransport({ api: '/authLeft' })
    });
    const authRight = useChat({
        transport: new DefaultChatTransport({ api: '/authRight' })
    });
    const libLeft = useChat({
        transport: new DefaultChatTransport({ api: '/libLeft' })
    });
    const libRight = useChat({
        transport: new DefaultChatTransport({ api: '/libRight' })
    });




    return (
        <div className="terminal h-screen max-h-screen flex flex-col">
            <div className="flex justify-center text-2xl">
                Welcome to ChatPCT, {(loaderData.user.name)}!
            </div>
            <div className="grid grid-cols-2 grid-rows-2 flex-1 min-h-0 h-screen">
                <Terminal color={"red"} aiName={"authLeft"} userName={terminalName} messages={authLeft.messages} />
                <Terminal color={"blue"} aiName={"authRight"} userName={terminalName} messages={authRight.messages} />
                <Terminal color={"green"} aiName={"libLeft"} userName={terminalName} messages={libLeft.messages} />
                <Terminal color={"yellow"} aiName={"libRight"} userName={terminalName} messages={libRight.messages} />
            </div>
            <div className="flex items-center p-2 w-full gap-2">
                <div>{">"}</div>
                <form className="flex w-full"
                    onSubmit={e => {
                        e.preventDefault();
                        authLeft.sendMessage({ text: input });
                        authRight.sendMessage({ text: input });
                        libLeft.sendMessage({ text: input });
                        libRight.sendMessage({ text: input });
                        setInput('');
                    }}
                >
                    <input
                        className="border w-full"
                        value={input}
                        placeholder="Ask me your burning political questions!"
                        onChange={e => setInput(e.currentTarget.value)}
                    />
                </form>
            </div>
        </div >
    )
}