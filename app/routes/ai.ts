import { openai } from '@ai-sdk/openai';
import { streamText, type UIMessage, convertToModelMessages } from 'ai';
import type { Route } from './+types/ai';

export async function action({ request }: Route.ActionArgs) {
    const { messages }: { messages: UIMessage[] } = await request.json()

    const result = streamText({
        model: openai('gpt-4'),
        messages: convertToModelMessages(messages)
    });

    console.log(result.toUIMessageStreamResponse)
    return result.toUIMessageStreamResponse();
}