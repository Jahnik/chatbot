import { redirect, type LoaderFunctionArgs } from "react-router";
import { useEffect, useRef } from "react";
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIDataTypes, type UIMessage, type UITools } from "ai";


export default function Terminal(props: { color: string, aiName: string, userName: string, messages: UIMessage<unknown, UIDataTypes, UITools>[] }) {
    //const [input, setInput] = useState('');
    // const { messages, sendMessage } = useChat({
    //     transport: new DefaultChatTransport({ api: '/ai' })
    // });


    return (
        <div className={`terminal terminal-${props.color} border flex flex-col w-full h-full justify-baseline overflow-y-auto`}>
            <div className="p-2">
                {props.messages.map(message => (
                    <div key={message.id} className="flex whitespace-pre-wrap">
                        {message.role === 'user' ? `${props.userName}@fractal$ ` : `${props.aiName}@ChatPCT$ `}
                        {message.parts.map((part, i) => {
                            switch (part.type) {
                                case 'text':
                                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                            }
                        })}
                    </div>
                ))}
            </div>
        </div >
    )
}