import { redirect, type LoaderFunctionArgs } from "react-router";
import { type HtmlHTMLAttributes, useEffect, useRef } from "react";
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIDataTypes, type UIMessage, type UITools } from "ai";
import { makeDummyHistory } from "~/lib/chatHelpers";

//const defaultMessages = makeDummyHistory(10)

export default function Terminal(props: { color: string, aiName: string, userName: string, messages: UIMessage<unknown, UIDataTypes, UITools>[] }) {
    const colorsToTailwind: Record<string, string> = {
        'red': 'bg-red-900',
        'blue': 'bg-blue-900',
        'green': 'bg-green-900',
        'yellow': 'bg-yellow-900'
    }

    const scrollerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // console.log(`scroll triggered ${props.color}`)
        const scrollingArea = scrollerRef.current
        if (scrollingArea) scrollingArea.scrollTop = scrollingArea.scrollHeight
    }, [props.messages])

    return (
        <div ref={scrollerRef} className={`terminal terminal-${props.color} border w-full h-full justify-baseline overflow-y-scroll p-2 `}>
            {props.messages.map(message => (
                <div key={message.id} className="whitespace-pre-wrap">
                    <span className={colorsToTailwind[props.color]} >{message.role === 'user' ? `${props.userName}@fractal$` : `${props.aiName}@ChatPCT$`}</span>
                    {message.parts.map((part, i) => {
                        switch (part.type) {
                            case 'text':
                                return <span key={`${message.id}-${i}`}> {part.text}</span>;
                        }
                    })}
                </div>
            ))}
        </div >
    )
}