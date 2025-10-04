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
    const [debateMode, setDebateMode] = useState(false)

    const chatTitle = (!debateMode) ? "ChatPCT" : "ChatPCT/debateMode"

    function debateModeHandler() {
        setDebateMode(!debateMode)
    }

    //Chat Mode Routes
    const authLeft = useChat({
        transport: new DefaultChatTransport({ api: "/authLeft" })
    });
    const authRight = useChat({
        transport: new DefaultChatTransport({ api: "/authRight" })
    });
    const libLeft = useChat({
        transport: new DefaultChatTransport({ api: "/libLeft" })
    });
    const libRight = useChat({
        transport: new DefaultChatTransport({ api: "/libRight" })
    });

    //Debate Mode Routes
    const authLeftDebate = useChat({
        transport: new DefaultChatTransport({ api: "/authLeftDebate" })
    });
    const authRightDebate = useChat({
        transport: new DefaultChatTransport({ api: "/authRightDebate" })
    });
    const libLeftDebate = useChat({
        transport: new DefaultChatTransport({ api: "/libLeftDebate" })
    });
    const libRightDebate = useChat({
        transport: new DefaultChatTransport({ api: "/libRightDebate" })
    });




    return (
        <div className="terminal h-screen max-h-screen flex flex-col">
            <div className="relative flex items-center text-2xl">
                <div className="mx-auto">Welcome to {chatTitle}, {(loaderData.user.name)}!</div>
                <button
                    className="absolute right-1"
                    onClick={debateModeHandler}
                >
                    {debateMode ? <p>Chat Mode</p> : <p>Debate Mode</p>}
                </button>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 flex-1 min-h-0 h-screen">
                <Terminal color={"red"} aiName={"authLeft"} userName={terminalName} messages={
                    (debateMode) ? authLeftDebate.messages : authLeft.messages} />
                <Terminal color={"blue"} aiName={"authRight"} userName={terminalName} messages={
                    (debateMode) ? authRightDebate.messages : authRight.messages} />
                <Terminal color={"green"} aiName={"libLeft"} userName={terminalName} messages={
                    (debateMode) ? libLeftDebate.messages : libLeft.messages} />
                <Terminal color={"yellow"} aiName={"libRight"} userName={terminalName} messages={
                    (debateMode) ? libRightDebate.messages : libRight.messages} />
            </div>
            <div className="flex items-center p-2 w-full gap-2">
                <div>{">"}</div>
                <form className="flex w-full"
                    onSubmit={e => {
                        e.preventDefault();
                        if (input === "!toggleMode") {
                            debateModeHandler()
                        } else if (!debateMode) {
                            authLeft.sendMessage({ text: input });
                            authRight.sendMessage({ text: input });
                            libLeft.sendMessage({ text: input });
                            libRight.sendMessage({ text: input });
                        } else {
                            authLeftDebate.sendMessage({ text: input });
                            authRightDebate.sendMessage({ text: input });
                            libLeftDebate.sendMessage({ text: input });
                            libRightDebate.sendMessage({ text: input });
                        }
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